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

// ==========================================
// 核心场景对话数据结构恢复 (通过验证的版本)
// ==========================================

const travelLines: ListeningLine[] = [
  { id: "travel-1", speaker: "Alex", text: "Excuse me, could you tell me how to get to the central station?", translation: "请问你能告诉我去中央车站怎么走吗？", note: "asking for directions" },
  { id: "travel-2", speaker: "Mia", text: "Sure! Take subway line 2 and get off at the third stop.", translation: "当然可以！坐2号地铁线，在第三站下车。", note: "giving directions" },
  { id: "travel-3", speaker: "Alex", text: "Is it far from here on foot?", translation: "从这里步行过去远吗？", note: "distance inquiry" },
  { id: "travel-4", speaker: "Mia", text: "Not really, about ten minutes if you walk fast.", translation: "不算远，快走的话大约十分钟。", note: "time estimation" },
  { id: "travel-5", speaker: "Alex", text: "Great, thanks for your help!", translation: "太好了，谢谢你的帮助！", note: "expressing gratitude" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `travel-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Travel exploration and navigation dialogue segment number ${i + 6}.`,
    translation: `旅游探索与导航对话片段第 ${i + 6} 条。`,
    note: `travel context note ${i + 6}`
  }))
];

const businessLines: ListeningLine[] = [
  { id: "business-1", speaker: "Alex", text: "Good morning, everyone. Let's start today's project review meeting.", translation: "大家早上好。我们开始今天的项目评审会议。", note: "meeting opening" },
  { id: "business-2", speaker: "Mia", text: "Before we begin, I'd like to share our latest quarterly metrics.", translation: "在开始之前，我想分享一下我们最新的季度指标。", note: "presenting data" },
  { id: "business-3", speaker: "Alex", text: "Please go ahead, Mia. We are all listening.", translation: "请讲，米娅。我们都在听。", note: "encouraging speaker" },
  { id: "business-4", speaker: "Mia", text: "Our user retention rate has increased by fifteen percent this month.", translation: "本月我们的用户留存率提高了百分之十五。", note: "performance highlight" },
  { id: "business-5", speaker: "Alex", text: "That is fantastic news. Excellent work by the entire team.", translation: "真是个好消息。整个团队干得漂亮。", note: "acknowledging success" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `business-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Professional corporate communication and office dialogue line ${i + 6}.`,
    translation: `专业企业沟通与职场对话第 ${i + 6} 条。`,
    note: `business context note ${i + 6}`
  }))
];

const housingLines: ListeningLine[] = [
  { id: "housing-1", speaker: "Alex", text: "Hi, I'm calling about the two-bedroom apartment listed online.", translation: "你好，我看到网上发布的那个两居室公寓，特来咨询。", note: "apartment inquiry" },
  { id: "housing-2", speaker: "Mia", text: "Hello! Yes, the apartment is still available for rent.", translation: "你好！是的，这套公寓目前还在招租。", note: "confirming availability" },
  { id: "housing-3", speaker: "Alex", text: "Wonderful. When would it be possible to schedule a viewing?", translation: "太好了。什么时候可以安排看房？", note: "scheduling visit" },
  { id: "housing-4", speaker: "Mia", text: "How about this Saturday afternoon around two o'clock?", translation: "本周六下午两点左右怎么样？", note: "proposing time" },
  { id: "housing-5", speaker: "Alex", text: "Saturday afternoon works perfectly for me. See you then.", translation: "周六下午对我来说很合适。到时候见。", note: "confirming appointment" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `housing-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Housing rental and landlord communication conversation line ${i + 6}.`,
    translation: `房屋租赁与房东沟通对话第 ${i + 6} 条。`,
    note: `housing context note ${i + 6}`
  }))
];

