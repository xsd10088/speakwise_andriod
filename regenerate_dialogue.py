#!/usr/bin/env python3
"""Regenerate all 100 sentences for 10 scenes with high-quality context dialogue."""
import re

# Greetings scene - first 40 sentences (newly generated)
GREETINGS_FIRST_40 = [
    {
        "id": "greetings-1",
        "speaker": "Alex",
        "text": "Good morning, Mia! Did you sleep well last night?",
        "translation": "早上好，米娅！昨晚睡得好吗？",
        "note": "用 'sleep well' 询问对方睡眠质量，是日常问候的温馨开场。"
    },
    {
        "id": "greetings-2",
        "speaker": "Mia",
        "text": "Morning, Alex! Yes, I did, though I stayed up a bit late reading.",
        "translation": "早啊，亚历克斯！是的，睡得不错，不过我读书稍微熬夜了一会儿。",
        "note": "用 'stayed up a bit late' 表达熬夜，语气自然。"
    },
    {
        "id": "greetings-3",
        "speaker": "Alex",
        "text": "What kind of book were you reading? Anything interesting?",
        "translation": "你在读什么书？有什么有意思的内容吗？",
        "note": "用 'What kind of book' 询问书籍类别，开启共同话题。"
    },
    {
        "id": "greetings-4",
        "speaker": "Mia",
        "text": "It's a novel about modern art history. Quite fascinating actually.",
        "translation": "是一本关于现代艺术史的小说。其实挺引人入胜的。",
        "note": "实用短语 'Quite fascinating' 增强赞叹的语气。"
    },
    {
        "id": "greetings-5",
        "speaker": "Alex",
        "text": "I've always found art history inspiring. Do you visit galleries often?",
        "translation": "我一直觉得艺术史很启发灵感。你经常去参观画廊吗？",
        "note": "用 'inspiring' 表达对艺术的启发感。"
    },
    {
        "id": "greetings-6",
        "speaker": "Mia",
        "text": "Whenever I have a free weekend, I try to check out a new exhibition.",
        "translation": "每逢周末有空，我都尽量去看看新的展览。",
        "note": "用 'Whenever' 表示每当……的时候，表达习惯。"
    },
    {
        "id": "greetings-7",
        "speaker": "Alex",
        "text": "That sounds like a wonderful habit. By the way, are you heading to work now?",
        "translation": "听起来是个很棒的习惯。对了，你现在正要去上班吗？",
        "note": "用 'By the way' 转换话题过渡到当前行程。"
    },
    {
        "id": "greetings-8",
        "speaker": "Mia",
        "text": "Yes, taking the subway. It's usually quite busy at this hour.",
        "translation": "对，坐地铁去。这个点人通常挺多的。",
        "note": "用 'quite busy' 形容早高峰拥挤。"
    },
    {
        "id": "greetings-9",
        "speaker": "Alex",
        "text": "True. Have you had your breakfast yet, or are you grabbing coffee on the way?",
        "translation": "确实。你吃过早餐了吗，还是在路上买咖啡？",
        "note": "用 'grabbing coffee' 表达顺便买咖啡。"
    },
    {
        "id": "greetings-10",
        "speaker": "Mia",
        "text": "I grabbed a quick pastry and a latte near the station.",
        "translation": "我在车站附近匆忙买了个糕点和拿铁。",
        "note": "用 'grabbed a quick' 形容快捷简便的饮食。"
    },
    {
        "id": "greetings-11",
        "speaker": "Alex",
        "text": "That works. What are your main tasks scheduled for today?",
        "translation": "那挺好。你今天安排的主要工作任务是什么？",
        "note": "用 'scheduled for today' 询问日程安排。"
    },
    {
        "id": "greetings-12",
        "speaker": "Mia",
        "text": "I need to finalize a quarterly design report and review team feedback.",
        "translation": "我需要完成一份季度设计报告并审核团队反馈。",
        "note": "用 'finalize' 表示最后定稿。"
    },
    {
        "id": "greetings-13",
        "speaker": "Alex",
        "text": "Sounds like a productive morning ahead. Good luck with that!",
        "translation": "听起来上午会很充实。祝你一切顺利！",
        "note": "罗列祝愿的常用表达 'Good luck with that!'。"
    },
    {
        "id": "greetings-14",
        "speaker": "Mia",
        "text": "Thanks, Alex! What about your schedule? Working remotely today?",
        "translation": "谢谢，亚历克斯！你今天日程呢？今天在家远程办公吗？",
        "note": "用 'Working remotely' 询问是否居家办公。"
    },
    {
        "id": "greetings-15",
        "speaker": "Alex",
        "text": "No, I'm at the office today. We have a brainstorming session this afternoon.",
        "translation": "不，我今天在办公室。我们下午有一场头脑风暴会。",
        "note": "用 'brainstorming session' 表达头脑风暴会议。"
    },
    {
        "id": "greetings-16",
        "speaker": "Mia",
        "text": "Ah, team collaboration is always energetic. Hope you get great ideas.",
        "translation": "啊，团队协作总是充满活力。希望你们能碰撞出棒的点子。",
        "note": "用 'energetic' 形容充满活力的团队氛围。"
    },
    {
        "id": "greetings-17",
        "speaker": "Alex",
        "text": "We certainly hope so. Oh, look at the weather outside, looks like rain.",
        "translation": "我们当然希望如此。哦，你看外面的天气，好像要下雨了。",
        "note": "用 'looks like rain' 预测天气。"
    },
    {
        "id": "greetings-18",
        "speaker": "Mia",
        "text": "Good thing I packed my umbrella in the bag this morning.",
        "translation": "幸亏我今天早上在包里带了雨伞。",
        "note": "用 'Good thing' 表示幸亏、好在。"
    },
    {
        "id": "greetings-19",
        "speaker": "Alex",
        "text": "That's foresight! Always be prepared for unexpected showers.",
        "translation": "真有远见！对突如其来的阵雨总得有准备。",
        "note": "用 'foresight' 表示有远见。"
    },
    {
        "id": "greetings-20",
        "speaker": "Mia",
        "text": "Definitely. Well, my stop is coming up soon. Have a great day!",
        "translation": "确实。嗯，我的站快到了。祝你今天过得愉快！",
        "note": "用 'stop is coming up' 表示即将到站。"
    },
    {
        "id": "greetings-21",
        "speaker": "Alex",
        "text": "You too, Mia! Enjoy your workday and stay dry.",
        "translation": "你也是，米娅！工作愉快，注意别淋湿了。",
        "note": "用 'stay dry' 表达雨天温馨问候。"
    },
    {
        "id": "greetings-22",
        "speaker": "Mia",
        "text": "Will do. Catch you later online or this weekend.",
        "translation": "好的，回头网上或者周末再联系。",
        "note": "用 'Will do' 简洁应答。"
    },
    {
        "id": "greetings-23",
        "speaker": "Alex",
        "text": "Sounds like a plan. Goodbye!",
        "translation": "就这么定啦。再见！",
        "note": "用 'Sounds like a plan' 表示赞同安排。"
    },
    {
        "id": "greetings-24",
        "speaker": "Mia",
        "text": "Bye-bye, Alex!",
        "translation": "拜拜，亚历克斯！",
        "note": "日常道别。"
    },
    {
        "id": "greetings-25",
        "speaker": "Alex",
        "text": "By the way, did you try that new bakery downtown yesterday?",
        "translation": "对了，你昨天尝过市中心那家新开的面包店了吗？",
        "note": "用 'By the way' 进一步深入闲聊。"
    },
    {
        "id": "greetings-26",
        "speaker": "Mia",
        "text": "Yes, I did! Their cinnamon rolls are absolute perfection.",
        "translation": "尝过了！他们的肉桂卷简直完美。",
        "note": "用 'absolute perfection' 形容极致美味。"
    },
    {
        "id": "greetings-27",
        "speaker": "Alex",
        "text": "I must go there this Saturday morning then.",
        "translation": "那这周六早上我一定得去一趟。",
        "note": "用 'I must go' 表达强烈的兴趣。"
    },
    {
        "id": "greetings-28",
        "speaker": "Mia",
        "text": "You won't regret it. Just make sure to arrive early before lines form.",
        "translation": "你不会后悔的。记得趁早去，免得排长队。",
        "note": "用 'You won't regret it' 给出推荐保证。"
    },
    {
        "id": "greetings-29",
        "speaker": "Alex",
        "text": "Got it. Early bird gets the delicious pastry.",
        "translation": "明白了。早起的鸟儿有甜点吃。",
        "note": "引用经典谚语。"
    },
    {
        "id": "greetings-30",
        "speaker": "Mia",
        "text": "Haha, exactly right. Enjoy your coffee!",
        "translation": "哈哈，完全正确。好好享用咖啡吧！",
        "note": "愉快收尾。"
    },
    {
        "id": "greetings-31",
        "speaker": "Alex",
        "text": "Thanks again, Mia. See you around.",
        "translation": "再次谢谢你，米娅。回头见。",
        "note": "日常寒暄。"
    },
    {
        "id": "greetings-32",
        "speaker": "Mia",
        "text": "Take care, Alex.",
        "translation": "保重，亚历克斯。",
        "note": "温和回应。"
    },
    {
        "id": "greetings-33",
        "speaker": "Alex",
        "text": "Cheers to a lovely week ahead.",
        "translation": "预祝接下来一周心情美妙。",
        "note": "用 'Cheers to' 表达美好祝愿。"
    },
    {
        "id": "greetings-34",
        "speaker": "Mia",
        "text": "Cheers! Have a wonderful day.",
        "translation": "干杯！祝你有美好的一天。",
        "note": "回以祝福。"
    },
    {
        "id": "greetings-35",
        "speaker": "Alex",
        "text": "See you!",
        "translation": "再见！",
        "note": "简短道别。"
    },
    {
        "id": "greetings-36",
        "speaker": "Mia",
        "text": "See you!",
        "translation": "再见！",
        "note": "呼应告别。"
    },
    {
        "id": "greetings-37",
        "speaker": "Alex",
        "text": "Remember to stay hydrated today.",
        "translation": "今天记得多喝水补水哦。",
        "note": "健康提醒。"
    },
    {
        "id": "greetings-38",
        "speaker": "Mia",
        "text": "I will, thanks for reminding.",
        "translation": "我会的，谢谢提醒。",
        "note": "感谢关心。"
    },
    {
        "id": "greetings-39",
        "speaker": "Alex",
        "text": "No problem at all. Bye!",
        "translation": "不用客气。再见！",
        "note": "道别收尾。"
    },
    {
        "id": "greetings-40",
        "speaker": "Mia",
        "text": "Goodbye!",
        "translation": "再见！",
        "note": "最终告别。"
    }
]

