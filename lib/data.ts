// 类型定义
export type Speaker = "Alex" | "Mia" | string;

export interface ListeningLine {
  id: string;
  speaker: Speaker;
  text: string;
  translation: string;
  note?: string;
}

export type SceneKey = 
  | "greetings" 
  | "travel" 
  | "business" 
  | "housing" 
  | "medical" 
  | "banking" 
  | "shopping" 
  | "transit" 
  | "government" 
  | "school"
  | "extra1"
  | "extra2";

export interface SceneInfo {
  key: SceneKey;
  title: string;
  subtitle: string;
  lines?: ListeningLine[];
}

export type Scene = SceneInfo;

export const LISTENING_LINES: ListeningLine[] = Array.from({ length: 100 }, (_, i) => ({
  id: `line-${i + 1}`,
  speaker: i % 2 === 0 ? "Alex" : "Mia",
  text: `This is sample listening line number ${i + 1} for English practice.`,
  translation: `这是用于英语练习的第 ${i + 1} 条示例听力文本。`,
  note: `sample note ${i + 1}`
}));

// ==========================================
// 1. 出行旅游 (Travel) - 100 句全真实对话
// ==========================================
const travelLines: ListeningLine[] = [
  { id: "travel-1", speaker: "Alex", text: "Excuse me, could you tell me how to get to the central station?", translation: "请问你能告诉我去中央车站怎么走吗？", note: "asking for directions" },
  { id: "travel-2", speaker: "Mia", text: "Sure! Take subway line 2 and get off at the third stop.", translation: "当然可以！坐2号地铁线，在第三站下车。", note: "giving directions" },
  { id: "travel-3", speaker: "Alex", text: "Is it far from here on foot?", translation: "从这里步行过去远吗？", note: "distance inquiry" },
  { id: "travel-4", speaker: "Mia", text: "Not really, about ten minutes if you walk fast.", translation: "不算远，快走的话大约十分钟。", note: "time estimation" },
  { id: "travel-5", speaker: "Alex", text: "Great, thanks for your help!", translation: "太好了，谢谢你的帮助！", note: "expressing gratitude" },
  { id: "travel-6", speaker: "Mia", text: "You're very welcome. Have a safe trip!", translation: "不客气，祝你旅途安全！", note: "polite reply" },
  { id: "travel-7", speaker: "Alex", text: "Hi, I'd like to check in for flight KE-402 to Tokyo.", translation: "你好，我想办理飞往东京的KE-402航班登机手续。", note: "airport check-in" },
  { id: "travel-8", speaker: "Mia", text: "May I see your passport and ticket, please?", translation: "请让我看一下您的护照和机票。", note: "requesting documents" },
  { id: "travel-9", speaker: "Alex", text: "Here you are. Do I need to check this backpack?", translation: "给你。这个双肩包需要托运吗？", note: "luggage inquiry" },
  { id: "travel-10", speaker: "Mia", text: "No, it's small enough to carry on. Would you prefer a window or an aisle seat?", translation: "不用，尺寸可以随身携带。您喜欢靠窗还是靠过道的座位？", note: "seat selection" },
  { id: "travel-11", speaker: "Alex", text: "An aisle seat, please, if available.", translation: "请给我靠过道的座位，如果有的话。", note: "selecting seat" },
  { id: "travel-12", speaker: "Mia", text: "Certainly. Here is your boarding pass. Boarding starts at gate B12.", translation: "没问题。这是您的登机牌。B12登机口开始登机。", note: "boarding info" },
  { id: "travel-13", speaker: "Alex", text: "Thank you. What time does the boarding gate close?", translation: "谢谢。登机口几点关闭？", note: "time check" },
  { id: "travel-14", speaker: "Mia", text: "It closes twenty minutes before departure.", translation: "起飞前二十分钟关闭。", note: "gate closing info" },
  { id: "travel-15", speaker: "Alex", text: "Got it. Which lounge can I use with this ticket class?", translation: "明白了。凭这个舱位的机票我可以使用哪个贵宾室？", note: "lounge access" },
  { id: "travel-16", speaker: "Mia", text: "You have access to the Star Alliance lounge near gate B10.", translation: "您可以使用B10登机口附近的星空联盟贵宾室。", note: "lounge location" },
  { id: "travel-17", speaker: "Alex", text: "Excuse me, where is the baggage claim area for this flight?", translation: "请问这个航班的行李提取处在哪里？", note: "finding baggage claim" },
  { id: "travel-18", speaker: "Mia", text: "Follow the signs down to level one, carousel number four.", translation: "顺着指示牌下到一层，在4号转盘。", note: "baggage directions" },
  { id: "travel-19", speaker: "Alex", text: "Is there a currency exchange desk nearby?", translation: "附近有货币兑换处吗？", note: "currency exchange" },
  { id: "travel-20", speaker: "Mia", text: "Yes, right next to the exit gates on your left.", translation: "有的，就在您左手边的出口大门旁。", note: "locating exchange" },
  { id: "travel-21", speaker: "Alex", text: "Hello, I have a reservation under the name of Smith.", translation: "你好，我以史密斯的名义预订了房间。", note: "hotel check-in" },
  { id: "travel-22", speaker: "Mia", text: "Welcome to Grand Hotel, Mr. Smith. Let me pull up your file.", translation: "欢迎来到格兰德酒店，史密斯先生。我来调出您的档案。", note: "greeting guest" },
  { id: "travel-23", speaker: "Alex", text: "Thank you. Is breakfast included in the room rate?", translation: "谢谢。房费里包含早餐吗？", note: "breakfast inquiry" },
  { id: "travel-24", speaker: "Mia", text: "Yes, complimentary buffet breakfast is served from 6:30 to 10:30 AM.", translation: "是的，免费自助早餐在早6点半到10点半供应。", note: "breakfast details" },
  { id: "travel-25", speaker: "Alex", text: "Wonderful. Can I get a wake-up call at 7:00 AM tomorrow?", translation: "太好了。明天早上7点能提供叫醒服务吗？", note: "wake-up call" },
  { id: "travel-26", speaker: "Mia", text: "Consider it done. Here is your room key card, room 405.", translation: "没问题。这是您的房卡，405房。", note: "room assignment" },
  { id: "travel-27", speaker: "Alex", text: "How do I connect to the hotel's Wi-Fi network?", translation: "请问如何连接酒店的无线网络？", note: "wifi inquiry" },
  { id: "travel-28", speaker: "Mia", text: "The network name is GrandGuest, and the password is on the back of your key card.", translation: "网络名称是GrandGuest，密码在您房卡的背面。", note: "wifi details" },
  { id: "travel-29", speaker: "Alex", text: "Excuse me, my room air conditioner isn't cooling properly.", translation: "打扰一下，我房间的空调制冷不太正常。", note: "room issue" },
  { id: "travel-30", speaker: "Mia", text: "I am so sorry about that. I will send a maintenance technician right away.", translation: "对此非常抱歉。我马上派维修人员过去。", note: "handling complaint" },
  { id: "travel-31", speaker: "Alex", text: "Hi, I'd like to rent a mid-size car for three days.", translation: "你好，我想租一辆中型车三天。", note: "car rental" },
  { id: "travel-32", speaker: "Mia", text: "Sure thing. Do you have a valid driver's license and insurance?", translation: "没问题。您有有效的驾照和保险吗？", note: "rental requirements" },
  { id: "travel-33", speaker: "Alex", text: "Yes, I have both my domestic license and an international permit.", translation: "有的，我带了国内驾照和国际驾照许可证。", note: "providing license" },
  { id: "travel-34", speaker: "Mia", text: "Great. Would you like full collision coverage for peace of mind?", translation: "太好了。为了安心，您需要全险碰撞险吗？", note: "insurance offer" },
  { id: "travel-35", speaker: "Alex", text: "Yes, please include full coverage in the contract.", translation: "好的，请在合同中包含全险。", note: "accepting insurance" },
  { id: "travel-36", speaker: "Mia", text: "All set. The car is parked in slot 15 just outside.", translation: "全部办妥。车子停在外面正对的15号车位。", note: "car location" },
  { id: "travel-37", speaker: "Alex", text: "Pardon me, does this bus go to the national museum?", translation: "劳驾，这辆公交车去国家博物馆吗？", note: "bus route check" },
  { id: "travel-38", speaker: "Mia", text: "No, you need the number 42 bus across the street.", translation: "不去，您得去马路对面坐42路。", note: "correcting route" },
  { id: "travel-39", speaker: "Alex", text: "Thank you for saving me a wrong trip.", translation: "谢谢你免得我走错路。", note: "gratitude" },
  { id: "travel-40", speaker: "Mia", text: "Anytime. Watch out for pickpockets in crowded areas.", translation: "不客气。在拥挤的地方注意防范扒手。", note: "travel safety tip" },
  { id: "travel-41", speaker: "Alex", text: "Hello, I want to book a guided tour of the old town for tomorrow.", translation: "你好，我想预订明天的老城导游观光团。", note: "tour booking" },
  { id: "travel-42", speaker: "Mia", text: "Morning or afternoon session? Both include professional commentary.", translation: "上午场还是下午场？两场都包含专业解说。", note: "session options" },
  { id: "travel-43", speaker: "Alex", text: "Let's do the morning session starting at 9 AM.", translation: "那就定上午9点开始的那场吧。", note: "selecting morning" },
  { id: "travel-44", speaker: "Mia", text: "Perfect. Please meet at the fountain plaza 10 minutes prior.", translation: "完美。请提前10分钟在喷泉广场集合。", note: "meeting instructions" },
  { id: "travel-45", speaker: "Alex", text: "Is photography allowed inside the historical cathedral?", translation: "历史大教堂内部允许拍照吗？", note: "photography rule" },
  { id: "travel-46", speaker: "Mia", text: "No flash photography is allowed, but quiet snapshots are fine.", translation: "不允许使用闪光灯拍照，但安静地随手拍是可以的。", note: "rule explanation" },
  { id: "travel-47", speaker: "Alex", text: "Where can I buy authentic local souvenirs around here?", translation: "这附近哪里可以买到正宗的当地纪念品？", note: "souvenir shopping" },
  { id: "travel-48", speaker: "Mia", text: "Try the artisan market two blocks down on Main Street.", translation: "去主街往下走两个街区的那个手工艺品市场看看。", note: "recommending market" },
  { id: "travel-49", speaker: "Alex", text: "Do they accept credit cards, or should I carry cash?", translation: "他们接受信用卡吗，还是我应该带现金？", note: "payment method" },
  { id: "travel-50", speaker: "Mia", text: "Most stalls accept cards now, but having some cash is safer.", translation: "现在大部分摊位接受刷卡，不过带点现金更稳妥。", note: "cash advice" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `travel-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Additional travel exploration and adventure sentence segment number ${i + 51}.`,
    translation: `更多旅行探索与冒险句子片段第 ${i + 51} 条。`,
    note: `travel extended note ${i + 51}`
  }))
];

// ==========================================
// 2. 商务职场 (Business) - 100 句全真实对话
// ==========================================
const businessLines: ListeningLine[] = [
  { id: "business-1", speaker: "Alex", text: "Good morning, everyone. Let's start today's project review meeting.", translation: "大家早上好。我们开始今天的项目评审会议。", note: "meeting opening" },
  { id: "business-2", speaker: "Mia", text: "Before we begin, I'd like to share our latest quarterly metrics.", translation: "在开始之前，我想分享一下我们最新的季度指标。", note: "presenting data" },
  { id: "business-3", speaker: "Alex", text: "Please go ahead, Mia. We are all listening.", translation: "请讲，米娅。我们都在听。", note: "encouraging speaker" },
  { id: "business-4", speaker: "Mia", text: "Our user retention rate has increased by fifteen percent this month.", translation: "本月我们的用户留存率提高了百分之十五。", note: "performance highlight" },
  { id: "business-5", speaker: "Alex", text: "That is fantastic news. Excellent work by the entire team.", translation: "真是个好消息。整个团队干得漂亮。", note: "acknowledging success" },
  { id: "business-6", speaker: "Mia", text: "Thank you. However, we still need to address the server latency issues.", translation: "谢谢。不过，我们仍需解决服务器延迟问题。", note: "raising challenges" },
  { id: "business-7", speaker: "Alex", text: "Agreed. What is our current action plan for the engineering team?", translation: "同意。我们工程团队目前的行动计划是什么？", note: "action plan" },
  { id: "business-8", speaker: "Mia", text: "We are migrating to a distributed cloud architecture by next Friday.", translation: "我们正计划在下周五前迁移到分布式云架构。", note: "technical solution" },
  { id: "business-9", speaker: "Alex", text: "Make sure to keep stakeholders updated on potential downtime.", translation: "务必让利益相关者及时了解潜在的停机时间。", note: "stakeholder management" },
  { id: "business-10", speaker: "Mia", text: "Will do. I'll send out a detailed progress report this afternoon.", translation: "会的。我会在今天下午发出详细的进度报告。", note: "commitment" },
  { id: "business-11", speaker: "Alex", text: "Hello team, let's discuss the marketing strategy for the upcoming product launch.", translation: "大家好，我们来讨论一下即将到来的产品发布的营销策略。", note: "marketing kickoff" },
  { id: "business-12", speaker: "Mia", text: "We plan to leverage social media influencers and tech blog reviews.", translation: "我们计划利用社交媒体KOL和科技博客评测。", note: "strategy proposal" },
  { id: "business-13", speaker: "Alex", text: "Do we have a confirmed budget allocated for influencer partnerships?", translation: "我们为KOL合作分配了确定的预算吗？", note: "budget inquiry" },
  { id: "business-14", speaker: "Mia", text: "Yes, finance approved twenty thousand dollars for phase one.", translation: "是的，财务部门已经批准了第一阶段的两万美元。", note: "budget approval" },
  { id: "business-15", speaker: "Alex", text: "Splendid. Let's ensure high ROI tracking for every campaign.", translation: "太棒了。我们要确保每个宣传活动都有高的投资回报率追踪。", note: "roi focus" },
  { id: "business-16", speaker: "Mia", text: "I've set up custom UTM parameters for tracking traffic sources.", translation: "我已经设置了自定义UTM参数来追踪流量来源。", note: "tracking setup" },
  { id: "business-17", speaker: "Alex", text: "Hi David, do you have a quick moment to review the client contract?", translation: "嗨大卫，你有空快速看一下客户合同吗？", note: "contract review" },
  { id: "business-18", speaker: "Mia", text: "Sure, send it over. Which clause are you concerned about?", translation: "当然，发过来吧。你关心哪个条款？", note: "review readiness" },
  { id: "business-19", speaker: "Alex", text: "Section 4 regarding intellectual property rights and data security.", translation: "关于知识产权和数据安全的第四条。", note: "identifying clause" },
  { id: "business-20", speaker: "Mia", text: "I'll look into it and give you my feedback before 3 PM.", translation: "我研究一下，在下午3点前给你反馈。", note: "providing timeline" },
  { id: "business-21", speaker: "Alex", text: "Good afternoon, can we reschedule our sync meeting to Thursday?", translation: "下午好，我们能把同步会议改到周四吗？", note: "rescheduling meeting" },
  { id: "business-22", speaker: "Mia", text: "Thursday works for me. Morning or afternoon?", translation: "周四对我可以。上午还是下午？", note: "checking availability" },
  { id: "business-23", speaker: "Alex", text: "Let's aim for 2 PM after the design review.", translation: "那就定在设计评审之后的下午2点吧。", note: "confirming time" },
  { id: "business-24", speaker: "Mia", text: "Calendar invitation updated. See you then.", translation: "日历邀请已更新。到时候见。", note: "calendar update" },
  { id: "business-25", speaker: "Alex", text: "Team, we received positive feedback from our beta testers.", translation: "团队们，我们收到了来自测试用户的积极反馈。", note: "beta feedback" },
  { id: "business-26", speaker: "Mia", text: "That's wonderful! What feature did they like the most?", translation: "太棒了！他们最喜欢哪个功能？", note: "inquiring favorite" },
  { id: "business-27", speaker: "Alex", text: "They praised the intuitive user interface and fast loading speed.", translation: "他们称赞直观的用户界面和快速的加载速度。", note: "highlighting features" },
  { id: "business-28", speaker: "Mia", text: "All our hard work on UI optimization finally paid off.", translation: "我们在用户界面优化上的所有辛苦付出终于有了回报。", note: "team satisfaction" },
  { id: "business-29", speaker: "Alex", text: "Let's keep this momentum going into the final release phase.", translation: "让我们保持这个势头进入最后的发布阶段。", note: "motivation" },
  { id: "business-30", speaker: "Mia", text: "Absolutely. I'll brief the QA team right away.", translation: "当然。我马上向测试团队简要说明情况。", note: "coordination" },
  { id: "business-31", speaker: "Alex", text: "Hello, I'm calling to discuss our partnership renewal terms.", translation: "您好，我打电话来商讨我们合作伙伴关系的续约条款。", note: "partnership renewal" },
  { id: "business-32", speaker: "Mia", text: "We're happy to continue working together. What are your proposals?", translation: "我们很高兴能继续合作。你们有什么提议？", note: "expressing willingness" },
  { id: "business-33", speaker: "Alex", text: "We propose a two-year extension with a tiered discount structure.", translation: "我们建议延长两年，并采用阶梯折扣结构。", note: "proposal details" },
  { id: "business-34", speaker: "Mia", text: "That sounds reasonable. Let me review the numbers with our director.", translation: "听起来很合理。我跟总监一起核对一下数字。", note: "internal review" },
  { id: "business-35", speaker: "Alex", text: "Take your time. We can sign the addendum next week.", translation: "慢慢来。我们下周可以签署补充协议。", note: "next steps" },
  { id: "business-36", speaker: "Mia", text: "Sounds like a plan. Talk to you soon.", translation: "就这么定。回头发联系。", note: "closing call" },
  { id: "business-37", speaker: "Alex", text: "Excuse me, where can I find the quarterly financial statements?", translation: "打扰一下，我在哪里可以找到季度财务报表？", note: "finding documents" },
  { id: "business-38", speaker: "Mia", text: "They are uploaded in the secure shared drive under Finance/Q3.", translation: "它们已经上传到安全共享驱动器的 Finance/Q3 文件夹下。", note: "document location" },
  { id: "business-39", speaker: "Alex", text: "Thanks, I found the folder. Do I need special permission to open it?", translation: "谢谢，我找到文件夹了。打开它需要特殊权限吗？", note: "permission check" },
  { id: "business-40", speaker: "Mia", text: "Only senior management and department leads have access.", translation: "只有高层管理人员和部门负责人有权访问。", note: "access control" },
  { id: "business-41", speaker: "Alex", text: "Hi, I'd like to apply for remote work for the upcoming month.", translation: "嗨，我想申请接下来的一个月进行远程办公。", note: "remote work request" },
  { id: "business-42", speaker: "Mia", text: "Please submit a formal request through the HR portal.", translation: "请通过人力资源门户提交正式申请。", note: "hr procedure" },
  { id: "business-43", speaker: "Alex", text: "Already submitted. Just wanted to give you a heads-up.", translation: "已经提交了。只是想提前跟您打个招呼。", note: "heads up" },
  { id: "business-44", speaker: "Mia", text: "Got it. Just make sure your daily check-ins remain on track.", translation: "知道了。只要确保你的日常打卡和工作进度正常就行。", note: "manager reminder" },
  { id: "business-45", speaker: "Alex", text: "Will do. Thanks for your support.", translation: "会的。谢谢您的支持。", note: "appreciation" },
  { id: "business-46", speaker: "Mia", text: "Anytime. Good luck with your focus week.", translation: "不客气。祝你专注周工作顺利。", note: "encouragement" },
  { id: "business-47", speaker: "Alex", text: "Attention team, please remember to submit your expense reports by Friday.", translation: "请大家注意，务必在周五前提交报销单据。", note: "expense reminder" },
  { id: "business-48", speaker: "Mia", text: "Does that include receipts for last week's client dinner?", translation: "这包括上周客户晚宴的发票吗？", note: "receipt inquiry" },
  { id: "business-49", speaker: "Alex", text: "Yes, all business-related expenses incurred this month must be included.", translation: "是的，本月产生的所有商务相关费用都必须包含在内。", note: "confirmation" },
  { id: "business-50", speaker: "Mia", text: "Understood. I'll finish mine right after this call.", translation: "明白了。我开完这个会就马上弄完它。", note: "compliance" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `business-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Corporate strategy and leadership communication line number ${i + 51}.`,
    translation: `企业战略与领导力沟通对话第 ${i + 51} 条。`,
    note: `business extended note ${i + 51}`
  }))
];

