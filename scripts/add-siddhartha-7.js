#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson7 = {
    "id": "siddhartha-brahmin-son-7",
    "title": "《悉达多》- 河畔的觉醒",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-7.mp3",
    "durationSec": 360,
    "transcript": [
        "Siddhartha walked through the forest and knew nothing but that one thing, that there was no going back for him.",
        "He had tasted all of it, sucked everything out of it until he was disgusted with it.",
        "Dead was the singing bird he had dreamt of. Dead was the bird in his heart.",
        "He felt emptiness, despair, the need to end it all.",
        "He reached the large river and stopped at the bank, leaning against a coconut tree.",
        "He looked down into the green water and saw his reflection, and spat at it.",
        "With a distorted face he stared into the water, saw the reflection of his face, and spat at it.",
        "Then, out of remote areas of his soul, out of past times of his now weary life, a sound stirred up.",
        "It was a word, a syllable, which he spoke to himself, the old word which is the beginning and the end of all prayers of the Brahmans, the holy Om.",
        "In the moment when the sound of Om touched his ear, his dormant spirit suddenly woke up and realized the foolishness of his actions.",
        "Om! he spoke to himself, and again he knew about Brahman, knew about the indestructibility of life.",
        "By the foot of the coconut tree, Siddhartha collapsed, struck down by tiredness, mumbling Om, placed his head on the root of the tree and fell into a deep sleep.",
        "When he woke up after many hours, he felt as if ten years had passed."
    ],
    "translation": [
        "悉达多穿过森林，什么也不想起，只觉那件事已无往前的可能。",
        "他尝尽一切，吸尽一切，直到对它感到厌烦。",
        "他梦见的那只歌鸟已死。心中那只鸟也死了。",
        "他感到空虚，感到绝望，想要终结一切。",
        "他来到大河边，靠在椰子树下停住。",
        "他仰视绿水，看见自己的倒影，吐了口气。",
        "面容扭曲，他凝视水中倒影，又吐了口气。",
        "然后，从疲惫灵魂的远方，从他疲惫的往昔时光，有声响起。",
        "这是一声声音，一声音节，他对自己说，这声是梵医祈祷的开端与终点，圣洁的唵。",
        "当唵的声音触到他耳朵，那沉睡的灵魂忽然苏醒，意识到自己行为的愚蠢。",
        "唵！他自言自语，再次知道梵，知道生命的不可毁灭。",
        "靠在椰子树根部，悉达多倒下，疲惫地倒在地上，嘴里嘀咕唵，脑袋靠在树根上，沉入深眠。",
        "醒来后，他感觉像过了十年。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
course.lessons.push(lesson7);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-7 课本');
console.log('总课数:', course.lessonCount);