const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson = {
    "id": "siddhartha-brahmin-son-10",
    "title": "《悉达多》- 河流的智慧",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-10.mp3",
    "durationSec": 300,
    "transcript": [
        "Siddhartha walked through the forest and knew nothing but that one thing, that there was no going back for him.",
        "He had tasted all of it, sucked everything out of it until he was disgusted with it.",
        "He had been captured by the world, by lust, covetousness, sloth, and finally also by that vice which he had used to despise and mock the most as the most foolish one of all vices: greed.",
        "Property, possessions, and riches also had finally captured him; they were no longer a game and trifles to him, had become a shackle and a burden.",
        "Then the time came when a dream warned him. He had spent the hours of the evening with Kamala in her beautiful pleasure-garden.",
        "They had been sitting under the trees, talking, and Kamala had said thoughtful words, words behind which a sadness and tiredness lay hidden.",
        "She had asked him to tell her about Gotama, and could not hear enough of him, how clear his eyes, how still and beautiful his mouth, how kind his smile.",
        "He had lain by her side, and under her eyes and next to the corners of her mouth he had, as clearly as never before, read a fearful inscription, an inscription of small lines, of slight grooves, an inscription reminiscent of autumn and old age.",
        "Tiredness was written on Kamala's beautiful face, tiredness from walking a long path which has no happy destination, tiredness and the beginning of withering, and concealed, still unsaid, perhaps not even conscious anxiety: fear of old age, fear of the autumn, fear of having to die.",
        "Then Siddhartha knew that the game was over, that he could not play it any more."
    ],
    "translation": [
        "悉达多穿过森林，只觉那件事已无往前的可能。",
        "他尝尽一切，吸尽一切，直到对它感到厌烦。",
        "他被世界俘获，被欲望、贪婪、懒惰所捕获，最终被那种他曾蔑视的、最愚蠢的恶习所捕获：贪婪。",
        "财产、财富也终于俘获了他；它们不再是游戏和琐事，成了枷锁和负担。",
        "那时，一个梦警惕他。他在傍晚的时光与卡玛拉在她美丽的花园中度过光阴。",
        "他们坐在树下聊天，卡玛拉说了一些深思流泪的话，话语背后藏着悲伤和疲惫。",
        "她让他讲述佛陀的事，他讲得越多越满足，佛陀的眼睛多么清澈，嘴唇多么安静美好，微笑多么温柔。",
        "他靠在她身旁，从她眼睛和唇角处，悉达多第一次如此清晰地读到一副可怕的招牌，一行行小痕迹，像秋天和老年的标记。",
        "卡玛拉美丽的脸上写着疲惫——走长途的疲惫没有幸福的终点，枯萎的开始，还有隐藏的、未说出口的、或许甚至不知不觉的焦虑：对老年的恐惧，对秋天的恐惧，对死亡的恐惧。",
        "然后悉达多知道游戏结束了，他再也不能继续玩了。"
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
console.log('已添加 siddhartha-brahmin-son-10 课本');
console.log('总课数:', course.lessonCount);