# Greetings scene - last 60 sentences (previously generated)
GREETINGS_LAST_60 = [
    {
        "id": "greetings-41",
        "speaker": "Alex",
        "text": "Hey Mia, nice to see you again! How's your day going so far?",
        "translation": "嘿米娅，又见到你真高兴！今天过得怎么样？",
        "note": "用 'How's your day going so far' 询问当天进展。"
    },
    {
        "id": "greetings-42",
        "speaker": "Mia",
        "text": "Alex! It's going well, just finished that design report I mentioned.",
        "translation": "亚历克斯！过得不错，刚完成我提到的那份设计报告。",
        "note": "用 'just finished' 表示刚完成某事。"
    },
    {
        "id": "greetings-43",
        "speaker": "Alex",
        "text": "That's great! Must feel good to cross that off your list.",
        "translation": "太好了！把那件事从清单上划掉一定感觉很好。",
        "note": "用 'cross that off your list' 表示完成任务。"
    },
    {
        "id": "greetings-44",
        "speaker": "Mia",
        "text": "Absolutely. The weather cleared up nicely this afternoon, didn't it?",
        "translation": "确实如此。今天下午天气转晴了，不是吗？",
        "note": "用 'cleared up' 表示天气转好。"
    },
    {
        "id": "greetings-45",
        "speaker": "Alex",
        "text": "Yes, perfect timing for a walk. Are you heading out now?",
        "translation": "是的，散步的好时机。你现在要出去吗？",
        "note": "用 'perfect timing' 表示时机恰到好处。"
    },
    {
        "id": "greetings-46",
        "speaker": "Mia",
        "text": "Actually, I'm thinking of grabbing a coffee nearby. Want to join?",
        "translation": "其实，我正想在附近喝杯咖啡。要一起吗？",
        "note": "用 'grabbing a coffee' 表示买咖啡喝。"
    },
    {
        "id": "greetings-47",
        "speaker": "Alex",
        "text": "I'd love to! I know a great place just around the corner.",
        "translation": "我很乐意！我知道拐角处有一家很棒的店。",
        "note": "用 'just around the corner' 表示就在附近。"
    },
    {
        "id": "greetings-48",
        "speaker": "Mia",
        "text": "Sounds perfect. Lead the way!",
        "translation": "听起来很完美。带路吧！",
        "note": "用 'Lead the way' 表示让对方带路。"
    },
    {
        "id": "greetings-49",
        "speaker": "Alex",
        "text": "After you. The weather's too nice to stay indoors anyway.",
        "translation": "你先请。这么好的天气待在室内太可惜了。",
        "note": "用 'After you' 礼貌地让对方先行。"
    },
    {
        "id": "greetings-50",
        "speaker": "Mia",
        "text": "Couldn't agree more. Let's enjoy this sunshine while it lasts.",
        "translation": "完全同意。趁着阳光还在，好好享受吧。",
        "note": "用 'while it lasts' 表示趁现在。"
    },
    {
        "id": "greetings-51",
        "speaker": "Alex",
        "text": "Here we are. This place has the best lattes in the neighborhood.",
        "translation": "我们到了。这家店的拿铁是附近最好的。",
        "note": "用 'in the neighborhood' 表示在附近地区。"
    },
    {
        "id": "greetings-52",
        "speaker": "Mia",
        "text": "Cozy atmosphere too. What are you ordering?",
        "translation": "氛围也很舒适。你要点什么？",
        "note": "用 'Cozy atmosphere' 形容舒适的环境。"
    },
    {
        "id": "greetings-53",
        "speaker": "Alex",
        "text": "I'll get my usual - a vanilla latte. How about you?",
        "translation": "我要我的常规款——香草拿铁。你呢？",
        "note": "用 'my usual' 表示常点的饮品。"
    },
    {
        "id": "greetings-54",
        "speaker": "Mia",
        "text": "I think I'll try a cappuccino today. Feeling adventurous.",
        "translation": "我今天想试试卡布奇诺。感觉有点冒险精神。",
        "note": "用 'feeling adventurous' 表示想尝试新事物。"
    },
    {
        "id": "greetings-55",
        "speaker": "Alex",
        "text": "Good choice! Do you have any exciting plans for the weekend?",
        "translation": "好选择！周末有什么令人兴奋的计划吗？",
        "note": "用 'exciting plans' 询问周末安排。"
    },
    {
        "id": "greetings-56",
        "speaker": "Mia",
        "text": "I'm hoping to visit that new art exhibition downtown on Saturday.",
        "translation": "我周六希望能去市中心看那个新的艺术展览。",
        "note": "用 'hoping to' 表示希望做某事。"
    },
    {
        "id": "greetings-57",
        "speaker": "Alex",
        "text": "Oh, I heard about that! Is it the modern art showcase?",
        "translation": "哦，我听说过那个！是现代艺术展吗？",
        "note": "用 'showcase' 表示展览展示。"
    },
    {
        "id": "greetings-58",
        "speaker": "Mia",
        "text": "Exactly! The reviews say it's quite impressive.",
        "translation": "正是！评论说它相当令人印象深刻。",
        "note": "用 'quite impressive' 表示印象深刻。"
    },
    {
        "id": "greetings-59",
        "speaker": "Alex",
        "text": "I might check it out too. Maybe we'll run into each other there.",
        "translation": "我也可能去看看。也许我们会在那里碰面。",
        "note": "用 'run into each other' 表示偶然相遇。"
    },
    {
        "id": "greetings-60",
        "speaker": "Mia",
        "text": "That would be fun! Let me know if you decide to go.",
        "translation": "那会很有趣！如果你决定去就告诉我。",
        "note": "用 'Let me know' 表示让对方告知。"
    },
    {
        "id": "greetings-61",
        "speaker": "Alex",
        "text": "I definitely will. By the way, how's work been treating you lately?",
        "translation": "我一定会的。顺便问一下，最近工作怎么样？",
        "note": "用 'how's work been treating you' 询问工作近况。"
    },
    {
        "id": "greetings-62",
        "speaker": "Mia",
        "text": "Pretty good! We launched a new product last week, so it's been busy but rewarding.",
        "translation": "挺好的！我们上周发布了新产品，所以很忙但很有成就感。",
        "note": "用 'rewarding' 表示有回报的。"
    },
    {
        "id": "greetings-63",
        "speaker": "Alex",
        "text": "Congratulations! That's a big achievement.",
        "translation": "恭喜！这是个很大的成就。",
        "note": "用 'big achievement' 表示重大成就。"
    },
    {
        "id": "greetings-64",
        "speaker": "Mia",
        "text": "Thanks! It was a team effort, but I'm proud of our contribution.",
        "translation": "谢谢！这是团队努力的结果，但我为我们的贡献感到自豪。",
        "note": "用 'team effort' 表示团队合作。"
    },
    {
        "id": "greetings-65",
        "speaker": "Alex",
        "text": "Speaking of achievements, have you been working on any personal projects?",
        "translation:说到成就，你最近在做什么个人项目吗？",
        "note": "用 'personal projects' 表示个人项目。"
    },
    {
        "id": "greetings-66",
        "speaker": "Mia",
        "text": "Actually, yes! I've been learning photography in my free time.",
        "translation:其实是的！我一直在业余时间学习摄影。",
        "note": "用 'in my free time' 表示在空闲时间。"
    },
    {
        "id": "greetings-67",
        "speaker": "Alex",
        "text": "That's wonderful! What kind of photography do you enjoy most?",
        "translation:太棒了！你最喜欢哪种摄影？",
        "note": "用 'What kind of' 询问种类。"
    },
    {
        "id": "greetings-68",
        "speaker": "Mia",
        "text": "I love street photography - capturing candid moments in the city.",
        "translation:我喜欢街头摄影——捕捉城市中的自然瞬间。",
        "note": "用 'candid moments' 表示自然瞬间。"
    },
    {
        "id": "greetings-69",
        "speaker": "Alex",
        "text": "That sounds fascinating. Do you have a favorite camera?",
        "translation:听起来很有趣。你有最喜欢的相机吗？",
        "note": "用 'fascinating' 表示迷人的。"
    },
    {
        "id": "greetings-70",
        "speaker": "Mia",
        "text": "I'm using a mirrorless camera right now. It's lightweight and versatile.",
        "translation:我现在用无反相机。它轻便且多功能。",
        "note": "用 'versatile' 表示多功能的。"
    },
    {
        "id": "greetings-71",
        "speaker": "Alex",
        "text": "Nice. Have you tried any good restaurants lately?",
        "translation:不错。你最近尝试过什么好餐厅吗？",
        "note": "用 'good restaurants' 询问餐厅推荐。"
    },
    {
        "id": "greetings-72",
        "speaker": "Mia",
        "text": "Actually, I discovered this amazing Italian place last weekend.",
        "translation:其实，我上周末发现了一家很棒的意大利餐厅。",
        "note": "用 'amazing' 表示惊人的。"
    },
    {
        "id": "greetings-73",
        "speaker": "Alex",
        "text": "Oh really? What did you order there?",
        "translation:哦真的吗？你在那里点了什么？",
        "note": "用 'What did you order' 询问点餐内容。"
    },
    {
        "id": "greetings-74",
        "speaker": "Mia",
        "text": "Their pasta is incredible - I had the carbonara and it was perfect.",
        "translation:他们的意面非常棒——我点了培根蛋面，完美无缺。",
        "note": "用 'incredible' 表示难以置信的好。"
    },
    {
        "id": "greetings-75",
        "speaker": "Alex",
        "text": "I love Italian food! What's the name of the restaurant?",
        "translation:我喜欢意大利菜！餐厅叫什么名字？",
        "note": "表达对意大利菜的喜爱。"
    },
    {
        "id": "greetings-76",
        "speaker": "Mia",
        "text": "It's called 'Bella Vita'. It's on 5th Street near the park.",
        "translation:叫'Bella Vita'。在第五大街公园附近。",
        "note": "提供餐厅位置信息。"
    },
    {
        "id": "greetings-77",
        "speaker": "Alex",
        "text": "I'll definitely add that to my list. Thanks for the recommendation!",
        "translation:我一定会把它加入我的清单。谢谢推荐！",
        "note": "用 'add to my list' 表示加入清单。"
    },
    {
        "id": "greetings-78",
        "speaker": "Mia",
        "text": "You're welcome! Their tiramisu is also worth trying.",
        "translation:不客气！他们的提拉米苏也值得一试。",
        "note": "用 'worth trying' 表示值得一试。"
    },
    {
        "id": "greetings-79",
        "speaker": "Alex",
        "text": "Now you're making me hungry! Maybe I should go there for dinner tonight.",
        "translation:你现在让我感到饿了！也许我今晚应该去那里吃晚餐。",
        "note": "用 'making me hungry' 表示让人感到饥饿。"
    },
    {
        "id": "greetings-80",
        "speaker": "Mia",
        "text": "You won't regret it. Let me know what you think!",
        "translation:你不会后悔的。告诉我你的想法！",
        "note": "用 'You won't regret it' 表示不会后悔。"
    },
    {
        "id": "greetings-81",
        "speaker": "Alex",
        "text": "I definitely will. Speaking of food, have you traveled anywhere interesting recently?",
        "translation:我一定会的。说到食物，你最近去什么有趣的地方旅行了吗？",
        "note": "从食物话题过渡到旅行话题。"
    },
    {
        "id": "greetings-82",
        "speaker": "Mia",
        "text": "Not recently, but I'm planning a trip to Japan next month!",
        "translation:最近没有，但我下个月计划去日本旅行！",
        "note": "用 'planning a trip' 表示计划旅行。"
    },
    {
        "id": "greetings-83",
        "speaker": "Alex",
        "text": "How exciting! Japan is on my bucket list too.",
        "translation:太令人兴奋了！日本也在我的愿望清单上。",
        "note": "用 'bucket list' 表示愿望清单。"
    },
    {
        "id": "greetings-84",
        "speaker": "Mia",
        "text": "You should definitely go! The food, culture, and scenery are all amazing.",
        "translation:你一定要去！食物、文化和风景都令人惊叹。",
        "note": "用 'all amazing' 表示都很棒。"
    },
    {
        "id": "greetings-85",
        "speaker": "Alex",
        "text": "What cities are you planning to visit?",
        "translation:你计划访问哪些城市？",
        "note": "询问具体行程。"
    },
    {
        "id": "greetings-86",
        "speaker": "Mia",
        "text": "Tokyo, Kyoto, and Osaka. I'm most excited about Kyoto's temples.",
        "translation:东京、京都和大阪。我最期待京都的寺庙。",
        "note": "用 'most excited about' 表示最期待。"
    },
    {
        "id": "greetings-87",
        "speaker": "Alex",
        "text": "I've heard Kyoto is beautiful, especially during cherry blossom season.",
        "translation:我听说京都很美，特别是在樱花季。",
        "note": "用 'especially' 表示特别是。"
    },
    {
        "id": "greetings-88",
        "speaker": "Mia",
        "text": "Unfortunately, I'll miss the cherry blossoms, but autumn foliage should be lovely.",
        "translation:可惜我会错过樱花，但秋天的红叶应该也很美。",
        "note": "用 'autumn foliage' 表示秋天的红叶。"
    },
    {
        "id": "greetings-89",
        "speaker": "Alex",
        "text": "That's true - fall colors are stunning. Make sure to take lots of photos!",
        "翻译:确实——秋色令人惊叹。记得多拍些照片！",
        "note": "用 'stunning' 表示令人惊叹的。"
    },
    {
        "id": "greetings-90",
        "speaker": "Mia",
        "text": "I definitely will. My camera will be busy!",
        "翻译:我一定会的。我的相机要忙了！",
        "note": "用 'busy' 形容相机使用频繁。"
    },
    {
        "id": "greetings-91",
        "speaker": "Alex",
        "text": "I can't wait to see your photos when you get back.",
        "翻译:我迫不及待想看你回来后的照片。",
        "note": "用 'can't wait to' 表示迫不及待。"
    },
    {
        "id": "greetings-92",
        "speaker": "Mia",
        "text": "I'll share them with you for sure. Maybe we can meet up and I'll show you my best shots.",
        "翻译:我肯定会和你分享。也许我们可以见面，我给你看我最好的照片。",
        "note": "用 'meet up' 表示见面聚会。"
    },
    {
        "id": "greetings-93",
        "speaker": "Alex",
        "text": "That sounds like a plan. I'd love to hear all about your trip.",
        "翻译:听起来是个好主意。我很想听听你旅行的所有经历。",
        "note": "用 'sounds like a plan' 表示赞同安排。"
    },
    {
        "id": "greetings-94",
        "speaker": "Mia",
        "text": "It'll be great to catch up properly. Coffee again when I'm back?",
        "翻译:好好聚一聚会很棒。我回来后再喝咖啡？",
        "note": "用 'catch up properly' 表示好好叙旧。"
    },
    {
        "id": "greetings-95",
        "speaker": "Alex",
        "text": "Absolutely! Have a wonderful trip, Mia.",
        "翻译:当然！米娅，祝你旅途愉快。",
        "note": "用 'Have a wonderful trip' 祝福旅途。"
    },
    {
        "id": "greetings-96",
        "speaker": "Mia",
        "text": "Thank you, Alex! Enjoy your dinner at Bella Vita tonight.",
        "翻译:谢谢你，亚历克斯！祝你今晚在Bella Vita用餐愉快。",
        "note": "回赠祝福。"
    },
    {
        "id": "greetings-97",
        "speaker": "Alex",
        "text": "I will. Safe travels, and see you when you return!",
        "翻译:我会的。一路平安，回来见！",
        "note": "用 'Safe travels' 祝福出行安全。"
    },
    {
        "id": "greetings-98",
        "speaker": "Mia",
        "text": "See you soon! Take care.",
        "翻译:回头见！保重。",
        "note": "标准道别语。"
    },
    {
        "id": "greetings-99",
        "speaker": "Alex",
        "text": "You too. Bye for now!",
        "翻译:你也是。暂时再见！",
        "note": "用 'Bye for now' 表示暂时告别。"
    },
    {
        "id": "greetings-100",
        "speaker": "Mia",
        "text": "Bye!",
        "翻译:再见！",
        "note": "最终道别。"
    }
]

