const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../data/keke-reading");

const jane = {
  id: "jane-eyre-1",
  title: "《简·爱》- 1",
  audioUrl: "https://speakwise-wsicpu2u.manus.space/audio/jane-eyre-1.mp3",
  durationSec: 280,
  transcript: [
    "What is all this? demanded another voice peremptorily; and Mrs. Reed came along the corridor, her cap flying wide, her gown rustling stormily.",
    "Abbott and Bessie, I believe I gave orders that Jane Eyre should be left in the red-room till I came to her myself.",
    "Miss Jane screamed so loud, ma'am, pleaded Bessie.",
    "Let her go, was the only answer.",
    "Come here, Miss Jane: your name is Jane, is it not?",
    "Yes, sir, Jane Eyre.",
    "Well, you have been crying, Miss Jane Eyre; can you tell me what about? Have you any pain?",
    "No, sir.",
    "Oh! I daresay she is crying because she could not go with Missis in the carriage, interposed Bessie.",
    "Surely not! why, she is too old for such pettishness."
  ],
  translation: [
    "“这是怎么回事？”一个专横的声音问道；里德太太沿着走廊走来，帽子歪戴着，衣服沙沙作响。",
    "“阿博特和贝西，我相信我命令过，把简·爱关在红房子里，直到我亲自来。”",
    "“小姐简叫得可响了，夫人。”贝西说。",
    "“放开她。”这就是唯一的回答。",
    "“到这儿来，简小姐：你的名字是简，不是吗？”",
    "“是的，先生，简·爱。”",
    "“怎么了，简·爱小姐，你在哭什么？你哪儿疼吗？”",
    "“不，先生。”",
    "“哦！我敢说她哭是因为她没能跟太太一起坐马车。”贝西插嘴说。",
    "“胡说！她都这么大了，怎么可能耍小性子。”"
  ],
  source: "可可英语-名著精读",
  category: "经典文学",
  difficulty: "L3"
};

fs.writeFileSync(path.join(dir, "jane-eyre-1.json"), JSON.stringify(jane, null, 2), "utf-8");
console.log("jane-eyre-1.json written");

const pride = {
  id: "pride-prejudice-1",
  title: "《傲慢与偏见》- 1",
  audioUrl: "https://speakwise-wsicpu2u.manus.space/audio/pride-prejudice-1.mp3",
  durationSec: 260,
  transcript: [
    "Mr. Darcy corroborated it with a bow, and was beginning to determine not to fix his eyes on Elizabeth, when they were suddenly arrested by the sight of the stranger, and Elizabeth happening to see the countenance of both as they looked at each other, was all astonishment at the effect of the meeting.",
    "Both changed colour, one looked white, the other red. Mr. Wickham, after a few moments, touched his hat -- a salutation which Mr. Darcy just deigned to return.",
    "What could be the meaning of it? -- It was impossible to imagine; it was impossible not to long to know.",
    "In another minute Mr. Bingley, but without seeming to have noticed what passed, took leave and rode on with his friend.",
    "Mr. Collins was not a sensible man, and the deficiency of nature had been but little assisted by education or society.",
    "The greatest part of his life having been spent under the guidance of an illiterate and miserly father; and though he belonged to one of the universities, he had merely kept the necessary terms, without forming at it any useful acquaintance.",
    "The subjection in which his father had brought him up had given him originally great humility of manner, but it was now a good deal counteracted by the self-conceit of a weak head, living in retirement, and the consequential feelings of early and unexpected prosperity.",
    "A fortunate chance had recommended him to Lady Catherine de Bourgh when the living of Hunsford was vacant; and the respect which he felt for her high rank and his veneration for her as his patroness, mingling with a very good opinion of himself, of his authority as a clergyman, and his rights as a rector, made him altogether a mixture of pride and obsequiousness, self-importance and humility."
  ],
  translation: [
    "达西证明他没有撒谎，同时鞠了个躬。达西正打算把眼睛从伊丽莎白身上移开，这时突然看到了那个陌生人。只见他们两人面面相觑，大惊失色，伊丽莎白看到这个邂逅相遇的场合，觉得很是惊奇。",
    "两个人都变了脸色，一个惨白，一个通红，过了一会儿，韦翰先生按了按帽子，达西先生勉强回了一下礼。这是什么意思呢？既叫人无从想象，又叫人不能不想去打听一下。",
    "又过了一会儿，彬格莱先生若无其事地跟她们告别了，骑着马跟他朋友管自走了。",
    "柯林斯先生并不是个通情达理的人，他虽然也受过教育，也踏进了社会，但是先天的缺陷却简直没有得到什么弥补。",
    "他大部分日子是在他那守财奴的文盲父亲的教导下度过的。他也算进过大学，实际上不过照例住了几个学期，并没有结交一个有用的朋友。",
    "他的父亲管束得他十分严厉，因此他的为人本来很是谦卑，不过他本是个蠢材，现在生活又过得很优闲，当然不免自高自大，何况年纪轻轻就发了意外之财，更其自视甚高，哪里还谈得上谦卑。",
    "当时汉斯福教区有个牧师空缺，他鸿运享通，得到了咖苔琳·德·包尔夫人的提拔。他看到他的女施主地位颇高，便悉心崇拜，备加尊敬；另方面又自命不凡，自以为当上了教士，该有怎样怎样的权利，于是他一身兼有了骄傲自大和谦卑顺从的两重性格。"
  ],
  source: "可可英语-名著精读",
  category: "经典文学",
  difficulty: "L3"
};

