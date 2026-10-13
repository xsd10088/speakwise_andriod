import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { chunkPhrases, parseSentence, tokenizeSentence } from "./sentence";
import { wordFormCandidates } from "./word";

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

describe("tokenizeSentence", () => {
  it("splits, lowercases and strips punctuation", () => {
    expect(
      tokenizeSentence("In 2024, the number of babies born in South Korea."),
    ).toEqual([
      "in",
      "the",
      "number",
      "of",
      "babies",
      "born",
      "in",
      "south",
      "korea",
    ]);
  });

  it("drops tokens without letters", () => {
    expect(tokenizeSentence("123 456")).toEqual([]);
    expect(tokenizeSentence("   ")).toEqual([]);
  });
});

describe("chunkPhrases", () => {
  it("groups prepositional phrases", () => {
    expect(
      chunkPhrases([
        "the",
        "number",
        "of",
        "babies",
        "born",
        "in",
        "south",
        "korea",
      ]),
    ).toEqual([
      ["the", "number"],
      ["of", "babies", "born"],
      ["in", "south", "korea"],
    ]);
  });

  it("starts a new chunk at conjunctions and verbs", () => {
    expect(chunkPhrases(["i", "work", "and", "study"])).toEqual([
      ["i"],
      ["work"],
      ["and"],
      ["study"],
    ]);
  });

  it("keeps a conjunction with the following phrase", () => {
    expect(chunkPhrases(["tea", "and", "coffee"])).toEqual([
      ["tea"],
      ["and", "coffee"],
    ]);
  });

  it("starts a new chunk at past-tense verbs", () => {
    expect(
      chunkPhrases(["korea", "increased", "for", "the", "first", "time"]),
    ).toEqual([["korea"], ["increased"], ["for", "the", "first", "time"]]);
  });

  it("returns an empty list for no words", () => {
    expect(chunkPhrases([])).toEqual([]);
  });
});

describe("parseSentence", () => {
  it("breaks down words from the local dictionary and translates the sentence", async () => {
    fetchMock.mockImplementation(async (url: string) => {
      if (url.startsWith("https://api.mymemory.translated.net/")) {
        return jsonResponse({
          responseData: { translatedText: "韩国新生儿数量九年来首次增长。" },
          responseStatus: 200,
        });
      }
      throw new Error(`Unexpected fetch URL: ${url}`);
    });

    const result = await parseSentence(
      "the number of babies born in South Korea increased",
    );

    expect(result.text).toBe("the number of babies born in South Korea increased");
    expect(result.translation).toBe("韩国新生儿数量九年来首次增长。");
    expect(result.words[0]).toEqual({
      word: "the",
      phonetic: "/ðə/",
      meaning: "这；那；这些；那些",
    });
    expect(result.words.map((item) => item.word)).toContain("korea");
    expect(result.phrases).toContain("of babies born");
  });

  it("uses the known translation without fetching", async () => {
    const result = await parseSentence(
      "the number of babies born in South Korea increased",
      "韩国新生儿数量九年来首次增长。",
    );

    expect(result.translation).toBe("韩国新生儿数量九年来首次增长。");
    expect(result.words[0]).toEqual({
      word: "the",
      phonetic: "/ðə/",
      meaning: "这；那；这些；那些",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back to a word-by-word gloss when every translation provider fails", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));

    const result = await parseSentence("hello world");

    expect(result.translation).toBe("你好 world");
    expect(result.words.map((item) => item.word)).toEqual(["hello", "world"]);
    expect(result.words[0].meaning).toBe("你好");
  });

  it("returns an empty parse for blank text without fetching", async () => {
    const result = await parseSentence("   ");

    expect(result).toEqual({
      text: "   ",
      translation: "",
      words: [],
      phrases: [],
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("wordFormCandidates", () => {
  it("maps irregular forms to their base form", () => {
    expect(wordFormCandidates("went")).toContain("go");
    expect(wordFormCandidates("was")).toContain("be");
    expect(wordFormCandidates("studying")).toContain("study");
  });

  it("derives singular, base and infinitive forms", () => {
    expect(wordFormCandidates("studies")).toContain("study");
    expect(wordFormCandidates("boxes")).toContain("box");
    expect(wordFormCandidates("lives")).toContain("life");
    expect(wordFormCandidates("worked")).toContain("work");
    expect(wordFormCandidates("stopped")).toContain("stop");
    expect(wordFormCandidates("studied")).toContain("study");
    expect(wordFormCandidates("running")).toContain("run");
    expect(wordFormCandidates("making")).toContain("make");
  });

  it("returns no candidates for plain words", () => {
    expect(wordFormCandidates("hello")).toEqual([]);
    expect(wordFormCandidates("xyzzyq")).toEqual([]);
  });
});
