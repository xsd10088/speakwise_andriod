import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { VoaLevel } from "./feeds";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getDataDir(): string {
  return process.env.VOA_DATA_DIR
    ? path.resolve(process.env.VOA_DATA_DIR)
    : path.resolve(__dirname, "..", "data");
}

export function getAudioDir(): string {
  return path.join(getDataDir(), "audio");
}

export function getStoreFile(): string {
  return path.join(getDataDir(), "store.json");
}

export const AUDIO_DIR = getAudioDir();
export const STORE_FILE = getStoreFile();

export type StoredLesson = {
  id: string;
  courseId: string;
  title: string;
  url: string;
  audioUrl: string;
  audioFile: string;
  durationSec: number | null;
  transcript: string[];
  translation: string[];
  publishedAt: string;
  fetchedAt: number;
};

export type StoredCourse = {
  id: string;
  feedId: string;
  title: string;
  level: VoaLevel;
  description: string;
  lessonCount: number;
  updatedAt: number;
};

export type Store = {
  version: number;
  feeds: Record<string, { lastFetched: number; itemCount: number }>;
  courses: StoredCourse[];
  lessons: StoredLesson[];
};

export const DEFAULT_STORE: Store = {
  version: 1,
  feeds: {},
  courses: [],
  lessons: [],
};

export async function ensureDataDirs(): Promise<void> {
  await mkdir(getAudioDir(), { recursive: true });
}

export async function loadStore(): Promise<Store> {
  try {
    const raw = await readFile(getStoreFile(), "utf8");
    const parsed = JSON.parse(raw) as Store;
    return { ...DEFAULT_STORE, ...parsed };
  } catch {
    return { ...DEFAULT_STORE };
  }
}

export async function saveStore(store: Store): Promise<void> {
  await ensureDataDirs();
  const storeFile = getStoreFile();
  const tmp = `${storeFile}.tmp`;
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
  const { rename } = await import("node:fs/promises");
  await rename(tmp, storeFile);
}

export function audioFilePath(fileName: string): string {
  return path.join(getAudioDir(), fileName);
}

export function lessonAudioUrl(baseUrl: string, fileName: string): string {
  return `${baseUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(fileName)}`;
}
