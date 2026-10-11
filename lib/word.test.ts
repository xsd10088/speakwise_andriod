import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanLookupWord, getWordDefinition, lookupWordDefinition } from "./word";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
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

  it("uses dictionaryapi.dev and caches the result", async () => {
    routeFetch([
      [
        "https://api.dictionaryapi.dev/",
        () =>
          jsonResponse([
            {
              phonetic: "/wɜːrk/",
              meanings: [
                { definitions: [{ definition: "activity involving mental effort" }] },
              ],
            },
          ]),
      ],
      [
        "https://api.mymemory.translated.net/",
        () =>
          jsonResponse({
            responseData: { translatedText: "工作" },
            responseStatus: 200,
          }),
      ],
    ]);

    const first = await lookupWordDefinition("work");
    expect(first.phonetic).toBe("/wɜːrk/");
    expect(first.meaning).toBe("工作");

    const second = await lookupWordDefinition("work");
    expect(second.meaning).toBe("工作");
    expect(fetchMock).toHaveBeenCalledTimes(2);
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
              phonetic: "/ˈtaɪmɪŋ/",
              meanings: [{ definitions: [{ definition: "the choice of when to do something" }] }],
            },
          ]),
      ],
      ["https://api.mymemory.translated.net/", () => Promise.reject(new Error("timeout"))],
      ["https://translate.googleapis.com/", () => Promise.reject(new Error("timeout"))],
    ]);

    const result = await lookupWordDefinition("timing");
    expect(result.phonetic).toBe("/ˈtaɪmɪŋ/");
    expect(result.meaning).toBe("the choice of when to do something");
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
