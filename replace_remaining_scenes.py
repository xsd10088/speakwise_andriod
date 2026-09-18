#!/usr/bin/env python3
"""Replace the last 60 sentences for remaining 8 scenes in lib/data.ts."""
import re

# Business scene - last 60 sentences (newly generated)
BUSINESS_LAST_60 = [
    {
        "id": "business-41",
        "speaker": "Sam",
        "text": "By the way, Lee, I wanted to follow up on the client meeting we had yesterday.",
        "translation": "顺便说一句，李，我想跟进一下我们昨天的客户会议。",
        "note": "用 'follow up on' 表示跟进某事。"
    },
    {
        "id": "business-42",
        "speaker": "Lee",
        "text": "Yes, that meeting went quite well. The client seemed impressed with our proposal.",
        "translation": "是的，那个会议进行得很顺利。客户对我们的提案印象深刻。",
        "note": "用 'impressed with' 表示对某事印象深刻。"
    },
    {
        "id": "business-43",
        "speaker": "Sam",
        "text": "That's great news. Did they mention any specific concerns or questions?",
        "translation": "那是个好消息。他们提到任何具体的担忧或问题吗？",
        "note": "用 'specific concerns' 询问具体担忧。"
    },
    {
        "id": "business-44",
        "speaker": "Lee",
        "text": "They had some questions about the timeline, but overall response was positive.",
        "translation": "他们对时间表有一些问题，但总体反应很积极。",
        "note": "用 'overall response' 表示总体反应。"
    },
    {
        "id": "business-45",
        "speaker": "Sam",
        "text": "Good. We should address those timeline concerns in our follow-up email.",
        "translation": "很好。我们应该在后续邮件中解决那些时间表方面的担忧。",
        "note": "用 'address concerns' 表示解决担忧。"
    },
    {
        "id": "business-46",
        "speaker": "Lee",
        "text": "I'll draft that email today and include a detailed project schedule.",
        "translation": "我今天会起草那封邮件，并包含详细的项目时间表。",
        "note": "用 'draft' 表示起草。"
    },
    {
        "id": "business-47",
        "speaker": "Sam",
        "text": "Perfect. Speaking of projects, how is the mobile app development progressing?",
        "translation": "完美。说到项目，移动应用开发进展如何？",
        "note": "用 'how is... progressing' 询问进展。"
    },
    {
        "id": "business-48",
        "speaker": "Lee",
        "text": "The development team is on track. Beta testing should start next week.",
        "translation": "开发团队按计划进行。Beta测试应该下周开始。",
        "note": "用 'on track' 表示按计划进行。"
    },
    {
        "id": "business-49",
        "speaker": "Sam",
        "text": "Excellent. Have we identified enough beta testers for the initial round?",
        "translation": "太好了。我们为第一轮确定了足够的Beta测试者吗？",
        "note": "用 'beta testers' 表示Beta测试者。"
    },
    {
        "id": "business-50",
        "speaker": "Lee",
        "text": "Yes, we have fifty testers lined up, which should give us good feedback.",
        "translation": "是的，我们安排了50名测试者，这应该能给我们很好的反馈。",
        "note": "用 'lined up' 表示安排妥当。"
    },
    {
        "id": "business-51",
        "speaker": "Sam",
        "text": "That's a solid sample size. What metrics are we tracking during testing?",
        "translation": "那是不错的样本量。我们在测试期间追踪什么指标？",
        "note": "用 'sample size' 表示样本量。"
    },
    {
        "id": "business-52",
        "speaker": "Lee",
        "text": "We're focusing on user engagement, crash rates, and feature adoption.",
        "translation": "我们专注于用户参与度、崩溃率和功能采用情况。",
        "note": "用 'user engagement' 表示用户参与度。"
    },
    {
        "id": "business-53",
        "speaker": "Sam",
        "text": "Smart approach. User engagement will be particularly important for retention.",
        "translation": "明智的方法。用户参与度对用户留存特别重要。",
        "note": "用 'retention' 表示用户留存。"
    },
    {
        "id": "business-54",
        "speaker": "Lee",
        "text": "Exactly. We've also implemented analytics to track user behavior patterns.",
        "translation": "确实。我们还实施了分析功能来追踪用户行为模式。",
        "note": "用 'analytics' 表示分析功能。"
    },
    {
        "id": "business-55",
        "speaker": "Sam",
        "text": "Good data will help us make informed decisions for future updates.",
        "translation": "好的数据将帮助我们对未来的更新做出明智的决定。",
        "note": "用 'informed decisions' 表示明智的决定。"
    },
    {
        "id": "business-56",
        "speaker": "Lee",
        "text": "By the way, the marketing team has requested some demo videos for promotion.",
        "translation": "顺便说一下，营销团队要求一些演示视频用于推广。",
        "note": "用 'demo videos' 表示演示视频。"
    },
    {
        "id": "business-57",
        "speaker": "Sam",
        "text": "We should prioritize that. When do they need them by?",
        "translation": "我们应该优先处理这个。他们什么时候需要？",
        "note": "用 'prioritize' 表示优先处理。"
    },
    {
        "id": "business-58",
        "speaker": "Lee",
        "text": "They're hoping to have them ready for the product launch next month.",
        "translation": "他们希望为下个月的产品发布准备好这些视频。",
        "note": "用 'product launch' 表示产品发布。"
    },
    {
        "id": "business-59",
        "speaker": "Sam",
        "text": "That gives us about three weeks. I'll coordinate with the design team.",
        "translation": "那给我们大约三周时间。我会与设计团队协调。",
        "note": "用 'coordinate with' 表示协调。"
    },
    {
        "id": "business-60",
        "speaker": "Lee",
        "text": "Great. I can help script the key features we want to highlight.",
        "translation": "太好了。我可以帮忙编写我们要强调的关键功能的脚本。",
        "note": "用 'key features' 表示关键功能。"
    },
    {
        "id": "business-61",
        "speaker": "Sam",
        "text": "That would be helpful. Let's also think about which use cases to demonstrate.",
        "translation": "那会有帮助。我们还要考虑演示哪些用例。",
        "note": "用 'use cases' 表示用例。"
    },
    {
        "id": "business-62",
        "speaker": "Lee",
        "text": "I suggest focusing on the three most common user scenarios we identified.",
        "translation": "我建议专注于我们确定的三个最常见的用户场景。",
        "note": "用 'user scenarios' 表示用户场景。"
    },
    {
        "id": "business-63",
        "speaker": "Sam",
        "text": "Agreed. Real-world examples will resonate better with potential users.",
        "translation": "同意。现实世界的例子更能引起潜在用户的共鸣。",
        "note": "用 'resonate with' 表示引起共鸣。"
    },
    {
        "id": "business-64",
        "speaker": "Lee",
        "text": "Speaking of users, have we seen any early feedback from the landing page?",
        "translation": "说到用户，我们从着陆页看到了任何早期反馈吗？",
        "note": "用 'landing page' 表示着陆页。"
    },
    {
        "id": "business-65",
        "speaker": "Sam",
        "text": "Yes, initial feedback has been positive. People seem interested in the features.",
        "translation": "是的，初步反馈很积极。人们似乎对这些功能感兴趣。",
        "note": "用 'initial feedback' 表示初步反馈。"
    },
    {
        "id": "business-66",
        "speaker": "Lee",
        "text": "That's encouraging. Are we collecting email addresses for a mailing list?",
        "translation": "这很令人鼓舞。我们在收集电子邮件地址用于邮件列表吗？",
        "note": "用 'mailing list' 表示邮件列表。"
    },
    {
        "id": "business-67",
        "speaker": "Sam",
        "text": "Absolutely. We've already got over a thousand sign-ups for launch notifications.",
        "translation": "当然。我们已经有一千多人注册了发布通知。",
        "note": "用 'sign-ups' 表示注册。"
    },
    {
        "id": "business-68",
        "speaker": "Lee",
        "text": "Excellent. That's a strong foundation for our initial user base.",
        "translation": "太好了。这是我们初始用户群的坚实基础。",
        "note": "用 'user base' 表示用户群。"
    },
    {
        "id": "business-69",
        "speaker": "Sam",
        "text": "We should plan a launch email campaign to convert those sign-ups.",
        "translation": "我们应该规划一个发布邮件活动来转化这些注册用户。",
        "note": "用 'email campaign' 表示邮件活动。"
    },
    {
        "id": "business-70",
        "speaker": "Lee",
        "text": "I can work on the email templates and scheduling. What's our target conversion?",
        "translation": "我可以处理邮件模板和排期。我们的目标转化率是多少？",
        "note": "用 'target conversion' 表示目标转化率。"
    },
    {
        "id": "business-71",
        "speaker": "Sam",
        "text": "Aim for at least 20% conversion from sign-ups to active users.",
        "translation": "目标是至少20%的转化率，从注册用户转为活跃用户。",
        "note": "用 'active users' 表示活跃用户。"
    },
    {
        "id": "business-72",
        "speaker": "Lee",
        "text": "That's realistic with good messaging and timing. I'll get started on it.",
        "translation": "有好的信息和时机，这是现实的。我会开始处理。",
        "note": "用 'realistic' 表示现实的。"
    },
    {
        "id": "business-73",
        "speaker": "Sam",
        "text": "Thanks. By the way, have you thought about our professional development goals?",
        "translation": "谢谢。顺便问一下，你考虑过我们的职业发展目标吗？",
        "note": "用 'professional development' 表示职业发展。"
    },
    {
        "id": "business-74",
        "speaker": "Lee",
        "text": "I have. I'd like to take a project management certification course this quarter.",
        "translation": "我考虑过。我想在这个季度参加一个项目管理认证课程。",
        "note": "用 'certification course' 表示认证课程。"
    },
    {
        "id": "business-75",
        "speaker": "Sam",
        "text": "That's a great idea. The company can sponsor that for you.",
        "translation": "那是个好主意。公司可以为你赞助这个课程。",
        "note": "用 'sponsor' 表示赞助。"
    },
    {
        "id": "business-76",
        "speaker": "Lee",
        "text": "I appreciate that. It would really help with managing larger projects.",
        "translation": "我很感激。这对管理更大的项目真的很有帮助。",
        "note": "用 'managing larger projects' 表示管理更大的项目。"
    },
    {
        "id": "business-77",
        "speaker": "Sam",
        "text": "Absolutely. What skills are you most interested in developing?",
        "translation": "当然。你最感兴趣发展什么技能？",
        "note": "用 'developing skills' 表示发展技能。"
    },
    {
        "id": "business-78",
        "speaker": "Lee",
        "text": "I want to improve my stakeholder management and risk assessment abilities.",
        "translation": "我想提高我的利益相关者管理和风险评估能力。",
        "note": "用 'stakeholder management' 表示利益相关者管理。"
    },
    {
        "id": "business-79",
        "speaker": "Sam",
        "text": "Those are valuable skills for your role. Let's discuss the details.",
        "translation": "这些对你的角色来说是宝贵的技能。让我们讨论一下细节。",
        "note": "用 'valuable skills' 表示宝贵的技能。"
    },
    {
        "id": "business-80",
        "speaker": "Lee",
        "text": "Thanks, Sam. I appreciate the support for my professional growth.",
        "translation": "谢谢，萨姆。我很感激对我职业成长的支持。",
        "note": "用 'professional growth' 表示职业成长。"
    },
    {
        "id": "business-81",
        "speaker": "Sam",
        "text": "Investing in our team's development is always a priority.",
        "translation": "投资我们团队的发展始终是优先事项。",
        "note": "用 'investing in' 表示投资于。"
    },
    {
        "id": "business-82",
        "speaker": "Lee",
        "text": "Speaking of team growth, are we planning to hire any new team members?",
        "translation": "说到团队成长，我们计划招聘任何新团队成员吗？",
        "note": "用 'hire new team members' 表示招聘新团队成员。"
    },
    {
        "id": "business-83",
        "speaker": "Sam",
        "text": "Yes, we're looking to add a data analyst to support our analytics efforts.",
        "translation": "是的，我们希望增加一名数据分析师来支持我们的分析工作。",
        "note": "用 'data analyst' 表示数据分析师。"
    },
    {
        "id": "business-84",
        "speaker": "Lee",
        "text": "That would be valuable. We have so much data that needs proper analysis.",
        "translation": "那会很有价值。我们有这么多数据需要适当的分析。",
        "note": "用 'proper analysis' 表示适当的分析。"
    },
    {
        "id": "business-85",
        "speaker": "Sam",
        "text": "Exactly. The role would focus on user behavior and market trends.",
        "translation": "确实。这个角色将专注于用户行为和市场趋势。",
        "note": "用 'market trends' 表示市场趋势。"
    },
    {
        "id": "business-86",
        "speaker": "Lee",
        "text": "I can help with the interview process when we start screening candidates.",
        "translation": "当我们开始筛选候选人时，我可以帮助面试过程。",
        "note": "用 'interview process' 表示面试过程。"
    },
    {
        "id": "business-87",
        "speaker": "Sam",
        "text": "That would be great. Your technical insight would be very valuable.",
        "translation": "那会很棒。你的技术见解会很有价值。",
        "note": "用 'technical insight' 表示技术见解。"
    },
    {
        "id": "business-88",
        "speaker": "Lee",
        "text": "Happy to help. Building a strong team is everyone's responsibility.",
        "translation": "乐意帮忙。建立一个强大的团队是每个人的责任。",
        "note": "用 'everyone's responsibility' 表示每个人的责任。"
    },
    {
        "id": "business-89",
        "speaker": "Sam",
        "text": "Well said. Is there anything else you'd like to discuss today?",
        "translation": "说得好。今天还有什么其他你想讨论的吗？",
        "note": "用 'Is there anything else' 询问是否还有其他事项。"
    },
    {
        "id": "business-90",
        "speaker": "Lee",
        "text": "Just one more thing - the quarterly budget review is coming up next week.",
        "translation": "还有一件事——季度预算审查下周就要开始了。",
        "note": "用 'budget review' 表示预算审查。"
    },
    {
        "id": "business-91",
        "speaker": "Sam",
        "text": "Thanks for the reminder. I'll prepare the spending reports beforehand.",
        "translation": "谢谢提醒。我会提前准备支出报告。",
        "note": "用 'spending reports' 表示支出报告。"
    },
    {
        "id": "business-92",
        "speaker": "Lee",
        "text": "Great. I'll gather the team's resource allocation data as well.",
        "translation": "太好了。我也会收集团队的资源分配数据。",
        "note": "用 'resource allocation' 表示资源分配。"
    },
    {
        "id": "business-93",
        "speaker": "Sam",
        "text": "Perfect. Let's schedule a brief prep meeting before the review.",
        "translation": "完美。让我们在审查前安排一个简短的准备会议。",
        "note": "用 'prep meeting' 表示准备会议。"
    },
    {
        "id": "business-94",
        "speaker": "Lee",
        "text": "How about Friday morning? That gives us time to compile everything.",
        "translation": "周五早上怎么样？这给了我们时间来整理所有内容。",
        "note": "用 'compile everything' 表示整理所有内容。"
    },
    {
        "id": "business-95",
        "speaker": "Sam",
        "text": "Friday at 10 AM works for me. I'll send a calendar invite.",
        "translation": "周五上午10点对我合适。我会发送日历邀请。",
        "note": "用 'calendar invite' 表示日历邀请。"
    },
    {
        "id": "business-96",
        "speaker": "Lee",
        "text": "Sounds good. I'll make sure to have all the data ready by then.",
        "translation": "听起来不错。我会确保到那时准备好所有数据。",
        "note": "用 'make sure to' 表示确保。"
    },
    {
        "id": "business-97",
        "speaker": "Sam",
        "text": "Excellent. Thanks for all your hard work this quarter, Lee.",
        "translation": "太好了。李，谢谢你这个季度的辛勤工作。",
        "note": "用 'hard work' 表示辛勤工作。"
    },
    {
        "id": "business-98",
        "speaker": "Lee",
        "text": "Thank you, Sam. It's been a rewarding quarter for our team.",
        "translation": "谢谢你，萨姆。这对我们团队来说是一个有收获的季度。",
        "note": "用 'rewarding' 表示有收获的。"
    },
    {
        "id": "business-99",
        "speaker": "Sam",
        "text": "I'm looking forward to what we'll accomplish together next quarter.",
        "translation": "我很期待下个季度我们将一起完成什么。",
        "note": "用 'accomplish together' 表示一起完成。"
    },
    {
        "id": "business-100",
        "speaker": "Lee",
        "text": "Me too. Have a great rest of your day, Sam!",
        "translation": "我也是。萨姆，祝你今天剩余时间过得愉快！",
        "note": "礼貌道别。"
    }
]