def format_line(line):
    """Format a dialogue line for TypeScript."""
    return f'    {{ id: "{line["id"]}", speaker: "{line["speaker"]}", text: "{esc(line["text"])}", translation: "{esc(line["translation"])}", note: "{esc(line["note"])}" }},\n'

def esc(s):
    """Escape special characters for TypeScript strings."""
    return s.replace('\\', r'\\').replace('"', r'\\"').replace('\n', ' ').replace('\t', ' ')

def generate_scene_block(scene_name, first_40, last_60, speaker_a, speaker_b):
    """Generate a complete scene block with 100 lines."""
    lines = []
    
    # First 40 lines
    for i, line in enumerate(first_40):
        lines.append(format_line(line))
    
    # Last 60 lines  
    for i, line in enumerate(last_60):
        lines.append(format_line(line))
    
    return ''.join(lines)

def main():
    # Generate greetings scene
    greetings_block = generate_scene_block("greetings", GREETINGS_FIRST_40, GREETINGS_LAST_60, "Alex", "Mia")
    
    print("Generated greetings scene with 100 lines.")
    print(f"First line: {greetings_block[:100]}")
    print(f"Last line: {greetings_block[-100:]}")
    
    # For now, just output the greetings block to verify
    with open("greetings_scene.txt", "w", encoding="utf-8") as f:
        f.write(greetings_block)
    
    print("Greetings scene saved to greetings_scene.txt")

if __name__ == "__main__":
    main()