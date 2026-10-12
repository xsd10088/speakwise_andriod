import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { refreshAllFeeds, refreshFeedById } from "./voa/fetcher.ts";
import { getFeedById, getFeedsByLevel, VOA_FEEDS, type VoaLevel } from "./voa/feeds.ts";
import {
  audioFilePath,
  ensureDataDirs,
  loadStore,
  saveStore,
  type StoredCourse,
  type StoredLesson,
  type Store,
} from "./voa/store.ts";

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const REFRESH_ON_START = process.env.VOA_REFRESH_ON_START !== "false";
const REFRESH_INTERVAL_MS = Number(
  process.env.VOA_REFRESH_INTERVAL_MS || 6 * 60 * 60 * 1000,
);

type TrpcInput = Record<string, any>;

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function trpcBatch(payload: unknown): unknown {
  return [{ result: { data: { json: payload } } }];
}

function courseSummary(course: StoredCourse): Record<string, unknown> {
  return {
    id: course.id,
    title: course.title,
    level: course.level,
    description: course.description,
    lessonCount: course.lessonCount,
    updatedAt: course.updatedAt,
  };
}

function lessonDetail(lesson: StoredLesson): Record<string, unknown> {
  return {
    id: lesson.id,
    courseId: lesson.courseId,
    title: lesson.title,
    url: lesson.url,
    audioUrl: lesson.audioUrl,
    durationSec: lesson.durationSec,
    transcript: lesson.transcript,
    translation: lesson.translation,
    publishedAt: lesson.publishedAt,
  };
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString("utf8");
}

function parseTrpcInput(raw: string): TrpcInput {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "0" in parsed) {
      const first = (parsed as { "0"?: { json?: TrpcInput } })["0"];
      return first?.json ?? {};
    }
    return parsed as TrpcInput;
  } catch {
    return {};
  }
}

async function handleTrpc(
  req: IncomingMessage,
  res: ServerResponse,
  procedure: string,
): Promise<void> {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, {});
    return;
  }

  const input =
    req.method === "POST" ? parseTrpcInput(await readBody(req)) : {};
  const store = await loadStore();

  if (procedure === "voa.courses") {
    const level = typeof input.level === "number" ? (input.level as VoaLevel) : undefined;
    const courses = (level ? getFeedsByLevel(level) : VOA_FEEDS)
      .map((feed) => store.courses.find((course) => course.feedId === feed.id))
      .filter((course): course is StoredCourse => Boolean(course))
      .map(courseSummary);
    sendJson(res, 200, trpcBatch({ courses }));
    return;
  }

  if (procedure === "voa.detail") {
    const id = String(input.id ?? "");
    const course = store.courses.find(
      (item) => item.id === id || item.feedId === id,
    );
    if (!course) {
      sendJson(res, 200, trpcBatch({ course: null, lessons: [] }));
      return;
    }
    const lessons = store.lessons
      .filter((lesson) => lesson.courseId === course.feedId)
      .map(lessonDetail);
    sendJson(res, 200, trpcBatch({ course: courseSummary(course), lessons }));
    return;
  }

  sendJson(res, 404, trpcBatch({ error: `unknown procedure: ${procedure}` }));
}

async function handleApi(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: URL["pathname"],
): Promise<void> {
  if (pathname === "/api/voa/courses" && req.method === "GET") {
    const store = await loadStore();
    const courses = store.courses.map(courseSummary);
    sendJson(res, 200, { courses });
    return;
  }

  const courseMatch = pathname.match(/^\/api\/voa\/courses\/([^/]+)$/);
  if (courseMatch && req.method === "GET") {
    const store = await loadStore();
    const id = decodeURIComponent(courseMatch[1]);
    const course = store.courses.find(
      (item) => item.id === id || item.feedId === id,
    );
    if (!course) {
      sendJson(res, 404, { error: "course not found" });
      return;
    }
    const lessons = store.lessons
      .filter((lesson) => lesson.courseId === course.feedId)
      .map(lessonDetail);
    sendJson(res, 200, { course: courseSummary(course), lessons });
    return;
  }

  if (pathname === "/api/voa/refresh" && req.method === "POST") {
    const input = parseTrpcInput(await readBody(req));
    const level = typeof input.level === "number" ? (input.level as VoaLevel) : undefined;
    const feedId = typeof input.feedId === "string" ? input.feedId : undefined;
    const store = await loadStore();
    if (feedId) {
      const result = await refreshFeedById(feedId, {
        store,
        baseUrl: `http://${HOST}:${PORT}`,
        translate: true,
      });
      await saveStore(store);
      sendJson(res, 200, { result });
      return;
    }
    const updated = await refreshAllFeeds({
      baseUrl: `http://${HOST}:${PORT}`,
      translate: true,
      levels: level ? [level] : undefined,
    });
    sendJson(res, 200, {
      courses: updated.courses.map(courseSummary),
    });
    return;
  }

  sendJson(res, 404, { error: "not found" });
}

async function handleAudio(
  res: ServerResponse,
  fileName: string,
): Promise<void> {
  const safeName = path.basename(fileName);
  if (!safeName || safeName !== fileName) {
    sendJson(res, 400, { error: "invalid audio name" });
    return;
  }
  try {
    const filePath = audioFilePath(safeName);
    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
    });
    res.end(data);
  } catch {
    sendJson(res, 404, { error: "audio not found" });
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${HOST}:${PORT}`);
  const pathname = url.pathname;

  try {
    if (pathname.startsWith("/api/trpc/")) {
      const procedure = pathname.slice("/api/trpc/".length).split("?")[0];
      await handleTrpc(req, res, procedure);
      return;
    }
    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }
    if (pathname.startsWith("/audio/")) {
      await handleAudio(res, pathname.slice("/audio/".length));
      return;
    }
    if (pathname === "/healthz") {
      sendJson(res, 200, { ok: true });
      return;
    }
    sendJson(res, 404, { error: "not found" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    sendJson(res, 500, { error: message });
  }
});

async function main(): Promise<void> {
  await ensureDataDirs();

  if (REFRESH_ON_START) {
    refreshAllFeeds({
      baseUrl: `http://${HOST}:${PORT}`,
      translate: true,
      onLog: (message) => console.log(`[voa] ${message}`),
    })
      .then(() => console.log("[voa] initial refresh complete"))
      .catch((error) =>
        console.error("[voa] initial refresh failed", error),
      );
  }

  setInterval(() => {
    refreshAllFeeds({
      baseUrl: `http://${HOST}:${PORT}`,
      translate: true,
      onLog: (message) => console.log(`[voa] ${message}`),
    })
      .then(() => console.log("[voa] scheduled refresh complete"))
      .catch((error) =>
        console.error("[voa] scheduled refresh failed", error),
      );
  }, REFRESH_INTERVAL_MS);

  server.listen(PORT, HOST, () => {
    console.log(`SpeakWise VOA proxy listening on http://${HOST}:${PORT}`);
    console.log(`  tRPC:  POST /api/trpc/voa.courses | /api/trpc/voa.detail`);
    console.log(`  REST:  GET  /api/voa/courses | /api/voa/courses/:id`);
    console.log(`  audio: GET  /audio/:file`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