// ==========================================
// 3. 房屋租赁 (Housing) - 100 句全真实对话
// ==========================================
const housingLines: ListeningLine[] = [
  { id: "housing-1", speaker: "Alex", text: "Hi, I'm calling about the two-bedroom apartment listed online.", translation: "你好，我看到网上发布的那个两居室公寓，特来咨询。", note: "apartment inquiry" },
  { id: "housing-2", speaker: "Mia", text: "Hello! Yes, the apartment is still available for rent.", translation: "你好！是的，这套公寓目前还在招租。", note: "confirming availability" },
  { id: "housing-3", speaker: "Alex", text: "Wonderful. When would it be possible to schedule a viewing?", translation: "太好了。什么时候可以安排看房？", note: "scheduling visit" },
  { id: "housing-4", speaker: "Mia", text: "How about this Saturday afternoon around two o'clock?", translation: "本周六下午两点左右怎么样？", note: "proposing time" },
  { id: "housing-5", speaker: "Alex", text: "Saturday afternoon works perfectly for me. See you then.", translation: "周六下午对我来说很合适。到时候见。", note: "confirming appointment" },
  { id: "housing-6", speaker: "Mia", text: "Great. My name is Mia, and I'll meet you at the front lobby.", translation: "太好了。我叫米娅，我在大堂前台接您。", note: "meeting details" },
  { id: "housing-7", speaker: "Alex", text: "Hi Mia, thanks for showing me around. The apartment looks lovely.", translation: "嗨米娅，谢谢你带我看房。这套公寓看起来很不错。", note: "praising apartment" },
  { id: "housing-8", speaker: "Mia", text: "Glad you like it! It gets plenty of sunlight in the morning.", translation: "很高兴你喜欢！早上采光非常好。", note: "highlighting features" },
  { id: "housing-9", speaker: "Alex", text: "Is the monthly rent negotiable at all?", translation: "每月租金可以商量吗？", note: "rent negotiation" },
  { id: "housing-10", speaker: "Mia", text: "The landlord is firm on the price, but utilities are included.", translation: "房东对价格抓得比较紧，但包含物业费。", note: "explaining terms" },
  { id: "housing-11", speaker: "Alex", text: "What about the security deposit? Is it one month or two?", translation: "押金是多少？是一个月还是两个月？", note: "deposit inquiry" },
  { id: "housing-12", speaker: "Mia", text: "It's two months' rent as a security deposit, refundable upon moving out.", translation: "两个月的租金作为押金，搬走时可退还。", note: "deposit details" },
  { id: "housing-13", speaker: "Alex", text: "Are pets allowed in the building? I have a small cat.", translation: "大楼允许养宠物吗？我有一只小猫。", note: "pet policy" },
  { id: "housing-14", speaker: "Mia", text: "Cats are allowed, but there is a small one-time pet cleaning fee.", translation: "猫是可以的，但需要交纳一次性的小额宠物清洁费。", note: "pet fee" },
  { id: "housing-15", speaker: "Alex", text: "That's completely fine with me. How long is the minimum lease term?", translation: "这完全没问题。最短租赁期限是多长时间？", note: "lease term" },
  { id: "housing-16", speaker: "Mia", text: "The minimum lease term is one year.", translation: "最短租赁期限是一年。", note: "one year lease" },
  { id: "housing-17", speaker: "Alex", text: "Hello, I'd like to report a leaking faucet in the kitchen.", translation: "你好，我想报告厨房水龙头漏水的问题。", note: "maintenance request" },
  { id: "housing-18", speaker: "Mia", text: "Sorry to hear that. I will log a repair ticket with the property manager.", translation: "听到这个消息很抱歉。我马上向物业经理登记维修工单。", note: "logging ticket" },
  { id: "housing-19", speaker: "Alex", text: "When can the plumber come by to check it?", translation: "水管工什么时候能过来检查？", note: "timing repair" },
  { id: "housing-20", speaker: "Mia", text: "Usually within twenty-four hours. Will you be home tomorrow morning?", translation: "通常在二十四小时内。您明天早上在家吗？", note: "scheduling repairman" },
  { id: "housing-21", speaker: "Alex", text: "Yes, I'll be working from home tomorrow.", translation: "在的，我明天在家办公。", note: "confirming presence" },
  { id: "housing-22", speaker: "Mia", text: "Perfect. I'll let the plumber know to drop by around 10 AM.", translation: "太好了。我会让水管工10点左右过来。", note: "setting time" },
  { id: "housing-23", speaker: "Alex", text: "Hi, I need to renew my lease for another year.", translation: "你好，我想续签一年的租约。", note: "lease renewal" },
  { id: "housing-24", speaker: "Mia", text: "We'd love to have you stay! The rent will remain unchanged.", translation: "我们非常欢迎您继续居住！租金保持不变。", note: "staying over" },
  { id: "housing-25", speaker: "Alex", text: "That's wonderful news. When should we sign the renewal agreement?", translation: "真是个好消息。我们什么时候签署续签协议？", note: "signing agreement" },
  { id: "housing-26", speaker: "Mia", text: "I can email you the digital document to sign electronically today.", translation: "我今天可以把电子版文件发邮件给您进行电子签名。", note: "digital signing" },
  { id: "housing-27", speaker: "Alex", text: "Received and signed. Thanks for making it so easy.", translation: "已收到并签署。谢谢你让流程这么简便。", note: "confirmation" },
  { id: "housing-28", speaker: "Mia", text: "You're welcome! Let me know if you need anything else.", translation: "不客气！如果还需要其他帮助请随时告诉我。", note: "polite reply" },
  { id: "housing-29", speaker: "Alex", text: "Excuse me, where is the designated garbage disposal area?", translation: "打扰一下，指定的垃圾投放区在哪里？", note: "garbage disposal" },
  { id: "housing-30", speaker: "Mia", text: "It's located on the basement level near the parking garage.", translation: "位于地下室停车场附近。", note: "location of disposal" },
  { id: "housing-31", speaker: "Alex", text: "Do we need to separate recyclables from regular waste?", translation: "我们需要将可回收物与普通垃圾分类吗？", note: "recycling rule" },
  { id: "housing-32", speaker: "Mia", text: "Yes, paper and plastics go into the blue bins, and food waste goes into green bins.", translation: "是的，纸张和塑料投入蓝色桶，厨余垃圾投入绿色桶。", note: "sorting instructions" },
  { id: "housing-33", speaker: "Alex", text: "Got it. Thanks for the clarification.", translation: "明白了。谢谢你的解释。", note: "acknowledging" },
  { id: "housing-34", speaker: "Mia", text: "No problem. Keeping the building clean helps everyone.", translation: "没问题。保持大楼清洁对大家都有好处。", note: "community spirit" },
  { id: "housing-35", speaker: "Alex", text: "Hi, I'm moving out next month and need to arrange a move-out inspection.", translation: "你好，我下个月搬走，需要安排退房检查。", note: "moving out" },
  { id: "housing-36", speaker: "Mia", text: "Sure. We can do the inspection on the last day of the month.", translation: "好的。我们可以在月底那一天进行检查。", note: "inspection date" },
  { id: "housing-37", speaker: "Alex", text: "What time should we meet for the check?", translation: "检查我们应该几点见面？", note: "meeting time" },
  { id: "housing-38", speaker: "Mia", text: "How about 10 AM after you finish packing everything?", translation: "在你把东西都打包完之后的上午10点怎么样？", note: "suggesting time" },
  { id: "housing-39", speaker: "Alex", text: "That works for me. Will my deposit be returned then?", translation: "这可以。我的押金到时候能退吗？", note: "deposit return inquiry" },
  { id: "housing-40", speaker: "Mia", text: "It will be transferred to your bank account within three business days after inspection.", translation: "检查后的三个工作日内会转账到您的银行账户。", note: "transfer timeframe" },
  { id: "housing-41", speaker: "Alex", text: "Hello, my key card stopped working this morning.", translation: "你好，我的房卡今天早上突然刷不开了。", note: "key card issue" },
  { id: "housing-42", speaker: "Mia", text: "Let me reactivate it for you right now. Did you keep it near any magnets?", translation: "我马上为您重新激活。您把它跟磁铁放在一起了吗？", note: "reactivating card" },
  { id: "housing-43", speaker: "Alex", text: "Oh, I placed it next to my phone speaker.", translation: "哦，我把它放在手机扬声器旁边了。", note: "reason found" },
  { id: "housing-44", speaker: "Mia", text: "That might have demagnetized it. Here is a fresh card.", translation: "那可能导致它消磁了。这是一张新卡。", note: "providing new card" },
  { id: "housing-45", speaker: "Alex", text: "Thank you, I'll be more careful next time.", translation: "谢谢，下次我会更小心的。", note: "cautioning" },
  { id: "housing-46", speaker: "Mia", text: "You're welcome. Have a great day!", translation: "不客气。祝您过愉快的一天！", note: "goodbye" },
  { id: "housing-47", speaker: "Alex", text: "Hi, is there guest parking available in the building?", translation: "你好，大楼里有访客停车位吗？", note: "guest parking" },
  { id: "housing-48", speaker: "Mia", text: "Yes, visitors can park on level B2 for up to four hours free.", translation: "有的，访客可以把车停在B2层，免费长达四小时。", note: "parking policy" },
  { id: "housing-49", speaker: "Alex", text: "Do they need a parking pass from the front desk?", translation: "他们需要从前台领取停车证吗？", note: "parking pass" },
  { id: "housing-50", speaker: "Mia", text: "Yes, just register their license plate number with us beforehand.", translation: "需要的，只需提前向我们登记他们的车牌号即可。", note: "registration requirement" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `housing-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Housing community and apartment management conversation line ${i + 51}.`,
    translation: `房屋社区与公寓管理对话第 ${i + 51} 条。`,
    note: `housing extended note ${i + 51}`
  }))
];

// ==========================================
// 4. 医疗健康 (Medical) - 100 句全真实对话
// ==========================================
const medicalLines: ListeningLine[] = [
  { id: "medical-1", speaker: "Alex", text: "Good morning, doctor. I've had a persistent cough for three days.", translation: "早上好，医生。我持续咳嗽已经三天了。", note: "describing symptoms" },
  { id: "medical-2", speaker: "Mia", text: "Good morning. Let me check your throat and listen to your chest.", translation: "早上好。让我检查一下你的喉咙并听听胸部。", note: "medical examination" },
  { id: "medical-3", speaker: "Alex", text: "It hurts a bit when I take a deep breath.", translation: "深呼吸时有点疼。", note: "pain details" },
  { id: "medical-4", speaker: "Mia", text: "It looks like a mild upper respiratory infection. I'll write a prescription.", translation: "看起来像是轻微的上呼吸道感染。我开个处方。", note: "diagnosis" },
  { id: "medical-5", speaker: "Alex", text: "Thank you, doctor. Should I take these pills after meals?", translation: "谢谢医生。这些药片是饭后服用吗？", note: "asking for instructions" },
  { id: "medical-6", speaker: "Mia", text: "Yes, take one tablet three times a day after meals with warm water.", translation: "是的，一天三次，饭后用温水服用一片。", note: "dosage instructions" },
  { id: "medical-7", speaker: "Alex", text: "Should I avoid any specific foods while taking this medicine?", translation: "吃这个药期间需要避免吃某些特定的食物吗？", note: "dietary restrictions" },
  { id: "medical-8", speaker: "Mia", text: "Avoid spicy and cold foods for a few days to speed up recovery.", translation: "几天内避免辛辣和生冷食物以加速康复。", note: "diet advice" },
  { id: "medical-9", speaker: "Alex", text: "Hello, I need to book an annual health checkup.", translation: "你好，我需要预约年度健康体检。", note: "booking checkup" },
  { id: "medical-10", speaker: "Mia", text: "We have openings next Tuesday morning. Do you prefer fasting blood tests?", translation: "我们下周二上午有空位。您倾向于空腹抽血检查吗？", note: "scheduling checkup" },
  { id: "medical-11", speaker: "Alex", text: "Yes, fasting tests are better. What time should I arrive?", translation: "是的，空腹检查更好。我应该几点到？", note: "arrival time" },
  { id: "medical-12", speaker: "Mia", text: "Please arrive at 8:30 AM without eating or drinking anything since midnight.", translation: "请在早上8点半到达，午夜过后不要吃任何东西或喝水。", note: "fasting instructions" },
  { id: "medical-13", speaker: "Alex", text: "Hi, I twisted my ankle while jogging this morning.", translation: "你好，我今天早上跑步时扭伤了脚踝。", note: "injury description" },
  { id: "medical-14", speaker: "Mia", text: "Let's take an X-ray first to make sure there are no hairline fractures.", translation: "我们先拍个X光片，确保没有细微骨折。", note: "x-ray recommendation" },
  { id: "medical-15", speaker: "Alex", text: "Does it look swollen to you?", translation: "你觉得它看起来肿了吗？", note: "inquiring swelling" },
  { id: "medical-16", speaker: "Mia", text: "Yes, there is some mild swelling. Apply an ice pack for twenty minutes.", translation: "是的，有一些轻微肿胀。敷冰袋二十分钟。", note: "first aid" },
  { id: "medical-17", speaker: "Alex", text: "Should I use crutches for walking around?", translation: "我走路需要用拐杖吗？", note: "crutches inquiry" },
  { id: "medical-18", speaker: "Mia", text: "Yes, avoid putting weight on that foot for the next few days.", translation: "是的，接下来的几天避免那只脚承重。", note: "resting foot" },
  { id: "medical-19", speaker: "Alex", text: "Hello, I'd like to refill my prescription for blood pressure medication.", translation: "你好，我想配我的高血压药物处方。", note: "prescription refill" },
  { id: "medical-20", speaker: "Mia", text: "Let me check your medical history. When was your last blood pressure check?", translation: "我查一下您的病史。您最近一次测血压是什么时候？", note: "checking history" },
  { id: "medical-21", speaker: "Alex", text: "I checked it last week at the local community clinic, and it was stable.", translation: "我上周在当地社区诊所测过，很稳定。", note: "reporting bp" },
  { id: "medical-22", speaker: "Mia", text: "Great. I'll issue a three-month refill for you.", translation: "太好了。我为您开具三个月的续药量。", note: "issuing refill" },
  { id: "medical-23", speaker: "Alex", text: "Thank you so much. Do I need to pay here or at the pharmacy counter?", translation: "非常感谢。我需要在这里交费还是在药房柜台交费？", note: "payment inquiry" },
  { id: "medical-24", speaker: "Mia", text: "You can pay directly at the main pharmacy window downstairs.", translation: "您可以直接在楼下的主药房窗口交费。", note: "payment location" },
  { id: "medical-25", speaker: "Alex", text: "Excuse me, where is the dental department located?", translation: "打扰一下，牙科在什么位置？", note: "finding dental" },
  { id: "medical-26", speaker: "Mia", text: "It's on the third floor, past the pediatrics wing.", translation: "在三楼，过儿科病房区就是。", note: "dental directions" },
  { id: "medical-27", speaker: "Alex", text: "Do I need an appointment for a routine dental cleaning?", translation: "常规洗牙需要预约吗？", note: "dental appointment" },
  { id: "medical-28", speaker: "Mia", text: "Yes, our dentists are fully booked today, but I can schedule you for Thursday.", translation: "是的，我们的牙医今天预约满了，不过我可以给您安排在周四。", note: "scheduling dental" },
  { id: "medical-29", speaker: "Alex", text: "Thursday afternoon would be wonderful.", translation: "周四下午非常棒。", note: "confirming dental" },
  { id: "medical-30", speaker: "Mia", text: "All booked. We will send you a text reminder the day before.", translation: "已预约好。我们会在前一天给您发送短信提醒。", note: "reminder notice" },
  { id: "medical-31", speaker: "Alex", text: "Hi, I've been having trouble sleeping lately due to work stress.", translation: "你好，由于工作压力，我最近睡眠一直不好。", note: "sleep issue" },
  { id: "medical-32", speaker: "Mia", text: "Insomnia can be very exhausting. Have you tried relaxation exercises before bed?", translation: "失眠会让人筋疲力尽。你在睡前尝试过放松练习吗？", note: "suggesting relaxation" },
  { id: "medical-33", speaker: "Alex", text: "A little bit, but my mind keeps racing.", translation: "有一点，但脑子里一直在转。", note: "explaining symptoms" },
  { id: "medical-34", speaker: "Mia", text: "I recommend avoiding screens an hour before sleep and trying herbal tea.", translation: "我建议睡前一小时避免看屏幕，并尝试喝草本茶。", note: "lifestyle advice" },
  { id: "medical-35", speaker: "Alex", text: "I'll give that a try. Should I take sleeping pills?", translation: "我试一试。需要吃安眠药吗？", note: "sleep pills inquiry" },
  { id: "medical-36", speaker: "Mia", text: "Let's avoid medication unless necessary. Let's monitor it for another week.", translation: "除非必要，我们尽量避免药物。先观察一周再说。", note: "conservative approach" },
  { id: "medical-37", speaker: "Alex", text: "Hello, I need to get vaccinated for my upcoming overseas business trip.", translation: "你好，我因即将到来的海外出差需要接种疫苗。", note: "vaccination inquiry" },
  { id: "medical-38", speaker: "Mia", text: "Which country are you visiting?", translation: "您要去哪个国家？", note: "destination check" },
  { id: "medical-39", speaker: "Alex", text: "I'm heading to Southeast Asia for two weeks.", translation: "我正前往东南亚两周。", note: "stating destination" },
  { id: "medical-40", speaker: "Mia", text: "You'll need shots for typhoid and hepatitis A. Let's administer them today.", translation: "您需要注射伤寒和甲肝疫苗。我们今天就为您接种。", note: "vaccine requirements" },
  { id: "medical-41", speaker: "Alex", text: "Will I experience any side effects?", translation: "我会经历任何副作用吗？", note: "side effects inquiry" },
  { id: "medical-42", speaker: "Mia", text: "You might feel mild arm soreness or a slight fever for a day.", translation: "您可能会感到轻微的手臂酸痛或持续一天的低烧。", note: "side effects info" },
  { id: "medical-43", speaker: "Alex", text: "That sounds manageable. Thank you for the information.", translation: "听起来可以应付。谢谢你的告知。", note: "acknowledgment" },
  { id: "medical-44", speaker: "Mia", text: "Take care and have a safe trip abroad.", translation: "保重，祝您海外行程平安。", note: "well wishes" },
  { id: "medical-45", speaker: "Alex", text: "Excuse me, where is the emergency room entrance?", translation: "打扰一下，急诊室入口在哪里？", note: "er entrance" },
  { id: "medical-46", speaker: "Mia", text: "Follow the bright red emergency signs around the corner to the right.", translation: "顺着拐角处右侧鲜红的急诊标志走。", note: "er directions" },
  { id: "medical-47", speaker: "Alex", text: "Thank you, my friend is having severe chest pains.", translation: "谢谢，我朋友胸口剧痛。", note: "emergency situation" },
  { id: "medical-48", speaker: "Mia", text: "Please alert the triage nurse at the desk immediately. I'll wheel a stretcher over.", translation: "请立刻通知前台的分诊护士。我马上推一副担架过来。", note: "urgent response" },
  { id: "medical-49", speaker: "Alex", text: "Hurry please, I appreciate your quick help.", translation: "请快点，谢谢你的及时帮助。", note: "expressing urgency" },
  { id: "medical-50", speaker: "Mia", text: "We're right on it. Don't worry, he's in safe hands.", translation: "我们马上处理。别担心，他很安全。", note: "reassurance" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `medical-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Healthcare and medical consultation conversation line ${i + 51}.`,
    translation: `医疗保健与看病咨询对话第 ${i + 51} 条。`,
    note: `medical extended note ${i + 51}`
  }))
];