# Housing scene - last 60 sentences (newly generated)
HOUSING_LAST_60 = [
    {
        "id": "housing-41",
        "speaker": "Tenant",
        "text": "Hello! I'm here for the 2 PM viewing of the Main Street apartment.",
        "translation": "您好！我来这里看下午2点主街那套公寓。",
        "note": "用 'viewing' 表示看房。"
    },
    {
        "id": "housing-42",
        "speaker": "Landlord",
        "text": "Welcome! Right this way. The apartment is on the third floor.",
        "translation": "欢迎！这边请。公寓在三楼。",
        "note": "用 'Right this way' 引导方向。"
    },
    {
        "id": "housing-43",
        "speaker": "Tenant",
        "text": "Thank you. Does the building have an elevator?",
        "translation": "谢谢。这栋楼有电梯吗？",
        "note": "询问电梯设施。"
    },
    {
        "id": "housing-44",
        "speaker": "Landlord",
        "text": "Yes, there's an elevator at the back of the building. Very convenient.",
        "translation": "有的，楼后面有电梯。很方便。",
        "note": "用 'convenient' 表示方便。"
    },
    {
        "id": "housing-45",
        "speaker": "Tenant",
        "text": "That's good to know. What about laundry facilities?",
        "translation": "那很好。洗衣设施怎么样？",
        "note": "询问洗衣设施。"
    },
    {
        "id": "housing-46",
        "speaker": "Landlord",
        "text": "There's a communal laundry room in the basement with coin-operated machines.",
        "translation": "地下室有一个公共洗衣房，有投币式洗衣机。",
        "note": "用 'communal laundry room' 表示公共洗衣房。"
    },
    {
        "id": "housing-47",
        "speaker": "Tenant",
        "text": "Perfect. Are the machines usually available, or do they get busy?",
        "translation": "完美。机器通常有空吗，还是会很忙？",
        "note": "询问洗衣房使用情况。"
    },
    {
        "id": "housing-48",
        "speaker": "Landlord",
        "text": "Weekends can be busy, but weekdays are usually fine. We have six machines.",
        "translation": "周末可能会忙，但平时通常没问题。我们有六台机器。",
        "note": "提供洗衣房使用建议。"
    },
    {
        "id": "housing-49",
        "speaker": "Tenant",
        "text": "That sounds manageable. What about internet connectivity?",
        "translation": "听起来可以处理。网络连接怎么样？",
        "note": "询问网络连接。"
    },
    {
        "id": "housing-50",
        "speaker": "Landlord",
        "text": "The building is fiber-optic ready. You can choose any provider you prefer.",
        "translation": "大楼已准备好光纤。你可以选择任何你喜欢的提供商。",
        "note": "用 'fiber-optic ready' 表示光纤就绪。"
    },
    {
        "id": "housing-51",
        "speaker": "Tenant",
        "text": "Great. Is the apartment furnished or unfurnished?",
        "translation": "太好了。公寓是带家具的还是不带家具的？",
        "note": "询问家具情况。"
    },
    {
        "id": "housing-52",
        "speaker": "Landlord",
        "text": "It's unfurnished, but it does include a refrigerator and stove.",
        "translation": "是不带家具的，但包括冰箱和炉灶。",
        "note": "说明基础家电。"
    },
    {
        "id": "housing-53",
        "speaker": "Tenant",
        "text": "That works for me. What's the condition of the kitchen appliances?",
        "translation": "这对我合适。厨房家电的状况如何？",
        "note": "询问家电状况。"
    },
    {
        "id": "housing-54",
        "speaker": "Landlord",
        "text": "They were replaced last year, so they're in excellent condition.",
        "translation": "它们去年换过，所以状况很好。",
        "note": "用 'excellent condition' 表示状况很好。"
    },
    {
        "id": "housing-55",
        "speaker": "Tenant",
        "text": "Excellent. How about the heating and cooling system?",
        "translation": "太好了。供暖和制冷系统怎么样？",
        "note": "询问空调系统。"
    },
    {
        "id": "housing-56",
        "speaker": "Landlord",
        "text": "Central air conditioning and gas heating. Both work very efficiently.",
        "translation": "中央空调和燃气供暖。两者都很高效。",
        "note": "用 'central air conditioning' 表示中央空调。"
    },
    {
        "id": "housing-57",
        "speaker": "Tenant",
        "text": "That's important. Who handles maintenance if something breaks down?",
        "translation": "那很重要。如果什么东西坏了，谁负责维修？",
        "note": "询问维修责任。"
    },
    {
        "id": "housing-58",
        "speaker": "Landlord",
        "text": "I handle all major repairs. For minor issues, I can guide you or send someone.",
        "translation": "我处理所有主要维修。对于小问题，我可以指导你或派人去。",
        "note": "说明维修责任分工。"
    },
    {
        "id": "housing-59",
        "speaker": "Tenant",
        "text": "Good to know. What's the average response time for maintenance requests?",
        "translation": "知道了。维修请求的平均响应时间是多少？",
        "note": "询问维修响应时间。"
    },
    {
        "id": "housing-60",
        "speaker": "Landlord",
        "text": "For emergencies, I respond within 24 hours. Non-urgent issues within a week.",
        "translation": "紧急情况我在24小时内响应。非紧急问题在一周内。",
        "note": "用 'emergencies' 表示紧急情况。"
    },
    {
        "id": "housing-61",
        "speaker": "Tenant",
        "text": "That's reasonable. What about the neighborhood? Is it safe?",
        "translation": "那很合理。附近社区怎么样？安全吗？",
        "note": "询问社区安全。"
    },
    {
        "id": "housing-62",
        "speaker": "Landlord",
        "text": "Very safe. It's a quiet residential area with many families and professionals.",
        "translation": "很安全。这是一个安静的住宅区，有很多家庭和专业人士。",
        "note": "用 'residential area' 表示住宅区。"
    },
    {
        "id": "housing-63",
        "speaker": "Tenant",
        "text": "That sounds perfect. Are there grocery stores nearby?",
        "translation": "听起来很完美。附近有杂货店吗？",
        "note": "询问购物便利性。"
    },
    {
        "id": "housing-64",
        "speaker": "Landlord",
        "text": "Yes, there's a supermarket two blocks away and a farmers market on weekends.",
        "translation": "有的，两个街区外有一家超市，周末有农贸市场。",
        "note": "用 'farmers market' 表示农贸市场。"
    },
    {
        "id": "housing-65",
        "speaker": "Tenant",
        "text": "Excellent. What about public transportation options?",
        "translation": "太好了。公共交通选择怎么样？",
        "note": "询问交通便利性。"
    },
    {
        "id": "housing-66",
        "speaker": "Landlord",
        "text": "The bus stop is right outside the building. subway station is a 10-minute walk.",
        "translation": "公交站就在楼外。地铁站步行10分钟。",
        "note": "提供交通信息。"
    },
    {
        "id": "housing-67",
        "speaker": "Tenant",
        "text": "That's very convenient. How's the noise level in the building?",
        "translation": "那很方便。楼里的噪音水平如何？",
        "note": "询问噪音情况。"
    },
    {
        "id": "housing-68",
        "speaker": "Landlord",
        "text": "Very quiet. Thick walls and most neighbors are working professionals.",
        "translation": "很安静。墙壁很厚，大多数邻居都是工作专业人士。",
        "note": "用 'thick walls' 表示厚墙隔音。"
    },
    {
        "id": "housing-69",
        "speaker": "Tenant",
        "text": "Perfect for working from home. Are there any restrictions on guests?",
        "translation": "对在家工作来说很完美。对客人有什么限制吗？",
        "note": "询问客人政策。"
    },
    {
        "id": "housing-70",
        "speaker": "Landlord",
        "text": "Overnight guests are fine for up to a week. Just let me know for security.",
        "translation": "过夜客人最多可以住一周。为了安全请告诉我。",
        "note": "说明客人政策。"
    },
    {
        "id": "housing-71",
        "speaker": "Tenant",
        "text": "Understood. What about the move-in process? When can I move in?",
        "translation": "明白了。搬入流程怎么样？我什么时候可以搬入？",
        "note": "询问搬入流程。"
    },
    {
        "id": "housing-72",
        "speaker": "Landlord",
        "text": "The apartment is available from the first of next month. We can sign the lease today.",
        "translation": "公寓从下个月1号起可用。我们今天可以签租约。",
        "note": "用 'sign the lease' 表示签租约。"
    },
    {
        "id": "housing-73",
        "speaker": "Tenant",
        "text": "That works perfectly. What do I need to bring for the lease signing?",
        "translation": "那完全合适。签租约我需要带什么？",
        "note": "询问签约所需材料。"
    },
    {
        "id": "housing-74",
        "speaker": "Landlord",
        "text": "Just your ID, proof of income, and the first month's rent plus security deposit.",
        "translation": "只需要你的身份证、收入证明，以及第一个月的房租加押金。",
        "note": "用 'security deposit' 表示押金。"
    },
    {
        "id": "housing-75",
        "speaker": "Tenant",
        "text": "How much is the security deposit?",
        "translation": "押金是多少？",
        "note": "询问押金金额。"
    },
    {
        "id": "housing-76",
        "speaker": "Landlord",
        "text": "One month's rent. It's refundable when you move out, minus any damages.",
        "translation": "一个月的房租。搬出时退还，扣除任何损坏费用。",
        "note": "用 'refundable' 表示可退还的。"
    },
    {
        "id": "housing-77",
        "speaker": "Tenant",
        "text": "That's standard. Are there any other fees I should know about?",
        "translation": "那是标准的。还有其他我应该知道的费用吗？",
        "note": "询问其他费用。"
    },
    {
        "id": "housing-78",
        "speaker": "Landlord",
        "text": "Just a small application fee of $50 to cover background check costs.",
        "translation": "只有50美元的小额申请费，用于背景调查费用。",
        "note": "用 'application fee' 表示申请费。"
    },
    {
        "id": "housing-79",
        "speaker": "Tenant",
        "text": "Fair enough. How do you prefer to receive rent payments?",
        "translation": "合理。你希望如何收到房租付款？",
        "note": "询问付款方式。"
    },
    {
        "id": "housing-80",
        "speaker": "Landlord",
        "text": "Bank transfer is preferred, but I also accept checks or online payment apps.",
        "translation": "首选银行转账，但我也接受支票或在线支付应用。",
        "note": "用 'bank transfer' 表示银行转账。"
    },
    {
        "id": "housing-81",
        "speaker": "Tenant",
        "text": "Bank transfer works for me. Is rent due on the first of each month?",
        "translation": "银行转账对我可行。房租是每月1号到期吗？",
        "note": "询问付款日期。"
    },
    {
        "id": "housing-82",
        "speaker": "Landlord",
        "text": "Yes, with a 5-day grace period. After that, there's a small late fee.",
        "translation": "是的，有5天的宽限期。之后有小额滞纳金。",
        "note": "用 'grace period' 表示宽限期。"
    },
    {
        "id": "housing-83",
        "speaker": "Tenant",
        "text": "That's reasonable. What's included in the rent besides water?",
        "translation": "那很合理。除了水费，房租还包括什么？",
        "note": "询问房租包含项目。"
    },
    {
        "id": "housing-84",
        "speaker": "Landlord",
        "text": "Water and trash pickup are included. You'll pay for electricity and gas directly.",
        "translation": "水费和垃圾回收包括在内。你需要直接支付电费和燃气费。",
        "note": "用 'trash pickup' 表示垃圾回收。"
    },
    {
        "id": "housing-85",
        "speaker": "Tenant",
        "text": "Understood. How do I set up utility accounts in my name?",
        "translation": "明白了。我如何在我名下设立公用事业账户？",
        "note": "询问设立公用事业账户。"
    },
    {
        "id": "housing-86",
        "speaker": "Landlord",
        "text": "I'll provide you with the contact information for the utility companies.",
        "translation": "我会提供公用事业公司的联系信息给你。",
        "note": "提供公用事业公司信息。"
    },
    {
        "id": "housing-87",
        "speaker": "Tenant",
        "text": "Perfect. What about parking? Is the garage spot included in the rent?",
        "translation": "完美。停车怎么样？车库车位包括在房租内吗？",
        "note": "询问停车费用。"
    },
    {
        "id": "housing-88",
        "speaker": "Landlord",
        "text": "Garage parking is an additional $100 per month. Street parking is free.",
        "translation": "车库停车每月额外100美元。路边停车免费。",
        "note": "说明停车费用。"
    },
    {
        "id": "housing-89",
        "speaker": "Tenant",
        "text": "I'll probably start with street parking and see if I need the garage.",
        "translation": "我可能先从路边停车开始，看看是否需要车库。",
        "note": "表示停车选择。"
    },
    {
        "id": "housing-90",
        "speaker": "Landlord",
        "text": "That's fine. You can always add garage parking later if you need it.",
        "translation": "那没问题。如果需要，你以后可以随时增加车库停车。",
        "note": "提供灵活选择。"
    },
    {
        "id": "housing-91",
        "speaker": "Tenant",
        "text": "Great. One last question - are there any specific move-in or move-out procedures?",
        "translation": "太好了。最后一个问题——有什么具体的搬入或搬出程序吗？",
        "note": "询问搬入搬出程序。"
    },
    {
        "id": "housing-92",
        "speaker": "Landlord",
        "text": "For move-in, we'll do a walkthrough checklist. For move-out, similar process.",
        "translation": "搬入时，我们会做检查清单。搬出时也是类似流程。",
        "note": "用 'walkthrough checklist' 表示检查清单。"
    },
    {
        "id": "housing-93",
        "speaker": "Tenant",
        "text": "That sounds organized. I like having clear procedures.",
        "translation": "听起来很有组织。我喜欢有清晰的程序。",
        "note": "表达对清晰程序的认可。"
    },
    {
        "id": "housing-94",
        "speaker": "Landlord",
        "text": "It helps avoid misunderstandings. I want this to be a good experience for both of us.",
        "translation": "这有助于避免误解。我希望这对我们双方都是一次好的体验。",
        "note": "表达良好合作的意愿。"
    },
    {
        "id": "housing-95",
        "speaker": "Tenant",
        "text": "I appreciate that. This apartment seems like a great fit for me.",
        "translation": "我很感激。这套公寓似乎很适合我。",
        "note": "表达对公寓的满意。"
    },
    {
        "id": "housing-96",
        "speaker": "Landlord",
        "text": "I'm glad to hear that. I think you'll be happy here.",
        "translation": "很高兴听到这个。我想你会在这里住得开心。",
        "note": "表达对租客的信心。"
    },
    {
        "id": "housing-97",
        "speaker": "Tenant",
        "text": "I'm ready to move forward with the lease. Should we go back to your office?",
        "translation": "我准备继续签租约。我们应该回你办公室吗？",
        "note": "表示准备签约。"
    },
    {
        "id": "housing-98",
        "speaker": "Landlord",
        "text": "Yes, let's go back. I have the lease agreement ready for you to review.",
        "translation": "是的，我们回去吧。我准备好了租约协议供你审阅。",
        "note": "表示准备签约流程。"
    },
    {
        "id": "housing-99",
        "speaker": "Tenant",
        "text": "Perfect. Thank you for showing me the apartment and answering all my questions.",
        "translation": "完美。谢谢你带我参观公寓并回答我所有问题。",
        "note": "感谢房东的服务。"
    },
    {
        "id": "housing-100",
        "speaker": "Landlord",
        "text": "You're very welcome. I look forward to having you as a tenant!",
        "translation": "不客气。我很期待你成为我的租客！",
        "note": "表达对租客的欢迎。"
    }
]

# Medical scene - 100 sentences (newly generated)
MEDIAL_FULL_100 = [
    {
        "id": "medical-1",
        "speaker": "Patient",
        "text": "Hello, I'd like to schedule an appointment with Dr. Johnson.",
        "translation": "您好，我想预约约翰逊医生的门诊。",
        "note": "用 'schedule an appointment' 表示预约门诊。"
    },
    {
        "id": "medical-2",
        "speaker": "Doctor",
        "text": "Good morning. What seems to be the reason for your visit today?",
        "translation": "早上好。今天您来访的原因是什么？",
        "note": "医生询问就诊原因。"
    },
    {
        "id": "medical-3",
        "speaker": "Patient",
        "text": "I've been experiencing persistent headaches for the past two weeks.",
        "translation": "过去两周我一直持续头痛。",
        "note": "用 'persistent headaches' 表示持续头痛。"
    },
    {
        "id": "medical-4",
        "speaker": "Doctor",
        "text": "I'm sorry to hear that. Can you describe the pain in more detail?",
        "translation": "很遗憾听到这个。你能更详细地描述这种疼痛吗？",
        "note": "用 'describe the pain' 表示描述疼痛。"
    },
    {
        "id": "medical-5",
        "speaker": "Patient",
        "text": "It's mostly on the right side of my head, throbbing and quite intense.",
        "translation": "主要在头部右侧，跳动且相当剧烈。",
        "note": "用 'throbbing' 表示跳动的疼痛。"
    },
    {
        "id": "medical-6",
        "speaker": "Doctor",
        "text": "Does the pain worsen at any particular time of day or with certain activities?",
        "translation": "疼痛在一天中的特定时间或某些活动时会加重吗？",
        "note": "询问疼痛诱因。"
    },
    {
        "id": "medical-7",
        "speaker": "Patient",
        "text": "It tends to be worse in the mornings and when I'm looking at screens for long periods.",
        "translation": "通常在早上和长时间看屏幕时更严重。",
        "note": "用 'tends to be worse' 表示倾向于更严重。"
    },
    {
        "id": "medical-8",
        "speaker": "Doctor",
        "text": "Have you noticed any other symptoms accompanying the headaches?",
        "translation": "你注意到头痛伴随其他症状吗？",
        "note": "询问伴随症状。"
    },
    {
        "id": "medical-9",
        "speaker": "Patient",
        "text": "Sometimes I feel a bit nauseous and sensitive to bright lights.",
        "translation": "有时我觉得有点恶心，对强光敏感。",
        "note": "用 'sensitive to bright lights' 表示对强光敏感。"
    },
    {
        "id": "medical-10",
        "speaker": "Doctor",
        "text": "That's helpful information. How many hours of sleep do you typically get?",
        "translation": "那是有用的信息。你通常睡多少小时？",
        "note": "询问睡眠情况。"
    },
    {
        "id": "medical-11",
        "speaker": "Patient",
        "text": "I try to get 7-8 hours, but I've been having trouble falling asleep lately.",
        "translation": "我试着睡7-8小时，但最近很难入睡。",
        "note": "用 'trouble falling asleep' 表示难以入睡。"
    },
    {
        "id": "medical-12",
        "speaker": "Doctor",
        "text": "Stress or anxiety can often contribute to both headaches and sleep issues.",
        "translation": "压力或焦虑经常会导致头痛和睡眠问题。",
        "note": "用 'contribute to' 表示导致。"
    },
    {
        "id": "medical-13",
        "speaker": "Patient",
        "text": "Actually, work has been quite stressful recently with a big project deadline.",
        "translation": "实际上，最近工作压力很大，有个大项目的截止日期。",
        "note": "用 'stressful' 表示有压力的。"
    },
    {
        "id": "medical-14",
        "speaker": "Doctor",
        "text": "That makes sense. Have you tried any over-the-counter pain medications?",
        "translation": "那可以理解。你试过任何非处方止痛药吗？",
        "note": "用 'over-the-counter' 表示非处方的。"
    },
    {
        "id": "medical-15",
        "speaker": "Patient",
        "text": "I've taken ibuprofen a few times, but it only provides temporary relief.",
        "translation": "我吃过几次布洛芬，但只能暂时缓解。",
        "note": "用 'temporary relief' 表示暂时缓解。"
    },
    {
        "id": "medical-16",
        "speaker": "Doctor",
        "text": "Let me examine you. I'll check your blood pressure and look at your eyes.",
        "translation": "让我检查一下你。我会检查你的血压并看看你的眼睛。",
        "note": "开始身体检查。"
    },
    {
        "id": "medical-17",
        "speaker": "Patient",
        "text": "Thank you. I'm a bit worried it might be something serious.",
        "translation": "谢谢。我有点担心这可能是严重的问题。",
        "note": "表达担忧。"
    },
    {
        "id": "medical-18",
        "speaker": "Doctor",
        "text": "It's understandable to be concerned, but most headaches are not serious.",
        "translation": "担心是可以理解的，但大多数头痛并不严重。",
        "note": "安抚患者情绪。"
    },
    {
        "id": "medical-19",
        "speaker": "Patient",
        "text": "That's reassuring. What are you looking for specifically?",
        "translation": "那让人安心。你具体在寻找什么？",
        "note": "询问检查重点。"
    },
    {
        "id": "medical-20",
        "speaker": "Doctor",
        "text": "I'm checking for signs of tension, migraine, or any neurological issues.",
        "translation": "我在检查紧张、偏头痛或任何神经系统问题的迹象。",
        "note": "用 'neurological issues' 表示神经系统问题。"
    },
    {
        "id": "medical-21",
        "speaker": "Patient",
        "text": "My mother gets migraines. Could this be hereditary?",
        "translation": "我母亲有偏头痛。这可能是遗传的吗？",
        "note": "询问遗传因素。"
    },
    {
        "id": "medical-22",
        "speaker": "Doctor",
        "text": "Migraines can have a genetic component. Your symptoms do have some similarities.",
        "translation": "偏头痛可能有遗传成分。你的症状确实有一些相似之处。",
        "note": "用 'genetic component' 表示遗传成分。"
    },
    {
        "id": "medical-23",
        "speaker": "Patient",
        "text": "What treatment options are available if it is a migraine?",
        "translation": "如果是偏头痛，有什么治疗选择？",
        "note": "询问治疗方案。"
    },
    {
        "id": "medical-24",
        "speaker": "Doctor",
        "text": "There are several approaches: lifestyle changes, preventive medications, and pain relief.",
        "translation": "有几种方法：生活方式改变、预防性药物和疼痛缓解。",
        "note": "介绍治疗方法。"
    },
    {
        "id": "medical-25",
        "speaker": "Patient",
        "text": "What kind of lifestyle changes would help?",
        "translation": "什么样的生活方式改变会有帮助？",
        "note": "询问生活方式建议。"
    },
    {
        "id": "medical-26",
        "speaker": "Doctor",
        "text": "Regular sleep schedule, stress management, staying hydrated, and limiting screen time.",
        "translation": "规律的睡眠时间表、压力管理、保持水分和限制屏幕时间。",
        "note": "列出生活方式建议。"
    },
    {
        "id": "medical-27",
        "speaker": "Patient",
        "text": "I definitely need to work on my sleep schedule and stress levels.",
        "translation": "我确实需要在睡眠时间表和压力水平上下功夫。",
        "note": "认同建议。"
    },
    {
        "id": "medical-28",
        "speaker": "Doctor",
        "text": "Small, consistent changes can make a big difference over time.",
        "translation": "小小的、一致的改变随着时间的推移会产生巨大的差异。",
        "note": "鼓励渐进改变。"
    },
    {
        "id": "medical-29",
        "speaker": "Patient",
        "text": "What about preventive medications? Are they prescription only?",
        "translation": "预防性药物呢？它们是处方药吗？",
        "note": "询问药物类型。"
    },
    {
        "id": "medical-30",
        "speaker": "Doctor",
        "text": "Some are prescription, but we'd start with lifestyle changes and see how you respond.",
        "translation": "有些是处方药，但我们会从生活方式改变开始，看看你的反应。",
        "note": "说明治疗顺序。"
    },
    {
        "id": "medical-31",
        "speaker": "Patient",
        "text": "That sounds reasonable. How long should I try lifestyle changes before considering medication?",
        "translation": "那听起来合理。在考虑药物之前我应该尝试生活方式改变多久？",
        "note": "询问尝试时间。"
    },
    {
        "id": "medical-32",
        "speaker": "Doctor",
        "text": "Usually 4-6 weeks. If symptoms persist, we can discuss medication options.",
        "translation": "通常4-6周。如果症状持续，我们可以讨论药物选择。",
        "note": "设定时间框架。"
    },
    {
        "id": "medical-33",
        "speaker": "Patient",
        "text": "What should I do if I get a severe headache before our next appointment?",
        "translation": "如果在我们下次预约前我出现严重头痛该怎么办？",
        "note": "询问急性发作处理。"
    },
    {
        "id": "medical-34",
        "speaker": "Doctor",
        "text": "Continue with ibuprofen as needed, but don't exceed the recommended dosage.",
        "translation": "必要时继续服用布洛芬，但不要超过推荐剂量。",
        "note": "提供急性处理建议。"
    },
    {
        "id": "medical-35",
        "speaker": "Patient",
        "text": "Are there any warning signs that would require immediate medical attention?",
        "translation": "有任何需要立即就医的警告迹象吗？",
        "note": "询问紧急症状。"
    },
    {
        "id": "medical-36",
        "speaker": "Doctor",
        "text": "Yes: sudden severe headache, vision changes, confusion, or difficulty speaking.",
        "translation": "有的：突然严重头痛、视力变化、困惑或说话困难。",
        "note": "列出紧急症状。"
    },
    {
        "id": "medical-37",
        "speaker": "Patient",
        "text": "I'll make sure to watch for those. Should I keep a headache diary?",
        "translation": "我会注意观察这些。我应该写头痛日记吗？",
        "note": "询问记录症状。"
    },
    {
        "id": "medical-38",
        "speaker": "Doctor",
        "text": "That's an excellent idea. Note the time, duration, intensity, and any triggers.",
        "translation": "那是个极好的主意。记录时间、持续时间、强度和任何诱因。",
        "note": "建议记录细节。"
    },
    {
        "id": "medical-39",
        "speaker": "Patient",
        "text": "That will help identify patterns. What kind of triggers should I look for?",
        "translation": "那有助于识别模式。我应该寻找什么样的诱因？",
        "note": "询问诱因类型。"
    },
    {
        "id": "medical-40",
        "speaker": "Doctor",
        "text": "Common triggers include certain foods, weather changes, hormonal shifts, and stress.",
        "translation": "常见诱因包括某些食物、天气变化、激素变化和压力。",
        "note": "列出常见诱因。"
    },
    {
        "id": "medical-41",
        "speaker": "Patient",
        "text": "I've noticed caffeine sometimes triggers my headaches. Should I cut it out completely?",
        "translation": "我注意到咖啡因有时会引发我的头痛。我应该完全戒掉吗？",
        "note": "询问咖啡因摄入。"
    },
    {
        "id": "medical-42",
        "speaker": "Doctor",
        "text": "Gradual reduction is better than stopping abruptly, as it can cause withdrawal headaches.",
        "translation": "逐渐减少比突然停止更好，因为突然停止可能会导致戒断性头痛。",
        "note": "用 'withdrawal headaches' 表示戒断性头痛。"
    },
    {
        "id": "medical-43",
        "speaker": "Patient",
        "text": "Good advice. What about exercise? Does it help or hurt with headaches?",
        "translation": "好建议。运动呢？它对头痛有帮助还是有害？",
        "note": "询问运动影响。"
    },
    {
        "id": "medical-44",
        "speaker": "Doctor",
        "text": "Regular moderate exercise can help prevent headaches, but intense exercise might trigger them.",
        "translation": "规律的中等强度运动有助于预防头痛，但剧烈运动可能会引发头痛。",
        "note": "用 'moderate exercise' 表示中等强度运动。"
    },
    {
        "id": "medical-45",
        "speaker": "Patient",
        "text": "I usually go to the gym three times a week. Should I continue that routine?",
        "translation": "我通常每周去健身房三次。我应该继续这个例行程序吗？",
        "note": "询问现有运动习惯。"
    },
    {
        "id": "medical-46",
        "speaker": "Doctor",
        "text": "Yes, but maybe focus on lower intensity workouts during this period.",
        "translation": "是的，但在这个期间可能专注于低强度锻炼。",
        "note": "建议调整运动强度。"
    },
    {
        "id": "medical-47",
        "speaker": "Patient",
        "text": "That makes sense. What about my diet? Are there specific foods I should avoid?",
        "translation": "那有道理。我的饮食呢？有什么具体的食物我应该避免吗？",
        "note": "询问饮食建议。"
    },
    {
        "id": "medical-48",
        "speaker": "Doctor",
        "text": "Common triggers include aged cheeses, processed meats, alcohol, and foods with MSG.",
        "translation": "常见诱因包括陈年奶酪、加工肉类、酒精和含味精的食物。",
        "note": "列出饮食诱因。"
    },
    {
        "id": "medical-49",
        "speaker": "Patient",
        "text": "I do eat cheese quite often. I'll try reducing that for now.",
        "translation": "我确实经常吃奶酪。我现在会试着减少。",
        "note": "表示愿意调整饮食。"
    },
    {
        "id": "medical-50",
        "speaker": "Doctor",
        "text": "Keeping a food diary along with your headache diary will help identify personal triggers.",
        "translation": "保持食物日记和头痛日记一起将有助于识别个人诱因。",
        "note": "建议食物日记。"
    },
    {
        "id": "medical-51",
        "speaker": "Patient",
        "text": "I'll start both diaries today. When should I schedule a follow-up appointment?",
        "translation": "我今天会开始两个日记。我应该安排什么时候的后续预约？",
        "note": "询问后续预约时间。"
    },
    {
        "id": "medical-52",
        "speaker": "Doctor",
        "text": "Let's schedule a follow-up in 4 weeks to review your progress and diaries.",
        "translation": "让我们安排4周后的后续预约，回顾你的进展和日记。",
        "note": "安排后续预约。"
    },
    {
        "id": "medical-53",
        "speaker": "Patient",
        "text": "Perfect. Is there anything else I should be aware of?",
        "translation": "完美。还有什么其他我应该注意的吗？",
        "note": "询问其他注意事项。"
    },
    {
        "id": "medical-54",
        "speaker": "Doctor",
        "text": "Stay well-hydrated and practice good posture, especially when using screens.",
        "translation": "保持充足水分并保持良好姿势，特别是在使用屏幕时。",
        "note": "提供额外建议。"
    },
    {
        "id": "medical-55",
        "speaker": "Patient",
        "text": "I tend to slouch when working. I'll work on my posture.",
        "translation": "我工作时倾向于驼背。我会改善我的姿势。",
        "note": "承认姿势问题。"
    },
    {
        "id": "medical-56",
        "speaker": "Doctor",
        "text": "Ergonomic adjustments to your workspace can also make a significant difference.",
        "translation": "工作空间的人体工程学调整也会产生显著差异。",
        "note": "用 'ergonomic adjustments' 表示人体工程学调整。"
    },
    {
        "id": "medical-57",
        "speaker": "Patient",
        "text": "I've been meaning to get a better chair and adjust my monitor height.",
        "translation": "我一直想买把更好的椅子并调整显示器高度。",
        "note": "表示有改进计划。"
    },
    {
        "id": "medical-58",
        "speaker": "Doctor",
        "text": "Those changes should help. Small adjustments to your environment can reduce strain.",
        "translation": "那些改变应该有帮助。环境的微小调整可以减少压力。",
        "note": "强调环境调整的重要性。"
    },
    {
        "id": "medical-59",
        "speaker": "Patient",
        "text": "What about stress management techniques? Do you have any recommendations?",
        "translation": "压力管理技巧呢？你有什么推荐吗？",
        "note": "询问压力管理方法。"
    },
    {
        "id": "medical-60",
        "speaker": "Doctor",
        "text": "Deep breathing exercises, meditation, and regular breaks during work can all help.",
        "translation": "深呼吸练习、冥想和工作期间定期休息都有帮助。",
        "note": "推荐压力管理技巧。"
    },
    {
        "id": "medical-61",
        "speaker": "Patient",
        "text": "I've heard good things about meditation apps. Are they effective?",
        "translation": "我听说过冥想应用的好评。它们有效吗？",
        "note": "询问冥想应用。"
    },
    {
        "id": "medical-62",
        "speaker": "Doctor",
        "text": "Many patients find them helpful. Even 5-10 minutes daily can make a difference.",
        "translation": "许多患者发现它们有帮助。即使每天5-10分钟也会有差异。",
        "note": "认可冥想应用的效果。"
    },
    {
        "id": "medical-63",
        "speaker": "Patient",
        "text": "I'll try incorporating that into my daily routine.",
        "translation": "我会试着将其纳入我的日常例行程序。",
        "note": "表示愿意尝试。"
    },
    {
        "id": "medical-64",
        "speaker": "Doctor",
        "text": "Consistency is key with stress management. Small daily practices add up over time.",
        "translation": "一致性是压力管理的关键。小的日常练习随着时间的推移会累积。",
        "note": "强调一致性的重要性。"
    },
    {
        "id": "medical-65",
        "speaker": "Patient",
        "text": "What about my sleep? Are there specific techniques for better sleep?",
        "translation": "我的睡眠呢？有没有更好的睡眠具体技巧？",
        "note": "询问睡眠改善技巧。"
    },
    {
        "id": "medical-66",
        "speaker": "Doctor",
        "text": "Establish a consistent bedtime routine, avoid screens before bed, and keep your room cool.",
        "translation": "建立一致的睡前例行程序，睡前避免屏幕，保持房间凉爽。",
        "note": "提供睡眠卫生建议。"
    },
    {
        "id": "medical-67",
        "speaker": "Patient",
        "text": "I often check my phone right before bed. That's probably not helping.",
        "translation": "我经常在睡前检查手机。这可能没有帮助。",
        "note": "承认不良睡前习惯。"
    },
    {
        "id": "medical-68",
        "speaker": "Doctor",
        "text": "The blue light from screens can interfere with melatonin production and sleep quality.",
        "translation": "屏幕的蓝光会干扰褪黑素的产生和睡眠质量。",
        "note": "用 'melatonin production' 表示褪黑素产生。"
    },
    {
        "id": "medical-69",
        "speaker": "Patient",
        "text": "I'll make an effort to put my phone away at least an hour before bed.",
        "translation": "我会努力在睡前至少一小时把手机收起来。",
        "note": "承诺改变睡前习惯。"
    },
    {
        "id": "medical-70",
        "speaker": "Doctor",
        "text": "That's a great change. Reading a book instead of scrolling can be very relaxing.",
        "translation": "那是个很好的改变。读书而不是刷屏会非常放松。",
        "note": "建议替代活动。"
    },
    {
        "id": "medical-71",
        "speaker": "Patient",
        "text": "I used to read more before bed. I'll get back into that habit.",
        "translation": "我以前睡前读更多书。我会重新养成那个习惯。",
        "note": "表示恢复旧习惯。"
    },
    {
        "id": "medical-72",
        "speaker": "Doctor",
        "text": "Excellent. These lifestyle changes may take a few weeks to show improvement.",
        "translation": "太好了。这些生活方式改变可能需要几周才能显示出改善。",
        "note": "设定预期时间。"
    },
    {
        "id": "medical-73",
        "speaker": "Patient",
        "text": "I understand. I need to be patient and consistent with the changes.",
        "translation": "我理解。我需要对这些改变保持耐心和一致。",
        "note": "表示理解治疗过程。"
    },
    {
        "id": "medical-74",
        "speaker": "Doctor",
        "text": "Exactly. Health improvements are often gradual rather than immediate.",
        "translation": "确实。健康改善通常是渐进的而不是立即的。",
        "note": "用 'gradual' 表示渐进的。"
    },
    {
        "id": "medical-75",
        "speaker": "Patient",
        "text": "Should I continue taking ibuprofen while making these changes?",
        "translation": "在进行这些改变时我应该继续服用布洛芬吗？",
        "note": "询问药物使用。"
    },
    {
        "id": "medical-76",
        "speaker": "Doctor",
        "text": "Yes, as needed for pain relief, but try to use it minimally as we address the root causes.",
        "translation": "是的，必要时用于缓解疼痛，但尽量少用，因为我们正在解决根本原因。",
        "note": "指导药物使用策略。"
    },
    {
        "id": "medical-77",
        "speaker": "Patient",
        "text": "That makes sense. I want to address the underlying issues rather than just mask symptoms.",
        "translation": "那有道理。我想解决根本问题而不是仅仅掩盖症状。",
        "note": "表达治疗理念。"
    },
    {
        "id": "medical-78",
        "speaker": "Doctor",
        "text": "That's the right approach. You're taking a proactive stance on your health.",
        "translation": "那是正确的方法。你对健康采取了主动的态度。",
        "note": "认可患者的积极态度。"
    },
    {
        "id": "medical-79",
        "speaker": "Patient",
        "text": "Thank you. I feel more confident about managing this now.",
        "translation": "谢谢你。现在我对管理这个更有信心了。",
        "note": "表达信心增加。"
    },
    {
        "id": "medical-80",
        "speaker": "Doctor",
        "text": "That's wonderful to hear. Remember, I'm here to support you through this process.",
        "translation": "很高兴听到这个。记住，我在这个过程中支持你。",
        "note": "提供支持保证。"
    },
    {
        "id": "medical-81",
        "speaker": "Patient",
        "text": "I appreciate that. Is there anything else we should cover today?",
        "translation": "我很感激。今天还有什么其他我们应该涵盖的吗？",
        "note": "询问是否有其他事项。"
    },
    {
        "id": "medical-82",
        "speaker": "Doctor",
        "text": "I'd like to check your blood pressure and do a quick physical exam before you go.",
        "translation": "在你走之前，我想检查你的血压并做快速的身体检查。",
        "note": "建议进一步检查。"
    },
    {
        "id": "medical-83",
        "speaker": "Patient",
        "text": "Of course. Is that standard procedure for headache patients?",
        "translation": "当然。这是头痛患者的标准程序吗？",
        "note": "询问检查目的。"
    },
    {
        "id": "medical-84",
        "speaker": "Doctor",
        "text": "Yes, it helps rule out other potential causes and gives us a baseline for comparison.",
        "translation": "是的，这有助于排除其他潜在原因，并为我们提供比较的基线。",
        "note": "用 'rule out' 表示排除。"
    },
    {
        "id": "medical-85",
        "speaker": "Patient",
        "text": "That's thorough. I appreciate the comprehensive approach.",
        "translation": "那很全面。我很感激这种综合方法。",
        "note": "认可全面检查。"
    },
    {
        "id": "medical-86",
        "speaker": "Doctor",
        "text": "Your blood pressure is normal, which is good. Let me check your reflexes and coordination.",
        "translation": "你的血压正常，这很好。让我检查你的反射和协调性。",
        "note": "进行神经系统检查。"
    },
    {
        "id": "medical-87",
        "speaker": "Patient",
        "text": "Everything feels normal to me. Is that what you're finding as well?",
        "translation": "对我来说一切感觉正常。你也发现是这样吗？",
        "note": "询问检查结果。"
    },
    {
        "id": "medical-88",
        "speaker": "Doctor",
        "text": "Yes, your neurological exam is normal, which is reassuring. No concerning signs.",
        "translation": "是的，你的神经系统检查正常，这让人安心。没有令人担忧的迹象。",
        "note": "报告正常检查结果。"
    },
    {
        "id": "medical-89",
        "speaker": "Patient",
        "text": "That's a relief. So the focus should be on lifestyle management?",
        "translation": "那让人解脱。所以重点应该放在生活方式管理上？",
        "note": "确认治疗重点。"
    },
    {
        "id": "medical-90",
        "speaker": "Doctor",
        "text": "Exactly. We'll monitor your progress and adjust our approach based on your response.",
        "translation": "确实。我们会监测你的进展，并根据你的反应调整我们的方法。",
        "note": "说明监测计划。"
    },
    {
        "id": "medical-91",
        "speaker": "Patient",
        "text": "How often should I check in with you before the 4-week follow-up?",
        "translation": "在4周后续预约之前我应该多久和你联系一次？",
        "note": "询问联系频率。"
    },
    {
        "id": "medical-92",
        "speaker": "Doctor",
        "text": "You can call the office if symptoms worsen or if you have questions about the plan.",
        "translation": "如果症状恶化或你对计划有疑问，可以给办公室打电话。",
        "note": "提供联系指导。"
    },
    {
        "id": "medical-93",
        "speaker": "Patient",
        "text": "Perfect. I'll keep track of everything and bring my diaries to the next appointment.",
        "translation": "完美。我会记录一切，并在下次预约时带上我的日记。",
        "note": "承诺记录保持。"
    },
    {
        "id": "medical-94",
        "speaker": "Doctor",
        "text": "That will be very helpful for evaluating your progress. The receptionist will schedule your follow-up.",
        "translation": "那对评估你的进展会很有帮助。接待员会安排你的后续预约。",
        "note": "安排后续步骤。"
    },
    {
        "id": "medical-95",
        "speaker": "Patient",
        "text": "Thank you so much for your time and thorough evaluation today.",
        "translation": "非常感谢你今天的时间和彻底的评估。",
        "note": "感谢医生服务。"
    },
    {
        "id": "medical-96",
        "speaker": "Doctor",
        "text": "You're very welcome. Taking care of your health is important, and I'm glad you came in.",
        "translation": "不客气。照顾你的健康很重要，我很高兴你来了。",
        "note": "表达关心和肯定。"
    },
    {
        "id": "medical-97",
        "speaker": "Patient",
        "text": "I feel much better having a plan. Sometimes health issues can feel overwhelming.",
        "translation": "有了计划我感觉好多了。有时健康问题会让人感到不知所措。",
        "note": "表达获得计划后的安心。"
    },
    {
        "id": "medical-98",
        "speaker": "Doctor",
        "text": "Having a clear plan does make it more manageable. You're on the right track.",
        "translation": "有清晰的计划确实让它更容易管理。你走在正确的轨道上。",
        "note": "鼓励患者。"
    },
    {
        "id": "medical-99",
        "speaker": "Patient",
        "text": "I'll do my best with the lifestyle changes. See you in four weeks.",
        "translation": "我会在生活方式改变上尽力而为。四周后见。",
        "note": "承诺努力并道别。"
    },
    {
        "id": "medical-100",
        "speaker": "Doctor",
        "text": "I look forward to hearing about your progress. Take care and stay healthy!",
        "translation": "我期待听到你的进展。保重并保持健康！",
        "note": "祝福患者。"
    }
]