fs.writeFileSync(path.join(dir, "pride-prejudice-1.json"), JSON.stringify(pride, null, 2), "utf-8");
console.log("pride-prejudice-1.json written");

const littlePrince = {
  id: "little-prince-1",
  title: "《小王子》- 1",
  audioUrl: "https://speakwise-wsicpu2u.manus.space/audio/little-prince-1.mp3",
  durationSec: 240,
  transcript: [
    "Once when I was six years old I saw a magnificent picture in a book, called Stories from Nature, about the primeval forest.",
    "It was a picture of a boa constrictor, in the process of swallowing a wild animal.",
    "He kept the whole forest under his control, and no one dared to disobey him.",
    "I thought to myself: if I could draw, I would draw a picture of a boa constrictor digesting an elephant.",
    "But I had never drawn anything in my life before.",
    "So I drew my first picture, Number One.",
    "It looked like this: a hat.",
    "I showed my drawing to the grown-ups, and asked them whether it was beautiful.",
    "They answered me: why should a hat be beautiful? It is only a hat.",
    "They did not understand that it was not a hat at all.",
    "It was a boa constrictor digesting an elephant."
  ],
  translation: [
    "我六岁的时候，在一本名为《自然故事》的书里，看到了一幅关于原始森林的壮丽画面。",
    "那是一条巨蟒正在吞食一只野兽的画面。",
    "他把整个森林都控制在手中，没有人敢违背他的命令。",
    "我心想：如果我会画画，我会画一幅巨蟒消化大象的画。",
    "但我以前从没画过任何东西。",
    "所以我画了我的第一幅画，图一号。",
    "它看起来像这样：一顶帽子。",
    "我把画拿给大人看，问他们这幅画美不美。",
    "他们回答我：一顶帽子有什么好看的？不过是一顶帽子而已。",
    "他们根本没看出来，这根本不是帽子。",
    "这是一条正在消化大象的巨蟒。"
  ],
  source: "可可英语-名著精读",
  category: "经典文学",
  difficulty: "L2"
};

fs.writeFileSync(path.join(dir, "little-prince-1.json"), JSON.stringify(littlePrince, null, 2), "utf-8");
console.log("little-prince-1.json written");

// Update store.json with all lessons
const storePath = path.join(dir, "store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

const allLessons = [jane, pride, littlePrince];

// Remove old lessons from store and re-add all
const existingIds = new Set(allLessons.map(l => l.id));
store.courses.forEach(course => {
  if (course.lessons) {
    course.lessons = course.lessons.filter(l => !existingIds.has(l.id));
  }
});

// Add new lessons to the classics course
let classicsCourse = store.courses.find(c => c.id === "keke-reading-classics");
if (!classicsCourse) {
  classicsCourse = {
    id: "keke-reading-classics",
    title: "可可英语名著精读",
    level: 3,
    description: "可可英语精选经典名著双语对照课文，含英文原文与中文翻译",
    lessonCount: 0,
    updatedAt: Date.now(),
    feedId: "kk-reading",
    lessons: []
  };
  store.courses.push(classicsCourse);
}

classicsCourse.lessons.push(...allLessons);
classicsCourse["lessonCount"] = classicsCourse.lessons.length;
classicsCourse.updatedAt = Date.now();

store.feeds["kk-reading"].itemCount = classicsCourse.lessons.length;
store.feeds["kk-reading"].lastFetched = Date.now();

fs.writeFileSync(storePath, JSON.stringify(store, null, 2), "utf-8");
console.log("store.json updated with " + allLessons.length + " new lessons");