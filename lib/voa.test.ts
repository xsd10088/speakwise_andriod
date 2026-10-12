import { beforeEach, describe, expect, it, vi } from "vitest";
import { callTrpcMutation, getApiBaseUrl } from "@/lib/api";
import type { VoaCourse, VoaLesson } from "./voa";
import {
  VOA_LEVEL_DIFFICULTY,
  VOA_LEVEL_TITLES,
  fetchVoaCourseDetail,
  fetchVoaCourses,
  getLocalCourse,
  getLocalCourses,
  getLocalLessons,
  voaAudioBaseUrl,
  voaLessonToLines,
} from "./voa";

vi.mock("@/lib/api", () => ({
  callTrpcMutation: vi.fn(),
  getApiBaseUrl: vi.fn(() => "https://api.example.com/"),
}));

const mockCallTrpcMutation = vi.mocked(callTrpcMutation);

const serverCourses: VoaCourse[] = [
  {
    id: "server-beginner",
    title: "Server Beginner",
    level: 1,
    description: "beginner course from server",
    lessonCount: 1,
  },
  {
    id: "server-intermediate",
    title: "Server Intermediate",
    level: 2,
    description: "intermediate course from server",
    lessonCount: 1,
  },
];

const serverLesson: VoaLesson = {
  id: "server-lesson",
  title: "Server Lesson",
  audioUrl: "https://api.example.com/audio/server.mp3",
  durationSec: 120,
  transcript: ["First server line.", "Second server line."],
  translation: ["第一句译文。", "第二句译文。"],
};

beforeEach(() => {
  mockCallTrpcMutation.mockReset();
});

describe("VOA level mapping", () => {
  it("maps levels to difficulty levels", () => {
    expect(VOA_LEVEL_DIFFICULTY[1]).toBe("beginner");
    expect(VOA_LEVEL_DIFFICULTY[2]).toBe("medium");
    expect(VOA_LEVEL_DIFFICULTY[3]).toBe("advanced");
  });

  it("maps levels to display titles", () => {
    expect(VOA_LEVEL_TITLES[1]).toBe("Level 1 入门");
    expect(VOA_LEVEL_TITLES[2]).toBe("Level 2 进阶");
    expect(VOA_LEVEL_TITLES[3]).toBe("Level 3 高级");
  });
});

