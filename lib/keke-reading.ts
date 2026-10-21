import kekeReadingStore from "@/data/keke-reading/store.json" with { type: "json" };

export type KekeReadingLevel = "L1" | "L2" | "L3" | "L4";

export type KekeReadingLesson = {
  id: string;
  title: string;
  audioUrl: string;
  durationSec?: number | null;
  transcript: string[];
  translation: string[];
  source: string;
  category: string;
  difficulty: string;
};

export type KekeReadingCourse = {
  id: string;
  title: string;
  level: number | string;
  description: string;
  lessonCount: number;
  updatedAt?: number;
  feedId?: string;
  lessons?: KekeReadingLesson[];
};

export function getKekeReadingCourses(): KekeReadingCourse[] {
  return kekeReadingStore.courses ?? [];
}

export function getKekeReadingCourse(id: string): KekeReadingCourse | undefined {
  return getKekeReadingCourses().find((course) => course.id === id);
}

export function getKekeReadingLessons(courseId: string): KekeReadingLesson[] {
  return getKekeReadingCourse(courseId)?.lessons ?? [];
}

export async function fetchKekeReadingCourses(): Promise<KekeReadingCourse[]> {
  return getKekeReadingCourses();
}

export async function fetchKekeReadingCourseDetail(
  id: string,
): Promise<{ course: KekeReadingCourse | null; lessons: KekeReadingLesson[] }> {
  const course = getKekeReadingCourse(id);
  return {
    course: course ?? null,
    lessons: course?.lessons ?? [],
  };
}

export function kekeReadingLessonToLines(lesson: KekeReadingLesson) {
  return lesson.transcript.map((text, index) => ({
    id: `${lesson.id}-${index + 1}`,
    speaker: index % 2 === 0 ? "Alex" : "Mia",
    text,
    translation: lesson.translation[index] ?? "",
    note: "可可英语名著精读",
  }));
}