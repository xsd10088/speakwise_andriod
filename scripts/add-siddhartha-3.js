#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson3 = {
    "id": "siddhartha-brahmin-son-3",
    "title": "《悉达多》- 卡玛拉花园",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-3.mp3",
    "durationSec": 280,
    "transcript": [
        "On the way, Siddhartha also remembered everything he had experienced in the Garden Jetavana, the teaching he had heard there, the divine Buddha, the farewell from Govinda, the conversation with the exalted one.",
        "Again he remembered his own words, he had spoken to the exalted one, every word, and with astonishment he became aware of the fact that there he had said things which he had not really known yet at this time.",
        "What he had said to Gotama: his, the Buddha's, treasure and secret was not the teachings, but the unspeakable and not teachable, which he had experienced in the hour of his enlightenment—it was nothing but this very thing which he had now gone to experience, what he now began to experience. Now, he had to experience his self.",
        "It is true that he had already known for a long time that his self was Atman, in its essence bearing the same eternal characteristics as Brahman. But never, he had really found this self, because he had wanted to capture it in the net of thought.",
        "Both, the thoughts as well as the senses, were pretty things, the ultimate meaning was hidden behind both of them, both had to be listened to, both had to be played with, both neither had to be scorned nor overestimated.",
        "In the night when he slept in the straw hut of a ferryman by the river, Siddhartha had a dream: Govinda was standing in front of him, dressed in the yellow robe of an ascetic. Sad was how Govinda looked like, sadly he asked: Why have you forsaken me?",
        "At this, he embraced Govinda, wrapped his arms around him, and as he was pulling him close to his chest and kissed him, it was not Govinda any more, but a woman, and a full breast popped out of the woman's dress, at which Siddhartha lay and drank, sweetly and strongly tasted the milk from this breast.",
        "It tasted of woman and man, of sun and forest, of animal and flower, of every fruit, of every joyful desire. It intoxicated him and rendered him unconscious. When Siddhartha woke up, the pale river shimmered through the door of the hut, and in the forest, a dark call of an owl resounded deeply and pleasantly.",
        "When the day began, Siddhartha asked his host, the ferryman, to get him across the river. The ferryman got him across the river on his bamboo-raft, the wide water shimmered reddishly in the light of the morning."
    ],
    "translation": [
        "当日，悉达多回想起在叶亚蒙家公园中一切经历，回想起他在那里听到的教义，回想起神圣的佛陀，回想起与功第达的别离，回想起与最尊敬者的谈话。",
        "他又回想起自己当时对佛陀说的每一句话，并惊讶地意识到，那时他说的并非完全理解。",
        "他对佛陀所述的宝贵之秘，并非教义，而是那些无法言说、无法传授的——那正是他此刻开始亲身体验的东西，那正是他正在经历的至至之事。",
        "他确实早知道自己的本我是阿特曼，拥有与梵那般永恒的本质。但他从未真正发现了自己的本我，因为总想用思维的网把它捕获。",
        "思维和感官都是美好的事物，终极意义隐藏在它们之behind；都必须被倾听，都必须被玩弄，都既不该蔑视，也不该高估。",
        "夜晚，悉达多在渡河人小屋的 straw 裘中睡觉，梦见功第达身着黄袍，脸上悲伤地问：\"你为何遗弃我？\"",
        "他拥抱了功第达，紧贴他的胸口亲吻他，就像拥抱一个女人， breast 找到了裙下的 breast，悉达多沾着欢美的味道喝下了那巨丰的奶汁。",
        "那奶汁 tasted of man and woman, of sun and forest, of animal and flower, of every fruit, of every joyful desire. 它 intoxicated him and rendered him unconscious.",
        "当悉达多醒来，薄冷的河水在小屋门外闪烁，森林里一只 dark owl 发出 deep and pleasant 的呼鸣。",
        "黎明时分，悉达多向渡河人请他穿越河流。渡河人用 bamboo 船把他运过河，宽阔的水面在 morning light 中染成 reddish."
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
course.lessons.push(lesson3);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-3 课本');
console.log('总课数:', course.lessonCount);