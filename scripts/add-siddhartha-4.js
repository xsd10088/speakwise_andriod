#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson4 = {
    "id": "siddhartha-brahmin-son-4",
    "title": "《悉达多》- 卡玛拉的邀请",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-4.mp3",
    "durationSec": 300,
    "transcript": [
        "At about noon, he came through a village. In front of the mud cottages, children were rolling about in the street, were playing with pumpkin-seeds and sea-shells, screamed and wrestled, but they all timidly fled from the unknown Samana.",
        "In the end of the village, the path led through a stream, and by the side of the stream, a young woman was kneeling and washing clothes.",
        "When Siddhartha greeted her, she lifted her head and looked up to him with a smile, so that he saw the white in her eyes glistening.",
        "He called out a blessing to her, as it is the custom among travellers, and asked how far he still had to go to reach the large city.",
        "Then she got up and came to him, beautifully her wet mouth was shimmering in her young face. She exchanged humorous banter with him, asked whether he had eaten already, and whether it was true that the Samanas slept alone in the forest at night and were not allowed to have any women with them.",
        "While talking, she put her left foot on his right one and made a movement as a woman does who would want to initiate that kind of sexual pleasure with a man, which the textbooks call 'climbing a tree'.",
        "Siddhartha felt his blood heating up, and since in this moment he had to think of his dream again, he bend slightly down to the woman and kissed with his lips the brown nipple of her breast.",
        "Looking up, he saw her face smiling full of lust and her eyes, with contracted pupils, begging with desire.",
        "Siddhartha also felt desire and felt the source of his sexuality moving; but since he had never touched a woman before, he hesitated for a moment, while his hands were already prepared to reach out for her."
    ],
    "translation": [
        "中午时分，他穿过一个小村庄。房屋前的泥泞小屋里，孩子们在街道上打滚，玩着南瓜子和海贝壳，大叫着打斗，但他们都谨慎地躲开这位陌生的苏马纳。",
        "村庄尽头，小路穿过一条小溪，溪边有一位年轻女子蹲下水衣服。",
        "当悉达多向她问好时，她抬起头，微笑地望着他，让悉达多看见她眼中闪烁的白光。",
        "他朝她鞠个礼，作为旅人Among travelers的习俗，询问前往大城的路程。",
        "她站了起来站在他面前，湿漉漉的嘴唇在年轻的脸上闪耀着光彩。她和他輕鬆地聊天，問他是否吃过饭，以及苏馬納在森林中独睡的真實。",
        "邊聊天，她把左腳踩在他的右脚上，做出女人想要與男人親密接觸的姿勢，教科書稱之為'樹上攀爬'。",
        "悉達多血液沸騰，他正要回想那個夢想，稍微垂下頭，親吻她乳頭上 Brown 的 nipple。",
        "抬頭看去，他看到她的臉上滿滿的欲望的微笑，她的眼睛瞪得象牙白晰，懇求不已。",
        "悉達多也感到欲望，親激的感官來源在動搖；但他從未碰過女人，他猶豫了一會，他的手已經準備好伸向她。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
course.lessons.push(lesson4);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-4 课本');
console.log('总课数:', course.lessonCount);