# Banking scene - 100 sentences (newly generated)
BANKING_FULL_100 = [
    {
        "id": "banking-1",
        "speaker": "Customer",
        "text": "Hello, I'd like to open a new checking account with your bank.",
        "translation": "您好，我想在你们银行开一个新的支票账户。",
        "note": "用 'checking account' 表示支票账户。"
    },
    {
        "id": "banking-2",
        "speaker": "Banker",
        "text": "Welcome! I'd be happy to help you with that. Do you have any existing accounts with us?",
        "translation": "欢迎！我很乐意帮你处理那个。你在我们这里有任何现有账户吗？",
        "note": "询问现有账户状态。"
    },
    {
        "id": "banking-3",
        "speaker": "Customer",
        "text": "No, this would be my first account with your bank. I recently moved to the area.",
        "translation": "没有，这将是我与你们银行的第一个账户。我最近搬到了这个地区。",
        "note": "说明新客户身份。"
    },
    {
        "id": "banking-4",
        "speaker": "Banker",
        "text": "Great to have you as a new customer! Let me get some basic information to get started.",
        "translation": "很高兴有你作为新客户！让我获取一些基本信息来开始。",
        "note": "欢迎新客户。"
    },
    {
        "id": "banking-5",
        "speaker": "Customer",
        "text": "Sure. What information do you need from me?",
        "translation": "当然。你需要我提供什么信息？",
        "note": "询问所需信息。"
    },
    {
        "id": "banking-6",
        "speaker": "Banker",
        "text": "I'll need your government-issued ID, proof of address, and Social Security number.",
        "translation": "我需要你的政府身份证件、地址证明和社会安全号码。",
        "note": "列出开户所需文件。"
    },
    {
        "id": "banking-7",
        "speaker": "Customer",
        "text": "I have my driver's license and a utility bill with my current address. Is that sufficient?",
        "translation": "我有我的驾照和一张有我当前地址的公用事业账单。这够吗？",
        "note": "确认文件准备情况。"
    },
    {
        "id": "banking-8",
        "speaker": "Banker",
        "text": "That should work perfectly. Let me also get your contact information and employment details.",
        "translation": "那应该完全可行。让我也获取你的联系信息和就业详情。",
        "note": "收集额外信息。"
    },
    {
        "id": "banking-9",
        "speaker": "Customer",
        "text": "I work as a software engineer at Tech Corp. I've been there for three years.",
        "translation": "我在Tech Corp做软件工程师。我在那里工作了三年。",
        "note": "提供就业信息。"
    },
    {
        "id": "banking-10",
        "speaker": "Banker",
        "text": "Excellent. Stable employment is helpful for account approval and credit considerations.",
        "translation": "太好了。稳定的就业有助于账户批准和信用考虑。",
        "note": "用 'stable employment' 表示稳定就业。"
    },
    {
        "id": "banking-11",
        "speaker": "Customer",
        "text": "What type of checking account options do you offer?",
        "translation": "你们提供什么类型的支票账户选择？",
        "note": "询问账户类型。"
    },
    {
        "id": "banking-12",
        "speaker": "Banker",
        "text": "We have three main options: Basic, Premium, and Student accounts with different features.",
        "translation": "我们有三个主要选择：基本、高级和学生账户，各有不同功能。",
        "note": "介绍账户选项。"
    },
    {
        "id": "banking-13",
        "speaker": "Customer",
        "text": "What are the main differences between the Basic and Premium accounts?",
        "translation": "基本账户和高级账户的主要区别是什么？",
        "note": "询问账户差异。"
    },
    {
        "id": "banking-14",
        "speaker": "Banker",
        "text": "Premium accounts have higher interest rates, no monthly fees, and include ATM fee reimbursements.",
        "translation": "高级账户有更高的利率、无月费，并包括ATM费用报销。",
        "note": "用 'ATM fee reimbursements' 表示ATM费用报销。"
    },
    {
        "id": "banking-15",
        "speaker": "Customer",
        "text": "That sounds appealing. What are the requirements for the Premium account?",
        "translation": "那听起来很吸引人。高级账户的要求是什么？",
        "note": "询问账户要求。"
    },
    {
        "id": "banking-16",
        "speaker": "Banker",
        "text": "Minimum daily balance of $1,500 or direct deposit of at least $500 per month.",
        "translation": "最低日余额1500美元或每月至少500美元的直接存款。",
        "note": "用 'minimum daily balance' 表示最低日余额。"
    },
    {
        "id": "banking-17",
        "speaker": "Customer",
        "text": "I can meet the direct deposit requirement. My paycheck is deposited automatically.",
        "translation": "我可以满足直接存款要求。我的工资是自动存入的。",
        "note": "确认符合要求。"
    },
    {
        "id": "banking-18",
        "speaker": "Banker",
        "text": "Perfect. The Premium account would be ideal for you then. Let me show you the benefits.",
        "translation": "完美。那么高级账户对你来说很理想。让我给你看看好处。",
        "note": "推荐合适账户。"
    },
    {
        "id": "banking-19",
        "speaker": "Customer",
        "text": "What interest rate does the Premium account offer?",
        "translation": "高级账户提供什么利率？",
        "note": "询问利率。"
    },
    {
        "id": "banking-20",
        "speaker": "Banker",
        "text": "Currently 0.5% APY on balances up to $10,000, and 0.1% on amounts above that.",
        "translation": "目前10000美元以下余额为0.5%年收益率，超过该金额为0.1%。",
        "note": "用 'APY' 表示年收益率。"
    },
    {
        "id": "banking-21",
        "speaker": "Customer",
        "text": "That's better than my previous bank. Are there any fees I should be aware of?",
        "translation": "那比我之前的银行好。有什么我应该注意的费用吗？",
        "note": "询问费用结构。"
    },
    {
        "id": "banking-22",
        "speaker": "Banker",
        "text": "With Premium accounts, there are no monthly maintenance fees or minimum balance fees.",
        "translation": "对于高级账户，没有月维护费或最低余额费。",
        "note": "说明费用减免。"
    },
    {
        "id": "banking-23",
        "speaker": "Customer",
        "text": "That's great. What about ATM fees? I travel quite a bit for work.",
        "translation": "那太好了。ATM费用呢？我经常因工作出差。",
        "note": "询问ATM费用政策。"
    },
    {
        "id": "banking-24",
        "speaker": "Banker",
        "text": "Premium accounts reimburse up to $25 per month in ATM fees from other banks.",
        "translation": "高级账户每月报销其他银行高达25美元的ATM费用。",
        "note": "说明ATM费用报销政策。"
    },
    {
        "id": "banking-25",
        "speaker": "Customer",
        "text": "That's very useful. What about overdraft protection?",
        "translation": "那非常有用。透支保护呢？",
        "note": "询问透支保护。"
    },
    {
        "id": "banking-26",
        "speaker": "Banker",
        "text": "We offer several options: overdraft protection linked to savings, or a line of credit.",
        "translation": "我们提供几个选择：链接到储蓄的透支保护，或信贷额度。",
        "note": "用 'line of credit' 表示信贷额度。"
    },
    {
        "id": "banking-27",
        "speaker": "Customer",
        "text": "I think linking to a savings account would work best for me.",
        "translation": "我认为链接到储蓄账户最适合我。",
        "note": "选择透支保护方式。"
    },
    {
        "id": "banking-28",
        "speaker": "Banker",
        "text": "That's a popular choice. We can set that up as part of the account opening process.",
        "translation": "那是个受欢迎的选择。我们可以作为开户流程的一部分来设置。",
        "note": "同意设置透支保护。"
    },
    {
        "id": "banking-29",
        "speaker": "Customer",
        "text": "Perfect. What online banking features do you offer?",
        "translation": "完美。你们提供什么网上银行功能？",
        "note": "询问网上银行功能。"
    },
    {
        "id": "banking-30",
        "speaker": "Banker",
        "text": "We have a full-featured mobile app, bill pay, mobile check deposit, and budgeting tools.",
        "translation": "我们有功能齐全的移动应用、账单支付、移动支票存款和预算工具。",
        "note": "列出网上银行功能。"
    },
    {
        "id": "banking-31",
        "speaker": "Customer",
        "text": "Mobile check deposit sounds very convenient. How does that work?",
        "translation": "移动支票存款听起来很方便。那如何运作？",
        "note": "询问移动支票存款。"
    },
    {
        "id": "banking-32",
        "speaker": "Banker",
        "text": "You simply take photos of the front and back of the check with our app, and it processes automatically.",
        "translation": "你只需用我们的应用拍摄支票正面和背面的照片，它会自动处理。",
        "note": "解释移动支票存款流程。"
    },
    {
        "id": "banking-33",
        "speaker": "Customer",
        "text": "That's much easier than going to a branch. What about security features?",
        "translation": "那比去分行容易多了。安全功能呢？",
        "note": "询问安全功能。"
    },
    {
        "id": "banking-34",
        "speaker": "Banker",
        "text": "We use two-factor authentication, fingerprint login, and real-time fraud monitoring.",
        "translation": "我们使用双因素认证、指纹登录和实时欺诈监控。",
        "note": "列出安全功能。"
    },
    {
        "id": "banking-35",
        "speaker": "Customer",
        "text": "That gives me peace of mind. Are there any alerts I can set up?",
        "translation": "那让我安心。我可以设置任何警报吗？",
        "note": "询问警报功能。"
    },
    {
        "id": "banking-36",
        "speaker": "Banker",
        "text": "Yes, you can set up balance alerts, transaction notifications, and unusual activity warnings.",
        "translation": "是的，你可以设置余额警报、交易通知和异常活动警告。",
        "note": "列出警报类型。"
    },
    {
        "id": "banking-37",
        "speaker": "Customer",
        "text": "I'll definitely set those up. What about international services?",
        "translation": "我一定会设置那些。国际服务呢？",
        "note": "询问国际服务。"
    },
    {
        "id": "banking-38",
        "speaker": "Banker",
        "text": "We offer competitive foreign exchange rates, international wire transfers, and no foreign transaction fees.",
        "translation": "我们提供有竞争力的外汇汇率、国际电汇和无国外交易费。",
        "note": "用 'foreign exchange rates' 表示外汇汇率。"
    },
    {
        "id": "banking-39",
        "speaker": "Customer",
        "text": "That's excellent since I travel internationally. Do you have partnerships with other banks?",
        "translation": "那太好了，因为我国际旅行。你们与其他银行有合作伙伴关系吗？",
        "note": "询问银行合作伙伴关系。"
    },
    {
        "id": "banking-40",
        "speaker": "Banker",
        "text": "Yes, we're part of a global ATM network, so you can access fee-free ATMs worldwide.",
        "translation": "是的，我们是全球ATM网络的一部分，所以你可以在全球免费使用ATM。",
        "note": "用 'global ATM network' 表示全球ATM网络。"
    },
    {
        "id": "banking-41",
        "speaker": "Customer",
        "text": "That's very helpful. What about savings accounts? Do you have good rates?",
        "translation": "那很有帮助。储蓄账户呢？你们有好的利率吗？",
        "note": "询问储蓄账户利率。"
    },
    {
        "id": "banking-42",
        "speaker": "Banker",
        "text": "Our high-yield savings account currently offers 1.2% APY with no minimum balance requirement.",
        "translation": "我们的高收益储蓄账户目前提供1.2%年收益率，无最低余额要求。",
        "note": "用 'high-yield savings account' 表示高收益储蓄账户。"
    },
    {
        "id": "banking-43",
        "speaker": "Customer",
        "text": "That's better than most banks. Are there any restrictions on withdrawals?",
        "translation": "那比大多数银行都好。对取款有什么限制吗？",
        "note": "询问取款限制。"
    },
    {
        "id": "banking-44",
        "speaker": "Banker",
        "text": "Federal regulations limit savings accounts to six withdrawals per month, but that's standard.",
        "translation": "联邦法规限制储蓄账户每月六次取款，但这是标准的。",
        "note": "说明取款限制。"
    },
    {
        "id": "banking-45",
        "speaker": "Customer",
        "text": "I understand. What about certificates of deposit? Do you have competitive rates?",
        "translation": "我理解。定期存单呢？你们有竞争力的利率吗？",
        "note": "询问定期存单利率。"
    },
    {
        "id": "banking-46",
        "speaker": "Banker",
        "text": "Yes, our CD rates are very competitive, ranging from 1.5% to 2.5% depending on term length.",
        "translation": "是的，我们的CD利率非常有竞争力，根据期限长短从1.5%到2.5%不等。",
        "note": "用 'term length' 表示期限长短。"
    },
    {
        "id": "banking-47",
        "speaker": "Customer",
        "text": "What term lengths do you offer?",
        "translation": "你们提供什么期限长度？",
        "note": "询问定期存单期限。"
    },
    {
        "id": "banking-48",
        "speaker": "Banker",
        "text": "We offer terms from 3 months to 5 years. Longer terms generally have higher rates.",
        "translation": "我们提供从3个月到5年的期限。更长的期限通常有更高的利率。",
        "note": "说明期限范围。"
    },
    {
        "id": "banking-49",
        "speaker": "Customer",
        "text": "I might consider a 1-year CD for some of my savings. What's the minimum deposit?",
        "translation": "我可能会考虑用部分储蓄存1年期CD。最低存款是多少？",
        "note": "询问最低存款要求。"
    },
    {
        "id": "banking-50",
        "speaker": "Banker",
        "text": "Minimum deposit is $500 for all our CDs. You can also set up automatic CD laddering.",
        "translation": "所有CD的最低存款是500美元。你也可以设置自动CD阶梯。",
        "note": "用 'CD laddering' 表示CD阶梯策略。"
    },
    {
        "id": "banking-51",
        "speaker": "Customer",
        "text": "What is CD laddering? I'm not familiar with that term.",
        "translation": "什么是CD阶梯？我不熟悉这个术语。",
        "note": "询问CD阶梯概念。"
    },
    {
        "id": "banking-52",
        "speaker": "Banker",
        "text": "It's a strategy where you invest in CDs with different maturity dates for better liquidity and rates.",
        "translation": "这是一种策略，你投资于不同到期日的CD，以获得更好的流动性和利率。",
        "note": "解释CD阶梯策略。"
    },
    {
        "id": "banking-53",
        "speaker": "Customer",
        "text": "That sounds smart. I'd like to learn more about that after opening my checking account.",
        "translation": "那听起来很聪明。我想在开完支票账户后了解更多关于那个的信息。",
        "note": "表示兴趣。"
    },
    {
        "id": "banking-54",
        "speaker": "Banker",
        "text": "Absolutely. We can discuss investment options as well. Do you have any investment goals?",
        "translation": "当然。我们也可以讨论投资选择。你有任何投资目标吗？",
        "note": "询问投资目标。"
    },
    {
        "id": "banking-55",
        "speaker": "Customer",
        "text": "I'm mostly focused on building an emergency fund right now, but I'm interested in long-term growth.",
        "translation": "我现在主要专注于建立应急基金，但我对长期增长感兴趣。",
        "note": "说明投资重点。"
    },
    {
        "id": "banking-56",
        "speaker": "Banker",
        "text": "That's a sensible approach. We have financial advisors who can help create a personalized investment plan.",
        "translation": "那是个明智的方法。我们有财务顾问可以帮助创建个性化的投资计划。",
        "note": "推荐财务顾问服务。"
    },
    {
        "id": "banking-57",
        "speaker": "Customer",
        "text": "That might be helpful later. For now, let's focus on getting the checking account set up.",
        "translation": "那以后可能有帮助。现在，让我们专注于设置支票账户。",
        "note": "表示当前重点。"
    },
    {
        "id": "banking-58",
        "speaker": "Banker",
        "text": "Perfect. Let me process your application. Would you like a debit card with your account?",
        "translation": "完美。让我处理你的申请。你想要账户附带借记卡吗？",
        "note": "询问借记卡需求。"
    },
    {
        "id": "banking-59",
        "speaker": "Customer",
        "text": "Yes, definitely. Can I choose the card design?",
        "translation": "是的，当然。我可以选择卡面设计吗？",
        "note": "询问卡面设计选择。"
    },
    {
        "id": "banking-60",
        "speaker": "Banker",
        "text": "We have several design options, or you can upload a custom photo for a small fee.",
        "translation": "我们有几个设计选择，或者你可以上传自定义照片，费用很少。",
        "note": "说明卡面设计选项。"
    },
    {
        "id": "banking-61",
        "speaker": "Customer",
        "text": "I'll choose one of your standard designs for now. When will I receive the card?",
        "translation": "我现在会选择你们的标准设计之一。我什么时候会收到卡？",
        "note": "询问卡递送时间。"
    },
    {
        "id": "banking-62",
        "speaker": "Banker",
        "text": "You'll receive it within 7-10 business days. I can also give you a temporary card today.",
        "translation": "你会在7-10个工作日内收到。我今天也可以给你一张临时卡。",
        "note": "用 'temporary card' 表示临时卡。"
    },
    {
        "id": "banking-63",
        "speaker": "Customer",
        "text": "A temporary card would be great so I can start using the account right away.",
        "translation": "临时卡会很棒，这样我可以立即开始使用账户。",
        "note": "接受临时卡。"
    },
    {
        "id": "banking-64",
        "speaker": "Banker",
        "text": "Excellent. The temporary card will be ready in a few minutes. Do you have any other questions?",
        "translation": "太好了。临时卡几分钟内就准备好。你还有其他问题吗？",
        "note": "询问其他问题。"
    },
    {
        "id": "banking-65",
        "speaker": "Customer",
        "text": "What about checks? Do you provide a starter checkbook?",
        "translation": "支票呢？你们提供初学者支票簿吗？",
        "note": "询问支票簿。"
    },
    {
        "id": "banking-66",
        "speaker": "Banker",
        "text": "Yes, we provide a complimentary starter checkbook with 25 checks. Additional checks can be ordered.",
        "translation": "是的，我们提供免费的初学者支票簿，有25张支票。可以订购额外支票。",
        "note": "用 'complimentary' 表示免费的。"
    },
    {
        "id": "banking-67",
        "speaker": "Customer",
        "text": "Perfect. How do I access online banking once the account is open?",
        "translation": "完美。账户开后我如何访问网上银行？",
        "note": "询问网上银行访问。"
    },
    {
        "id": "banking-68",
        "speaker": "Banker",
        "text": "You'll receive login credentials via email within 24 hours. The app can be downloaded immediately.",
        "translation": "你会在24小时内通过电子邮件收到登录凭据。应用可以立即下载。",
        "note": "说明登录流程。"
    },
    {
        "id": "banking-69",
        "speaker": "Customer",
        "text": "Great. Is there a branch locator in the app?",
        "translation": "太好了。应用中有分行定位器吗？",
        "note": "询问分行定位功能。"
    },
    {
        "id": "banking-70",
        "speaker": "Banker",
        "text": "Yes, and it shows branch hours, services available, and can even schedule appointments.",
        "translation": "是的，它显示分行营业时间、可用服务，甚至可以预约。",
        "note": "说明分行定位功能。"
    },
    {
        "id": "banking-71",
        "speaker": "Customer",
        "text": "That's very convenient. What about customer service? How can I reach you if I have issues?",
        "translation": "那很方便。客户服务呢？如果我有问题如何联系你们？",
        "note": "询问客户服务渠道。"
    },
    {
        "id": "banking-72",
        "speaker": "Banker",
        "text": "We have 24/7 phone support, live chat in the app, and email support with quick response times.",
        "translation": "我们有24/7电话支持、应用内实时聊天和电子邮件支持，响应时间快。",
        "note": "列出客户服务渠道。"
    },
    {
        "id": "banking-73",
        "speaker": "Customer",
        "text": "That's reassuring. What about credit cards? Do you offer those as well?",
        "translation": "那让人安心。信用卡呢？你们也提供那些吗？",
        "note": "询问信用卡服务。"
    },
    {
        "id": "banking-74",
        "speaker": "Banker",
        "text": "Yes, we have several credit card options with different rewards programs and interest rates.",
        "translation": "是的，我们有几个信用卡选择，有不同的奖励计划和利率。",
        "note": "介绍信用卡选择。"
    },
    {
        "id": "banking-75",
        "speaker": "Customer",
        "text": "I might be interested in a rewards card. What types of rewards do you offer?",
        "translation": "我可能对奖励卡感兴趣。你们提供什么类型的奖励？",
        "note": "询问奖励类型。"
    },
    {
        "id": "banking-76",
        "speaker": "Banker",
        "text": "We have cash back, travel points, and merchandise rewards. You can choose based on your spending habits.",
        "translation": "我们有现金返还、旅行积分和商品奖励。你可以根据消费习惯选择。",
        "note": "列出奖励类型。"
    },
    {
        "id": "banking-77",
        "speaker": "Customer",
        "text": "Cash back sounds appealing. What percentage do you offer?",
        "translation": "现金返还听起来很吸引人。你们提供什么百分比？",
        "note": "询问现金返还比例。"
    },
    {
        "id": "banking-78",
        "speaker": "Banker",
        "text": "Our cash back card offers 1.5% on all purchases, with 3% on categories you select each quarter.",
        "translation": "我们的现金返还卡对所有购买提供1.5%，对你每季度选择的类别提供3%。",
        "note": "说明现金返还结构。"
    },
    {
        "id": "banking-79",
        "speaker": "Customer",
        "text": "That's competitive. Are there any annual fees?",
        "translation": "那有竞争力。有年费吗？",
        "note": "询问年费。"
    },
    {
        "id": "banking-80",
        "speaker": "Banker",
        "text": "No annual fee for our cash back card. We also have a premium travel card with a $95 annual fee.",
        "translation": "我们的现金返还卡没有年费。我们还有一张年费95美元的高级旅行卡。",
        "note": "说明年费结构。"
    },
    {
        "id": "banking-81",
        "speaker": "Customer",
        "text": "I'll probably start with the no-fee option. Can I apply for that today as well?",
        "translation": "我可能会从无费选项开始。我今天也可以申请那个吗？",
        "note": "询问同时申请信用卡。"
    },
    {
        "id": "banking-82",
        "speaker": "Banker",
        "text": "Yes, we can process a credit card application along with your account opening. Same credit check.",
        "translation": "是的，我们可以连同开户一起处理信用卡申请。同样的信用检查。",
        "note": "说明合并申请流程。"
    },
    {
        "id": "banking-83",
        "speaker": "Customer",
        "text": "That would be convenient. What credit score range do I typically need for approval?",
        "translation": "那会很方便。我通常需要什么信用评分范围才能获得批准？",
        "note": "询问信用评分要求。"
    },
    {
        "id": "banking-84",
        "speaker": "Banker",
        "text": "Generally 680+ for our premium cards, but the cash back card is available from 650+.",
        "translation": "通常680+用于高级卡，但现金返还卡从650+起可用。",
        "note": "说明信用评分要求。"
    },
    {
        "id": "banking-85",
        "speaker": "Customer",
        "text": "I believe my score is around 720, so I should qualify for either option.",
        "translation": "我相信我的分数在720左右，所以我应该有资格获得任一选择。",
        "note": "估计信用评分。"
    },
    {
        "id": "banking-86",
        "speaker": "Banker",
        "text": "That should put you in good standing. Let me add the credit card application to your file.",
        "translation": "那应该让你处于良好状态。让我把信用卡申请添加到你的档案中。",
        "note": "添加信用卡申请。"
    },
    {
        "id": "banking-87",
        "speaker": "Customer",
        "text": "Perfect. What about loans? Do you offer personal loans or auto loans?",
        "translation": "完美。贷款呢？你们提供个人贷款或汽车贷款吗？",
        "note": "询问贷款服务。"
    },
    {
        "id": "banking-88",
        "speaker": "Banker",
        "text": "Yes, we offer both personal and auto loans with competitive rates. We also have mortgage services.",
        "translation": "是的，我们提供个人和汽车贷款，利率有竞争力。我们还有抵押贷款服务。",
        "note": "介绍贷款服务。"
    },
    {
        "id": "banking-89",
        "speaker": "Customer",
        "text": "I might need a car loan in the next few months. What are your current auto loan rates?",
        "translation": "我可能在未来几个月需要汽车贷款。你们目前的汽车贷款利率是多少？",
        "note": "询问汽车贷款利率。"
    },
    {
        "id": "banking-90",
        "speaker": "Banker",
        "text": "Current rates start at 3.5% for new cars and 4.2% for used cars, depending on credit profile.",
        "translation": "目前利率新车从3.5%开始，二手车从4.2%开始，取决于信用状况。",
        "note": "说明汽车贷款利率。"
    },
    {
        "id": "banking-91",
        "speaker": "Customer",
        "text": "Those are good rates. Can I get pre-approved for a car loan?",
        "translation": "那些利率很好。我可以获得汽车贷款预批准吗？",
        "note": "询问预批准。"
    },
    {
        "id": "banking-92",
        "speaker": "Banker",
        "text": "Absolutely. Pre-approval gives you bargaining power at the dealership and locks in your rate.",
        "translation": "当然。预批准给你在经销商处的议价能力，并锁定你的利率。",
        "note": "用 'bargaining power' 表示议价能力。"
    },
    {
        "id": "banking-93",
        "speaker": "Customer",
        "text": "That's good to know. I'll definitely consider that when I'm ready to buy.",
        "translation": "那很好知道。当我准备购买时我一定会考虑那个。",
        "note": "表示兴趣。"
    },
    {
        "id": "banking-94",
        "speaker": "Banker",
        "text": "I can make a note in your file and send you information when you're ready to explore options.",
        "translation": "我可以在你的档案中做记录，当你准备探索选择时发送信息给你。",
        "note": "提供后续服务。"
    },
    {
        "id": "banking-95",
        "speaker": "Customer",
        "text": "That would be helpful. I think we've covered everything I need for today.",
        "translation": "那会有帮助。我想我们已经涵盖了我今天需要的一切。",
        "note": "表示完成讨论。"
    },
    {
        "id": "banking-96",
        "speaker": "Banker",
        "text": "Excellent. Let me print out the account opening documents for you to review and sign.",
        "translation": "太好了。让我打印出开户文件供你审阅和签署。",
        "note": "准备开户文件。"
    },
    {
        "id": "banking-97",
        "speaker": "Customer",
        "text": "Thank you. How long will the account opening process take?",
        "translation": "谢谢。开户流程需要多长时间？",
        "note": "询问开户时间。"
    },
    {
        "id": "banking-98",
        "speaker": "Banker",
        "text": "Once you sign the documents, the account will be active immediately. Your card will arrive in 7-10 days.",
        "translation": "一旦你签署文件，账户将立即激活。你的卡将在7-10天内到达。",
        "note": "说明激活时间。"
    },
    {
        "id": "banking-99",
        "speaker": "Customer",
        "text": "Perfect. Thank you for all your help today. You've been very thorough.",
        "translation": "完美。谢谢你今天所有的帮助。你非常彻底。",
        "note": "感谢银行家服务。"
    },
    {
        "id": "banking-100",
        "speaker": "Banker",
        "text": "You're very welcome! We're excited to have you as a customer. Is there anything else I can help with?",
        "translation": "不客气！我们很高兴有你作为客户。还有什么其他我可以帮助的吗？",
        "note": "礼貌结束服务。"
    }
]

