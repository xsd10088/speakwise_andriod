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

export type KekeReadingCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

export const KEKE_CATEGORIES: KekeReadingCategory[] = [
  {
    id: "voa",
    title: "VOA 精选",
    icon: "Radio",
    description: "VOA Learning English 精选课程",
  },
  {
    id: "bbc",
    title: "BBC 精选",
    icon: "Radio",
    description: "BBC Learning English 精选课程",
  },
  {
    id: "basic",
    title: "基础英语",
    icon: "Ab",
    description: "少儿英语、英语单词、英语语法、新闻杂志、故事小说",
  },
  {
    id: "audiobooks",
    title: "有声名著",
    icon: "Book",
    description: "经典名著、格林童话、安徒生童话、王尔德短篇、欧亨利短篇、奇幻小说、福尔摩斯、影视原著、寓言故事、中国名著、其它系列",
  },
  {
    id: "media",
    title: "影音娱乐",
    icon: "Music",
    description: "听歌学英语、电影原声、美剧原声、英剧原声、纪录片、影视课堂、脱口秀、明星娱乐",
  },
  {
    id: "listening",
    title: "英语听力",
    icon: "Radio",
    description: "听力入门、实战听力、经典教材、精选播客、演讲访谈、TED演讲、名人传记、美文诗歌、公开课",
  },
  {
    id: "speaking",
    title: "英语口语",
    icon: "Mic",
    description: "音标发音、初级口语、实战口语、行业口语、商务职场、旅游口语、求职面试、情景会话、外教口语",
  },
  {
    id: "exam",
    title: "英语考试",
    icon: "Document",
    description: "四级、六级、翻译、BEC、专四、专八、考研、雅思、托福、其它留学、小学、初中、高中、大学",
  },
  {
    id: "knowledge",
    title: "涨知识",
    icon: "GraduationCap",
    description: "科普、励志、历史、旅游、外教、娱乐、头条、美食、社会、影音、演讲、儿童",
  },
  {
    id: "daily",
    title: "每日收听",
    icon: "VolumeHigh",
    description: "VOA精选、BBC精选、CNN精选、NPR精选、CRI精选、科学美国人、经济学人、AP精选、PBS访谈、热点话题、21世纪英文报、中国日报",
  },
  {
    id: "source",
    title: "题源外刊",
    icon: "Newspaper",
    description: "高考题源、四六级题源、专四八题源、考研题源、雅思题源、托福题源",
  },
  {
    id: "graded",
    title: "分级读物",
    icon: "BookOpen",
    description: "小学难度、初中难度、高中难度、四级难度、六级难度、考研难度",
  },
];

export function getKekeReadingCategories(): KekeReadingCategory[] {
  return KEKE_CATEGORIES;
}

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