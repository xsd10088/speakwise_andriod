import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  fetchMock,
  fileCreate,
  fileWrite,
  fileExists,
  directoryExists,
  directoryCreate,
  platformOs,
} = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  fileCreate: vi.fn(),
  fileWrite: vi.fn(),
  fileExists: vi.fn(() => false),
  directoryExists: vi.fn(() => false),
  directoryCreate: vi.fn(),
  platformOs: { OS: "android" as string },
}));

vi.mock("react-native", () => ({
  Platform: platformOs,
}));

vi.mock("expo-file-system", () => {
  const FileClass = function () {
    return {
      get exists() {
        return fileExists();
      },
      create: fileCreate,
      write: fileWrite,
      get uri() {
        return "file:///cache/tts/audio.mp3";
      },
    };
  };
  const DirectoryClass = function () {
    return {
      get exists() {
        return directoryExists();
      },
      create: directoryCreate,
    };
  };
  return {
    File: FileClass,
    Directory: DirectoryClass,
    Paths: { cache: "file:///cache" },
  };
});

import {
  clearServerTtsAudioCache,
  fetchServerTtsAudio,
  getServerTtsAudioUri,
  serverTtsCacheKey,
} from "./tts";

const ttsResponse = (audioBase64 = "QUJD") => [
  {
    result: {
      data: {
        json: { audioBase64, mimeType: "audio/mpeg", durationMs: 1500 },
      },
    },
  },
];

describe("serverTtsCacheKey", () => {
  it("separates voices by speaker gender, rate and text", () => {
    const femaleKey = serverTtsCacheKey("Hello", "Alex", 1);
    const maleKey = serverTtsCacheKey("Hello", "Mike", 1);
    const fastKey = serverTtsCacheKey("Hello", "Alex", 1.25);
    const otherTextKey = serverTtsCacheKey("Hi", "Alex", 1);

    expect(femaleKey).toContain("female");
    expect(maleKey).toContain("male");
    expect(femaleKey).not.toBe(maleKey);
    expect(femaleKey).not.toBe(fastKey);
    expect(femaleKey).not.toBe(otherTextKey);
  });
});

describe("fetchServerTtsAudio", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fileCreate.mockClear();
    fileWrite.mockClear();
    fileExists.mockReturnValue(false);
    directoryExists.mockReturnValue(false);
    directoryCreate.mockClear();
    platformOs.OS = "android";
    clearServerTtsAudioCache();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("posts a tRPC batch request with text, voice and rate", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ttsResponse(),
    });

    const audio = await fetchServerTtsAudio({
      text: "Hello there",
      speaker: "Alex",
      rate: 1.25,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://speakwise-wsicpu2u.manus.space/api/trpc/voice.tts?batch=1",
    );
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      "0": {
        json: { text: "Hello there", voice: "female", rate: 1.25, language: "en-US" },
      },
    });
    expect(audio).toEqual({ audioBase64: "QUJD", mimeType: "audio/mpeg" });
  });

  it("falls back to the audio.tts path when voice.tts fails", async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, json: async () => ttsResponse() });

    const audio = await fetchServerTtsAudio({
      text: "Hello",
      speaker: "Mike",
      rate: 1,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain("/voice.tts");
    expect(fetchMock.mock.calls[1][0]).toContain("/audio.tts");
    expect(audio.audioBase64).toBe("QUJD");
  });

  it("throws when the response contains no audio", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [{ result: { data: { json: {} } } }],
    });

    await expect(
      fetchServerTtsAudio({ text: "Hello", speaker: "Alex", rate: 1 }),
    ).rejects.toThrow("did not contain audio");
  });

  it("throws when the request times out", async () => {
    fetchMock.mockImplementation(
      () =>
        new Promise((_, reject) => {
          const error = new Error("The operation was aborted");
          error.name = "AbortError";
          setTimeout(() => reject(error), 0);
        }),
    );

    await expect(
      fetchServerTtsAudio({ text: "Hello", speaker: "Alex", rate: 1 }),
    ).rejects.toThrow();
  });
});

describe("getServerTtsAudioUri", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fileCreate.mockClear();
    fileWrite.mockClear();
    fileExists.mockReturnValue(false);
    directoryExists.mockReturnValue(false);
    directoryCreate.mockClear();
    platformOs.OS = "android";
    clearServerTtsAudioCache();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("writes the base64 audio to the cache directory and returns the file uri", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ttsResponse(),
    });

    const uri = await getServerTtsAudioUri({
      text: "Hello",
      speaker: "Mia",
      rate: 1,
    });

    expect(uri).toBe("file:///cache/tts/audio.mp3");
    expect(directoryCreate).toHaveBeenCalledTimes(1);
    expect(fileCreate).toHaveBeenCalledTimes(1);
    expect(fileWrite).toHaveBeenCalledWith("QUJD", { encoding: "base64" });
  });

  it("reuses the cached audio without refetching", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ttsResponse(),
    });

    const first = await getServerTtsAudioUri({
      text: "Hello",
      speaker: "Alex",
      rate: 1,
    });
    const second = await getServerTtsAudioUri({
      text: "Hello",
      speaker: "Alex",
      rate: 1,
    });

    expect(first).toBe(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns a data uri on web", async () => {
    platformOs.OS = "web";
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ttsResponse(),
    });

    const uri = await getServerTtsAudioUri({
      text: "Hello",
      speaker: "Alex",
      rate: 1,
    });

    expect(uri).toBe("data:audio/mpeg;base64,QUJD");
    expect(fileCreate).not.toHaveBeenCalled();
  });

  it("propagates fetch failures", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });

    await expect(
      getServerTtsAudioUri({ text: "Hello", speaker: "Alex", rate: 1 }),
    ).rejects.toThrow("TTS request failed: 500");
  });
});