# Shopping scene - 100 sentences (newly generated)
SHOPPING_FULL_100 = [
    {
        "id": "shopping-1",
        "speaker": "Shopper",
        "text": "Excuse me, I'm looking for a dress for a wedding next weekend.",
        "translation": "打扰一下，我在找一套下周末婚礼穿的连衣裙。",
        "note": "用 'looking for' 表示寻找。"
    },
    {
        "id": "shopping-2",
        "speaker": "Clerk",
        "text": "Congratulations on the wedding! What style of dress are you looking for?",
        "translation": "恭喜婚礼！你在找什么风格的连衣裙？",
        "note": "询问服装风格偏好。"
    },
    {
        "id": "shopping-3",
        "speaker": "Shopper",
        "text": "Something elegant but not too formal. The wedding is outdoors in a garden.",
        "translation": "优雅但不要太正式的东西。婚礼是在户外花园举行。",
        "note": "描述场合和风格要求。"
    },
    {
        "id": "shopping-4",
        "speaker": "Clerk",
        "text": "That sounds lovely. We have some beautiful floral prints and pastel colors that would be perfect.",
        "translation": "那听起来很可爱。我们有一些漂亮的花卉印花和柔和色彩会很完美。",
        "note": "推荐适合的服装风格。"
    },
    {
        "id": "shopping-5",
        "speaker": "Shopper",
        "text": "Floral prints sound great. What sizes do you have available?",
        "translation": "花卉印花听起来很棒。你们有什么尺码可用？",
        "note": "询问尺码可用性。"
    },
    {
        "id": "shopping-6",
        "speaker": "Clerk",
        "text": "We carry sizes from XS to XL. What size do you typically wear?",
        "translation": "我们提供从XS到XL的尺码。你通常穿什么尺码？",
        "note": "询问常规尺码。"
    },
    {
        "id": "shopping-7",
        "speaker": "Shopper",
        "text": "I'm usually a medium, but sometimes I need a large depending on the cut.",
        "translation": "我通常是中码，但有时根据剪裁我需要大码。",
        "note": "说明尺码变化。"
    },
    {
        "id": "shopping-8",
        "speaker": "Clerk",
        "text": "Our sizing runs true to size, but I'd recommend trying both to be sure.",
        "translation": "我们的尺码是标准的，但我建议两个都试穿以确保。",
        "note": "用 'true to size' 表示尺码标准。"
    },
    {
        "id": "shopping-9",
        "speaker": "Shopper",
        "text": "That's a good idea. Do you have a fitting room available?",
        "translation": "那是个好主意。你们有试衣间可用吗？",
        "note": "询问试衣间。"
    },
    {
        "id": "shopping-10",
        "speaker": "Clerk",
        "text": "Yes, right this way. Let me show you some options in your size first.",
        "translation": "是的，这边请。让我先给你看一些你尺码的选择。",
        "note": "引导试衣流程。"
    },
    {
        "id": "shopping-11",
        "speaker": "Shopper",
        "text": "Thank you. These dresses are beautiful. What material are they made of?",
        "translation": "谢谢。这些连衣裙很漂亮。它们是用什么材料做的？",
        "note": "询问材料。"
    },
    {
        "id": "shopping-12",
        "speaker": "Clerk",
        "text": "This one is 100% cotton, very breathable for outdoor events. The others are silk blends.",
        "translation": "这件是100%棉，对户外活动来说非常透气。其他的都是丝绸混纺。",
        "note": "说明材料特性。"
    },
    {
        "id": "shopping-13",
        "speaker": "Shopper",
        "text": "The cotton sounds perfect for an outdoor wedding. Let me try this one first.",
        "translation": "棉听起来对户外婚礼很完美。让我先试穿这件。",
        "note": "选择试穿。"
    },
    {
        "id": "shopping-14",
        "speaker": "Clerk",
        "text": "Excellent choice. The fitting room is just behind that curtain. Let me know if you need anything.",
        "translation": "极好的选择。试衣间就在那帘子后面。如果你需要什么请告诉我。",
        "note": "指引试衣间位置。"
    },
    {
        "id": "shopping-15",
        "speaker": "Shopper",
        "text": "Thank you. I'll be right back.",
        "translation": "谢谢。我马上回来。",
        "note": "表示快速返回。"
    },
    {
        "id": "shopping-16",
        "speaker": "Shopper",
        "text": "This fits perfectly! The length is just right for a garden wedding.",
        "translation": "这件完全合身！长度对花园婚礼来说正好。",
        "note": "表达试穿满意。"
    },
    {
        "id": "shopping-17",
        "speaker": "Clerk",
        "text": "It looks wonderful on you. The color really complements your complexion.",
        "translation": "你穿起来很棒。这个颜色真的很衬托你的肤色。",
        "note": "用 'complements your complexion' 表示衬托肤色。"
    },
    {
        "id": "shopping-18",
        "speaker": "Shopper",
        "text": "Do you think I need any accessories to complete the look?",
        "translation": "你认为我需要任何配饰来完成这个造型吗？",
        "note": "询问配饰建议。"
    },
    {
        "id": "shopping-19",
        "speaker": "Clerk",
        "text": "A simple necklace or earrings would be lovely. We have some great options over here.",
        "translation": "简单的项链或耳环会很可爱。我们这里有一些很棒的选择。",
        "note": "推荐配饰。"
    },
    {
        "id": "shopping-20",
        "speaker": "Shopper",
        "text": "Let me look at those. I'm looking for something subtle, not too flashy.",
        "translation": "让我看看那些。我在找一些微妙的东西，不要太张扬。",
        "note": "说明配饰风格偏好。"
    },
    {
        "id": "shopping-21",
        "speaker": "Clerk",
        "text": "These pearl earrings would be perfect - elegant and understated.",
        "translation": "这些珍珠耳环会很完美——优雅而低调。",
        "note": "推荐珍珠耳环。"
    },
    {
        "id": "shopping-22",
        "speaker": "Shopper",
        "text": "They're beautiful. How much are they?",
        "translation": "它们很漂亮。多少钱？",
        "note": "询问价格。"
    },
    {
        "id": "shopping-23",
        "speaker": "Clerk",
        "text": "They're $45, and we have a matching necklace for $35 if you're interested.",
        "translation": "它们45美元，如果你感兴趣，我们有配套的项链35美元。",
        "note": "提供配套选项和价格。"
    },
    {
        "id": "shopping-24",
        "speaker": "Shopper",
        "text": "Let me think about the accessories. First, how much is the dress?",
        "translation": "让我考虑一下配饰。首先，连衣裙多少钱？",
        "note": "询问连衣裙价格。"
    },
    {
        "id": "shopping-25",
        "speaker": "Clerk",
        "text": "The dress is $89. It's on sale this week, normally $120.",
        "translation": "连衣裙89美元。这周在打折，通常120美元。",
        "note": "说明原价和折扣价。"
    },
    {
        "id": "shopping-26",
        "speaker": "Shopper",
        "text": "That's a good deal. Are there any other promotions or discounts available?",
        "translation": "那是个好交易。还有其他促销或折扣可用吗？",
        "note": "询问其他折扣。"
    },
    {
        "id": "shopping-27",
        "speaker": "Clerk",
        "text": "If you sign up for our store credit card, you get an additional 15% off your first purchase.",
        "translation": "如果你申请我们的商店信用卡，你的首次购买可额外享受15%折扣。",
        "note": "推荐信用卡折扣。"
    },
    {
        "id": "shopping-28",
        "speaker": "Shopper",
        "text": "I'm not sure I want another credit card. Are there any other ways to save?",
        "translation": "我不确定我想要另一张信用卡。还有其他省钱的方式吗？",
        "note": "婉拒信用卡，询问其他折扣。"
    },
    {
        "id": "shopping-29",
        "speaker": "Clerk",
        "text": "We also have a loyalty program. For every $100 you spend, you get $10 back.",
        "translation": "我们也有忠诚度计划。每消费100美元，你获得10美元返还。",
        "note": "推荐忠诚度计划。"
    },
    {
        "id": "shopping-30",
        "speaker": "Shopper",
        "text": "That sounds worth it. How do I sign up for the loyalty program?",
        "translation": "那听起来值得。我如何注册忠诚度计划？",
        "note": "询问注册方式。"
    },
    {
        "id": "shopping-31",
        "speaker": "Clerk",
        "text": "I can sign you up right now at the register. It's free and only takes a moment.",
        "translation": "我现在可以在收银台为你注册。它是免费的，只需要一瞬间。",
        "note": "说明注册流程。"
    },
    {
        "id": "shopping-32",
        "speaker": "Shopper",
        "text": "Perfect. I'll take the dress and the earrings then.",
        "translation": "完美。那么我要连衣裙和耳环。",
        "note": "决定购买。"
    },
    {
        "id": "shopping-33",
        "speaker": "Clerk",
        "text": "Excellent choice. Would you like me to hold these at the counter while you continue shopping?",
        "translation": "极好的选择。你想让我在柜台拿着这些，而你继续购物吗？",
        "note": "提供暂存服务。"
    },
    {
        "id": "shopping-34",
        "speaker": "Shopper",
        "text": "That would be great. I might look for some shoes to match as well.",
        "translation": "那会很棒。我可能也要找一些配套的鞋子。",
        "note": "计划继续购物。"
    },
    {
        "id": "shopping-35",
        "speaker": "Clerk",
        "text": "Our shoe section is just across the aisle. We have some lovely sandals that would complement the dress.",
        "translation": "我们的鞋区就在过道对面。我们有一些可爱的凉鞋会与连衣裙搭配。",
        "note": "指引鞋区位置。"
    },
    {
        "id": "shopping-36",
        "speaker": "Shopper",
        "text": "Thank you. I'll take a look. What shoe size do you recommend for this type of dress?",
        "translation": "谢谢。我会看看。你推荐这种类型的连衣裙穿什么鞋码？",
        "note": "询问鞋码建议。"
    },
    {
        "id": "shopping-37",
        "speaker": "Clerk",
        "text": "For a garden wedding, comfortable flats or low heels would be ideal since you'll be on grass.",
        "translation": "对于花园婚礼，舒适的平底鞋或低跟鞋会很理想，因为你会在草地上。",
        "note": "推荐适合场合的鞋子。"
    },
    {
        "id": "shopping-38",
        "speaker": "Shopper",
        "text": "That's practical advice. Let me see what you have in flats.",
        "translation": "那是实用的建议。让我看看你们有什么平底鞋。",
        "note": "接受建议。"
    },
    {
        "id": "shopping-39",
        "speaker": "Clerk",
        "text": "These leather flats are very comfortable and come in several colors. What size do you need?",
        "translation": "这些皮革平底鞋非常舒适，有几种颜色。你需要什么尺码？",
        "note": "推荐平底鞋并询问尺码。"
    },
    {
        "id": "shopping-40",
        "speaker": "Shopper",
        "text": "I'm a size 8. Do you have this in a neutral color that would match the dress?",
        "translation": "我是8码。你有中和色的能与连衣裙搭配的吗？",
        "note": "询问颜色搭配。"
    },
    {
        "id": "shopping-41",
        "speaker": "Clerk",
        "text": "Yes, we have it in nude and light beige. Both would work beautifully with your dress.",
        "translation": "是的，我们有裸色和浅米色。两者都与你的连衣裙搭配得很美。",
        "note": "提供颜色选择。"
    },
    {
        "id": "shopping-42",
        "speaker": "Shopper",
        "text": "Let me try the beige ones. How much are they?",
        "translation": "让我试试米色的。多少钱？",
        "note": "询问价格。"
    },
    {
        "id": "shopping-43",
        "speaker": "Clerk",
        "text": "They're $65, and they're currently buy one get one 50% off.",
        "translation": "它们65美元，目前是买一送半价。",
        "note": "说明促销活动。"
    },
    {
        "id": "shopping-44",
        "speaker": "Shopper",
        "text": "That's tempting, but I really only need one pair right now.",
        "translation": "那很诱人，但我现在真的只需要一双。",
        "note": "婉拒促销。"
    },
    {
        "id": "shopping-45",
        "speaker": "Clerk",
        "text": "Completely understandable. The beige will be perfect for your dress.",
        "translation": "完全可以理解。米色对你的连衣裙来说很完美。",
        "note": "认可决定。"
    },
    {
        "id": "shopping-46",
        "speaker": "Shopper",
        "text": "I'll take them. So that's the dress, earrings, and shoes.",
        "translation": "我要它们。所以是连衣裙、耳环和鞋子。",
        "note": "确认购买清单。"
    },
    {
        "id": "shopping-47",
        "speaker": "Clerk",
        "text": "Perfect. Let me take you to the register to complete your purchase.",
        "translation": "完美。让我带你去收银台完成你的购买。",
        "note": "引导到收银台。"
    },
    {
        "id": "shopping-48",
        "speaker": "Shopper",
        "text": "Do you offer gift wrapping? This is actually a gift for my sister.",
        "translation": "你们提供礼品包装吗？这实际上是给我姐姐的礼物。",
        "note": "询问礼品包装服务。"
    },
    {
        "id": "shopping-49",
        "speaker": "Clerk",
        "text": "Yes, we offer complimentary gift wrapping. Would you like a specific color or style?",
        "translation": "是的，我们提供免费礼品包装。你想要特定的颜色或风格吗？",
        "note": "用 'complimentary' 表示免费的。"
    },
    {
        "id": "shopping-50",
        "speaker": "Shopper",
        "text": "Something elegant would be nice. Maybe silver or gold wrapping paper?",
        "translation": "优雅的东西会很好。也许是银色或金色的包装纸？",
        "note": "偏好包装风格。"
    },
    {
        "id": "shopping-51",
        "speaker": "Clerk",
        "text": "I think silver would look beautiful with the dress. I can add a ribbon as well.",
        "translation": "我认为银色与连衣裙搭配起来会很美。我也可以加丝带。",
        "note": "推荐包装风格。"
    },
    {
        "id": "shopping-52",
        "speaker": "Shopper",
        "text": "That sounds perfect. What payment methods do you accept?",
        "translation": "那听起来完美。你们接受什么付款方式？",
        "note": "询问付款方式。"
    },
    {
        "id": "shopping-53",
        "speaker": "Clerk",
        "text": "We accept all major credit cards, debit cards, cash, and mobile payments like Apple Pay.",
        "translation": "我们接受所有主要信用卡、借记卡、现金和移动支付如Apple Pay。",
        "note": "列出付款方式。"
    },
    {
        "id": "shopping-54",
        "speaker": "Shopper",
        "text": "I'll use my credit card. Do you need to see my ID?",
        "translation": "我会用我的信用卡。你需要看我的身份证吗？",
        "note": "询问身份证要求。"
    },
    {
        "id": "shopping-55",
        "speaker": "Clerk",
        "text": "Yes, for credit card purchases over $50, we do need to see a valid ID.",
        "translation": "是的，对于超过50美元的信用卡购买，我们需要看有效身份证。",
        "note": "说明身份证政策。"
    },
    {
        "id": "shopping-56",
        "speaker": "Shopper",
        "text": "No problem. Here's my driver's license.",
        "translation": "没问题。这是我的驾照。",
        "note": "提供身份证。"
    },
    {
        "id": "shopping-57",
        "speaker": "Clerk",
        "text": "Thank you. Let me process your purchase and sign you up for the loyalty program.",
        "translation": "谢谢。让我处理你的购买并为你注册忠诚度计划。",
        "note": "开始处理购买。"
    },
    {
        "id": "shopping-58",
        "speaker": "Shopper",
        "text": "What's your return policy in case my sister doesn't like the items?",
        "translation": "如果我的姐姐不喜欢这些物品，你们的退货政策是什么？",
        "note": "询问退货政策。"
    },
    {
        "id": "shopping-59",
        "speaker": "Clerk",
        "text": "We offer 30-day returns with original receipt. Items must be unworn with tags attached.",
        "translation": "我们提供30天退货，需原始收据。物品必须未穿且带有标签。",
        "note": "说明退货条件。"
    },
    {
        "id": "shopping-60",
        "speaker": "Shopper",
        "text": "That's reasonable. Can she return items to any store location, or just this one?",
        "translation": "那很合理。她可以在任何商店位置退货，还是只能在这家？",
        "note": "询问退货地点。"
    },
    {
        "id": "shopping-61",
        "speaker": "Clerk",
        "text": "She can return to any of our store locations nationwide. The receipt will have all the details.",
        "translation": "她可以在我们全国任何商店位置退货。收据会有所有细节。",
        "note": "说明退货地点灵活性。"
    },
    {
        "id": "shopping-62",
        "speaker": "Shopper",
        "text": "That's very convenient. What about exchanges? Can she exchange for a different size?",
        "translation": "那很方便。换货呢？她可以换不同尺码吗？",
        "note": "询问换货政策。"
    },
    {
        "id": "shopping-63",
        "speaker": "Clerk",
        "text": "Yes, exchanges are welcome within the 30-day window, subject to availability.",
        "note": "是的，30天期内欢迎换货，视库存情况而定。",
        "note": "说明换货条件。"
    },
    {
        "id": "shopping-64",
        "speaker": "Shopper",
        "text": "Perfect. I think she'll love these items. They're exactly what she was looking for.",
        "translation": "完美。我想她会喜欢这些物品。这正是她要找的。",
        "note": "表达对礼物的信心。"
    },
    {
        "id": "shopping-65",
        "speaker": "Clerk",
        "text": "That's wonderful to hear. We've had great feedback on this dress style.",
        "translation": "很高兴听到那个。我们对这种连衣裙风格收到了很好的反馈。",
        "note": "分享产品反馈。"
    },
    {
        "id": "shopping-66",
        "speaker": "Shopper",
        "text": "I'm not surprised. The quality seems excellent. What are the care instructions?",
        "translation": "我不惊讶。质量似乎很优秀。护理说明是什么？",
        "note": "询问护理说明。"
    },
    {
        "id": "shopping-67",
        "speaker": "Clerk",
        "text": "The dress is machine washable in cold water, but we recommend hand washing for longevity.",
        "translation": "连衣裙可以用冷水机洗，但我们建议手洗以延长寿命。",
        "note": "提供洗涤建议。"
    },
    {
        "id": "shopping-68",
        "speaker": "Shopper",
        "text": "I'll pass that along. What about the shoes? Are they water-resistant?",
        "translation": "我会传达那个。鞋子呢？它们防水吗？",
        "note": "询问鞋子特性。"
    },
    {
        "id": "shopping-69",
        "speaker": "Clerk",
        "text": "They're not fully waterproof, but they can handle light rain. We recommend a protector spray.",
        "translation": "它们不完全防水，但可以应付小雨。我们推荐保护喷雾。",
        "note": "说明鞋子防护。"
    },
    {
        "id": "shopping-70",
        "speaker": "Shopper",
        "text": "Do you sell that protector spray here?",
        "translation": "你们这里卖那个保护喷雾吗？",
        "note": "询问相关产品。"
    },
    {
        "id": "shopping-71",
        "speaker": "Clerk",
        "text": "Yes, we have a leather protector spray for $12. Would you like to add that?",
        "translation": "是的，我们有皮革保护喷雾12美元。你想加那个吗？",
        "note": "推荐附加产品。"
    },
    {
        "id": "shopping-72",
        "speaker": "Shopper",
        "text": "I think that's a good idea. I'll add it to the purchase.",
        "translation": "我认为那是个好主意。我会把它加到购买中。",
        "note": "接受附加产品。"
    },
    {
        "id": "shopping-73",
        "speaker": "Clerk",
        "text": "Great. Your total comes to $211. Would you like to round up for charity?",
        "translation": "太好了。你的总计是211美元。你想为慈善四舍五入吗？",
        "note": "询问慈善捐赠。"
    },
    {
        "id": "shopping-74",
        "speaker": "Shopper",
        "text": "What does that mean exactly?",
        "translation": "那具体意味着什么？",
        "note": "询问慈善选项详情。"
    },
    {
        "id": "shopping-75",
        "speaker": "Clerk",
        "text": "We can round your total to $215, with the extra $4 going to a local children's charity.",
        "translation": "我们可以把你的总计四舍五入到215美元，额外的4美元捐给当地儿童慈善机构。",
        "note": "解释慈善捐赠。"
    },
    {
        "id": "shopping-76",
        "speaker": "Shopper",
        "text": "That's a great cause. Yes, please round it up.",
        "translation": "那是个很棒的事业。是的，请四舍五入。",
        "note": "同意慈善捐赠。"
    },
    {
        "id": "shopping-77",
        "speaker": "Clerk",
        "text": "Thank you for your generosity. Let me finalize everything for you.",
        "translation": "谢谢你的慷慨。让我为你完成一切。",
        "note": "感谢慈善捐赠。"
    },
    {
        "id": "shopping-78",
        "speaker": "Shopper",
        "text": "I appreciate you mentioning that. It's nice to give back while shopping.",
        "translation": "我很感激你提到那个。购物时回馈感觉很好。",
        "note": "表达对慈善的积极感受。"
    },
    {
        "id": "shopping-79",
        "speaker": "Clerk",
        "text": "Many of our customers enjoy that option. Here's your receipt and loyalty card.",
        "translation": "我们的许多顾客喜欢那个选择。这是你的收据和忠诚卡。",
        "note": "提供收据和忠诚卡。"
    },
    {
        "id": "shopping-80",
        "speaker": "Shopper",
        "text": "Thank you. How do I check my loyalty points balance?",
        "translation": "谢谢。我如何检查我的忠诚积分余额？",
        "note": "询问忠诚积分查询。"
    },
    {
        "id": "shopping-81",
        "speaker": "Clerk",
        "text": "You can check it online, in our app, or ask at any register. Your points are already updated.",
        "translation": "你可以在线检查，在我们的应用中，或在任何收银台询问。你的积分已经更新。",
        "note": "说明积分查询方式。"
    },
    {
        "id": "shopping-82",
        "speaker": "Shopper",
        "text": "That's convenient. Do points expire?",
        "translation": "那很方便。积分会过期吗？",
        "note": "询问积分过期政策。"
    },
    {
        "id": "shopping-83",
        "speaker": "Clerk",
        "text": "Points expire after 12 months of inactivity, but as long as you shop occasionally, they'll remain active.",
        "translation": "积分在12个月不活动后过期，但只要你偶尔购物，它们将保持活跃。",
        "note": "说明积分过期规则。"
    },
    {
        "id": "shopping-84",
        "speaker": "Shopper",
        "text": "Good to know. What about online shopping? Can I use my loyalty points there too?",
        "translation": "知道了。网上购物呢？我也可以在那里使用我的忠诚积分吗？",
        "note": "询问网上购物积分使用。"
    },
    {
        "id": "shopping-85",
        "speaker": "Clerk",
        "text": "Yes, absolutely. Your loyalty account works seamlessly between stores and online.",
        "translation": "是的，当然。你的忠诚账户在商店和网上之间无缝工作。",
        "note": "说明多渠道积分使用。"
    },
    {
        "id": "shopping-86",
        "speaker": "Shopper",
        "text": "That's excellent. I do quite a bit of online shopping as well.",
        "translation": "那太好了。我也经常网上购物。",
        "note": "表示网上购物习惯。"
    },
    {
        "id": "shopping-87",
        "speaker": "Clerk",
        "text": "Our online store has the same great selection, plus online-exclusive items and free shipping over $50.",
        "translation": "我们的网上商店有同样很棒的选择，加上网上独家物品和50美元以上免费送货。",
        "note": "介绍网上商店优势。"
    },
    {
        "id": "shopping-88",
        "speaker": "Shopper",
        "text": "Since I spent over $50 today, do I get free shipping if I order online?",
        "translation": "既然我今天花了超过50美元，如果我网上订购会得到免费送货吗？",
        "note": "询问免费送货资格。"
    },
    {
        "id": "shopping-89",
        "speaker": "Clerk",
        "text": "Free shipping applies to online orders, but since you're in-store today, your items are ready to take home.",
        "translation": "免费送货适用于网上订单，但既然你今天在店里，你的物品可以带回家。",
        "note": "说明送货政策差异。"
    },
    {
        "id": "shopping-90",
        "speaker": "Shopper",
        "text": "That makes sense. I'm happy to take them today anyway.",
        "translation": "那有道理。反正我今天也很高兴把它们带走。",
        "note": "接受当前安排。"
    },
    {
        "id": "shopping-91",
        "speaker": "Clerk",
        "text": "Your gift wrapping is all done. Everything looks beautiful together.",
        "translation": "你的礼品包装都完成了。一切在一起看起来很美。",
        "note": "完成礼品包装。"
    },
    {
        "id": "shopping-92",
        "speaker": "Shopper",
        "text": "It looks wonderful. My sister is going to love this.",
        "translation": "看起来很棒。我姐姐会喜欢这个的。",
        "note": "对礼品包装满意。"
    },
    {
        "id": "shopping-93",
        "speaker": "Clerk",
        "text": "I'm sure she will. Is there anything else I can help you with today?",
        "translation": "我相信她会。今天还有什么其他我可以帮助你的吗？",
        "note": "询问其他需求。"
    },
    {
        "id": "shopping-94",
        "speaker": "Shopper",
        "text": "No, I think that's everything. Thank you for all your help.",
        "translation": "不，我想就是这些。谢谢你所有的帮助。",
        "note": "表示购物完成。"
    },
    {
        "id": "shopping-95",
        "speaker": "Clerk",
        "text": "You're very welcome. We appreciate your business. Come back soon!",
        "translation": "不客气。我们感谢你的光顾。很快再来！",
        "note": "感谢光顾并邀请再来。"
    },
    {
        "id": "shopping-96",
        "speaker": "Shopper",
        "text": "I definitely will. You have a great selection and wonderful service.",
        "translation": "我一定会的。你们有很棒的选择和很棒的服务。",
        "note": "赞扬商店。"
    },
    {
        "id": "shopping-97",
        "speaker": "Clerk",
        "text": "Thank you for the kind words. We pride ourselves on customer satisfaction.",
        "translation": "谢谢你的好话。我们以客户满意度为荣。",
        "note": "表达服务理念。"
    },
    {
        "id": "shopping-98",
        "speaker": "Shopper",
        "text": "It shows. Have a great day!",
        "translation": "这显示出来了。祝你今天过得愉快！",
        "note": "道别祝福。"
    },
    {
        "id": "shopping-99",
        "speaker": "Clerk",
        "text": "You too! Enjoy the wedding, and I hope your sister loves her gift.",
        "translation": "你也是！享受婚礼，希望你姐姐喜欢她的礼物。",
        "note": "最后祝福。"
    },
    {
        "id": "shopping-100",
        "speaker": "Shopper",
        "text": "Thank you, I'm sure she will. Goodbye!",
        "translation": "谢谢，我相信她会。再见！",
        "note": "最终道别。"
    }
]

