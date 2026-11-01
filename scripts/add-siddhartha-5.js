#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson5 = {
    "id": "siddhartha-brahmin-son-5",
    "title": "《悉达多》- 卡玛拉的哲学",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-5.mp3",
    "durationSec": 320,
    "transcript": [
        "Siddhartha felt desire and felt the source of his sexuality moving; but since he had never touched a woman before, he hesitated for a moment.",
        "In this moment he heard, shuddering with awe, the voice of his innermost self saying No. Then all charms disappeared from the young woman's smiling face.",
        "He politely petted her cheek, turned away from her and disappeared away from the disappointed woman with light steps into the bamboo-wood.",
        "He reached the large city before the evening and was happy to be among people again after living in forests for so long.",
        "When late in the afternoon, beautiful Kamala approached her grove in her sedan-chair, Siddhartha was standing at the entrance and bowed to meet her.",
        "He motioned to the servant at the end of her train and asked him to inform Kamala that a young Brahman wished to speak with her.",
        "After a while the servant returned and led him silently into a pavilion where Kamala lay on a couch alone with him.",
        "She asked why he had come and whether it was enough to have seen her.",
        "Siddhartha replied that he came to learn from her, as a Brahman from the ascetics.",
        "Kamala laughed: Never before had a Samana from the forest wanted to learn from her."
    ],
    "translation": [
        "悉达多感到欲望，感到他生殖器的源头正在动摇；但由于他从未碰过女人，他犹豫了一会儿。",
        "就在这一瞬间，他听见自己的内心之声说不。这时，所有魅力都从年轻女性的微笑脸上消失。",
        "他礼貌地抚摸她的脸颊，转身离开，轻盈地走进竹林，离开这位沮丧的女人。",
        "他在傍晚前到达大城市，感到很高兴，久久未见人间。",
        "傍晚时分，漂亮的卡玛拉她身披花轿来到花园，悉达多站在入口处鞠谢。",
        "他指示她身边的仆人，请求他把消息告诉卡玛拉：一位年轻婆罗门想与她商量。",
        "稍等片刻，仆人带他进入她身后的亭屋，卡玛拉暌待沙发上，悉达多独自与她相见。",
        "她问他为何而来，是否够见她就好。",
        "悉达多说他来学习，就像来自苏马纳的婆罗门。",
        "卡玛拉笑道：从未想过，森林里的苏马纳想向她学习。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
course.lessons.push(lesson5);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-5 课本');
console.log('总课数:', course.lessonCount);