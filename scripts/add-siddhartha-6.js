#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson6 = {
    "id": "siddhartha-brahmin-son-6",
    "title": "《悉达多》- 财富与悔恨",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-6.mp3",
    "durationSec": 340,
    "transcript": [
        "Siddhartha went to Kamaswami the merchant, was directed into a rich house, servants led him between precious carpets into a chamber where he awaited the master of the house.",
        "Kamaswami entered swiftly, smoothly, with very gray hair and very intelligent cautious eyes and a greedy mouth.",
        "I have been told that you were a Brahman, a learned man, but that you seek to be in the service of a merchant. Might you have become destitute, Brahman, so that you seek to serve?",
        "No, I have not become destitute and have never been destitute. You should know that I am coming from the Samanas, with whom I have lived for a long time.",
        "If you are coming from the Samanas, how could you be anything but destitute? Aren't the Samanas entirely without possessions?",
        "I am without possessions, if this is what you mean. Surely I am without possessions. But I am so voluntarily, and therefore I am not destitute.",
        "But what are you planning to live of, being without possessions?",
        "I haven't thought of this yet, sir. For more than three years I have been without possessions and have never thought about what to live of.",
        "So you have lived of the possessions of others. Presumable this is how it is. After all, a merchant also lives of what other people own.",
        "Well said. But he would not take anything from another person for nothing; he would give his merchandise in return."
    ],
    "translation": [
        "悉达多去见卡马斯瓦米商人，被带到富人家中，仆人们把他领在珍贵的地毯之间，进入一个等候主人出现的屋子。",
        "卡马斯瓦米迅速、平稳地进入，有着 very gray 的头发，有着 very intelligent 的慎重的眼睛，还有一个贪婪的嘴唇。",
        "我听说你是一位婆罗门，一个有学问的人，但你寻觋成为Merchant的服务。你是不是饿了，所以想成为仆役？",
        "不，我没有饿了，也从未饿过。你要知道，我是来自苏马纳手中的，而我生活了很久。",
        "如果你来自苏马纳，对吧？怎么还能有什么财产？苏马纳不都没有财产吗？",
        "我没有财产，如果那是你的意思。是的，我没有财产。但这是自愿的，因此我不饿。",
        "但你打算靠什么生活？",
        "我还没有想过，先生。三年来，我一直没有财产，也没想过怎么活。",
        "所以你靠别人的财产生活。是的，这大概就是这样。毕竟，商人也靠别人的财产生活。",
        "说得好。但他不会免费从别人那里收获；他会用商品偿还。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
course.lessons.push(lesson6);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-6 课本');
console.log('总课数:', course.lessonCount);