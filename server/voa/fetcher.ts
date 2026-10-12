import { createWriteStream } from "node:fs";
import dns from "node:dns";
import { pipeline } from "node:stream/promises";
import {
  getFeedById,
  type VoaFeed,
  type VoaLevel,
} from "./feeds.ts";

// 部分网络环境 IPv6 出口不可用，强制 IPv4 优先避免连接超时
dns.setDefaultResultOrder("ipv4first");
import { extractArticleContent } from "./article.ts";
import { parseRss, type RssItem } from "./rss.ts";
import {
  audioFilePath,
  ensureDataDirs,
  lessonAudioUrl,
  loadStore,
  saveStore,
  type Store,
  type StoredCourse,
  type StoredLesson,
} from "./store.ts";
import { translateAll } from "./translate.ts";

export const FEED_TTL_MS = 6 * 60 * 60 * 1000;
export const ARTICLE_DELAY_MS = 1_500;
export const DOWNLOAD_DELAY_MS = 500;
export const REQUEST_TIMEOUT_MS = 20_000;
export const MAX_ITEMS_PER_FEED = 12;
export const MAX_FETCH_RETRIES = 2;
export const FETCH_RETRY_DELAY_MS = 1_000;

const USER_AGENT =
  "SpeakWise-VoaFetcher/1.0 (+https://speakwise-wsicpu2u.manus.space)";

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  retries: number = MAX_FETCH_RETRIES,
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT },
      });
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(FETCH_RETRY_DELAY_MS * (attempt + 1));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function lessonId(feedId: string, guid: string): string {
  const slug = guid
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80);
  return `${feedId}-${slug}`;
}

function audioFileName(lesson: string, audioUrl: string): string {
  const ext = audioUrl.split("?")[0].endsWith(".mp3") ? ".mp3" : ".mp3";
  return `${lesson}${ext}`;
}

async function downloadAudio(
  audioUrl: string,
  fileName: string,
): Promise<void> {
  const response = await fetchWithTimeout(audioUrl, REQUEST_TIMEOUT_MS);
  if (!response.ok || !response.body) {
    throw new Error(`audio download failed: ${response.status}`);
  }
  await pipeline(response.body, createWriteStream(audioFilePath(fileName)));
}

export type FetchResult = {
  feedId: string;
  newItems: number;
  skippedNoAudio: number;
  errors: string[];
};

export async function refreshFeed(
  feed: VoaFeed,
  options: {
    store: Store;
    baseUrl: string;
    translate?: boolean;
    onLog?: (message: string) => void;
  },
): Promise<FetchResult> {
  const log = options.onLog ?? (() => undefined);
  const result: FetchResult = {
    feedId: feed.id,
    newItems: 0,
    skippedNoAudio: 0,
    errors: [],
  };

  await ensureDataDirs();

  log(`fetching feed ${feed.id} (${feed.feedUrl})`);
  const feedResponse = await fetchWithTimeout(
    feed.feedUrl,
    REQUEST_TIMEOUT_MS,
  );
  if (!feedResponse.ok) {
    result.errors.push(`feed HTTP ${feedResponse.status}`);
    return result;
  }
  const feedXml = await feedResponse.text();
  const channel = parseRss(feedXml);

  const existing = new Set(
    options.store.lessons
      .filter((lesson) => lesson.courseId === feed.id)
      .map((lesson) => lesson.url),
  );

  const freshItems = channel.items
    .filter((item) => item.link && !existing.has(item.link))
    .slice(0, MAX_ITEMS_PER_FEED);

  let course: StoredCourse | undefined = options.store.courses.find(
    (item) => item.feedId === feed.id,
  );
  if (!course) {
    course = {
      id: feed.id,
      feedId: feed.id,
      title: feed.title,
      level: feed.level,
      description: channel.description || feed.title,
      lessonCount: 0,
      updatedAt: Date.now(),
    };
    options.store.courses.push(course);
  }

  for (const item of freshItems) {
    try {
      await sleep(ARTICLE_DELAY_MS);
      const lesson = await fetchLesson(feed, item, options);
      if (!lesson) {
        result.skippedNoAudio += 1;
        continue;
      }
      options.store.lessons.push(lesson);
      result.newItems += 1;
      log(`  + ${item.title}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`${item.link}: ${message}`);
      log(`  ! ${item.title}: ${message}`);
    }
  }

  course.lessonCount = options.store.lessons.filter(
    (lesson) => lesson.courseId === feed.id,
  ).length;
  course.updatedAt = Date.now();
  options.store.feeds[feed.id] = {
    lastFetched: Date.now(),
    itemCount: channel.items.length,
  };

  return result;
}

async function fetchLesson(
  feed: VoaFeed,
  item: RssItem,
  options: {
    store: Store;
    baseUrl: string;
    translate?: boolean;
    onLog?: (message: string) => void;
  },
): Promise<StoredLesson | null> {
  const articleResponse = await fetchWithTimeout(
    item.link,
    REQUEST_TIMEOUT_MS,
  );
  if (!articleResponse.ok) {
    throw new Error(`article HTTP ${articleResponse.status}`);
  }
  const articleHtml = await articleResponse.text();
  const content = extractArticleContent(articleHtml);

  if (!content.audioUrl || content.transcript.length === 0) {
    return null;
  }

  const id = lessonId(feed.id, item.guid || item.link);
  const fileName = audioFileName(id, content.audioUrl);

  await sleep(DOWNLOAD_DELAY_MS);
  await downloadAudio(content.audioUrl, fileName);

  const translation = options.translate
    ? await translateAll(content.transcript)
    : content.transcript.map(() => "");

  return {
    id,
    courseId: feed.id,
    title: item.title,
    url: item.link,
    audioUrl: lessonAudioUrl(options.baseUrl, fileName),
    audioFile: fileName,
    durationSec: content.durationSec,
    transcript: content.transcript,
    translation,
    publishedAt: item.pubDate,
    fetchedAt: Date.now(),
  };
}

export async function refreshFeedById(
  feedId: string,
  options: {
    store: Store;
    baseUrl: string;
    translate?: boolean;
    onLog?: (message: string) => void;
  },
): Promise<FetchResult | null> {
  const feed = getFeedById(feedId);
  if (!feed) return null;
  return refreshFeed(feed, options);
}

export async function refreshAllFeeds(options: {
  baseUrl: string;
  translate?: boolean;
  levels?: VoaLevel[];
  store?: Store;
  onLog?: (message: string) => void;
}): Promise<Store> {
  await ensureDataDirs();
  const store = options.store ?? (await loadStore());
  const { getFeedsByLevel, VOA_FEEDS } = await import("./feeds.ts");
  const feeds = options.levels
    ? options.levels.flatMap((level) => getFeedsByLevel(level))
    : VOA_FEEDS;

  for (const feed of feeds) {
    const lastFetched = store.feeds[feed.id]?.lastFetched ?? 0;
    if (Date.now() - lastFetched < FEED_TTL_MS) {
      options.onLog?.(
        `skip ${feed.id} (TTL not expired, ${Math.round((Date.now() - lastFetched) / 3600000)}h ago)`,
      );
      continue;
    }
    await refreshFeed(feed, { ...options, store });
  }

  await saveStore(store);
  return store;
}
