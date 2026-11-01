const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/keke-reading/store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const lessons = [
    {
        "id": "siddhartha-brahmin-son-8",
        "title": "《悉达多》- 遇见佛陀",
        "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-8.mp3",
        "durationSec": 320,
        "transcript": [
            "In the town of Savathi, every child knew the name of the exalted Buddha, and every house was prepared to fill the alms-dish of Gotama's disciples, the silently begging ones.",
            "Near the town was Gotama's favourite place to stay, the grove of Jetavana, which the rich merchant Anathapindika had given him and his people for a gift.",
            "All tales and answers which the two young ascetics had received in their search for Gotama's abode had pointed them towards this area.",
            "Arriving at Savathi, in the very first house before the door of which they stopped to beg, food was offered to them, and they accepted the food.",
            "We would like to know, oh charitable one, where the Buddha dwells, the most venerable one, for we are two Samanas from the forest and have come to see him, the perfected one, and to hear the teachings from his mouth.",
            "Here, you have truly come to the right place, you Samanas from the forest. In Jetavana, in the garden of Anathapindika dwells the exalted one. There you pilgrims shall spend the night, for there is enough space for the innumerable who flock here to hear the teachings from his mouth.",
            "This made Govinda happy, and full of joy he exclaimed: Thus we have reached our destination, and our path has come to an end! But tell us, do you know him, the Buddha, have you seen him with your own eyes?",
            "Many times I have seen him, the exalted one. On many days I have seen him walking through the alleys in silence, wearing his yellow cloak, presenting his alms-dish in silence at the doors of the houses.",
            "At sunrise they saw with astonishment what a large crowd of believers and curious people had spent the night here.",
            "Siddhartha saw him, and he instantly recognised him, as if a god had pointed him out to him. He saw him, a simple man in a yellow robe, bearing the alms-dish in his hand, walking silently."
        ],
        "translation": [
            "在萨瓦提 town，每个孩子都知道最尊敬的佛陀的名字，每座房子都准备好为佛陀的徒弟们——沉默地乞讨的人—— filling饭盒。",
            "离 town 很远，有佛陀最喜欢的住处——安那菩提迦的花园，该富商为他及其人民准备的礼物。",
            "所有关于佛陀住所的传说和答案都指向这个地区。",
            "到达萨瓦提后，在他们争取食物的第一个房子前，他们接受了食物。",
            "我们想知道，善良的人，佛陀居住在哪里，最尊敬的那位，是我们两个来自森林的苏马纳，也来见他，欲聆听他的话语。",
            "你们来到正确的地方，你们的森林苏马纳。在安那菩提迦的花园中，最尊敬的佛陀居住。你们的朝圣者可以在那里过夜，因为这里有足够的空间容纳来聆听他话语的无数来客。",
            "这让功第达很高兴，兴高采胪地说：我们到达了目的地，我们的道路结束了！但告诉我们，你们知道他，佛陀吗？你们亲眼见过他吗？",
            "我很多次看见他，最尊敬的。许多天我看见他静静地走在街巷里，穿着黄布长袍，沉默地在房屋门口献上饭盒。",
            "清晨时，他们惊讶地看到有许多信徒和好奇的人在此度过了夜晚。",
            "悉达多看到他，立刻认出他，就像一位神指给他指出。他看到一位身着黄布的简单的人，手里拿着饭盒，安静地走着。"
        ],
        "source": "可可英语-名著精读",
        "category": "经典文学",
        "difficulty": "L3"
    },
    {
        "id": "siddhartha-brahmin-son-9",
        "title": "《悉达多》- 离开佛陀",
        "audioUrl": "https://speakwise-wsicpu2u.manus.space/audio/siddhartha-brahmin-son-9.mp3",
        "durationSec": 300,
        "transcript": [
            "Right afterwards, when the Buddha had retired for the night, Govinda turned to Siddhartha and spoke eagerly: Siddhartha, it is not my place to scold you. We have both heard the exalted one, we have both perceived the teachings.",
            "Govinda has heard the teachings, he has taken refuge in it. But you, my honoured friend, don't you also want to walk the path of salvation? Would you want to hesitate, do you want to wait any longer?",
            "Siddhartha awakened as if he had been asleep, when he heard Govinda's words. For a long time, he looked into Govinda's face. Then he spoke quietly, in a voice without mockery: Govinda, my friend, now you have taken this step, now you have chosen this path.",
            "Always, oh Govinda, you have been my friend, you have always walked one step behind me. Often I have thought: Won't Govinda for once also take a step by himself, without me, out of his own soul?",
            "Now you have turned into a man and are choosing your path for yourself. I wish that you would go it up to its end, oh my friend, that you shall find salvation!",
            "Govinda, not completely understanding it yet, repeated his question in an impatient tone: Speak up, I beg you, my dear! Tell me, since it could not be any other way, that you also, my learned friend, will take your refuge with the exalted Buddha!",
            "Siddhartha placed his hand on Govinda's shoulder: You failed to hear my good wish for you, oh Govinda. I'm repeating it: I wish that you would go this path up to its end, that you shall find salvation!",
            "In this moment, Govinda realized that his friend had left him, and he started toweep. Siddhartha kindly spoke to him: Don't forget, Govinda, that you are now one of the Samanas of the Buddha!",
            "You have renounced your home and your parents, renounced your birth and possessions, renounced your free will, renounced all friendship. This is what the teachings require, this is what the exalted one wants.",
            "For a long time, the friends continued walking in the grove; for a long time they lay there and found no sleep. And over and over again, Govinda urged his friend, he should tell him why he would not want to seek refuge in Gotama's teachings."
        ],
        "translation": [
            "正当佛陀躺着睡着后，功第达转过身来对悉达多急切地说：悉达多，这不是我的角色去责骂你。我们都听过最尊敬的佛陀的话，我们都领悟到他的教义。",
            "功第达听信佛陀的话，拜入他的教派。但你，我的贤友，你不也想走向救赎之路吗？你不想犹豫，不想再等待了吗？",
            "悉达多仿佛从梦中醒来般，听见功第达的话语。他 long time 望着功第达的脸。然后他安静地说：功第达，我朋友，现在你已经踏上这一步，选择了这条道路。",
            "啊，功第达，你一直是我的朋友，你总是跟在我的后面一步。我常想：功第达哪里不可以一次也不借着我，不从自己的灵魂中迈出一步？",
            "现在你成年了，为自己选择道路。我希望你能走到这条道路的尽头，我的朋友，你会找到救赎！",
            "功第达还没完全理解，我们在急切地重复问题：说吧，我恳请你，亲爱的！既然不得不那样，我的有学问的朋友，是否也会拜入最尊敬的佛陀的教派？",
            "悉达多把手放在功第达的肩膀上：你没听见我对你的美好祝愿，啊，功第达。我在重复：我希望你走这条道路走到尽头，你会找到救赎！",
            "在那一刻，功第达意识到他的朋友已经离开他了，开始流泪。悉达多温柔地说：别忘了，功第达，你现在是佛陀的苏马纳了！",
            "你已脱离家庭和父母，脱离出生和财产，脱离自由意志，脱离一切友谊。这就是教义所要求的，这就是最尊敬的所希望的。",
            "他们 long time 在树下继续行走； long time 躺着找不到睡觉。每次，功第达都劝他朋友告诉他，为什么不想向佛陀的教义中找寻庇护。"
        ],
        "source": "可可英语-名著精读",
        "category": "经典文学",
        "difficulty": "L3"
    }
];

const course = storeData.courses[0];
lessons.forEach(lesson => {
    if (!course.lessons.find(l => l.id === lesson.id)) {
        course.lessons.push(lesson);
    }
});
course.lessonCount = storeData.courses[0].lessons.length;
storeData.feeds["kk-reading"].itemCount = course.lessonCount;

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log('已添加 siddhartha-brahmin-son-8 和 siddhartha-brahmin-son-9 课本');
console.log('总课数:', course.lessonCount);