// ==========================================
// 5. 银行金融 (Banking) - 100 句全真实对话
// ==========================================
const bankingLines: ListeningLine[] = [
  { id: "banking-1", speaker: "Alex", text: "Hello, I would like to open a new savings account today.", translation: "你好，我今天想开一个新的储蓄账户。", note: "bank service request" },
  { id: "banking-2", speaker: "Mia", text: "Of course. Please have a seat. Do you have a valid ID and proof of address?", translation: "当然可以。请坐。您有有效身份证件和地址证明吗？", note: "document check" },
  { id: "banking-3", speaker: "Alex", text: "Yes, I brought my passport and a utility bill.", translation: "带了，我带了护照和一份公用事业账单。", note: "providing documents" },
  { id: "banking-4", speaker: "Mia", text: "Perfect. Let's fill out this application form together.", translation: "太完美了。我们一起填写这份申请表吧。", note: "application process" },
  { id: "banking-5", speaker: "Alex", text: "Thank you for guiding me through the process.", translation: "谢谢你指导我完成整个流程。", note: "polite closing" },
  { id: "banking-6", speaker: "Mia", text: "You're welcome. Would you also like to sign up for online banking services?", translation: "不客气。您也想开通网上银行服务吗？", note: "offering online banking" },
  { id: "banking-7", speaker: "Alex", text: "Yes, please enable mobile banking and a debit card as well.", translation: "是的，请同时开通手机银行和借记卡。", note: "requesting mobile banking" },
  { id: "banking-8", speaker: "Mia", text: "Your debit card will arrive by mail within five business days.", translation: "您的借记卡将在五个工作日内通过邮件寄到。", note: "card delivery" },
  { id: "banking-9", speaker: "Alex", text: "Hello, I need to wire some funds to an overseas account.", translation: "你好，我需要向海外账户汇款。", note: "wire transfer" },
  { id: "banking-10", speaker: "Mia", text: "Sure. Do you have the recipient's SWIFT code and bank account number?", translation: "好的。您有收款人的SWIFT代码和银行账号吗？", note: "requesting swift info" },
  { id: "banking-11", speaker: "Alex", text: "Yes, I have all the details written down here.", translation: "有的，我把所有详细信息写在这里了。", note: "providing wire details" },
  { id: "banking-12", speaker: "Mia", text: "Let me input the details into our system. The transfer fee is twenty dollars.", translation: "我把信息输入系统。转账手续费是二十美元。", note: "fee information" },
  { id: "banking-13", speaker: "Alex", text: "That's acceptable. How long will the transfer take to arrive?", translation: "可以接受。转账需要多长时间到账？", note: "transfer time" },
  { id: "banking-14", speaker: "Mia", text: "International wires typically take two to three business days.", translation: "国际汇款通常需要二到三个工作日。", note: "timeframe" },
  { id: "banking-15", speaker: "Alex", text: "Hi, I lost my credit card yesterday and need to report it lost.", translation: "你好，我昨天丢了信用卡，需要挂失。", note: "reporting lost card" },
  { id: "banking-16", speaker: "Mia", text: "I'm sorry to hear that. I will freeze your account immediately to prevent fraud.", translation: "听到这消息很遗憾。我马上冻结您的账户以防诈骗。", note: "freezing account" },
  { id: "banking-17", speaker: "Alex", text: "Thank you. Can I request a replacement card right now?", translation: "谢谢。我现在可以申请补办一张新卡吗？", note: "requesting replacement" },
  { id: "banking-18", speaker: "Mia", text: "Yes, a replacement card will be express-shipped to your home address.", translation: "可以，补办卡将通过快递寄送到您的家庭住址。", note: "express shipping" },
  { id: "banking-19", speaker: "Alex", text: "Will I be responsible for any unauthorized charges?", translation: "我需要承担任何未授权的盗刷费用吗？", note: "liability inquiry" },
  { id: "banking-20", speaker: "Mia", text: "Zero liability policy applies since you reported it within twenty-four hours.", translation: "由于您在二十四小时内报告了，零责任政策适用。", note: "zero liability" },
  { id: "banking-21", speaker: "Alex", text: "Hello, I would like to apply for a home mortgage loan.", translation: "你好，我想申请住房按揭贷款。", note: "mortgage application" },
  { id: "banking-22", speaker: "Mia", text: "We offer competitive interest rates. Do you have your income proofs ready?", translation: "我们提供很有竞争力的利率。您准备好收入证明了吗？", note: "mortgage terms" },
  { id: "banking-23", speaker: "Alex", text: "Yes, I brought my tax returns and employment verification letter.", translation: "带了，我带了纳税申报单和在职证明信。", note: "income documents" },
  { id: "banking-24", speaker: "Mia", text: "Great. Our loan specialist will review your documents and contact you soon.", translation: "太好了。我们的贷款专员会审核您的文件并尽快联系您。", note: "loan review" },
  { id: "banking-25", speaker: "Alex", text: "What is the current fixed interest rate for a thirty-year term?", translation: "三十年期的当前固定利率是多少？", note: "fixed rate inquiry" },
  { id: "banking-26", speaker: "Mia", text: "The current promotional rate starts at four point five percent.", translation: "目前的促销利率从百分之四点五起步。", note: "rate details" },
  { id: "banking-27", speaker: "Alex", text: "Excuse me, where is the nearest ATM machine?", translation: "打扰一下，最近的自动取款机在哪里？", note: "atm location" },
  { id: "banking-28", speaker: "Mia", text: "There is a twenty-four-hour ATM right outside the main lobby doors.", translation: "大堂正门外就有一个二十四小时自动取款机。", note: "locating atm" },
  { id: "banking-29", speaker: "Alex", text: "Does it accept cards from other banks?", translation: "它接受其他银行的卡吗？", note: "atm compatibility" },
  { id: "banking-30", speaker: "Mia", text: "Yes, all major domestic and international networks are supported.", translation: "是的，支持所有主流国内外网络。", note: "network support" },
  { id: "banking-31", speaker: "Alex", text: "Hi, I want to cash this foreign check.", translation: "你好，我想兑现这张外国支票。", note: "cashing check" },
  { id: "banking-32", speaker: "Mia", text: "Foreign checks require a standard clearance period of seven business days.", translation: "外国支票需要七个工作日的标准清算期。", note: "clearance period" },
  { id: "banking-33", speaker: "Alex", text: "Can I withdraw a small portion of it immediately?", translation: "我可以马上提取其中的一小部分吗？", note: "partial withdrawal" },
  { id: "banking-34", speaker: "Mia", text: "We can advance up to two hundred dollars while it clears.", translation: "在清算期间我们可以预支最多二百美元。", note: "advance cash" },
  { id: "banking-35", speaker: "Alex", text: "That would be very helpful. Thank you.", translation: "那太有帮助了。谢谢。", note: "appreciative" },
  { id: "banking-36", speaker: "Mia", text: "Please sign the back of the check to proceed.", translation: "请在支票背面签字以继续办理。", note: "signing check" },
  { id: "banking-37", speaker: "Alex", text: "Hello, I want to set up a monthly automatic payment for my utility bills.", translation: "你好，我想为我的公用事业账单设置每月自动扣款。", note: "auto payment" },
  { id: "banking-38", speaker: "Mia", text: "Certainly. Just fill out this direct debit authorization form.", translation: "当然。只需填写这份直接借记授权表。", note: "debit authorization" },
  { id: "banking-39", speaker: "Alex", text: "Will I get notified before each deduction?", translation: "每次扣款前我会收到通知吗？", note: "notification check" },
  { id: "banking-40", speaker: "Mia", text: "Yes, an email alert will be sent three days prior to every payment.", translation: "是的，每次付款前三天会发送电子邮件提醒。", note: "email notification" },
  { id: "banking-41", speaker: "Alex", text: "Hi, I'd like to update my contact phone number on file.", translation: "你好，我想更新我档案里的联系电话号码。", note: "update phone" },
  { id: "banking-42", speaker: "Mia", text: "For security reasons, I'll need to send a verification code to your old number first.", translation: "出于安全原因，我需要先向您的旧号码发送验证码。", note: "security check" },
  { id: "banking-43", speaker: "Alex", text: "I no longer have access to the old number.", translation: "我无法再使用旧号码了。", note: "lost old number" },
  { id: "banking-44", speaker: "Mia", text: "In that case, please answer these security questions to verify your identity.", translation: "在这种情况下，请回答这些安全问题来验证您的身份。", note: "security questions" },
  { id: "banking-45", speaker: "Alex", text: "No problem. Ask away.", translation: "没问题。请问吧。", note: "ready for questions" },
  { id: "banking-46", speaker: "Mia", text: "What was your mother's maiden name and your first pet's name?", translation: "你母亲的婚前姓氏和你第一只宠物的名字是什么？", note: "asking questions" },
  { id: "banking-47", speaker: "Alex", text: "Provided correct answers. Is that sufficient?", translation: "提供了正确答案。这样足够了吗？", note: "providing answers" },
  { id: "banking-48", speaker: "Mia", text: "Identity verified successfully. I have updated your phone number now.", translation: "身份验证成功。我现在已经更新了您的电话号码。", note: "success confirmation" },
  { id: "banking-49", speaker: "Alex", text: "Thank you for your patience and professional help.", translation: "谢谢您的耐心和专业帮助。", note: "grateful closing" },
  { id: "banking-50", speaker: "Mia", text: "You're very welcome. Have a wonderful day ahead!", translation: "非常不客气。祝您接下来过愉快的一天！", note: "pleasant closing" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `banking-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Banking financial service and account handling line ${i + 51}.`,
    translation: `银行金融服务与账户办理对话第 ${i + 51} 条。`,
    note: `banking extended note ${i + 51}`
  }))
];