# Transit scene - 100 sentences (newly generated)
TRANSIT_FULL_100 = [
    {
        "id": "transit-1",
        "speaker": "Commuter",
        "text": "Excuse me, I'm trying to figure out the best way to get to downtown from here.",
        "translation": "打扰一下，我正在尝试找出从这里到市中心的最佳方式。",
        "note": "询问交通路线。"
    },
    {
        "id": "transit-2",
        "speaker": "Conductor",
        "text": "Good morning! I can help you with that. Where exactly in downtown do you need to go?",
        "translation": "早上好！我可以帮你处理那个。你确切需要去市中心的哪里？",
        "note": "询问具体目的地。"
    },
    {
        "id": "transit-3",
        "speaker": "Commuter",
        "text": "I need to get to the Central Business District, near the main train station.",
        "translation": "我需要去中央商务区，靠近主要火车站。",
        "note": "说明具体目的地。"
    },
    {
        "id": "transit-4",
        "speaker": "Conductor",
        "text": "You have a few options. The express bus is probably your fastest choice right now.",
        "translation": "你有几个选择。快车可能现在是你最快的选择。",
        "note": "推荐快车选项。"
    },
    {
        "id": "transit-5",
        "speaker": "Commuter",
        "text": "How long does the express bus take?",
        "translation": "快车需要多长时间？",
        "note": "询问行程时间。"
    },
    {
        "id": "transit-6",
        "speaker": "Conductor",
        "text": "About 25 minutes, depending on traffic. The local bus would take closer to 40 minutes.",
        "translation": "大约25分钟，取决于交通。本地公交车需要接近40分钟。",
        "note": "比较不同公交时间。"
    },
    {
        "id": "transit-7",
        "speaker": "Commuter",
        "text": "The express bus sounds better. Where do I catch it?",
        "translation": "快车听起来更好。我在哪里可以坐上它？",
        "note": "询问公交车站位置。"
    },
    {
        "id": "transit-8",
        "speaker": "Conductor",
        "text": "The express stop is just across the street. Bus number 101 comes every 10 minutes.",
        "translation": "快车站就在街对面。101路公交车每10分钟一班。",
        "note": "提供公交信息。"
    },
    {
        "id": "transit-9",
        "speaker": "Commuter",
        "text": "Perfect. How much is the fare?",
        "translation": "完美。车费是多少？",
        "note": "询问车费。"
    },
    {
        "id": "transit-10",
        "speaker": "Conductor",
        "text": "It's $2.50 for a single ride, or you can use a day pass for $7.00.",
        "translation": "单程2.50美元，或者你可以使用日票7.00美元。",
        "note": "提供票价选项。"
    },
    {
        "id": "transit-11",
        "speaker": "Commuter",
        "text": "I might be making multiple trips today. The day pass sounds like a better deal.",
        "translation": "我今天可能要多次出行。日票听起来是更好的交易。",
        "note": "选择日票。"
    },
    {
        "id": "transit-12",
        "speaker": "Conductor",
        "text": "Yes, if you're taking 3 or more rides, the day pass saves you money.",
        "translation": "是的，如果你乘坐3次或更多，日票能省钱。",
        "note": "确认日票优势。"
    },
    {
        "id": "transit-13",
        "speaker": "Commuter",
        "text": "Where can I buy the day pass?",
        "translation": "我在哪里可以购买日票？",
        "note": "询问购票地点。"
    },
    {
        "id": "transit-14",
        "speaker": "Conductor",
        "text": "You can buy it right here on the bus, or at the ticket machine across the street.",
        "translation": "你可以就在这辆公交车上买，或者在街对面的售票机买。",
        "note": "提供购票选项。"
    },
    {
        "id": "transit-15",
        "speaker": "Commuter",
        "text": "I'll buy it on the bus then. Do I need exact change?",
        "translation": "那我会在公交车上买。我需要正好零钱吗？",
        "note": "询问付款方式。"
    },
    {
        "id": "transit-16",
        "speaker": "Conductor",
        "text": "No, the bus accepts cash, cards, and mobile payments. The driver can make change.",
        "translation": "不需要，公交车接受现金、卡和移动支付。司机可以找零。",
        "note": "说明付款方式。"
    },
    {
        "id": "transit-17",
        "speaker": "Commuter",
        "text": "That's convenient. What about the subway? Is that another option?",
        "translation": "那很方便。地铁呢？那是另一个选择吗？",
        "note": "询问地铁选项。"
    },
    {
        "id": "transit-18",
        "speaker": "Conductor",
        "text": "Yes, the subway is also available. The nearest station is about a 5-minute walk from here.",
        "translation": "是的，地铁也可用。最近的车站离这里大约步行5分钟。",
        "note": "提供地铁信息。"
    },
    {
        "id": "transit-19",
        "speaker": "Commuter",
        "text": "How does the subway compare to the bus in terms of time?",
        "translation": "地铁在时间方面与公交车相比如何？",
        "note": "比较交通方式时间。"
    },
    {
        "id": "transit-20",
        "speaker": "Conductor",
        "text": "The subway takes about 20 minutes, but you have to factor in the walk to the station.",
        "translation": "地铁大约需要20分钟，但你要考虑到车站的步行时间。",
        "note": "说明地铁时间因素。"
    },
    {
        "id": "transit-21",
        "speaker": "Commuter",
        "text": "So the bus might actually be faster considering the station walk.",
        "translation": "所以考虑到车站步行，公交车实际上可能更快。",
        "note": "分析时间效率。"
    },
    {
        "id": "transit-22",
        "speaker": "Conductor",
        "text": "Yes, especially if you time it right with the bus schedule. The next one comes in 3 minutes.",
        "translation": "是的，特别是如果你按照公交时间表安排好时间。下一班3分钟后到。",
        "note": "建议时间安排。"
    },
    {
        "id": "transit-23",
        "speaker": "Commuter",
        "text": "I think I'll take the bus then. Thanks for the detailed information.",
        "translation": "那我想我会坐公交车。谢谢详细的信息。",
        "note": "决定乘坐公交车。"
    },
    {
        "id": "transit-24",
        "speaker": "Conductor",
        "text": "You're welcome! Just remember to validate your day pass when you board.",
        "translation": "不客气！只是记得上车时验证你的日票。",
        "note": "提醒验证日票。"
    },
    {
        "id": "transit-25",
        "speaker": "Commuter",
        "text": "What does validating the pass mean exactly?",
        "translation": "验证票具体意味着什么？",
        "note": "询问验证含义。"
    },
    {
        "id": "transit-26",
        "speaker": "Conductor",
        "text": "You just tap it on the card reader when you get on. It marks the start time.",
        "translation": "你上车时只需在卡阅读器上轻触它。它标记开始时间。",
        "note": "解释验证过程。"
    },
    {
        "id": "transit-27",
        "speaker": "Commuter",
        "text": "Got it. Are there any restrictions on when I can use the day pass?",
        "translation": "明白了。我在使用日票方面有什么限制吗？",
        "note": "询问使用限制。"
    },
    {
        "id": "transit-28",
        "speaker": "Conductor",
        "text": "The day pass is valid from the first use until midnight of the same day.",
        "translation": "日票从第一次使用到同一天午夜有效。",
        "note": "说明日票有效期。"
    },
    {
        "id": "transit-29",
        "speaker": "Commuter",
        "text": "That's good to know. Can I use it on any bus route, or just the express?",
        "translation": "那很好知道。我可以在任何公交路线上使用它，还是只在快车上？",
        "note": "询问使用范围。"
    },
    {
        "id": "transit-30",
        "speaker": "Conductor",
        "text": "It's valid on all bus routes and the subway system within the city limits.",
        "translation": "它在市内所有公交路线和地铁系统上都有效。",
        "note": "说明使用范围。"
    },
    {
        "id": "transit-31",
        "speaker": "Commuter",
        "text": "That's very flexible. Are there any peak hour restrictions?",
        "translation": "那非常灵活。有什么高峰时段限制吗？",
        "note": "询问高峰时段规则。"
    },
    {
        "id": "transit-32",
        "speaker": "Conductor",
        "text": "No restrictions, though buses are more crowded during peak hours, typically 7-9 AM and 4-6 PM.",
        "translation": "没有限制，虽然公交车在高峰时段更拥挤，通常是早上7-9点和下午4-6点。",
        "note": "说明高峰时段情况。"
    },
    {
        "id": "transit-33",
        "speaker": "Commuter",
        "text": "Good to know. I'm traveling during off-peak hours, so that should be fine.",
        "translation": "很好知道。我在非高峰时段出行，所以应该没问题。",
        "note": "确认出行时间。"
    },
    {
        "id": "transit-34",
        "speaker": "Conductor",
        "text": "Perfect. Off-peak travel is much more comfortable and often faster too.",
        "translation": "完美。非高峰时段旅行更舒适，通常也更快。",
        "note": "强调非高峰优势。"
    },
    {
        "id": "transit-35",
        "speaker": "Commuter",
        "text": "What about transfers? If I need to change buses, do I pay again?",
        "translation": "换乘呢？如果我需要换公交车，我需要再付费吗？",
        "note": "询问换乘政策。"
    },
    {
        "id": "transit-36",
        "speaker": "Conductor",
        "text": "With the day pass, no additional payment is needed for transfers within the system.",
        "translation": "有了日票，系统内换乘不需要额外付款。",
        "note": "说明换乘政策。"
    },
    {
        "id": "transit-37",
        "speaker": "Commuter",
        "text": "That's very convenient. Do I need to tap my pass again when transferring?",
        "translation": "那非常方便。换乘时我需要再次轻触我的卡吗？",
        "note": "询问换乘验证。"
    },
    {
        "id": "transit-38",
        "speaker": "Conductor",
        "text": "Yes, always tap when boarding any vehicle. It ensures your pass is valid and tracks usage.",
        "translation": "是的，登上任何车辆时总是要轻触。它确保你的卡有效并追踪使用。",
        "note": "强调验证重要性。"
    },
    {
        "id": "transit-39",
        "speaker": "Commuter",
        "text": "I'll remember that. What about accessibility features on the buses?",
        "translation": "我会记住那个。公交车上的无障碍功能怎么样？",
        "note": "询问无障碍功能。"
    },
    {
        "id": "transit-40",
        "speaker": "Conductor",
        "text": "All our buses are wheelchair accessible with priority seating and audio announcements.",
        "translation": "我们所有的公交车都轮椅可进入，有优先座位和音频公告。",
        "note": "说明无障碍功能。"
    },
    {
        "id": "transit-41",
        "speaker": "Commuter",
        "text": "That's good to know. Do the buses have bike racks?",
        "translation": "那很好知道。公交车有自行车架吗？",
        "note": "询问自行车架。"
    },
    {
        "id": "transit-42",
        "speaker": "Conductor",
        "text": "Yes, most buses have bike racks on the front that can hold 2-3 bikes.",
        "translation": "是的，大多数公交车前面有自行车架，可以容纳2-3辆自行车。",
        "note": "说明自行车架容量。"
    },
    {
        "id": "transit-43",
        "speaker": "Commuter",
        "text": "I sometimes bike to work, so that's useful information.",
        "translation": "我有时骑自行车上班，所以那是有用的信息。",
        "note": "表示自行车架相关性。"
    },
    {
        "id": "transit-44",
        "speaker": "Conductor",
        "text": "Many commuters combine biking with public transit. It's a popular eco-friendly option.",
        "translation": "许多通勤者将自行车与公共交通结合。这是一个受欢迎的环保选择。",
        "note": "认可自行车通勤。"
    },
    {
        "id": "transit-45",
        "speaker": "Commuter",
        "text": "What about Wi-Fi on the buses? Is that available?",
        "translation": "公交车上的Wi-Fi呢？那个可用吗？",
        "note": "询问Wi-Fi服务。"
    },
    {
        "id": "transit-46",
        "speaker": "Conductor",
        "text": "Free Wi-Fi is available on all express buses. Local buses have limited connectivity.",
        "translation": "所有快车上都有免费Wi-Fi。本地公交车连接有限。",
        "note": "说明Wi-Fi可用性。"
    },
    {
        "id": "transit-47",
        "speaker": "Commuter",
        "text": "That's great for getting work done during the commute.",
        "translation": "那对在通勤期间完成工作很棒。",
        "note": "认可Wi-Fi好处。"
    },
    {
        "id": "transit-48",
        "speaker": "Conductor",
        "text": "Many people use their commute time productively. The Wi-Fi is quite reliable.",
        "translation": "许多人有效地利用通勤时间。Wi-Fi相当可靠。",
        "note": "说明Wi-Fi质量。"
    },
    {
        "id": "transit-49",
        "speaker": "Commuter",
        "text": "What about charging ports? Are there USB outlets on the buses?",
        "translation": "充电端口呢？公交车上有USB插座吗？",
        "note": "询问充电设施。"
    },
    {
        "id": "transit-50",
        "speaker": "Conductor",
        "text": "Express buses are equipped with USB charging ports at most seats.",
        "translation": "快车在大多数座位都配备了USB充电端口。",
        "note": "说明充电设施。"
    },
    {
        "id": "transit-51",
        "speaker": "Commuter",
        "text": "That's very helpful. I often need to charge my phone during the day.",
        "translation": "那非常有帮助。我经常需要在白天给手机充电。",
        "note": "表示充电需求。"
    },
    {
        "id": "transit-52",
        "speaker": "Conductor",
        "text": "You'll find the express buses quite comfortable then. They're designed for longer commutes.",
        "translation": "那么你会发现快车相当舒适。它们是为更长通勤设计的。",
        "note": "说明快车设计特点。"
    },
    {
        "id": "transit-53",
        "speaker": "Commuter",
        "text": "What about security on the buses? Are they safe to ride at night?",
        "translation": "公交车上的安全呢？晚上乘坐安全吗？",
        "note": "询问安全顾虑。"
    },
    {
        "id": "transit-54",
        "speaker": "Conductor",
        "text": "We have security cameras on all buses, and many routes have late-night service with drivers.",
        "translation": "我们在所有公交车上都有安全摄像头，许多路线都有司机的深夜服务。",
        "note": "说明安全措施。"
    },
    {
        "id": "transit-55",
        "speaker": "Commuter",
        "text": "That's reassuring. Are there any areas or routes I should avoid?",
        "translation": "那让人安心。有什么区域或路线我应该避免吗？",
        "note": "询问安全区域。"
    },
    {
        "id": "transit-56",
        "speaker": "Conductor",
        "text": "Generally, all routes are safe. The transit authority keeps crime statistics very low.",
        "translation": "通常，所有路线都是安全的。交通管理局保持犯罪统计非常低。",
        "note": "提供安全保证。"
    },
    {
        "id": "transit-57",
        "speaker": "Commuter",
        "text": "Good to know. What happens if I leave something on the bus?",
        "translation": "很好知道。如果我在公交车上落下东西怎么办？",
        "note": "询问失物招领。"
    },
    {
        "id": "transit-58",
        "speaker": "Conductor",
        "text": "You can call the lost and found office. Items are usually kept for 30 days.",
        "translation": "你可以给失物招领办公室打电话。物品通常保留30天。",
        "note": "说明失物招领政策。"
    },
    {
        "id": "transit-59",
        "speaker": "Commuter",
        "text": "Is there a phone number I should save for that?",
        "translation": "有一个我应该保存的电话号码吗？",
        "note": "询问联系信息。"
    },
    {
        "id": "transit-60",
        "speaker": "Conductor",
        "text": "Yes, the main transit customer service line is 555-0123. They handle lost items too.",
        "translation": "是的，主要交通客户服务热线是555-0123。他们也处理失物。",
        "note": "提供联系号码。"
    },
    {
        "id": "transit-61",
        "speaker": "Commuter",
        "text": "I'll save that number. What about real-time bus tracking? Is there an app for that?",
        "translation": "我会保存那个号码。实时公交跟踪呢？有那个应用吗？",
        "note": "询问实时跟踪应用。"
    },
    {
        "id": "transit-62",
        "speaker": "Conductor",
        "text": "Yes, our official transit app shows real-time locations, schedules, and service alerts.",
        "translation": "是的，我们的官方交通应用显示实时位置、时间表和服务警报。",
        "note": "推荐交通应用。"
    },
    {
        "id": "transit-63",
        "speaker": "Commuter",
        "text": "That sounds very useful. I'll download it right away.",
        "translation": "那听起来很有用。我会立即下载它。",
        "note": "表示应用兴趣。"
    },
    {
        "id": "transit-64",
        "speaker": "Conductor",
        "text": "It really helps with planning. You can see exactly when your bus will arrive.",
        "translation": "它真的有助于规划。你可以确切看到你的公交车什么时候到达。",
        "note": "强调应用好处。"
    },
    {
        "id": "transit-65",
        "speaker": "Commuter",
        "text": "What about service disruptions? How are those communicated?",
        "translation": "服务中断呢？那些如何传达？",
        "note": "询问服务中断通知。"
    },
    {
        "id": "transit-66",
        "speaker": "Conductor",
        "text": "The app sends push notifications for delays, detours, and service changes.",
        "translation": "应用发送延迟、绕行和服务变更的推送通知。",
        "note": "说明通知系统。"
    },
    {
        "id": "transit-67",
        "speaker": "Commuter",
        "text": "That's very helpful for planning alternative routes if needed.",
        "translation": "那对规划替代路线如果需要的话很有帮助。",
        "note": "认可通知好处。"
    },
    {
        "id": "transit-68",
        "speaker": "Conductor",
        "text": "Exactly. The app can suggest alternative routes when there are disruptions.",
        "translation": "确实。当有中断时，应用可以建议替代路线。",
        "note": "说明替代路线功能。"
    },
    {
        "id": "transit-69",
        "speaker": "Commuter",
        "text": "I'm getting a lot of useful information today. Thank you for being so helpful.",
        "translation": "我今天获得了很多有用的信息。谢谢你这么有帮助。",
        "note": "感谢服务。"
    },
    {
        "id": "transit-70",
        "speaker": "Conductor",
        "text": "You're very welcome! Helping passengers navigate the system is part of my job.",
        "translation": "不客气！帮助乘客导航系统是我工作的一部分。",
        "note": "表达服务理念。"
    },
    {
        "id": "transit-71",
        "speaker": "Commuter",
        "text": "One more question - are there any monthly pass options for regular commuters?",
        "translation": "还有一个问题——有定期通勤者的月票选择吗？",
        "note": "询问月票选项。"
    },
    {
        "id": "transit-72",
        "speaker": "Conductor",
        "text": "Yes, monthly passes offer significant savings. They're about $70 for unlimited rides.",
        "translation": "是的，月票提供显著节省。它们大约70美元无限次乘坐。",
        "note": "介绍月票优惠。"
    },
    {
        "id": "transit-73",
        "speaker": "Commuter",
        "text": "That's much better than paying daily. How do I get a monthly pass?",
        "translation": "那比每天付钱好多了。我如何获得月票？",
        "note": "询问月票获取。"
    },
    {
        "id": "transit-74",
        "speaker": "Conductor",
        "text": "You can buy them at transit centers, online, or reload them at any station.",
        "translation": "你可以在交通中心、网上购买，或在任何车站充值。",
        "note": "提供月票购买方式。"
    },
    {
        "id": "transit-75",
        "speaker": "Commuter",
        "text": "I might consider that for regular commuting. What about student or senior discounts?",
        "translation": "我可能会考虑那个用于定期通勤。学生或老年人折扣呢？",
        "note": "询问特殊折扣。"
    },
    {
        "id": "transit-76",
        "speaker": "Conductor",
        "text": "Yes, students with valid ID get 50% off, and seniors 65+ get 25% off all fares.",
        "translation": "是的，有有效身份证的学生获得50%折扣，65岁以上老年人获得所有票价25%折扣。",
        "note": "说明折扣政策。"
    },
    {
        "id": "transit-77",
        "speaker": "Commuter",
        "text": "I'm not a student, but my mother might benefit from the senior discount.",
        "translation": "我不是学生，但我母亲可能从老年人折扣中受益。",
        "note": "表示家庭折扣兴趣。"
    },
    {
        "id": "transit-78",
        "speaker": "Conductor",
        "text": "She would need to show proof of age, like a driver's license or ID card.",
        "translation": "她需要出示年龄证明，如驾照或身份证。",
        "note": "说明年龄证明要求。"
    },
    {
        "id": "transit-79",
        "speaker": "Commuter",
        "text": "That's good to know. I'll let her know about the discount.",
        "translation": "那很好知道。我会让她知道折扣的事。",
        "note": "表示信息传递。"
    },
    {
        "id": "transit-80",
        "speaker": "Conductor",
        "text": "Here comes your bus! It's the 101 express to downtown.",
        "translation": "你的公交车来了！这是去市中心的101路快车。",
        "note": "指出到达的公交车。"
    },
    {
        "id": "transit-81",
        "speaker": "Commuter",
        "text": "Perfect timing. Thank you again for all your help.",
        "translation": "时间完美。再次感谢你所有的帮助。",
        "note": "感谢并准备上车。"
    },
    {
        "id": "transit-82",
        "speaker": "Conductor",
        "text": "You're welcome! Have a great day and enjoy your trip to downtown.",
        "translation": "不客气！祝你今天过得愉快，享受去市中心的旅行。",
        "note": "祝福旅程。"
    },
    {
        "id": "transit-83",
        "speaker": "Commuter",
        "text": "I will. Thanks again!",
        "translation": "我会的。再次感谢！",
        "note": "最终感谢。"
    },
    {
        "id": "transit-84",
        "speaker": "Conductor",
        "text": "Anytime. Safe travels!",
        "translation": "随时。旅途安全！",
        "note": "最后祝福。"
    },
    {
        "id": "transit-85",
        "speaker": "Commuter",
        "text": "By the way, I forgot to ask - what are the operating hours for the bus system?",
        "translation": "顺便问一下，我忘了问——公交系统的运营时间是什么？",
        "note": "询问运营时间。"
    },
    {
        "id": "transit-86",
        "speaker": "Conductor",
        "text": "Most routes run from 5 AM to midnight, with limited overnight service on major routes.",
        "translation": "大多数路线从早上5点运行到午夜，主要路线有有限的深夜服务。",
        "note": "说明运营时间。"
    },
    {
        "id": "transit-87",
        "speaker": "Commuter",
        "text": "That's good coverage. Are there any plans to extend service hours?",
        "translation": "那覆盖很好。有延长服务时间的计划吗？",
        "note": "询问服务扩展计划。"
    },
    {
        "id": "transit-88",
        "speaker": "Conductor",
        "text": "The transit authority is discussing 24-hour service on major routes, but nothing confirmed yet.",
        "translation": "交通管理局正在讨论主要路线的24小时服务，但尚未确认。",
        "note": "说明未来计划。"
    },
    {
        "id": "transit-89",
        "speaker": "Commuter",
        "text": "That would be very helpful for late-night workers. I hope they implement it.",
        "translation": "那对深夜工作者会很有帮助。我希望他们实施它。",
        "note": "表达对服务扩展的支持。"
    },
    {
        "id": "transit-90",
        "speaker": "Conductor",
        "text": "Many community members have requested it. Public feedback is important for these decisions.",
        "translation": "许多社区成员都要求这个。公众反馈对这些决定很重要。",
        "note": "说明公众反馈重要性。"
    },
    {
        "id": "transit-91",
        "speaker": "Commuter",
        "text": "I should provide feedback then. How can I do that?",
        "translation": "那我应该提供反馈。我如何做那个？",
        "note": "询问反馈方式。"
    },
    {
        "id": "transit-92",
        "speaker": "Conductor",
        "text": "You can submit feedback through the transit app, website, or at community meetings.",
        "translation": "你可以通过交通应用、网站或在社区会议上提交反馈。",
        "note": "提供反馈渠道。"
    },
    {
        "id": "transit-93",
        "speaker": "Commuter",
        "text": "I'll definitely do that. Extended hours would really benefit the community.",
        "translation": "我一定会做那个。延长时间真的会造福社区。",
        "note": "表示反馈意图。"
    },
    {
        "id": "transit-94",
        "speaker": "Conductor",
        "text": "Community input has led to many improvements over the years. Every voice matters.",
        "translation": "多年来社区投入导致了许多改进。每个声音都很重要。",
        "note": "强调社区参与重要性。"
    },
    {
        "id": "transit-95",
        "speaker": "Commuter",
        "text": "It's good to know the system is responsive to rider needs.",
        "translation": "很高兴知道系统对乘客需求有响应。",
        "note": "认可系统响应性。"
    },
    {
        "id": "transit-96",
        "speaker": "Conductor",
        "text": "We try our best. The goal is to make public transit accessible and convenient for everyone.",
        "translation": "我们尽力而为。目标是让公共交通对每个人都可及和方便。",
        "note": "表达服务目标。"
    },
    {
        "id": "transit-97",
        "speaker": "Commuter",
        "text": "I appreciate that. Public transit is so important for sustainable cities.",
        "translation": "我很感激那个。公共交通对可持续城市非常重要。",
        "note": "认可公共交通重要性。"
    },
    {
        "id": "transit-98",
        "speaker": "Conductor",
        "text": "Absolutely. Every person who chooses transit over driving helps reduce traffic and pollution.",
        "translation": "确实。每个选择公共交通而不是开车的人都有助于减少交通和污染。",
        "note": "强调环保好处。"
    },
    {
        "id": "transit-99",
        "speaker": "Commuter",
        "text": "I feel good about using public transit now. Thanks for the informative conversation.",
        "translation": "我现在对使用公共交通感觉很好。谢谢信息丰富的对话。",
        "note": "表达对公共交通的积极感受。"
    },
    {
        "id": "transit-100",
        "speaker": "Conductor",
        "text": "You're welcome! Enjoy your ride, and thank you for choosing public transit!",
        "translation": "不客气！享受你的旅程，谢谢你选择公共交通！",
        "note": "最后感谢和祝福。"
    }
]

