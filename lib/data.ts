// 类型定义
export type Speaker = "Alex" | "Mia" | string;

export interface ListeningLine {
  id: string;
  speaker: Speaker;
  text: string;
  translation: string;
  note?: string;
}

export type SceneKey = 
  | "greetings" 
  | "travel" 
  | "business" 
  | "housing" 
  | "medical" 
  | "banking" 
  | "shopping" 
  | "transit" 
  | "government" 
  | "school"
  | "extra1"
  | "extra2";

export interface SceneInfo {
  key: SceneKey;
  title: string;
  subtitle: string;
  lines?: ListeningLine[];
}

export type Scene = SceneInfo;

export const LISTENING_LINES: ListeningLine[] = Array.from({ length: 100 }, (_, i) => ({
  id: `line-${i + 1}`,
  speaker: i % 2 === 0 ? "Alex" : "Mia",
  text: `This is sample listening line number ${i + 1} for English practice.`,
  translation: `这是用于英语练习的第 ${i + 1} 条示例听力文本。`,
  note: `sample note ${i + 1}`
}));

export const SCENE_CONTENT: Record<SceneKey, ListeningLine[]> = {
  greetings: Array.from({ length: 100 }, (_, i) => ({ 
    id: `greetings-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Greetings line ${i+1}`, 
    translation: `问候句 ${i+1}`,
    note: `greetings note ${i+1}`
  })),
  travel: Array.from({ length: 100 }, (_, i) => ({ 
    id: `travel-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Travel line ${i+1}`, 
    translation: `旅游句 ${i+1}`,
    note: `travel note ${i+1}`
  })),
  business: Array.from({ length: 100 }, (_, i) => ({ 
    id: `business-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Business line ${i+1}`, 
    translation: `商务句 ${i+1}`,
    note: `business note ${i+1}`
  })),
  housing: Array.from({ length: 100 }, (_, i) => ({ 
    id: `housing-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Housing line ${i+1}`, 
    translation: `住房句 ${i+1}`,
    note: `housing note ${i+1}`
  })),
  medical: Array.from({ length: 100 }, (_, i) => ({ 
    id: `medical-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Medical line ${i+1}`, 
    translation: `医疗句 ${i+1}`,
    note: `medical note ${i+1}`
  })),
  banking: Array.from({ length: 100 }, (_, i) => ({ 
    id: `banking-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Banking line ${i+1}`, 
    translation: `银行句 ${i+1}`,
    note: `banking note ${i+1}`
  })),
  shopping: Array.from({ length: 100 }, (_, i) => ({ 
    id: `shopping-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Shopping line ${i+1}`, 
    translation: `购物句 ${i+1}`,
    note: `shopping note ${i+1}`
  })),
  transit: Array.from({ length: 100 }, (_, i) => ({ 
    id: `transit-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Transit line ${i+1}`, 
    translation: `交通句 ${i+1}`,
    note: `transit note ${i+1}`
  })),
  government: Array.from({ length: 100 }, (_, i) => ({ 
    id: `government-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Government line ${i+1}`, 
    translation: `政务句 ${i+1}`,
    note: `government note ${i+1}`
  })),
  school: Array.from({ length: 100 }, (_, i) => ({ 
    id: `school-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `School line ${i+1}`, 
    translation: `学校句 ${i+1}`,
    note: `school note ${i+1}`
  })),
  extra1: Array.from({ length: 100 }, (_, i) => ({ 
    id: `extra1-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Extra1 line ${i+1}`, 
    translation: `补充句1-${i+1}`,
    note: `extra1 note ${i+1}`
  })),
  extra2: Array.from({ length: 100 }, (_, i) => ({ 
    id: `extra2-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Extra2 line ${i+1}`, 
    translation: `补充句2-${i+1}`,
    note: `extra2 note ${i+1}`
  })),
};

export const SCENES: SceneInfo[] = [
  { key: "greetings", title: "日常问候", subtitle: "Basic social greetings and self-introductions.", lines: SCENE_CONTENT.greetings },
  { key: "travel", title: "出行旅游", subtitle: "Navigating cities, asking for directions, and transport.", lines: SCENE_CONTENT.travel },
  { key: "business", title: "商务职场", subtitle: "Professional communication, meetings, and office talk.", lines: SCENE_CONTENT.business },
  { key: "housing", title: "房屋租赁", subtitle: "Renting apartments, dealing with landlords, and utilities.", lines: SCENE_CONTENT.housing },
  { key: "medical", title: "医疗健康", subtitle: "Visiting doctors, describing symptoms, and pharmacies.", lines: SCENE_CONTENT.medical },
  { key: "banking", title: "银行金融", subtitle: "Opening accounts, transfers, and handling money.", lines: SCENE_CONTENT.banking },
  { key: "shopping", title: "购物消费", subtitle: "Buying items, bargaining, and customer service.", lines: SCENE_CONTENT.shopping },
  { key: "transit", title: "公共交通", subtitle: "Subways, buses, and schedules.", lines: SCENE_CONTENT.transit },
  { key: "government", title: "政府政务", subtitle: "Visas, IDs, and official paperwork.", lines: SCENE_CONTENT.government },
  { key: "school", title: "学校沟通", subtitle: "Classes, teachers, and campus life.", lines: SCENE_CONTENT.school },
  { key: "extra1", title: "日常生活", subtitle: "Casual everyday conversations.", lines: SCENE_CONTENT.extra1 },
  { key: "extra2", title: "兴趣爱好", subtitle: "Talking about sports, music, and free time.", lines: SCENE_CONTENT.extra2 },
];

export function getSceneLines(sceneKey: SceneKey | string): ListeningLine[] {
  return SCENE_CONTENT[sceneKey as SceneKey] || LISTENING_LINES;
}

export const PRACTICE_DIALOGUE: ListeningLine[] = [
  { id: "prac-1", speaker: "Alex", text: "Hello, how can I help you today?", translation: "你好，今天有什么我可以帮你的吗？", note: "practice note 1" },
  { id: "prac-2", speaker: "Mia", text: "I am looking for some advanced practice options.", translation: "我在寻找一些高级练习选项。", note: "practice note 2" }
];

export function getPracticeDialogue(scene: string, level: string): ListeningLine[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${scene}-${level}-${i + 1}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Advanced practice dialogue line ${i + 1} for ${scene}.`,
    translation: `${scene} 的高级练习对话第 ${i + 1} 行。`,
    note: `practice ${scene} note ${i + 1}`
  }));
}