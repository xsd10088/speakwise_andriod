import { Directory, File, Paths } from "expo-file-system";
import { Platform } from "react-native";

import { getApiBaseUrl } from "./api";
import type { Speaker } from "./voice";

export type ServerTtsGender = "female" | "male";

export const SERVER_TTS_GENDER: Record<Speaker, ServerTtsGender> = {
  Alex: "female",
  Mia: "male",
  Mike: "male",
};

const TTS_REQUEST_TIMEOUT_MS = 8_000;
const TTS_CACHE_DIRECTORY = "tts";
const TTS_PATH_CANDIDATES = ["voice.tts", "audio.tts"] as const;

export type ServerTtsAudio = {
  audioBase64: string;
  mimeType: string;
};

export function serverTtsCacheKey(
  text: string,
  speaker: Speaker,
  rate: number,
): string {
  return `${SERVER_TTS_GENDER[speaker]}|${rate.toFixed(2)}|${text}`;
}

function hashCacheKey(key: string): string {
  let hash = 5381;
  for (let index = 0; index < key.length; index++) {
    hash = (hash * 33) ^ key.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function mimeTypeToExtension(mimeType: string): string {
  if (mimeType.includes("ogg")) {
    return "ogg";
  }
  if (mimeType.includes("wav")) {
    return "wav";
  }
  if (mimeType.includes("aac") || mimeType.includes("mp4")) {
    return "m4a";
  }
  return "mp3";
}

function fetchWithTimeout(
  url: string,
  options: Parameters<typeof fetch>[1],
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
}

function extractTtsResult(payload: unknown): ServerTtsAudio | null {
  const batch = payload as {
    result?: { data?: { json?: Record<string, unknown> } };
  }[];
  const raw =
    (Array.isArray(batch) ? batch[0]?.result?.data?.json : undefined) ??
    (payload as { result?: { data?: { json?: Record<string, unknown> } } })
      ?.result?.data?.json ??
    (payload as Record<string, unknown> | null);

  const audioBase64 = (raw?.audioBase64 ?? raw?.audio ?? raw?.base64) as
    | string
    | undefined;
  if (typeof audioBase64 !== "string" || !audioBase64) {
    return null;
  }

  const mimeType = (raw?.mimeType ?? raw?.mime ?? "audio/mpeg") as
    | string
    | undefined;

  return {
    audioBase64,
    mimeType:
      typeof mimeType === "string" && mimeType ? mimeType : "audio/mpeg",
  };
}

async function requestServerTtsAudio(
  path: string,
  text: string,
  gender: ServerTtsGender,
  rate: number,
): Promise<ServerTtsAudio> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, "");
  const url = `${baseUrl}/api/trpc/${path}?batch=1`;
  const response = await fetchWithTimeout(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "0": { json: { text, voice: gender, rate, language: "en-US" } },
      }),
    },
    TTS_REQUEST_TIMEOUT_MS,
  );

  if (!response.ok) {
    throw new Error(`TTS request failed: ${response.status}`);
  }

  const payload = await response.json();
  const audio = extractTtsResult(payload);
  if (!audio) {
    throw new Error("TTS response did not contain audio");
  }
  return audio;
}

export async function fetchServerTtsAudio(params: {
  text: string;
  speaker: Speaker;
  rate: number;
}): Promise<ServerTtsAudio> {
  const gender = SERVER_TTS_GENDER[params.speaker];
  let lastError: unknown;
  for (const path of TTS_PATH_CANDIDATES) {
    try {
      return await requestServerTtsAudio(
        path,
        params.text,
        gender,
        params.rate,
      );
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("TTS request failed");
}

const audioUriCache = new Map<string, string>();

function buildAudioUri(cacheKey: string, audio: ServerTtsAudio): string {
  if (Platform.OS === "web") {
    return `data:${audio.mimeType};base64,${audio.audioBase64}`;
  }

  const directory = new Directory(Paths.cache, TTS_CACHE_DIRECTORY);
  if (!directory.exists) {
    directory.create();
  }

  const fileName = `${hashCacheKey(cacheKey)}.${mimeTypeToExtension(audio.mimeType)}`;
  const file = new File(directory, fileName);
  if (!file.exists) {
    try {
      file.create();
      file.write(audio.audioBase64, { encoding: "base64" });
    } catch {
      // 并发请求可能已创建同名文件；只要文件最终存在即可播放
    }
  }
  return file.uri;
}

export async function getServerTtsAudioUri(params: {
  text: string;
  speaker: Speaker;
  rate: number;
}): Promise<string> {
  const cacheKey = serverTtsCacheKey(params.text, params.speaker, params.rate);
  const cachedUri = audioUriCache.get(cacheKey);
  if (cachedUri) {
    return cachedUri;
  }

  const audio = await fetchServerTtsAudio(params);
  const uri = buildAudioUri(cacheKey, audio);
  audioUriCache.set(cacheKey, uri);
  return uri;
}

export function clearServerTtsAudioCache(): void {
  audioUriCache.clear();
}