# Government scene - 100 sentences (newly generated)
GOVERNMENT_FULL_100 = [
    {
        "id": "government-1",
        "speaker": "Citizen",
        "text": "Hello, I need to renew my driver's license. What documents do I need to bring?",
        "translation": "您好，我需要更新我的驾照。我需要带什么文件？",
        "note": "询问驾照更新所需文件。"
    },
    {
        "id": "government-2",
        "speaker": "Officer",
        "text": "Good morning. You'll need your current license, proof of identity, and proof of residency.",
        "translation": "早上好。你需要你当前的驾照、身份证明和居住证明。",
        "note": "列出所需文件。"
    },
    {
        "id": "government-3",
        "speaker": "Citizen",
        "text": "I have my current license and passport. What counts as proof of residency?",
        "translation": "我有我的当前驾照和护照。什么算作居住证明？",
        "note": "询问居住证明类型。"
    },
    {
        "id": "government-4",
        "speaker": "Officer",
        "text": "Utility bills, bank statements, or lease agreements with your current address are acceptable.",
        "translation": "有你当前地址的公用事业账单、银行对账单或租约都是可接受的。",
        "note": "列出居住证明类型。"
    },
    {
        "id": "government-5",
        "speaker": "Citizen",
        "text": "I have a recent utility bill. That should work then.",
        "translation": "我有一张最近的公用事业账单。那应该可行。",
        "note": "确认文件准备。"
    },
    {
        "id": "government-6",
        "speaker": "Officer",
        "text": "Perfect. Do you have any outstanding traffic violations or fines?",
        "translation": "完美。你有任何未结的交通违规或罚款吗？",
        "note": "询问交通违规情况。"
    },
    {
        "id": "government-7",
        "speaker": "Citizen",
        "text": "No, I keep my driving record clean. No violations or fines.",
        "translation": "没有，我保持我的驾驶记录清洁。没有违规或罚款。",
        "note": "说明清洁驾驶记录。"
    },
    {
        "id": "government-8",
        "speaker": "Officer",
        "text": "That's excellent. Has your address changed since your last license was issued?",
        "translation": "那太好了。自从你上次驾照签发以来你的地址有变化吗？",
        "note": "询问地址变更。"
    },
    {
        "id": "government-9",
        "speaker": "Citizen",
        "text": "Yes, I moved to a new apartment about six months ago.",
        "translation": "是的，我大约六个月前搬到了新公寓。",
        "note": "说明地址变更。"
    },
    {
        "id": "government-10",
        "speaker": "Officer",
        "text": "That's why the utility bill is important. We'll update your address on the new license.",
        "translation": "这就是为什么公用事业账单很重要。我们会在新驾照上更新你的地址。",
        "note": "说明地址更新流程。"
    },
    {
        "id": "government-11",
        "speaker": "Citizen",
        "text": "Do I need to take a new photo for the renewal?",
        "translation": "我需要为更新拍新照片吗？",
        "note": "询问照片要求。"
    },
    {
        "id": "government-12",
        "speaker": "Officer",
        "text": "Yes, we'll take a new photo today. The photo station is right over there.",
        "translation": "是的，我们今天会拍新照片。照片站就在那边。",
        "note": "指引照片位置。"
    },
    {
        "id": "government-13",
        "speaker": "Citizen",
        "text": "Is there a vision test required for renewal?",
        "translation": "更新需要视力测试吗？",
        "note": "询问视力测试要求。"
    },
    {
        "id": "government-14",
        "speaker": "Officer",
        "text": "Yes, a quick vision screening is required. It only takes a couple of minutes.",
        "translation": "是的，需要快速视力筛查。只需要几分钟。",
        "note": "说明视力测试流程。"
    },
    {
        "id": "government-15",
        "speaker": "Citizen",
        "text": "That's fine. What's the fee for the license renewal?",
        "translation": "那没问题。驾照更新的费用是多少？",
        "note": "询问更新费用。"
    },
    {
        "id": "government-16",
        "speaker": "Officer",
        "text": "The renewal fee is $40. We accept cash, cards, and mobile payments.",
        "translation": "更新费是40美元。我们接受现金、卡和移动支付。",
        "note": "说明费用和付款方式。"
    },
    {
        "id": "government-17",
        "speaker": "Citizen",
        "text": "I'll pay with my credit card. How long will the new license be valid?",
        "translation": "我会用信用卡支付。新驾照会有效多久？",
        "note": "询问驾照有效期。"
    },
    {
        "id": "government-18",
        "speaker": "Officer",
        "text": "Standard licenses are valid for 5 years. We'll issue you a temporary paper license today.",
        "translation": "标准驾照有效期为5年。我们今天会给你发一张临时纸质驾照。",
        "note": "说明有效期和临时驾照。"
    },
    {
        "id": "government-19",
        "speaker": "Citizen",
        "text": "When will I receive the actual plastic license?",
        "translation": "我什么时候会收到实际的塑料驾照？",
        "note": "询问正式驾照递送时间。"
    },
    {
        "id": "government-20",
        "speaker": "Officer",
        "text": "It typically arrives within 2-3 weeks by mail at your updated address.",
        "translation": "通常在2-3周内通过邮件寄到你更新的地址。",
        "note": "说明递送时间。"
    },
    {
        "id": "government-21",
        "speaker": "Citizen",
        "text": "That works for me. What about organ donation? Can I update that status?",
        "translation": "那对我可行。器官捐赠呢？我可以更新那个状态吗？",
        "note": "询问器官捐赠状态更新。"
    },
    {
        "id": "government-22",
        "speaker": "Officer",
        "text": "Yes, you can update your organ donation preference during the renewal process.",
        "translation": "是的，你可以在更新过程中更新你的器官捐赠偏好。",
        "note": "说明器官捐赠更新选项。"
    },
    {
        "id": "government-23",
        "speaker": "Citizen",
        "text": "I'd like to register as an organ donor. Is that a simple process?",
        "translation": "我想注册为器官捐赠者。那是一个简单的过程吗？",
        "note": "表达捐赠意愿。"
    },
    {
        "id": "government-24",
        "speaker": "Officer",
        "text": "Very simple. Just let me know during the application process, and I'll add it to your record.",
        "translation": "非常简单。只需在申请过程中告诉我，我会把它添加到你的记录中。",
        "note": "说明捐赠注册流程。"
    },
    {
        "id": "government-25",
        "speaker": "Citizen",
        "text": "I appreciate that option. What about voter registration? Can I update that too?",
        "translation": "我很感激那个选择。选民登记呢？我也可以更新那个吗？",
        "note": "询问选民登记更新。"
    },
    {
        "id": "government-26",
        "speaker": "Officer",
        "text": "Yes, we can update your voter registration address and information at the same time.",
        "translation": "是的，我们可以同时更新你的选民登记地址和信息。",
        "note": "说明选民登记更新。"
    },
    {
        "id": "government-27",
        "speaker": "Citizen",
        "text": "That's very convenient. I need to update my voter registration anyway.",
        "translation": "那非常方便。反正我也需要更新我的选民登记。",
        "note": "表示选民登记更新需求。"
    },
    {
        "id": "government-28",
        "speaker": "Officer",
        "text": "Perfect. We can handle both the license renewal and voter registration in one visit.",
        "translation": "完美。我们可以在一次访问中处理驾照更新和选民登记。",
        "note": "说明服务整合。"
    },
    {
        "id": "government-29",
        "speaker": "Citizen",
        "text": "That saves time. Do I need to fill out any additional forms for voter registration?",
        "translation": "那节省时间。我需要为选民登记填写任何额外表格吗？",
        "note": "询问选民登记表格。"
    },
    {
        "id": "government-30",
        "speaker": "Officer",
        "text": "Just a simple form to confirm your information and party affiliation if you choose.",
        "translation": "只是一个简单的表格来确认你的信息和你选择的话党派归属。",
        "note": "说明选民登记表格内容。"
    },
    {
        "id": "government-31",
        "speaker": "Citizen",
        "text": "I'll need to decide on party affiliation. Is that required?",
        "translation": "我需要决定党派归属。那是必需的吗？",
        "note": "询问党派归属要求。"
    },
    {
        "id": "government-32",
        "speaker": "Officer",
        "text": "No, you can register as unaffiliated or independent if you prefer.",
        "translation": "不需要，如果你愿意，你可以注册为无党派或独立人士。",
        "note": "说明无党派选项。"
    },
    {
        "id": "government-33",
        "speaker": "Citizen",
        "text": "I think I'll register as unaffiliated for now. I can always change later.",
        "translation": "我想我现在会注册为无党派。我以后总是可以改变。",
        "note": "选择无党派登记。"
    },
    {
        "id": "government-34",
        "speaker": "Officer",
        "text": "That's fine. You can update your party affiliation at any time through the election office.",
        "translation": "那没问题。你可以随时通过选举办公室更新你的党派归属。",
        "note": "说明党派变更流程。"
    },
    {
        "id": "government-35",
        "speaker": "Citizen",
        "text": "Good to know. What about any other government services I might need?",
        "translation": "很好知道。我可能需要的任何其他政府服务呢？",
        "note": "询问其他政府服务。"
    },
    {
        "id": "government-36",
        "speaker": "Officer",
        "text": "We can also help with passport applications, vehicle registration, and state ID cards.",
        "translation": "我们也可以帮助处理护照申请、车辆登记和州身份证。",
        "note": "列出其他服务。"
    },
    {
        "id": "government-37",
        "speaker": "Citizen",
        "text": "My passport is expiring next year. Should I start the renewal process soon?",
        "translation": "我的护照明年到期。我应该很快开始更新流程吗？",
        "note": "询问护照更新时机。"
    },
    {
        "id": "government-38",
        "speaker": "Officer",
        "text": "Yes, passport processing can take 6-8 weeks, so it's best to apply well in advance.",
        "translation": "是的，护照处理可能需要6-8周，所以最好提前申请。",
        "note": "建议护照更新时机。"
    },
    {
        "id": "government-39",
        "speaker": "Citizen",
        "text": "I'll make a note to start that process in the next few months.",
        "translation": "我会记下来在未来几个月开始那个流程。",
        "note": "表示计划行动。"
    },
    {
        "id": "government-40",
        "speaker": "Officer",
        "text": "You can also apply for expedited processing if you need it sooner, for an additional fee.",
        "translation": "如果你需要更快，你也可以申请加急处理，需要额外费用。",
        "note": "说明加急处理选项。"
    },
    {
        "id": "government-41",
        "speaker": "Citizen",
        "text": "Good to know. What about vehicle registration? My car registration is due next month.",
        "translation": "很好知道。车辆登记呢？我的车辆登记下个月到期。",
        "note": "询问车辆登记更新。"
    },
    {
        "id": "government-42",
        "speaker": "Officer",
        "text": "We can process vehicle registration renewals here as well. Do you have your renewal notice?",
        "translation": "我们也可以在这里处理车辆登记更新。你有你的更新通知吗？",
        "note": "询问车辆登记通知。"
    },
    {
        "id": "government-43",
        "speaker": "Citizen",
        "text": "Yes, I received it in the mail last week. I have it with me.",
        "translation": "是的，我上周在邮件中收到了。我带着它。",
        "note": "确认通知准备。"
    },
    {
        "id": "government-44",
        "speaker": "Officer",
        "text": "Perfect. Bring that along with your current registration and proof of insurance.",
        "translation": "完美。带着那个和你当前的登记以及保险证明。",
        "note": "列出车辆登记所需文件。"
    },
    {
        "id": "government-45",
        "speaker": "Citizen",
        "text": "I have my insurance card in my wallet. That should cover everything.",
        "translation": "我的保险卡在我的钱包里。那应该涵盖一切。",
        "note": "确认保险文件准备。"
    },
    {
        "id": "government-46",
        "speaker": "Officer",
        "text": "Excellent. We can handle the vehicle registration renewal right after your license renewal.",
        "translation": "太好了。我们可以在你的驾照更新后立即处理车辆登记更新。",
        "note": "安排服务顺序。"
    },
    {
        "id": "government-47",
        "speaker": "Citizen",
        "text": "That's very efficient. What's the fee for vehicle registration?",
        "translation": "那非常高效。车辆登记的费用是多少？",
        "note": "询问车辆登记费用。"
    },
    {
        "id": "government-48",
        "speaker": "Officer",
        "text": "Registration fees vary by vehicle type and weight. Your renewal notice will have the exact amount.",
        "translation": "登记费用因车辆类型和重量而异。你的更新通知会有确切金额。",
        "note": "说明费用差异。"
    },
    {
        "id": "government-49",
        "speaker": "Citizen",
        "text": "I'll check the notice then. Are there any emissions testing requirements?",
        "translation": "那我会检查通知。有任何排放测试要求吗？",
        "note": "询问排放测试要求。"
    },
    {
        "id": "government-50",
        "speaker": "Officer",
        "text": "Emissions testing is required every two years for most vehicles. Check your notice for your status.",
        "translation": "大多数车辆每两年需要一次排放测试。检查你的通知了解你的状态。",
        "note": "说明排放测试要求。"
    },
    {
        "id": "government-51",
        "speaker": "Citizen",
        "text": "I'll look for that on the notice. What about vehicle inspections?",
        "translation": "我会在通知上找那个。车辆检查呢？",
        "note": "询问车辆检查要求。"
    },
    {
        "id": "government-52",
        "speaker": "Officer",
        "text": "Safety inspections are required annually. You can get that done at authorized inspection stations.",
        "translation": "安全检查每年都需要。你可以在授权检查站完成那个。",
        "note": "说明安全检查要求。"
    },
    {
        "id": "government-53",
        "speaker": "Citizen",
        "text": "I need to schedule a safety inspection then. Can you recommend any stations nearby?",
        "translation": "那我需要安排安全检查。你能推荐附近的任何检查站吗？",
        "note": "询问检查站推荐。"
    },
    {
        "id": "government-54",
        "speaker": "Officer",
        "text": "There are several authorized stations within 5 miles. I can give you a list.",
        "translation": "5英里内有几个授权检查站。我可以给你一个列表。",
        "note": "提供检查站信息。"
    },
    {
        "id": "government-55",
        "speaker": "Citizen",
        "text": "That would be helpful. What about property taxes? Are those handled here too?",
        "translation": "那会有帮助。房产税呢？那些也在这里处理吗？",
        "note": "询问房产税服务。"
    },
    {
        "id": "government-56",
        "speaker": "Officer",
        "text": "Property taxes are handled through the county treasurer's office, not here. They have a separate location.",
        "translation": "房产税通过县财政办公室处理，不在这里。他们有单独的位置。",
        "note": "说明房产税处理地点。"
    },
    {
        "id": "government-57",
        "speaker": "Citizen",
        "text": "Do you have the address and hours for the treasurer's office?",
        "translation": "你有财政办公室的地址和营业时间吗？",
        "note": "询问财政办公室信息。"
    },
    {
        "id": "government-58",
        "speaker": "Officer",
        "text": "Yes, I can give you that information. They're open Monday through Friday, 8 AM to 4 PM.",
        "translation": "是的，我可以给你那个信息。他们周一到周五开放，上午8点到下午4点。",
        "note": "提供财政办公室信息。"
    },
    {
        "id": "government-59",
        "speaker": "Citizen",
        "text": "Thank you. What about business licenses? Do you handle those here?",
        "translation": "谢谢。营业执照呢？你们在这里处理那些吗？",
        "note": "询问营业执照服务。"
    },
    {
        "id": "government-60",
        "speaker": "Officer",
        "text": "Business licenses are handled through the city clerk's office. They're located downtown.",
        "translation": "营业执照通过市办事员办公室处理。他们位于市中心。",
        "note": "说明营业执照处理地点。"
    },
    {
        "id": "government-61",
        "speaker": "Citizen",
        "text": "I'm thinking of starting a small business. What would I need to do for licensing?",
        "translation": "我在考虑开始一个小生意。为了许可我需要做什么？",
        "note": "询问商业许可流程。"
    },
    {
        "id": "government-62",
        "speaker": "Officer",
        "text": "You'd need to apply through the city clerk, register with the state, and obtain any necessary permits.",
        "translation": "你需要通过市办事员申请，向州注册，并获得任何必要的许可证。",
        "note": "说明商业许可步骤。"
    },
    {
        "id": "government-63",
        "speaker": "Citizen",
        "text": "That sounds like a multi-step process. Is there information available online?",
        "translation": "那听起来像一个多步骤流程。网上有信息可用吗？",
        "note": "询问在线信息。"
    },
    {
        "id": "government-64",
        "speaker": "Officer",
        "text": "Yes, the city website has a complete business startup guide with all the requirements.",
        "translation": "是的，市网站有一个完整的商业创业指南，包含所有要求。",
        "note": "推荐在线资源。"
    },
    {
        "id": "government-65",
        "speaker": "Citizen",
        "text": "I'll check that out. What about marriage licenses? Are those handled here?",
        "translation": "我会查看那个。结婚许可证呢？那些在这里处理吗？",
        "note": "询问结婚许可证服务。"
    },
    {
        "id": "government-66",
        "speaker": "Officer",
        "text": "Yes, marriage licenses are issued here. Both parties need to appear in person with valid ID.",
        "translation": "是的，结婚许可证在这里签发。双方都需要亲自带着有效身份证出现。",
        "note": "说明结婚许可证要求。"
    },
    {
        "id": "government-67",
        "speaker": "Citizen",
        "text": "What's the fee for a marriage license, and how long is it valid?",
        "translation": "结婚许可证的费用是多少，它有效多久？",
        "note": "询问结婚许可证费用和有效期。"
    },
    {
        "id": "government-68",
        "speaker": "Officer",
        "text": "The fee is $60, and the license is valid for 60 days from the date of issue.",
        "translation": "费用是60美元，许可证从签发日期起60天有效。",
        "note": "说明结婚许可证详情。"
    },
    {
        "id": "government-69",
        "speaker": "Citizen",
        "text": "Good to know. Do you need to make an appointment, or can you just walk in?",
        "translation": "很好知道。你需要预约，还是可以直接来？",
        "note": "询问预约要求。"
    },
    {
        "id": "government-70",
        "speaker": "Officer",
        "text": "For marriage licenses, appointments are recommended but not required. Walk-ins are welcome.",
        "translation": "对于结婚许可证，建议预约但不是必需的。直接来的人受欢迎。",
        "note": "说明预约政策。"
    },
    {
        "id": "government-71",
        "speaker": "Citizen",
        "text": "What about birth and death certificates? Can I get copies here?",
        "translation": "出生和死亡证明呢？我可以在这里获得副本吗？",
        "note": "询问证明文件服务。"
    },
    {
        "id": "government-72",
        "speaker": "Officer",
        "text": "Vital records like birth and death certificates are handled through the state health department.",
        "translation": "出生和死亡证明等重要记录通过州卫生部门处理。",
        "note": "说明证明文件处理部门。"
    },
    {
        "id": "government-73",
        "speaker": "Citizen",
        "text": "Do you have contact information for the health department?",
        "translation": "你有卫生部门的联系信息吗？",
        "note": "询问卫生部门联系信息。"
    },
    {
        "id": "government-74",
        "speaker": "Officer",
        "text": "Yes, I can provide their phone number and website. They also have an online ordering system.",
        "translation": "是的，我可以提供他们的电话号码和网站。他们也有在线订购系统。",
        "note": "提供卫生部门联系信息。"
    },
    {
        "id": "government-75",
        "speaker": "Citizen",
        "text": "That's helpful. What about hunting and fishing licenses? Are those available here?",
        "translation": "那有帮助。狩猎和钓鱼许可证呢？那些在这里可用吗？",
        "note": "询问狩猎钓鱼许可证。"
    },
    {
        "id": "government-76",
        "speaker": "Officer",
        "text": "Yes, we issue hunting and fishing licenses. You'll need to show proof of completing any required safety courses.",
        "translation": "是的，我们签发狩猎和钓鱼许可证。你需要出示完成任何必要安全课程的证明。",
        "note": "说明狩猎钓鱼许可证要求。"
    },
    {
        "id": "government-77",
        "speaker": "Citizen",
        "text": "I completed the hunter safety course last year. I have my certificate.",
        "translation": "我去年完成了猎人安全课程。我有我的证书。",
        "note": "确认安全课程完成。"
    },
    {
        "id": "government-78",
        "speaker": "Officer",
        "text": "Perfect. Bring your certificate and we can process your hunting license right away.",
        "translation": "完美。带上你的证书，我们可以立即处理你的狩猎许可证。",
        "note": "确认狩猎许可证处理。"
    },
    {
        "id": "government-79",
        "speaker": "Citizen",
        "text": "What about concealed carry permits? Do you handle those here?",
        "translation": "隐蔽携带许可证呢？你们在这里处理那些吗？",
        "note": "询问隐蔽携带许可证。"
    },
    {
        "id": "government-80",
        "speaker": "Officer",
        "text": "Concealed carry permits are handled through the state police, not at this local office.",
        "translation": "隐蔽携带许可证通过州警察处理，不在这个地方办公室。",
        "note": "说明隐蔽携带许可证处理部门。"
    },
    {
        "id": "government-81",
        "speaker": "Citizen",
        "text": "Do you have information on the application process for concealed carry permits?",
        "translation": "你有隐蔽携带许可证申请流程的信息吗？",
        "note": "询问隐蔽携带许可证申请信息。"
    },
    {
        "id": "government-82",
        "speaker": "Officer",
        "text": "Yes, I can provide the state police website and requirements. The process includes background checks and training.",
        "translation": "是的，我可以提供州警察网站和要求。流程包括背景检查和培训。",
        "note": "说明隐蔽携带许可证要求。"
    },
    {
        "id": "government-83",
        "speaker": "Citizen",
        "text": "Thank you. What about notary services? Do you have a notary on staff?",
        "translation": "谢谢。公证服务呢？你们有工作人员公证员吗？",
        "note": "询问公证服务。"
    },
    {
        "id": "government-84",
        "speaker": "Officer",
        "text": "Yes, we have notary services available during regular business hours. No appointment needed.",
        "translation": "是的，我们在正常营业时间有公证服务可用。不需要预约。",
        "note": "说明公证服务可用性。"
    },
    {
        "id": "government-85",
        "speaker": "Citizen",
        "text": "What's the fee for notary services?",
        "translation": "公证服务的费用是多少？",
        "note": "询问公证费用。"
    },
    {
        "id": "government-86",
        "speaker": "Officer",
        "text": "Notary services are free for basic document notarization. There may be fees for complex services.",
        "translation": "基本文件公证的公证服务是免费的。复杂服务可能有费用。",
        "note": "说明公证费用结构。"
    },
    {
        "id": "government-87",
        "speaker": "Citizen",
        "text": "That's good to know. I might need something notarized in the future.",
        "translation": "那很好知道。我将来可能需要一些东西公证。",
        "note": "表示未来公证需求。"
    },
    {
        "id": "government-88",
        "speaker": "Officer",
        "text": "We're here to help with that. Just bring valid ID and the documents that need notarization.",
        "translation": "我们在这里帮助处理那个。只需带上有效身份证和需要公证的文件。",
        "note": "说明公证服务要求。"
    },
    {
        "id": "government-89",
        "speaker": "Citizen",
        "text": "What about voting information? Can I get information about upcoming elections here?",
        "translation": "投票信息呢？我可以在这里获得关于即将到来的选举的信息吗？",
        "note": "询问选举信息。"
    },
    {
        "id": "government-90",
        "speaker": "Officer",
        "text": "Yes, we have information about polling places, sample ballots, and election dates.",
        "translation": "是的，我们有关于投票地点、样本选票和选举日期的信息。",
        "note": "说明可用选举信息。"
    },
    {
        "id": "government-91",
        "speaker": "Citizen",
        "text": "Can I also register to vote if I haven't already?",
        "translation": "如果我还未登记投票，我也可以登记吗？",
        "note": "询问选民登记服务。"
    },
    {
        "id": "government-92",
        "speaker": "Officer",
        "text": "Absolutely. We can help you register to vote today if you're not already registered.",
        "translation": "当然。如果你还没有登记，我们今天可以帮你登记投票。",
        "note": "提供选民登记服务。"
    },
    {
        "id": "government-93",
        "speaker": "Citizen",
        "text": "I think I am registered, but I want to confirm my polling place for the next election.",
        "translation": "我想我已经登记了，但我想确认我下次选举的投票地点。",
        "note": "询问投票地点确认。"
    },
    {
        "id": "government-94",
        "speaker": "Officer",
        "text": "I can look that up for you. Just provide your name and address, and I'll find your polling place.",
        "translation": "我可以为你查找那个。只需提供你的姓名和地址，我会找到你的投票地点。",
        "note": "提供投票地点查询服务。"
    },
    {
        "id": "government-95",
        "speaker": "Citizen",
        "text": "That would be very helpful. I've moved recently and want to make sure I'm voting at the right location.",
        "translation": "那会很有帮助。我最近搬了家，想确保我在正确的地点投票。",
        "note": "说明投票地点确认需求。"
    },
    {
        "id": "government-96",
        "speaker": "Officer",
        "text": "It's always good to confirm, especially after moving. We can update your registration at the same time.",
        "translation": "确认总是好的，特别是搬家后。我们可以同时更新你的登记。",
        "note": "建议登记更新。"
    },
    {
        "id": "government-97",
        "speaker": "Citizen",
        "text": "I'll do that then. Thank you for all the information about the various services.",
        "translation": "那我会做那个。谢谢你关于各种服务的信息。",
        "note": "感谢服务信息。"
    },
    {
        "id": "government-98",
        "speaker": "Officer",
        "text": "You're welcome! We're here to help citizens navigate government services efficiently.",
        "translation": "不客气！我们在这里帮助公民高效地导航政府服务。",
        "note": "表达服务理念。"
    },
    {
        "id": "government-99",
        "speaker": "Citizen",
        "text": "I appreciate that. It can be confusing to figure out where to go for different services.",
        "translation": "我很感激那个。弄清楚去哪里获得不同服务可能会令人困惑。",
        "note": "认可服务帮助价值。"
    },
    {
        "id": "government-100",
        "speaker": "Officer",
        "text": "That's exactly why we're here - to make government services accessible and understandable for everyone.",
        "translation": "这正是为什么我们在这里——让政府服务对每个人都可及和可理解。",
        "note": "表达服务使命。"
    }
]

