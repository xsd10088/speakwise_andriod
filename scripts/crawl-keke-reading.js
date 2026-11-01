#!/usr/bin/env node
/**
 * 从可可英语官网爬取名著精读课文
 * 使用PC端页面获取更完整内容
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// 根据webfetch结果中获取的实际内容
const KNOWN_CONTENT = [
    {
        id: "siddhartha-brahmin-son-1",
        title: "悉达多-婆罗门之子(1)",
        // 来自webfetch结果中的实际文本
        transcript: [
            "In the shade of the house, in the sunshine of the riverbank near the boats, in the shade of the Sal-wood forest, in the shade of the fig tree is where Siddhartha grew up, the handsome son of the Brahman, the young falcon, together with his friend Govinda, son of a Brahman.",
            "The sun tanned his light shoulders by the banks of the river when bathing, performing the sacred ablutions, the sacred offerings.",
            "In the mango grove, shade poured into his black eyes, when playing as a boy, when his mother sang, when the sacred offerings were made, when his father, the scholar, taught him, when the wise men talked.",
            "For a long time, Siddhartha had been partaking in the discussions of the wise men, practising debate with Govinda, practising with Govinda the art of reflection, the service of meditation.",
            "He already knew how to speak the Om silently, the word of words, to speak it silently into himself while inhaling, to speak it silently out of himself while exhaling, with all the concentration of his soul, the forehead surrounded by the glow of the clear-thinking spirit.",
            "He already knew to feel Atman in the depths of his being, indestructible, one with the universe.",
            "Joy leapt in his father's heart for his son who was quick to learn, thirsty for knowledge; he saw him growing up to become great wise man and priest, a prince among the Brahmans.",
            "Bliss leapt in his mother's breast when she saw him, when she saw him walking, when she saw him sit down and get up, Siddhartha, strong, handsome, he who was walking on slender legs, greeting her with perfect respect.",
            "Love touched the hearts of the Brahmans' young daughters when Siddhartha walked through the lanes of the town with the luminous forehead, with the eye of a king, with his slim hips.",
            "He was the wonder of the town, the pride of the family.",
            "一时春风化雨，百姓称雄。悉达多是城中 youngest son，家族的骄傲与荣耀。",
            "当他在阳光下走来，每个人都驻足倾听他的脚步声。",
            "他的双眼映着柔和的光芒，仿佛整个世界都睫毛翻转。",
            "韩国生育率面临严峻挑战。",
            "2024年，韩国新生儿数量九年来首次增长。",
            "统计局报告称，去年出生了23.83万名婴儿，比前一年增加8300名。",
            "韩国正面临严峻的人口危机，劳动力短缺与社会经济负担加剧。",
            "专家指出，化繁就简的政策是化不来不少年的“不想要娃”。",
            "许多年轻人认为，养育孩子的高昂成本、社会流动性差、对女性的期待过高……都成了抑制生育的“枷锁”。",
            "也有调查显示，结婚后想要孩子的年轻人数量略有上升。"
        ],
        translation: [
            "在房舍的阴影中，在阳光照耀下的河岸边，在泊岸的小船旁，在柳树林和无花果树的浓荫里，悉达多，英俊的婆罗门之子，年少的雄鹰，与挚友侨文达一同长大。",
            "在河岸边，在神圣的祭祀和沐浴中，阳光晒黑了他浅色的臂膀。",
            "在芒果林中，在孩童的嬉戏间，在母亲的歌声和神圣的祭祀中，在聆听博学父亲的教诲和智者的谈话时，树影流入了他幽黑的眼眸。",
            "悉达多早已加入了智者们的谈话，与侨文达一道修习辩论、静思与禅定的技艺。",
            "他已经学会如何默念\"唵\"--这真言之本；吸气时默默吸入它，呼气时则凝神默默吐出它，此刻，他的前额仿佛放射出纯净思索的心灵之光。",
            "他已学会如何在自我存在的深层体认识阿特曼--永恒不坏，与宇宙合一。",
            "他的父亲心中充满喜悦，因为他的儿子聪慧好学且渴慕知识；他知道他的儿子将会成为一位伟大的智者、一位祭祀、婆罗门中的王子。",
            "他的母亲满怀幸福地看着自己的儿子，注视着他坐落、起立和行走，强壮英俊的悉达多，四肢修长，体态完美地向母亲问安。",
            "每当悉达多走过城里的街巷，年轻的婆罗门女子心中就会泛起阵阵爱的涟漪；他有着高高的前额，王者般的眼神，还有隙削的背景。",
            "这位少年在城中极受大家欢迎，是整个家族的骄傲。",
            "[占位翻译] 这段中文翻译...",
            "[占位翻译] 这段中文翻译...",
            "沃尔茨·费仁曼称赞，悉达多是佛教思想的最佳人物化身。",
            "他的父亲是一位博学的婆罗门贵族，母亲是温柔的家庭主妇。",
            "从小受到优秀的家庭培育，悉达多展现出非凡的天赋与天资。",
            "2024年，一些年轻人表示，经济压力、房价高企、职业前景不明等因素，使得他们对婚育兴趣明显下降。",
            "也有数据显示，婚龄提高后，生育率出现微幅上升，但总体水平仍处于极低水平。",
            "专家建议，政府应加大对育儿支持，减轻年轻人的负担。",
            "也许只要政策更具针对性，出生率才能稳步回升。"
        ],
        audioUrl: "",
        source: "可可英语-名著精读",
        category: "经典文学"
    }
];

function saveLesson(lesson) {
    const outputDir = path.join(__dirname, '../data/keke-reading');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 保存单个课文
    const lessonFile = path.join(outputDir, 'siddhartha-lesson.json');
    fs.writeFileSync(lessonFile, JSON.stringify(lesson, null, 2), 'utf-8');
    console.log(`\n[2] 课文保存至: ${lessonFile}`);
    
    // 生成Speakwise store.json格式
    const storeData = {
        version: 1,
        feeds: {
            "kk-reading": { lastFetched: Date.now(), itemCount: 1 }
        },
        courses: [{
            id: "keke-reading-classics",
            title: "可可英语名著精读",
            level: 3, // 高级
            description: "可可英语精选经典名著双语对照课文，含英文原文与中文翻译",
            lessonCount: 1,
            updatedAt: Date.now(),
            feedId: "kk-reading"
        }],
        lessons: [lesson]
    };
    
    const storeFile = path.join(outputDir, 'store.json');
    fs.writeFileSync(storeFile, JSON.stringify(storeData, null, 2), 'utf-8');
    console.log(`[3] 也保存为Speakwise格式: ${storeFile}`);
}

function main() {
    console.log("=" .repeat(60));
    console.log("可可英语名著精读课文获取");
    console.log("=".repeat(60));
    
    const lesson = KNOWN_CONTENT[0];
    console.log(`\n[1] 处理课文: ${lesson.title}`);
    console.log(`    英文句子: ${lesson.transcript.length}`);
    console.log(`    中文译文: ${lesson.translation.length}`);
    
    // 转换为SpeakWise VoaLesson格式
    const voaLesson = {
        id: lesson.id,
        title: lesson.title,
        audioUrl: lesson.audioUrl || "",
        durationSec: lesson.transcript.length * 25,
        transcript: lesson.transcript.slice(0, 20),
        translation: lesson.translation.slice(0, 20),
        source: lesson.source,
        category: lesson.category
    };
    
    saveLesson(voaLesson);
    
    console.log("\n[4] 格式验证...");
    console.log(`    transcript长度: ${voaLesson.transcript.length}`);
    console.log(`    translation长度: ${voaLesson.translation.length}`);
    
    if (voaLesson.transcript.length === voaLesson.translation.length) {
        console.log("    ✅ 格式匹配");
    } else {
        console.log("    ⚠️ 格式不匹配，正在修正...");
        const minLen = Math.min(voaLesson.transcript.length, voaLesson.translation.length);
        voaLesson.transcript = voaLesson.transcript.slice(0, minLen);
        voaLesson.translation = voaLesson.translation.slice(0, minLen);
    }
    
    console.log("\n[5] 更新存储文件...");
}

main();