describe("local placeholder data", () => {
  it("provides one course per level", () => {
    const courses = getLocalCourses();
    expect(courses).toHaveLength(3);
    expect(courses.map((course) => course.level).sort()).toEqual([1, 2, 3]);
  });

  it("keeps lesson counts in sync with the embedded lessons", () => {
    for (const course of getLocalCourses()) {
      expect(course.lessons?.length).toBeGreaterThan(0);
      expect(course.lessonCount).toBe(course.lessons?.length);
      expect(course.title.trim().length).toBeGreaterThan(0);
      expect(course.description.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps transcript and translation aligned for every lesson", () => {
    const lessonIds = new Set<string>();
    for (const course of getLocalCourses()) {
      for (const lesson of course.lessons ?? []) {
        expect(lessonIds.has(lesson.id)).toBe(false);
        lessonIds.add(lesson.id);
        expect(lesson.transcript.length).toBeGreaterThan(0);
        expect(lesson.translation).toHaveLength(lesson.transcript.length);
        for (const line of lesson.transcript) {
          expect(line.trim().length).toBeGreaterThan(0);
        }
        for (const line of lesson.translation) {
          expect(line.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("looks up courses and lessons by id", () => {
    expect(getLocalCourse("as-it-is")?.title).toBe("As It Is");
    expect(getLocalCourse("lets-learn-english-basics")?.level).toBe(1);
    expect(getLocalCourse("education")?.level).toBe(3);
    expect(getLocalCourse("unknown")).toBeUndefined();
    expect(getLocalLessons("as-it-is")).toHaveLength(1);
    expect(getLocalLessons("unknown")).toEqual([]);
  });
});

describe("fetchVoaCourses", () => {
  it("requests the voa.courses procedure with the level and retry options", async () => {
    mockCallTrpcMutation.mockResolvedValue({ courses: serverCourses });
    await fetchVoaCourses(2);
    expect(mockCallTrpcMutation).toHaveBeenCalledWith(
      "voa.courses",
      { level: 2 },
      { timeoutMs: 10_000, retries: 1 },
    );
  });

  it("sends an empty payload when no level is given", async () => {
    mockCallTrpcMutation.mockResolvedValue({ courses: serverCourses });
    await fetchVoaCourses();
    expect(mockCallTrpcMutation).toHaveBeenCalledWith(
      "voa.courses",
      {},
      { timeoutMs: 10_000, retries: 1 },
    );
  });

  it("returns server courses filtered by level", async () => {
    mockCallTrpcMutation.mockResolvedValue({ courses: serverCourses });
    const courses = await fetchVoaCourses(2);
    expect(courses).toEqual([serverCourses[1]]);
  });

  it("returns every server course when no level is given", async () => {
    mockCallTrpcMutation.mockResolvedValue({ courses: serverCourses });
    const courses = await fetchVoaCourses();
    expect(courses).toEqual(serverCourses);
  });

  it("falls back to local courses when the procedure rejects", async () => {
    mockCallTrpcMutation.mockRejectedValue(new Error("offline"));
    const courses = await fetchVoaCourses(2);
    expect(courses).toEqual([getLocalCourse("as-it-is")]);
  });

  it("falls back to local courses when the server returns no courses", async () => {
    mockCallTrpcMutation.mockResolvedValue({ courses: [] });
    const courses = await fetchVoaCourses();
    expect(courses).toEqual(getLocalCourses());
  });

  it("falls back to local courses when the response shape is unexpected", async () => {
    mockCallTrpcMutation.mockResolvedValue({});
    const courses = await fetchVoaCourses(1);
    expect(courses).toEqual([getLocalCourse("lets-learn-english-basics")]);
  });
});

describe("fetchVoaCourseDetail", () => {
  it("requests the voa.detail procedure with the course id", async () => {
    mockCallTrpcMutation.mockResolvedValue({
      course: serverCourses[1],
      lessons: [serverLesson],
    });
    await fetchVoaCourseDetail("server-intermediate");
    expect(mockCallTrpcMutation).toHaveBeenCalledWith(
      "voa.detail",
      { id: "server-intermediate" },
      { timeoutMs: 10_000, retries: 1 },
    );
  });

  it("returns the server course and lessons", async () => {
    mockCallTrpcMutation.mockResolvedValue({
      course: serverCourses[1],
      lessons: [serverLesson],
    });
    const detail = await fetchVoaCourseDetail("server-intermediate");
    expect(detail.course).toEqual(serverCourses[1]);
    expect(detail.lessons).toEqual([serverLesson]);
  });

  it("defaults missing lessons to an empty array", async () => {
    mockCallTrpcMutation.mockResolvedValue({ course: serverCourses[1] });
    const detail = await fetchVoaCourseDetail("server-intermediate");
    expect(detail.lessons).toEqual([]);
  });

  it("falls back to the local course when the procedure rejects", async () => {
    mockCallTrpcMutation.mockRejectedValue(new Error("offline"));
    const detail = await fetchVoaCourseDetail("as-it-is");
    expect(detail.course).toEqual(getLocalCourse("as-it-is"));
    expect(detail.lessons).toEqual(getLocalLessons("as-it-is"));
  });

  it("returns a null course for an unknown id", async () => {
    mockCallTrpcMutation.mockRejectedValue(new Error("offline"));
    const detail = await fetchVoaCourseDetail("unknown");
    expect(detail).toEqual({ course: null, lessons: [] });
  });
});

describe("voaLessonToLines", () => {
  it("converts transcript entries to alternating-speaker lines", () => {
    const lines = voaLessonToLines(serverLesson);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toEqual({
      id: "server-lesson-1",
      speaker: "Alex",
      text: "First server line.",
      translation: "第一句译文。",
      note: "VOA Learning English",
    });
    expect(lines[1]).toEqual({
      id: "server-lesson-2",
      speaker: "Mia",
      text: "Second server line.",
      translation: "第二句译文。",
      note: "VOA Learning English",
    });
  });

  it("falls back to an empty translation when the translation is missing", () => {
    const lines = voaLessonToLines({
      ...serverLesson,
      translation: ["只有一句。"],
    });
    expect(lines[1].translation).toBe("");
  });
});

describe("voaAudioBaseUrl", () => {
  it("strips the trailing slash from the API base url", () => {
    expect(voaAudioBaseUrl()).toBe("https://api.example.com");
  });
});