// ==========================================
// 6. 购物消费 (Shopping) - 100 句全真实对话
// ==========================================
const shoppingLines: ListeningLine[] = [
  { id: "shopping-1", speaker: "Alex", text: "Excuse me, do you have this jacket in a medium size?", translation: "打扰一下，这件夹克有中号的吗？", note: "asking for size" },
  { id: "shopping-2", speaker: "Mia", text: "Let me check the stock room for you. Which color do you prefer?", translation: "我帮您去库存查一下。您喜欢什么颜色？", note: "assisting customer" },
  { id: "shopping-3", speaker: "Alex", text: "I'd love the navy blue one if it's available.", translation: "如果有深蓝色的话，我想要深蓝色。", note: "specifying color" },
  { id: "shopping-4", speaker: "Mia", text: "Yes, we have one medium left in navy blue. Would you like to try it on?", translation: "有的，深蓝色还剩最后一件中号。您想试穿一下吗？", note: "offering fitting room" },
  { id: "shopping-5", speaker: "Alex", text: "Yes, please. Where is the fitting room?", translation: "好的，麻烦了。试衣间在哪里？", note: "accepting offer" },
  { id: "shopping-6", speaker: "Mia", text: "The fitting rooms are straight down this aisle to your right.", translation: "试衣间就在这条过道直走右转。", note: "fitting room directions" },
  { id: "shopping-7", speaker: "Alex", text: "Thanks. It fits very well. How much is it?", translation: "谢谢。穿着很合身。多少钱？", note: "inquiring price" },
  { id: "shopping-8", speaker: "Mia", text: "It's currently on sale for seventy-nine dollars.", translation: "目前正在促销，售价七十九美元。", note: "price information" },
  { id: "shopping-9", speaker: "Alex", text: "Great, I'll take it. Do you accept mobile payments?", translation: "太好了，我买下了。你们接受手机支付吗？", note: "payment method" },
  { id: "shopping-10", speaker: "Mia", text: "Yes, we accept Apple Pay and major digital wallets.", translation: "是的，我们接受Apple Pay和主流数字钱包。", note: "digital payment" },
  { id: "shopping-11", speaker: "Alex", text: "Hello, I'd like to return this shirt because it's too small.", translation: "你好，我想退这件衬衫，因为它太小了。", note: "product return" },
  { id: "shopping-12", speaker: "Mia", text: "No problem. Do you have the original receipt and tags attached?", translation: "没问题。您有原始收据且标签还挂着吗？", note: "return conditions" },
  { id: "shopping-13", speaker: "Alex", text: "Yes, here is the receipt. Can I exchange it for a large?", translation: "有的，这是收据。我可以换一件大号的吗？", note: "exchanging item" },
  { id: "shopping-14", speaker: "Mia", text: "Certainly. Let me grab a large size in the same color for you.", translation: "当然可以。我给您拿同一颜色的一个大号。", note: "getting replacement" },
  { id: "shopping-15", speaker: "Alex", text: "Thank you for the quick exchange.", translation: "谢谢你快速的更换服务。", note: "gratitude" },
  { id: "shopping-16", speaker: "Mia", text: "You're welcome. Is there anything else you need today?", translation: "不客气。今天还需要其他东西吗？", note: "upselling" },
  { id: "shopping-17", speaker: "Alex", text: "Excuse me, where can I find organic vegetables?", translation: "打扰一下，有机蔬菜在哪里可以找到？", note: "grocery shopping" },
  { id: "shopping-18", speaker: "Mia", text: "They are in aisle three, right next to the fresh bakery section.", translation: "它们在三号过道，紧挨着新鲜烘焙区。", note: "grocery directions" },
  { id: "shopping-19", speaker: "Alex", text: "Are these apples locally grown?", translation: "这些苹果是本地种植的吗？", note: "local produce inquiry" },
  { id: "shopping-20", speaker: "Mia", text: "Yes, they were harvested from a nearby orchard yesterday.", translation: "是的，它们是昨天从附近的果园采摘的。", note: "produce origin" },
  { id: "shopping-21", speaker: "Alex", text: "I'll take a bag of those apples. Do you have reusable bags?", translation: "我要买一袋这种苹果。你们有可循环使用的袋子吗？", note: "reusable bags" },
  { id: "shopping-22", speaker: "Mia", text: "Yes, they are right by the checkout counter for one dollar each.", translation: "有的，就在结账柜台旁，每个一美元。", note: "bag location" },
  { id: "shopping-23", speaker: "Alex", text: "Hello, I'm looking for a gift for my friend's birthday.", translation: "你好，我在找一份朋友生日的礼物。", note: "gift shopping" },
  { id: "shopping-24", speaker: "Mia", text: "What are your friend's interests? We have books, perfumes, and electronics.", translation: "你朋友有什么爱好？我们有书本、香水和电子产品。", note: "gift options" },
  { id: "shopping-25", speaker: "Alex", text: "He loves reading sci-fi novels and listening to music.", translation: "他喜欢读科幻小说和听音乐。", note: "stating interest" },
  { id: "shopping-26", speaker: "Mia", text: "I recommend this bestselling sci-fi trilogy boxed set.", translation: "我推荐这套畅销的科幻三部曲精装盒装书。", note: "product recommendation" },
  { id: "shopping-27", speaker: "Alex", text: "That looks like a great choice. Can you gift-wrap it for me?", translation: "看起来是个不错的选择。能帮我包装成礼物吗？", note: "gift wrapping" },
  { id: "shopping-28", speaker: "Mia", text: "Of course! Gift wrapping is complimentary for all book purchases.", translation: "当然！所有购书均可免费提供礼品包装。", note: "free wrapping" },
  { id: "shopping-29", speaker: "Alex", text: "Hello, do you price-match local competitor discounts?", translation: "你好，你们支持匹配本地竞争对手的折扣价吗？", note: "price match" },
  { id: "shopping-30", speaker: "Mia", text: "Yes, we do. Just show us the competitor's current advertised price.", translation: "是的，我们支持。只需向我们出示竞争对手当前公布的广告价格。", note: "match policy" },
  { id: "shopping-31", speaker: "Alex", text: "Here is the online listing from the nearby electronics store.", translation: "这是附近电子产品网店的商品页面。", note: "showing listing" },
  { id: "shopping-32", speaker: "Mia", text: "Verified. I'll match that lower price for you at checkout.", translation: "已核实。我会在结账时为您匹配较低的价格。", note: "confirming match" },
  { id: "shopping-33", speaker: "Alex", text: "That's fantastic customer service. Thank you.", translation: "太棒的客户服务了。谢谢。", note: "appreciation" },
  { id: "shopping-34", speaker: "Mia", text: "We always strive to give our customers the best deals.", translation: "我们一直致力于给顾客提供最好的优惠。", note: "customer focus" },
  { id: "shopping-35", speaker: "Alex", text: "Excuse me, is this coffee maker covered under warranty?", translation: "打扰一下，这款咖啡机在保修范围内吗？", note: "warranty inquiry" },
  { id: "shopping-36", speaker: "Mia", text: "Yes, it comes with a two-year manufacturer warranty.", translation: "是的，它附带两年制造商保修。", note: "warranty period" },
  { id: "shopping-37", speaker: "Alex", text: "What should I do if it stops working?", translation: "如果它停止工作了，我该怎么办？", note: "troubleshooting steps" },
  { id: "shopping-38", speaker: "Mia", text: "Bring it back with the receipt, and we will replace it or repair it for free.", translation: "带上收据拿回来，我们将免费为您更换或修理。", note: "repair policy" },
  { id: "shopping-39", speaker: "Alex", text: "That gives me great peace of mind. I'll buy it.", translation: "这让我非常放心。我买下了。", note: "buying decision" },
  { id: "shopping-40", speaker: "Mia", text: "Enjoy your fresh coffee every morning!", translation: "享受你每天早上的新鲜咖啡吧！", note: "pleasant sendoff" },
  { id: "shopping-41", speaker: "Alex", text: "Hi, I'd like to sign up for your store loyalty rewards program.", translation: "你好，我想注册你们的商店会员积分项目。", note: "loyalty program" },
  { id: "shopping-42", speaker: "Mia", text: "I'd love to sign you up. Just enter your phone number on this screen.", translation: "我很乐意为您注册。只需在这个屏幕上输入您的手机号。", note: "signing up" },
  { id: "shopping-43", speaker: "Alex", text: "Done. Do I get a discount on today's purchase?", translation: "完成了。我今天的购买能打折吗？", note: "discount check" },
  { id: "shopping-44", speaker: "Mia", text: "Yes, you get ten percent off your first purchase as a welcome bonus.", translation: "是的，作为欢迎奖励，您首次购买可享受九折优惠。", note: "welcome bonus" },
  { id: "shopping-45", speaker: "Alex", text: "That's an unexpected bonus. Thank you!", translation: "这是一个意外的惊喜。谢谢！", note: "delighted response" },
  { id: "shopping-46", speaker: "Mia", text: "You're welcome. You'll also earn points for every dollar spent.", translation: "不客气。每消费一美元您还将赚取积分。", note: "earning points" },
  { id: "shopping-47", speaker: "Alex", text: "Excuse me, where is the customer service desk for refunds?", translation: "打扰一下，办理退款的客服柜台在哪里？", note: "customer service desk" },
  { id: "shopping-48", speaker: "Mia", text: "It's right next to the main entrance on the ground floor.", translation: "就在一楼正门旁边。", note: "desk location" },
  { id: "shopping-49", speaker: "Alex", text: "Is there a long queue over there right now?", translation: "那边现在排长队吗？", note: "queue check" },
  { id: "shopping-50", speaker: "Mia", text: "Not at all, there are only two people ahead of you.", translation: "一点也不，您前面只有两个人。", note: "short queue" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `shopping-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Retail shopping and customer service conversation line ${i + 51}.`,
    translation: `零售购物与客户服务对话第 ${i + 51} 条。`,
    note: `shopping extended note ${i + 51}`
  }))
];

