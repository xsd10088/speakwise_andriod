import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanLookupWord,
  getWordDefinition,
  lookupWordDefinition,
  setWordCacheStorage,
  type WordCacheStorage,
} from "./word";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  setWordCacheStorage(null);
});

afterEach(() => {
  vi.unstubAllGlobals();
  setWordCacheStorage(null);
});

function jsonResponse(body: unknown, status = 200): Promise<Response> {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

function routeFetch(handlers: Array<[string, () => Promise<Response>]>) {
  fetchMock.mockImplementation(async (url: string) => {
    for (const [prefix, handler] of handlers) {
      if (url.startsWith(prefix)) return handler();
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  });
}

function createMockStorage(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial));
  const storage: WordCacheStorage = {
    getAllKeys: async () => [...store.keys()],
    multiGet: async (keys: readonly string[]) =>
      keys.map(
        (key) => [key, store.get(key) ?? null] as [string, string | null],
      ),
    setItem: async (key: string, value: string) => {
      store.set(key, value);
    },
  };
  return storage;
}

describe("cleanLookupWord", () => {
  it("lowercases and strips punctuation", () => {
    expect(cleanLookupWord("Hello!")).toBe("hello");
    expect(cleanLookupWord("  Don't  ")).toBe("don't");
    expect(cleanLookupWord("Off-Peak")).toBe("off-peak");
  });
});

describe("getWordDefinition", () => {
  it("returns the local definition for known words", () => {
    const definition = getWordDefinition("hello");
    expect(definition.phonetic).toBe("/həˈloʊ/");
    expect(definition.meaning).toBe("你好");
  });

  it("returns the placeholder for unknown words", () => {
    const definition = getWordDefinition("xyzzyq");
    expect(definition.phonetic).toBe("");
    expect(definition.meaning).toBe("暂未找到释义");
  });
});