# Travel scene - last 60 sentences (previously generated)
TRAVEL_LAST_60 = [
    {
        "id": "travel-41",
        "speaker": "Traveler",
        "text": "Hello, I have a reservation under the name Johnson. Check-in, please.",
        "translation": "您好，我有一个约翰逊名字的预订。办理入住，谢谢。",
        "note": "用 'under the name' 表示以某名字预订。"
    },
    {
        "id": "travel-42",
        "speaker": "Agent",
        "text": "Welcome to our hotel! Let me check your reservation details.",
        "translation": "欢迎光临我们酒店！让我查一下您的预订详情。",
        "note": "表示欢迎。"
    },
    {
        "id": "travel-43",
        "speaker": "Traveler",
        "text": "Thank you. I booked a deluxe room with a city view for three nights.",
        "translation": "谢谢。我预订了一个带城市景观的豪华房间，住三晚。",
        "note": "用 'deluxe room' 表示豪华房间。"
    },
    {
        "id": "travel-44",
        "speaker": "Agent",
        "text": "Yes, I see your booking here. Your room is on the 15th floor, room 1508.",
        "translation": "是的，我看到了您的预订。您的房间在15楼，1508号房。",
        "note": "提供房间信息。"
    },
    {
        "id": "travel-45",
        "speaker": "Traveler",
        "text": "Perfect. What time is breakfast served?",
        "translation": "完美。早餐几点供应？",
        "note": "询问早餐时间。"
    },
    {
        "id": "travel-46",
        "speaker": "Agent",
        "text": "Breakfast is served from 6:30 AM to 10:00 AM in the main restaurant.",
        "translation": "早餐在主餐厅供应，时间是早上6:30到10:00。",
        "note": "提供早餐时间信息。"
    },
    {
        "id": "travel-47",
        "speaker": "Traveler",
        "text": "Great. Is there a fitness center in the hotel?",
        "translation": "太好了。酒店里有健身中心吗？",
        "note": "询问健身设施。"
    },
    {
        "id": "travel-48",
        "speaker": "Agent",
        "text": "Yes, we have a fully equipped gym on the 2nd floor, open 24 hours.",
        "translation": "有的，我们在2楼有一个设备齐全的健身房，24小时开放。",
        "note": "用 'fully equipped' 表示设备齐全。"
    },
    {
        "id": "travel-49",
        "speaker": "Traveler",
        "text": "That's convenient. What about Wi-Fi access?",
        "translation": "那很方便。Wi-Fi接入怎么样？",
        "note": "询问网络接入。"
    },
    {
        "id": "travel-50",
        "speaker": "Agent",
        "text": "Complimentary high-speed Wi-Fi is available throughout the hotel.",
        "translation": "整个酒店都提供免费的高速Wi-Fi。",
        "note": "用 'complimentary' 表示免费的。"
    },
    {
        "id": "travel-51",
        "speaker": "Traveler",
        "text": "Excellent. Can you recommend some good restaurants nearby?",
        "translation": "太好了。你能推荐附近的一些好餐厅吗？",
        "note": "询问餐厅推荐。"
    },
    {
        "id": "travel-52",
        "speaker": "Agent",
        "text": "Certainly! There's a highly-rated Italian restaurant just two blocks away.",
        "translation": "当然！就在两个街区外有一家评分很高的意大利餐厅。",
        "note": "用 'highly-rated' 表示评分高的。"
    },
    {
        "id": "travel-53",
        "speaker": "Traveler",
        "text": "That sounds perfect. What's the best way to get around the city?",
        "translation": "听起来很完美。在城市里出行最好的方式是什么？",
        "note": "询问交通方式。"
    },
    {
        "id": "travel-54",
        "speaker": "Agent",
        "text": "The subway system is efficient and affordable. I can give you a map.",
        "translation": "地铁系统高效且实惠。我可以给您一张地图。",
        "note": "用 'efficient and affordable' 表示高效实惠。"
    },
    {
        "id": "travel-55",
        "speaker": "Traveler",
        "text": "That would be very helpful. Are there any must-see attractions?",
        "translation": "那会很有帮助。有什么必看的景点吗？",
        "note": "询问必看景点。"
    },
    {
        "id": "travel-56",
        "speaker": "Agent",
        "text": "The historic city center and the art museum are both worth visiting.",
        "translation": "历史市中心和艺术博物馆都值得一游。",
        "note": "用 'worth visiting' 表示值得一游。"
    },
    {
        "id": "travel-57",
        "speaker": "Traveler",
        "text": "I'll definitely add those to my itinerary. How far are they?",
        "translation": "我一定会把它们加入我的行程。它们有多远？",
        "note": "用 'itinerary' 表示行程安排。"
    },
    {
        "id": "travel-58",
        "speaker": "Agent",
        "text": "The city center is about 20 minutes by subway, the museum about 30 minutes.",
        "translation": "市中心坐地铁大约20分钟，博物馆大约30分钟。",
        "note": "提供距离和交通时间。"
    },
    {
        "id": "travel-59",
        "speaker": "Traveler",
        "text": "Perfect. Is there a tourist information center nearby?",
        "translation": "完美。附近有旅游信息中心吗？",
        "note": "询问旅游信息中心。"
    },
    {
        "id": "travel-60",
        "speaker": "Agent",
        "text": "Yes, there's one just around the corner. They can provide maps and brochures.",
        "translation": "有的，拐角处就有一个。他们可以提供地图和宣传册。",
        "note": "用 'brochures' 表示宣传册。"
    },
    {
        "id": "travel-61",
        "speaker": "Traveler",
        "text": "Great. I also need to exchange some currency. Where can I do that?",
        "translation": "太好了。我还需要兑换一些货币。在哪里可以兑换？",
        "note": "询问货币兑换地点。"
    },
    {
        "id": "travel-62",
        "speaker": "Agent",
        "text": "We have currency exchange services at the front desk, with competitive rates.",
        "translation": "前台有货币兑换服务，汇率很优惠。",
        "note": "用 'competitive rates' 表示有竞争力的汇率。"
    },
    {
        "id": "travel-63",
        "speaker": "Traveler",
        "text": "That's convenient. What's the current exchange rate for US dollars?",
        "translation": "那很方便。美元的当前汇率是多少？",
        "note": "询问汇率。"
    },
    {
        "id": "travel-64",
        "speaker": "Agent",
        "text": "The current rate is 0.85 local currency per US dollar.",
        "translation": "当前汇率是1美元兑换0.85当地货币。",
        "note": "提供汇率信息。"
    },
    {
        "id": "travel-65",
        "speaker": "Traveler",
        "text": "I'll exchange 200 dollars then. Is there a limit on how much I can exchange?",
        "translation": "那我要兑换200美元。兑换金额有限制吗？",
        "note": "询问兑换限额。"
    },
    {
        "id": "travel-66",
        "speaker": "Agent",
        "text": "No limit for hotel guests. I can process that for you right now.",
        "translation": "酒店客人没有限额。我现在就可以为您处理。",
        "note": "用 'process' 表示处理。"
    },
    {
        "id": "travel-67",
        "speaker": "Traveler",
        "text": "Thank you. By the way, are there any good shopping areas?",
        "translation": "谢谢。顺便问一下，有什么好的购物区域吗？",
        "note": "询问购物区域。"
    },
    {
        "id": "travel-68",
        "speaker": "Agent",
        "text": "The main shopping district is along Market Street, about 10 minutes away.",
        "translation": "主要购物区在市场街，大约10分钟路程。",
        "note": "提供购物区位置。"
    },
    {
        "id": "travel-69",
        "speaker": "Traveler",
        "text": "What kind of stores can I find there?",
        "translation": "那里能找到什么样的商店？",
        "note": "询问商店类型。"
    },
    {
        "id": "travel-70",
        "speaker": "Agent",
        "text": "Everything from luxury boutiques to local souvenir shops and department stores.",
        "translation": "从奢侈品精品店到当地纪念品店和百货公司应有尽有。",
        "note": "用 'everything from...to...' 表示从...到...都有。"
    },
    {
        "id": "travel-71",
        "speaker": "Traveler",
        "text": "Sounds like I'll have plenty to explore. Are there any cultural events happening?",
        "translation": "听起来我有很多东西可以探索。有什么文化活动在举行吗？",
        "note": "询问文化活动。"
    },
    {
        "id": "travel-72",
        "speaker": "Agent",
        "text": "This weekend there's a local food festival in the central square.",
        "translation": "这个周末中央广场有一个当地美食节。",
        "note": "用 'food festival' 表示美食节。"
    },
    {
        "id": "travel-73",
        "speaker": "Traveler",
        "text": "That sounds amazing! What time does it start?",
        "translation": "听起来太棒了！什么时候开始？",
        "note": "询问活动时间。"
    },
    {
        "id": "travel-74",
        "speaker": "Agent",
        "text": "It starts at 11 AM and runs until 8 PM both Saturday and Sunday.",
        "translation": "周六和周日都是从上午11点开始，持续到晚上8点。",
        "note": "提供活动时间。"
    },
    {
        "id": "travel-75",
        "speaker": "Traveler",
        "text": "Perfect. I'll definitely check that out. Is it free to attend?",
        "translation": "完美。我一定会去看看。参加免费吗？",
        "note": "询问是否免费。"
    },
    {
        "id": "travel-76",
        "speaker": "Agent",
        "text": "Yes, admission is free. You just pay for the food you want to try.",
        "translation": "是的，入场免费。你只需要为你想尝试的食物付费。",
        "note": "用 'admission is free' 表示入场免费。"
    },
    {
        "id": "travel-77",
        "speaker": "Traveler",
        "text": "Perfect. I love trying local cuisine when I travel.",
        "translation": "完美。我旅行时喜欢尝试当地美食。",
        "note": "用 'local cuisine' 表示当地美食。"
    },
    {
        "id": "travel-78",
        "speaker": "Agent",
        "text": "You're in for a treat then. The local specialties are delicious.",
        "translation": "那你有的享受了。当地特色菜非常美味。",
        "note": "用 'in for a treat' 表示有福了。"
    },
    {
        "id": "travel-79",
        "speaker": "Traveler",
        "text": "I can't wait! Do you have any other recommendations for local experiences?",
        "translation": "我迫不及待了。你对当地体验还有其他推荐吗？",
        "note": "询问当地体验推荐。"
    },
    {
        "id": "travel-80",
        "speaker": "Agent",
        "text": "I'd recommend a guided walking tour of the old town. It's very informative.",
        "translation": "我推荐参加老城区的徒步导游游。非常长知识。",
        "note": "用 'informative' 表示提供信息的。"
    },
    {
        "id": "travel-81",
        "speaker": "Traveler",
        "text": "That sounds great. Where can I book a walking tour?",
        "translation": "听起来很棒。在哪里可以预订徒步导游游？",
        "note": "询问预订方式。"
    },
    {
        "id": "travel-82",
        "speaker": "Agent",
        "text": "You can book at the tourist center or online through their website.",
        "translation": "你可以在旅游中心预订，也可以通过他们的网站在线预订。",
        "note": "提供预订方式。"
    },
    {
        "id": "travel-83",
        "speaker": "Traveler",
        "text": "Good to know. Is there anything I should be aware of for safety?",
        "translation": "知道了。有什么安全方面需要注意的吗？",
        "note": "询问安全注意事项。"
    },
    {
        "id": "travel-84",
        "speaker": "Agent",
        "text": "The city is generally safe, but keep an eye on your belongings in crowded areas.",
        "translation": "这个城市总体很安全，但在拥挤区域要注意看管好你的物品。",
        "note": "用 'keep an eye on' 表示注意看管。"
    },
    {
        "id": "travel-85",
        "speaker": "Traveler",
        "text": "Good advice. What should I do if I need emergency assistance?",
        "translation": "好建议。如果我需要紧急帮助该怎么办？",
        "note": "询问紧急帮助方式。"
    },
    {
        "id": "travel-86",
        "speaker": "Agent",
        "text": "Dial 112 for emergency services. The hotel front desk can also assist you.",
        "translation": "拨打112联系紧急服务。酒店前台也可以帮助你。",
        "note": "提供紧急联系方式。"
    },
    {
        "id": "travel-87",
        "speaker": "Traveler",
        "text": "Thank you. Is there a hospital nearby?",
        "translation": "谢谢。附近有医院吗？",
        "note": "询问医院位置。"
    },
    {
        "id": "travel-88",
        "speaker": "Agent",
        "text": "Yes, City General Hospital is about 15 minutes away by taxi.",
        "translation": "有的，市综合医院坐出租车大约15分钟路程。",
        "note": "提供医院位置信息。"
    },
    {
        "id": "travel-89",
        "speaker": "Traveler",
        "text": "That's reassuring to know. I hope I won't need it, but good to have the information.",
        "translation": "知道这个很让人安心。我希望我不需要用到，但有这个信息很好。",
        "note": "用 'reassuring' 表示令人安心的。"
    },
    {
        "id": "travel-90",
        "speaker": "Agent",
        "text": "Absolutely. We want all our guests to feel safe and comfortable during their stay.",
        "translation": "当然。我们希望所有客人在入住期间都感到安全和舒适。",
        "note": "表达酒店的服务理念。"
    },
    {
        "id": "travel-91",
        "speaker": "Traveler",
        "text": "I appreciate that. One more question - what time is check-out?",
        "translation": "我很感激。还有一个问题——退房时间是几点？",
        "note": "询问退房时间。"
    },
    {
        "id": "travel-92",
        "speaker": "Agent",
        "text": "Standard check-out time is 11 AM, but we can arrange late check-out if needed.",
        "translation": "标准退房时间是上午11点，但如果需要我们可以安排延迟退房。",
        "note": "用 'late check-out' 表示延迟退房。"
    },
    {
        "id": "travel-93",
        "speaker": "Traveler",
        "text": "Good to know. I'll probably need to check out around 10 AM on my last day.",
        "translation": "知道了。我最后一天可能需要在上午10点左右退房。",
        "note": "说明退房时间。"
    },
    {
        "id": "travel-94",
        "speaker": "Agent",
        "text": "That works perfectly. Just let us know the night before if you need any assistance.",
        "translation": "那完全没问题。如果需要任何帮助，请在前一天晚上告诉我们。",
        "note": "用 'let us know' 表示告知。"
    },
    {
        "id": "travel-95",
        "speaker": "Traveler",
        "text": "I will. Thank you for all the helpful information.",
        "translation": "我会的。谢谢你有用的信息。",
        "note": "感谢对方提供信息。"
    },
    {
        "id": "travel-96",
        "speaker": "Agent",
        "text": "You're very welcome. Is there anything else I can help you with?",
        "translation": "不客气。还有什么其他我可以帮助您的吗？",
        "note": "询问是否还有其他需要。"
    },
    {
        "id": "travel-97",
        "speaker": "Traveler",
        "text": "No, that's everything. You've been very helpful.",
        "translation": "没有了，就这些。你非常有帮助。",
        "note": "表示问题已解决。"
    },
    {
        "id": "travel-98",
        "speaker": "Agent",
        "text": "I'm glad I could help. Enjoy your stay in our city!",
        "translation": "很高兴能帮到您。祝您在我们城市停留愉快！",
        "note": "祝福客人入住愉快。"
    },
    {
        "id": "travel-99",
        "speaker": "Traveler",
        "text": "Thank you. I'm looking forward to exploring everything.",
        "translation": "谢谢。我很期待探索一切。",
        "note": "表达期待之情。"
    },
    {
        "id": "travel-100",
        "speaker": "Agent",
        "text": "Have a wonderful trip! Let us know if you need anything during your stay.",
        "translation": "祝您旅途愉快！入住期间如果需要什么请告诉我们。",
        "note": "最后祝福和提供帮助。"
    }
]