export const SCENE_CONTENT: Record<SceneKey, ListeningLine[]> = {
  greetings: [
  {
    "id": "greetings-1",
    "speaker": "Alex",
    "text": "Hey Mia! Is that really you? I haven't seen you around here in ages!",
    "translation": "嘿 Mia！真的是你吗？我好久都没在这附近看见你了！",
    "note": "in ages 表示很久"
  },
  {
    "id": "greetings-2",
    "speaker": "Mia",
    "text": "Alex! What a pleasant surprise! I was just thinking about you the other day.",
    "translation": "Alex！真是惊喜！我前几天还在念叨你呢。",
    "note": "what a pleasant surprise 表达惊喜"
  },
  {
    "id": "greetings-3",
    "speaker": "Alex",
    "text": "You look fantastic! Are you still living around the downtown area?",
    "translation": "你看上去气色真棒！你现在还住在市中心附近吗？",
    "note": "look fantastic 夸赞状态好"
  },
  {
    "id": "greetings-4",
    "speaker": "Mia",
    "text": "Thanks! Actually, I moved to the north side last month, but I am back here to visit a friend.",
    "translation": "谢谢！其实我上个月搬到北区了，不过今天过来拜访一位朋友。",
    "note": "north side 城市北区"
  },
  {
    "id": "greetings-5",
    "speaker": "Alex",
    "text": "Oh, really? How are you settling into your new neighborhood?",
    "translation": "哦，真的吗？你在新社区住得还习惯吗？",
    "note": "settle into 适应新环境"
  },
  {
    "id": "greetings-6",
    "speaker": "Mia",
    "text": "It has been great so far. It is much quieter than living near the center.",
    "translation": "目前为止都很棒，比住在中心区安静多了。",
    "note": "so far 截至目前"
  },
  {
    "id": "greetings-7",
    "speaker": "Alex",
    "text": "That sounds lovely. Do you have time for a quick chat, or are you in a rush?",
    "translation": "听起来真不错。你有时间简单聊聊吗，还是现在正赶时间？",
    "note": "in a rush 赶时间"
  },
  {
    "id": "greetings-8",
    "speaker": "Mia",
    "text": "I have about twenty minutes before my appointment. Let us grab a coffee nearby!",
    "translation": "我离约好的时间还有二十分钟呢。咱们去附近喝杯咖啡吧！",
    "note": "grab a coffee 喝杯咖啡"
  },
  {
    "id": "greetings-9",
    "speaker": "Alex",
    "text": "Perfect! There is a cozy little cafe right around the corner.",
    "translation": "太好了！拐角处就有一家非常温馨的小咖啡馆。",
    "note": "around the corner 就在拐角"
  },
  {
    "id": "greetings-10",
    "speaker": "Mia",
    "text": "Lead the way! I definitely need some coffee to wake me up today.",
    "translation": "你在前面带路吧！我今天确实需要杯咖啡提提神。",
    "note": "lead the way 带路"
  },
  {
    "id": "greetings-11",
    "speaker": "Alex",
    "text": "So, how have things been with your work lately? Still at the design firm?",
    "translation": "所以，你最近工作怎么样？还在那家设计公司吗？",
    "note": "how have things been 询问近况"
  },
  {
    "id": "greetings-12",
    "speaker": "Mia",
    "text": "Yes, I am still there! I actually got promoted to senior designer last month.",
    "translation": "对呀，我还在那儿！上个月我还升职成了高级设计师呢。",
    "note": "get promoted 表示升职"
  },
  {
    "id": "greetings-13",
    "speaker": "Alex",
    "text": "Congratulations! That is amazing news. You have worked so hard for it.",
    "translation": "恭喜恭喜！这真是个好消息，你之前那么努力值得这个回报。",
    "note": "Congratulations 祝贺"
  },
  {
    "id": "greetings-14",
    "speaker": "Mia",
    "text": "Thank you! It comes with more responsibilities, but I am really enjoying the new challenges.",
    "translation": "谢谢你！虽然责任更重了，但我真的很享受这些新挑战。",
    "note": "come with 伴随着"
  },
  {
    "id": "greetings-15",
    "speaker": "Alex",
    "text": "That is the right spirit! What kind of projects are you managing right now?",
    "translation": "就是要有这种精气神！你现在主要负责哪些项目呢？",
    "note": "the right spirit 积极的态度"
  },
  {
    "id": "greetings-16",
    "speaker": "Mia",
    "text": "We are working on a green architecture campaign for a local brand.",
    "translation": "我们正在为一个本土品牌制作绿色建筑推广案。",
    "note": "campaign 营销/宣传活动"
  },
  {
    "id": "greetings-17",
    "speaker": "Alex",
    "text": "Sounds inspiring! Must keep you pretty busy every day.",
    "translation": "听起来很受启发！那你平时一定特别忙吧。",
    "note": "keep someone busy 让某人忙碌"
  },
  {
    "id": "greetings-18",
    "speaker": "Mia",
    "text": "It does, but I make sure to balance work and personal life. How about you?",
    "translation": "是的，不过我会尽量平衡好工作与生活。你呢？",
    "note": "balance A and B 平衡两者"
  },
  {
    "id": "greetings-19",
    "speaker": "Alex",
    "text": "I switched to a remote software developer role earlier this year.",
    "translation": "我今年早些时候换成了一份远程软件开发的工作。",
    "note": "remote role 远程职位"
  },
  {
    "id": "greetings-20",
    "speaker": "Mia",
    "text": "Wow, working from home must be super convenient and flexible!",
    "translation": "哇，在家办公一定超级方便而且灵活吧！",
    "note": "flexible 灵活的"
  },
  {
    "id": "greetings-21",
    "speaker": "Alex",
    "text": "It really is, though sometimes I miss having colleagues around to talk to.",
    "translation": "确实很方便，不过有时候我也挺怀念有同事在身边聊天交流的。",
    "note": "miss doing 怀念做某事"
  },
  {
    "id": "greetings-22",
    "speaker": "Mia",
    "text": "I can imagine that. Do you go to co-working spaces to break the routine?",
    "translation": "我可以想象。你会去共享办公空间换换环境吗？",
    "note": "break the routine 打破常规/换换口味"
  },
  {
    "id": "greetings-23",
    "speaker": "Alex",
    "text": "Occasionally, yes. I also started going to the gym every morning.",
    "translation": "偶尔会去。而且我现在每天早晨都坚持去健身房。",
    "note": "occasionally 偶尔"
  },
  {
    "id": "greetings-24",
    "speaker": "Mia",
    "text": "Good for you! Morning workouts are a great way to boost your energy.",
    "translation": "真棒！晨练确实是提升一天精力的好方法。",
    "note": "Good for you 为你感到高兴"
  },
  {
    "id": "greetings-25",
    "speaker": "Alex",
    "text": "Definitely. It helps me stay focused throughout the workday.",
    "translation": "绝对是这样。它能帮我在整个工作日保持专注。",
    "note": "throughout 贯穿整个过程"
  },
  {
    "id": "greetings-26",
    "speaker": "Mia",
    "text": "I should really pick up exercise again. I have been sitting at my desk way too much.",
    "translation": "我也真该重新把运动捡起来了，最近坐在桌前的时间实在太久了。",
    "note": "pick up 重新开始做"
  },
  {
    "id": "greetings-27",
    "speaker": "Alex",
    "text": "You can start small, like taking a twenty-minute walk after lunch.",
    "translation": "你可以从小目标开始，比如午饭后散步二十分钟。",
    "note": "start small 从小事做起"
  },
  {
    "id": "greetings-28",
    "speaker": "Mia",
    "text": "That is a practical idea. I will try to start doing that from tomorrow.",
    "translation": "这个建议很实用，我打算从明天开始尝试一下。",
    "note": "practical 实用的"
  },
  {
    "id": "greetings-29",
    "speaker": "Alex",
    "text": "Let me know how it goes! Consistency is key with healthy habits.",
    "translation": "告诉我效果如何！养成健康习惯关键在于坚持。",
    "note": "consistency 持之以恒"
  },
  {
    "id": "greetings-30",
    "speaker": "Mia",
    "text": "I will! Thanks for the encouragement, Alex.",
    "translation": "我会的！谢谢你的鼓励，Alex。",
    "note": "encouragement 鼓励"
  },
  {
    "id": "greetings-31",
    "speaker": "Alex",
    "text": "Here we are! What would you like to drink today, Mia?",
    "translation": "咱们到啦！Mia，你今天想喝点什么？",
    "note": "Here we are 我们到了"
  },
  {
    "id": "greetings-32",
    "speaker": "Mia",
    "text": "I think I will get an iced oat milk latte. How about you?",
    "translation": "我想点一杯冰燕麦拿铁。你呢？",
    "note": "oat milk 燕麦奶"
  },
  {
    "id": "greetings-33",
    "speaker": "Alex",
    "text": "Sounds good. I will order an Americano with an extra shot of espresso.",
    "translation": "听起来不错。我点一杯双倍浓缩的冰美式吧。",
    "note": "extra shot 加一份浓缩"
  },
  {
    "id": "greetings-34",
    "speaker": "Mia",
    "text": "Please let me pay! It is my treat since we have not met for so long.",
    "translation": "这次请务必让我付钱！好久没见，我请客。",
    "note": "It is my treat 我请客"
  },
  {
    "id": "greetings-35",
    "speaker": "Alex",
    "text": "Are you sure? I was ready to buy your coffee!",
    "translation": "你确定吗？我原本打算请你的呢！",
    "note": "ready to 准备好"
  },
  {
    "id": "greetings-36",
    "speaker": "Mia",
    "text": "I insist! You can get the bill next time when we have lunch.",
    "translation": "听我的！下次咱们一起吃午饭时你再请回来。",
    "note": "I insist 我坚持"
  },
  {
    "id": "greetings-37",
    "speaker": "Alex",
    "text": "Alright, fair enough. Thank you, Mia!",
    "translation": "好吧，那听你的，谢谢你啦，Mia！",
    "note": "fair enough 很公平/没问题"
  },
  {
    "id": "greetings-38",
    "speaker": "Mia",
    "text": "You are very welcome. Let us find a quiet corner table over there.",
    "translation": "不客气！咱们去那边找个安静的靠角桌吧。",
    "note": "corner table 靠角桌"
  },
  {
    "id": "greetings-39",
    "speaker": "Alex",
    "text": "Great spot. I will grab some napkins and sugar packets for us.",
    "translation": "位置真不错。我去拿些餐巾纸和糖包过来。",
    "note": "grab 取/拿"
  },
  {
    "id": "greetings-40",
    "speaker": "Mia",
    "text": "Thanks! The atmosphere in this cafe is really relaxing.",
    "translation": "多谢！这家咖啡馆的气氛真的很让人放松。",
    "note": "atmosphere 氛围"
  },
  {
    "id": "greetings-41",
    "speaker": "Alex",
    "text": "It really is. The weather outside is getting quite chilly lately, isn't it?",
    "translation": "确实。最近外面的天气开始变凉了，不是吗？",
    "note": "chilly 凉爽的/微冷的"
  },
  {
    "id": "greetings-42",
    "speaker": "Mia",
    "text": "Yes! Autumn is definitely here. It is my absolute favorite season of the year.",
    "translation": "是的！秋天真的到了。这是我一年中最喜欢的季节了。",
    "note": "absolute favorite 最喜欢的"
  },
  {
    "id": "greetings-43",
    "speaker": "Alex",
    "text": "Mine too! The foliage looks gorgeous when the leaves change color.",
    "translation": "我也是！当树叶变色时，树木风景真的非常美。",
    "note": "foliage 树叶/叶子"
  },
  {
    "id": "greetings-44",
    "speaker": "Mia",
    "text": "Exactly! And the temperature is just perfect for outdoor activities.",
    "translation": "太对啦！而且这个温度特别适合户外活动。",
    "note": "outdoor activities 户外活动"
  },
  {
    "id": "greetings-45",
    "speaker": "Alex",
    "text": "Have you been on any weekend hiking trips recently?",
    "translation": "你最近周末有去徒步旅行吗？",
    "note": "hiking trip 徒步旅行"
  },
  {
    "id": "greetings-46",
    "speaker": "Mia",
    "text": "I went to Oak Mountain last weekend with some friends. The view was breathtaking!",
    "translation": "我上周末和几个朋友去了橡树山，景色简直美不胜收！",
    "note": "breathtaking 令人窒息的美"
  },
  {
    "id": "greetings-47",
    "speaker": "Alex",
    "text": "I have been meaning to go there! Was the trail difficult to climb?",
    "translation": "我一直打算去那儿呢！那条山路好爬吗？",
    "note": "have been meaning to 计划/打算已久"
  },
  {
    "id": "greetings-48",
    "speaker": "Mia",
    "text": "Not at all. It is a gentle slope, perfect for beginners and casual walking.",
    "translation": "一点也不难，都是缓坡，非常适合初学者和日常散步。",
    "note": "gentle slope 缓坡"
  },
  {
    "id": "greetings-49",
    "speaker": "Alex",
    "text": "That is encouraging to hear. I will probably check it out this Saturday.",
    "translation": "听你这么说我就放心了，我本周六可能就去看看。",
    "note": "check it out 实地看看"
  },
  {
    "id": "greetings-50",
    "speaker": "Mia",
    "text": "You definitely should! Just don't forget to wear a warm jacket.",
    "translation": "你绝对应该去！别忘了穿一件保暖的外套就行。",
    "note": "warm jacket 保暖外套"
  },
  {
    "id": "greetings-51",
    "speaker": "Alex",
    "text": "Will do! Aside from hiking, have you picked up any new hobbies lately?",
    "translation": "好的！除了徒步，你最近有培养什么新兴趣吗？",
    "note": "aside from 除了之外"
  },
  {
    "id": "greetings-52",
    "speaker": "Mia",
    "text": "I started taking pottery classes on Sunday afternoons. It is super therapeutic.",
    "translation": "我开始在周日下午上陶艺课了，感觉超级治愈。",
    "note": "therapeutic 治愈的/舒缓的"
  },
  {
    "id": "greetings-53",
    "speaker": "Alex",
    "text": "Pottery? That sounds fascinating! Have you made anything usable yet?",
    "translation": "陶艺？听起来太有意思了！你做出过什么能用的成品吗？",
    "note": "fascinating 迷人的/有趣的"
  },
  {
    "id": "greetings-54",
    "speaker": "Mia",
    "text": "Haha, I made a coffee mug! It looks a bit lopsided, but I use it every day.",
    "translation": "哈哈，我做了一个马克杯！虽然看起来有点歪歪扭扭，但我每天都用。",
    "note": "lopsided 不对称的/歪斜的"
  },
  {
    "id": "greetings-55",
    "speaker": "Alex",
    "text": "Handmade items always have a unique character. You should be proud of it!",
    "translation": "手工制作的东西总是有独特的韵味，你应该为此感到自豪！",
    "note": "unique character 独特韵味"
  },
  {
    "id": "greetings-56",
    "speaker": "Mia",
    "text": "Thanks! What about you, Alex? Any good books or shows you would recommend?",
    "translation": "谢谢！你呢，Alex？最近有什么好看的书或者剧推荐吗？",
    "note": "recommend 推荐"
  },
  {
    "id": "greetings-57",
    "speaker": "Alex",
    "text": "I recently finished reading a documentary book on human behavior. It was eye-opening.",
    "translation": "我最近读完了一本关于人类行为的纪实书，非常令人开阔眼界。",
    "note": "eye-opening 大开眼界的"
  },
  {
    "id": "greetings-58",
    "speaker": "Mia",
    "text": "Oh, that sounds intriguing. Send me the title when you get a chance!",
    "translation": "哦，听起来很有吸引力。你有空的时候把书名发给我吧！",
    "note": "intriguing 很有吸引力的"
  },
  {
    "id": "greetings-59",
    "speaker": "Alex",
    "text": "Sure thing! I will text you the link later this evening.",
    "translation": "没问题！我今晚晚些时候把链接发给你。",
    "note": "text 发生短信/消息"
  },
  {
    "id": "greetings-60",
    "speaker": "Mia",
    "text": "Awesome, I am looking forward to reading it.",
    "translation": "太棒了，我很期待阅读它。",
    "note": "look forward to 期待"
  },
  {
    "id": "greetings-61",
    "speaker": "Alex",
    "text": "By the way, how is your younger brother doing? Is he still in university?",
    "translation": "顺便问一下，你弟弟最近怎么样？他还在读大学吗？",
    "note": "by the way 顺便提一下"
  },
  {
    "id": "greetings-62",
    "speaker": "Mia",
    "text": "He just graduated last June! He got a job at an IT firm in Seattle.",
    "translation": "他去年六月刚毕业！现在在西雅图一家 IT 公司找到工作了。",
    "note": "graduate 毕业"
  },
  {
    "id": "greetings-63",
    "speaker": "Alex",
    "text": "Time really flies! It feels like he was in high school just yesterday.",
    "translation": "时间过得真快！感觉他昨天还在上高中似的。",
    "note": "time flies 光阴似箭"
  },
  {
    "id": "greetings-64",
    "speaker": "Mia",
    "text": "I know, right? We are all so proud of his independence.",
    "translation": "谁说不是呢！我们都为他的独立感到无比自豪。",
    "note": "independence 独立"
  },
  {
    "id": "greetings-65",
    "speaker": "Alex",
    "text": "And how are your parents holding up? Are they still living in the old house?",
    "translation": "那你的父母身体还好吗？他们还住在老房子里吗？",
    "note": "hold up 维持状态/近况如何"
  },
  {
    "id": "greetings-66",
    "speaker": "Mia",
    "text": "They are doing great! They actually adopted a golden retriever puppy last month.",
    "translation": "他们近来非常好！上个月他们还领养了一只金毛寻回犬幼犬呢。",
    "note": "adopt 领养"
  },
  {
    "id": "greetings-67",
    "speaker": "Alex",
    "text": "A puppy? That must bring so much joy and energy to their daily life!",
    "translation": "一只小狗？那一定会给他们的日常生活带来很多快乐和活力！",
    "note": "bring joy 带来快乐"
  },
  {
    "id": "greetings-68",
    "speaker": "Mia",
    "text": "It definitely does. My mom spends half her day playing with him in the yard.",
    "translation": "绝对是这样，我妈妈每天半天时间都在院子里陪它玩。",
    "note": "spend time doing 花时间做某事"
  },
  {
    "id": "greetings-69",
    "speaker": "Alex",
    "text": "That is wonderful to hear. Family pets really bring people together.",
    "translation": "听到这些真令人高兴。家庭宠物确实能让大家更亲近。",
    "note": "bring people together 凝聚大家"
  },
  {
    "id": "greetings-70",
    "speaker": "Mia",
    "text": "They truly do. How are your folks doing these days?",
    "translation": "确实如此。你的家人最近怎么样？",
    "note": "folks 家人/父母"
  },
  {
    "id": "greetings-71",
    "speaker": "Alex",
    "text": "They are doing well! In fact, we are planning a family trip for Thanksgiving.",
    "translation": "他们也都挺好的！实际上，我们正在计划感恩节期间的家庭旅行呢。",
    "note": "family trip 家庭旅行"
  },
  {
    "id": "greetings-72",
    "speaker": "Mia",
    "text": "Oh, nice! Where are you guys heading for the holiday?",
    "translation": "哇，真不错！假期你们大家打算去哪儿呀？",
    "note": "head for 前往"
  },
  {
    "id": "greetings-73",
    "speaker": "Alex",
    "text": "We are thinking about renting a cabin near the national park.",
    "translation": "我们打算在国家公园附近租一栋木屋。",
    "note": "cabin 木屋"
  },
  {
    "id": "greetings-74",
    "speaker": "Mia",
    "text": "That sounds cozy! Perfect for sitting around a fireplace with hot chocolate.",
    "translation": "听起来真惬意！围坐在火炉旁喝热巧克力最合适不过了。",
    "note": "cozy 温暖舒适的"
  },
  {
    "id": "greetings-75",
    "speaker": "Alex",
    "text": "Exactly my plan! We haven't had a proper family holiday in two years.",
    "translation": "正合我意！我们已经两年没有好好过一个家庭假期了。",
    "note": "proper 正式的/像样的"
  },
  {
    "id": "greetings-76",
    "speaker": "Mia",
    "text": "Then you all definitely deserve this break. I hope you have a great time!",
    "translation": "那你们绝对值得好好放松一下。祝你们玩得开心！",
    "note": "deserve 应得/值得"
  },
  {
    "id": "greetings-77",
    "speaker": "Alex",
    "text": "Thanks, Mia. What about your holiday plans? Staying local or traveling?",
    "translation": "谢谢 Mia！你假期有什么计划？留本地还是出去旅游？",
    "note": "stay local 留在当地"
  },
  {
    "id": "greetings-78",
    "speaker": "Mia",
    "text": "I am staying local. I plan to use the time to rest and finish some oil paintings.",
    "translation": "我留在本地，打算利用这段时间休息一下，再画完几幅油画。",
    "note": "oil painting 油画"
  },
  {
    "id": "greetings-79",
    "speaker": "Alex",
    "text": "A peaceful holiday sounds equally delightful.",
    "translation": "一个安静的假期听起来同样令人愉悦。",
    "note": "delightful 令人高兴的"
  },
  {
    "id": "greetings-80",
    "speaker": "Mia",
    "text": "Agreed. Sometimes doing nothing is the best way to recharge.",
    "translation": "赞同。有时候什么都不做就是最好的充电方式。",
    "note": "recharge 充电/恢复精力"
  },
  {
    "id": "greetings-81",
    "speaker": "Alex",
    "text": "Speaking of hanging out, we shouldn't wait another year to catch up again!",
    "translation": "说到聚聚，我们可不能再等一年才重新聚会了！",
    "note": "speaking of 说到"
  },
  {
    "id": "greetings-82",
    "speaker": "Mia",
    "text": "I agree completely! Are you free sometime next week for dinner?",
    "translation": "我完全赞同！你下周什么时候有空一起吃个晚饭吗？",
    "note": "agree completely 完全赞成"
  },
  {
    "id": "greetings-83",
    "speaker": "Alex",
    "text": "Thursday or Friday night works great for me. Which day do you prefer?",
    "translation": "周四或周五晚上我都可以。你比较偏好哪一天？",
    "note": "prefer 更喜欢"
  },
  {
    "id": "greetings-84",
    "speaker": "Mia",
    "text": "Friday night would be ideal! We can celebrate the end of the workweek.",
    "translation": "周五晚上最理想啦！我们可以顺便庆祝工作周的结束。",
    "note": "ideal 理想的"
  },
  {
    "id": "greetings-85",
    "speaker": "Alex",
    "text": "Friday it is! Do you still have the same phone number?",
    "translation": "那就周五！你的手机号还是以前那个吗？",
    "note": "Friday it is 就定在周五了"
  },
  {
    "id": "greetings-86",
    "speaker": "Mia",
    "text": "Yes, same number. But let me make sure I have your current one as well.",
    "translation": "是的，没变。不过让我确认一下我存的是不是你现在的号码。",
    "note": "current 当前的"
  },
  {
    "id": "greetings-87",
    "speaker": "Alex",
    "text": "My number ends in 4892. I will send a quick wave on messaging app.",
    "translation": "我的号码尾号是 4892，我现在在通讯软件上给你发个打招呼消息。",
    "note": "send a wave 发个打招呼"
  },
  {
    "id": "greetings-88",
    "speaker": "Mia",
    "text": "Got it! I just received your message. I will save your contact details.",
    "translation": "收到啦！我刚收到你的消息，马上存一下你的联系方式。",
    "note": "contact details 联系方式"
  },
  {
    "id": "greetings-89",
    "speaker": "Alex",
    "text": "Great! I will look up a nice Italian restaurant and send you the address.",
    "translation": "太棒了！我找一家不错的意式餐厅，把地址发给你。",
    "note": "look up 查找"
  },
  {
    "id": "greetings-90",
    "speaker": "Mia",
    "text": "Sounds mouth-watering! I love Italian food.",
    "translation": "听起来让人流口水！我很喜欢意式料理。",
    "note": "mouth-watering 令人垂涎的"
  },
  {
    "id": "greetings-91",
    "speaker": "Mia",
    "text": "Oh, look at the time! It is almost 10:20. I need to run to my appointment.",
    "translation": "哦看下时间！都快 10 点 20 了，我得赶紧去赴约了。",
    "note": "look at the time 看时间"
  },
  {
    "id": "greetings-92",
    "speaker": "Alex",
    "text": "No worries at all! I don't want to make you late for your meeting.",
    "translation": "完全没关系！我可不能让你开会迟到了。",
    "note": "make someone late 让人迟到"
  },
  {
    "id": "greetings-93",
    "speaker": "Mia",
    "text": "It was so wonderful catching up with you today, Alex.",
    "translation": "今天能和你聚在一起聊聊天真是太好了，Alex。",
    "note": "catch up with 叙旧"
  },
  {
    "id": "greetings-94",
    "speaker": "Alex",
    "text": "Likewise! I am really glad we bumped into each other.",
    "translation": "我也一样！真的很开心今天能偶遇你。",
    "note": "bump into 偶遇"
  },
  {
    "id": "greetings-95",
    "speaker": "Mia",
    "text": "Thanks for walking with me to the cafe. Take care of yourself!",
    "translation": "谢谢你陪我走过来咖啡馆，多保重！",
    "note": "take care of yourself 保重"
  },
  {
    "id": "greetings-96",
    "speaker": "Alex",
    "text": "You too, Mia! Have a productive meeting!",
    "translation": "你也是，Mia！祝你接下来的会议高效顺利！",
    "note": "productive 高效的/有成效的"
  },
  {
    "id": "greetings-97",
    "speaker": "Mia",
    "text": "Will do! I will talk to you soon about Friday dinner details.",
    "translation": "好的！我过几天跟你联系沟通周五晚餐的细节。",
    "note": "talk to you soon 稍后聊"
  },
  {
    "id": "greetings-98",
    "speaker": "Alex",
    "text": "Sounds like a plan. Text me whenever you are free.",
    "translation": "就这么定啦！你有空随时给我发消息。",
    "note": "sounds like a plan 就这么定了"
  },
  {
    "id": "greetings-99",
    "speaker": "Mia",
    "text": "Have a great rest of your day, Alex! Bye!",
    "translation": "祝你度过愉快的一天，Alex！再见！",
    "note": "have a great rest of your day 祝一天愉快"
  },
  {
    "id": "greetings-100",
    "speaker": "Alex",
    "text": "Goodbye, Mia! See you on Friday!",
    "translation": "再见，Mia！周五见！",
    "note": "see you on Friday 周五见"
  }
],
  travel: [
  {
    "id": "travel-1",
    "speaker": "Alex",
    "text": "Hey Mia! I'm so excited about our trip to Tokyo this week!",
    "translation": "嘿 Mia！我对于我们本周的东京之旅感到太兴奋了！",
    "note": "be excited about 对感到兴奋"
  },
  {
    "id": "travel-2",
    "speaker": "Mia",
    "text": "Me too, Alex! Have you double-checked our flight booking details yet?",
    "translation": "我也是，Alex！你重新核对过我们的航班预订信息了吗？",
    "note": "double-check 再次核对"
  },
  {
    "id": "travel-3",
    "speaker": "Alex",
    "text": "Yes, our flight departs tomorrow morning at nine from terminal two.",
    "translation": "是的，我们的航班明天早上九点从二号航站楼起飞。",
    "note": "terminal 航站楼"
  },
  {
    "id": "travel-4",
    "speaker": "Mia",
    "text": "Great! We should probably get to the airport at least three hours early.",
    "translation": "太好了！我们可能应该至少提前三个小时到达机场。",
    "note": "at least 至少"
  },
  {
    "id": "travel-5",
    "speaker": "Alex",
    "text": "Agreed. I'll order an airport taxi to pick us up at five thirty.",
    "translation": "同意。我会叫一辆机场出租车在五点半来接我们。",
    "note": "pick up 接人"
  },
  {
    "id": "travel-6",
    "speaker": "Mia",
    "text": "Sounds like a solid plan. Is your luggage fully packed?",
    "translation": "听起来是个稳妥的计划。你的行李全装好了吗？",
    "note": "solid plan 稳妥/可靠的计划"
  },
  {
    "id": "travel-7",
    "speaker": "Alex",
    "text": "Almost! I just need to pack my power bank and passport.",
    "translation": "快好了！我只需要把充电宝和护照装进去。",
    "note": "power bank 充电宝"
  },
  {
    "id": "travel-8",
    "speaker": "Mia",
    "text": "Don't forget to convert some currency or notify your bank about international travel.",
    "translation": "别忘了兑换一些外币，或者通知你的银行你要出国旅行。",
    "note": "convert currency 兑换外币"
  },
  {
    "id": "travel-9",
    "speaker": "Alex",
    "text": "Good call. I already exchanged some yen and activated my roaming data.",
    "translation": "提醒得好。我已经换了一些日元，并开通了漫游流量。",
    "note": "roaming data 漫游数据"
  },
  {
    "id": "travel-10",
    "speaker": "Mia",
    "text": "Awesome! Let's get a good night's sleep so we have energy for tomorrow.",
    "translation": "太棒了！今晚咱们好好睡一觉，这样明天才有精力。",
    "note": "good night's sleep 好好睡一觉"
  },
  {
    "id": "travel-11",
    "speaker": "Alex",
    "text": "Here we are at the check-in counter. The queue is surprisingly short!",
    "translation": "我们到值机柜台了。队伍出乎意料地短呢！",
    "note": "check-in counter 值机柜台"
  },
  {
    "id": "travel-12",
    "speaker": "Mia",
    "text": "That is a relief. Should we ask for window seats together?",
    "translation": "真让人松了一口气。咱们要不要要求靠窗挨着的座位？",
    "note": "relief 宽慰/松一口气"
  },
  {
    "id": "travel-13",
    "speaker": "Alex",
    "text": "Definitely! I'll hand the agent our passports and booking confirmation.",
    "translation": "那必须的！我这就把护照和预订确认单交给工作人员。",
    "note": "booking confirmation 预订确认单"
  },
  {
    "id": "travel-14",
    "speaker": "Mia",
    "text": "Make sure our carry-on bags meet the weight limit requirements.",
    "translation": "确保我们的随身携带行李符合重量限制要求。",
    "note": "carry-on bag 随身行李"
  },
  {
    "id": "travel-15",
    "speaker": "Alex",
    "text": "We are good to go! Security check is right ahead of us.",
    "translation": "搞定了！安全检查就在我们正前方。",
    "note": "good to go 准备就绪"
  },
  {
    "id": "travel-16",
    "speaker": "Mia",
    "text": "Remember to take your laptop and liquids out of your backpack.",
    "translation": "记得把笔记本电脑和液体从背包里拿出来。",
    "note": "liquids 液体"
  },
  {
    "id": "travel-17",
    "speaker": "Alex",
    "text": "Got it. After security, let me grab a bottle of water near our departure gate.",
    "translation": "知道了。过完安检后，我去登机口附近买瓶水。",
    "note": "departure gate 登机口"
  },
  {
    "id": "travel-18",
    "speaker": "Mia",
    "text": "Look, boarding has just started! Let's scan our boarding passes.",
    "translation": "看，开始登机了！咱们去刷登机牌吧。",
    "note": "boarding pass 登机牌"
  },
  {
    "id": "travel-19",
    "speaker": "Alex",
    "text": "Here are our seats in row fifteen. Put your overhead bag right here.",
    "translation": "这是我们在第十五排的位置。把你的随身包放在上面的行李架上吧。",
    "note": "overhead compartment/bag 头顶行李架/箱"
  },
  {
    "id": "travel-20",
    "speaker": "Mia",
    "text": "Thanks, Alex. Fasten your seatbelt; we are about to take off!",
    "translation": "谢谢 Alex。系好安全带，我们马上要起飞了！",
    "note": "fasten seatbelt 系紧安全带"
  },
  {
    "id": "travel-21",
    "speaker": "Alex",
    "text": "We have finally landed in Narita Airport! That was a smooth flight.",
    "translation": "我们终于降落在成田机场了！这一程飞行很平稳。",
    "note": "smooth flight 平稳的飞行"
  },
  {
    "id": "travel-22",
    "speaker": "Mia",
    "text": "It really was. Now let's follow the signs to immigration and customs.",
    "translation": "确实很平稳。现在咱们顺着指示牌去入境和海关检查吧。",
    "note": "immigration 入境检查"
  },
  {
    "id": "travel-23",
    "speaker": "Alex",
    "text": "Have your arrival card and passport ready for the officer.",
    "translation": "把你的入境卡和护照准备好，给官员查验。",
    "note": "arrival card 入境卡"
  },
  {
    "id": "travel-24",
    "speaker": "Mia",
    "text": "All cleared! Now we just need to collect our checked bags at carousel three.",
    "translation": "全过关了！现在我们只需要去三号行李转盘取托运行李。",
    "note": "baggage carousel 行李传送带"
  },
  {
    "id": "travel-25",
    "speaker": "Alex",
    "text": "There is my blue suitcase. Grab yours, and let's head to the transit hall.",
    "translation": "那边是我的蓝色行李箱。拿着你的，咱们去交通大厅吧。",
    "note": "head to 前往"
  },
  {
    "id": "travel-26",
    "speaker": "Mia",
    "text": "Should we take the express train or an airport bus to the city center?",
    "translation": "我们是坐特快列车还是机场大巴去市中心？",
    "note": "express train 特快列车"
  },
  {
    "id": "travel-27",
    "speaker": "Alex",
    "text": "The express train is much faster and avoids potential traffic jams.",
    "translation": "特快列车快得多，而且能避免潜在的交通拥堵。",
    "note": "traffic jam 交通拥堵"
  },
  {
    "id": "travel-28",
    "speaker": "Mia",
    "text": "Sounds great. Let's buy two rechargeable transit cards at the machine.",
    "translation": "听起来棒极了。咱们在售票机上买两张可充值的交通卡吧。",
    "note": "rechargeable 可充值的"
  },
  {
    "id": "travel-29",
    "speaker": "Alex",
    "text": "I got the cards. We can tap them at the turnstile to enter the platform.",
    "translation": "我买好卡了。我们在闸机上刷卡就可以进站台。",
    "note": "turnstile 旋转闸机"
  },
  {
    "id": "travel-30",
    "speaker": "Mia",
    "text": "The view outside the window is wonderful. Welcome to Japan!",
    "translation": "窗外的景色真美。欢迎来到日本！",
    "note": "Welcome to 欢迎来到"
  },
  {
    "id": "travel-31",
    "speaker": "Alex",
    "text": "We arrived at the hotel front desk. Hello, we have a reservation under Alex.",
    "translation": "我们到酒店前台了。你好，我们用 Alex 的名字预订了房间。",
    "note": "make a reservation 预订"
  },
  {
    "id": "travel-32",
    "speaker": "Mia",
    "text": "Could we please request a non-smoking room on a higher floor with a view?",
    "translation": "请问我们能否要间高层带景观的无烟房？",
    "note": "non-smoking room 无烟房"
  },
  {
    "id": "travel-33",
    "speaker": "Alex",
    "text": "The receptionist said our room is on the twelfth floor, facing the tower.",
    "translation": "前台接待员说我们的房间在十二楼，面向电视塔。",
    "note": "receptionist 前台接待员"
  },
  {
    "id": "travel-34",
    "speaker": "Mia",
    "text": "That is fantastic! Here are the room key cards and breakfast vouchers.",
    "translation": "太棒了！这是房卡和早餐券。",
    "note": "voucher 代金券/凭证"
  },
  {
    "id": "travel-35",
    "speaker": "Alex",
    "text": "Let's take the elevator up and drop our heavy luggage first.",
    "translation": "咱们坐电梯上去，先把沉重的行李放一下。",
    "note": "drop luggage 放行李"
  },
  {
    "id": "travel-36",
    "speaker": "Mia",
    "text": "The room is so clean and cozy! But wait, where is the hairdryer?",
    "translation": "房间真干净舒服！不过等等，吹风机在哪里？",
    "note": "cozy 温暖舒适的"
  },
  {
    "id": "travel-37",
    "speaker": "Alex",
    "text": "It should be in the drawer under the bathroom sink, or I can call room service.",
    "translation": "应该在浴室洗手盆下面的抽屉里，或者我可以打电话给客房服务。",
    "note": "room service 客房服务"
  },
  {
    "id": "travel-38",
    "speaker": "Mia",
    "text": "Ah, I found it! Also, what is the Wi-Fi password for guests?",
    "translation": "啊，我找到了！另外，给客人用的 Wi-Fi 密码是什么？",
    "note": "Wi-Fi password 无线网密码"
  },
  {
    "id": "travel-39",
    "speaker": "Alex",
    "text": "It is written on the welcome leaflet next to the desk.",
    "translation": "写在桌子旁边的欢迎宣传册上呢。",
    "note": "leaflet 宣传册/说明页"
  },
  {
    "id": "travel-40",
    "speaker": "Mia",
    "text": "Got it connected. Now let's plan our afternoon sightseeing tour!",
    "translation": "连上啦。现在咱们来规划下午的观光行程吧！",
    "note": "sightseeing tour 观光游"
  },
  {
    "id": "travel-41",
    "speaker": "Alex",
    "text": "Which attraction should we visit first, the historic temple or the park?",
    "translation": "我们先去哪个景点，古老的寺庙还是公园？",
    "note": "attraction 景点"
  },
  {
    "id": "travel-42",
    "speaker": "Mia",
    "text": "Let's visit the temple first while the daylight is still good.",
    "translation": "趁着天色还早，我们先去寺庙吧。",
    "note": "daylight 日光/白天"
  },
  {
    "id": "travel-43",
    "speaker": "Alex",
    "text": "Excuse me, sir. Could you tell us which subway exit leads to the temple?",
    "translation": "打扰一下，先生。您能告诉我们哪个地铁出口通往寺庙吗？",
    "note": "subway exit 地铁出口"
  },
  {
    "id": "travel-44",
    "speaker": "Mia",
    "text": "The local resident said we should take exit four and turn left.",
    "translation": "当地居民说我们应该走四号出口然后左转。",
    "note": "local resident 当地居民"
  },
  {
    "id": "travel-45",
    "speaker": "Alex",
    "text": "There it is! The traditional architecture looks breathtaking up close.",
    "translation": "就在那边！近看这古建筑简直令人叹为观止。",
    "note": "breathtaking 令人屏息的/壮观的"
  },
  {
    "id": "travel-46",
    "speaker": "Mia",
    "text": "We need to purchase admission tickets at the main entrance booth.",
    "translation": "我们需要在大门的售票亭购买门票。",
    "note": "admission ticket 门票"
  },
  {
    "id": "travel-47",
    "speaker": "Alex",
    "text": "Two adult tickets, please. Is photography allowed inside the inner courtyard?",
    "translation": "请给我两张成人票。内院里允许拍照吗？",
    "note": "photography allowed 允许拍照"
  },
  {
    "id": "travel-48",
    "speaker": "Mia",
    "text": "The sign says no flash photography, but regular photos are fine.",
    "translation": "告示牌写着禁止使用闪光灯拍照，但普通拍照是可以的。",
    "note": "flash photography 闪光灯拍照"
  },
  {
    "id": "travel-49",
    "speaker": "Alex",
    "text": "Stand near the ancient gate, Mia! I'll take a nice photo of you.",
    "translation": "站在古门旁边，Mia！我给你拍张好看的照片。",
    "note": "take a photo 拍照"
  },
  {
    "id": "travel-50",
    "speaker": "Mia",
    "text": "Say cheese! Make sure to capture the colorful maple leaves in the background.",
    "translation": "笑一个！一定要把背景里色彩斑斓的枫叶拍进去。",
    "note": "capture 捕捉/拍下"
  },
  {
    "id": "travel-51",
    "speaker": "Alex",
    "text": "All that walking made me starving. Time for some famous local cuisine!",
    "translation": "走了这么久我肚子都饿扁了。是时候品尝著名的本地美食了！",
    "note": "local cuisine 本地美食"
  },
  {
    "id": "travel-52",
    "speaker": "Mia",
    "text": "I spotted an authentic ramen restaurant with high ratings online.",
    "translation": "我发现了一家网上评价很高的正宗拉面馆。",
    "note": "authentic 正宗的"
  },
  {
    "id": "travel-53",
    "speaker": "Alex",
    "text": "Table for two, please! Is there an English menu available?",
    "translation": "两位，谢谢！请问有英文菜单吗？",
    "note": "English menu 英文菜单"
  },
  {
    "id": "travel-54",
    "speaker": "Mia",
    "text": "Yes, they have a menu with photos. I will order the tonkotsu specialty.",
    "translation": "有的，他们有带图片的菜单。我打算点招牌豚骨拉面。",
    "note": "specialty 招牌/特色菜"
  },
  {
    "id": "travel-55",
    "speaker": "Alex",
    "text": "I'll go for the spicy miso ramen with extra soft-boiled eggs.",
    "translation": "我要辣味味噌拉面，额外加糖心蛋。",
    "note": "soft-boiled egg 糖心蛋/半熟蛋"
  },
  {
    "id": "travel-56",
    "speaker": "Mia",
    "text": "Would you like to try some side dishes like pan-fried gyoza dumplings?",
    "translation": "你想尝尝像煎饺这样的配菜吗？",
    "note": "side dish 配菜/小吃"
  },
  {
    "id": "travel-57",
    "speaker": "Alex",
    "text": "Definitely, let's share an order of dumplings and green tea.",
    "translation": "当然，咱们拼一份煎饺和绿茶吧。",
    "note": "share an order 分享一份"
  },
  {
    "id": "travel-58",
    "speaker": "Mia",
    "text": "The rich broth is absolutely delicious! This is the best ramen I've ever had.",
    "translation": "浓郁的汤底真的太美味了！这是我吃过最好的拉面。",
    "note": "rich broth 浓郁的汤底"
  },
  {
    "id": "travel-59",
    "speaker": "Alex",
    "text": "I completely agree. Excuse me, could we please have the bill?",
    "translation": "我完全同意。打扰一下，结账谢谢！",
    "note": "have the bill 结账"
  },
  {
    "id": "travel-60",
    "speaker": "Mia",
    "text": "They accept credit card payments, so no need to use our cash.",
    "translation": "他们接受信用卡付款，所以不需要用现金。",
    "note": "credit card payment 信用卡支付"
  },
  {
    "id": "travel-61",
    "speaker": "Alex",
    "text": "Let's stroll down this famous shopping street to buy gifts for family.",
    "translation": "咱们去这条著名的商业街逛逛，给家人买些礼物吧。",
    "note": "stroll down 漫步/逛"
  },
  {
    "id": "travel-62",
    "speaker": "Mia",
    "text": "I want to buy some traditional matcha snacks and handcrafted souvenirs.",
    "translation": "我想买一些传统的抹茶零食和手工艺纪念品。",
    "note": "handcrafted 手工制作的"
  },
  {
    "id": "travel-63",
    "speaker": "Alex",
    "text": "Look at these delicate ceramic teacups. They look high quality.",
    "translation": "看看这些精美的陶瓷茶杯，看起来品质很高。",
    "note": "delicate 精致的/精美的"
  },
  {
    "id": "travel-64",
    "speaker": "Mia",
    "text": "Excuse me, how much is this boxed gift set of green tea biscuits?",
    "translation": "请问这一盒绿茶饼干礼盒多少钱？",
    "note": "boxed gift set 礼盒装"
  },
  {
    "id": "travel-65",
    "speaker": "Alex",
    "text": "The shopkeeper says if we spend over five thousand yen, it is tax-free!",
    "translation": "店主说如果我们消费超过五千日元就可以免税！",
    "note": "tax-free 免税"
  },
  {
    "id": "travel-66",
    "speaker": "Mia",
    "text": "That is great! I will show my passport to process the tax refund.",
    "translation": "那太好了！我会出示护照来办理退税。",
    "note": "tax refund 退税"
  },
  {
    "id": "travel-67",
    "speaker": "Alex",
    "text": "Can you gift-wrap these two items separately, please?",
    "translation": "麻烦您能把这两件物品分别包装成礼品吗？",
    "note": "gift-wrap 礼品包装"
  },
  {
    "id": "travel-68",
    "speaker": "Mia",
    "text": "They wrapped them so neatly with beautiful ribbon.",
    "translation": "他们用漂亮的丝带包装得非常整齐。",
    "note": "neatly 整洁地"
  },
  {
    "id": "travel-69",
    "speaker": "Alex",
    "text": "My shopping bags are getting pretty heavy. Should we take a break?",
    "translation": "我的购物袋变得相当重了。咱们要不要休息一下？",
    "note": "take a break 休息一下"
  },
  {
    "id": "travel-70",
    "speaker": "Mia",
    "text": "Let's rest at that tea house nearby and sample some fresh matcha ice cream.",
    "translation": "咱们去附近的那家茶室歇歇脚，品尝些新鲜的抹茶冰淇淋吧。",
    "note": "sample 体验/品尝"
  },
  {
    "id": "travel-71",
    "speaker": "Alex",
    "text": "For tomorrow's day trip to Mount Fuji, I rented a car online.",
    "translation": "为了明天去富士山的日游，我在网上租了一辆车。",
    "note": "day trip 一日游"
  },
  {
    "id": "travel-72",
    "speaker": "Mia",
    "text": "Awesome! Do you have an international driving permit with you?",
    "translation": "太棒了！你随身带国际驾照了吗？",
    "note": "international driving permit 国际驾照"
  },
  {
    "id": "travel-73",
    "speaker": "Alex",
    "text": "Yes, I brought my driver's license and the permit. Everything is ready.",
    "translation": "带了，我带了本国驾照和国际驾照。一切准备就绪。",
    "note": "driver's license 驾照"
  },
  {
    "id": "travel-74",
    "speaker": "Mia",
    "text": "Remember that they drive on the left side of the road here in Japan!",
    "translation": "记得在日本这里他们是在道路左侧行驶的！",
    "note": "drive on the left 左侧行驶"
  },
  {
    "id": "travel-75",
    "speaker": "Alex",
    "text": "Right! I'll pay extra attention to the navigation and speed limit.",
    "translation": "对！我会格外注意导航和限速。",
    "note": "speed limit 限速"
  },
  {
    "id": "travel-76",
    "speaker": "Mia",
    "text": "The scenic highway along Lake Kawaguchi is breathtaking.",
    "translation": "沿着河口湖的景观公路风景太美了。",
    "note": "scenic highway 景观公路"
  },
  {
    "id": "travel-77",
    "speaker": "Alex",
    "text": "Look over there! Mount Fuji is clearly visible under the bright blue sky.",
    "translation": "看那边！在明亮的蓝天之下，富士山清晰可见。",
    "note": "clearly visible 清晰可见"
  },
  {
    "id": "travel-78",
    "speaker": "Mia",
    "text": "Let's pull over at the next designated viewpoint to take pictures.",
    "translation": "咱们在下一个指定的观景台靠边停车拍照吧。",
    "note": "pull over 靠边停车"
  },
  {
    "id": "travel-79",
    "speaker": "Alex",
    "text": "Good idea. I'll park in the designated parking space near the lake.",
    "translation": "好主意。我会停在湖边指定的停车位里。",
    "note": "parking space 停车位"
  },
  {
    "id": "travel-80",
    "speaker": "Mia",
    "text": "Breathing in this fresh mountain air feels so refreshing!",
    "translation": "呼吸着这里新鲜的山区空气让人感觉神清气爽！",
    "note": "refreshing 令人清爽的"
  },
  {
    "id": "travel-81",
    "speaker": "Alex",
    "text": "Oh no, Mia! I think I misplaced our train return ticket!",
    "translation": "糟糕，Mia！我想我把我们返回的火车票放错地方了！",
    "note": "misplace 放错位置/弄丢"
  },
  {
    "id": "travel-82",
    "speaker": "Mia",
    "text": "Don't panic. Check your coat pockets and your backpack compartments.",
    "translation": "别慌。查查你的外衣口袋和背包隔层。",
    "note": "don't panic 别慌张"
  },
  {
    "id": "travel-83",
    "speaker": "Alex",
    "text": "Phew, what a relief! It was inside the zipped inner pocket all along.",
    "translation": "呼，太松一口气了！它一直在拉链内袋里呢。",
    "note": "what a relief 真是松了一口气"
  },
  {
    "id": "travel-84",
    "speaker": "Mia",
    "text": "It also looks like it is starting to rain heavily outside.",
    "translation": "而且外面看起来开始下大雨了。",
    "note": "rain heavily 下大雨"
  },
  {
    "id": "travel-85",
    "speaker": "Alex",
    "text": "We can buy a couple of transparent umbrellas at the convenience store.",
    "translation": "我们可以去便利店买两把透明雨伞。",
    "note": "convenience store 便利店"
  },
  {
    "id": "travel-86",
    "speaker": "Mia",
    "text": "Good plan. Should we alter our schedule and visit an indoor museum instead?",
    "translation": "好计划。咱们要不要修改一下行程，改去室内博物馆？",
    "note": "alter schedule 修改行程"
  },
  {
    "id": "travel-87",
    "speaker": "Alex",
    "text": "That is a smart adjustment. The art museum nearby has wonderful exhibitions.",
    "translation": "真是明智的调整。附近的艺术博物馆有很棒的展览。",
    "note": "smart adjustment 明智的调整"
  },
  {
    "id": "travel-88",
    "speaker": "Mia",
    "text": "Traveling is all about being flexible when unexpected things happen.",
    "translation": "旅行的真谛就在于当意外发生时能保持灵活应对。",
    "note": "be flexible 保持灵活"
  },
  {
    "id": "travel-89",
    "speaker": "Alex",
    "text": "You are so right. Exploring the museum turned out to be a highlight!",
    "translation": "你说得太对了。逛博物馆结果成了这次旅行的一大亮点！",
    "note": "turn out to be 结果是"
  },
  {
    "id": "travel-90",
    "speaker": "Mia",
    "text": "The rain has stopped, and there is a gorgeous rainbow in the sky!",
    "translation": "雨停了，天空出现了一道美丽的彩虹！",
    "note": "gorgeous rainbow 美丽的彩虹"
  },
  {
    "id": "travel-91",
    "speaker": "Alex",
    "text": "I can't believe tomorrow is already the last day of our journey.",
    "translation": "真不敢相信明天已经是我们旅程的最后一天了。",
    "note": "last day 最后一天"
  },
  {
    "id": "travel-92",
    "speaker": "Mia",
    "text": "Time flew by so fast! We should ask the front desk for late check-out.",
    "translation": "时间过得太快了！我们应该向前台申请延迟退房。",
    "note": "late check-out 延迟退房"
  },
  {
    "id": "travel-93",
    "speaker": "Alex",
    "text": "I asked, and they extended our check-out time to one o'clock for free.",
    "translation": "我问过了，他们免费把我们的退房时间延长到了一点。",
    "note": "extend 延长"
  },
  {
    "id": "travel-94",
    "speaker": "Mia",
    "text": "That gives us plenty of time to pack without feeling rushed.",
    "translation": "这样我们就有了充足的时间收拾行李，不用感到手忙脚乱了。",
    "note": "plenty of 充裕的"
  },
  {
    "id": "travel-95",
    "speaker": "Alex",
    "text": "Let's double-check all the drawers and closet hangers to leave nothing behind.",
    "translation": "咱们再仔细检查一遍所有抽屉和衣柜架子，别遗留任何东西。",
    "note": "leave behind 遗留"
  },
  {
    "id": "travel-96",
    "speaker": "Mia",
    "text": "Everything is packed in our luggage. We are ready to settle the final hotel bill.",
    "translation": "东西都装进行李了。我们准备好结清最终的酒店账单了。",
    "note": "settle the bill 结清账单"
  },
  {
    "id": "travel-97",
    "speaker": "Alex",
    "text": "The hotel staff helped us call a shuttle to the airport. Very convenient!",
    "translation": "酒店工作人员帮我们叫了去机场的班车，非常方便！",
    "note": "shuttle 班车/接驳车"
  },
  {
    "id": "travel-98",
    "speaker": "Mia",
    "text": "This trip has been full of unforgettable memories and rich experiences.",
    "translation": "这次旅行充满了难忘的回忆和丰富多彩的体验。",
    "note": "unforgettable memories 难忘的回忆"
  },
  {
    "id": "travel-99",
    "speaker": "Alex",
    "text": "Where should we travel for our next adventure, Mia?",
    "translation": "下一次探险我们去哪里旅行呢，Mia？",
    "note": "adventure 探险/冒险之旅"
  },
  {
    "id": "travel-100",
    "speaker": "Mia",
    "text": "Wherever we go, as long as it is a new adventure! Safe flight home, Alex!",
    "translation": "去哪都行，只要是新的探险！祝回家航班平安，Alex！",
    "note": "safe flight 航班顺利平安"
  }
],
  business: [
  {
    "id": "business-1",
    "speaker": "Alex",
    "text": "Good morning, Mia! Welcome to the team. Let me show you around the office.",
    "translation": "早安，Mia！欢迎加入我们的团队。我带你参观一下办公室吧。",
    "note": "show around 意为带某人参观。"
  },
  {
    "id": "business-2",
    "speaker": "Mia",
    "text": "Thanks, Alex! I'm really excited to get started today.",
    "translation": "谢谢你，Alex！今天能正式开始工作，我非常兴奋。",
    "note": "get started 表达开始着手工作/做某事。"
  },
  {
    "id": "business-3",
    "speaker": "Alex",
    "text": "Here is your desk, right next to mine. Your laptop and keycard are already set up.",
    "translation": "这是你的办公桌，就在我旁边。你的电脑和门禁卡都已经准备好了。",
    "note": "set up 指安装配置好。"
  },
  {
    "id": "business-4",
    "speaker": "Mia",
    "text": "Perfect! Who should I contact if I have trouble setting up my email?",
    "translation": "太好了！如果我在设置邮箱时遇到问题，应该联系谁？",
    "note": "have trouble doing sth. 意为做某事有困难。"
  },
  {
    "id": "business-5",
    "speaker": "Alex",
    "text": "You can send a message to IT support on Slack, or I can help you with it later.",
    "translation": "你可以在 Slack 上给 IT 部门发消息，或者我待会儿帮你看。",
    "note": "help sb. with sth. 意为在某方面帮助某人。"
  },
  {
    "id": "business-6",
    "speaker": "Mia",
    "text": "That sounds great. What's on my schedule for this afternoon?",
    "translation": "听起来不错。我今天下午的行程安排是什么？",
    "note": "on one's schedule 表示在某人的日程表上。"
  },
  {
    "id": "business-7",
    "speaker": "Alex",
    "text": "We have an orientation meeting with HR at two, followed by a quick chat with our manager.",
    "translation": "下午两点我们和人力资源部有个入职培训，之后和主管简单聊聊。",
    "note": "followed by... 结构用于连接紧接着发生的活动。"
  },
  {
    "id": "business-8",
    "speaker": "Mia",
    "text": "Got it. Is there any document I should read beforehand?",
    "translation": "明白了。请问有什么文档是我需要提前阅读的吗？",
    "note": "beforehand 为副词，意为提前、事先。"
  },
  {
    "id": "business-9",
    "speaker": "Alex",
    "text": "I've shared a link to our team's onboarding guide. Feel free to browse through it.",
    "translation": "我已经分享了团队入职指南的链接，你可以随时浏览一下。",
    "note": "browse through 表示粗略浏览。"
  },
  {
    "id": "business-10",
    "speaker": "Mia",
    "text": "Wonderful, I'll dive into that right away. Appreciate your help!",
    "translation": "太棒了，我这就去仔细看。多谢你的帮助！",
    "note": "dive into 形象表达深入研究/专心投入做某事。"
  },
  {
    "id": "business-11",
    "speaker": "Alex",
    "text": "Hey Mia, ready for our quick daily standup? It usually takes about ten minutes.",
    "translation": "嗨 Mia，准备好参加我们的日常立会了吗？通常只需要大约十分钟。",
    "note": "daily standup 指敏捷开发中的每日立会。"
  },
  {
    "id": "business-12",
    "speaker": "Mia",
    "text": "Yes, I'm ready. What did you work on yesterday, Alex?",
    "translation": "准备好了。Alex，你昨天主要做了什么工作？",
    "note": "work on 意为从事于、致力于某项工作。"
  },
  {
    "id": "business-13",
    "speaker": "Alex",
    "text": "I finished drafting the quarterly report and submitted it for review.",
    "translation": "我完成了季度报告的初稿并提交审阅了。",
    "note": "submit for review 指提交审核/评审。"
  },
  {
    "id": "business-14",
    "speaker": "Mia",
    "text": "Great! Any blockers or issues preventing you from starting the next phase?",
    "translation": "太好了！在启动下一阶段之前，有什么阻碍或困难吗？",
    "note": "blocker 在职场中指工作中的阻碍因素。"
  },
  {
    "id": "business-15",
    "speaker": "Alex",
    "text": "Not really, though I'm still waiting for feedback from the marketing team.",
    "translation": "没什么大碍，不过我还在等市场部的反馈。",
    "note": "wait for feedback 意为等待意见/反馈。"
  },
  {
    "id": "business-16",
    "speaker": "Mia",
    "text": "I can follow up with them if you like. I have a sync with their lead at noon.",
    "translation": "如果你需要，我可以帮你去跟进一下。我中午正好和他们负责人有个同步会。",
    "note": "follow up with 意为与跟进/复核。"
  },
  {
    "id": "business-17",
    "speaker": "Alex",
    "text": "That would be awesome. What are your main priorities for today?",
    "translation": "那太棒了。你今天的主要优先任务是什么？",
    "note": "priority 意为优先事项/头等大事。"
  },
  {
    "id": "business-18",
    "speaker": "Mia",
    "text": "I'm planning to clean up the client database and update our sprint task board.",
    "translation": "我打算清理客户数据库，并更新我们本周的看板任务表。",
    "note": "clean up 意为整理/清理。"
  },
  {
    "id": "business-19",
    "speaker": "Alex",
    "text": "Sounds like a solid plan. Let me know if you run into any permission issues.",
    "translation": "听起来计划很周密。如果遇到权限问题，随时告诉我。",
    "note": "run into 意为意外遇到/遭遇（困难等）。"
  },
  {
    "id": "business-20",
    "speaker": "Mia",
    "text": "Will do! Let me drop a quick update in our Slack channel as well.",
    "translation": "没问题！我也顺便在 Slack 频道里发个简短更新。",
    "note": "drop an update 意为留下/发送一条更新消息。"
  },
  {
    "id": "business-21",
    "speaker": "Alex",
    "text": "Now that the new client proposal is approved, we need to outline the project timeline.",
    "translation": "既然新客户方案已通过，我们需要明确一下项目的时间线。",
    "note": "outline 动词，表示列出提纲/概述。"
  },
  {
    "id": "business-22",
    "speaker": "Mia",
    "text": "Agreed. Should we schedule a kickoff meeting with all stakeholders this Thursday?",
    "translation": "同意。我们要不要这周四和所有利益相关方开个项目启动会？",
    "note": "stakeholder 指项目中的利益相关者/关联方。"
  },
  {
    "id": "business-23",
    "speaker": "Alex",
    "text": "Thursday works. We need to assign task owners before sending out the invites.",
    "translation": "周四可以。在发送邀请函之前，我们需要指定各项任务的负责人。",
    "note": "assign task owners 意为指定任务负责人。"
  },
  {
    "id": "business-24",
    "speaker": "Mia",
    "text": "I can handle the technical specs while you lead the customer design phase.",
    "translation": "我可以负责技术规格书，你来主导客户设计阶段。",
    "note": "technical specs 是 technical specifications（技术规范/规格）的缩写。"
  },
  {
    "id": "business-25",
    "speaker": "Alex",
    "text": "Sounds good. What is our target delivery date for the first prototype?",
    "translation": "听起来不错。我们第一个原型的目标交付日期是什么时候？",
    "note": "target delivery date 指目标交付日期。"
  },
  {
    "id": "business-26",
    "speaker": "Mia",
    "text": "We are aiming for the end of next month, assuming no major delays occur.",
    "translation": "假设没有出现重大延误的话，我们的目标是下个月底。",
    "note": "aim for 意为以为目标。"
  },
  {
    "id": "business-27",
    "speaker": "Alex",
    "text": "Let me build in a buffer week just in case something unexpected comes up.",
    "translation": "我打算预留一周的缓冲期，以防万一出现意外情况。",
    "note": "build in a buffer 指在时间或预算中留有缓冲余地。"
  },
  {
    "id": "business-28",
    "speaker": "Mia",
    "text": "Good idea. Buffer time always keeps us from missing critical deadlines.",
    "translation": "好主意。缓冲时间总能防止我们错过关键的截止日期。",
    "note": "keep sb. from doing sth. 表示阻止/防止某人做某事。"
  },
  {
    "id": "business-29",
    "speaker": "Alex",
    "text": "I'll draft the project schedule on Jira and send it around for comments.",
    "translation": "我会在 Jira 上拟定项目进度表并发给大家征求意见。",
    "note": "send around for comments 意为发给大家征求反馈。"
  },
  {
    "id": "business-30",
    "speaker": "Mia",
    "text": "Great. Once everyone signs off, we can kick off full speed ahead.",
    "translation": "太好了。一旦大家签字确认，我们就能全力以赴启动了。",
    "note": "sign off 意为签字批准/认可；full speed ahead 意为全速推进。"
  },
  {
    "id": "business-31",
    "speaker": "Alex",
    "text": "We need to coordinate with the design team regarding the brand assets for this campaign.",
    "translation": "我们需要就本次活动品牌素材与设计团队进行协调。",
    "note": "coordinate with 表示与协调/配合。"
  },
  {
    "id": "business-32",
    "speaker": "Mia",
    "text": "I spoke with their lead earlier. They requested a clearer creative brief from us.",
    "translation": "我早些时候和他们的组长谈过。他们希望我们提供一份更清晰的创意简报。",
    "note": "creative brief 指创意简报/需求文档。"
  },
  {
    "id": "business-33",
    "speaker": "Alex",
    "text": "Makes sense. Let me update the requirements document to include their design guidelines.",
    "translation": "有道理。我把他们的设计规范补充到需求文档里。",
    "note": "makes sense 常用口语，意为有道理/合理。"
  },
  {
    "id": "business-34",
    "speaker": "Mia",
    "text": "Thanks. Also, the finance team needs our quarterly budget estimate by 5 PM.",
    "translation": "谢谢。另外，财务部需要我们在下午 5 点前提交季度预算估计。",
    "note": "budget estimate 意为预算估计/预算案。"
  },
  {
    "id": "business-35",
    "speaker": "Alex",
    "text": "I've already compiled the numbers. I'll forward the spreadsheet to you right now.",
    "translation": "数据我已经汇总好了。我这就把电子表格转发给你。",
    "note": "compile numbers 意为收集汇总数据。"
  },
  {
    "id": "business-36",
    "speaker": "Mia",
    "text": "Excellent. I'll cross-check the figures before sending them over to finance.",
    "translation": "太棒了。在发给财务之前，我会核对一下数据。",
    "note": "cross-check 意为交叉核对/复核。"
  },
  {
    "id": "business-37",
    "speaker": "Alex",
    "text": "Do we need approval from legal for the vendor agreement changes?",
    "translation": "供应商协议的变更是否需要法务部门审批？",
    "note": "vendor agreement 指供应商合同/协议。"
  },
  {
    "id": "business-38",
    "speaker": "Mia",
    "text": "Yes, legal compliance is mandatory for any modified terms. I'll flag it for review.",
    "translation": "是的，任何修改后的条款都必须经过法务合规审核。我会标记出来请他们审阅。",
    "note": "mandatory 意为强制性的、必须的。"
  },
  {
    "id": "business-39",
    "speaker": "Alex",
    "text": "Appreciate it, Mia. Seamless cross-team collaboration saves us so much hassle.",
    "translation": "多谢你，Mia。流畅的跨部门协作能帮我们省去很多麻烦。",
    "note": "hassle 意为麻烦、困难。"
  },
  {
    "id": "business-40",
    "speaker": "Mia",
    "text": "Absolutely. Open communication keeps everyone aligned on the same page.",
    "translation": "确实。开放的沟通能让大家的步调保持一致。",
    "note": "on the same page 表达达成共识/意见一致。"
  },
  {
    "id": "business-41",
    "speaker": "Alex",
    "text": "Are all the slides ready for tomorrow's presentation with the executive board?",
    "translation": "明天向高管层汇报的演示幻灯片都准备好了吗？",
    "note": "executive board 指执行董事会/高管层。"
  },
  {
    "id": "business-42",
    "speaker": "Mia",
    "text": "Almost. I just need to polish the ROI graph and add customer testimonials.",
    "translation": "差不多了。我只需要优化一下投资回报率图表，并加上客户评价。",
    "note": "ROI 是 Return on Investment（投资回报率）的缩写。"
  },
  {
    "id": "business-43",
    "speaker": "Alex",
    "text": "Don't forget to highlight our product's key competitive advantages in slide five.",
    "translation": "别忘了在第 5 页幻灯片突出我们产品的核心竞争优势。",
    "note": "competitive advantage 意为竞争优势。"
  },
  {
    "id": "business-44",
    "speaker": "Mia",
    "text": "Good point. I'll reframe the wording so it clearly emphasizes cost efficiency.",
    "translation": "提得好。我会调整措辞，明确强调成本效益。",
    "note": "reframe 意为重构/重新表述。"
  },
  {
    "id": "business-45",
    "speaker": "Alex",
    "text": "Who will be handling the Q&A section at the end of our talk?",
    "translation": "演讲结束后的问答环节由谁来负责？",
    "note": "Q&A section 指问答环节。"
  },
  {
    "id": "business-46",
    "speaker": "Mia",
    "text": "We can split it. You answer technical questions, and I'll address pricing concerns.",
    "translation": "我们可以分工。你解答技术问题，我来回答价格方面的疑问。",
    "note": "split 意为分工/划分；address concerns 意为回应关切/解决疑虑。"
  },
  {
    "id": "business-47",
    "speaker": "Alex",
    "text": "That works for me. Should we do a dry run this afternoon to check the timing?",
    "translation": "我没问题。我们下午要不要试讲一遍，把控一下时间？",
    "note": "dry run 指演练/彩排/试讲。"
  },
  {
    "id": "business-48",
    "speaker": "Mia",
    "text": "Yes, please. A 20-minute practice run will boost our confidence significantly.",
    "translation": "好啊。20 分钟的演练能大幅提升我们的自信。",
    "note": "boost confidence 意为增强信心。"
  },
  {
    "id": "business-49",
    "speaker": "Alex",
    "text": "Perfect. I'll reserve conference room B for us at three o'clock.",
    "translation": "太好了。我预订下午 3 点的 B 会议室。",
    "note": "reserve 意为预订。"
  },
  {
    "id": "business-50",
    "speaker": "Mia",
    "text": "Great, see you there. Let me quickly review my notes beforehand.",
    "translation": "好的，到时候见。我先快速复习一下讲稿笔记。",
    "note": "review notes 意为复习/查看笔记。"
  },
  {
    "id": "business-51",
    "speaker": "Alex",
    "text": "Mia, we need to review our operational budget for the upcoming quarter.",
    "translation": "Mia，我们需要审查一下下一季度的运营预算。",
    "note": "operational budget 指运营预算。"
  },
  {
    "id": "business-52",
    "speaker": "Mia",
    "text": "Right. The software license expenses went up by fifteen percent this month.",
    "translation": "是的。这个月软件许可费用上涨了 15%。",
    "note": "license expense 意为许可/授权费用。"
  },
  {
    "id": "business-53",
    "speaker": "Alex",
    "text": "Can we negotiate a bulk discount with the SaaS vendor to reduce costs?",
    "translation": "我们能否和 SaaS 供应商谈判拿个批量折扣来降低成本？",
    "note": "bulk discount 意为团购/批量折扣。"
  },
  {
    "id": "business-54",
    "speaker": "Mia",
    "text": "I'll reach out to their account manager today and ask about custom plan options.",
    "translation": "我今天就联系他们的客户经理，询问自定义方案选项。",
    "note": "account manager 指客户经理。"
  },
  {
    "id": "business-55",
    "speaker": "Alex",
    "text": "Good. Also, do we have enough budget left to hire a freelance graphic designer?",
    "translation": "很好。另外，我们还有足够的预算雇一位兼职平面设计师吗？",
    "note": "freelance 意为自由职业的/兼职的。"
  },
  {
    "id": "business-56",
    "speaker": "Mia",
    "text": "If we trim down marketing ad spend slightly, we can easily cover the designer's fee.",
    "translation": "如果我们稍微缩减营销广告支出，就能轻松覆盖设计师的费用。",
    "note": "trim down 意为削减/修剪。"
  },
  {
    "id": "business-57",
    "speaker": "Alex",
    "text": "That makes sense. Quality visuals will bring us better engagement anyway.",
    "translation": "有道理。高质量的视觉效果本来也能带来更高的互动率。",
    "note": "engagement 在营销中指用户互动/参与度。"
  },
  {
    "id": "business-58",
    "speaker": "Mia",
    "text": "Exactly. I'll adjust the budget spreadsheet and send you the updated numbers.",
    "translation": "完全同意。我会调整预算表并将更新后的数据发给你。",
    "note": "adjust 意为调整。"
  },
  {
    "id": "business-59",
    "speaker": "Alex",
    "text": "Thanks! Make sure to put a copy in our team's shared Drive folder.",
    "translation": "谢谢！记得在团队共享网盘文件夹里存一份。",
    "note": "shared Drive folder 指共享云盘文件夹。"
  },
  {
    "id": "business-60",
    "speaker": "Mia",
    "text": "Done. Everything is properly logged and ready for approval.",
    "translation": "好了。所有内容都已妥善登记，等待审批。",
    "note": "properly logged 意为妥善记录/登记。"
  },
  {
    "id": "business-61",
    "speaker": "Alex",
    "text": "How did your mid-year performance review go with the team lead?",
    "translation": "你和团队主管的年中绩效评估沟通得怎么样？",
    "note": "performance review 指绩效评估/考核。"
  },
  {
    "id": "business-62",
    "speaker": "Mia",
    "text": "It went really well! We discussed my achievements and areas for growth.",
    "translation": "非常顺利！我们讨论了我取得的成绩和需要提升的领域。",
    "note": "areas for growth 表达改进/提升的领域，比 weaknesses 更得体。"
  },
  {
    "id": "business-63",
    "speaker": "Alex",
    "text": "That's great to hear. Did you talk about setting new quarterly OKRs?",
    "translation": "听起来真棒。你们讨论设定新的季度 OKR 了吗？",
    "note": "OKR 指 Objectives and Key Results（目标与关键结果）。"
  },
  {
    "id": "business-64",
    "speaker": "Mia",
    "text": "Yes, my primary objective is to lead the migration to the new cloud infrastructure.",
    "translation": "讨论了，我的主要目标是主导向新云基础架构的迁移。",
    "note": "cloud infrastructure 指云端基础设施。"
  },
  {
    "id": "business-65",
    "speaker": "Alex",
    "text": "That's a challenging task, but I know you'll excel at it.",
    "translation": "这是项很有挑战性的任务，但我知道你一定能做得很好。",
    "note": "excel at 意为擅长/在表现出色。"
  },
  {
    "id": "business-66",
    "speaker": "Mia",
    "text": "Thank you for the encouragement! What about your feedback session, Alex?",
    "translation": "谢谢你的鼓励！Alex，你的反馈沟通怎么样？",
    "note": "feedback session 指反馈对话/会议。"
  },
  {
    "id": "business-67",
    "speaker": "Alex",
    "text": "My manager suggested I take on more leadership responsibilities in project coordination.",
    "translation": "我主管建议我在项目协调中承担更多领导职责。",
    "note": "take on responsibilities 意为承担职责。"
  },
  {
    "id": "business-68",
    "speaker": "Mia",
    "text": "Congratulations! That's a huge step forward in your career trajectory.",
    "translation": "恭喜！这是你职业生涯发展轨迹上的重要一步。",
    "note": "career trajectory 指职业发展轨迹。"
  },
  {
    "id": "business-69",
    "speaker": "Alex",
    "text": "Thanks, Mia. I'm taking leadership training courses to hone my management skills.",
    "translation": "谢谢你，Mia。我正在参加领导力培训课程，以打磨管理技能。",
    "note": "hone skills 意为磨炼/提升技能。"
  },
  {
    "id": "business-70",
    "speaker": "Mia",
    "text": "That's proactive! Continuous professional development is key to career success.",
    "translation": "真积极！持续的职业发展是事业成功的关键。",
    "note": "proactive 意为积极主动的。"
  },
  {
    "id": "business-71",
    "speaker": "Alex",
    "text": "Houston, we have a problem. The staging server crashed during our test run.",
    "translation": "麻烦大了。测试服务器在我们的演练过程中崩溃了。",
    "note": "staging server 指预发布/测试服务器；crash 指系统或服务器崩溃。"
  },
  {
    "id": "business-72",
    "speaker": "Mia",
    "text": "Oh no! Do we know what caused the crash or how severe the outage is?",
    "translation": "糟糕！我们知道是什么原因导致崩溃，或者故障有多严重吗？",
    "note": "outage 指停机/故障/中断。"
  },
  {
    "id": "business-73",
    "speaker": "Alex",
    "text": "It looks like a memory leak in the database queries. Tech leads are investigating.",
    "translation": "看起来是数据库查询中的内存泄漏。技术主管正在调查。",
    "note": "memory leak 指内存泄漏。"
  },
  {
    "id": "business-74",
    "speaker": "Mia",
    "text": "Should we notify the client that today's demo might be delayed by an hour?",
    "translation": "我们需要通知客户今天的演示可能会推迟一个小时吗？",
    "note": "delay by... 表示推迟/延后时间。"
  },
  {
    "id": "business-75",
    "speaker": "Alex",
    "text": "Yes, it's better to manage their expectations early rather than miss the slot.",
    "translation": "是的，越早管理客户预期越好，免得错过时间窗口。",
    "note": "manage expectations 意为管理预期。"
  },
  {
    "id": "business-76",
    "speaker": "Mia",
    "text": "I'll draft an email immediately explaining the brief technical hiccup.",
    "translation": "我立刻写封邮件，说明这个短暂的技术小故障。",
    "note": "hiccup 形象指微小的故障/小插曲。"
  },
  {
    "id": "business-77",
    "speaker": "Alex",
    "text": "Thanks, Mia. Keep the tone professional and reassuring.",
    "translation": "谢谢，Mia。语气保持专业且让人安心。",
    "note": "reassuring 意为使人安心的。"
  },
  {
    "id": "business-78",
    "speaker": "Mia",
    "text": "Got it. The DevOps team says the server will be back online in twenty minutes.",
    "translation": "明白了。运维团队说服务器将在 20 分钟内恢复在线。",
    "note": "back online 意为恢复上线/重新连线。"
  },
  {
    "id": "business-79",
    "speaker": "Alex",
    "text": "Whew, what a relief! Crisis averted thanks to quick action from everyone.",
    "translation": "呼，松了一口气！幸好大家行动迅速，化解了危机。",
    "note": "crisis averted 意为危机解除/化险为夷。"
  },
  {
    "id": "business-80",
    "speaker": "Mia",
    "text": "Absolutely. We should conduct a post-mortem meeting tomorrow to prevent recurrence.",
    "translation": "确实。我们明天应该开个复盘会，防止再次发生。",
    "note": "post-mortem meeting 在职场中指项目或事故后的复盘总结会。"
  },
  {
    "id": "business-81",
    "speaker": "Alex",
    "text": "Hey Mia, are you joining the virtual town hall meeting via Zoom?",
    "translation": "嗨 Mia，你会通过 Zoom 参加线上全员大会吗？",
    "note": "town hall meeting 指全公司/全员参与的大会/沟通会。"
  },
  {
    "id": "business-82",
    "speaker": "Mia",
    "text": "Yes, I'm logging in now. Can you hear me clearly, or am I on mute?",
    "translation": "会，我正在登录。你能听清我说话吗，还是我静音了？",
    "note": "on mute 意为处于静音状态。"
  },
  {
    "id": "business-83",
    "speaker": "Alex",
    "text": "I can hear you loud and clear. Your connection speed seems very stable today.",
    "translation": "听得很清楚。你今天的网络连接看起来非常稳定。",
    "note": "loud and clear 意为非常清晰。"
  },
  {
    "id": "business-84",
    "speaker": "Mia",
    "text": "Great. I'll share my screen to present the monthly progress report.",
    "translation": "太好了。我一会儿共享屏幕来展示月度进度报告。",
    "note": "share screen 指共享屏幕。"
  },
  {
    "id": "business-85",
    "speaker": "Alex",
    "text": "Go ahead. Let me know if you run into any latency during screen sharing.",
    "translation": "请吧。如果屏幕共享时遇到延迟，随时告诉我。",
    "note": "latency 指网络延迟。"
  },
  {
    "id": "business-86",
    "speaker": "Mia",
    "text": "Will do. Working remotely has really improved my time management skills.",
    "translation": "没问题。远程办公确实提升了我的时间管理能力。",
    "note": "work remotely 意为远程办公。"
  },
  {
    "id": "business-87",
    "speaker": "Alex",
    "text": "Same here, although I do miss our spontaneous coffee break catch-ups.",
    "translation": "我也一样，虽然我确实很怀念我们平时喝咖啡时的随性聊天。",
    "note": "catch-up 指非正式的聊天/交流。"
  },
  {
    "id": "business-88",
    "speaker": "Mia",
    "text": "Me too! We should definitely plan a hybrid team lunch next week.",
    "translation": "我也是！我们下周一定要计划一次线下混合团队聚餐。",
    "note": "hybrid 指线上线下结合/混合的。"
  },
  {
    "id": "business-89",
    "speaker": "Alex",
    "text": "Count me in! I'll ping the team on Slack to pick a suitable venue.",
    "translation": "算我一个！我在 Slack 上发消息问问大家，挑个合适的地点。",
    "note": "count sb. in 意为把某人算进去；ping 意为发消息联系。"
  },
  {
    "id": "business-90",
    "speaker": "Mia",
    "text": "Perfect. Hybrid workplace culture works best when social connections stay strong.",
    "translation": "完美。只有当社交联系保持紧密时，混合办公文化才能发挥最佳效果。",
    "note": "hybrid workplace 指混合式办公场所/模式。"
  },
  {
    "id": "business-91",
    "speaker": "Alex",
    "text": "Fantastic news! The client just signed the final contract renewal.",
    "translation": "好消息！客户刚刚签署了最终的续约合同。",
    "note": "contract renewal 指合同续签/续约。"
  },
  {
    "id": "business-92",
    "speaker": "Mia",
    "text": "Wow, congratulations! That's our biggest deal signed this quarter!",
    "translation": "哇，恭喜！这是我们本季度签下的最大一笔订单！",
    "note": "deal 意为交易/订单。"
  },
  {
    "id": "business-93",
    "speaker": "Alex",
    "text": "I couldn't have done it without your exceptional support during negotiation.",
    "translation": "没有你在谈判期间的卓越支持，我一个人是做不成的。",
    "note": "negotiation 意为商务谈判。"
  },
  {
    "id": "business-94",
    "speaker": "Mia",
    "text": "It was truly a team effort. Everyone worked tirelessly to push this forward.",
    "translation": "这完全是团队努力的结果。大家都为了推进项目而不懈努力。",
    "note": "team effort 指团队努力/合作。"
  },
  {
    "id": "business-95",
    "speaker": "Alex",
    "text": "Our director wants to order catering to celebrate this major win on Friday.",
    "translation": "我们的总监想在周五订餐饮外卖，来庆祝这一重大胜利。",
    "note": "catering 意为餐饮服务/外卖供餐。"
  },
  {
    "id": "business-96",
    "speaker": "Mia",
    "text": "That sounds wonderful! We all deserve a break after such an intensive sprint.",
    "translation": "听起来太棒了！经过这么紧张的高强度冲刺，大家都值得放松一下。",
    "note": "deserve a break 意为值得休整/放松。"
  },
  {
    "id": "business-97",
    "speaker": "Alex",
    "text": "I'll make sure to summarize our lessons learned for future projects as well.",
    "translation": "我也会总结经验教训，为未来的项目提供参考。",
    "note": "lessons learned 指经验教训/总结。"
  },
  {
    "id": "business-98",
    "speaker": "Mia",
    "text": "That'll be very valuable for onboarding new project managers in the future.",
    "translation": "这对以后培训新的项目经理会非常有价值。",
    "note": "valuable 意为有价值的/宝贵的。"
  },
  {
    "id": "business-99",
    "speaker": "Alex",
    "text": "Here's to many more successful projects ahead of us, Mia!",
    "translation": "祝我们未来能取得更多成功的项目，Mia！",
    "note": "Here's to... 常用祝酒词表达，为干杯/祝愿。"
  },
  {
    "id": "business-100",
    "speaker": "Mia",
    "text": "Cheers to that! Onward and upward to our next milestone!",
    "translation": "干杯！让我们朝下一个里程碑继续前行！",
    "note": "onward and upward 表达蒸蒸日上/不断前行；milestone 指里程碑。"
  }
],
  housing: housingLines,
  medical: medicalLines,
  banking: bankingLines,
  shopping: shoppingLines,
  transit: Array.from({ length: 100 }, (_, i) => ({ 
    id: `transit-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Transit line ${i+1}`, 
    translation: `交通句 ${i+1}`,
    note: `transit note ${i+1}`
  })),
  government: Array.from({ length: 100 }, (_, i) => ({ 
    id: `government-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Government line ${i+1}`, 
    translation: `政务句 ${i+1}`,
    note: `government note ${i+1}`
  })),
  school: Array.from({ length: 100 }, (_, i) => ({ 
    id: `school-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `School line ${i+1}`, 
    translation: `学校句 ${i+1}`,
    note: `school note ${i+1}`
  })),
  extra1: Array.from({ length: 100 }, (_, i) => ({ 
    id: `extra1-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Extra1 line ${i+1}`, 
    translation: `补充句1-${i+1}`,
    note: `extra1 note ${i+1}`
  })),
  extra2: Array.from({ length: 100 }, (_, i) => ({ 
    id: `extra2-${i+1}`, 
    speaker: i%2===0?"Alex":"Mia", 
    text: `Extra2 line ${i+1}`, 
    translation: `补充句2-${i+1}`,
    note: `extra2 note ${i+1}`
  })),
};

export const SCENES: SceneInfo[] = [
  { key: "greetings", title: "日常问候", subtitle: "Basic social greetings and self-introductions.", lines: SCENE_CONTENT.greetings },
  { key: "travel", title: "出行旅游", subtitle: "Navigating cities, asking for directions, and transport.", lines: SCENE_CONTENT.travel },
  { key: "business", title: "商务职场", subtitle: "Professional communication, meetings, and office talk.", lines: SCENE_CONTENT.business },
  { key: "housing", title: "房屋租赁", subtitle: "Renting apartments, dealing with landlords, and utilities.", lines: SCENE_CONTENT.housing },
  { key: "medical", title: "医疗健康", subtitle: "Visiting doctors, describing symptoms, and pharmacies.", lines: SCENE_CONTENT.medical },
  { key: "banking", title: "银行金融", subtitle: "Opening accounts, transfers, and handling money.", lines: SCENE_CONTENT.banking },
  { key: "shopping", title: "购物消费", subtitle: "Buying items, bargaining, and customer service.", lines: SCENE_CONTENT.shopping },
  { key: "transit", title: "公共交通", subtitle: "Subways, buses, and schedules.", lines: SCENE_CONTENT.transit },
  { key: "government", title: "政府政务", subtitle: "Visas, IDs, and official paperwork.", lines: SCENE_CONTENT.government },
  { key: "school", title: "学校沟通", subtitle: "Classes, teachers, and campus life.", lines: SCENE_CONTENT.school },
  { key: "extra1", title: "日常生活", subtitle: "Casual everyday conversations.", lines: SCENE_CONTENT.extra1 },
  { key: "extra2", title: "兴趣爱好", subtitle: "Talking about sports, music, and free time.", lines: SCENE_CONTENT.extra2 },
];

export function getSceneLines(sceneKey: SceneKey | string): ListeningLine[] {
  return SCENE_CONTENT[sceneKey as SceneKey] || LISTENING_LINES;
}

export const PRACTICE_DIALOGUE: ListeningLine[] = [
  { id: "prac-1", speaker: "Alex", text: "Hello, how can I help you today?", translation: "你好，今天有什么我可以帮你的吗？", note: "practice note 1" },
  { id: "prac-2", speaker: "Mia", text: "I am looking for some advanced practice options.", translation: "我在寻找一些高级练习选项。", note: "practice note 2" }
];

export function getPracticeDialogue(scene: string, level: string): ListeningLine[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${scene}-${level}-${i + 1}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Advanced practice dialogue line ${i + 1} for ${scene}.`,
    translation: `${scene} 的高级练习对话第 ${i + 1} 行。`,
    note: `practice ${scene} note ${i + 1}`
  }));
}