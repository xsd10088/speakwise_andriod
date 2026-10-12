import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.VOA_DATA_DIR = mkdtempSync(
  path.join(tmpdir(), "speakwise-voa-test-"),
);

import { refreshFeed, refreshAllFeeds, FEED_TTL_MS } from "./fetcher";
import { getFeedById, getFeedsByLevel } from "./feeds";
import { DEFAULT_STORE, type Store } from "./store";

const feedXml = `<?xml version="1.0"?><rss><channel>
<title>Test Feed</title>
<link>https://example.com</link>
<description>test</description>
<item>
<title>Test Lesson</title>
<description>desc</description>
<link>https://example.com/a/1.html</link>
<guid>https://example.com/a/1.html</guid>
<pubDate>Mon, 01 Jan 2024 00:00:00 +0000</pubDate>
<category>Test</category>
</item>
</channel></rss>`;

const articleHtml = `<html><body><div class="wsw">
<audio src="https://example.com/audio/test.mp3" data-sources="[{&quot;Src&quot;:&quot;https://example.com/audio/test_hq.mp3&quot;,&quot;Type&quot;:&quot;audio/mp3&quot;,&quot;DataInfo&quot;:&quot;128 kbps&quot;}]"></audio>
<p>First paragraph.</p>
<p>Second paragraph.</p>
</div></body></html>`;

function streamOf(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

function mockFetch(responses: Array<{ body: string; status?: number }>) {
  const queue = [...responses];
  return vi.fn(async () => {
    const next = queue.shift() ?? { body: "", status: 404 };
    return {
      ok: (next.status ?? 200) < 400,
      status: next.status ?? 200,
      text: async () => next.body,
      body: streamOf(next.body),
    } as unknown as Response;
  });
}

function emptyStore(): Store {
  return { ...DEFAULT_STORE, courses: [], lessons: [], feeds: {} };
}

describe("refreshFeed", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetches feed, article and audio, and records the lesson", async () => {
    globalThis.fetch = mockFetch([
      { body: feedXml },
      { body: articleHtml },
      { body: "fake-audio-bytes" },
    ]) as unknown as typeof fetch;

    const store = emptyStore();
    const result = await refreshFeed(getFeedById("as-it-is")!, {
      store,
      baseUrl: "http://test",
      translate: false,
    });

    expect(result.newItems).toBe(1);
    expect(result.errors).toEqual([]);
    expect(store.lessons).toHaveLength(1);
    expect(store.lessons[0].title).toBe("Test Lesson");
    expect(store.lessons[0].audioUrl).toBe(
      "http://test/audio/as-it-is-example-com-a-1-html.mp3",
    );
    expect(store.lessons[0].transcript).toEqual([
      "First paragraph.",
      "Second paragraph.",
    ]);
    expect(store.courses[0].lessonCount).toBe(1);
    expect(store.feeds["as-it-is"].itemCount).toBe(1);
  });

  it("skips items whose article has no transcript", async () => {
    const videoArticle = `<html><body><video src="https://example.com/v.mp4"></video></body></html>`;
    globalThis.fetch = mockFetch([
      { body: feedXml },
      { body: videoArticle },
    ]) as unknown as typeof fetch;

    const store = emptyStore();
    const result = await refreshFeed(getFeedById("as-it-is")!, {
      store,
      baseUrl: "http://test",
      translate: false,
    });

    expect(result.skippedNoAudio).toBe(1);
    expect(store.lessons).toHaveLength(0);
  });

  it("does not re-fetch lessons already in the store", async () => {
    globalThis.fetch = mockFetch([{ body: feedXml }]) as unknown as typeof fetch;

    const store = emptyStore();
    store.lessons.push({
      id: "existing",
      courseId: "as-it-is",
      title: "Test Lesson",
      url: "https://example.com/a/1.html",
      audioUrl: "",
      audioFile: "",
      durationSec: null,
      transcript: [],
      translation: [],
      publishedAt: "",
      fetchedAt: 0,
    });

    const result = await refreshFeed(getFeedById("as-it-is")!, {
      store,
      baseUrl: "http://test",
      translate: false,
    });

    expect(result.newItems).toBe(0);
    expect(store.lessons).toHaveLength(1);
  });
});

describe("refreshAllFeeds", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("skips feeds within the TTL window", async () => {
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const freshFeeds: Record<string, { lastFetched: number; itemCount: number }> = {};
    for (const feed of getFeedsByLevel(2)) {
      freshFeeds[feed.id] = { lastFetched: Date.now(), itemCount: 1 };
    }

    const result = await refreshAllFeeds({
      baseUrl: "http://test",
      levels: [2],
      store: { ...emptyStore(), feeds: freshFeeds },
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.feeds["as-it-is"].lastFetched).toBeGreaterThan(0);
  });

  it("refreshes feeds past the TTL window", async () => {
    const fetchMock = mockFetch([
      { body: feedXml },
      { body: articleHtml },
      { body: "fake-audio-bytes" },
    ]);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await refreshAllFeeds({
      baseUrl: "http://test",
      levels: [2],
      store: {
        ...emptyStore(),
        feeds: {
          "as-it-is": {
            lastFetched: Date.now() - FEED_TTL_MS - 1000,
            itemCount: 1,
          },
        },
      },
    });

    expect(fetchMock).toHaveBeenCalled();
  });
});