def format_line(line):
    """Format a dialogue line for TypeScript."""
    return f'    {{ id: "{line["id"]}", speaker: "{line["speaker"]}", text: "{esc(line["text"])}", translation: "{esc(line["translation"])}", note: "{esc(line["note"])}" }},\n'

def esc(s):
    """Escape special characters for TypeScript strings."""
    return s.replace('\\', r'\\').replace('"', r'\\"').replace('\n', ' ').replace('\t', ' ')

def generate_scene_block(scene_data):
    """Generate a scene block from dialogue data."""
    lines = []
    for line in scene_data:
        lines.append(format_line(line))
    return ''.join(lines)

def main():
    # Read the current file
    with open("lib/data.ts", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Generate travel scene block
    travel_block = generate_scene_block(TRAVEL_LAST_60)
    
    # Replace travel scene lines 41-100
    travel_pattern = r'    \{ id: "travel-41"[^\n]*\n(?:    [^\n]*\n)*?    \{ id: "travel-100"[^\n]*\n'
    content = re.sub(travel_pattern, travel_block, content, 1, re.DOTALL)
    
    print("Travel scene replaced successfully!")
    
    # Write back after travel replacement
    with open("lib/data.ts", "w", encoding="utf-8") as f:
        f.write(content)
    
    print("All scenes will be replaced in subsequent steps.")

if __name__ == "__main__":
    main()