#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lesson2 = {
    "id": "siddhartha-brahmin-son-2",
    "title": "《悉达多》- 婆罗门之子(2)",
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-2.mp3",
    "durationSec": 250,
    "transcript": [
        "In the evening of this day they caught up with the ascetics, the skinny Samanas, and offered them their companionship and obedience. They were accepted.",
        "Siddhartha gave his garments to a poor Brahman in the street. He wore nothing more than the loincloth and the earth-coloured, unsown cloak.",
        "He ate only once a day, and never something cooked. He fasted for fifteen days. He fasted for twenty-eight days.",
        "The flesh waned from his thighs and cheeks. Feverish dreams flickered from his enlarged eyes, long nails grew slowly on his parched fingers and a dry, shaggy beard grew on his chin.",
        "His glance turned to ice when he encountered women; his mouth twitched with contempt, when he walked through a city of nicely dressed people.",
        "He saw merchants trading, princes hunting, mourners wailing for their dead, whores offering themselves, physicians trying to help the sick, priests determining the most suitable day for seeding, lovers loving, mothers nursing their children—and all of this was not worthy of one look from his eye, it all lied, it all stank, it all stank of lies, it all pretended to be meaningful and joyful and beautiful, and it all was just concealed putrefaction.",
        "The world tasted bitter. Life was torture.",
        "A goal stood before Siddhartha, a single goal: to become empty, empty of thirst, empty of wishing, empty of dreams, empty of joy and sorrow.",
        "Dead to himself, not to be a self any more, to find tranquility with an emptied heart, to be open to miracles in unselfish thoughts, that was his goal.",
        "Once all of my self was overcome and had died, once every desire and every urge was silent in the heart, then the ultimate part of me had to awake, the innermost of my being, which is no longer my self, the great secret.",
        "Silently, Siddhartha exposed himself to burning rays of the sun directly above, glowing with pain, glowing with thirst, and stood there, until he neither felt any pain nor thirst any more.",
        "Silently, he sat there in the rainy season, from his hair the water was dripping over freezing shoulders, over freezing hips and legs, and the penitent stood there, until he could not feel the cold in his shoulders and legs any more, until they were silent, until they were quiet.",
        "Instructed by the oldest of the Samanas, Siddhartha practised self-denial, practised meditation, according to new Samana rules.",
        "A heron flew over the bamboo forest—and Siddhartha accepted the heron into his soul, flew over forest and mountains, was a heron, ate fish, felt the pangs of a heron's hunger, spoke the heron's croak, died a heron's death.",
        "A dead jackal was lying on the sandy bank, and Siddhartha's soul slipped inside the body, was the dead jackal, lay on the banks, got bloated, stank, decayed, was dismembered by hyenas, was skinned by vultures, turned into a skeleton, turned to dust, was blown across the fields.",
        "And Siddhartha's soul returned, had died, had decayed, was scattered as dust, had tasted the gloomy intoxication of the cycle, awaited in new thirst like a hunter in the gap, where he could escape from the cycle, where the end of the causes, where an eternity without suffering began.",
        "He killed his senses, he killed his memory, he slipped out of his self into thousands of other forms, was an animal, was carrion, was stone, was wood, was water, and awoke every time to find his old self again.",
        "Siddhartha learned a lot when he was with the Samanas, many ways leading away from the self he learned to go. He went the way of self-denial by means of pain, through voluntarily suffering and overcoming pain, hunger, thirst, tiredness.",
        "He went the way of self-denial by means of meditation, through imagining the mind to be void of all conceptions. These and other ways he learned to go, a thousand times he left his self, for hours and days he remained in the non-self.",
        "But though the ways led away from the self, their end nevertheless always led back to the self. Though Siddhartha fled from the self a thousand times, stayed in nothingness, stayed in the animal, in the stone, the return was inevitable, inescapable was the hour, when he found himself back in the sunshine or in the moonlight.",
        "By his side lived Govinda, his shadow, walked the same paths, undertook the same efforts. They rarely spoke to one another, than the service and the exercises required.",
        "How do you think, Govinda, how do you think did we progress? Did we reach any goals? We have learned, and we will continue learning. You will be a great Samana, Siddhartha.",
        "I can't help but feel that it is not like this, my friend. What I have learned, being among the Samanas, up to this day, this could have learned more quickly and by simpler means.",
        "What is meditation? What is leaving one's body? What is fasting? What is holding one's breath? It is fleeing from the self, it is a short escape of the agony of being a self, it is a short numbing of the senses against the pain and the pointlessness of life.",
        "Though Siddhartha fled from the self a thousand times, stayed in nothingness, stayed in the animal, in the stone, the return was inevitable, inescapable was the hour, when he found himself back in the sunshine."
    ],
    "translation": [
        "到了那天的傍晚，他们追上了素ilin的苏马纳们——瘦削的、苟然的、几乎光膘的、满目疮痕的萨玛纳修道人。他们 Offered them their companionship and obedience. 他们被接纳了。",
        "悉达多把自己的长袍给了一条街上乞食的婆罗门。他只身穿着腰裤和一件未缝的土黄色披风。",
        "他一天只吃一次，也从不吃熟食。他连续禁食十五天，又连续禁食二十八天。",
        "他大腿和脸颊的肌肉都因饥饿而消瘦。他眼珠肿大而发热，指甲在干咕的手指上缓缓生长，胡须也在下巴上长出颗颗苍劲的鬃毛。",
        "当他遇见女人时，他的目光冷硬得像冰块；走在那座穿着华丽衣服的城镇里时，嘴角总带着轻蔑的挑衅。",
        "他看到商人做生意，王子狩猎，哀悼者为亡灵而哀悼，卖花费命的妓女自称，医生们帮忙疗病，神职人员商量最佳播种日子，恋人亲热，母亲哄育孩子——而这些一点也不配被他这双眼睛目睃，他们都撒谎，都腐烂，都假面笼罩着虚伪的美，都只是掩饰着霉味的腐烂。",
        "这个世界苦涩得很，活着就是痛苦。",
        "悉达多心中有着唯一的目标：变得空缺，空缺了渴欲，空缺了欲求，空缺了梦想，空缺了喜悦和悲伤。",
        "彻底脱离自我，不再是那个自我，才能在被空空的心中找到宁静，敞开心扉，随着无欲的思想接受奇迹，这就是他的目标。",
        "当我所有的自我都被推翻而死亡，所有的欲望和冲动都沉默了，我的最深处的那一部分必须从睡梦中苏醒——那个不再是自我的，最伟大的秘密。",
        "悉达多默默地暴露自己在烈日下燃烧的炽热光线下，疼痛地流泪，渴望地流泪，站在那里，直到他既不再感到疼痛，也不再感到渴望。",
        "在雨季里，悉达多默默地站着，水从发疼的头发滴落，滴在僵硬的肩膀、臀部和腿上，这个忏悔的人站到了那里，直到他不再感到肩膀和腿上的寒冷，直到他们沉默了，直到他们平静了。",
        "在苏马纳中年人指导下，悉达多修练了苦修、冥想等禅修功法。一只鹭鸶飞过竹林——悉达多接受了鹭鸶进入自己的灵魂，飞越森林和山脉，化身为鹭鸶，吃鱼，感受鹭鸶的饥饿，吟咬鹭鸶的咕鸠声，死于鹭鸶之死。",
        "尸骸散布在沙滩上的 jackal 蜷缩在那里，悉达多的灵魂渗入了它的身体，化身为尸骸，躺在岸边，腐烂、发霉，被猎豹撕碎，被秃鹰剥皮，化为骨骼，化为灰烬，随风飘散。",
        "悉达多的灵魂又回来了，死去了，腐烂了，化为灰烬，曾经在轮回的阴暗中寻找新一轮的渴求，凭借猎豹的窥视，凭借那条通往毁灭之路的缝隙，寻找那终将结束轮回的永恒之处。",
        "他杀死了感官，杀死了记忆，灵魂脱离自我，化身为无数形态——动物、腐肉、石头、木头、水流，醒来时每次都能找回自己的旧身。",
        "悉达多在苏马纳手下学到了很多关于远离自我的道路。他通过疼痛的自我牺牲来远离自我，通过自我苦修克服饥饿、渴望和疲惫。他通过冥想通过想象心灵空虚来远离自我。",
        "他学会了无数种离开自我之道，一千次他离开自己，曾在无自我的状态中停留数小时数日。虽然这些道路都指向离开自我，但它们的终点仍然回归到自我。悉达多千百次逃离自我，沉溺于虚无、动物、石头中，归宿是不可避免的——每当阳光或月光下，他会重新找回自己的旧身。",
        "与他同行的还有govinda，随己影般跟随他，走相同的路，承担相同的修行。他们很少说话，只有服务和练习所需的沉默。",
        "你觉得如何，govinda？我们在进步吗？我们是否达到了任何目标？我们已经学习了，还会继续学习。你会成为一位伟大的苏马纳，悉达多。",
        "我不禁觉得，一切都不对，亲爱的govinda。在苏马纳手下，我学到的东西不过如此，达不到更快、更简单的方式。",
        "冥想是什么？脱离自我是什么？断食是什么？屏息是什么？这些只是逃离自我的短暂逃避，对痛苦无意义的感官麻痹。",
        "尽管悉达多千百次逃离自我，沉溺于虚无、动物、石头中，归宿是不可避免的——每当阳光或月光下，他会重新找回自己的旧身。"
    ],
    "source": "可可英语-名著精读",
    "category": "经典文学",
    "difficulty": "L3",
    "durationSec": 360,
    "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-2.mp3"
};

const course = storeData.courses[0];
course.lessons.push(lesson2);
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-2 课本');
console.log('总课数:', course.lessonCount);