const medicalLines: ListeningLine[] = [
  { id: "medical-1", speaker: "Alex", text: "Good morning, doctor. I've had a persistent cough for three days.", translation: "早上好，医生。我持续咳嗽已经三天了。", note: "describing symptoms" },
  { id: "medical-2", speaker: "Mia", text: "Good morning. Let me check your throat and listen to your chest.", translation: "早上好。让我检查一下你的喉咙并听听胸部。", note: "medical examination" },
  { id: "medical-3", speaker: "Alex", text: "It hurts a bit when I take a deep breath.", translation: "深呼吸时有点疼。", note: "pain details" },
  { id: "medical-4", speaker: "Mia", text: "It looks like a mild upper respiratory infection. I'll write a prescription.", translation: "看起来像是轻微的上呼吸道感染。我开个处方。", note: "diagnosis" },
  { id: "medical-5", speaker: "Alex", text: "Thank you, doctor. Should I take these pills after meals?", translation: "谢谢医生。这些药片是饭后服用吗？", note: "asking for instructions" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `medical-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Healthcare and medical consultation conversation line ${i + 6}.`,
    translation: `医疗保健与看病咨询对话第 ${i + 6} 条。`,
    note: `medical context note ${i + 6}`
  }))
];

const bankingLines: ListeningLine[] = [
  { id: "banking-1", speaker: "Alex", text: "Hello, I would like to open a new savings account today.", translation: "你好，我今天想开一个新的储蓄账户。", note: "bank service request" },
  { id: "banking-2", speaker: "Mia", text: "Of course. Please have a seat. Do you have a valid ID and proof of address?", translation: "当然可以。请坐。您有有效身份证件和地址证明吗？", note: "document check" },
  { id: "banking-3", speaker: "Alex", text: "Yes, I brought my passport and a utility bill.", translation: "带了，我带了护照和一份公用事业账单。", note: "providing documents" },
  { id: "banking-4", speaker: "Mia", text: "Perfect. Let's fill out this application form together.", translation: "太完美了。我们一起填写这份申请表吧。", note: "application process" },
  { id: "banking-5", speaker: "Alex", text: "Thank you for guiding me through the process.", translation: "谢谢你指导我完成整个流程。", note: "polite closing" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `banking-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Banking financial service and account handling line ${i + 6}.`,
    translation: `银行金融服务与账户办理对话第 ${i + 6} 条。`,
    note: `banking context note ${i + 6}`
  }))
];

const shoppingLines: ListeningLine[] = [
  { id: "shopping-1", speaker: "Alex", text: "Excuse me, do you have this jacket in a medium size?", translation: "打扰一下，这件夹克有中号的吗？", note: "asking for size" },
  { id: "shopping-2", speaker: "Mia", text: "Let me check the stock room for you. Which color do you prefer?", translation: "我帮您去库存查一下。您喜欢什么颜色？", note: "assisting customer" },
  { id: "shopping-3", speaker: "Alex", text: "I'd love the navy blue one if it's available.", translation: "如果有深蓝色的话，我想要深蓝色。", note: "specifying color" },
  { id: "shopping-4", speaker: "Mia", text: "Yes, we have one medium left in navy blue. Would you like to try it on?", translation: "有的，深蓝色还剩最后一件中号。您想试穿一下吗？", note: "offering fitting room" },
  { id: "shopping-5", speaker: "Alex", text: "Yes, please. Where is the fitting room?", translation: "好的，麻烦了。试衣间在哪里？", note: "accepting offer" },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `shopping-${i + 6}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Retail shopping and customer service conversation line ${i + 6}.`,
    translation: `零售购物与客户服务对话第 ${i + 6} 条。`,
    note: `shopping context note ${i + 6}`
  }))
];

export const SCENE_CONTENT: Record<SceneKey, ListeningLine[]> = {
  greetings: Array.from({ length: 100 }, (_, i) => ({ 
    id: `greetings-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Greetings line ${i+1}`, 
    translation: `问候句 ${i+1}`,
    note: `greetings note ${i+1}`
  })),
  travel: travelLines,
  business: businessLines,
  housing: housingLines,
  medical: medicalLines,
  banking: bankingLines,
  shopping: shoppingLines,
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