describe("lookupWordDefinition", () => {
  it("returns the local definition for an empty word without fetching", async () => {
    const result = await lookupWordDefinition("   ");
    expect(result.meaning).toBe("暂未找到释义");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the local definition for a local word without fetching", async () => {
    const result = await lookupWordDefinition("hello");
    expect(result.phonetic).toBe("/həˈloʊ/");
    expect(result.meaning).toBe("你好");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses dictionaryapi.dev and caches the result", async () => {
    routeFetch([
      [
        "https://api.dictionaryapi.dev/",
        () =>
          jsonResponse([
            {
              phonetic: "/ˈzaɪləfoʊ/",
              meanings: [
                { definitions: [{ definition: "a musical instrument" }] },
              ],
            },
          ]),
      ],
      [
        "https://api.mymemory.translated.net/",
        () =>
          jsonResponse({
            responseData: { translatedText: "木琴" },
            responseStatus: 200,
          }),
      ],
    ]);

    const first = await lookupWordDefinition("xylophone");
    expect(first.phonetic).toBe("/ˈzaɪləfoʊ/");
    expect(first.meaning).toBe("木琴");

    const callsAfterFirst = fetchMock.mock.calls.length;
    expect(callsAfterFirst).toBeGreaterThan(0);

    const second = await lookupWordDefinition("xylophone");
    expect(second.meaning).toBe("木琴");
    // 命中内存缓存：不再发起任何请求
    expect(fetchMock.mock.calls.length).toBe(callsAfterFirst);
  });

  it("loads definitions from the persistent cache without fetching", async () => {
    const storage = createMockStorage({
      "speakwise-word-cache-v1:xylophone": JSON.stringify({
        phonetic: "/ˈzaɪləfoʊ/",
        meaning: "木琴",
      }),
    });
    setWordCacheStorage(storage);

    const result = await lookupWordDefinition("xylophone");
    expect(result.phonetic).toBe("/ˈzaɪləfoʊ/");
    expect(result.meaning).toBe("木琴");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("persists remote results to the cache storage", async () => {
    const storage = createMockStorage();
    setWordCacheStorage(storage);
    routeFetch([
      [
        "https://api.dictionaryapi.dev/",
        () =>
          jsonResponse([
            {
              phonetic: "/ˈzaɪləfoʊ/",
              meanings: [
                { definitions: [{ definition: "a musical instrument" }] },
              ],
            },
          ]),
      ],
      [
        "https://api.mymemory.translated.net/",
        () =>
          jsonResponse({
            responseData: { translatedText: "木琴" },
            responseStatus: 200,
          }),
      ],
    ]);

    await lookupWordDefinition("xylophone");

    await vi.waitFor(async () => {
      const keys = await storage.getAllKeys();
      expect(keys).toContain("speakwise-word-cache-v1:xylophone");
    });
  });

  it("falls back to wiktionary when dictionaryapi.dev fails", async () => {
    routeFetch([
      ["https://api.dictionaryapi.dev/", () => Promise.reject(new Error("network down"))],
      [
        "https://en.wiktionary.org/",
        () =>
          jsonResponse({
            parse: {
              wikitext: {
                "*": "==English==\n===Etymology===\n{{IPA|/ˈɡʊd/|lang=en}}\n===Adjective===\n# [[nice]]; [[kind]]\n# {{lb|en|obsolete}} [[virtuous]]\n",
              },
            },
          }),
      ],
      [
        "https://api.mymemory.translated.net/",
        () =>
          jsonResponse({
            responseData: { translatedText: "好的" },
            responseStatus: 200,
          }),
      ],
    ]);

    const result = await lookupWordDefinition("goodness");
    expect(result.phonetic).toBe("/ˈɡʊd/");
    expect(result.meaning).toBe("好的");
  });

  it("falls back to datamuse when the other dictionary sources fail", async () => {
    routeFetch([
      ["https://api.dictionaryapi.dev/", () => jsonResponse([], 404)],
      ["https://en.wiktionary.org/", () => jsonResponse({}, 404)],
      [
        "https://api.datamuse.com/",
        () => jsonResponse([{ word: "serendipity", defs: ["noun:good luck in making unexpected discoveries"] }]),
      ],
      [
        "https://api.mymemory.translated.net/",
        () =>
          jsonResponse({
            responseData: { translatedText: "意外发现美好事物的运气" },
            responseStatus: 200,
          }),
      ],
    ]);

    const result = await lookupWordDefinition("serendipity");
    expect(result.phonetic).toBe("");
    expect(result.meaning).toBe("意外发现美好事物的运气");
  });

  it("falls back to google translate when mymemory fails", async () => {
    routeFetch([
      [
        "https://api.dictionaryapi.dev/",
        () =>
          jsonResponse([
            {
              phonetic: "/ˈæpl/",
              meanings: [{ definitions: [{ definition: "a round fruit" }] }],
            },
          ]),
      ],
      [
        "https://api.mymemory.translated.net/",
        () => jsonResponse({ responseData: { translatedText: "" }, responseStatus: 429 }),
      ],
      [
        "https://translate.googleapis.com/",
        () => jsonResponse([[["苹果", "a round fruit", null, null, 10]], null, "en"]),
      ],
    ]);

    const result = await lookupWordDefinition("apple");
    expect(result.phonetic).toBe("/ˈæpl/");
    expect(result.meaning).toBe("苹果");
  });

  it("returns the English definition when every translation provider fails", async () => {
    routeFetch([
      [
        "https://api.dictionaryapi.dev/",
        () =>
          jsonResponse([
            {
              phonetic: "/ˈzaɪləfoʊ/",
              meanings: [{ definitions: [{ definition: "a musical instrument" }] }],
            },
          ]),
      ],
      ["https://api.mymemory.translated.net/", () => Promise.reject(new Error("timeout"))],
      ["https://translate.googleapis.com/", () => Promise.reject(new Error("timeout"))],
    ]);

    const result = await lookupWordDefinition("xylophone");
    expect(result.phonetic).toBe("/ˈzaɪləfoʊ/");
    expect(result.meaning).toBe("a musical instrument");
  });

  it("returns the local placeholder when every dictionary source fails", async () => {
    routeFetch([
      ["https://api.dictionaryapi.dev/", () => Promise.reject(new Error("down"))],
      ["https://en.wiktionary.org/", () => Promise.reject(new Error("down"))],
      ["https://api.datamuse.com/", () => Promise.reject(new Error("down"))],
    ]);

    const result = await lookupWordDefinition("xyzzyq");
    expect(result.phonetic).toBe("");
    expect(result.meaning).toBe("暂未找到释义");
  });
});
