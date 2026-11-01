const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson = {
    "id": "siddhartha-brahmin-son-11",
    "title": "《悉达多》- 终成得意",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-11.mp3",
    "durationSec": 320,
    "transcript": [
        "Siddhartha straightened up and saw a person sitting opposite to him, an unknown man, a monk in a yellow robe with a shaven head, sitting in the position of pondering.",
        "He observed the man, who had neither hair on his head nor a beard, and he had not observed him for long when he recognised this monk as Govinda, the friend of his youth.",
        "Govinda had aged, he too, but still his face bore the same features, expressed zeal, faithfulness, searching, timidness. But when Govinda now, sensing his gaze, opened his eyes and looked at him, Siddhartha saw that Govinda did not recognise him.",
        "Govinda was happy to find him awake; apparently he had been sitting here for a long time and been waiting for him to wake up, though he did not know him.",
        "I have been sleeping, said Siddhartha. However did you get here?",
        "You are Siddhartha! Now I'm recognising you, and don't comprehend any more how I couldn't recognise you right away. Be welcome, Siddhartha, my joy is great, to see you again.",
        "It also gives me joy to see you again. You have been the guard of my sleep, again I thank you for this, though I wouldn't have required any guard.",
        "I'm going nowhere. We monks are always travelling, whenever it is not the rainy season, we always move from one place to another, live according to the rules of the teachings passed on to us, accept alms, move on.",
        "You're saying: you're on a pilgrimage, and I believe you. But few would go on a pilgrimage in such clothes, few in such shoes, few with such hair.",
        "Right so, my dear, you have observed well, your keen eyes see everything. But I haven't said to you that I was a Samana. I said: I'm on a pilgrimage."
    ],
    "translation": [
        "悉达多站了起来，看见一个坐在对面的人，是个不认识的男人，是一位赤头丹头的黄袍僧人，正坐在沉思的姿势里。",
        "他观察这个人——头上无毛，没胡，且没观察多久，他就认出这位僧人是功第达，他的年轻朋友。",
        "功第达也衰老了，但他的脸面still bore the same features，表达着热情、忠诚、寻找、敬畏。但当功第达感觉到目光，睁开眼睛看他时，悉达多看到功第达不认出他。",
        "功第达很高兴看见他醒来；显然他 long time 在那里待着，等待他醒来，尽管他不认识他。",
        "我睡着了，悉达多说。这怎么来的？",
        "你是悉达多！我现在认出你了，不再理解我怎么会不认出你。欢迎，悉达多，见你一次就很高兴。",
        "我也很高兴见你。你曾是我 sleep 的守卫，我再感谢你一次，尽管我不曾需要守卫。",
        "我去 nowhere。我们佛教徒总是旅行，除了雨季，我们总是从一个地方移动到另一个地方，依据传授给我们的教义规则，接受布施，继续前进。",
        "你说：你在朝圣，我相信你。但很少人穿着这些衣服走朝圣，穿着这些鞋子，头发那么长。",
        "是的，我亲爱的，你看得很好，你的锐利的眼睛看见一切。但我没说我是苏马纳，我说：我在朝圣。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3"
};

const course = storeData.courses[0];
if (!course.lessons.find(l => l.id === lesson.id)) {
    course.lessons.push(lesson);
}
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-11 课本');
console.log('总课数:', course.lessonCount);