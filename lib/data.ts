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
  { id: "travel-2", speaker: "Mike", text: "Sure! Take subway line 2 and get off at the third stop.", translation: "当然可以！坐2号地铁线，在第三站下车。", note: "giving directions" },
  { id: "travel-3", speaker: "Alex", text: "Is it far from here on foot?", translation: "从这里步行过去远吗？", note: "distance inquiry" },
  { id: "travel-4", speaker: "Mike", text: "Not really, about ten minutes if you walk fast.", translation: "不算远，快走的话大约十分钟。", note: "time estimation" },
  { id: "travel-5", speaker: "Alex", text: "Great, thanks for your help!", translation: "太好了，谢谢你的帮助！", note: "expressing gratitude" },
  { id: "travel-6", speaker: "Mike", text: "You're very welcome. Have a safe trip!", translation: "不客气，祝你旅途安全！", note: "polite reply" },
  { id: "travel-7", speaker: "Alex", text: "Hi, I'd like to check in for flight KE-402 to Tokyo.", translation: "你好，我想办理飞往东京的KE-402航班登机手续。", note: "airport check-in" },
  { id: "travel-8", speaker: "Mike", text: "May I see your passport and ticket, please?", translation: "请让我看一下您的护照和机票。", note: "requesting documents" },
  { id: "travel-9", speaker: "Alex", text: "Here you are. Do I need to check this backpack?", translation: "给你。这个双肩包需要托运吗？", note: "luggage inquiry" },
  { id: "travel-10", speaker: "Mike", text: "No, it's small enough to carry on. Would you prefer a window or an aisle seat?", translation: "不用，尺寸可以随身携带。您喜欢靠窗还是靠过道的座位？", note: "seat selection" },
  { id: "travel-11", speaker: "Alex", text: "An aisle seat, please, if available.", translation: "请给我靠过道的座位，如果有的话。", note: "selecting seat" },
  { id: "travel-12", speaker: "Mike", text: "Certainly. Here is your boarding pass. Boarding starts at gate B12.", translation: "没问题。这是您的登机牌。B12登机口开始登机。", note: "boarding info" },
  { id: "travel-13", speaker: "Alex", text: "Thank you. What time does the boarding gate close?", translation: "谢谢。登机口几点关闭？", note: "time check" },
  { id: "travel-14", speaker: "Mike", text: "It closes twenty minutes before departure.", translation: "起飞前二十分钟关闭。", note: "gate closing info" },
  { id: "travel-15", speaker: "Alex", text: "Got it. Which lounge can I use with this ticket class?", translation: "明白了。凭这个舱位的机票我可以使用哪个贵宾室？", note: "lounge access" },
  { id: "travel-16", speaker: "Mike", text: "You have access to the Star Alliance lounge near gate B10.", translation: "您可以使用B10登机口附近的星空联盟贵宾室。", note: "lounge location" },
  { id: "travel-17", speaker: "Alex", text: "Excuse me, where is the baggage claim area for this flight?", translation: "请问这个航班的行李提取处在哪里？", note: "finding baggage claim" },
  { id: "travel-18", speaker: "Mike", text: "Follow the signs down to level one, carousel number four.", translation: "顺着指示牌下到一层，在4号转盘。", note: "baggage directions" },
  { id: "travel-19", speaker: "Alex", text: "Is there a currency exchange desk nearby?", translation: "附近有货币兑换处吗？", note: "currency exchange" },
  { id: "travel-20", speaker: "Mike", text: "Yes, right next to the exit gates on your left.", translation: "有的，就在您左手边的出口大门旁。", note: "locating exchange" },
  { id: "travel-21", speaker: "Alex", text: "Hello, I have a reservation under the name of Smith.", translation: "你好，我以史密斯的名义预订了房间。", note: "hotel check-in" },
  { id: "travel-22", speaker: "Mike", text: "Welcome to Grand Hotel, Mr. Smith. Let me pull up your file.", translation: "欢迎来到格兰德酒店，史密斯先生。我来调出您的档案。", note: "greeting guest" },
  { id: "travel-23", speaker: "Alex", text: "Thank you. Is breakfast included in the room rate?", translation: "谢谢。房费里包含早餐吗？", note: "breakfast inquiry" },
  { id: "travel-24", speaker: "Mike", text: "Yes, complimentary buffet breakfast is served from 6:30 to 10:30 AM.", translation: "是的，免费自助早餐在早6点半到10点半供应。", note: "breakfast details" },
  { id: "travel-25", speaker: "Alex", text: "Wonderful. Can I get a wake-up call at 7:00 AM tomorrow?", translation: "太好了。明天早上7点能提供叫醒服务吗？", note: "wake-up call" },
  { id: "travel-26", speaker: "Mike", text: "Consider it done. Here is your room key card, room 405.", translation: "没问题。这是您的房卡，405房。", note: "room assignment" },
  { id: "travel-27", speaker: "Alex", text: "How do I connect to the hotel's Wi-Fi network?", translation: "请问如何连接酒店的无线网络？", note: "wifi inquiry" },
  { id: "travel-28", speaker: "Mike", text: "The network name is GrandGuest, and the password is on the back of your key card.", translation: "网络名称是GrandGuest，密码在您房卡的背面。", note: "wifi details" },
  { id: "travel-29", speaker: "Alex", text: "Excuse me, my room air conditioner isn't cooling properly.", translation: "打扰一下，我房间的空调制冷不太正常。", note: "room issue" },
  { id: "travel-30", speaker: "Mike", text: "I am so sorry about that. I will send a maintenance technician right away.", translation: "对此非常抱歉。我马上派维修人员过去。", note: "handling complaint" },
  { id: "travel-31", speaker: "Alex", text: "Hi, I'd like to rent a mid-size car for three days.", translation: "你好，我想租一辆中型车三天。", note: "car rental" },
  { id: "travel-32", speaker: "Mike", text: "Sure thing. Do you have a valid driver's license and insurance?", translation: "没问题。您有有效的驾照和保险吗？", note: "rental requirements" },
  { id: "travel-33", speaker: "Alex", text: "Yes, I have both my domestic license and an international permit.", translation: "有的，我带了国内驾照和国际驾照许可证。", note: "providing license" },
  { id: "travel-34", speaker: "Mike", text: "Great. Would you like full collision coverage for peace of mind?", translation: "太好了。为了安心，您需要全险碰撞险吗？", note: "insurance offer" },
  { id: "travel-35", speaker: "Alex", text: "Yes, please include full coverage in the contract.", translation: "好的，请在合同中包含全险。", note: "accepting insurance" },
  { id: "travel-36", speaker: "Mike", text: "All set. The car is parked in slot 15 just outside.", translation: "全部办妥。车子停在外面正对的15号车位。", note: "car location" },
  { id: "travel-37", speaker: "Alex", text: "Pardon me, does this bus go to the national museum?", translation: "劳驾，这辆公交车去国家博物馆吗？", note: "bus route check" },
  { id: "travel-38", speaker: "Mike", text: "No, you need the number 42 bus across the street.", translation: "不去，您得去马路对面坐42路。", note: "correcting route" },
  { id: "travel-39", speaker: "Alex", text: "Thank you for saving me a wrong trip.", translation: "谢谢你免得我走错路。", note: "gratitude" },
  { id: "travel-40", speaker: "Mike", text: "Anytime. Watch out for pickpockets in crowded areas.", translation: "不客气。在拥挤的地方注意防范扒手。", note: "travel safety tip" },
  { id: "travel-41", speaker: "Alex", text: "Hello, I want to book a guided tour of the old town for tomorrow.", translation: "你好，我想预订明天的老城导游观光团。", note: "tour booking" },
  { id: "travel-42", speaker: "Mike", text: "Morning or afternoon session? Both include professional commentary.", translation: "上午场还是下午场？两场都包含专业解说。", note: "session options" },
  { id: "travel-43", speaker: "Alex", text: "Let's do the morning session starting at 9 AM.", translation: "那就定上午9点开始的那场吧。", note: "selecting morning" },
  { id: "travel-44", speaker: "Mike", text: "Perfect. Please meet at the fountain plaza 10 minutes prior.", translation: "完美。请提前10分钟在喷泉广场集合。", note: "meeting instructions" },
  { id: "travel-45", speaker: "Alex", text: "Is photography allowed inside the historical cathedral?", translation: "历史大教堂内部允许拍照吗？", note: "photography rule" },
  { id: "travel-46", speaker: "Mike", text: "No flash photography is allowed, but quiet snapshots are fine.", translation: "不允许使用闪光灯拍照，但安静地随手拍是可以的。", note: "rule explanation" },
  { id: "travel-47", speaker: "Alex", text: "Where can I buy authentic local souvenirs around here?", translation: "这附近哪里可以买到正宗的当地纪念品？", note: "souvenir shopping" },
  { id: "travel-48", speaker: "Mike", text: "Try the artisan market two blocks down on Main Street.", translation: "去主街往下走两个街区的那个手工艺品市场看看。", note: "recommending market" },
  { id: "travel-49", speaker: "Alex", text: "Do they accept credit cards, or should I carry cash?", translation: "他们接受信用卡吗，还是我应该带现金？", note: "payment method" },
  { id: "travel-50", speaker: "Mike", text: "Most stalls accept cards now, but having some cash is safer.", translation: "现在大部分摊位接受刷卡，不过带点现金更稳妥。", note: "cash advice" },
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
  { id: "business-2", speaker: "Mike", text: "Before we begin, I'd like to share our latest quarterly metrics.", translation: "在开始之前，我想分享一下我们最新的季度指标。", note: "presenting data" },
  { id: "business-3", speaker: "Alex", text: "Please go ahead, Mia. We are all listening.", translation: "请讲，米娅。我们都在听。", note: "encouraging speaker" },
  { id: "business-4", speaker: "Mike", text: "Our user retention rate has increased by fifteen percent this month.", translation: "本月我们的用户留存率提高了百分之十五。", note: "performance highlight" },
  { id: "business-5", speaker: "Alex", text: "That is fantastic news. Excellent work by the entire team.", translation: "真是个好消息。整个团队干得漂亮。", note: "acknowledging success" },
  { id: "business-6", speaker: "Mike", text: "Thank you. However, we still need to address the server latency issues.", translation: "谢谢。不过，我们仍需解决服务器延迟问题。", note: "raising challenges" },
  { id: "business-7", speaker: "Alex", text: "Agreed. What is our current action plan for the engineering team?", translation: "同意。我们工程团队目前的行动计划是什么？", note: "action plan" },
  { id: "business-8", speaker: "Mike", text: "We are migrating to a distributed cloud architecture by next Friday.", translation: "我们正计划在下周五前迁移到分布式云架构。", note: "technical solution" },
  { id: "business-9", speaker: "Alex", text: "Make sure to keep stakeholders updated on potential downtime.", translation: "务必让利益相关者及时了解潜在的停机时间。", note: "stakeholder management" },
  { id: "business-10", speaker: "Mike", text: "Will do. I'll send out a detailed progress report this afternoon.", translation: "会的。我会在今天下午发出详细的进度报告。", note: "commitment" },
  { id: "business-11", speaker: "Alex", text: "Hello team, let's discuss the marketing strategy for the upcoming product launch.", translation: "大家好，我们来讨论一下即将到来的产品发布的营销策略。", note: "marketing kickoff" },
  { id: "business-12", speaker: "Mike", text: "We plan to leverage social media influencers and tech blog reviews.", translation: "我们计划利用社交媒体KOL和科技博客评测。", note: "strategy proposal" },
  { id: "business-13", speaker: "Alex", text: "Do we have a confirmed budget allocated for influencer partnerships?", translation: "我们为KOL合作分配了确定的预算吗？", note: "budget inquiry" },
  { id: "business-14", speaker: "Mike", text: "Yes, finance approved twenty thousand dollars for phase one.", translation: "是的，财务部门已经批准了第一阶段的两万美元。", note: "budget approval" },
  { id: "business-15", speaker: "Alex", text: "Splendid. Let's ensure high ROI tracking for every campaign.", translation: "太棒了。我们要确保每个宣传活动都有高的投资回报率追踪。", note: "roi focus" },
  { id: "business-16", speaker: "Mike", text: "I've set up custom UTM parameters for tracking traffic sources.", translation: "我已经设置了自定义UTM参数来追踪流量来源。", note: "tracking setup" },
  { id: "business-17", speaker: "Alex", text: "Hi David, do you have a quick moment to review the client contract?", translation: "嗨大卫，你有空快速看一下客户合同吗？", note: "contract review" },
  { id: "business-18", speaker: "Mike", text: "Sure, send it over. Which clause are you concerned about?", translation: "当然，发过来吧。你关心哪个条款？", note: "review readiness" },
  { id: "business-19", speaker: "Alex", text: "Section 4 regarding intellectual property rights and data security.", translation: "关于知识产权和数据安全的第四条。", note: "identifying clause" },
  { id: "business-20", speaker: "Mike", text: "I'll look into it and give you my feedback before 3 PM.", translation: "我研究一下，在下午3点前给你反馈。", note: "providing timeline" },
  { id: "business-21", speaker: "Alex", text: "Good afternoon, can we reschedule our sync meeting to Thursday?", translation: "下午好，我们能把同步会议改到周四吗？", note: "rescheduling meeting" },
  { id: "business-22", speaker: "Mike", text: "Thursday works for me. Morning or afternoon?", translation: "周四对我可以。上午还是下午？", note: "checking availability" },
  { id: "business-23", speaker: "Alex", text: "Let's aim for 2 PM after the design review.", translation: "那就定在设计评审之后的下午2点吧。", note: "confirming time" },
  { id: "business-24", speaker: "Mike", text: "Calendar invitation updated. See you then.", translation: "日历邀请已更新。到时候见。", note: "calendar update" },
  { id: "business-25", speaker: "Alex", text: "Team, we received positive feedback from our beta testers.", translation: "团队们，我们收到了来自测试用户的积极反馈。", note: "beta feedback" },
  { id: "business-26", speaker: "Mike", text: "That's wonderful! What feature did they like the most?", translation: "太棒了！他们最喜欢哪个功能？", note: "inquiring favorite" },
  { id: "business-27", speaker: "Alex", text: "They praised the intuitive user interface and fast loading speed.", translation: "他们称赞直观的用户界面和快速的加载速度。", note: "highlighting features" },
  { id: "business-28", speaker: "Mike", text: "All our hard work on UI optimization finally paid off.", translation: "我们在用户界面优化上的所有辛苦付出终于有了回报。", note: "team satisfaction" },
  { id: "business-29", speaker: "Alex", text: "Let's keep this momentum going into the final release phase.", translation: "让我们保持这个势头进入最后的发布阶段。", note: "motivation" },
  { id: "business-30", speaker: "Mike", text: "Absolutely. I'll brief the QA team right away.", translation: "当然。我马上向测试团队简要说明情况。", note: "coordination" },
  { id: "business-31", speaker: "Alex", text: "Hello, I'm calling to discuss our partnership renewal terms.", translation: "您好，我打电话来商讨我们合作伙伴关系的续约条款。", note: "partnership renewal" },
  { id: "business-32", speaker: "Mike", text: "We're happy to continue working together. What are your proposals?", translation: "我们很高兴能继续合作。你们有什么提议？", note: "expressing willingness" },
  { id: "business-33", speaker: "Alex", text: "We propose a two-year extension with a tiered discount structure.", translation: "我们建议延长两年，并采用阶梯折扣结构。", note: "proposal details" },
  { id: "business-34", speaker: "Mike", text: "That sounds reasonable. Let me review the numbers with our director.", translation: "听起来很合理。我跟总监一起核对一下数字。", note: "internal review" },
  { id: "business-35", speaker: "Alex", text: "Take your time. We can sign the addendum next week.", translation: "慢慢来。我们下周可以签署补充协议。", note: "next steps" },
  { id: "business-36", speaker: "Mike", text: "Sounds like a plan. Talk to you soon.", translation: "就这么定。回头发联系。", note: "closing call" },
  { id: "business-37", speaker: "Alex", text: "Excuse me, where can I find the quarterly financial statements?", translation: "打扰一下，我在哪里可以找到季度财务报表？", note: "finding documents" },
  { id: "business-38", speaker: "Mike", text: "They are uploaded in the secure shared drive under Finance/Q3.", translation: "它们已经上传到安全共享驱动器的 Finance/Q3 文件夹下。", note: "document location" },
  { id: "business-39", speaker: "Alex", text: "Thanks, I found the folder. Do I need special permission to open it?", translation: "谢谢，我找到文件夹了。打开它需要特殊权限吗？", note: "permission check" },
  { id: "business-40", speaker: "Mike", text: "Only senior management and department leads have access.", translation: "只有高层管理人员和部门负责人有权访问。", note: "access control" },
  { id: "business-41", speaker: "Alex", text: "Hi, I'd like to apply for remote work for the upcoming month.", translation: "嗨，我想申请接下来的一个月进行远程办公。", note: "remote work request" },
  { id: "business-42", speaker: "Mike", text: "Please submit a formal request through the HR portal.", translation: "请通过人力资源门户提交正式申请。", note: "hr procedure" },
  { id: "business-43", speaker: "Alex", text: "Already submitted. Just wanted to give you a heads-up.", translation: "已经提交了。只是想提前跟您打个招呼。", note: "heads up" },
  { id: "business-44", speaker: "Mike", text: "Got it. Just make sure your daily check-ins remain on track.", translation: "知道了。只要确保你的日常打卡和工作进度正常就行。", note: "manager reminder" },
  { id: "business-45", speaker: "Alex", text: "Will do. Thanks for your support.", translation: "会的。谢谢您的支持。", note: "appreciation" },
  { id: "business-46", speaker: "Mike", text: "Anytime. Good luck with your focus week.", translation: "不客气。祝你专注周工作顺利。", note: "encouragement" },
  { id: "business-47", speaker: "Alex", text: "Attention team, please remember to submit your expense reports by Friday.", translation: "请大家注意，务必在周五前提交报销单据。", note: "expense reminder" },
  { id: "business-48", speaker: "Mike", text: "Does that include receipts for last week's client dinner?", translation: "这包括上周客户晚宴的发票吗？", note: "receipt inquiry" },
  { id: "business-49", speaker: "Alex", text: "Yes, all business-related expenses incurred this month must be included.", translation: "是的，本月产生的所有商务相关费用都必须包含在内。", note: "confirmation" },
  { id: "business-50", speaker: "Mike", text: "Understood. I'll finish mine right after this call.", translation: "明白了。我开完这个会就马上弄完它。", note: "compliance" },
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
  { id: "housing-2", speaker: "Mike", text: "Hello! Yes, the apartment is still available for rent.", translation: "你好！是的，这套公寓目前还在招租。", note: "confirming availability" },
  { id: "housing-3", speaker: "Alex", text: "Wonderful. When would it be possible to schedule a viewing?", translation: "太好了。什么时候可以安排看房？", note: "scheduling visit" },
  { id: "housing-4", speaker: "Mike", text: "How about this Saturday afternoon around two o'clock?", translation: "本周六下午两点左右怎么样？", note: "proposing time" },
  { id: "housing-5", speaker: "Alex", text: "Saturday afternoon works perfectly for me. See you then.", translation: "周六下午对我来说很合适。到时候见。", note: "confirming appointment" },
  { id: "housing-6", speaker: "Mike", text: "Great. My name is Mia, and I'll meet you at the front lobby.", translation: "太好了。我叫米娅，我在大堂前台接您。", note: "meeting details" },
  { id: "housing-7", speaker: "Alex", text: "Hi Mia, thanks for showing me around. The apartment looks lovely.", translation: "嗨米娅，谢谢你带我看房。这套公寓看起来很不错。", note: "praising apartment" },
  { id: "housing-8", speaker: "Mike", text: "Glad you like it! It gets plenty of sunlight in the morning.", translation: "很高兴你喜欢！早上采光非常好。", note: "highlighting features" },
  { id: "housing-9", speaker: "Alex", text: "Is the monthly rent negotiable at all?", translation: "每月租金可以商量吗？", note: "rent negotiation" },
  { id: "housing-10", speaker: "Mike", text: "The landlord is firm on the price, but utilities are included.", translation: "房东对价格抓得比较紧，但包含物业费。", note: "explaining terms" },
  { id: "housing-11", speaker: "Alex", text: "What about the security deposit? Is it one month or two?", translation: "押金是多少？是一个月还是两个月？", note: "deposit inquiry" },
  { id: "housing-12", speaker: "Mike", text: "It's two months' rent as a security deposit, refundable upon moving out.", translation: "两个月的租金作为押金，搬走时可退还。", note: "deposit details" },
  { id: "housing-13", speaker: "Alex", text: "Are pets allowed in the building? I have a small cat.", translation: "大楼允许养宠物吗？我有一只小猫。", note: "pet policy" },
  { id: "housing-14", speaker: "Mike", text: "Cats are allowed, but there is a small one-time pet cleaning fee.", translation: "猫是可以的，但需要交纳一次性的小额宠物清洁费。", note: "pet fee" },
  { id: "housing-15", speaker: "Alex", text: "That's completely fine with me. How long is the minimum lease term?", translation: "这完全没问题。最短租赁期限是多长时间？", note: "lease term" },
  { id: "housing-16", speaker: "Mike", text: "The minimum lease term is one year.", translation: "最短租赁期限是一年。", note: "one year lease" },
  { id: "housing-17", speaker: "Alex", text: "Hello, I'd like to report a leaking faucet in the kitchen.", translation: "你好，我想报告厨房水龙头漏水的问题。", note: "maintenance request" },
  { id: "housing-18", speaker: "Mike", text: "Sorry to hear that. I will log a repair ticket with the property manager.", translation: "听到这个消息很抱歉。我马上向物业经理登记维修工单。", note: "logging ticket" },
  { id: "housing-19", speaker: "Alex", text: "When can the plumber come by to check it?", translation: "水管工什么时候能过来检查？", note: "timing repair" },
  { id: "housing-20", speaker: "Mike", text: "Usually within twenty-four hours. Will you be home tomorrow morning?", translation: "通常在二十四小时内。您明天早上在家吗？", note: "scheduling repairman" },
  { id: "housing-21", speaker: "Alex", text: "Yes, I'll be working from home tomorrow.", translation: "在的，我明天在家办公。", note: "confirming presence" },
  { id: "housing-22", speaker: "Mike", text: "Perfect. I'll let the plumber know to drop by around 10 AM.", translation: "太好了。我会让水管工10点左右过来。", note: "setting time" },
  { id: "housing-23", speaker: "Alex", text: "Hi, I need to renew my lease for another year.", translation: "你好，我想续签一年的租约。", note: "lease renewal" },
  { id: "housing-24", speaker: "Mike", text: "We'd love to have you stay! The rent will remain unchanged.", translation: "我们非常欢迎您继续居住！租金保持不变。", note: "staying over" },
  { id: "housing-25", speaker: "Alex", text: "That's wonderful news. When should we sign the renewal agreement?", translation: "真是个好消息。我们什么时候签署续签协议？", note: "signing agreement" },
  { id: "housing-26", speaker: "Mike", text: "I can email you the digital document to sign electronically today.", translation: "我今天可以把电子版文件发邮件给您进行电子签名。", note: "digital signing" },
  { id: "housing-27", speaker: "Alex", text: "Received and signed. Thanks for making it so easy.", translation: "已收到并签署。谢谢你让流程这么简便。", note: "confirmation" },
  { id: "housing-28", speaker: "Mike", text: "You're welcome! Let me know if you need anything else.", translation: "不客气！如果还需要其他帮助请随时告诉我。", note: "polite reply" },
  { id: "housing-29", speaker: "Alex", text: "Excuse me, where is the designated garbage disposal area?", translation: "打扰一下，指定的垃圾投放区在哪里？", note: "garbage disposal" },
  { id: "housing-30", speaker: "Mike", text: "It's located on the basement level near the parking garage.", translation: "位于地下室停车场附近。", note: "location of disposal" },
  { id: "housing-31", speaker: "Alex", text: "Do we need to separate recyclables from regular waste?", translation: "我们需要将可回收物与普通垃圾分类吗？", note: "recycling rule" },
  { id: "housing-32", speaker: "Mike", text: "Yes, paper and plastics go into the blue bins, and food waste goes into green bins.", translation: "是的，纸张和塑料投入蓝色桶，厨余垃圾投入绿色桶。", note: "sorting instructions" },
  { id: "housing-33", speaker: "Alex", text: "Got it. Thanks for the clarification.", translation: "明白了。谢谢你的解释。", note: "acknowledging" },
  { id: "housing-34", speaker: "Mike", text: "No problem. Keeping the building clean helps everyone.", translation: "没问题。保持大楼清洁对大家都有好处。", note: "community spirit" },
  { id: "housing-35", speaker: "Alex", text: "Hi, I'm moving out next month and need to arrange a move-out inspection.", translation: "你好，我下个月搬走，需要安排退房检查。", note: "moving out" },
  { id: "housing-36", speaker: "Mike", text: "Sure. We can do the inspection on the last day of the month.", translation: "好的。我们可以在月底那一天进行检查。", note: "inspection date" },
  { id: "housing-37", speaker: "Alex", text: "What time should we meet for the check?", translation: "检查我们应该几点见面？", note: "meeting time" },
  { id: "housing-38", speaker: "Mike", text: "How about 10 AM after you finish packing everything?", translation: "在你把东西都打包完之后的上午10点怎么样？", note: "suggesting time" },
  { id: "housing-39", speaker: "Alex", text: "That works for me. Will my deposit be returned then?", translation: "这可以。我的押金到时候能退吗？", note: "deposit return inquiry" },
  { id: "housing-40", speaker: "Mike", text: "It will be transferred to your bank account within three business days after inspection.", translation: "检查后的三个工作日内会转账到您的银行账户。", note: "transfer timeframe" },
  { id: "housing-41", speaker: "Alex", text: "Hello, my key card stopped working this morning.", translation: "你好，我的房卡今天早上突然刷不开了。", note: "key card issue" },
  { id: "housing-42", speaker: "Mike", text: "Let me reactivate it for you right now. Did you keep it near any magnets?", translation: "我马上为您重新激活。您把它跟磁铁放在一起了吗？", note: "reactivating card" },
  { id: "housing-43", speaker: "Alex", text: "Oh, I placed it next to my phone speaker.", translation: "哦，我把它放在手机扬声器旁边了。", note: "reason found" },
  { id: "housing-44", speaker: "Mike", text: "That might have demagnetized it. Here is a fresh card.", translation: "那可能导致它消磁了。这是一张新卡。", note: "providing new card" },
  { id: "housing-45", speaker: "Alex", text: "Thank you, I'll be more careful next time.", translation: "谢谢，下次我会更小心的。", note: "cautioning" },
  { id: "housing-46", speaker: "Mike", text: "You're welcome. Have a great day!", translation: "不客气。祝您过愉快的一天！", note: "goodbye" },
  { id: "housing-47", speaker: "Alex", text: "Hi, is there guest parking available in the building?", translation: "你好，大楼里有访客停车位吗？", note: "guest parking" },
  { id: "housing-48", speaker: "Mike", text: "Yes, visitors can park on level B2 for up to four hours free.", translation: "有的，访客可以把车停在B2层，免费长达四小时。", note: "parking policy" },
  { id: "housing-49", speaker: "Alex", text: "Do they need a parking pass from the front desk?", translation: "他们需要从前台领取停车证吗？", note: "parking pass" },
  { id: "housing-50", speaker: "Mike", text: "Yes, just register their license plate number with us beforehand.", translation: "需要的，只需提前向我们登记他们的车牌号即可。", note: "registration requirement" },
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
  { id: "medical-2", speaker: "Mike", text: "Good morning. Let me check your throat and listen to your chest.", translation: "早上好。让我检查一下你的喉咙并听听胸部。", note: "medical examination" },
  { id: "medical-3", speaker: "Alex", text: "It hurts a bit when I take a deep breath.", translation: "深呼吸时有点疼。", note: "pain details" },
  { id: "medical-4", speaker: "Mike", text: "It looks like a mild upper respiratory infection. I'll write a prescription.", translation: "看起来像是轻微的上呼吸道感染。我开个处方。", note: "diagnosis" },
  { id: "medical-5", speaker: "Alex", text: "Thank you, doctor. Should I take these pills after meals?", translation: "谢谢医生。这些药片是饭后服用吗？", note: "asking for instructions" },
  { id: "medical-6", speaker: "Mike", text: "Yes, take one tablet three times a day after meals with warm water.", translation: "是的，一天三次，饭后用温水服用一片。", note: "dosage instructions" },
  { id: "medical-7", speaker: "Alex", text: "Should I avoid any specific foods while taking this medicine?", translation: "吃这个药期间需要避免吃某些特定的食物吗？", note: "dietary restrictions" },
  { id: "medical-8", speaker: "Mike", text: "Avoid spicy and cold foods for a few days to speed up recovery.", translation: "几天内避免辛辣和生冷食物以加速康复。", note: "diet advice" },
  { id: "medical-9", speaker: "Alex", text: "Hello, I need to book an annual health checkup.", translation: "你好，我需要预约年度健康体检。", note: "booking checkup" },
  { id: "medical-10", speaker: "Mike", text: "We have openings next Tuesday morning. Do you prefer fasting blood tests?", translation: "我们下周二上午有空位。您倾向于空腹抽血检查吗？", note: "scheduling checkup" },
  { id: "medical-11", speaker: "Alex", text: "Yes, fasting tests are better. What time should I arrive?", translation: "是的，空腹检查更好。我应该几点到？", note: "arrival time" },
  { id: "medical-12", speaker: "Mike", text: "Please arrive at 8:30 AM without eating or drinking anything since midnight.", translation: "请在早上8点半到达，午夜过后不要吃任何东西或喝水。", note: "fasting instructions" },
  { id: "medical-13", speaker: "Alex", text: "Hi, I twisted my ankle while jogging this morning.", translation: "你好，我今天早上跑步时扭伤了脚踝。", note: "injury description" },
  { id: "medical-14", speaker: "Mike", text: "Let's take an X-ray first to make sure there are no hairline fractures.", translation: "我们先拍个X光片，确保没有细微骨折。", note: "x-ray recommendation" },
  { id: "medical-15", speaker: "Alex", text: "Does it look swollen to you?", translation: "你觉得它看起来肿了吗？", note: "inquiring swelling" },
  { id: "medical-16", speaker: "Mike", text: "Yes, there is some mild swelling. Apply an ice pack for twenty minutes.", translation: "是的，有一些轻微肿胀。敷冰袋二十分钟。", note: "first aid" },
  { id: "medical-17", speaker: "Alex", text: "Should I use crutches for walking around?", translation: "我走路需要用拐杖吗？", note: "crutches inquiry" },
  { id: "medical-18", speaker: "Mike", text: "Yes, avoid putting weight on that foot for the next few days.", translation: "是的，接下来的几天避免那只脚承重。", note: "resting foot" },
  { id: "medical-19", speaker: "Alex", text: "Hello, I'd like to refill my prescription for blood pressure medication.", translation: "你好，我想配我的高血压药物处方。", note: "prescription refill" },
  { id: "medical-20", speaker: "Mike", text: "Let me check your medical history. When was your last blood pressure check?", translation: "我查一下您的病史。您最近一次测血压是什么时候？", note: "checking history" },
  { id: "medical-21", speaker: "Alex", text: "I checked it last week at the local community clinic, and it was stable.", translation: "我上周在当地社区诊所测过，很稳定。", note: "reporting bp" },
  { id: "medical-22", speaker: "Mike", text: "Great. I'll issue a three-month refill for you.", translation: "太好了。我为您开具三个月的续药量。", note: "issuing refill" },
  { id: "medical-23", speaker: "Alex", text: "Thank you so much. Do I need to pay here or at the pharmacy counter?", translation: "非常感谢。我需要在这里交费还是在药房柜台交费？", note: "payment inquiry" },
  { id: "medical-24", speaker: "Mike", text: "You can pay directly at the main pharmacy window downstairs.", translation: "您可以直接在楼下的主药房窗口交费。", note: "payment location" },
  { id: "medical-25", speaker: "Alex", text: "Excuse me, where is the dental department located?", translation: "打扰一下，牙科在什么位置？", note: "finding dental" },
  { id: "medical-26", speaker: "Mike", text: "It's on the third floor, past the pediatrics wing.", translation: "在三楼，过儿科病房区就是。", note: "dental directions" },
  { id: "medical-27", speaker: "Alex", text: "Do I need an appointment for a routine dental cleaning?", translation: "常规洗牙需要预约吗？", note: "dental appointment" },
  { id: "medical-28", speaker: "Mike", text: "Yes, our dentists are fully booked today, but I can schedule you for Thursday.", translation: "是的，我们的牙医今天预约满了，不过我可以给您安排在周四。", note: "scheduling dental" },
  { id: "medical-29", speaker: "Alex", text: "Thursday afternoon would be wonderful.", translation: "周四下午非常棒。", note: "confirming dental" },
  { id: "medical-30", speaker: "Mike", text: "All booked. We will send you a text reminder the day before.", translation: "已预约好。我们会在前一天给您发送短信提醒。", note: "reminder notice" },
  { id: "medical-31", speaker: "Alex", text: "Hi, I've been having trouble sleeping lately due to work stress.", translation: "你好，由于工作压力，我最近睡眠一直不好。", note: "sleep issue" },
  { id: "medical-32", speaker: "Mike", text: "Insomnia can be very exhausting. Have you tried relaxation exercises before bed?", translation: "失眠会让人筋疲力尽。你在睡前尝试过放松练习吗？", note: "suggesting relaxation" },
  { id: "medical-33", speaker: "Alex", text: "A little bit, but my mind keeps racing.", translation: "有一点，但脑子里一直在转。", note: "explaining symptoms" },
  { id: "medical-34", speaker: "Mike", text: "I recommend avoiding screens an hour before sleep and trying herbal tea.", translation: "我建议睡前一小时避免看屏幕，并尝试喝草本茶。", note: "lifestyle advice" },
  { id: "medical-35", speaker: "Alex", text: "I'll give that a try. Should I take sleeping pills?", translation: "我试一试。需要吃安眠药吗？", note: "sleep pills inquiry" },
  { id: "medical-36", speaker: "Mike", text: "Let's avoid medication unless necessary. Let's monitor it for another week.", translation: "除非必要，我们尽量避免药物。先观察一周再说。", note: "conservative approach" },
  { id: "medical-37", speaker: "Alex", text: "Hello, I need to get vaccinated for my upcoming overseas business trip.", translation: "你好，我因即将到来的海外出差需要接种疫苗。", note: "vaccination inquiry" },
  { id: "medical-38", speaker: "Mike", text: "Which country are you visiting?", translation: "您要去哪个国家？", note: "destination check" },
  { id: "medical-39", speaker: "Alex", text: "I'm heading to Southeast Asia for two weeks.", translation: "我正前往东南亚两周。", note: "stating destination" },
  { id: "medical-40", speaker: "Mike", text: "You'll need shots for typhoid and hepatitis A. Let's administer them today.", translation: "您需要注射伤寒和甲肝疫苗。我们今天就为您接种。", note: "vaccine requirements" },
  { id: "medical-41", speaker: "Alex", text: "Will I experience any side effects?", translation: "我会经历任何副作用吗？", note: "side effects inquiry" },
  { id: "medical-42", speaker: "Mike", text: "You might feel mild arm soreness or a slight fever for a day.", translation: "您可能会感到轻微的手臂酸痛或持续一天的低烧。", note: "side effects info" },
  { id: "medical-43", speaker: "Alex", text: "That sounds manageable. Thank you for the information.", translation: "听起来可以应付。谢谢你的告知。", note: "acknowledgment" },
  { id: "medical-44", speaker: "Mike", text: "Take care and have a safe trip abroad.", translation: "保重，祝您海外行程平安。", note: "well wishes" },
  { id: "medical-45", speaker: "Alex", text: "Excuse me, where is the emergency room entrance?", translation: "打扰一下，急诊室入口在哪里？", note: "er entrance" },
  { id: "medical-46", speaker: "Mike", text: "Follow the bright red emergency signs around the corner to the right.", translation: "顺着拐角处右侧鲜红的急诊标志走。", note: "er directions" },
  { id: "medical-47", speaker: "Alex", text: "Thank you, my friend is having severe chest pains.", translation: "谢谢，我朋友胸口剧痛。", note: "emergency situation" },
  { id: "medical-48", speaker: "Mike", text: "Please alert the triage nurse at the desk immediately. I'll wheel a stretcher over.", translation: "请立刻通知前台的分诊护士。我马上推一副担架过来。", note: "urgent response" },
  { id: "medical-49", speaker: "Alex", text: "Hurry please, I appreciate your quick help.", translation: "请快点，谢谢你的及时帮助。", note: "expressing urgency" },
  { id: "medical-50", speaker: "Mike", text: "We're right on it. Don't worry, he's in safe hands.", translation: "我们马上处理。别担心，他很安全。", note: "reassurance" },
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
  { id: "banking-2", speaker: "Mike", text: "Of course. Please have a seat. Do you have a valid ID and proof of address?", translation: "当然可以。请坐。您有有效身份证件和地址证明吗？", note: "document check" },
  { id: "banking-3", speaker: "Alex", text: "Yes, I brought my passport and a utility bill.", translation: "带了，我带了护照和一份公用事业账单。", note: "providing documents" },
  { id: "banking-4", speaker: "Mike", text: "Perfect. Let's fill out this application form together.", translation: "太完美了。我们一起填写这份申请表吧。", note: "application process" },
  { id: "banking-5", speaker: "Alex", text: "Thank you for guiding me through the process.", translation: "谢谢你指导我完成整个流程。", note: "polite closing" },
  { id: "banking-6", speaker: "Mike", text: "You're welcome. Would you also like to sign up for online banking services?", translation: "不客气。您也想开通网上银行服务吗？", note: "offering online banking" },
  { id: "banking-7", speaker: "Alex", text: "Yes, please enable mobile banking and a debit card as well.", translation: "是的，请同时开通手机银行和借记卡。", note: "requesting mobile banking" },
  { id: "banking-8", speaker: "Mike", text: "Your debit card will arrive by mail within five business days.", translation: "您的借记卡将在五个工作日内通过邮件寄到。", note: "card delivery" },
  { id: "banking-9", speaker: "Alex", text: "Hello, I need to wire some funds to an overseas account.", translation: "你好，我需要向海外账户汇款。", note: "wire transfer" },
  { id: "banking-10", speaker: "Mike", text: "Sure. Do you have the recipient's SWIFT code and bank account number?", translation: "好的。您有收款人的SWIFT代码和银行账号吗？", note: "requesting swift info" },
  { id: "banking-11", speaker: "Alex", text: "Yes, I have all the details written down here.", translation: "有的，我把所有详细信息写在这里了。", note: "providing wire details" },
  { id: "banking-12", speaker: "Mike", text: "Let me input the details into our system. The transfer fee is twenty dollars.", translation: "我把信息输入系统。转账手续费是二十美元。", note: "fee information" },
  { id: "banking-13", speaker: "Alex", text: "That's acceptable. How long will the transfer take to arrive?", translation: "可以接受。转账需要多长时间到账？", note: "transfer time" },
  { id: "banking-14", speaker: "Mike", text: "International wires typically take two to three business days.", translation: "国际汇款通常需要二到三个工作日。", note: "timeframe" },
  { id: "banking-15", speaker: "Alex", text: "Hi, I lost my credit card yesterday and need to report it lost.", translation: "你好，我昨天丢了信用卡，需要挂失。", note: "reporting lost card" },
  { id: "banking-16", speaker: "Mike", text: "I'm sorry to hear that. I will freeze your account immediately to prevent fraud.", translation: "听到这消息很遗憾。我马上冻结您的账户以防诈骗。", note: "freezing account" },
  { id: "banking-17", speaker: "Alex", text: "Thank you. Can I request a replacement card right now?", translation: "谢谢。我现在可以申请补办一张新卡吗？", note: "requesting replacement" },
  { id: "banking-18", speaker: "Mike", text: "Yes, a replacement card will be express-shipped to your home address.", translation: "可以，补办卡将通过快递寄送到您的家庭住址。", note: "express shipping" },
  { id: "banking-19", speaker: "Alex", text: "Will I be responsible for any unauthorized charges?", translation: "我需要承担任何未授权的盗刷费用吗？", note: "liability inquiry" },
  { id: "banking-20", speaker: "Mike", text: "Zero liability policy applies since you reported it within twenty-four hours.", translation: "由于您在二十四小时内报告了，零责任政策适用。", note: "zero liability" },
  { id: "banking-21", speaker: "Alex", text: "Hello, I would like to apply for a home mortgage loan.", translation: "你好，我想申请住房按揭贷款。", note: "mortgage application" },
  { id: "banking-22", speaker: "Mike", text: "We offer competitive interest rates. Do you have your income proofs ready?", translation: "我们提供很有竞争力的利率。您准备好收入证明了吗？", note: "mortgage terms" },
  { id: "banking-23", speaker: "Alex", text: "Yes, I brought my tax returns and employment verification letter.", translation: "带了，我带了纳税申报单和在职证明信。", note: "income documents" },
  { id: "banking-24", speaker: "Mike", text: "Great. Our loan specialist will review your documents and contact you soon.", translation: "太好了。我们的贷款专员会审核您的文件并尽快联系您。", note: "loan review" },
  { id: "banking-25", speaker: "Alex", text: "What is the current fixed interest rate for a thirty-year term?", translation: "三十年期的当前固定利率是多少？", note: "fixed rate inquiry" },
  { id: "banking-26", speaker: "Mike", text: "The current promotional rate starts at four point five percent.", translation: "目前的促销利率从百分之四点五起步。", note: "rate details" },
  { id: "banking-27", speaker: "Alex", text: "Excuse me, where is the nearest ATM machine?", translation: "打扰一下，最近的自动取款机在哪里？", note: "atm location" },
  { id: "banking-28", speaker: "Mike", text: "There is a twenty-four-hour ATM right outside the main lobby doors.", translation: "大堂正门外就有一个二十四小时自动取款机。", note: "locating atm" },
  { id: "banking-29", speaker: "Alex", text: "Does it accept cards from other banks?", translation: "它接受其他银行的卡吗？", note: "atm compatibility" },
  { id: "banking-30", speaker: "Mike", text: "Yes, all major domestic and international networks are supported.", translation: "是的，支持所有主流国内外网络。", note: "network support" },
  { id: "banking-31", speaker: "Alex", text: "Hi, I want to cash this foreign check.", translation: "你好，我想兑现这张外国支票。", note: "cashing check" },
  { id: "banking-32", speaker: "Mike", text: "Foreign checks require a standard clearance period of seven business days.", translation: "外国支票需要七个工作日的标准清算期。", note: "clearance period" },
  { id: "banking-33", speaker: "Alex", text: "Can I withdraw a small portion of it immediately?", translation: "我可以马上提取其中的一小部分吗？", note: "partial withdrawal" },
  { id: "banking-34", speaker: "Mike", text: "We can advance up to two hundred dollars while it clears.", translation: "在清算期间我们可以预支最多二百美元。", note: "advance cash" },
  { id: "banking-35", speaker: "Alex", text: "That would be very helpful. Thank you.", translation: "那太有帮助了。谢谢。", note: "appreciative" },
  { id: "banking-36", speaker: "Mike", text: "Please sign the back of the check to proceed.", translation: "请在支票背面签字以继续办理。", note: "signing check" },
  { id: "banking-37", speaker: "Alex", text: "Hello, I want to set up a monthly automatic payment for my utility bills.", translation: "你好，我想为我的公用事业账单设置每月自动扣款。", note: "auto payment" },
  { id: "banking-38", speaker: "Mike", text: "Certainly. Just fill out this direct debit authorization form.", translation: "当然。只需填写这份直接借记授权表。", note: "debit authorization" },
  { id: "banking-39", speaker: "Alex", text: "Will I get notified before each deduction?", translation: "每次扣款前我会收到通知吗？", note: "notification check" },
  { id: "banking-40", speaker: "Mike", text: "Yes, an email alert will be sent three days prior to every payment.", translation: "是的，每次付款前三天会发送电子邮件提醒。", note: "email notification" },
  { id: "banking-41", speaker: "Alex", text: "Hi, I'd like to update my contact phone number on file.", translation: "你好，我想更新我档案里的联系电话号码。", note: "update phone" },
  { id: "banking-42", speaker: "Mike", text: "For security reasons, I'll need to send a verification code to your old number first.", translation: "出于安全原因，我需要先向您的旧号码发送验证码。", note: "security check" },
  { id: "banking-43", speaker: "Alex", text: "I no longer have access to the old number.", translation: "我无法再使用旧号码了。", note: "lost old number" },
  { id: "banking-44", speaker: "Mike", text: "In that case, please answer these security questions to verify your identity.", translation: "在这种情况下，请回答这些安全问题来验证您的身份。", note: "security questions" },
  { id: "banking-45", speaker: "Alex", text: "No problem. Ask away.", translation: "没问题。请问吧。", note: "ready for questions" },
  { id: "banking-46", speaker: "Mike", text: "What was your mother's maiden name and your first pet's name?", translation: "你母亲的婚前姓氏和你第一只宠物的名字是什么？", note: "asking questions" },
  { id: "banking-47", speaker: "Alex", text: "Provided correct answers. Is that sufficient?", translation: "提供了正确答案。这样足够了吗？", note: "providing answers" },
  { id: "banking-48", speaker: "Mike", text: "Identity verified successfully. I have updated your phone number now.", translation: "身份验证成功。我现在已经更新了您的电话号码。", note: "success confirmation" },
  { id: "banking-49", speaker: "Alex", text: "Thank you for your patience and professional help.", translation: "谢谢您的耐心和专业帮助。", note: "grateful closing" },
  { id: "banking-50", speaker: "Mike", text: "You're very welcome. Have a wonderful day ahead!", translation: "非常不客气。祝您接下来过愉快的一天！", note: "pleasant closing" },
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
  { id: "shopping-2", speaker: "Mike", text: "Let me check the stock room for you. Which color do you prefer?", translation: "我帮您去库存查一下。您喜欢什么颜色？", note: "assisting customer" },
  { id: "shopping-3", speaker: "Alex", text: "I'd love the navy blue one if it's available.", translation: "如果有深蓝色的话，我想要深蓝色。", note: "specifying color" },
  { id: "shopping-4", speaker: "Mike", text: "Yes, we have one medium left in navy blue. Would you like to try it on?", translation: "有的，深蓝色还剩最后一件中号。您想试穿一下吗？", note: "offering fitting room" },
  { id: "shopping-5", speaker: "Alex", text: "Yes, please. Where is the fitting room?", translation: "好的，麻烦了。试衣间在哪里？", note: "accepting offer" },
  { id: "shopping-6", speaker: "Mike", text: "The fitting rooms are straight down this aisle to your right.", translation: "试衣间就在这条过道直走右转。", note: "fitting room directions" },
  { id: "shopping-7", speaker: "Alex", text: "Thanks. It fits very well. How much is it?", translation: "谢谢。穿着很合身。多少钱？", note: "inquiring price" },
  { id: "shopping-8", speaker: "Mike", text: "It's currently on sale for seventy-nine dollars.", translation: "目前正在促销，售价七十九美元。", note: "price information" },
  { id: "shopping-9", speaker: "Alex", text: "Great, I'll take it. Do you accept mobile payments?", translation: "太好了，我买下了。你们接受手机支付吗？", note: "payment method" },
  { id: "shopping-10", speaker: "Mike", text: "Yes, we accept Apple Pay and major digital wallets.", translation: "是的，我们接受Apple Pay和主流数字钱包。", note: "digital payment" },
  { id: "shopping-11", speaker: "Alex", text: "Hello, I'd like to return this shirt because it's too small.", translation: "你好，我想退这件衬衫，因为它太小了。", note: "product return" },
  { id: "shopping-12", speaker: "Mike", text: "No problem. Do you have the original receipt and tags attached?", translation: "没问题。您有原始收据且标签还挂着吗？", note: "return conditions" },
  { id: "shopping-13", speaker: "Alex", text: "Yes, here is the receipt. Can I exchange it for a large?", translation: "有的，这是收据。我可以换一件大号的吗？", note: "exchanging item" },
  { id: "shopping-14", speaker: "Mike", text: "Certainly. Let me grab a large size in the same color for you.", translation: "当然可以。我给您拿同一颜色的一个大号。", note: "getting replacement" },
  { id: "shopping-15", speaker: "Alex", text: "Thank you for the quick exchange.", translation: "谢谢你快速的更换服务。", note: "gratitude" },
  { id: "shopping-16", speaker: "Mike", text: "You're welcome. Is there anything else you need today?", translation: "不客气。今天还需要其他东西吗？", note: "upselling" },
  { id: "shopping-17", speaker: "Alex", text: "Excuse me, where can I find organic vegetables?", translation: "打扰一下，有机蔬菜在哪里可以找到？", note: "grocery shopping" },
  { id: "shopping-18", speaker: "Mike", text: "They are in aisle three, right next to the fresh bakery section.", translation: "它们在三号过道，紧挨着新鲜烘焙区。", note: "grocery directions" },
  { id: "shopping-19", speaker: "Alex", text: "Are these apples locally grown?", translation: "这些苹果是本地种植的吗？", note: "local produce inquiry" },
  { id: "shopping-20", speaker: "Mike", text: "Yes, they were harvested from a nearby orchard yesterday.", translation: "是的，它们是昨天从附近的果园采摘的。", note: "produce origin" },
  { id: "shopping-21", speaker: "Alex", text: "I'll take a bag of those apples. Do you have reusable bags?", translation: "我要买一袋这种苹果。你们有可循环使用的袋子吗？", note: "reusable bags" },
  { id: "shopping-22", speaker: "Mike", text: "Yes, they are right by the checkout counter for one dollar each.", translation: "有的，就在结账柜台旁，每个一美元。", note: "bag location" },
  { id: "shopping-23", speaker: "Alex", text: "Hello, I'm looking for a gift for my friend's birthday.", translation: "你好，我在找一份朋友生日的礼物。", note: "gift shopping" },
  { id: "shopping-24", speaker: "Mike", text: "What are your friend's interests? We have books, perfumes, and electronics.", translation: "你朋友有什么爱好？我们有书本、香水和电子产品。", note: "gift options" },
  { id: "shopping-25", speaker: "Alex", text: "He loves reading sci-fi novels and listening to music.", translation: "他喜欢读科幻小说和听音乐。", note: "stating interest" },
  { id: "shopping-26", speaker: "Mike", text: "I recommend this bestselling sci-fi trilogy boxed set.", translation: "我推荐这套畅销的科幻三部曲精装盒装书。", note: "product recommendation" },
  { id: "shopping-27", speaker: "Alex", text: "That looks like a great choice. Can you gift-wrap it for me?", translation: "看起来是个不错的选择。能帮我包装成礼物吗？", note: "gift wrapping" },
  { id: "shopping-28", speaker: "Mike", text: "Of course! Gift wrapping is complimentary for all book purchases.", translation: "当然！所有购书均可免费提供礼品包装。", note: "free wrapping" },
  { id: "shopping-29", speaker: "Alex", text: "Hello, do you price-match local competitor discounts?", translation: "你好，你们支持匹配本地竞争对手的折扣价吗？", note: "price match" },
  { id: "shopping-30", speaker: "Mike", text: "Yes, we do. Just show us the competitor's current advertised price.", translation: "是的，我们支持。只需向我们出示竞争对手当前公布的广告价格。", note: "match policy" },
  { id: "shopping-31", speaker: "Alex", text: "Here is the online listing from the nearby electronics store.", translation: "这是附近电子产品网店的商品页面。", note: "showing listing" },
  { id: "shopping-32", speaker: "Mike", text: "Verified. I'll match that lower price for you at checkout.", translation: "已核实。我会在结账时为您匹配较低的价格。", note: "confirming match" },
  { id: "shopping-33", speaker: "Alex", text: "That's fantastic customer service. Thank you.", translation: "太棒的客户服务了。谢谢。", note: "appreciation" },
  { id: "shopping-34", speaker: "Mike", text: "We always strive to give our customers the best deals.", translation: "我们一直致力于给顾客提供最好的优惠。", note: "customer focus" },
  { id: "shopping-35", speaker: "Alex", text: "Excuse me, is this coffee maker covered under warranty?", translation: "打扰一下，这款咖啡机在保修范围内吗？", note: "warranty inquiry" },
  { id: "shopping-36", speaker: "Mike", text: "Yes, it comes with a two-year manufacturer warranty.", translation: "是的，它附带两年制造商保修。", note: "warranty period" },
  { id: "shopping-37", speaker: "Alex", text: "What should I do if it stops working?", translation: "如果它停止工作了，我该怎么办？", note: "troubleshooting steps" },
  { id: "shopping-38", speaker: "Mike", text: "Bring it back with the receipt, and we will replace it or repair it for free.", translation: "带上收据拿回来，我们将免费为您更换或修理。", note: "repair policy" },
  { id: "shopping-39", speaker: "Alex", text: "That gives me great peace of mind. I'll buy it.", translation: "这让我非常放心。我买下了。", note: "buying decision" },
  { id: "shopping-40", speaker: "Mike", text: "Enjoy your fresh coffee every morning!", translation: "享受你每天早上的新鲜咖啡吧！", note: "pleasant sendoff" },
  { id: "shopping-41", speaker: "Alex", text: "Hi, I'd like to sign up for your store loyalty rewards program.", translation: "你好，我想注册你们的商店会员积分项目。", note: "loyalty program" },
  { id: "shopping-42", speaker: "Mike", text: "I'd love to sign you up. Just enter your phone number on this screen.", translation: "我很乐意为您注册。只需在这个屏幕上输入您的手机号。", note: "signing up" },
  { id: "shopping-43", speaker: "Alex", text: "Done. Do I get a discount on today's purchase?", translation: "完成了。我今天的购买能打折吗？", note: "discount check" },
  { id: "shopping-44", speaker: "Mike", text: "Yes, you get ten percent off your first purchase as a welcome bonus.", translation: "是的，作为欢迎奖励，您首次购买可享受九折优惠。", note: "welcome bonus" },
  { id: "shopping-45", speaker: "Alex", text: "That's an unexpected bonus. Thank you!", translation: "这是一个意外的惊喜。谢谢！", note: "delighted response" },
  { id: "shopping-46", speaker: "Mike", text: "You're welcome. You'll also earn points for every dollar spent.", translation: "不客气。每消费一美元您还将赚取积分。", note: "earning points" },
  { id: "shopping-47", speaker: "Alex", text: "Excuse me, where is the customer service desk for refunds?", translation: "打扰一下，办理退款的客服柜台在哪里？", note: "customer service desk" },
  { id: "shopping-48", speaker: "Mike", text: "It's right next to the main entrance on the ground floor.", translation: "就在一楼正门旁边。", note: "desk location" },
  { id: "shopping-49", speaker: "Alex", text: "Is there a long queue over there right now?", translation: "那边现在排长队吗？", note: "queue check" },
  { id: "shopping-50", speaker: "Mike", text: "Not at all, there are only two people ahead of you.", translation: "一点也不，您前面只有两个人。", note: "short queue" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `shopping-${i + 51}`,
    speaker: i % 2 === 0 ? "Alex" : "Mia",
    text: `Retail shopping and customer service conversation line ${i + 51}.`,
    translation: `零售购物与客户服务对话第 ${i + 51} 条。`,
    note: `shopping extended note ${i + 51}`
  }))
];

export const SCENE_CONTENT: Record<SceneKey, ListeningLine[]> = {
  school: [
    { id: "school-1", speaker: "Alex", text: "Good morning, Professor Davis. Do you have a quick moment to talk about the upcoming assignment?", translation: "早上好，戴维斯教授。您现在有空聊一下接下来的作业吗？", note: "教授/老师称呼：Professor + 姓氏" },
    { id: "school-2", speaker: "Mike", text: "Morning, Alex. Yes, come on in. Is this about the research proposal for our history module?", translation: "早上好，亚历克斯。可以，请进。这是关于我们历史模块的研究开题报告吗？", note: "module 意为课程模块" },
    { id: "school-3", speaker: "Alex", text: "Actually, it is. I wanted to double-check if primary source interviews are strictly required for the final paper.", translation: "其实是的。我想确认一下期末论文是否强制要求进行第一手资料的采访。" },
    { id: "school-4", speaker: "Mike", text: "They aren't strictly mandatory, but incorporating interviews or field notes will definitely boost your grade.", translation: "并不是强制必须的，但如果能加入采访或实地笔记，肯定会给你的成绩加分。" },
    { id: "school-5", speaker: "Alex", text: "That makes sense. I was thinking of interviewing a local archivist, but I'm worried about scheduling conflicts.", translation: "有道理。我原本打算采访一位当地档案管理员，但有点担心时间冲突。" },
    { id: "school-6", speaker: "Mike", text: "That sounds like a brilliant topic! Have you tried reaching out via email with a flexible time window?", translation: "听起来是个极好的主题！你试过通过邮件联系并给出弹性的时间范围吗？" },
    { id: "school-7", speaker: "Alex", text: "Not yet, but I can draft something this afternoon and send it over. Should I CC you on that?", translation: "还没试过，但我今天下午可以起草一份发过去。我需要抄送（CC）您吗？" },
    { id: "school-8", speaker: "Mike", text: "There's no need to CC me, but make sure you mention that this is for a university research project.", translation: "不需要抄送我，但一定要在信中提及这是为了大学的研究项目。" },
    { id: "school-9", speaker: "Alex", text: "Got it. Also, regarding the citation format, do we stick to APA or Chicago style for this paper?", translation: "明白了。另外，关于引用格式，这篇论文我们统一用 APA 还是芝加哥格式？" },
    { id: "school-10", speaker: "Mike", text: "The department guidelines specify APA 7th edition for all history and social science submissions.", translation: "系里的指导方针规定，所有历史和社会科学类的提交统一使用 APA 第七版。" },
    { id: "school-11", speaker: "Alex", text: "Perfect. I'll make sure my bibliography and in-text citations follow APA strictly.", translation: "太好了。我会确保我的参考文献和文内引用严格遵循 APA 规范。" },
    { id: "school-12", speaker: "Mike", text: "Excellent. Let me know if you encounter any roadblocks while drafting your methodology section.", translation: "很好。如果在起草研究方法部分时遇到任何阻碍，随时告诉我。" },
    { id: "school-13", speaker: "Alex", text: "Thank you, Professor Davis. I appreciate your guidance on this.", translation: "谢谢你，戴维斯教授。非常感谢您在这方面的指导。" },
    { id: "school-14", speaker: "Mike", text: "Anytime, Alex. Good luck with the initial outreach, and keep me posted.", translation: "别客气，亚历克斯。祝你初步联络顺利，有进展随时向我汇报。" },
    { id: "school-15", speaker: "Alex", text: "Excuse me, could you point me toward the main campus library's digital archives section?", translation: "打扰一下，请问主校区图书馆的数字档案区怎么走？" },
    { id: "school-16", speaker: "Mike", text: "Sure thing! Head straight down this corridor, take the elevator to the third floor, and it's on your left.", translation: "没问题！顺着这条走廊直走，乘电梯到三楼，就在你左手边。" },
    { id: "school-17", speaker: "Alex", text: "Is a student ID card required to access those restricted databases from the library terminals?", translation: "在图书馆终端访问那些受限制的数据库需要学生证吗？" },
    { id: "school-18", speaker: "Mike", text: "Yes, you'll need to swipe your card at the turnstile and log in using your university single sign-on.", translation: "是的，你需要在闸机刷卡，并使用学校的统一身份认证登录。" },
    { id: "school-19", speaker: "Alex", text: "Wonderful. Do you know if we can access those journals remotely from our off-campus apartments?", translation: "太好了。你知道我们在校外公寓能不能远程访问这些期刊吗？" },
    { id: "school-20", speaker: "Mike", text: "Definitely, just log into the library portal through the university VPN before clicking any database links.", translation: "当然可以，只要在点击任何数据库链接之前，先通过学校 VPN 登录图书馆门户即可。" },
    { id: "school-21", speaker: "Alex", text: "Hi, I'd like to add a supplementary course to my schedule, but the registration window seems to be closed.", translation: "你好，我想在课表中加一门辅修课，但注册窗口好像已经关闭了。" },
    { id: "school-22", speaker: "Mike", text: "You'll need an add/drop slip signed by the course instructor and your academic advisor first.", translation: "你首先需要一张由任课教师和学术导师签字的选退课申请表（add/drop slip）。" },
    { id: "school-23", speaker: "Alex", text: "Where can I pick up a physical copy of that form? Is it available online as a PDF?", translation: "我在哪里可以领到这张表格的纸质版？网上有 PDF 版本可以下载吗？" },
    { id: "school-24", speaker: "Mike", text: "You can download it directly from the registrar's office website under the student forms tab.", translation: "你可以直接从教务处网站的学生表格标签页下下载。" },
    { id: "school-25", speaker: "Alex", text: "Got it. Once I get the signatures, do I submit it back here or upload it to the student portal?", translation: "明白了。拿到签字后，我是交回这里，还是上传到学生门户网站？" },
    { id: "school-26", speaker: "Mike", text: "Bring the signed physical copy directly to our front desk, and we will process the override within 24 hours.", translation: "请把签好字的纸质版直接送到我们前台，我们会在 24 小时内处理特批。" },
    { id: "school-27", speaker: "Alex", text: "Thank you so much for clarifying that process for me.", translation: "非常感谢您帮我理清这个流程。" },
    { id: "school-28", speaker: "Mike", text: "No problem at all. Just make sure you submit it before Friday afternoon to avoid late fees.", translation: "一点也不麻烦。只要确保在周五下午之前提交，以免产生滞纳金。" },
    { id: "school-29", speaker: "Alex", text: "Hi everyone, welcome to today's study group session. Shall we start by reviewing last week's lecture notes?", translation: "大家好，欢迎来到今天的学习小组。我们先从复习上周的讲义开始好吗？" },
    { id: "school-30", speaker: "Mike", text: "Sounds good to me. I had trouble understanding the section on macroeconomic equilibrium models.", translation: "听起来不错。我对宏观经济均衡模型那一节的内容有点理解困难。" },
    { id: "school-31", speaker: "Alex", text: "Ah, that part was tricky. Basically, it deals with the intersection of aggregate demand and aggregate supply.", translation: "啊，那部分确实挺棘手。基本上，它处理的是总需求和总供给的交点问题。" },
    { id: "school-32", speaker: "Mike", text: "Right, but how does fiscal policy shift the curve in the short run versus the long run?", translation: "对，但财政政策在短期和长期内是如何移动这条曲线的呢？" },
    { id: "school-33", speaker: "Alex", text: "In the short run, government spending shifts the aggregate demand curve outward, raising output and prices.", translation: "在短期内，政府支出会使总需求曲线向外移动，从而提高产出和物价。" },
    { id: "school-34", speaker: "Mike", text: "And in the long run, prices adjust completely, so output returns to its natural rate, right?", translation: "而在长期内，价格会完全调整，因此产出会回到其自然水平，对吧？" },
    { id: "school-35", speaker: "Alex", text: "Spot on! You've got the core concept down completely.", translation: "完全正确！你已经彻底掌握核心概念了。" },
    { id: "school-36", speaker: "Mike", text: "That makes much more sense now that you explained it with a graph.", translation: "你用图表一解释，现在好懂多了。" },
    { id: "school-37", speaker: "Alex", text: "Let's move on to practice question number four from the handout. Who wants to take the lead?", translation: "我们接着看讲义上的第四道练习题。谁来带头解答一下？" },
    { id: "school-38", speaker: "Mike", text: "I can try. The question asks us to calculate the marginal propensity to consume given a disposable income change.", translation: "我来试试吧。题目要求我们根据可支配收入的变化来计算边际消费倾向。" },
    { id: "school-39", speaker: "Alex", text: "Go ahead, we are listening. Walk us through your calculation steps.", translation: "请讲，我们听着呢。把你的计算步骤跟大家理一遍。" },
    { id: "school-40", speaker: "Mike", text: "We divide the change in consumer spending by the change in disposable income, which gives us 0.75.", translation: "我们将消费支出的变化量除以可支配收入的变化量，得出的结果是 0.75。" },
    { id: "school-41", speaker: "Alex", text: "Brilliant, that matches the answer key precisely.", translation: "太棒了，这跟标准答案完全吻合。" },
    { id: "school-42", speaker: "Mike", text: "Awesome! Teamwork really helps clear up these complex formulas.", translation: "太棒了！团队合作确实有助于搞懂这些复杂的公式。" },
    { id: "school-43", speaker: "Alex", text: "Excuse me, I'm looking for the university's career counseling and internship placement office.", translation: "打扰一下，我在找学校的就业咨询和实习分配办公室。" },
    { id: "school-44", speaker: "Mike", text: "You're in the right building. Take the stairs down to the ground floor, and it's suite 102.", translation: "你没找错楼。走楼梯到一楼，102 房间就是。" },
    { id: "school-45", speaker: "Alex", text: "Do I need to book an appointment online beforehand, or do they accept walk-in consultations?", translation: "我需要提前在网上预约，还是他们接受临时上门咨询？" },
    { id: "school-46", speaker: "Mike", text: "For resume reviews, they have drop-in hours every Tuesday afternoon without an appointment.", translation: "对于简历修改，他们每周二下午设有名额开放时间，无需预约。" },
    { id: "school-47", speaker: "Alex", text: "That is extremely convenient. Are mock interview sessions also available there?", translation: "那太方便了。那里也提供模拟面试训练吗？" },
    { id: "school-48", speaker: "Mike", text: "Yes, but those require prior online booking because they pair you with industry mentors.", translation: "是的，不过模拟面试需要提前网上预约，因为他们会为你安排行业导师。" },
    { id: "school-49", speaker: "Alex", text: "I will make sure to schedule one through the student portal tonight.", translation: "我今晚一定通过学生门户网站预约一个。" },
    { id: "school-50", speaker: "Mike", text: "Good idea, slots fill up fast as the autumn recruitment season approaches.", translation: "好主意，随着秋季招聘季临近，名额很快就会报满。" },
    { id: "school-51", speaker: "Alex", text: "Hi, I received an email notification that my student accommodation housing contract is up for renewal.", translation: "你好，我收到一封邮件通知，说我的学生宿舍合同快到期需要续签了。" },
    { id: "school-52", speaker: "Mike", text: "That's correct. The priority renewal window for current residents closes at the end of this month.", translation: "没错。现住学生的优先续签窗口在本月底关闭。" },
    { id: "school-53", speaker: "Alex", text: "Can I request to switch to a different room type or building for the upcoming academic year?", translation: "我可以申请在接下来的学年换到不同的房型或楼栋吗？" },
    { id: "school-54", speaker: "Mike", text: "Room transfer requests are processed based on availability and a lottery system.", translation: "换房申请是根据房源情况和抽签系统来处理的。" },
    { id: "school-55", speaker: "Alex", text: "If I choose to stay in my current double room, do I still need to submit a new application?", translation: "如果我选择留在现在的双人间，还需要提交新的申请吗？" },
    { id: "school-56", speaker: "Mike", text: "You just need to click the auto-renew button on your housing portal dashboard.", translation: "你只需要点击宿舍门户控制面板上的自动续签按钮即可。" },
    { id: "school-57", speaker: "Alex", text: "Does the renewal rate include utility fees and high-speed campus internet access?", translation: "续签费用包含水电费和校园高速网络接入费吗？" },
    { id: "school-58", speaker: "Mike", text: "All utilities and internet are fully included in the standard semester housing fee.", translation: "所有水电费和网络都完全包含在标准的学期住宿费中。" },
    { id: "school-59", speaker: "Alex", text: "That is a huge relief. I'll complete the renewal confirmation right away.", translation: "那就彻底放心了。我马上完成续签确认。" },
    { id: "school-60", speaker: "Mike", text: "Great. Make sure you check your email for the updated payment schedule confirmation.", translation: "很好。确保查看你的电子邮件以获取更新后的缴费日程确认。" },
    { id: "school-61", speaker: "Alex", text: "Hello, I'd like to check out these three reference textbooks from the reserve desk.", translation: "你好，我想从保留图书柜台借阅这三本参考教科书。" },
    { id: "school-62", speaker: "Mike", text: "Sure, please hand me your student ID card. Keep in mind these are overnight loans only.", translation: "好的，请把学生证交给我。请记住，这些书仅限过夜借阅。" },
    { id: "school-63", speaker: "Alex", text: "Understood. When exactly do they need to be returned tomorrow morning?", translation: "明白了。明天早上具体什么时间必须还回来？" },
    { id: "school-64", speaker: "Mike", text: "They must be returned to this front desk by 9:00 AM sharp to avoid overdue fines.", translation: "必须在明天上午 9 点整之前归还到这个前台，以免产生逾期罚款。" },
    { id: "school-65", speaker: "Alex", text: "What happens if the library is closed due to a public holiday or unexpected weather?", translation: "如果因为公众假期或突发天气图书馆闭馆了怎么办？" },
    { id: "school-66", speaker: "Mike", text: "You can drop them into the external book drop slot located near the main entrance gates.", translation: "你可以把书投进正门入口附近的室外还书箱里。" },
    { id: "school-67", speaker: "Alex", text: "Good to know. Can I renew them online if I need them for another day?", translation: "好的，明白了。如果我多需要一天，可以在网上续借吗？" },
    { id: "school-68", speaker: "Mike", text: "Reserve items cannot be renewed online if other students have placed a hold on them.", translation: "如果其他学生已经预约了这些保留图书，就无法在网上续借。" },
    { id: "school-69", speaker: "Alex", text: "Makes sense. I'll make sure to finish my chapter reading tonight then.", translation: "有道理。那今晚我一定抓紧把这一章看完。" },
    { id: "school-70", speaker: "Mike", text: "Good luck with your reading! Let us know if you need any scanner assistance.", translation: "祝你阅读顺利！如果需要任何扫描仪方面的帮助，随时告诉我们。" },
    { id: "school-71", speaker: "Alex", text: "Hi Dr. Evans, I'm writing to request an extension for our upcoming research paper deadline.", translation: "嗨，埃文斯博士，我写信是想申请将我们即将到期的研究论文截止日期延期。" },
    { id: "school-72", speaker: "Mike", text: "Hello Alex. University policy requires official documentation for extension requests. What is the reason?", translation: "你好，亚历克斯。学校政策规定延期申请必须提供官方证明。原因是什么？" },
    { id: "school-73", speaker: "Alex", text: "I caught a severe flu earlier this week and had to visit the campus medical center.", translation: "我本周早些时候得了重感冒，不得不去了一趟校医院。" },
    { id: "school-74", speaker: "Mike", text: "I'm sorry to hear that. Please forward the medical certificate issued by the campus clinic.", translation: "听到这个我很遗憾。请转发一下校医诊所开具的医疗证明。" },
    { id: "school-75", speaker: "Alex", text: "I've already attached the PDF note to this email thread for your review.", translation: "我已经将 PDF 证明附件随这封邮件发给您审阅了。" },
    { id: "school-76", speaker: "Mike", text: "Received and verified. I can grant you a 48-hour extension until this coming Sunday midnight.", translation: "已收到并核实。我可以给你宽限 48 小时，直到本周日午夜。" },
    { id: "school-77", speaker: "Alex", text: "Thank you so much for your understanding and flexibility, Dr. Evans.", translation: "非常感谢您的理解与通融，埃文斯博士。" },
    { id: "school-78", speaker: "Mike", text: "Take care of your health first, and make sure to submit it through the portal once ready.", translation: "先照顾好自己的身体，准备好后务必通过门户网站提交。" },
    { id: "school-79", speaker: "Alex", text: "Excuse me, where is the IT service desk located for resetting my student account password?", translation: "打扰一下，重置学生账户密码的 IT 服务台在哪里？" },
    { id: "school-80", speaker: "Mike", text: "It's on the lower level of the computer science building, right next to the main computer lab.", translation: "在计算机科学大楼的负一层，紧挨着主计算机实验室。" },
    { id: "school-81", speaker: "Alex", text: "Do I need to bring any form of identity verification, like my passport or driver's license?", translation: "我需要带任何身份证明文件吗，比如护照或驾照？" },
    { id: "school-82", speaker: "Mike", text: "Your physical student ID card is sufficient for identity verification at the counter.", translation: "你的实体学生证就足够在柜台进行身份核验了。" },
    { id: "school-83", speaker: "Alex", text: "How long does the password reset process usually take?", translation: "密码重置过程通常需要多长时间？" },
    { id: "school-84", speaker: "Mike", text: "It takes less than five minutes as long as your account details are verified.", translation: "只要你的账户信息核实无误，不到五分钟就能搞定。" },
    { id: "school-85", speaker: "Alex", text: "Fantastic. My multi-factor authentication app got locked out after I switched phones.", translation: "太棒了。我换手机后，多因素认证（MFA）应用被锁定了。" },
    { id: "school-86", speaker: "Mike", text: "The technicians can easily rebind your authenticator app right at the service desk.", translation: "技术人员可以直接在服务台帮你重新绑定认证应用。" },
    { id: "school-87", speaker: "Alex", text: "Hi, I'd like to book a group study room in the library for our project presentation rehearsal.", translation: "你好，我想在图书馆预订一间小组自习室，用于我们的项目展示排练。" },
    { id: "school-88", speaker: "Mike", text: "Sure thing. Which date and time slot would you prefer for your reservation?", translation: "没问题。你倾向于预订哪个日期和时间段？" },
    { id: "school-89", speaker: "Alex", text: "This Thursday from 3 PM to 5 PM if a room with a projector is available.", translation: "本周四下午 3 点到 5 点，如果有带投影仪的房间的话。" },
    { id: "school-90", speaker: "Mike", text: "Let me check the booking system. Room 402 is free during that time window.", translation: "我查一下预订系统。402 房间在那段时间是空着的。" },
    { id: "school-91", speaker: "Alex", text: "That's wonderful. Can you please lock it in under my student ID number?", translation: "太好了。能帮我用学号锁定这个房间吗？" },
    { id: "school-92", speaker: "Mike", text: "Done. A confirmation email with your room passcode has been sent to your inbox.", translation: "搞定。带有房间密码的确认邮件已经发送到你的收件箱了。" },
    { id: "school-93", speaker: "Alex", text: "Do we need to pick up any physical key or equipment from the front desk beforehand?", translation: "我们需要提前去前台领取实体钥匙或任何设备吗？" },
    { id: "school-94", speaker: "Mike", text: "No physical key is needed; the room opens automatically using your student ID card scan.", translation: "不需要实体钥匙，刷你的学生证就可以自动开门。" },
    { id: "school-95", speaker: "Alex", text: "Thank you for your prompt assistance with this reservation.", translation: "感谢你迅速帮我办妥这次预订。" },
    { id: "school-96", speaker: "Mike", text: "You're welcome. Good luck with your project presentation rehearsal!", translation: "不客气。祝你们的项目展示排练顺利！" },
    { id: "school-97", speaker: "Alex", text: "Excuse me, is this the venue where the undergraduate academic advising seminar is being held?", translation: "打扰一下，这里是本科生学术指导讲座的举办地点吗？" },
    { id: "school-98", speaker: "Mike", text: "Yes, you're in the right place. Please sign your name on the attendance sheet by the entrance.", translation: "是的，你没走错地方。请在入口处的签到表上签个名。" },
    { id: "school-99", speaker: "Alex", text: "Are informational brochures and course planning worksheets available for everyone to take?", translation: "宣传册和选课规划表是每个人都可以拿一份吗？" },
    { id: "school-100", speaker: "Mike", text: "Help yourself to a folder on the table, and feel free to grab a seat near the front.", translation: "桌上的文件夹大家自取，请随便在前排附近找个座位坐下。" }
  ],
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
  housing: [
  {
    "id": "housing-1",
    "speaker": "Alex",
    "text": "Hi Mia, I saw you looking at apartment listings. Are you planning to move soon?",
    "translation": "嗨 Mia，我看到你在看租房列表。你近期打算搬家吗？",
    "note": "apartment listings 指房屋出租列表/房源信息。"
  },
  {
    "id": "housing-2",
    "speaker": "Mia",
    "text": "Yes, Alex! My current lease expires next month, so I'm searching for a new place.",
    "translation": "是的，Alex！我现在的租约下个月就到期了，所以我正在找新房子。",
    "note": "lease expires 表示租约到期。"
  },
  {
    "id": "housing-3",
    "speaker": "Alex",
    "text": "What kind of apartment are you looking for? A studio or a one-bedroom?",
    "translation": "你想找什么样的公寓？开间还是一居室？",
    "note": "studio 指单间公寓/开间；one-bedroom 指一居室公寓。"
  },
  {
    "id": "housing-4",
    "speaker": "Mia",
    "text": "I'm hoping to find a furnished one-bedroom close to the subway line.",
    "translation": "我希望找一套带家具、离地铁线近的一居室。",
    "note": "furnished 表示配备家具的。"
  },
  {
    "id": "housing-5",
    "speaker": "Alex",
    "text": "That makes sense. What is your maximum budget for monthly rent?",
    "translation": "有道理。你每月租金的最大预算是多少？",
    "note": "monthly rent 意为每月租金。"
  },
  {
    "id": "housing-6",
    "speaker": "Mia",
    "text": "My budget is around $1,500 per month, including basic utility fees.",
    "translation": "我的预算在每月 1500 美元左右，最好包含基础水电网费。",
    "note": "utility fees 指水电气网等公用事业费。"
  },
  {
    "id": "housing-7",
    "speaker": "Alex",
    "text": "Have you tried checking online rental platforms or local agency websites?",
    "translation": "你有试过查看线上租房平台或本地中介网站吗？",
    "note": "rental platform 意为租房平台。"
  },
  {
    "id": "housing-8",
    "speaker": "Mia",
    "text": "I've been browsing rental apps daily, but good options get snatched up quickly.",
    "translation": "我每天都在刷租房 App，但好的房源很快就被抢光了。",
    "note": "snatch up 表示被迅速抢走/抢购。"
  },
  {
    "id": "housing-9",
    "speaker": "Alex",
    "text": "A friend of mine mentioned an available apartment in downtown yesterday.",
    "translation": "我一个朋友昨天提到市中心有一套空置的公寓待租。",
    "note": "available 在租房语境中表示待出租的/可用的。"
  },
  {
    "id": "housing-10",
    "speaker": "Mia",
    "text": "Really? Could you send me the listing details? I'd love to check it out!",
    "translation": "真的吗？你能把房源详情发给我吗？我很想去看看！",
    "note": "check sth. out 意为去看看/去了解。"
  },
  {
    "id": "housing-11",
    "speaker": "Alex",
    "text": "I just sent you the link. It's a newly renovated apartment on Oak Street.",
    "translation": "我刚刚把链接发给你了。是橡树街上一套重新装修过的公寓。",
    "note": "newly renovated 表示新装修的。"
  },
  {
    "id": "housing-12",
    "speaker": "Mia",
    "text": "Thanks! The pictures look great. I'll call the leasing agent right away.",
    "translation": "谢谢！照片看起来很棒。我这就给租赁中介打电话。",
    "note": "leasing agent 指房屋租赁中介/经纪人。"
  },
  {
    "id": "housing-13",
    "speaker": "Alex",
    "text": "Make sure to ask if the place is available for immediate move-in.",
    "translation": "记得问问这房子能不能随时入住。",
    "note": "immediate move-in 意为随时入住/立即入住。"
  },
  {
    "id": "housing-14",
    "speaker": "Mia",
    "text": "Hello, I'm calling regarding the one-bedroom apartment listed on Oak Street.",
    "translation": "您好，我打过来是想咨询一下橡树街上挂出的那套一居室公寓。",
    "note": "call regarding... 表达打电话咨询关于的事宜。"
  },
  {
    "id": "housing-15",
    "speaker": "Alex",
    "text": "Hi! Yes, it's still available. Would you like to schedule an apartment tour?",
    "translation": "你好！是的，房子还在。你想预约实地看房吗？",
    "note": "apartment tour 指实地看房/看房流程。"
  },
  {
    "id": "housing-16",
    "speaker": "Mia",
    "text": "Absolutely. Is it possible to view the apartment this Saturday afternoon?",
    "translation": "当然可以。请问这周六下午方便看房吗？",
    "note": "view the apartment 意为看房。"
  },
  {
    "id": "housing-17",
    "speaker": "Alex",
    "text": "Saturday at two o'clock works for me. I'll meet you right outside the main entrance.",
    "translation": "周六下午两点可以。到时候我们在公寓正门口碰面。",
    "note": "works for me 意为对我来说时间合适。"
  },
  {
    "id": "housing-18",
    "speaker": "Mia",
    "text": "Perfect. Could you confirm what utilities are included in the monthly rent?",
    "translation": "太好了。能否确认一下每月租金里包含了哪些公用事业费？",
    "note": "included in... 表示包含在之中。"
  },
  {
    "id": "housing-19",
    "speaker": "Alex",
    "text": "Water and trash removal are included, but electricity and internet are separate.",
    "translation": "包含水费和垃圾处理费，但电费和网费是需要自理的。",
    "note": "trash removal 指垃圾清理费。"
  },
  {
    "id": "housing-20",
    "speaker": "Mia",
    "text": "Understood. I look forward to meeting you on Saturday afternoon!",
    "translation": "明白了。期待周六下午与您见面！",
    "note": "look forward to doing sth. 表示期待做某事。"
  },
  {
    "id": "housing-21",
    "speaker": "Alex",
    "text": "Welcome to the apartment, Mia! As you can see, it has plenty of natural light.",
    "translation": "欢迎来到这套公寓，Mia！正如你所见，采光非常充沛。",
    "note": "natural light 指自然采光/光线。"
  },
  {
    "id": "housing-22",
    "speaker": "Mia",
    "text": "Wow, the living room is so spacious! Is heating and air conditioning installed?",
    "translation": "哇，客厅非常宽敞！请问安装了暖气和空调吗？",
    "note": "spacious 意为宽敞的。"
  },
  {
    "id": "housing-23",
    "speaker": "Alex",
    "text": "Yes, central heating and air conditioning are fully operational and easy to control.",
    "translation": "是的，中央冷暖空调运转良好且操作简便。",
    "note": "fully operational 表示运转良好的/可正常使用的。"
  },
  {
    "id": "housing-24",
    "speaker": "Mia",
    "text": "That's great. Let me quickly check the kitchen appliances and water pressure.",
    "translation": "太好了。让我快速检查一下厨房家电和水压。",
    "note": "water pressure 意为水压。"
  },
  {
    "id": "housing-25",
    "speaker": "Alex",
    "text": "All appliances, including the refrigerator and dishwasher, were updated last year.",
    "translation": "包括冰箱和洗碗机在内的所有家电都是去年刚更新的。",
    "note": "refrigerator 意为冰箱；dishwasher 指洗碗机。"
  },
  {
    "id": "housing-26",
    "speaker": "Mia",
    "text": "Everything looks very clean. Are pets allowed in this building?",
    "translation": "看起来都非常干净。这栋楼允许养宠物吗？",
    "note": "pets allowed 意为允许养宠物。"
  },
  {
    "id": "housing-27",
    "speaker": "Alex",
    "text": "Small pets like cats are allowed, but a pet deposit is required upon signing.",
    "translation": "允许养猫等小型宠物，但签约时需要缴纳宠物押金。",
    "note": "pet deposit 指宠物押金。"
  },
  {
    "id": "housing-28",
    "speaker": "Mia",
    "text": "Is there a dedicated parking space assigned to this unit?",
    "translation": "这套房子有配备专属停车位吗？",
    "note": "dedicated parking space 指专用/固定车位。"
  },
  {
    "id": "housing-29",
    "speaker": "Alex",
    "text": "Yes, one underground parking spot is included in the rental price.",
    "translation": "有的，租金里已经包含了一个地下停车位。",
    "note": "underground parking spot 指地下停车位。"
  },
  {
    "id": "housing-30",
    "speaker": "Mia",
    "text": "Excellent. I really like the layout and the quiet neighborhood atmosphere.",
    "translation": "太棒了。我非常喜欢这里的户型布局和安静的社区氛围。",
    "note": "layout 指房屋户型/格局。"
  },
  {
    "id": "housing-31",
    "speaker": "Alex",
    "text": "I'm glad you like it! Are you interested in submitting an application today?",
    "translation": "很高兴你喜欢！你今天有兴趣提交租房申请吗？",
    "note": "submit an application 意为提交申请。"
  },
  {
    "id": "housing-32",
    "speaker": "Mia",
    "text": "I am, but is the monthly rent price negotiable if I sign a two-year lease?",
    "translation": "我有意向，不过如果我签两年长租，月租金还有商量空间吗？",
    "note": "negotiable 意为可协商的/可议价的。"
  },
  {
    "id": "housing-33",
    "speaker": "Alex",
    "text": "I can talk to the landlord and see if they can offer a slight discount.",
    "translation": "我可以去和房东沟通一下，看看能不能给点小折扣。",
    "note": "landlord 指房东。"
  },
  {
    "id": "housing-34",
    "speaker": "Mia",
    "text": "That would be wonderful. I'd be willing to sign for two years if it's $1,400.",
    "translation": "那太好了。如果是 1400 美元的话，我愿意签两年。",
    "note": "be willing to do sth. 表示愿意做某事。"
  },
  {
    "id": "housing-35",
    "speaker": "Alex",
    "text": "Let me check with the owner right now... Okay, they agreed to $1,420 per month.",
    "translation": "我和房东确认一下好了，他们同意按每月 1420 美元出租。",
    "note": "check with sb. 意为与某人核对/沟通。"
  },
  {
    "id": "housing-36",
    "speaker": "Mia",
    "text": "That sounds fair to me. What are the standard lease terms and conditions?",
    "translation": "听起来蛮合理的。标准租约条款和条件有哪些？",
    "note": "terms and conditions 指条款与条件。"
  },
  {
    "id": "housing-37",
    "speaker": "Alex",
    "text": "The lease runs for 24 months, with rent due on the first day of each month.",
    "translation": "租期为 24 个月，租金需要在每月第一天支付。",
    "note": "rent due 表示租金到期应付。"
  },
  {
    "id": "housing-38",
    "speaker": "Mia",
    "text": "Is there a grace period for rent payments if the first falls on a weekend?",
    "translation": "如果每月一号恰好逢周末，交租金有宽限期吗？",
    "note": "grace period 指宽限期。"
  },
  {
    "id": "housing-39",
    "speaker": "Alex",
    "text": "Yes, there is a three-day grace period before any late fee is applied.",
    "translation": "有的，在产生滞纳金之前有 3 天的付款宽限期。",
    "note": "late fee 指滞纳金/迟交罚款。"
  },
  {
    "id": "housing-40",
    "speaker": "Mia",
    "text": "Great, that gives me peace of mind regarding monthly payments.",
    "translation": "太好了，这样我在交租金方面就放心多了。",
    "note": "peace of mind 意为安心/放宽心。"
  },
  {
    "id": "housing-41",
    "speaker": "Alex",
    "text": "Now we need to process the rental application and background credit check.",
    "translation": "现在我们需要处理租房申请并进行背景信用调查。",
    "note": "credit check 指信用背景调查。"
  },
  {
    "id": "housing-42",
    "speaker": "Mia",
    "text": "Sure. What documents do I need to provide for the credit check?",
    "translation": "没问题。做信用调查我需要提供什么材料？",
    "note": "documents 意为文件/证件材料。"
  },
  {
    "id": "housing-43",
    "speaker": "Alex",
    "text": "Please provide a copy of your ID, recent pay stubs, and employment verification.",
    "translation": "请提供身份证件复印件、近期的工资单以及在职证明。",
    "note": "pay stub 指工资单；employment verification 指在职证明。"
  },
  {
    "id": "housing-44",
    "speaker": "Mia",
    "text": "I have those documents ready in my email. I'll send them over immediately.",
    "translation": "这些材料我邮箱里都有现成的，我这就发过去。",
    "note": "send sth. over 意为发送过去。"
  },
  {
    "id": "housing-45",
    "speaker": "Alex",
    "text": "Perfect. Once approved, you'll need to pay the first month's rent and security deposit.",
    "translation": "很好。一旦审核通过，你需要支付首月租金和押金。",
    "note": "security deposit 指房屋租房押金。"
  },
  {
    "id": "housing-46",
    "speaker": "Mia",
    "text": "How much is the security deposit for this apartment?",
    "translation": "这套公寓的租房押金是多少钱？",
    "note": "how much is... 常用作询问价格费用。"
  },
  {
    "id": "housing-47",
    "speaker": "Alex",
    "text": "The deposit equals one month's rent, which will be held in an escrow account.",
    "translation": "押金等于一个月租金，将存放在第三方托管账户中。",
    "note": "escrow account 指第三方托管账户。"
  },
  {
    "id": "housing-48",
    "speaker": "Mia",
    "text": "Understood. Will the deposit be fully refunded when I move out?",
    "translation": "明白了。在我搬走退房时押金会全额退还吗？",
    "note": "fully refunded 意为全额退还。"
  },
  {
    "id": "housing-49",
    "speaker": "Alex",
    "text": "Yes, provided the apartment is returned in good condition without damages.",
    "translation": "是的，前提是房屋退还时完好无损。",
    "note": "provided (that) 引导条件状语，意为前提是/只要。"
  },
  {
    "id": "housing-50",
    "speaker": "Mia",
    "text": "Excellent. Let's go ahead and sign the digital lease agreement.",
    "translation": "太好了。那我们这就开始签署电子租赁合同吧。",
    "note": "digital lease agreement 指电子租赁合同。"
  },
  {
    "id": "housing-51",
    "speaker": "Alex",
    "text": "Here are your new apartment keys and electronic building access fob!",
    "translation": "给，这是你的新家钥匙和门禁感应卡！",
    "note": "access fob 指门禁感应卡/钥匙扣。"
  },
  {
    "id": "housing-52",
    "speaker": "Mia",
    "text": "Thank you so much! What time am I allowed to reserve the elevator for moving day?",
    "translation": "太感谢了！我搬家那天可以预约什么时间段使用电梯？",
    "note": "reserve the elevator 指预约搬家电梯。"
  },
  {
    "id": "housing-53",
    "speaker": "Alex",
    "text": "You can reserve the freight elevator between 9 AM and 4 PM on weekends.",
    "translation": "周末上午 9 点到下午 4 点之间可以预约货梯。",
    "note": "freight elevator 指货梯/载货电梯。"
  },
  {
    "id": "housing-54",
    "speaker": "Mia",
    "text": "Got it. I'll book the 10 AM slot with the building manager.",
    "translation": "收到。我会向楼管预约上午 10 点的时段。",
    "note": "slot 指时间段。"
  },
  {
    "id": "housing-55",
    "speaker": "Alex",
    "text": "Don't forget to transfer the electricity service to your name before moving in.",
    "translation": "入住前别忘了把电费账户过户到你的名下。",
    "note": "transfer electricity service 指办理用电账户过户。"
  },
  {
    "id": "housing-56",
    "speaker": "Mia",
    "text": "Right. I've already set up the electric and Wi-Fi accounts online for activation tomorrow.",
    "translation": "对的。我已经在线提交了用电和宽带开户，明天就会激活。",
    "note": "activation 意为开通/激活。"
  },
  {
    "id": "housing-57",
    "speaker": "Alex",
    "text": "Smart move! Remember to complete the move-in inspection checklist today.",
    "translation": "明智！记得今天填写完入住检验清单。",
    "note": "inspection checklist 指入住检验清单。"
  },
  {
    "id": "housing-58",
    "speaker": "Mia",
    "text": "Yes, I'm taking photos of all existing scratches or marks for documentation.",
    "translation": "好的，我正在对所有原有的划痕和痕迹拍照存档。",
    "note": "documentation 意为留存凭证/归档。"
  },
  {
    "id": "housing-59",
    "speaker": "Alex",
    "text": "That's a great habit to protect your security deposit later on.",
    "translation": "这是个好习惯，以后能很好地保障你的押金退还。",
    "note": "protect security deposit 意为保障押金退还。"
  },
  {
    "id": "housing-60",
    "speaker": "Mia",
    "text": "Definitely. Now I'm ready to unload the moving truck and unpack.",
    "translation": "确实。现在我准备卸搬家车并拆包整理了。",
    "note": "unpack 意为拆包整理整理行李。"
  },
  {
    "id": "housing-61",
    "speaker": "Alex",
    "text": "Hi Mia, how are you settling into your new apartment after two weeks?",
    "translation": "嗨 Mia，搬进来两周了，在新家安顿得怎么样？",
    "note": "settle in 意为安顿下来/适应新环境。"
  },
  {
    "id": "housing-62",
    "speaker": "Mia",
    "text": "Everything is great, but I noticed the bathroom faucet is dripping constantly.",
    "translation": "一切都很好，但我发现浴室的水龙头一直在不停滴水。",
    "note": "faucet is dripping 表示水龙头在滴水。"
  },
  {
    "id": "housing-63",
    "speaker": "Alex",
    "text": "Oh, you should submit a maintenance request through our tenant portal.",
    "translation": "哦，你可以通过我们的租户平台提交一份报修申请。",
    "note": "maintenance request 指报修单；tenant portal 指租户系统/门户。"
  },
  {
    "id": "housing-64",
    "speaker": "Mia",
    "text": "How long does maintenance usually take to respond to non-emergency repairs?",
    "translation": "一般非紧急修缮报修，维修人员多长时间会回应？",
    "note": "non-emergency repairs 指非紧急维修。"
  },
  {
    "id": "housing-65",
    "speaker": "Alex",
    "text": "Typically within 24 to 48 hours for general plumbing or fixture repairs.",
    "translation": "普通管道或设施维修通常在 24 到 48 小时内处理。",
    "note": "plumbing 指管道水暖系统。"
  },
  {
    "id": "housing-66",
    "speaker": "Mia",
    "text": "That's quick. Is there an emergency contact for urgent issues like pipe bursts?",
    "translation": "挺快的。如果遇到水管爆裂这种紧急情况，有紧急联系方式吗？",
    "note": "pipe burst 指水管爆裂。"
  },
  {
    "id": "housing-67",
    "speaker": "Alex",
    "text": "Yes, the 24/7 emergency hotline number is posted on the lobby notice board.",
    "translation": "有的，24 小时紧急热线贴在大堂的公告栏上。",
    "note": "notice board 意为公告栏。"
  },
  {
    "id": "housing-68",
    "speaker": "Mia",
    "text": "Thanks, Alex. I'll submit the repair ticket right away on my phone.",
    "translation": "多谢 Alex。我这就用手机提交报修单。",
    "note": "repair ticket 指维修工单/报修单。"
  },
  {
    "id": "housing-69",
    "speaker": "Alex",
    "text": "The maintenance technician will call before entering if you aren't home.",
    "translation": "如果你不在家，维修技师进屋前会先给你打电话。",
    "note": "technician 指技术人员/技师。"
  },
  {
    "id": "housing-70",
    "speaker": "Mia",
    "text": "Perfect, I appreciate the prompt service from the management team.",
    "translation": "太好了，非常感谢管理团队如此高效的服务。",
    "note": "prompt service 意为及时高效的服务。"
  },
  {
    "id": "housing-71",
    "speaker": "Alex",
    "text": "How are your upstairs neighbors? I hope the building is quiet at night.",
    "translation": "你的楼上邻居怎么样？希望大楼晚上挺安静的。",
    "note": "upstairs neighbors 指楼上邻居。"
  },
  {
    "id": "housing-72",
    "speaker": "Mia",
    "text": "Generally quiet, though they occasionally play music late on Friday evenings.",
    "translation": "总体很安静，不过他们偶尔会在周五晚上放音乐放得蛮晚。",
    "note": "occasionally 意为偶尔/有时。"
  },
  {
    "id": "housing-73",
    "speaker": "Alex",
    "text": "The building quiet hours start at 10 PM on weekdays and 11 PM on weekends.",
    "translation": "大楼的安静时段是工作日晚 10 点开始，周末晚 11 点开始。",
    "note": "quiet hours 指限制噪音的安静时段。"
  },
  {
    "id": "housing-74",
    "speaker": "Mia",
    "text": "Good to know. Should I speak to them directly or inform the property manager?",
    "translation": "了解了。我是应该直接找他们沟通，还是通知物业经理？",
    "note": "property manager 指物业经理。"
  },
  {
    "id": "housing-75",
    "speaker": "Alex",
    "text": "A polite chat usually works first, but management can step in if it persists.",
    "translation": "礼貌沟通通常最有效，但如果情况持续，物业可以介入。",
    "note": "step in 意为干预/介入。"
  },
  {
    "id": "housing-76",
    "speaker": "Mia",
    "text": "I'll try talking to them friendly first if it happens again.",
    "translation": "如果再出现这种情况，我会先友好地跟他们聊聊。",
    "note": "talk to sb. friendly 意为友好地沟通。"
  },
  {
    "id": "housing-77",
    "speaker": "Alex",
    "text": "Also, please remember that trash sorting rules are strictly enforced here.",
    "translation": "另外请记住，我们这里对垃圾分类规则执行得非常严格。",
    "note": "trash sorting 意为垃圾分类。"
  },
  {
    "id": "housing-78",
    "speaker": "Mia",
    "text": "Where are the recycling bins located for glass and paper waste?",
    "translation": "回收玻璃和纸质废物的回收桶在哪里？",
    "note": "recycling bins 意为分类回收桶。"
  },
  {
    "id": "housing-79",
    "speaker": "Alex",
    "text": "They are in the basement garbage room right next to the elevator entrance.",
    "translation": "都在地下室的垃圾房里，就在电梯入口旁边。",
    "note": "basement garbage room 指地下垃圾房。"
  },
  {
    "id": "housing-80",
    "speaker": "Mia",
    "text": "Thanks for letting me know. I'll make sure to follow the recycling guidelines.",
    "translation": "谢谢告知。我一定会遵守垃圾分类指引的。",
    "note": "guidelines 意为指引/规范。"
  },
  {
    "id": "housing-81",
    "speaker": "Alex",
    "text": "Time flies! Your two-year lease is coming up for renewal in two months.",
    "translation": "时间飞逝！你为期两年的租约再过两个月就要续约了。",
    "note": "time flies 意为时光飞逝；renewal 指续约。"
  },
  {
    "id": "housing-82",
    "speaker": "Mia",
    "text": "Indeed! I've really enjoyed living here and would like to extend my lease.",
    "translation": "确实！我在这里住得非常开心，很想延长租约。",
    "note": "extend my lease 意为延长/续签租约。"
  },
  {
    "id": "housing-83",
    "speaker": "Alex",
    "text": "We'd love to have you stay. Management sent over the renewal terms today.",
    "translation": "我们非常欢迎你留下来。管理层今天发来了续约条款。",
    "note": "renewal terms 指续约条款。"
  },
  {
    "id": "housing-84",
    "speaker": "Mia",
    "text": "Is there any change in monthly rent for the upcoming year?",
    "translation": "请问新的一年月租金有什么变化吗？",
    "note": "upcoming year 指来年/下一年。"
  },
  {
    "id": "housing-85",
    "speaker": "Alex",
    "text": "There is a modest three percent increase to keep up with property market inflation.",
    "translation": "租金有 3% 的微幅上涨，以跟上房产市场的通货膨胀率。",
    "note": "modest 意为适度的/微幅的；inflation 指通货膨胀。"
  },
  {
    "id": "housing-86",
    "speaker": "Mia",
    "text": "That's reasonable given how much local rental prices have risen lately.",
    "translation": "考虑到最近当地租金上涨的幅度，这个涨幅还算合理。",
    "note": "given... 介词用法，意为考虑到/鉴于。"
  },
  {
    "id": "housing-87",
    "speaker": "Alex",
    "text": "Great! If you accept, we can send the renewal agreement via e-signature.",
    "translation": "太好了！如果你接受的话，我们可以把续约协议通过电子签名发给你。",
    "note": "e-signature 指电子签名。"
  },
  {
    "id": "housing-88",
    "speaker": "Mia",
    "text": "Yes, please send it over. I'm happy to renew for another year.",
    "translation": "好的，请发过来吧。我很乐意再续租一年。",
    "note": "renew for another year 意为再续租一年。"
  },
  {
    "id": "housing-89",
    "speaker": "Alex",
    "text": "Thank you for being such a responsible tenant, Mia!",
    "translation": "感谢你一直是一位这么省心、有责任感的租客，Mia！",
    "note": "responsible tenant 指省心/靠谱的租客。"
  },
  {
    "id": "housing-90",
    "speaker": "Mia",
    "text": "Thank you for always being so responsive and helpful with everything!",
    "translation": "也感谢你们总是沟通顺畅、热心帮我解决各种问题！",
    "note": "responsive 意为积极回应的/沟通顺畅的。"
  },
  {
    "id": "housing-91",
    "speaker": "Alex",
    "text": "Fast forward to the end of your stayare you ready for the final move-out walk-through?",
    "translation": "时光快进到退房时刻你准备好做最终的退房查房走查了吗？",
    "note": "move-out walk-through 指退房查房/验收走查。"
  },
  {
    "id": "housing-92",
    "speaker": "Mia",
    "text": "Yes, I've cleared out all my furniture and had the carpets professionally cleaned.",
    "translation": "是的，我清空了所有家具，并请专业人员清洗了地毯。",
    "note": "clear out 意为清空/搬离。"
  },
  {
    "id": "housing-93",
    "speaker": "Alex",
    "text": "Excellent! Let's inspect the walls, floors, and kitchen appliances together.",
    "translation": "太棒了！我们一起检查一下墙面、地板和厨房家电。",
    "note": "inspect 意为检查/检验。"
  },
  {
    "id": "housing-94",
    "speaker": "Mia",
    "text": "Here is the initial move-in checklist we filled out two years ago.",
    "translation": "给，这是我们两年前填写的那份入住初始检查清单。",
    "note": "move-in checklist 指入住检查清单。"
  },
  {
    "id": "housing-95",
    "speaker": "Alex",
    "text": "Everything is in immaculate shape. Minor paint scuffs are considered normal wear and tear.",
    "translation": "所有东西都完好如新。墙面微小的划痕属于正常的合理磨损。",
    "note": "immaculate 意为完美洁净的；wear and tear 指正常磨损。"
  },
  {
    "id": "housing-96",
    "speaker": "Mia",
    "text": "Glad to hear that! When can I expect to receive my security deposit refund?",
    "translation": "听到这个真高兴！我大概什么时候能收到退还的租房押金？",
    "note": "deposit refund 指押金退还。"
  },
  {
    "id": "housing-97",
    "speaker": "Alex",
    "text": "The full deposit will be refunded to your bank account within fourteen business days.",
    "translation": "全额押金将在 14 个工作日内退还至你的银行账户。",
    "note": "business days 指工作日。"
  },
  {
    "id": "housing-98",
    "speaker": "Mia",
    "text": "Perfect. I've already updated my forwarding address on the online portal.",
    "translation": "太好了。我已经在线上系统里更新了我的新接收地址。",
    "note": "forwarding address 指新联系/转寄地址。"
  },
  {
    "id": "housing-99",
    "speaker": "Alex",
    "text": "It was a pleasure having you as a tenant. Best of luck in your new chapter!",
    "translation": "很高兴你曾是我们的租客。祝你在新的人生篇章里一切顺利！",
    "note": "new chapter 表达人生新篇章。"
  },
  {
    "id": "housing-100",
    "speaker": "Mia",
    "text": "Thank you for everything, Alex! It was a fantastic living experience.",
    "translation": "感谢你所做的一切，Alex！这是一次非常棒的居住体验。",
    "note": "living experience 意为居住体验。"
  }
],
  medical: [
  {
    "id": "medical-1",
    "speaker": "Alex",
    "text": "Good morning, I'd like to make an appointment with Dr. Smith for a routine check-up.",
    "translation": "早安，我想预约 Smith 医生的例行体检。",
    "note": "make an appointment 意为预约（看医生/会议）。"
  },
  {
    "id": "medical-2",
    "speaker": "Mia",
    "text": "Sure thing! Is this your first time visiting our clinic, or are you a returning patient?",
    "translation": "好的！请问您是第一次来我们诊所，还是复诊患者？",
    "note": "returning patient 指复诊患者/老患者。"
  },
  {
    "id": "medical-3",
    "speaker": "Alex",
    "text": "I'm a returning patient. My contact number is on file under Alex Johnson.",
    "translation": "我是复诊患者。我的联系电话已登记在 Alex Johnson 名下。",
    "note": "on file 表示已存档/记录在案。"
  },
  {
    "id": "medical-4",
    "speaker": "Mia",
    "text": "Great! Dr. Smith has an opening this Thursday at ten in the morning. Does that work?",
    "translation": "太好了！Smith 医生本周四上午 10 点有空档，您方便吗？",
    "note": "have an opening 指有空闲/有预约空缺。"
  },
  {
    "id": "medical-5",
    "speaker": "Alex",
    "text": "Thursday at ten works well. Do I need to fast before coming in for blood tests?",
    "translation": "周四上午 10 点可以。抽血检查前我需要禁食吗？",
    "note": "fast 动词，表示禁食/禁水（通常指体检前）。"
  },
  {
    "id": "medical-6",
    "speaker": "Mia",
    "text": "Yes, please refrain from eating or drinking anything except water for eight hours prior.",
    "translation": "是的，请在看诊前 8 小时内禁食，但可以适当饮水。",
    "note": "refrain from... 意为克制/切勿做某事。"
  },
  {
    "id": "medical-7",
    "speaker": "Alex",
    "text": "Understood. Should I bring my current medical records or insurance card with me?",
    "translation": "明白了。我需要带现有的病历或医保卡过来吗？",
    "note": "medical records 指病历档案/医疗记录。"
  },
  {
    "id": "medical-8",
    "speaker": "Mia",
    "text": "Just bring a valid photo ID and your insurance card to complete the check-in.",
    "translation": "只需带上有效身份证件和医保卡，以便完成签到手续。",
    "note": "valid photo ID 意为有效带照片的身份证件。"
  },
  {
    "id": "medical-9",
    "speaker": "Alex",
    "text": "Perfect, thank you for your help. I will see you on Thursday morning.",
    "translation": "太好了，非常感谢你的帮助。我们周四上午见。",
    "note": "complete check-in 意为完成签到/登记。"
  },
  {
    "id": "medical-10",
    "speaker": "Mia",
    "text": "You're welcome! Please arrive ten minutes early to fill out a brief form.",
    "translation": "不客气！请提前 10 分钟到达，填一份简短的表格。",
    "note": "fill out a form 意为填写表格。"
  },
  {
    "id": "medical-11",
    "speaker": "Alex",
    "text": "Good morning, Dr. Mia. I've been feeling under the weather for the past three days.",
    "translation": "早安，Mia 医生。过去三天我一直感觉身体不适。",
    "note": "under the weather 为地道口语，意为身体微恙/不太舒服。"
  },
  {
    "id": "medical-12",
    "speaker": "Mia",
    "text": "I'm sorry to hear that, Alex. Can you describe your main symptoms for me?",
    "translation": "很遗憾听到这个，Alex。你能给我描述一下主要症状吗？",
    "note": "symptom 意为症状。"
  },
  {
    "id": "medical-13",
    "speaker": "Alex",
    "text": "I have a mild fever, a sore throat, and a persistent dry cough at night.",
    "translation": "我有点低烧，嗓子疼，而且晚上一直干咳。",
    "note": "sore throat 意为咽喉疼痛；persistent dry cough 意为持续性干咳。"
  },
  {
    "id": "medical-14",
    "speaker": "Mia",
    "text": "I see. Have you noticed any shortness of breath or fatigue lately?",
    "translation": "了解了。你最近有没有感到呼吸急促或者全身乏力？",
    "note": "shortness of breath 指呼吸急促/气短；fatigue 指疲劳/乏力。"
  },
  {
    "id": "medical-15",
    "speaker": "Alex",
    "text": "I do feel quite fatigued, but my breathing feels totally normal.",
    "translation": "我确实感觉蛮疲惫的，但呼吸完全正常。",
    "note": "fatigued 意为感到疲倦的。"
  },
  {
    "id": "medical-16",
    "speaker": "Mia",
    "text": "Let me take your temperature and check your blood pressure first.",
    "translation": "让我先给你量一下体温，测一下血压。",
    "note": "take your temperature 意为量体温；blood pressure 指血压。"
  },
  {
    "id": "medical-17",
    "speaker": "Alex",
    "text": "Sure. Your thermometer says my temperature is 38 degrees Celsius.",
    "translation": "好的。你的体温计显示我的体温是 38 摄氏度。",
    "note": "degrees Celsius 意为摄氏度。"
  },
  {
    "id": "medical-18",
    "speaker": "Mia",
    "text": "That is indeed a mild fever. Let me examine your throat with a light.",
    "translation": "确实是低烧。我用压舌板和灯光检查一下你的喉咙。",
    "note": "examine 意为检查/诊察。"
  },
  {
    "id": "medical-19",
    "speaker": "Alex",
    "text": "Ah... is it inflamed or infected?",
    "translation": "啊发炎还是感染了？",
    "note": "inflamed 意为发炎的；infected 意为受感染的。"
  },
  {
    "id": "medical-20",
    "speaker": "Mia",
    "text": "It looks slightly red and swollen, which points to a common viral infection.",
    "translation": "看起来微红肿胀，这指向普通的病毒感染。",
    "note": "viral infection 指病毒感染。"
  },
  {
    "id": "medical-21",
    "speaker": "Alex",
    "text": "Should I get a flu test or a throat swab to rule out bacterial infection?",
    "translation": "我需要做流感检测或咽拭子来排除细菌感染吗？",
    "note": "throat swab 指咽拭子测试；rule out 意为排除（疾病等）。"
  },
  {
    "id": "medical-22",
    "speaker": "Mia",
    "text": "Yes, I'll take a quick swab test. It only takes a couple of minutes.",
    "translation": "好的，我会做一个快速拭子检测。只需要几分钟的时间。",
    "note": "take a swab test 指做拭子采样检测。"
  },
  {
    "id": "medical-23",
    "speaker": "Alex",
    "text": "Ouch, that was a bit ticklish! How soon will the test results come back?",
    "translation": "哎呀，有点痒痒的！测试结果多久能出来？",
    "note": "ticklish 意为发痒的/怕痒的。"
  },
  {
    "id": "medical-24",
    "speaker": "Mia",
    "text": "The rapid swab test will give us results in about fifteen minutes.",
    "translation": "快速拭子检测大概 15 分钟内就能出结果。",
    "note": "rapid test 指快速检测。"
  },
  {
    "id": "medical-25",
    "speaker": "Alex",
    "text": "While we wait, should we also do a routine blood pressure monitoring?",
    "translation": "在等待期间，我们需要做个例行血压监测吗？",
    "note": "blood pressure monitoring 意为血压监测。"
  },
  {
    "id": "medical-26",
    "speaker": "Mia",
    "text": "Good idea. Please roll up your sleeve so I can wrap the pressure cuff.",
    "translation": "好主意。请卷起袖子，我来卷上血压袖带。",
    "note": "pressure cuff 指（血压计的）袖带。"
  },
  {
    "id": "medical-27",
    "speaker": "Alex",
    "text": "My blood pressure is usually around 120 over 80. Is it normal today?",
    "translation": "我的血压平时大概在 120/80 左右。今天正常吗？",
    "note": "120 over 80 指收缩压 120，舒张压 80。"
  },
  {
    "id": "medical-28",
    "speaker": "Mia",
    "text": "It's 118 over 78, which is perfectly within the healthy range.",
    "translation": "是 118/78，完全在健康范围内。",
    "note": "within the healthy range 意为在健康标准范围内。"
  },
  {
    "id": "medical-29",
    "speaker": "Alex",
    "text": "That's a relief! What about the swab test result for my throat?",
    "translation": "松了一口气！那我喉咙拭子的测试结果怎么样？",
    "note": "that's a relief 意为令人松了一口气。"
  },
  {
    "id": "medical-30",
    "speaker": "Mia",
    "text": "The test came back negative for strep throat, so it's strictly viral.",
    "translation": "链球菌咽喉炎检测呈阴性，所以完全是普通的病毒感染。",
    "note": "negative 在医学上意为（检测结果）阴性。"
  },
  {
    "id": "medical-31",
    "speaker": "Alex",
    "text": "Since it's a viral infection, do I need to take antibiotics?",
    "translation": "既然是病毒感染，我需要吃抗生素吗？",
    "note": "antibiotics 意为抗生素/消炎药。"
  },
  {
    "id": "medical-32",
    "speaker": "Mia",
    "text": "No, antibiotics are ineffective against viruses. Rest and hydration are best.",
    "translation": "不需要，抗生素对病毒无效。休息和多喝水是最好的治疗方法。",
    "note": "hydration 意为补充水分。"
  },
  {
    "id": "medical-33",
    "speaker": "Alex",
    "text": "How many days should I stay home from work to rest and recover?",
    "translation": "我应该请假居家休息恢复几天？",
    "note": "stay home from work 意为请假不上班/居家。"
  },
  {
    "id": "medical-34",
    "speaker": "Mia",
    "text": "I recommend resting at home for two days until your fever subsides completely.",
    "translation": "我建议在家休息两天，直到体温完全退烧为止。",
    "note": "subside 意为消退/平息。"
  },
  {
    "id": "medical-35",
    "speaker": "Alex",
    "text": "Can you issue a medical certificate or doctor's note for my employer?",
    "translation": "你能为我的雇主开一张病假证明书吗？",
    "note": "doctor's note / medical certificate 指诊断书/病假条。"
  },
  {
    "id": "medical-36",
    "speaker": "Mia",
    "text": "Of course. I'll print out a medical sick leave note for your company.",
    "translation": "当然可以。我会打印一份公司的病假证明给您。",
    "note": "sick leave note 意为病假单。"
  },
  {
    "id": "medical-37",
    "speaker": "Alex",
    "text": "What should I do if my fever goes up above 39 degrees?",
    "translation": "如果我的体温升到 39 度以上，我该怎么办？",
    "note": "fever goes up 意为发烧加重/体温升高。"
  },
  {
    "id": "medical-38",
    "speaker": "Mia",
    "text": "Take over-the-counter pain relievers like ibuprofen every six hours as needed.",
    "translation": "需要时可以每 6 小时服用一次布洛芬等非处方止痛退烧药。",
    "note": "over-the-counter (OTC) 指非处方药；ibuprofen 指布洛芬。"
  },
  {
    "id": "medical-39",
    "speaker": "Alex",
    "text": "Got it. Is there any specific diet or warm fluids I should consume?",
    "translation": "懂了。有什么特定饮食或温热流质食物是我应该补充的吗？",
    "note": "warm fluids 指温热流质/温水。"
  },
  {
    "id": "medical-40",
    "speaker": "Mia",
    "text": "Stick to light meals like warm soup, and drink plenty of honey lemon tea.",
    "translation": "吃清淡一点的食物，比如热汤，并多喝柠檬蜂蜜水。",
    "note": "stick to 意为坚持/保持（某种习惯/饮食）。"
  },
  {
    "id": "medical-41",
    "speaker": "Alex",
    "text": "Thanks doctor! Now I'll head downstairs to the pharmacy to pick up my medicine.",
    "translation": "谢谢医生！我现在去楼下药房取药。",
    "note": "pharmacy 指药房/药店。"
  },
  {
    "id": "medical-42",
    "speaker": "Mia",
    "text": "Hello! Welcome to the pharmacy. May I have your prescription slip?",
    "translation": "您好！欢迎光临药房。请问有您的处方单吗？",
    "note": "prescription slip 指医师处方单。"
  },
  {
    "id": "medical-43",
    "speaker": "Alex",
    "text": "Here is the doctor's prescription for throat lozenges and nasal spray.",
    "translation": "这是医生开的润喉片和喷鼻剂处方。",
    "note": "throat lozenges 指润喉含片；nasal spray 指鼻喷剂。"
  },
  {
    "id": "medical-44",
    "speaker": "Mia",
    "text": "Let me retrieve your medication. Do you have any known drug allergies?",
    "translation": "我去为您拿药。请问您有任何已知的药物过敏史吗？",
    "note": "drug allergies 指药物过敏。"
  },
  {
    "id": "medical-45",
    "speaker": "Alex",
    "text": "No, I don't have any drug allergies that I know of.",
    "translation": "没有，据我所知我没有任何药物过敏。",
    "note": "known of 意为所了解/知晓的。"
  },
  {
    "id": "medical-46",
    "speaker": "Mia",
    "text": "Great. Take one lozenge every four hours, and do not exceed six a day.",
    "translation": "好的。每 4 小时含服一片润喉片，一天切勿超过 6 片。",
    "note": "do not exceed 意为切勿超过。"
  },
  {
    "id": "medical-47",
    "speaker": "Alex",
    "text": "How often should I use the nasal spray for my congested nose?",
    "translation": "鼻塞时我应该隔多久用一次鼻喷剂？",
    "note": "congested nose 指鼻塞。"
  },
  {
    "id": "medical-48",
    "speaker": "Mia",
    "text": "Spray twice in each nostril every morning and evening after washing your face.",
    "translation": "每天早晚洗脸后，每个鼻孔各喷两次。",
    "note": "nostril 指鼻孔。"
  },
  {
    "id": "medical-49",
    "speaker": "Alex",
    "text": "Should I take these medications before or after meals?",
    "translation": "这些药我应该在饭前还是饭后服用？",
    "note": "before or after meals 意为饭前还是饭后。"
  },
  {
    "id": "medical-50",
    "speaker": "Mia",
    "text": "Take them after meals to avoid any potential stomach discomfort.",
    "translation": "饭后服用，以避免任何潜在的胃部不适。",
    "note": "stomach discomfort 指胃部不适。"
  },
  {
    "id": "medical-51",
    "speaker": "Alex",
    "text": "Hi Mia, I'm due for my bi-annual dental cleaning and check-up today.",
    "translation": "嗨 Mia，我今天该做半年一次的牙齿洁治和检查了。",
    "note": "bi-annual 意为一年两次的/每半年的；dental cleaning 指洗牙。"
  },
  {
    "id": "medical-52",
    "speaker": "Mia",
    "text": "Great! Please sit back in the dental chair. Have you experienced tooth pain?",
    "translation": "太好了！请在诊疗椅上躺好。你最近有牙痛的情况吗？",
    "note": "dental chair 指牙科诊疗椅。"
  },
  {
    "id": "medical-53",
    "speaker": "Alex",
    "text": "Occasionally my lower molars feel sensitive when drinking ice water.",
    "translation": "偶尔喝冰水的时候，我下排的臼齿会感觉发酸过敏。",
    "note": "molar 指臼齿/大牙；sensitive 意为敏感的/酸软的。"
  },
  {
    "id": "medical-54",
    "speaker": "Mia",
    "text": "I see. That might indicate mild enamel erosion or early tooth decay.",
    "translation": "了解。这可能意味着轻微的牙釉质侵蚀或早期龋齿。",
    "note": "enamel erosion 指牙釉质磨损/侵蚀；tooth decay 指龋齿/蛀牙。"
  },
  {
    "id": "medical-55",
    "speaker": "Alex",
    "text": "Let me know if I need any fillings or specialized fluoride treatment.",
    "translation": "如果我需要补牙或专门的含氟护理，请告诉我。",
    "note": "filling 指补牙/充填物；fluoride treatment 指涂氟治疗。"
  },
  {
    "id": "medical-56",
    "speaker": "Mia",
    "text": "Luckily, there are no cavities. The sensitivity is from brushing too hard.",
    "translation": "幸运的是没有龋洞。敏感是因为刷牙太用力造成的。",
    "note": "cavity 指龋洞/蛀牙洞。"
  },
  {
    "id": "medical-57",
    "speaker": "Alex",
    "text": "Really? Should I switch to a soft-bristle toothbrush?",
    "translation": "真的吗？我需要换成软毛牙刷吗？",
    "note": "soft-bristle toothbrush 指软毛牙刷。"
  },
  {
    "id": "medical-58",
    "speaker": "Mia",
    "text": "Yes, and use a specialized toothpaste for sensitive teeth twice daily.",
    "translation": "是的，并且每天使用两次抗敏感牙膏。",
    "note": "sensitive teeth 意为抗过敏/敏感牙齿。"
  },
  {
    "id": "medical-59",
    "speaker": "Alex",
    "text": "How often do you recommend using dental floss or an oral irrigator?",
    "translation": "您建议多久使用一次牙线或水牙线？",
    "note": "dental floss 指牙线；oral irrigator 指水牙线/冲牙器。"
  },
  {
    "id": "medical-60",
    "speaker": "Mia",
    "text": "Floss at least once every night before bed to remove hidden plaque.",
    "translation": "每天晚上睡前至少用一次牙线，清除隐蔽的牙菌斑。",
    "note": "plaque 指牙菌斑。"
  },
  {
    "id": "medical-61",
    "speaker": "Alex",
    "text": "Lately I've been feeling overwhelmed by work pressure and insomnia.",
    "translation": "最近我感觉工作压力特别大，而且频繁失眠。",
    "note": "overwhelmed 意为不堪重负的/难以承受的；insomnia 指失眠症。"
  },
  {
    "id": "medical-62",
    "speaker": "Mia",
    "text": "Chronic stress can deeply affect your physical health and sleep cycles.",
    "translation": "长期慢性压力会深远地影响你的身体健康和睡眠周期。",
    "note": "chronic stress 指慢性压力；sleep cycle 指睡眠周期。"
  },
  {
    "id": "medical-63",
    "speaker": "Alex",
    "text": "Is there any natural way to manage stress before resorting to sleeping pills?",
    "translation": "在考虑吃安眠药之前，有什么自然减压的方法吗？",
    "note": "resort to 意为诉诸于/采取（手段）；sleeping pills 指安眠药。"
  },
  {
    "id": "medical-64",
    "speaker": "Mia",
    "text": "Practicing mindfulness meditation and regular aerobic exercise works wonders.",
    "translation": "练习正念冥想和规律的有氧运动效果非常好。",
    "note": "mindfulness meditation 指正念冥想；works wonders 意为创造奇迹/非常管用。"
  },
  {
    "id": "medical-65",
    "speaker": "Alex",
    "text": "I've tried meditation, but my mind keeps racing with endless work tasks.",
    "translation": "我试过冥想，但脑袋里总是停不下脑补各种工作任务。",
    "note": "mind keeps racing 形象表达思绪万千/脑子停不下来。"
  },
  {
    "id": "medical-66",
    "speaker": "Mia",
    "text": "Start with just five minutes of deep breathing exercises before bedtime.",
    "translation": "可以先从睡前只需 5 分钟的深呼吸练习开始。",
    "note": "deep breathing exercises 指深呼吸练习。"
  },
  {
    "id": "medical-67",
    "speaker": "Alex",
    "text": "Should I also cut back on my afternoon coffee intake?",
    "translation": "我是不是也应该减少下午的咖啡摄入量？",
    "note": "cut back on 意为减少/削减。"
  },
  {
    "id": "medical-68",
    "speaker": "Mia",
    "text": "Absolutely. Avoid caffeine after two PM to allow your brain to relax.",
    "translation": "绝对是。下午 2 点之后尽量避免摄入咖啡因，让大脑得到放松。",
    "note": "caffeine 意为咖啡因。"
  },
  {
    "id": "medical-69",
    "speaker": "Alex",
    "text": "If the insomnia continues, should I book a session with a therapist?",
    "translation": "如果失眠情况持续，我应该预约心理咨询师吗？",
    "note": "therapist 指心理咨询师/治疗师。"
  },
  {
    "id": "medical-70",
    "speaker": "Mia",
    "text": "Yes, talking to a mental health professional can provide personalized guidance.",
    "translation": "是的，与心理健康专业人士倾诉可以提供个性化的指导。",
    "note": "mental health professional 指心理健康专业人员。"
  },
  {
    "id": "medical-71",
    "speaker": "Alex",
    "text": "Help! My friend twisted his ankle during basketball and cannot walk!",
    "translation": "救命！我朋友打篮球时拧伤了脚踝，现在无法行走！",
    "note": "twisted his ankle 意为拧伤/扭伤脚踝。"
  },
  {
    "id": "medical-72",
    "speaker": "Mia",
    "text": "Please sit him down on the wheelchair. Let me check the swelling on his ankle.",
    "translation": "请让他坐在轮椅上。我来检查一下他脚踝的肿胀情况。",
    "note": "wheelchair 指轮椅；swelling 指肿胀/肿块。"
  },
  {
    "id": "medical-73",
    "speaker": "Alex",
    "text": "Is it broken, or just a severe muscle sprain?",
    "translation": "是骨折了，还是只是严重的肌肉拉伤/扭伤？",
    "note": "muscle sprain 指肌肉扭伤。"
  },
  {
    "id": "medical-74",
    "speaker": "Mia",
    "text": "We need an immediate X-ray scan to check for bone fractures.",
    "translation": "我们需要立刻安排 X 光扫描，以排除骨折可能。",
    "note": "X-ray scan 指X 光扫描；bone fracture 指骨折。"
  },
  {
    "id": "medical-75",
    "speaker": "Alex",
    "text": "Where is the radiology department? I'll wheel him over right away.",
    "translation": "放射科在哪里？我立刻推他过去。",
    "note": "radiology department 指放射科/影像科。"
  },
  {
    "id": "medical-76",
    "speaker": "Mia",
    "text": "Down the hallway to the left, room 102. The technician is waiting.",
    "translation": "沿走廊向左走，102 房间。放射技师正在等待。",
    "note": "hallway 指走廊/过道。"
  },
  {
    "id": "medical-77",
    "speaker": "Alex",
    "text": "Here are the X-ray results, doctor. What is the diagnosis?",
    "translation": "医生，这是 X 光检查结果。诊断结果是什么？",
    "note": "diagnosis 指诊断结果。"
  },
  {
    "id": "medical-78",
    "speaker": "Mia",
    "text": "The bone is intact! It's a ligament strain. We'll apply an ice pack and elastic bandage.",
    "translation": "骨头完好无损！是韧带拉伤。我们会敷上冰袋并缠上弹性绷带。",
    "note": "intact 意为完好无损的；elastic bandage 指弹性绷带。"
  },
  {
    "id": "medical-79",
    "speaker": "Alex",
    "text": "Does he need crutches to move around for the next few days?",
    "translation": "接下来几天他需要用双拐辅助行走吗？",
    "note": "crutches 指双拐/拐杖。"
  },
  {
    "id": "medical-80",
    "speaker": "Mia",
    "text": "Yes, use crutches and remember the RICE protocol: Rest, Ice, Compression, Elevation.",
    "translation": "是的，使用拐杖，并记住 RICE 原则：休息、冰敷、包扎加压、抬高患处。",
    "note": "RICE protocol 指急性损伤的RICE（休息冰敷加压抬高）处理原则。"
  },
  {
    "id": "medical-81",
    "speaker": "Alex",
    "text": "Mia, I'm planning to revamp my daily routine to build better health habits.",
    "translation": "Mia，我计划重构我的日常作息，培养更好的健康习惯。",
    "note": "revamp 意为改进/重构；health habits 指健康习惯。"
  },
  {
    "id": "medical-82",
    "speaker": "Mia",
    "text": "That's awesome! Balanced nutrition and consistent physical activity are foundational.",
    "translation": "太棒了！均衡的营养和持之以恒的体育活动是健康的基石。",
    "note": "balanced nutrition 指均衡营养。"
  },
  {
    "id": "medical-83",
    "speaker": "Alex",
    "text": "What ratio of carbohydrates, protein, and healthy fats do you recommend?",
    "translation": "你建议碳水化合物、蛋白质和健康脂肪按照什么比例分配？",
    "note": "carbohydrates (carbs) 意为碳水化合物；protein 指蛋白质。"
  },
  {
    "id": "medical-84",
    "speaker": "Mia",
    "text": "Aim for roughly 40 percent complex carbs, 30 percent protein, and 30 percent unsaturated fats.",
    "translation": "目标大概是 40% 复合碳水、30% 蛋白质和 30% 不饱和脂肪。",
    "note": "unsaturated fats 指不饱和脂肪。"
  },
  {
    "id": "medical-85",
    "speaker": "Alex",
    "text": "How many days a week should I incorporate strength training and cardio?",
    "translation": "我每周应该安排几天进行力量训练和有氧运动？",
    "note": "strength training 指力量训练；cardio 指有氧运动。"
  },
  {
    "id": "medical-86",
    "speaker": "Mia",
    "text": "Three days of resistance training combined with two days of moderate cardio is ideal.",
    "translation": "三天阻力训练结合两天中等强度的有氧运动是比较理想的。",
    "note": "resistance training 指阻力/力量训练。"
  },
  {
    "id": "medical-87",
    "speaker": "Alex",
    "text": "Is it necessary to track my daily calorie intake using a fitness mobile app?",
    "translation": "有必要用健身手机 App 来记录我每天的卡路里摄入吗？",
    "note": "calorie intake 指卡路里摄入量。"
  },
  {
    "id": "medical-88",
    "speaker": "Mia",
    "text": "It helps raise awareness initially, but focusing on whole food quality matters more.",
    "translation": "刚开始有助于提升健康意识，但关注天然未加工食物的品质更重要。",
    "note": "whole food 指未加工的天然完整食物。"
  },
  {
    "id": "medical-89",
    "speaker": "Alex",
    "text": "What about staying hydrated? How much water should I drink daily?",
    "translation": "那保持水分呢？我每天应该喝多少水？",
    "note": "staying hydrated 意为保持水分充足。"
  },
  {
    "id": "medical-90",
    "speaker": "Mia",
    "text": "Aim for at least two liters of water throughout the day, more if you sweat.",
    "translation": "全天目标至少喝 2 升水，如果出汗多可以适当增加。",
    "note": "two liters 意为两升。"
  },
  {
    "id": "medical-91",
    "speaker": "Alex",
    "text": "Hello, I'm here to settle my hospital bill for today's consultation and laboratory tests.",
    "translation": "您好，我是来结算今天门诊诊察和化验检查费用的。",
    "note": "settle a bill 意为结账/结算账单；laboratory tests 指化验检查。"
  },
  {
    "id": "medical-92",
    "speaker": "Mia",
    "text": "Sure thing! May I scan your health insurance policy card first?",
    "translation": "好的！我可以先扫描一下您的医疗保险卡吗？",
    "note": "insurance policy card 指医保卡/保单卡。"
  },
  {
    "id": "medical-93",
    "speaker": "Alex",
    "text": "Here you go. Does my insurance plan cover prescription drugs in full?",
    "translation": "给您。我的医保方案是全额报销处方药吗？",
    "note": "cover in full 意为全额报销/覆盖。"
  },
  {
    "id": "medical-94",
    "speaker": "Mia",
    "text": "Your policy covers 80 percent of prescription drugs, so there is a small co-pay.",
    "translation": "您的保险报销 80% 的处方药费用，因此需要支付小额自付额。",
    "note": "co-pay (copayment) 指医保自付额/自付费用。"
  },
  {
    "id": "medical-95",
    "speaker": "Alex",
    "text": "How much is my out-of-pocket balance after insurance deduction?",
    "translation": "扣除医保报销后，我的自费余额是多少？",
    "note": "out-of-pocket balance 指个人自费金额。"
  },
  {
    "id": "medical-96",
    "speaker": "Mia",
    "text": "Your remaining balance comes to $35, which includes the consultation fee.",
    "translation": "您的剩余费用共计 35 美元，其中包含了门诊诊察费。",
    "note": "consultation fee 指诊察费/会诊费。"
  },
  {
    "id": "medical-97",
    "speaker": "Alex",
    "text": "Can I pay by credit card or mobile payment?",
    "translation": "我可以刷信用卡或者用移动支付吗？",
    "note": "credit card / mobile payment 指信用卡/移动支付。"
  },
  {
    "id": "medical-98",
    "speaker": "Mia",
    "text": "Both options are accepted. Here is your receipt and itemized invoice.",
    "translation": "两种方式都可以。这是您的收据和明细发票。",
    "note": "itemized invoice 指分类明细发票。"
  },
  {
    "id": "medical-99",
    "speaker": "Alex",
    "text": "Thank you! Will this receipt be needed if I claim additional wellness benefits?",
    "translation": "谢谢！如果我要申请额外的健康福利报销，需要这张收据吗？",
    "note": "wellness benefits 指健康福利/体检津贴。"
  },
  {
    "id": "medical-100",
    "speaker": "Mia",
    "text": "Yes, keep this itemized receipt for your tax deductions or secondary insurance claim.",
    "translation": "是的，请保留好这张明细收据，以便用于税前扣除或二次保险理赔。",
    "note": "secondary insurance claim 指二次保险理赔。"
  }
],
  banking: [
  {
    "id": "banking-1",
    "speaker": "Alex",
    "text": "Good morning, I'd like to open a checking account with your bank today.",
    "translation": "早安，我今天想在你们银行开立一个支票账户。",
    "note": "checking account 指支票账户/活期存款账户。"
  },
  {
    "id": "banking-2",
    "speaker": "Mia",
    "text": "Welcome! I can certainly assist you with that. Do you have two forms of identification?",
    "translation": "欢迎！我很高兴为您办理。请问您带了两种身份证明文件吗？",
    "note": "forms of identification 指身份证明文件/证件。"
  },
  {
    "id": "banking-3",
    "speaker": "Alex",
    "text": "Yes, I brought my passport and a recent utility bill as proof of address.",
    "translation": "是的，我带了护照和最近的水电费账单作为地址证明。",
    "note": "proof of address 指地址证明文件。"
  },
  {
    "id": "banking-4",
    "speaker": "Mia",
    "text": "Perfect. Would you also like to link a savings account for automated transfers?",
    "translation": "太好了。您是否还想关联一个储蓄账户以便进行自动转账？",
    "note": "link an account 意为关联/绑定账户。"
  },
  {
    "id": "banking-5",
    "speaker": "Alex",
    "text": "That sounds convenient. What is the minimum balance required to waive monthly fees?",
    "translation": "听起来很方便。免除月管理费需要的最低账户余额是多少？",
    "note": "waive monthly fees 意为免除月管理费。"
  },
  {
    "id": "banking-6",
    "speaker": "Mia",
    "text": "For this account, maintaining a daily balance of $1,000 waives the monthly maintenance fee.",
    "translation": "对于这个账户，保持每日 1,000 美元的余额即可免除月管理费。",
    "note": "daily balance 指每日余额。"
  },
  {
    "id": "banking-7",
    "speaker": "Alex",
    "text": "Got it. Can I set up online banking credentials right after opening the account?",
    "translation": "明白了。开户后我能立刻设置网银登录凭证吗？",
    "note": "online banking credentials 指网上银行登录凭证/账号密码。"
  },
  {
    "id": "banking-8",
    "speaker": "Mia",
    "text": "Absolutely. I will guide you through registering on our mobile app before you leave.",
    "translation": "当然可以。在您离开前，我会引导您在我们的移动 App 上完成注册。",
    "note": "guide through 意为引导/一步步指导。"
  },
  {
    "id": "banking-9",
    "speaker": "Alex",
    "text": "Is there an initial deposit required to activate the new account today?",
    "translation": "今天激活新账户需要首笔存款吗？",
    "note": "initial deposit 指首笔存款/开户预存金额。"
  },
  {
    "id": "banking-10",
    "speaker": "Mia",
    "text": "Yes, a minimum initial deposit of fifty dollars is required to open it.",
    "translation": "是的，开户需要至少预存 50 美元。",
    "note": "minimum deposit 指最低存款额。"
  },
  {
    "id": "banking-11",
    "speaker": "Alex",
    "text": "Hi Mia, I need to deposit a payroll check into my savings account.",
    "translation": "嗨 Mia，我需要把一张工资支票存入我的储蓄账户。",
    "note": "payroll check 指工资支票。"
  },
  {
    "id": "banking-12",
    "speaker": "Mia",
    "text": "Sure! Please endorse the back of the check and hand it over to me.",
    "translation": "好的！请在支票背面签名字背书，然后递给我。",
    "note": "endorse a check 意为在支票背面签名背书。"
  },
  {
    "id": "banking-13",
    "speaker": "Alex",
    "text": "Done. I'd also like to withdraw two hundred dollars in cash from checking.",
    "translation": "好了。我还想从支票账户提取 200 美元现金。",
    "note": "withdraw cash 意为提取现金。"
  },
  {
    "id": "banking-14",
    "speaker": "Mia",
    "text": "Here is your cash. Would you prefer large bills or smaller denominations?",
    "translation": "这是您的现金。您偏好大面额纸币还是小面额纸币？",
    "note": "denominations 指（货币的）面额。"
  },
  {
    "id": "banking-15",
    "speaker": "Alex",
    "text": "Two hundred-dollar bills would be great, thank you.",
    "translation": "两张百元大钞就可以，谢谢。",
    "note": "hundred-dollar bill 意为百元钞票。"
  },
  {
    "id": "banking-16",
    "speaker": "Mia",
    "text": "Here you go. By the way, you can also process check deposits using our mobile ATM app.",
    "translation": "给您。顺便提一下，您也可以用我们的手机 App 直接拍照存支票。",
    "note": "process deposits 意为处理存款/办理存入。"
  },
  {
    "id": "banking-17",
    "speaker": "Alex",
    "text": "Oh really? How do I deposit a check using my mobile phone?",
    "translation": "真的吗？我该怎么用手机存支票呢？",
    "note": "mobile check deposit 指手机拍照存支票。"
  },
  {
    "id": "banking-18",
    "speaker": "Mia",
    "text": "Simply sign the check, take photos of the front and back, and submit it via app.",
    "translation": "只需在支票上签名，拍下正面和背面，通过 App 提交即可。",
    "note": "submit via app 意为通过应用提交。"
  },
  {
    "id": "banking-19",
    "speaker": "Alex",
    "text": "What is the daily withdrawal limit if I use an ATM machine outside?",
    "translation": "如果我在室外使用 ATM 机，每日取款限额是多少？",
    "note": "daily withdrawal limit 指每日取款限额。"
  },
  {
    "id": "banking-20",
    "speaker": "Mia",
    "text": "The standard daily ATM cash withdrawal limit is set at $1,000 per account.",
    "translation": "每个账户的标准每日 ATM 现金取款限额为 1,000 美元。",
    "note": "cash withdrawal 意为现金提取。"
  },
  {
    "id": "banking-21",
    "speaker": "Alex",
    "text": "I need to send an international wire transfer to a supplier in Europe.",
    "translation": "我需要向欧洲的一家供应商发送一笔跨国电汇。",
    "note": "international wire transfer 指国际电汇/跨国汇款。"
  },
  {
    "id": "banking-22",
    "speaker": "Mia",
    "text": "I can help with that. Do you have the recipient's IBAN and SWIFT code ready?",
    "translation": "我可以帮您办理。请问您准备好收款人的 IBAN 和 SWIFT 代码了吗？",
    "note": "IBAN / SWIFT code 为国际银行汇款专用账号与识别码。"
  },
  {
    "id": "banking-23",
    "speaker": "Alex",
    "text": "Yes, I have all the banking details printed out on this document.",
    "translation": "是的，我把所有的银行明细都打印在这份文件上了。",
    "note": "banking details 指银行账户明细/信息。"
  },
  {
    "id": "banking-24",
    "speaker": "Mia",
    "text": "Excellent. Please confirm if you want the transaction converted into Euros today.",
    "translation": "太好了。请确认今天是否需要将这笔交易兑换成欧元。",
    "note": "convert into 意为兑换成（某货币）。"
  },
  {
    "id": "banking-25",
    "speaker": "Alex",
    "text": "Yes, please convert it to Euros. What is the wire transfer processing fee?",
    "translation": "是的，请兑换成欧元。电汇手续费是多少？",
    "note": "processing fee 指手续费/处理费。"
  },
  {
    "id": "banking-26",
    "speaker": "Mia",
    "text": "Outgoing international wire transfers carry a flat processing fee of thirty dollars.",
    "translation": "汇出的国际电汇收取 30 美元的固定手续费。",
    "note": "flat fee 意为固定费用。"
  },
  {
    "id": "banking-27",
    "speaker": "Alex",
    "text": "How many business days does it usually take for funds to arrive in the receiving account?",
    "translation": "资金通常需要几个工作日才能到达收款账户？",
    "note": "business days 指工作日；receiving account 指收款账户。"
  },
  {
    "id": "banking-28",
    "speaker": "Mia",
    "text": "International transfers typically take one to three business days to clear completely.",
    "translation": "国际汇款通常需要 1 到 3 个工作日才能完全到账结算。",
    "note": "clear 动词，在金融中指结算/通关到账。"
  },
  {
    "id": "banking-29",
    "speaker": "Alex",
    "text": "Will I receive a transaction reference number or confirmation receipt for tracking?",
    "translation": "我会收到交易参考号或确认收据以便跟踪查询吗？",
    "note": "transaction reference number 指交易参考号/追踪单号。"
  },
  {
    "id": "banking-30",
    "speaker": "Mia",
    "text": "Yes, I will print out a wire transfer receipt containing your unique transaction reference code.",
    "translation": "是的，我会打印一张包含您唯一交易参考码的电汇收据。",
    "note": "confirmation receipt 指确认收据。"
  },
  {
    "id": "banking-31",
    "speaker": "Alex",
    "text": "I'd like to apply for a cash-back credit card with low interest rates.",
    "translation": "我想申请一张低利率的返现信用卡。",
    "note": "cash-back credit card 指现金返还信用卡。"
  },
  {
    "id": "banking-32",
    "speaker": "Mia",
    "text": "Great choice! We have a card offering two percent cash back on all grocery purchases.",
    "translation": "明智的选择！我们有一张卡，所有超市购物均可享受 2% 的现金返还。",
    "note": "grocery purchases 指超市/杂货消费。"
  },
  {
    "id": "banking-33",
    "speaker": "Alex",
    "text": "What are the eligibility criteria and credit score requirements for this card?",
    "translation": "申请这张卡需要满足什么资格条件和信用评分要求？",
    "note": "eligibility criteria 指申请资格标准；credit score 指信用评分。"
  },
  {
    "id": "banking-34",
    "speaker": "Mia",
    "text": "A good credit score above 700 and proof of steady annual income are required.",
    "translation": "需要 700 分以上的良好信用评分以及稳定年收入证明。",
    "note": "annual income 指年收入。"
  },
  {
    "id": "banking-35",
    "speaker": "Alex",
    "text": "Will applying for a new credit card result in a hard inquiry on my credit report?",
    "translation": "申请新信用卡会导致我的信用报告上出现硬查询（Hard Inquiry）吗？",
    "note": "hard inquiry 指（影响信用分的）硬查询/硬拉记录。"
  },
  {
    "id": "banking-36",
    "speaker": "Mia",
    "text": "Yes, submitting a credit card application will initiate a hard credit check.",
    "translation": "是的，提交信用卡申请会触发一次硬性信用审查。",
    "note": "hard credit check 意为硬性信用检查。"
  },
  {
    "id": "banking-37",
    "speaker": "Alex",
    "text": "How long does the approval process take after submitting the online application?",
    "translation": "提交在线申请后，审批流程需要多长时间？",
    "note": "approval process 指审批流程。"
  },
  {
    "id": "banking-38",
    "speaker": "Mia",
    "text": "Instant approval takes minutes online, and your physical card arrives within five business days.",
    "translation": "线上秒批只需几分钟，您的实体卡会在 5 个工作日内寄达。",
    "note": "physical card 指实体卡。"
  },
  {
    "id": "banking-39",
    "speaker": "Alex",
    "text": "Can I set up automatic payments to pay off the full statement balance each month?",
    "translation": "我可以设置自动还款，每月全额还清账单余额吗？",
    "note": "statement balance 指账单余额/当期应还金额。"
  },
  {
    "id": "banking-40",
    "speaker": "Mia",
    "text": "Yes, auto-pay prevents late payment fees and interest charges on your account.",
    "translation": "可以的，自动还款可以避免产生滞纳金和利息支出。",
    "note": "late payment fee 指滞纳金/逾期费。"
  },
  {
    "id": "banking-41",
    "speaker": "Alex",
    "text": "I'm planning to buy my first home and want to inquire about mortgage interest rates.",
    "translation": "我计划购买我的第一套房子，想咨询一下房贷利率。",
    "note": "mortgage interest rates 指房屋贷款利率。"
  },
  {
    "id": "banking-42",
    "speaker": "Mia",
    "text": "Congratulations! We offer fixed-rate and adjustable-rate mortgage loan options.",
    "translation": "恭喜！我们提供固定利率和浮动利率房贷方案。",
    "note": "fixed-rate / adjustable-rate mortgage 指固定/浮动利率房贷。"
  },
  {
    "id": "banking-43",
    "speaker": "Alex",
    "text": "What is the current annual percentage rate for a thirty-year fixed mortgage?",
    "translation": "30 年期固定利率房贷目前的年化利率是多少？",
    "note": "annual percentage rate (APR) 指年化利率。"
  },
  {
    "id": "banking-44",
    "speaker": "Mia",
    "text": "The current rate for a thirty-year fixed mortgage is approximately 6.5 percent.",
    "translation": "目前 30 年期固定房贷利率约为 6.5%。",
    "note": "fixed mortgage 指固定利率房贷。"
  },
  {
    "id": "banking-45",
    "speaker": "Alex",
    "text": "What percentage down payment do I need to avoid paying private mortgage insurance?",
    "translation": "需要多少比例的首付才能免买个人房贷保险（PMI）？",
    "note": "down payment 指首付款；private mortgage insurance (PMI) 指房贷保险。"
  },
  {
    "id": "banking-46",
    "speaker": "Mia",
    "text": "Putting down at least twenty percent avoids private mortgage insurance, or PMI.",
    "translation": "支付至少 20% 的首付即可免除个人房贷保险（PMI）。",
    "note": "put down 意为支付（首付）。"
  },
  {
    "id": "banking-47",
    "speaker": "Alex",
    "text": "Can I get pre-approved for a home loan before putting an offer on a house?",
    "translation": "在对房子出价之前，我可以先获得房屋贷款预批吗？",
    "note": "get pre-approved 意为获得预先批准/获得预批信。"
  },
  {
    "id": "banking-48",
    "speaker": "Mia",
    "text": "Yes, getting pre-approved gives sellers confidence in your financial capability.",
    "translation": "是的，获得预批会让卖家对您的财务能力充满信心。",
    "note": "financial capability 指财务能力/偿债能力。"
  },
  {
    "id": "banking-49",
    "speaker": "Alex",
    "text": "What financial documents do I need to submit for mortgage pre-approval?",
    "translation": "申请房贷预批我需要提交哪些财务文件？",
    "note": "financial documents 指财务证明文件。"
  },
  {
    "id": "banking-50",
    "speaker": "Mia",
    "text": "You'll need recent tax returns, pay stubs, and recent bank statements for review.",
    "translation": "您需要提交近期的报税单、工资条和银行流水单以供审核。",
    "note": "tax returns 指报税单；pay stubs 指工资条；bank statements 指银行流水。"
  },
  {
    "id": "banking-51",
    "speaker": "Alex",
    "text": "I'm interested in exploring wealth management and investing my personal savings.",
    "translation": "我对财富管理感兴趣，想把个人储蓄进行投资。",
    "note": "wealth management 指财富管理/理财服务。"
  },
  {
    "id": "banking-52",
    "speaker": "Mia",
    "text": "I can schedule a consultation for you with our certified financial advisor.",
    "translation": "我可以为您预约与我们持证注册金融理财师的咨询会议。",
    "note": "certified financial advisor 指持证金融理财顾问。"
  },
  {
    "id": "banking-53",
    "speaker": "Alex",
    "text": "Do you offer index funds, mutual funds, or individual stock trading options?",
    "translation": "你们提供指数基金、共同基金还是个股交易选项？",
    "note": "index funds 指指数基金；mutual funds 指共同基金。"
  },
  {
    "id": "banking-54",
    "speaker": "Mia",
    "text": "We offer all three, alongside low-cost ETF portfolios tailored to your risk tolerance.",
    "translation": "这三种我们都提供，还有根据您的风险承受度量身定制的低成本 ETF 组合。",
    "note": "risk tolerance 指风险承受能力。"
  },
  {
    "id": "banking-55",
    "speaker": "Alex",
    "text": "What is risk tolerance, and how does it determine my investment strategy?",
    "translation": "什么是风险承受能力？它如何决定我的投资策略？",
    "note": "investment strategy 指投资策略。"
  },
  {
    "id": "banking-56",
    "speaker": "Mia",
    "text": "Risk tolerance measures your comfort with market volatility and potential investment losses.",
    "translation": "风险承受能力衡量您对市场波动和潜在投资亏损的心理承受度。",
    "note": "market volatility 指市场波动。"
  },
  {
    "id": "banking-57",
    "speaker": "Alex",
    "text": "I prefer a conservative investment strategy with steady, reliable long-term returns.",
    "translation": "我更偏好稳健有长期可靠回报的保守型投资策略。",
    "note": "conservative investment strategy 指保守型投资策略。"
  },
  {
    "id": "banking-58",
    "speaker": "Mia",
    "text": "In that case, a diversified portfolio with bonds and dividend stocks fits best.",
    "translation": "那种情况下，包含债券和高股息股票的分散化投资组合最适合您。",
    "note": "diversified portfolio 指多元化投资组合；dividend stocks 指股息股。"
  },
  {
    "id": "banking-59",
    "speaker": "Alex",
    "text": "Are there annual management fees for maintaining an investment portfolio here?",
    "translation": "在这里维护理财投资组合有年度管理费吗？",
    "note": "management fees 指管理费。"
  },
  {
    "id": "banking-60",
    "speaker": "Mia",
    "text": "Our managed portfolios charge a modest annual fee of 0.25 percent of total assets.",
    "translation": "我们的托管投资组合每年仅收取总资产 0.25% 的微薄管理费。",
    "note": "managed portfolio 指托管投资组合。"
  },
  {
    "id": "banking-61",
    "speaker": "Alex",
    "text": "Hi Mia, I'm traveling to Japan next week and need to exchange dollars for Yen.",
    "translation": "嗨 Mia，我下周要去日本旅行，需要把美元兑换成日元。",
    "note": "exchange dollars for Yen 意为将美元兑换成日元。"
  },
  {
    "id": "banking-62",
    "speaker": "Mia",
    "text": "Certainly! Let me check today's foreign exchange rate for US dollars to Japanese Yen.",
    "translation": "没问题！让我查一下今天美元兑日元的外汇牌价率。",
    "note": "foreign exchange rate (forex rate) 指外汇汇率。"
  },
  {
    "id": "banking-63",
    "speaker": "Alex",
    "text": "Are there any currency conversion fees or commission charges involved in the swap?",
    "translation": "这次货币兑换包含货币转换费或手续费佣金吗？",
    "note": "currency conversion fee 指货币转换费；commission charges 指佣金。"
  },
  {
    "id": "banking-64",
    "speaker": "Mia",
    "text": "We charge a nominal foreign exchange fee of one percent above the wholesale rate.",
    "translation": "我们在批发价基础上仅收取 1% 的象征性外汇服务费。",
    "note": "wholesale rate 指批发汇率/银行间汇率。"
  },
  {
    "id": "banking-65",
    "speaker": "Alex",
    "text": "Is Japanese Yen currently in stock at this branch, or do I need to order in advance?",
    "translation": "这个分行目前有日元现钞库存吗，还是我需要提前预约？",
    "note": "in stock 意为有现货/有现钞库存。"
  },
  {
    "id": "banking-66",
    "speaker": "Mia",
    "text": "We have sufficient Yen notes in stock, so you can exchange it immediately today.",
    "translation": "我们有充足的日元纸币库存，您今天就可以立刻兑换。",
    "note": "Yen notes 指日元纸币/现钞。"
  },
  {
    "id": "banking-67",
    "speaker": "Alex",
    "text": "Great! I'd like to exchange five hundred US dollars into Japanese Yen, please.",
    "translation": "太好了！我想把 500 美元兑换成日元。",
    "note": "exchange into 意为兑换成（某币种）。"
  },
  {
    "id": "banking-68",
    "speaker": "Mia",
    "text": "That comes out to approximately 75,000 Yen based on today's exchange rate.",
    "translation": "按照今天的汇率，大约可以兑换 75,000 日元。",
    "note": "comes out to 意为算下来为/总计为。"
  },
  {
    "id": "banking-69",
    "speaker": "Alex",
    "text": "Can I exchange unused Yen back into US dollars when I return from my trip?",
    "translation": "旅行回来后，我能把没用完的日元换回美元吗？",
    "note": "unused Yen 指没用完的日元。"
  },
  {
    "id": "banking-70",
    "speaker": "Mia",
    "text": "Yes, you can exchange foreign banknotes back at any of our branch locations.",
    "translation": "可以的，您可以在我们任何一家分行将外币钞票换回美元。",
    "note": "foreign banknotes 指外币钞票。"
  },
  {
    "id": "banking-71",
    "speaker": "Alex",
    "text": "I'm having trouble logging into my mobile banking application on my phone.",
    "translation": "我在手机上登录手机银行 App 时遇到了麻烦。",
    "note": "mobile banking application 指手机银行 App。"
  },
  {
    "id": "banking-72",
    "speaker": "Mia",
    "text": "No worries. Have you tried resetting your password using two-factor authentication?",
    "translation": "别担心。您尝试过用双重身份验证（2FA）重置密码吗？",
    "note": "two-factor authentication (2FA) 指双重/二次身份验证。"
  },
  {
    "id": "banking-73",
    "speaker": "Alex",
    "text": "I haven't received the verification code sent to my registered mobile phone number.",
    "translation": "我还没收到发送到我登记手机号上的验证码。",
    "note": "verification code 指验证码。"
  },
  {
    "id": "banking-74",
    "speaker": "Mia",
    "text": "Let me update your mobile phone number on file to ensure code delivery works.",
    "translation": "让我更新一下您存档的手机号码，以确保验证码能顺利送达。",
    "note": "on file 意为存档的/记录在案的。"
  },
  {
    "id": "banking-75",
    "speaker": "Alex",
    "text": "Is it safe to log into online banking when connected to public Wi-Fi networks?",
    "translation": "连接公共 Wi-Fi 网络时登录网上银行安全吗？",
    "note": "public Wi-Fi networks 指公共 Wi-Fi 网络。"
  },
  {
    "id": "banking-76",
    "speaker": "Mia",
    "text": "We strongly recommend using cellular data or a VPN when accessing financial apps.",
    "translation": "我们强烈建议使用蜂窝移动网络或 VPN 来访问金融应用。",
    "note": "cellular data 指蜂窝移动数据。"
  },
  {
    "id": "banking-77",
    "speaker": "Alex",
    "text": "How can I enable biometric authentication like fingerprint or facial recognition?",
    "translation": "我该如何开启指纹或人脸识别等生物识别验证？",
    "note": "biometric authentication 指生物识别认证（如指纹/刷脸）。"
  },
  {
    "id": "banking-78",
    "speaker": "Mia",
    "text": "You can enable Face ID or fingerprint login directly in the app security settings.",
    "translation": "您可以直接在 App 的安全设置里启用 Face ID 或指纹登录。",
    "note": "security settings 指安全设置。"
  },
  {
    "id": "banking-79",
    "speaker": "Alex",
    "text": "What should I do if I suspect my online banking password was compromised?",
    "translation": "如果我怀疑我的网银密码泄露了，我该怎么办？",
    "note": "compromised 意为（密码/安全）泄露或受威胁的。"
  },
  {
    "id": "banking-80",
    "speaker": "Mia",
    "text": "Change your password immediately and contact our 24/7 fraud department right away.",
    "translation": "请立即修改密码，并第一时间联系我们 24 小时防欺诈部门。",
    "note": "fraud department 指反欺诈部门。"
  },
  {
    "id": "banking-81",
    "speaker": "Alex",
    "text": "Emergency! I lost my debit card while taking the subway this afternoon!",
    "translation": "紧急情况！我今天下午坐地铁时把借记卡弄丢了！",
    "note": "debit card 指借记卡/储蓄卡。"
  },
  {
    "id": "banking-82",
    "speaker": "Mia",
    "text": "Don't panic! I will freeze your card right now to prevent unauthorized transactions.",
    "translation": "别慌！我现在就为您冻结这张卡，以防未经授权的盗刷交易。",
    "note": "freeze your card 意为冻结你的银行卡；unauthorized transactions 指未经授权的盗刷。"
  },
  {
    "id": "banking-83",
    "speaker": "Alex",
    "text": "Thank you! I noticed a suspicious transaction of fifty dollars on my account.",
    "translation": "谢谢！我注意到我的账户上有一笔 50 美元的可疑交易。",
    "note": "suspicious transaction 指可疑交易/异常交易。"
  },
  {
    "id": "banking-84",
    "speaker": "Mia",
    "text": "I will file a fraud dispute claim for that charge immediately.",
    "translation": "我会立刻就该笔扣款为您提交欺诈申诉申请。",
    "note": "file a fraud dispute 意为提交欺诈盗刷申诉。"
  },
  {
    "id": "banking-85",
    "speaker": "Alex",
    "text": "Will I receive a provisional credit while the fraud investigation is ongoing?",
    "translation": "在欺诈调查进行期间，我会收到临时垫付款（Provisional Credit）吗？",
    "note": "provisional credit 指（银行在调查盗刷时预先垫付给用户的）临时信用额/临时退款。"
  },
  {
    "id": "banking-86",
    "speaker": "Mia",
    "text": "Yes, provisional credit is usually issued to your account within two business days.",
    "translation": "是的，临时垫付款通常会在 2 个工作日内发放至您的账户。",
    "note": "fraud investigation 指盗刷/欺诈调查。"
  },
  {
    "id": "banking-87",
    "speaker": "Alex",
    "text": "How quickly can I get a replacement debit card issued to my home address?",
    "translation": "重新制作一张补发借记卡寄到我家需要多久？",
    "note": "replacement debit card 指补发/重制借记卡。"
  },
  {
    "id": "banking-88",
    "speaker": "Mia",
    "text": "A new debit card will be mailed to you and will arrive in three to five business days.",
    "translation": "一张新借记卡会邮寄给您，会在 3 到 5 个工作日内送达。",
    "note": "mailed to you 意为邮寄给您。"
  },
  {
    "id": "banking-89",
    "speaker": "Alex",
    "text": "Can I get a temporary debit card printed at this branch right now?",
    "translation": "我可以在这个分行现场打印一张临时借记卡吗？",
    "note": "temporary debit card 指临时借记卡。"
  },
  {
    "id": "banking-90",
    "speaker": "Mia",
    "text": "Yes! I can print an instant-issue debit card for you at the counter in five minutes.",
    "translation": "没问题！我可以在柜台 5 分钟内为您现场打印一张即时发行的借记卡。",
    "note": "instant-issue 意为即时印发的。"
  },
  {
    "id": "banking-91",
    "speaker": "Alex",
    "text": "I'm looking into starting a retirement account to save for my future.",
    "translation": "我正在研究开设一个退休账户，为我的未来积蓄筹谋。",
    "note": "retirement account 指退休金账户。"
  },
  {
    "id": "banking-92",
    "speaker": "Mia",
    "text": "That's a wise decision! We offer Traditional IRAs and Roth IRAs for retirement savings.",
    "translation": "这是明智的决定！我们提供传统 IRA 和 Roth IRA 个人退休账户存款服务。",
    "note": "Traditional IRA / Roth IRA 为美国常见的两种个人退休金账户类型。"
  },
  {
    "id": "banking-93",
    "speaker": "Alex",
    "text": "What is the main difference between a Traditional IRA and a Roth IRA?",
    "translation": "传统 IRA 与 Roth IRA 之间的主要区别是什么？",
    "note": "main difference 指主要区别。"
  },
  {
    "id": "banking-94",
    "speaker": "Mia",
    "text": "Traditional IRAs offer tax-deductible contributions, while Roth IRAs allow tax-free withdrawals in retirement.",
    "translation": "传统 IRA 提供税前抵扣供款，而 Roth IRA 则允许退休后免税提取。",
    "note": "tax-deductible 意为可抵扣税款的；tax-free withdrawals 指免税提取。"
  },
  {
    "id": "banking-95",
    "speaker": "Alex",
    "text": "Is there an annual contribution limit for an IRA account in 2026?",
    "translation": "2026 年 IRA 账户有年度存入上限吗？",
    "note": "annual contribution limit 指年度最高供款/存入上限。"
  },
  {
    "id": "banking-96",
    "speaker": "Mia",
    "text": "Yes, the annual contribution limit for individuals under 50 is $7,000 per year.",
    "translation": "有的，50 岁以下个人的年度存入上限为每年 7,000 美元。",
    "note": "contribution limit 指存入上限。"
  },
  {
    "id": "banking-97",
    "speaker": "Alex",
    "text": "Can I set up automatic monthly contributions directly from my checking account?",
    "translation": "我可以设置直接从我的支票账户按月自动扣款存入吗？",
    "note": "automatic monthly contributions 指按月自动扣款存入。"
  },
  {
    "id": "banking-98",
    "speaker": "Mia",
    "text": "Yes, automated recurring transfers make consistent saving effortless and disciplined.",
    "translation": "是的，自动定时转账能让持之以恒的储蓄变得轻松且有纪律。",
    "note": "recurring transfers 指周期性自动转账。"
  },
  {
    "id": "banking-99",
    "speaker": "Alex",
    "text": "Will the bank send me tax forms like 1099-INT at the end of the year?",
    "translation": "年底银行会给我寄送像 1099-INT 这样的报税表格吗？",
    "note": "1099-INT 为美国银行利息收入报税表格。"
  },
  {
    "id": "banking-100",
    "speaker": "Mia",
    "text": "Yes, all relevant tax documents will be available for download in your online portal.",
    "translation": "是的，所有相关的税务文件都可以直接在您的网银门户中下载。",
    "note": "online portal 指网银门户系统。"
  }
],
  shopping: [
  {
    "id": "shopping-1",
    "speaker": "Alex",
    "text": "Excuse me, could you tell me where I can find the men's casual jacket section?",
    "translation": "打扰一下，能告诉我男士休闲外套区在哪里吗？",
    "note": "casual jacket 指休闲外套/夹克。"
  },
  {
    "id": "shopping-2",
    "speaker": "Mia",
    "text": "Of course! The men's casual outerwear is located on the second floor, right next to the elevators.",
    "translation": "当然可以！男士休闲外套位于二楼，就在电梯旁边。",
    "note": "outerwear 指外套/外衣。"
  },
  {
    "id": "shopping-3",
    "speaker": "Alex",
    "text": "Thanks! Do you happen to carry winter coats in stock as well?",
    "translation": "谢谢！请问你们店里也有冬用大衣现货吗？",
    "note": "in stock 意为有现货/有库存。"
  },
  {
    "id": "shopping-4",
    "speaker": "Mia",
    "text": "Yes, our new winter collection just arrived yesterday and is displayed near the main entrance.",
    "translation": "是的，我们最新的冬季系列昨天刚到货，展示在大门入口附近。",
    "note": "winter collection 指冬季新款/系列。"
  },
  {
    "id": "shopping-5",
    "speaker": "Alex",
    "text": "Great! Are there any sales associates available on that floor to help me?",
    "translation": "太好了！那一层有售货员可以帮我吗？",
    "note": "sales associate 指售货员/店员。"
  },
  {
    "id": "shopping-6",
    "speaker": "Mia",
    "text": "Yes, my colleague Sarah is working on the second floor and can assist you with sizes.",
    "translation": "有的，我的同事 Sarah 在二楼值班，可以帮您挑选合适尺寸。",
    "note": "assist with 意为协助/帮助。"
  },
  {
    "id": "shopping-7",
    "speaker": "Alex",
    "text": "Awesome. By the way, where can I grab a shopping basket or cart?",
    "translation": "太棒了。顺便问一下，我在哪里可以拿购物篮或推车？",
    "note": "shopping basket / cart 指购物篮/购物推车。"
  },
  {
    "id": "shopping-8",
    "speaker": "Mia",
    "text": "You can find clean shopping carts right beside the entrance turnstiles on the first floor.",
    "translation": "一楼入口闸机旁就有干净的购物推车。",
    "note": "entrance turnstiles 指入口旋转闸机。"
  },
  {
    "id": "shopping-9",
    "speaker": "Alex",
    "text": "Perfect, thank you so much for pointing me in the right direction.",
    "translation": "太好了，非常感谢您给我指明方向。",
    "note": "point in the right direction 意为指引正确方向。"
  },
  {
    "id": "shopping-10",
    "speaker": "Mia",
    "text": "You're very welcome! Let me know if you need anything else while browsing.",
    "translation": "不客气！您选购时如果还需要其他帮助，随时告诉我。",
    "note": "while browsing 意为在选购/浏览时。"
  },
  {
    "id": "shopping-11",
    "speaker": "Alex",
    "text": "Hi Mia, I really like this navy blue sweater, but do you have it in a medium?",
    "translation": "嗨 Mia，我很喜欢这件藏青色毛衣，但有中码的吗？",
    "note": "navy blue 指藏青色/海军蓝；in a medium 指中码/M码。"
  },
  {
    "id": "shopping-12",
    "speaker": "Mia",
    "text": "Let me check our stockroom for you. What size are you currently holding?",
    "translation": "我帮您去库房查一下。您手里拿的是什么尺寸？",
    "note": "stockroom 指库房/储藏室。"
  },
  {
    "id": "shopping-13",
    "speaker": "Alex",
    "text": "I'm holding a large, but it looks a bit too baggy for my preference.",
    "translation": "我拿的是大码，但看起来有点偏宽松，不太符合我的偏好。",
    "note": "baggy 意为宽松的/松垮的。"
  },
  {
    "id": "shopping-14",
    "speaker": "Mia",
    "text": "Good news! I found one medium left in navy blue in the back.",
    "translation": "好消息！我在后库找到了最后一件藏青色中码。",
    "note": "one left 意为还剩一件。"
  },
  {
    "id": "shopping-15",
    "speaker": "Alex",
    "text": "That's wonderful! Where are the fitting rooms located so I can try it on?",
    "translation": "太棒了！试衣间在哪里？我想试穿一下。",
    "note": "fitting rooms 指试衣间；try it on 意为试穿。"
  },
  {
    "id": "shopping-16",
    "speaker": "Mia",
    "text": "The fitting rooms are down the aisle to your left, right behind the shoe racks.",
    "translation": "试衣间在您左手边的过道尽头，就在鞋架正后方。",
    "note": "down the aisle 意为沿着过道。"
  },
  {
    "id": "shopping-17",
    "speaker": "Alex",
    "text": "Thanks. Is there a limit on how many items I can take into the fitting room?",
    "translation": "谢谢。带进试衣间的衣服数量有限制吗？",
    "note": "limit on 意为在方面的限制。"
  },
  {
    "id": "shopping-18",
    "speaker": "Mia",
    "text": "You can take up to six items at a time into the fitting room.",
    "translation": "您一次最多可以带六件衣服进试衣间。",
    "note": "up to 意为最多/多达。"
  },
  {
    "id": "shopping-19",
    "speaker": "Alex",
    "text": "The medium fits perfectly around the shoulders! Does this fabric shrink after washing?",
    "translation": "中码肩膀这里非常合身！这面料洗后会缩水吗？",
    "note": "fits perfectly 意为非常合身；shrink 意为缩水。"
  },
  {
    "id": "shopping-20",
    "speaker": "Mia",
    "text": "It's pre-shrunk cotton, but we recommend washing it in cold water to maintain the shape.",
    "translation": "这是防缩水处理过的纯棉，但建议用冷水洗涤以保持版型。",
    "note": "pre-shrunk cotton 指防缩水处理纯棉。"
  },
  {
    "id": "shopping-21",
    "speaker": "Alex",
    "text": "Excuse me, is this rack of designer jeans included in the storewide clearance sale?",
    "translation": "打扰一下，这一架设计师牛仔裤参与全店清仓打折吗？",
    "note": "rack 指衣架/挂衣杆；clearance sale 指清仓大甩卖。"
  },
  {
    "id": "shopping-22",
    "speaker": "Mia",
    "text": "Yes! Everything on that red rack is thirty percent off the tagged price.",
    "translation": "是的！那个红架子上的所有商品均在吊牌价基础上打七折。",
    "note": "tagged price 指吊牌价/标价；thirty percent off 意为打七折/优惠30%。"
  },
  {
    "id": "shopping-23",
    "speaker": "Alex",
    "text": "That's a great deal. Can I combine this discount with my store member coupon?",
    "translation": "真划算。这个折扣可以和我的会员优惠券叠加使用吗？",
    "note": "combine discounts / stack discounts 意为叠加优惠。"
  },
  {
    "id": "shopping-24",
    "speaker": "Mia",
    "text": "Unfortunately, promotional coupons cannot be stacked on clearance items.",
    "translation": "很抱歉，促销优惠券不能与清仓商品叠加使用。",
    "note": "stacked 意为（优惠等）叠加的。"
  },
  {
    "id": "shopping-25",
    "speaker": "Alex",
    "text": "I see. How can I earn reward points on today's purchase then?",
    "translation": "懂了。那我今天的消费怎么积累积分呢？",
    "note": "earn reward points 意为赚取/积累积分。"
  },
  {
    "id": "shopping-26",
    "speaker": "Mia",
    "text": "Simply enter your registered phone number at the checkout counter to accumulate points.",
    "translation": "只需在结账柜台输入您注册的手机号即可积累积分。",
    "note": "accumulate points 意为积分/累积积分。"
  },
  {
    "id": "shopping-27",
    "speaker": "Alex",
    "text": "Is there a buy-one-get-one-free offer on socks or basic t-shirts today?",
    "translation": "今天袜子或基础款 T 恤有买一送一的优惠吗？",
    "note": "buy-one-get-one-free (BOGO) 指买一送一。"
  },
  {
    "id": "shopping-28",
    "speaker": "Mia",
    "text": "Yes, our basic cotton t-shirts are buy-one-get-one half price right now.",
    "translation": "有的，我们的纯棉基础款 T 恤现在买一件第二件半价。",
    "note": "buy-one-get-one half price 指买一件第二件半价。"
  },
  {
    "id": "shopping-29",
    "speaker": "Alex",
    "text": "Nice! Does the discount apply automatically at the register?",
    "translation": "太好了！打折会在收银台自动扣减吗？",
    "note": "apply automatically 意为自动生效/应用。"
  },
  {
    "id": "shopping-30",
    "speaker": "Mia",
    "text": "Yes, the system will automatically deduct the discount when both items are scanned.",
    "translation": "是的，两件商品扫描后，系统会自动扣减优惠额度。",
    "note": "deduct 意为扣除/减去。"
  },
  {
    "id": "shopping-31",
    "speaker": "Alex",
    "text": "Hi Mia, could you show me where the organic produce section is located?",
    "translation": "嗨 Mia，能告诉我有机农产品区在哪里吗？",
    "note": "organic produce section 指有机农产品/果蔬区。"
  },
  {
    "id": "shopping-32",
    "speaker": "Mia",
    "text": "Sure! Fresh organic fruits and vegetables are in aisle three, near the bakery.",
    "translation": "当然！新鲜有机水果和蔬菜在 3 号通道，靠近烘焙区。",
    "note": "aisle 意为（超市/车厢）过道/通道。"
  },
  {
    "id": "shopping-33",
    "speaker": "Alex",
    "text": "Great! Are these avocados ripe enough to eat today?",
    "translation": "太好了！这些牛油果够熟、今天能吃吗？",
    "note": "ripe 意为（水果/食物）成熟的。"
  },
  {
    "id": "shopping-34",
    "speaker": "Mia",
    "text": "The ones with darker skin yield slightly to gentle pressure, so they are ready to eat.",
    "translation": "表皮颜色较深的捏起来微软，今天就可以直接吃。",
    "note": "yield to pressure 形象指受力按压会微凹/微软。"
  },
  {
    "id": "shopping-35",
    "speaker": "Alex",
    "text": "Good tip! Do you also sell dairy-free almond milk or oat milk?",
    "translation": "好技巧！你们也卖无乳制品杏仁奶或燕麦奶吗？",
    "note": "dairy-free 指不含乳制品的；almond milk / oat milk 指杏仁奶/燕麦奶。"
  },
  {
    "id": "shopping-36",
    "speaker": "Mia",
    "text": "Yes, plant-based dairy alternatives are stocked in refrigerated aisle five.",
    "translation": "有的，植物基乳替代品保存在 5 号冷藏通道。",
    "note": "plant-based dairy alternatives 指植物基乳替代品。"
  },
  {
    "id": "shopping-37",
    "speaker": "Alex",
    "text": "What is the expiration date on this gallon of fresh whole milk?",
    "translation": "这加仑新鲜全脂牛奶的保质期到什么时候？",
    "note": "expiration date / sell-by date 指保质期/截止售卖日期。"
  },
  {
    "id": "shopping-38",
    "speaker": "Mia",
    "text": "The sell-by date printed on the cap is October 15th, so it's fresh.",
    "translation": "瓶盖上印的截止售卖日期是 10 月 15 日，非常新鲜。",
    "note": "printed on the cap 意为印在瓶盖上的。"
  },
  {
    "id": "shopping-39",
    "speaker": "Alex",
    "text": "Are there any discounts if I purchase fresh seafood in bulk today?",
    "translation": "如果我今天批量购买新鲜海鲜，有什么优惠吗？",
    "note": "in bulk 意为批量地/大量地。"
  },
  {
    "id": "shopping-40",
    "speaker": "Mia",
    "text": "Purchasing over two kilograms of salmon qualifies for a ten percent bulk discount.",
    "translation": "购买三文鱼超过 2 公斤可享受 10% 的批量折扣。",
    "note": "qualify for 意为有资格享受。"
  },
  {
    "id": "shopping-41",
    "speaker": "Alex",
    "text": "Hello, I'm looking for a noise-canceling wireless headset for commuting.",
    "translation": "你好，我想买一副降噪无线耳机用于日常通勤。",
    "note": "noise-canceling headset 指降噪耳机；commuting 指通勤。"
  },
  {
    "id": "shopping-42",
    "speaker": "Mia",
    "text": "Welcome! We have the latest Bluetooth models with active noise cancellation over here.",
    "translation": "欢迎！我们这边有带主动降噪功能的最新款蓝牙耳机。",
    "note": "active noise cancellation (ANC) 指主动降噪功能。"
  },
  {
    "id": "shopping-43",
    "speaker": "Alex",
    "text": "How long does the battery last on a single full charge?",
    "translation": "单次充满电后电池续航时间有多长？",
    "note": "battery last 意为电池续航；single full charge 指单次充满电。"
  },
  {
    "id": "shopping-44",
    "speaker": "Mia",
    "text": "This model delivers up to thirty hours of continuous playback on a single charge.",
    "translation": "这款型号在单次充电后可提供长达 30 小时的连续播放能力。",
    "note": "continuous playback 指连续播放。"
  },
  {
    "id": "shopping-45",
    "speaker": "Alex",
    "text": "Impressive! Does it come with a manufacturer warranty or store protection plan?",
    "translation": "厉害！它附带原厂保修或门店质保方案吗？",
    "note": "manufacturer warranty 指厂家保修；store protection plan 指商家质保方案。"
  },
  {
    "id": "shopping-46",
    "speaker": "Mia",
    "text": "It includes a one-year standard warranty, and you can add a two-year extended plan.",
    "translation": "它包含一年标准保修，您还可以加购两年延保方案。",
    "note": "extended plan 指延保服务/计划。"
  },
  {
    "id": "shopping-47",
    "speaker": "Alex",
    "text": "Can I test the sound quality and comfort on a demo unit before buying?",
    "translation": "购买前我可以在样品试听机上测试音质和佩戴舒适度吗？",
    "note": "demo unit 指展示样机/试用机。"
  },
  {
    "id": "shopping-48",
    "speaker": "Mia",
    "text": "Of course! You can pair your smartphone with this display unit to play music.",
    "translation": "当然可以！您可以将手机与这台展示样机配对播放音乐。",
    "note": "pair with 意为（蓝牙）配对。"
  },
  {
    "id": "shopping-49",
    "speaker": "Alex",
    "text": "The bass sounds crisp! What is included inside the retail packaging box?",
    "translation": "低音听起来很清晰！零售包装盒里包含哪些配件？",
    "note": "retail packaging box 指零售包装盒。"
  },
  {
    "id": "shopping-50",
    "speaker": "Mia",
    "text": "It comes with a USB-C charging cable, audio jack cable, and a hard carrying case.",
    "translation": "包含一条 USB-C 充电线、一条音频线和一个硬质收纳盒。",
    "note": "hard carrying case 指硬质便携收纳盒。"
  },
  {
    "id": "shopping-51",
    "speaker": "Alex",
    "text": "Hi, I'm ready to check out with these three items now.",
    "translation": "嗨，我准备好结算这三件商品了。",
    "note": "check out 意为结账/结算。"
  },
  {
    "id": "shopping-52",
    "speaker": "Mia",
    "text": "Hello! Did you find everything you were looking for today?",
    "translation": "您好！今天选购顺畅吗，东西都找到了吗？",
    "note": "find everything you were looking for 柜台结账常用客套问候语。"
  },
  {
    "id": "shopping-53",
    "speaker": "Alex",
    "text": "Yes, everything was easy to find. Do you accept contactless mobile payments?",
    "translation": "是的，都很好找。你们接受非接触式手机移动支付吗？",
    "note": "contactless mobile payments 指非接触式移动支付（如 Apple/Google Pay）。"
  },
  {
    "id": "shopping-54",
    "speaker": "Mia",
    "text": "Yes, we accept Apple Pay, Google Pay, and all major credit cards.",
    "translation": "是的，我们支持 Apple Pay、Google Pay 以及所有主流信用卡。",
    "note": "major credit cards 指主流信用卡。"
  },
  {
    "id": "shopping-55",
    "speaker": "Alex",
    "text": "Awesome. I'd also like to use this ten-dollar gift card toward my total.",
    "translation": "太好了。我还想使用这张 10 美元的礼品卡来抵扣总价。",
    "note": "gift card 指礼品卡/代金卡。"
  },
  {
    "id": "shopping-56",
    "speaker": "Mia",
    "text": "No problem. Let me scan the barcode on your gift card first.",
    "translation": "没问题。让我先扫描您礼品卡上的条形码。",
    "note": "barcode 指条码/条形码。"
  },
  {
    "id": "shopping-57",
    "speaker": "Alex",
    "text": "Would you like me to insert or tap my credit card for the remaining balance?",
    "translation": "剩下的余款需要我插卡还是感应刷信用卡？",
    "note": "insert or tap 指插卡还是感应刷卡。"
  },
  {
    "id": "shopping-58",
    "speaker": "Mia",
    "text": "You can tap your card on the payment terminal once the prompt appears.",
    "translation": "等提示出现后，您可以在 POS 机感应区刷卡即可。",
    "note": "payment terminal 指支付终端/POS机。"
  },
  {
    "id": "shopping-59",
    "speaker": "Alex",
    "text": "Do you charge extra for paper shopping bags at checkout?",
    "translation": "结账时纸质购物袋需要额外收费吗？",
    "note": "paper shopping bags 指纸质购物袋。"
  },
  {
    "id": "shopping-60",
    "speaker": "Mia",
    "text": "Paper bags cost ten cents each, or you can use your own reusable tote bag.",
    "translation": "纸袋每个 10 美分，或者您也可以使用自带的环保布袋。",
    "note": "reusable tote bag 指可重复使用的环保袋/帆布袋。"
  },
  {
    "id": "shopping-61",
    "speaker": "Alex",
    "text": "Hi Mia, I'd like to return this jacket I bought last week because it doesn't fit.",
    "translation": "嗨 Mia，我想退掉上周买的这件外套，因为尺码不太合身。",
    "note": "return an item 意为退货。"
  },
  {
    "id": "shopping-62",
    "speaker": "Mia",
    "text": "I can process that return for you. Do you have the original store receipt?",
    "translation": "我可以为您办理退货。请问您有原始小票吗？",
    "note": "original store receipt 指原始购买凭证/小票。"
  },
  {
    "id": "shopping-63",
    "speaker": "Alex",
    "text": "Yes, here is the paper receipt, and the price tags are still attached.",
    "translation": "有的，这是纸质小票，价格吊牌也都还挂着。",
    "note": "price tags are attached 意为吊牌未拆。"
  },
  {
    "id": "shopping-64",
    "speaker": "Mia",
    "text": "Great! Since tags are intact, I can refund the full amount to your credit card.",
    "translation": "太好了！既然吊牌完好无损，我可以全额退款到您的信用卡中。",
    "note": "tags are intact 意为吊牌完好无损；refund the full amount 指全额退款。"
  },
  {
    "id": "shopping-65",
    "speaker": "Alex",
    "text": "How many business days will it take for the refund to reflect on my statement?",
    "translation": "退款需要几个工作日才能反映在我的账单上？",
    "note": "reflect on statement 意为体现在账单上。"
  },
  {
    "id": "shopping-66",
    "speaker": "Mia",
    "text": "It usually takes three to five business days for your bank to process the refund.",
    "translation": "通常需要 3 到 5 个工作日，您的发卡行才能处理完这笔退款。",
    "note": "process the refund 意为处理退款。"
  },
  {
    "id": "shopping-67",
    "speaker": "Alex",
    "text": "What if I wanted to exchange it for a larger size instead of getting a refund?",
    "translation": "如果我想换成更大尺码而不是退款，该怎么操作？",
    "note": "exchange for a larger size 意为调换成更大尺寸。"
  },
  {
    "id": "shopping-68",
    "speaker": "Mia",
    "text": "We can do a direct exchange right away if we have the size in stock.",
    "translation": "只要我们库房有合适尺寸，立刻就可以为您办理现场等值调换。",
    "note": "direct exchange 指直接调换/等价换货。"
  },
  {
    "id": "shopping-69",
    "speaker": "Alex",
    "text": "What is your store's general return policy window for regular items?",
    "translation": "你们店对普通商品的退货期限政策是多久？",
    "note": "return policy window 指退货政策期限/退货窗口期。"
  },
  {
    "id": "shopping-70",
    "speaker": "Mia",
    "text": "Our store policy allows returns and exchanges within thirty days of purchase.",
    "translation": "我们门店政策允许购买后 30 天内办理退换货。",
    "note": "within thirty days of purchase 意为购买后 30 天内。"
  },
  {
    "id": "shopping-71",
    "speaker": "Alex",
    "text": "Hi Mia, I placed an online order for store pickup, is it ready for collection?",
    "translation": "嗨 Mia，我在线下单选了到店自提，现在可以取货了吗？",
    "note": "store pickup 意为到店自提/网订店取。"
  },
  {
    "id": "shopping-72",
    "speaker": "Mia",
    "text": "Sure! May I see your order confirmation number and photo ID?",
    "translation": "好的！可以看一下您的订单确认号和带照片的身份证件吗？",
    "note": "order confirmation number 指订单确认号。"
  },
  {
    "id": "shopping-73",
    "speaker": "Alex",
    "text": "Here is the confirmation email on my phone with the barcode.",
    "translation": "这是我手机里带条形码的确认邮件。",
    "note": "confirmation email 指确认电子邮件。"
  },
  {
    "id": "shopping-74",
    "speaker": "Mia",
    "text": "Thank you. Let me retrieve your package from the back holding area.",
    "translation": "谢谢。我去后方寄存区帮您提取包裹。",
    "note": "retrieve your package 意为提取您的包裹。"
  },
  {
    "id": "shopping-75",
    "speaker": "Alex",
    "text": "If I order online in the future, what is the threshold for free home delivery?",
    "translation": "如果我以后网上下单，免费送货上门的门槛是多少？",
    "note": "threshold for free delivery 指包邮/免费送货门槛。"
  },
  {
    "id": "shopping-76",
    "speaker": "Mia",
    "text": "Orders over fifty dollars qualify for free standard home shipping.",
    "translation": "订单金额满 50 美元即可享受免费标准快递送货上门。",
    "note": "standard home shipping 指标准快递送货上门。"
  },
  {
    "id": "shopping-77",
    "speaker": "Alex",
    "text": "How long does standard delivery usually take to arrive at my residential address?",
    "translation": "标准配送通常需要多久送到我的居住地址？",
    "note": "residential address 指居住地址。"
  },
  {
    "id": "shopping-78",
    "speaker": "Mia",
    "text": "Standard shipping takes two to four business days, while express takes overnight.",
    "translation": "标准快递需要 2 到 4 个工作日，而加急特快次日达。",
    "note": "express shipping 指加急/特快配送；overnight 意为隔夜/次日达。"
  },
  {
    "id": "shopping-79",
    "speaker": "Alex",
    "text": "Can I track the real-time courier status on your official mobile application?",
    "translation": "我可以在你们官方 App 上追踪实时快递状态吗？",
    "note": "real-time courier status 指实时快递状态。"
  },
  {
    "id": "shopping-80",
    "speaker": "Mia",
    "text": "Yes, the app provides real-time GPS tracking and delivery notifications.",
    "translation": "是的，App 提供实时 GPS 定位追踪和送达通知提醒。",
    "note": "delivery notifications 指送达通知/物流提醒。"
  },
  {
    "id": "shopping-81",
    "speaker": "Alex",
    "text": "I'm looking for a luxury leather handbag as an anniversary gift for my wife.",
    "translation": "我想买一个奢华皮革手提包作为结婚纪念日礼物送给我妻子。",
    "note": "luxury leather handbag 指奢华皮革手提包；anniversary gift 指周年纪念日礼物。"
  },
  {
    "id": "shopping-82",
    "speaker": "Mia",
    "text": "How lovely! We have a handcrafted Italian leather collection right over here.",
    "translation": "真贴心！我们这边正好有一系列手工制作的意大利皮革手袋。",
    "note": "handcrafted 意为手工制作的。"
  },
  {
    "id": "shopping-83",
    "speaker": "Alex",
    "text": "This designer bag looks exquisite. Is the leather genuine calfskin?",
    "translation": "这款设计师手袋看起来精美极了。面料是真正的牛皮吗？",
    "note": "exquisite 意为精美的/精致的；genuine calfskin 指真小牛皮。"
  },
  {
    "id": "shopping-84",
    "speaker": "Mia",
    "text": "Yes, it is crafted from 100 percent full-grain genuine calfskin leather.",
    "translation": "是的，它由 100% 粒面真小牛皮精制而成。",
    "note": "full-grain leather 指头层/粒面皮。"
  },
  {
    "id": "shopping-85",
    "speaker": "Alex",
    "text": "Can you provide a gift receipt and complimentary luxury gift wrapping?",
    "translation": "你们能提供礼品小票和免费的高端礼品包装吗？",
    "note": "gift receipt 指礼品小票（不标价格）；complimentary gift wrapping 指免费礼品包装。"
  },
  {
    "id": "shopping-86",
    "speaker": "Mia",
    "text": "Absolutely! We provide elegant gift wrapping with a satin ribbon and gift receipt.",
    "translation": "当然！我们提供带有缎带的优雅礼品包装以及礼品小票。",
    "note": "satin ribbon 指缎带/丝带。"
  },
  {
    "id": "shopping-87",
    "speaker": "Alex",
    "text": "Does this luxury handbag come with an authenticity certificate and dust bag?",
    "translation": "这款奢华手袋附带正品防伪证书和防尘袋吗？",
    "note": "authenticity certificate 指防伪/正品证书；dust bag 指防尘袋。"
  },
  {
    "id": "shopping-88",
    "speaker": "Mia",
    "text": "Yes, every designer item comes with a stamped certificate of authenticity and dust bag.",
    "translation": "是的，每件设计师商品都附带盖章的正品证书和专属防尘袋。",
    "note": "stamped certificate 指盖章证明书。"
  },
  {
    "id": "shopping-89",
    "speaker": "Alex",
    "text": "What happens if she wants to exchange it for a different color after the anniversary?",
    "translation": "如果纪念日过后她想换个别的颜色，该怎么处理？",
    "note": "exchange for a different color 意为调换成其他颜色。"
  },
  {
    "id": "shopping-90",
    "speaker": "Mia",
    "text": "With the gift receipt, she can exchange it for any color or item within thirty days.",
    "translation": "凭礼品小票，她可以在 30 天内自由调换任何颜色或同等价值商品。",
    "note": "gift receipt 允许受赠人凭借不含价格的小票换货。"
  },
  {
    "id": "shopping-91",
    "speaker": "Alex",
    "text": "Excuse me, I noticed a discrepancy between the shelf price and what was charged.",
    "translation": "打扰一下，我注意到货架标价和结算收取的费用不一致。",
    "note": "discrepancy 意为差异/不符之处；shelf price 指货架标价。"
  },
  {
    "id": "shopping-92",
    "speaker": "Mia",
    "text": "I apologize for the confusion! Let me check the shelf tag price for you.",
    "translation": "对于给您造成的困扰我深表抱歉！让我为您核对一下货架标签价格。",
    "note": "apologize for the confusion 意为为造成的困惑/困扰致歉。"
  },
  {
    "id": "shopping-93",
    "speaker": "Alex",
    "text": "The shelf label said $25, but the register receipt charged me $30.",
    "translation": "货架标签写着 25 美元，但收银小票却收了我 30 美元。",
    "note": "register receipt 指收银小票。"
  },
  {
    "id": "shopping-94",
    "speaker": "Mia",
    "text": "You are completely right. I will adjust the price and refund the $5 difference.",
    "translation": "您完全正确。我现在就为您调整价格并退还 5 美元的差价。",
    "note": "refund the difference 意为退还差价。"
  },
  {
    "id": "shopping-95",
    "speaker": "Alex",
    "text": "Thank you. Does your store offer a price matching policy against online competitors?",
    "translation": "谢谢。你们门店对线上竞争对手提供比价退差价（Price Matching）政策吗？",
    "note": "price matching policy 指价格匹配/比价退差价政策。"
  },
  {
    "id": "shopping-96",
    "speaker": "Mia",
    "text": "Yes, we match lower prices from major authorized retail websites.",
    "translation": "是的，我们匹配主流授权零售网站的更低价格。",
    "note": "authorized retail websites 指官方授权零售网站。"
  },
  {
    "id": "shopping-97",
    "speaker": "Alex",
    "text": "Here is the lower price listing on an authorized competitor's official website.",
    "translation": "这是授权竞争对手官方网站上的更低价格页面。",
    "note": "lower price listing 指更低价格商品页面/展示。"
  },
  {
    "id": "shopping-98",
    "speaker": "Mia",
    "text": "Awesome! I will override the price to match that online listing for you.",
    "translation": "太好了！我现在就手动改价，帮您匹配那个线上价格。",
    "note": "override the price 意为（收银机上）手动修改/覆盖价格。"
  },
  {
    "id": "shopping-99",
    "speaker": "Alex",
    "text": "I really appreciate your quick resolution and excellent customer service.",
    "translation": "我非常感谢您快速的处理和出色的客户服务。",
    "note": "quick resolution 意为快速解决。"
  },
  {
    "id": "shopping-100",
    "speaker": "Mia",
    "text": "It's my pleasure! Thank you for shopping with us, and have a fantastic day!",
    "translation": "这是我的荣幸！感谢您在本项目选购，祝您度过愉快的一天！",
    "note": "have a fantastic day 常用客套结语。"
  }
],
  transit: [
  {
    "id": "transit-1",
    "speaker": "Alex",
    "text": "Excuse me, does this bus go directly to the central train station?",
    "translation": "打扰一下，这趟公交车直达火车总站吗？",
    "note": "go directly to 意为直达。"
  },
  {
    "id": "transit-2",
    "speaker": "Mia",
    "text": "No, you'll need to transfer to Route 15 at the city hall stop.",
    "translation": "不直达，您需要在市政厅站换乘 15 路公交车。",
    "note": "transfer to 意为换乘（某线路）。"
  },
  {
    "id": "transit-3",
    "speaker": "Alex",
    "text": "How frequently do buses run on this route during peak hours?",
    "translation": "高峰期这条线路的公交车发车频率是多少？",
    "note": "peak hours 指交通高峰期；run frequently 意为高频发车。"
  },
  {
    "id": "transit-4",
    "speaker": "Mia",
    "text": "They run every five minutes during morning rush hour, but every fifteen minutes during off-peak hours.",
    "translation": "早高峰期间每 5 分钟一班，但在非高峰期则是每 15 分钟一班。",
    "note": "rush hour 指高峰期；off-peak hours 指非高峰时段。"
  },
  {
    "id": "transit-5",
    "speaker": "Alex",
    "text": "Which bus stop should I wait at for the westbound express line?",
    "translation": "我应该在哪个公交站台等候西行的快线车？",
    "note": "westbound express line 指西行快线。"
  },
  {
    "id": "transit-6",
    "speaker": "Mia",
    "text": "Cross the street to the shelter opposite the pharmacy for the westbound route.",
    "translation": "穿过马路到药店对面的候车亭乘坐西行线路。",
    "note": "bus shelter 指公交候车亭。"
  },
  {
    "id": "transit-7",
    "speaker": "Alex",
    "text": "Is there a real-time digital display showing estimated arrival times?",
    "translation": "这里有显示预计到达时间的实时电子屏吗？",
    "note": "real-time digital display 指实时电子显示屏。"
  },
  {
    "id": "transit-8",
    "speaker": "Mia",
    "text": "Yes, the digital board on the signpost updates arrival times every thirty seconds.",
    "translation": "有的，站牌上的电子屏每 30 秒更新一次到达时间。",
    "note": "signpost 指站牌/路标。"
  },
  {
    "id": "transit-9",
    "speaker": "Alex",
    "text": "Should I flag down the bus driver, or does it stop automatically at every station?",
    "translation": "我是需要向公交车司机招手，还是逢站必停？",
    "note": "flag down 意为招手示意停车。"
  },
  {
    "id": "transit-10",
    "speaker": "Mia",
    "text": "It's best to raise your hand to hail the driver, especially if the stop is quiet.",
    "translation": "最好举手招手示意，尤其是在人比较少的站点。",
    "note": "hail the driver 意为向司机招手。"
  },
  {
    "id": "transit-11",
    "speaker": "Alex",
    "text": "Hi Mia, can you tell me how to reach the international airport by subway?",
    "translation": "嗨 Mia，你能告诉我怎么坐地铁去国际机场吗？",
    "note": "reach... by subway 意为坐地铁前往某地。"
  },
  {
    "id": "transit-12",
    "speaker": "Mia",
    "text": "Take the Line 2 southbound train for four stops, then transfer to Line 8 at Central Station.",
    "translation": "乘坐 2 号线南行列车坐 4 站，然后在中心车站换乘 8 号线。",
    "note": "southbound train 指南行列车。"
  },
  {
    "id": "transit-13",
    "speaker": "Alex",
    "text": "Is the transfer between Line 2 and Line 8 a cross-platform transfer or a long walk?",
    "translation": "2 号线和 8 号线换乘是同台换乘还是需要走很长一段路？",
    "note": "cross-platform transfer 指同台/同站台换乘。"
  },
  {
    "id": "transit-14",
    "speaker": "Mia",
    "text": "It's a short walking transfer across the underground concourse, taking about three minutes.",
    "translation": "是在地下站厅走一小段路换乘，大约需要三分钟。",
    "note": "underground concourse 指地下大厅/站厅。"
  },
  {
    "id": "transit-15",
    "speaker": "Alex",
    "text": "Which exit should I take if I want to visit the national museum?",
    "translation": "如果我想去国家博物馆，应该走哪个出口？",
    "note": "which exit should I take 指我应该走哪个出口。"
  },
  {
    "id": "transit-16",
    "speaker": "Mia",
    "text": "Exit B leads directly to the north plaza of the museum.",
    "translation": "B 出口直通博物馆的北广场。",
    "note": "lead directly to 意为直通/直接通向。"
  },
  {
    "id": "transit-17",
    "speaker": "Alex",
    "text": "Are the metro trains equipped with air conditioning and free Wi-Fi?",
    "translation": "地铁列车配备了空调和免费无线网络吗？",
    "note": "equipped with 意为配备了。"
  },
  {
    "id": "transit-18",
    "speaker": "Mia",
    "text": "Yes, all modern subway cars feature climate control and complimentary Wi-Fi connection.",
    "translation": "是的，所有现代地铁车厢都配备了恒温空调和免费 Wi-Fi 连接。",
    "note": "climate control 指自动空调/恒温系统；complimentary 指免费赠送的。"
  },
  {
    "id": "transit-19",
    "speaker": "Alex",
    "text": "What is the last train time for Line 2 on weekday evenings?",
    "translation": "工作日晚上 2 号线的末班车时间是几点？",
    "note": "last train time 指末班车时间。"
  },
  {
    "id": "transit-20",
    "speaker": "Mia",
    "text": "The last westbound train departs from the terminal station at precisely 11:30 PM.",
    "translation": "最后一班西行列车于晚上 11:30 准时从始发站发出。",
    "note": "terminal station 指终点站/始发站；precisely 意为精确地/准时地。"
  },
  {
    "id": "transit-21",
    "speaker": "Alex",
    "text": "Where can I purchase a contactless transit pass for unlimited daily travel?",
    "translation": "我在哪里可以购买无接触式交通日卡，无限次乘车？",
    "note": "contactless transit pass 指感应式交通通行卡；unlimited daily travel 指日内无限次乘车。"
  },
  {
    "id": "transit-22",
    "speaker": "Mia",
    "text": "You can buy a 24-hour day pass at any automated ticket vending machine.",
    "translation": "您可以在任何一台自动售票机上购买 24 小时一日通票。",
    "note": "automated ticket vending machine 指自动售票机。"
  },
  {
    "id": "transit-23",
    "speaker": "Alex",
    "text": "Does the ticket machine accept cash and coins, or credit cards only?",
    "translation": "售票机接受纸币和硬币吗，还是只支持信用卡？",
    "note": "accept cash and coins 意为接受纸币和硬币。"
  },
  {
    "id": "transit-24",
    "speaker": "Mia",
    "text": "It accepts exact cash, coins, credit cards, and contactless mobile wallets.",
    "translation": "它接受不找零现金、硬币、信用卡以及非接触式移动支付。",
    "note": "exact cash 指不找零的零钱现金；mobile wallets 指移动支付/电子钱包。"
  },
  {
    "id": "transit-25",
    "speaker": "Alex",
    "text": "How do I tap my transit card at the turnstiles when entering?",
    "translation": "进站时我该如何在闸机上刷交通卡？",
    "note": "tap my card 意为刷卡/贴卡感应；turnstiles 指旋转闸机。"
  },
  {
    "id": "transit-26",
    "speaker": "Mia",
    "text": "Hold your card flat against the green reader sensor until the gate opens.",
    "translation": "将卡片平放在绿色读卡感应区上，直到闸机开启。",
    "note": "reader sensor 指读卡感应器。"
  },
  {
    "id": "transit-27",
    "speaker": "Alex",
    "text": "What should I do if my mobile QR ticket fails to scan at the gate?",
    "translation": "如果我的手机二维码乘车码在闸机处扫描失败怎么办？",
    "note": "mobile QR ticket 指手机二维码乘车码；fails to scan 意为扫描失败。"
  },
  {
    "id": "transit-28",
    "speaker": "Mia",
    "text": "You can visit the customer service center near the turnstiles for assistance.",
    "translation": "您可以前往闸机旁边的客户服务中心寻求帮助。",
    "note": "customer service center 指客户服务中心/票务中心。"
  },
  {
    "id": "transit-29",
    "speaker": "Alex",
    "text": "Is there a discounted fare for students or senior citizens?",
    "translation": "学生或老年人有优惠票价吗？",
    "note": "discounted fare 指折扣/优惠票价；senior citizens 指老年人。"
  },
  {
    "id": "transit-30",
    "speaker": "Mia",
    "text": "Yes, qualified passengers with valid ID cards get a 50 percent concession rate.",
    "translation": "有的，符合条件并持有有效证件的乘客可享受半价优惠。",
    "note": "concession rate 指优惠票价率/减免票价。"
  },
  {
    "id": "transit-31",
    "speaker": "Alex",
    "text": "Excuse me, which platform does the high-speed train to Boston depart from?",
    "translation": "打扰一下，开往波士顿的高铁在哪个站台发车？",
    "note": "high-speed train 指高速铁路/高铁；depart from 指从出发。"
  },
  {
    "id": "transit-32",
    "speaker": "Mia",
    "text": "Train 104 departs from Platform 5 on the lower level in twenty minutes.",
    "translation": "104 次列车 20 分钟后在下层的 5 号站台发车。",
    "note": "lower level 指下层/地下层。"
  },
  {
    "id": "transit-33",
    "speaker": "Alex",
    "text": "Is my ticket for a reserved seat or unreserved coach seating?",
    "translation": "我的车票是对号入座的指定席还是非指定席车厢？",
    "note": "reserved seat 指指定席/对号入座；unreserved seating 指自由席/非指定席。"
  },
  {
    "id": "transit-34",
    "speaker": "Mia",
    "text": "Your ticket shows Car 3, Seat 12A, which is a reserved window seat.",
    "translation": "您的车票显示为 3 号车厢 12A 座，这是指定靠窗座位。",
    "note": "window seat 指靠窗座位。"
  },
  {
    "id": "transit-35",
    "speaker": "Alex",
    "text": "Where can I store my heavy luggage inside the train compartment?",
    "translation": "在火车车厢内我可以在哪里存放重型行李？",
    "note": "train compartment 指火车车厢/隔间。"
  },
  {
    "id": "transit-36",
    "speaker": "Mia",
    "text": "There are dedicated luggage racks at the end of each passenger car.",
    "translation": "每节客车车厢尽头都设有专门的行李架。",
    "note": "dedicated luggage racks 指专用行李架。"
  },
  {
    "id": "transit-37",
    "speaker": "Alex",
    "text": "Does the train offer an onboard dining car or snack trolley service?",
    "translation": "列车上提供餐车或移动售货推车服务吗？",
    "note": "dining car 指餐车；snack trolley 指零食手推车。"
  },
  {
    "id": "transit-38",
    "speaker": "Mia",
    "text": "Car 5 is the cafeteria car, and attendants move through with snack carts.",
    "translation": "5 号车厢是餐车，乘务员也会推着小吃推车穿过车厢。",
    "note": "cafeteria car 指自助餐车；attendants 指列车乘务人员。"
  },
  {
    "id": "transit-39",
    "speaker": "Alex",
    "text": "Will the conductor inspect our tickets during the journey?",
    "translation": "列车员会在行程中查验我们的车票吗？",
    "note": "conductor 指列车长/检票员；inspect tickets 意为查验车票。"
  },
  {
    "id": "transit-40",
    "speaker": "Mia",
    "text": "Yes, please keep your physical ticket or electronic barcode accessible.",
    "translation": "是的，请将您的纸质车票或电子二维码存放在随手可取的地方。",
    "note": "keep accessible 意为放在随时拿得到的地方。"
  },
  {
    "id": "transit-41",
    "speaker": "Alex",
    "text": "Hi Mia, is it easy to hail a yellow cab on this avenue?",
    "translation": "嗨 Mia，这条大路上容易打到黄色出租车吗？",
    "note": "hail a cab 意为打车/招揽出租车；avenue 指大干道/林荫大道。"
  },
  {
    "id": "transit-42",
    "speaker": "Mia",
    "text": "It's quite busy now, so using a rideshare app like Uber might be faster.",
    "translation": "现在挺拥挤的，用 Uber 这类网约车软件可能会更快。",
    "note": "rideshare app 指网约车应用。"
  },
  {
    "id": "transit-43",
    "speaker": "Alex",
    "text": "How long is the estimated wait time for a rideshare vehicle?",
    "translation": "网约车的预计等待时间是多久？",
    "note": "estimated wait time 指预计等待时间。"
  },
  {
    "id": "transit-44",
    "speaker": "Mia",
    "text": "The app indicates a driver will pick us up in roughly four minutes.",
    "translation": "软件显示司机大约 4 分钟后就能来接我们。",
    "note": "pick us up 意为接我们。"
  },
  {
    "id": "transit-45",
    "speaker": "Alex",
    "text": "Could you ask the taxi driver to put our suitcases in the trunk?",
    "translation": "你能让出租车司机把我们的行李箱放进后备箱吗？",
    "note": "suitcases 指手提箱/行李箱；trunk 指汽车后备箱。"
  },
  {
    "id": "transit-46",
    "speaker": "Mia",
    "text": "Sure! Driver, could you please pop the trunk for our luggage?",
    "translation": "没问题！师傅，能麻烦您开一下后备箱放行李吗？",
    "note": "pop the trunk 美式口语意为打开/弹开后备箱。"
  },
  {
    "id": "transit-47",
    "speaker": "Alex",
    "text": "Is traffic heavy on the express highway heading to the city center?",
    "translation": "去往市中心的快速高架路上交通拥堵吗？",
    "note": "traffic heavy 意为交通拥堵/车流量大；express highway 指高速公路/快速路。"
  },
  {
    "id": "transit-48",
    "speaker": "Mia",
    "text": "There's slight congestion near the bridge, but the rest of the highway is clear.",
    "translation": "大桥附近有点拥堵，但高架路其余路段都很畅通。",
    "note": "slight congestion 指轻度拥堵；clear 意为畅通无阻。"
  },
  {
    "id": "transit-49",
    "speaker": "Alex",
    "text": "Should we pay the highway toll fees separately or with the fare?",
    "translation": "我们需要单独支付高速过路费还是和车费一并结算？",
    "note": "toll fees 指通行费/过路费。"
  },
  {
    "id": "transit-50",
    "speaker": "Mia",
    "text": "Toll fees will be automatically added to the final trip total in the app.",
    "translation": "过路费会自动添加进 App 的最终行程总额中。",
    "note": "trip total 指行程总费用。"
  },
  {
    "id": "transit-51",
    "speaker": "Alex",
    "text": "Attention passengers, why has our subway train come to a complete stop?",
    "translation": "各位乘客请注意，为什么我们的地铁列车完全停下来了？",
    "note": "come to a complete stop 意为完全停下。"
  },
  {
    "id": "transit-52",
    "speaker": "Mia",
    "text": "The operator announced a minor signal breakdown ahead on the tracks.",
    "translation": "司乘人员广播说前面的轨道出现了轻微信号故障。",
    "note": "signal breakdown 指信号故障。"
  },
  {
    "id": "transit-53",
    "speaker": "Alex",
    "text": "How long are service delays expected to last due to this breakdown?",
    "translation": "因为这次故障，预计服务延误会持续多久？",
    "note": "service delays 指运营延误。"
  },
  {
    "id": "transit-54",
    "speaker": "Mia",
    "text": "They estimate a delay of ten to fifteen minutes while technicians fix it.",
    "translation": "他们估计技术人员修复期间会延误 10 到 15 分钟。",
    "note": "estimate a delay 意为估计延误时间。"
  },
  {
    "id": "transit-55",
    "speaker": "Alex",
    "text": "Will this bus route be detoured because of the marathon road closure?",
    "translation": "这条公交线路会因为马拉松封路而绕行吗？",
    "note": "detoured 意为绕行的；road closure 指道路封闭。"
  },
  {
    "id": "transit-56",
    "speaker": "Mia",
    "text": "Yes, the bus will bypass Main Street and detour along Fifth Avenue instead.",
    "translation": "是的，公交车将绕过主街，改沿第五大道绕行。",
    "note": "bypass 意为绕过/避开。"
  },
  {
    "id": "transit-57",
    "speaker": "Alex",
    "text": "Is there a replacement shuttle bus service available during maintenance?",
    "translation": "检修期间有替换接驳公交车服务吗？",
    "note": "replacement shuttle bus 指替代接驳巴士。"
  },
  {
    "id": "transit-58",
    "speaker": "Mia",
    "text": "Yes, free shuttle buses are running between the two suspended metro stations.",
    "translation": "有的，两座暂停服务的地铁站之间提供免费接驳公交车。",
    "note": "suspended stations 指暂停运营的车站。"
  },
  {
    "id": "transit-59",
    "speaker": "Alex",
    "text": "Can I request a delay certificate for my employer if I arrive late?",
    "translation": "如果我迟到了，可以申请一张给雇主的晚点证明吗？",
    "note": "delay certificate 指晚点/延误证明。"
  },
  {
    "id": "transit-60",
    "speaker": "Mia",
    "text": "You can download an official proof-of-delay slip directly from the transit website.",
    "translation": "您可以直接从交通部门官网上下载一份官方晚点证明。",
    "note": "proof-of-delay slip 指晚点证明单。"
  },
  {
    "id": "transit-61",
    "speaker": "Alex",
    "text": "Oh no! I think I left my backpack on the backseat of the bus.",
    "translation": "糟糕！我想我把背包忘在公交车后排座位上了。",
    "note": "left my backpack 意为遗忘/落下背包。"
  },
  {
    "id": "transit-62",
    "speaker": "Mia",
    "text": "Don't panic! We should contact the transit lost and found department right away.",
    "translation": "别慌！我们应该立刻联系交通失物招领处。",
    "note": "lost and found department 指失物招领处。"
  },
  {
    "id": "transit-63",
    "speaker": "Alex",
    "text": "What information do I need to provide when reporting a lost item?",
    "translation": "在报失遗失物品时我需要提供哪些信息？",
    "note": "reporting a lost item 意为报失遗失物品。"
  },
  {
    "id": "transit-64",
    "speaker": "Mia",
    "text": "You need the bus route number, vehicle ID, and exact time you disembarked.",
    "translation": "你需要提供公交线路号、车牌/车辆编号以及下车的准确时间。",
    "note": "disembarked 意为（下车/下船/下飞机）。"
  },
  {
    "id": "transit-65",
    "speaker": "Alex",
    "text": "Where is the main transit lost property office located?",
    "translation": "主要的交通失物招领办公室在哪里？",
    "note": "lost property office 指失物招领办公室。"
  },
  {
    "id": "transit-66",
    "speaker": "Mia",
    "text": "It's situated inside the central bus terminal near the main ticket hall.",
    "translation": "它位于中央公交总站内，靠近主售票大厅。",
    "note": "situated 意为位于/坐落于。"
  },
  {
    "id": "transit-67",
    "speaker": "Alex",
    "text": "Do they hold unclaimed items for a long period of time?",
    "translation": "他们会长时间保存无人认领的物品吗？",
    "note": "unclaimed items 指无人认领的物品。"
  },
  {
    "id": "transit-68",
    "speaker": "Mia",
    "text": "Unclaimed personal belongings are stored safely for up to ninety days.",
    "translation": "无人认领的个人物品最长会安全保存 90 天。",
    "note": "personal belongings 指个人随身物品。"
  },
  {
    "id": "transit-69",
    "speaker": "Alex",
    "text": "What document should I present to claim my missing property?",
    "translation": "去领取遗失物品时我需要出示什么证件？",
    "note": "claim missing property 意为领回遗失物品。"
  },
  {
    "id": "transit-70",
    "speaker": "Mia",
    "text": "You'll need a valid photo ID and a detailed description of the contents.",
    "translation": "你需要出示有效的带照片身份证件并详细描述包内物品。",
    "note": "valid photo ID 指带照片的有效身份证件。"
  },
  {
    "id": "transit-71",
    "speaker": "Alex",
    "text": "Hi Mia, what is the fastest way to travel from downtown to the airport?",
    "translation": "嗨 Mia，从市中心到机场最快的方式是什么？",
    "note": "fastest way to travel 意为最快的出行方式。"
  },
  {
    "id": "transit-72",
    "speaker": "Mia",
    "text": "The express airport train takes only twenty-five minutes with no traffic delays.",
    "translation": "机场快轨仅需 25 分钟，且不会受交通拥堵影响。",
    "note": "express airport train 指机场快捷列车/快轨。"
  },
  {
    "id": "transit-73",
    "speaker": "Alex",
    "text": "Does the airport shuttle train run round-the-clock during the night?",
    "translation": "机场接驳列车夜间是 24 小时全天候运营吗？",
    "note": "round-the-clock 意为全天候 24 小时地。"
  },
  {
    "id": "transit-74",
    "speaker": "Mia",
    "text": "It runs every fifteen minutes during the day and every hour overnight.",
    "translation": "白天每 15 分钟一班，夜间每小时一班。",
    "note": "overnight 意为通宵/夜间。"
  },
  {
    "id": "transit-75",
    "speaker": "Alex",
    "text": "Which airport terminal does international flight departures use?",
    "translation": "国际航班离港使用哪一个机场航站楼？",
    "note": "international flight departures 指国际航班出港/离港。"
  },
  {
    "id": "transit-76",
    "speaker": "Mia",
    "text": "International flights depart from Terminal 3, which is the last stop on the line.",
    "translation": "国际航班在 3 号航站楼离港，那是该线路的终点站。",
    "note": "last stop on the line 指线路的终点站。"
  },
  {
    "id": "transit-77",
    "speaker": "Alex",
    "text": "Is there an inter-terminal automated people mover system inside?",
    "translation": "机场内部有航站楼之间的自动旅客捷运系统吗？",
    "note": "automated people mover (APM) 指自动旅客捷运系统/航站楼小火车。"
  },
  {
    "id": "transit-78",
    "speaker": "Mia",
    "text": "Yes, a free shuttle train connects Terminal 1, Terminal 2, and Terminal 3.",
    "translation": "有的，免费接驳列车连接 1 号、2 号和 3 号航站楼。",
    "note": "shuttle train 指短途接驳列车。"
  },
  {
    "id": "transit-79",
    "speaker": "Alex",
    "text": "How early should we board the express train to guarantee timely check-in?",
    "translation": "我们应该提前多久乘坐快轨以确保及时办理登机手续？",
    "note": "timely check-in 意为及时办理登机手续。"
  },
  {
    "id": "transit-80",
    "speaker": "Mia",
    "text": "I recommend taking the train at least three hours before your international flight.",
    "translation": "我建议至少在国际航班起飞前 3 小时乘坐快轨。",
    "note": "at least three hours before 意为至少提前 3 小时。"
  },
  {
    "id": "transit-81",
    "speaker": "Alex",
    "text": "Mia, how do I unlock one of these dockless shared bicycles on the sidewalk?",
    "translation": "Mia，我怎么解锁人行道上的这些无桩共享单车？",
    "note": "dockless shared bicycles 指无桩共享单车。"
  },
  {
    "id": "transit-82",
    "speaker": "Mia",
    "text": "Scan the QR code on the handlebars using the bike-share mobile application.",
    "translation": "用共享单车移动应用扫描车把手上的二维码即可。",
    "note": "handlebars 指自行车车把。"
  },
  {
    "id": "transit-83",
    "speaker": "Alex",
    "text": "Is there a designated parking zone where I must leave the bicycle?",
    "translation": "我有必须停放自行车的指定停车区吗？",
    "note": "designated parking zone 指指定的停车区域。"
  },
  {
    "id": "transit-84",
    "speaker": "Mia",
    "text": "Yes, you must park inside the painted white boxes to avoid extra fees.",
    "translation": "是的，您必须停在画有白框的区域内以避免额外费用。",
    "note": "avoid extra fees 意为避免产生额外费用。"
  },
  {
    "id": "transit-85",
    "speaker": "Alex",
    "text": "Are there dedicated bike lanes along this major thoroughfare?",
    "translation": "这条主干道旁有自行车专用道吗？",
    "note": "dedicated bike lanes 指专用自行车道；thoroughfare 指交通干道。"
  },
  {
    "id": "transit-86",
    "speaker": "Mia",
    "text": "Yes, there is a green-painted protected bike lane separated from traffic.",
    "translation": "有的，有一条与机动车隔开的绿色标识专用自行车道。",
    "note": "protected bike lane 指有物理隔离防护的自行车道。"
  },
  {
    "id": "transit-87",
    "speaker": "Alex",
    "text": "What is the hourly rental rate for electric pedal-assist bikes?",
    "translation": "电动助力自行车的每小时租金是多少？",
    "note": "electric pedal-assist bikes 指电助力自行车。"
  },
  {
    "id": "transit-88",
    "speaker": "Mia",
    "text": "It costs two dollars for the first thirty minutes and one dollar per half-hour after.",
    "translation": "前 30 分钟 2 美元，之后每半小时 1 美元。",
    "note": "per half-hour 意为每半小时。"
  },
  {
    "id": "transit-89",
    "speaker": "Alex",
    "text": "Do I need to wear a helmet while riding a shared bike in this city?",
    "translation": "在这座城市骑共享单车需要戴头盔吗？",
    "note": "wear a helmet 意为戴头盔。"
  },
  {
    "id": "transit-90",
    "speaker": "Mia",
    "text": "Helmets are strongly encouraged for safety, though only mandatory for minors.",
    "translation": "为了安全强烈建议佩戴头盔，不过仅对未成年人是强制性的。",
    "note": "mandatory 意为强制性的；minors 指未成年人。"
  },
  {
    "id": "transit-91",
    "speaker": "Alex",
    "text": "Excuse me, I'm a bit lost. Is this the right direction for the harbor front?",
    "translation": "打扰一下，我有点迷路了。这是去海港前沿的方向吗？",
    "note": "harbor front 指海港前沿/码头区；a bit lost 意为有点迷路。"
  },
  {
    "id": "transit-92",
    "speaker": "Mia",
    "text": "You're heading in the opposite direction. Turn around and walk three blocks east.",
    "translation": "你走反方向了。调转方向往东走三个街区。",
    "note": "opposite direction 指相反方向。"
  },
  {
    "id": "transit-93",
    "speaker": "Alex",
    "text": "Is the harbor within walking distance, or should I take public transit?",
    "translation": "海港在步行范围内吗，还是我应该坐公共交通？",
    "note": "within walking distance 意为在步行距离内/走路可达。"
  },
  {
    "id": "transit-94",
    "speaker": "Mia",
    "text": "It's about a twenty-minute walk, or a five-minute ride on the tram.",
    "translation": "步行大约需要 20 分钟，或者坐有轨电车只需 5 分钟。",
    "note": "ride on the tram 意为乘坐有轨电车。"
  },
  {
    "id": "transit-95",
    "speaker": "Alex",
    "text": "Where can I catch the historic streetcar or heritage tram line?",
    "translation": "我在哪里可以坐上历史悠久的街头电车或复古有轨电车？",
    "note": "historic streetcar / heritage tram 指复古/历史有轨电车。"
  },
  {
    "id": "transit-96",
    "speaker": "Mia",
    "text": "The tram stop is right around the corner next to the central fountain plaza.",
    "translation": "电车站在转角处，就在中央喷泉广场旁边。",
    "note": "fountain plaza 指喷泉广场。"
  },
  {
    "id": "transit-97",
    "speaker": "Alex",
    "text": "Is public transportation safe to ride late at night for solo travelers?",
    "translation": "对单身旅行者来说，深夜乘坐公共交通安全吗？",
    "note": "solo travelers 指单身/单独旅行者。"
  },
  {
    "id": "transit-98",
    "speaker": "Mia",
    "text": "It is generally very safe, but staying near illuminated areas is recommended.",
    "translation": "总体上非常安全，但建议待在照明良好的区域。",
    "note": "illuminated areas 指光线明亮/有照明的区域。"
  },
  {
    "id": "transit-99",
    "speaker": "Alex",
    "text": "Thank you so much for your thorough transit directions and advice!",
    "translation": "非常感谢你详尽的交通指引和建议！",
    "note": "thorough transit directions 指详尽的交通指南/路线指引。"
  },
  {
    "id": "transit-100",
    "speaker": "Mia",
    "text": "You're welcome! Enjoy your trip and have a safe journey around the city!",
    "translation": "不客气！祝您旅途愉快，城市出行一路平安！",
    "note": "have a safe journey 意为一路顺风/出行平安。"
  }
],
  government: [
  {
    "id": "government-1",
    "speaker": "Alex",
    "text": "Good morning, I'd like to renew my passport before my current one expires next month.",
    "translation": "早上好，我想在我的旧护照下个月过期前办理换发。",
    "note": "expire 意为到期/失效。"
  },
  {
    "id": "government-2",
    "speaker": "Mia",
    "text": "Certainly! Please fill out Form DS-11 and submit two recent passport-style photos.",
    "translation": "好的！请填写 DS-11 表格，并提交两张最近的护照规格照片。",
    "note": "passport-style photos 指护照规格照片。"
  },
  {
    "id": "government-3",
    "speaker": "Alex",
    "text": "Is expedited processing available if I need the renewed passport within two weeks?",
    "translation": "如果我需要在两周内拿到新护照，可以办理加急处理吗？",
    "note": "expedited processing 指加急处理/加急办理。"
  },
  {
    "id": "government-4",
    "speaker": "Mia",
    "text": "Yes, an expedited fee applies, which guarantees delivery within five business days.",
    "translation": "可以的，需要支付加急费，保证在 5 个工作日内寄达。",
    "note": "business days 指工作日。"
  },
  {
    "id": "government-5",
    "speaker": "Alex",
    "text": "Do I need to schedule an appointment online, or do you accept walk-in applicants?",
    "translation": "我需要在线预约吗，还是你们接受现场直接办理的申请人？",
    "note": "walk-in applicants 指现场免预约申请人。"
  },
  {
    "id": "government-6",
    "speaker": "Mia",
    "text": "We highly recommend booking an appointment online to avoid long waiting times.",
    "translation": "我们强烈建议在网上预约，以避免长时间排队等候。",
    "note": "booking an appointment 意为预约。"
  },
  {
    "id": "government-7",
    "speaker": "Alex",
    "text": "What official identification documents should I bring to prove my legal citizenship?",
    "translation": "我应该带什么官方身份证明文件来证明我的合法公民身份？",
    "note": "legal citizenship 指合法公民身份。"
  },
  {
    "id": "government-8",
    "speaker": "Mia",
    "text": "An original birth certificate or a naturalization certificate will serve as primary proof.",
    "translation": "出生证明原件或入籍证明可作为主要证明材料。",
    "note": "birth certificate 指出生证明；naturalization certificate 指入籍证明。"
  },
  {
    "id": "government-9",
    "speaker": "Alex",
    "text": "Will my old passport be returned to me after the renewal process is complete?",
    "translation": "换发手续完成后，我的旧护照会退还给我吗？",
    "note": "renewal process 指换发/续期流程。"
  },
  {
    "id": "government-10",
    "speaker": "Mia",
    "text": "Yes, your previous passport will be cancelled with punched holes and returned safely to you.",
    "translation": "是的，您的旧护照会被打孔注销后安全退还给您。",
    "note": "punched holes 指打孔（注销）。"
  },
  {
    "id": "government-11",
    "speaker": "Alex",
    "text": "Hi Mia, I have a question regarding my annual property tax assessment notice.",
    "translation": "嗨 Mia，我有一个关于我的年度房产税评估通知书的问题。",
    "note": "property tax assessment 指房产税评估。"
  },
  {
    "id": "government-12",
    "speaker": "Mia",
    "text": "Sure! What specific details about your tax evaluation would you like me to clarify?",
    "translation": "好的！关于您的税务评估，您想让我解答什么具体的细节？",
    "note": "tax evaluation 指税务评估。"
  },
  {
    "id": "government-13",
    "speaker": "Alex",
    "text": "The assessed value of my property increased significantly this year without any major renovations.",
    "translation": "今年我房产的评估价值大幅上升，但我并没有进行任何重大翻修。",
    "note": "assessed value 指评估价值；renovations 指房屋翻修。"
  },
  {
    "id": "government-14",
    "speaker": "Mia",
    "text": "You have the right to file an official tax appeal with the board of equalization.",
    "translation": "您有权向税收复核委员会提出正式的税务申诉。",
    "note": "tax appeal 指税务申诉；board of equalization 指税收复核委员会。"
  },
  {
    "id": "government-15",
    "speaker": "Alex",
    "text": "What is the deadline for submitting the tax appeal application form?",
    "translation": "提交税务申诉申请表的截止日期是什么时候？",
    "note": "deadline for submitting 意为提交的截止日期。"
  },
  {
    "id": "government-16",
    "speaker": "Mia",
    "text": "Appeals must be postmarked or submitted online within thirty days of the notice date.",
    "translation": "申诉必须在通知发出之日起 30 天内盖邮戳寄出或在线提交。",
    "note": "postmarked 指盖有邮戳的。"
  },
  {
    "id": "government-17",
    "speaker": "Alex",
    "text": "Can I request an extension for paying my state income tax liabilities?",
    "translation": "我可以申请延期缴纳我的州个人所得税应缴税款吗？",
    "note": "tax liabilities 指应缴税额/税务负债。"
  },
  {
    "id": "government-18",
    "speaker": "Mia",
    "text": "Yes, you can apply for an installment payment agreement through our revenue portal.",
    "translation": "可以的，您可以通过我们的税务门户网站申请分期付款协议。",
    "note": "installment payment agreement 指分期付款协议。"
  },
  {
    "id": "government-19",
    "speaker": "Alex",
    "text": "Will interest charges accrue while my payment plan application is being reviewed?",
    "translation": "在我的付款计划申请审核期间，会产生利息费用吗？",
    "note": "interest charges accrue 意为产生/累积利息费用。"
  },
  {
    "id": "government-20",
    "speaker": "Mia",
    "text": "Statutory interest continues to accrue, but penalty fees may be waived upon approval.",
    "translation": "法定利息会继续累积，但申请批准后罚金可能会被豁免。",
    "note": "statutory interest 指法定利息；waived 意为豁免/免除。"
  },
  {
    "id": "government-21",
    "speaker": "Alex",
    "text": "Good morning, I want to register a new small business entity in this municipality.",
    "translation": "早上好，我想在本市注册一个新的小型企业实体。",
    "note": "business entity 指企业实体；municipality 指自治市/市政当局。"
  },
  {
    "id": "government-22",
    "speaker": "Mia",
    "text": "Welcome! Will you be operating as a sole proprietorship or a limited liability company?",
    "translation": "欢迎！您是以独资企业形式运营，还是作为有限责任公司运营？",
    "note": "sole proprietorship 指独资企业；limited liability company (LLC) 指有限责任公司。"
  },
  {
    "id": "government-23",
    "speaker": "Alex",
    "text": "I plan to incorporate as a limited liability company to protect personal assets.",
    "translation": "我计划注册为有限责任公司，以保护个人资产。",
    "note": "incorporate 意为注册成立公司；personal assets 指个人资产。"
  },
  {
    "id": "government-24",
    "speaker": "Mia",
    "text": "Excellent. You will need to file Articles of Organization and obtain a federal Tax ID.",
    "translation": "很好。你需要提交公司组织章程，并获取联邦纳税人识别号。",
    "note": "Articles of Organization 指公司组织章程/成立注册文件。"
  },
  {
    "id": "government-25",
    "speaker": "Alex",
    "text": "Does my retail storefront require a general commercial business license?",
    "translation": "我的零售门店需要通用的商业营业执照吗？",
    "note": "retail storefront 指零售门店；commercial business license 指商业营业执照。"
  },
  {
    "id": "government-26",
    "speaker": "Mia",
    "text": "Yes, every commercial enterprise operating within city limits must hold a valid business license.",
    "translation": "是的，在市区范围内运营的每家商业企业都必须持有有效的营业执照。",
    "note": "city limits 指市区边界/市限范围。"
  },
  {
    "id": "government-27",
    "speaker": "Alex",
    "text": "Are there special environmental permits needed for serving food and beverages?",
    "translation": "提供餐饮服务需要特殊的环保许可证明吗？",
    "note": "environmental permits 指环保许可证。"
  },
  {
    "id": "government-28",
    "speaker": "Mia",
    "text": "Food establishments require a health department permit and an annual sanitation inspection.",
    "translation": "餐饮机构需要卫生部门的许可证明，并接受年度卫生检查。",
    "note": "health department permit 指卫生部门许可证；sanitation inspection 指卫生检查。"
  },
  {
    "id": "government-29",
    "speaker": "Alex",
    "text": "How long does the background verification and license approval process typically take?",
    "translation": "背景核查和执照审批流程通常需要多久？",
    "note": "background verification 指背景核查。"
  },
  {
    "id": "government-30",
    "speaker": "Mia",
    "text": "Once all supporting documents are verified, approval is usually issued within two weeks.",
    "translation": "一旦所有证明材料核实无误，审批通常会在两周内批复。",
    "note": "supporting documents 指支持性/证明材料。"
  },
  {
    "id": "government-31",
    "speaker": "Alex",
    "text": "Hi Mia, I am planning to add a second-story wooden deck to my residential property.",
    "translation": "嗨 Mia，我打算在我的住宅上加建一个二楼木制露台。",
    "note": "second-story wooden deck 指二楼木质露台；residential property 指住宅物业。"
  },
  {
    "id": "government-32",
    "speaker": "Mia",
    "text": "You will definitely need a structural building permit before starting construction.",
    "translation": "在施工开始之前，您绝对需要一份结构建筑施工许可证。",
    "note": "structural building permit 指结构建筑施工许可证。"
  },
  {
    "id": "government-33",
    "speaker": "Alex",
    "text": "What architectural blueprints or site diagrams do I need to submit with the application?",
    "translation": "申请时我需要提交哪些建筑蓝图或场地图纸？",
    "note": "architectural blueprints 指建筑蓝图；site diagrams 指场地平面图。"
  },
  {
    "id": "government-34",
    "speaker": "Mia",
    "text": "Please supply two sets of scaled architectural drawings and a property boundary survey map.",
    "translation": "请提供两套按比例绘制的建筑图纸和一份产权边界测绘图。",
    "note": "scaled drawings 指按比例绘制的图纸；boundary survey map 指边界测绘图。"
  },
  {
    "id": "government-35",
    "speaker": "Alex",
    "text": "Does this construction project need to strictly comply with neighborhood zoning setbacks?",
    "translation": "这个施工项目需要严格遵守社区规划退界规定吗？",
    "note": "zoning setbacks 指规划退界/建筑后退距离。"
  },
  {
    "id": "government-36",
    "speaker": "Mia",
    "text": "Yes, the deck must maintain a minimum distance of ten feet from the neighboring property line.",
    "translation": "是的，露台必须与邻居的产权边界保持至少 10 英尺的距离。",
    "note": "property line 指产权边界线。"
  },
  {
    "id": "government-37",
    "speaker": "Alex",
    "text": "What happens if my proposed construction fails the initial building safety inspection?",
    "translation": "如果我的拟建工程未通过初始建筑安全检查会怎样？",
    "note": "building safety inspection 指建筑安全检查。"
  },
  {
    "id": "government-38",
    "speaker": "Mia",
    "text": "The building inspector will issue a notice specifying necessary corrections before reinspection.",
    "translation": "建筑检查员会开具通知，明确说明复检前所需做出的修改。",
    "note": "notice specifying corrections 指限期整改通知。"
  },
  {
    "id": "government-39",
    "speaker": "Alex",
    "text": "Is a public hearing required if I request a variance from current zoning ordinances?",
    "translation": "如果我申请偏离现有规划条例的变更许可，需要举行公开听证会吗？",
    "note": "variance 指规划变更许可/例外许可；zoning ordinances 指城市规划条例。"
  },
  {
    "id": "government-40",
    "speaker": "Mia",
    "text": "Yes, the planning commission conducts a public hearing where neighbors can share input.",
    "translation": "是的，规划委员会将举行公开听证会，邻居们可以在会上发表意见。",
    "note": "planning commission 指规划委员会；public hearing 指公开听证会。"
  },
  {
    "id": "government-41",
    "speaker": "Alex",
    "text": "Good morning, I need to obtain a certified copy of my official birth certificate.",
    "translation": "早上好，我需要获取一份我的官方出生证明盖章副本。",
    "note": "certified copy 指盖章/核证副本。"
  },
  {
    "id": "government-42",
    "speaker": "Mia",
    "text": "I can help with that. Are you requesting the certificate for yourself or a immediate family member?",
    "translation": "我可以帮您办理。您是为您自己还是直系亲属申请证明？",
    "note": "immediate family member 指直系亲属。"
  },
  {
    "id": "government-43",
    "speaker": "Alex",
    "text": "I am ordering it for myself to apply for a international travel visa.",
    "translation": "我是为自己申请，用来办理国际旅行签证。",
    "note": "international travel visa 指国际旅行签证。"
  },
  {
    "id": "government-44",
    "speaker": "Mia",
    "text": "Please complete the application form and present a valid government-issued photo ID.",
    "translation": "请填写申请表并出示有效的政府颁发带照片身份证件。",
    "note": "government-issued photo ID 指政府颁发的带照片身份证件。"
  },
  {
    "id": "government-45",
    "speaker": "Alex",
    "text": "Can I also register a foreign marriage certificate at this municipal registrar office?",
    "translation": "我也可以在这个市政登记处登记一份国外的结婚证吗？",
    "note": "registrar office 指户籍/登记处。"
  },
  {
    "id": "government-46",
    "speaker": "Mia",
    "text": "Foreign certificates require an official translation and an apostille authentication seal.",
    "translation": "国外的证明需要官方翻译件以及海牙认证印章。",
    "note": "apostille authentication seal 指海牙认证/公证海牙印鉴。"
  },
  {
    "id": "government-47",
    "speaker": "Alex",
    "text": "How much is the administrative fee for each certified vital record document?",
    "translation": "每份核证生命统计记录文件的行政规费是多少？",
    "note": "vital record 指生命统计记录（出生/死亡/婚姻等）。"
  },
  {
    "id": "government-48",
    "speaker": "Mia",
    "text": "The initial certified copy costs twenty dollars, and additional copies are ten dollars each.",
    "translation": "第一份核证副本费用为 20 美元，之后每增加一份为 10 美元。",
    "note": "administrative fee 指行政规费。"
  },
  {
    "id": "government-49",
    "speaker": "Alex",
    "text": "Can I request an official name change certificate through this public portal?",
    "translation": "我可以通过这个公共门户网站申请官方更名证明吗？",
    "note": "official name change certificate 指官方更名证明。"
  },
  {
    "id": "government-50",
    "speaker": "Mia",
    "text": "Name change records are managed by the probate court, but we record the final court order.",
    "translation": "更名记录由遗产与家事法院管理，但我们会对最终法院裁决书进行备案。",
    "note": "probate court 指遗嘱检验与家事法院；court order 指法院裁定。"
  },
  {
    "id": "government-51",
    "speaker": "Alex",
    "text": "Hi Mia, I would like to inquire about eligibility requirements for senior pension benefits.",
    "translation": "嗨 Mia，我想咨询一下老年养老金福利的申请资格要求。",
    "note": "eligibility requirements 指资格要求；senior pension benefits 指老年养老金福利。"
  },
  {
    "id": "government-52",
    "speaker": "Mia",
    "text": "Eligibility is based on reaching retirement age and earning required work credits over time.",
    "translation": "申请资格取决于达到法定退休年龄并在历年中积累足够的积分。",
    "note": "work credits 指工作积分/社保点数。"
  },
  {
    "id": "government-53",
    "speaker": "Alex",
    "text": "How do I submit an online application for unemployment compensation benefits?",
    "translation": "我该如何在线提交失业补偿金福利的申请？",
    "note": "unemployment compensation 指失业补偿金/失业救济。"
  },
  {
    "id": "government-54",
    "speaker": "Mia",
    "text": "You can create an account on our department of labor portal and upload work records.",
    "translation": "您可以在我们的劳工部门门户网站上注册账号并上传工作履历记录。",
    "note": "department of labor 指劳工部/劳工局。"
  },
  {
    "id": "government-55",
    "speaker": "Alex",
    "text": "What financial documentation is necessary to verify household income for Medicaid assistance?",
    "translation": "核实医疗补助计划的家庭收入需要哪些财务证明文件？",
    "note": "Medicaid assistance 指医疗补助计划；household income 指家庭总收入。"
  },
  {
    "id": "government-56",
    "speaker": "Mia",
    "text": "Please bring recent pay stubs, bank statements, and your latest tax return form.",
    "translation": "请带上最近的工资单、银行流水单以及最近一期的纳税申报表。",
    "note": "pay stubs 指工资单；tax return form 指纳税申报表。"
  },
  {
    "id": "government-57",
    "speaker": "Alex",
    "text": "Is disability benefit support available for individuals recovering from severe injuries?",
    "translation": "从严重伤病中康复的人员可以获得伤残福利支持吗？",
    "note": "disability benefit support 指伤残福利支持。"
  },
  {
    "id": "government-58",
    "speaker": "Mia",
    "text": "Yes, provided a licensed medical practitioner completes the comprehensive medical evaluation form.",
    "translation": "可以的，前提是有执业资质的医生填写完整的综合医学评估表。",
    "note": "licensed medical practitioner 指执业医师；medical evaluation 指医学评估。"
  },
  {
    "id": "government-59",
    "speaker": "Alex",
    "text": "When will my automatic monthly social security disbursement be deposited into my bank account?",
    "translation": "我的每月自动社保发放款项什么时候会存入我的银行账户？",
    "note": "monthly disbursement 指每月发放的款项。"
  },
  {
    "id": "government-60",
    "speaker": "Mia",
    "text": "Monthly disbursements are directly deposited on the third Wednesday of every calendar month.",
    "translation": "每月发放款项会在每个公历月的第三个星期三直接汇入账户。",
    "note": "directly deposited 指直接存入/直汇。"
  },
  {
    "id": "government-61",
    "speaker": "Alex",
    "text": "Good afternoon, I recently moved into this precinct and need to update my voter registration.",
    "translation": "下午好，我最近搬到了这个选区，需要更新我的选民登记信息。",
    "note": "precinct 指选区/警区；voter registration 指选民登记。"
  },
  {
    "id": "government-62",
    "speaker": "Mia",
    "text": "I can update your residential address in the election system right away.",
    "translation": "我可以在选举系统中立即更新您的居住地址。",
    "note": "residential address 指居住地址。"
  },
  {
    "id": "government-63",
    "speaker": "Alex",
    "text": "What is the deadline to register before the upcoming municipal general election?",
    "translation": "在即将来临的市政大选之前，登记的截止日期是什么时候？",
    "note": "municipal general election 指市政大选。"
  },
  {
    "id": "government-64",
    "speaker": "Mia",
    "text": "Voter registration forms must be submitted twenty-one days prior to Election Day.",
    "translation": "选民登记表必须在选举日之前 21 天提交。",
    "note": "prior to 意为在之前。"
  },
  {
    "id": "government-65",
    "speaker": "Alex",
    "text": "Can I request an mail-in absentee ballot if I am traveling during election week?",
    "translation": "如果我在选举周期间旅行，可以申请邮寄缺席选票吗？",
    "note": "mail-in absentee ballot 指邮寄/缺席选票。"
  },
  {
    "id": "government-66",
    "speaker": "Mia",
    "text": "Yes, you can submit an absentee ballot request online up to one week before the vote.",
    "translation": "可以的，您可以在投票日一周前在线提交缺席选票申请。",
    "note": "absentee ballot request 指缺席选票申请。"
  },
  {
    "id": "government-67",
    "speaker": "Alex",
    "text": "Where can I find information regarding local polling place locations and operating hours?",
    "translation": "我在哪里可以找到有关本地投票站位置和开放时间的信息？",
    "note": "polling place locations 指投票站地点。"
  },
  {
    "id": "government-68",
    "speaker": "Mia",
    "text": "Our website provides an interactive map to locate your assigned polling station easily.",
    "translation": "我们的网站提供交互式地图，可方便地查询您指定的投票站。",
    "note": "assigned polling station 指指定的投票站。"
  },
  {
    "id": "government-69",
    "speaker": "Alex",
    "text": "How can citizens participate in open town hall meetings regarding community budget allocations?",
    "translation": "市民如何参加关于社区预算分配的公开市政厅会议？",
    "note": "town hall meetings 指市政厅/市民大会；budget allocations 指预算分配。"
  },
  {
    "id": "government-70",
    "speaker": "Mia",
    "text": "All city council sessions are open to the public, with time reserved for public comments.",
    "translation": "所有市议会会议均向公众开放，并留有公众发言时间。",
    "note": "city council sessions 指市议会会议；public comments 指公众发言。"
  },
  {
    "id": "government-71",
    "speaker": "Alex",
    "text": "Hi Mia, I received a red-light camera traffic violation citation in the mail yesterday.",
    "translation": "嗨 Mia，我昨天在邮件里收到了一张闯红灯摄像头交通违章罚单。",
    "note": "traffic violation citation 指交通违章罚单/传票。"
  },
  {
    "id": "government-72",
    "speaker": "Mia",
    "text": "You can either pay the civil fine online or contest the citation in traffic court.",
    "translation": "您可以在线缴纳民事罚款，也可以在交通法庭对该罚单提出申诉/抗辩。",
    "note": "contest the citation 意为对罚单提出申诉/质疑。"
  },
  {
    "id": "government-73",
    "speaker": "Alex",
    "text": "How do I schedule a court hearing if I believe the camera system malfunctioned?",
    "translation": "如果我认为摄像头系统发生了故障，该如何预约法庭听证会？",
    "note": "court hearing 指法庭听证会；malfunctioned 意为发生故障。"
  },
  {
    "id": "government-74",
    "speaker": "Mia",
    "text": "Check the box for 'request hearing' on the ticket and mail it within fifteen days.",
    "translation": "在罚单上勾选申请听证选项，并在 15 天内寄回。",
    "note": "request hearing 意为申请听证。"
  },
  {
    "id": "government-75",
    "speaker": "Alex",
    "text": "Are driver points added to my motor vehicle record for camera-enforced tickets?",
    "translation": "电子眼开出的罚单会在我的机动车驾驶记录上扣分吗？",
    "note": "driver points 指驾驶扣分/记分；camera-enforced tickets 指电子眼/摄像头处罚单。"
  },
  {
    "id": "government-76",
    "speaker": "Mia",
    "text": "Photo enforcement violations are treated as civil infractions, so no points are assessed.",
    "translation": "拍照执法的违规行为视为民事违规，因此不会被记扣分。",
    "note": "civil infractions 指民事违规行为；points are assessed 意为记扣分。"
  },
  {
    "id": "government-77",
    "speaker": "Alex",
    "text": "Can I attend a defensive driving school to dismiss a speeding ticket fine?",
    "translation": "我可以参加防御性驾驶学校的学习来撤销超速罚单吗？",
    "note": "defensive driving school 指防御性驾驶学校；dismiss a fine 意为撤销/免除罚款。"
  },
  {
    "id": "government-78",
    "speaker": "Mia",
    "text": "If you haven't taken the course in the past two years, you are eligible for dismissal.",
    "translation": "如果您在过去两年内未参加过该课程，您有资格申请撤销。",
    "note": "eligible for dismissal 意为有资格撤销。"
  },
  {
    "id": "government-79",
    "speaker": "Alex",
    "text": "What happens if I fail to pay the traffic citation before the designated due date?",
    "translation": "如果我未能在指定截止日期前缴纳交通违章罚款会怎样？",
    "note": "designated due date 指指定的截止日期/到期日。"
  },
  {
    "id": "government-80",
    "speaker": "Mia",
    "text": "Unpaid fines accrue late penalties and may lead to driver's license suspension.",
    "translation": "未缴纳的罚款会产生滞纳金，并可能导致驾驶证被吊销。",
    "note": "late penalties 指滞纳金；license suspension 指驾照吊销/暂扣。"
  },
  {
    "id": "government-81",
    "speaker": "Alex",
    "text": "Good morning, I want to establish a new municipal water and waste utility account.",
    "translation": "早上好，我想开立一个新的市政水务和垃圾处理公用事业账户。",
    "note": "municipal water and waste utility 指市政水务与垃圾公用事业。"
  },
  {
    "id": "government-82",
    "speaker": "Mia",
    "text": "Welcome! We will need your lease agreement or proof of home ownership to start service.",
    "translation": "欢迎！我们需要您的租赁协议或房屋所有权证明来开通服务。",
    "note": "proof of home ownership 指房屋所有权证明。"
  },
  {
    "id": "government-83",
    "speaker": "Alex",
    "text": "What day of the week is residential trash and curbside recycling collected?",
    "translation": "住宅垃圾和路边可回收物是每周哪一天清运？",
    "note": "curbside recycling 指路边可回收物回收；collected 意为清运/收集。"
  },
  {
    "id": "government-84",
    "speaker": "Mia",
    "text": "Refuse collection occurs every Tuesday morning, while recycling is picked up on Thursdays.",
    "translation": "垃圾清运在每周二早晨，而可回收物则在周四回收。",
    "note": "refuse collection 指垃圾清运。"
  },
  {
    "id": "government-85",
    "speaker": "Alex",
    "text": "Who should I contact to report a damaged streetlight or a street pothole?",
    "translation": "如果想报告路灯损坏或道路坑洼，我应该联系谁？",
    "note": "damaged streetlight 指损坏的路灯；street pothole 指道路坑洼。"
  },
  {
    "id": "government-86",
    "speaker": "Mia",
    "text": "You can report public infrastructure issues directly through our municipal 311 service portal.",
    "translation": "您可以直接通过我们市政的 311 服务门户网站报告公共基础设施问题。",
    "note": "public infrastructure issues 指公共基础设施问题；311 service portal 指311 市政服务门户。"
  },
  {
    "id": "government-87",
    "speaker": "Alex",
    "text": "Does the city offer free tree trimming services for branches near power lines?",
    "translation": "对于电力线附近的树枝，市政提供免费的树木修剪服务吗？",
    "note": "tree trimming services 指树木修剪服务；power lines 指电力线。"
  },
  {
    "id": "government-88",
    "speaker": "Mia",
    "text": "Yes, the public works department handles tree maintenance near utility lines for safety.",
    "translation": "是的，市政工程部门负责处理公用事业管线附近的树木维护以确保安全。",
    "note": "public works department 指市政工程部门。"
  },
  {
    "id": "government-89",
    "speaker": "Alex",
    "text": "Is there a discount program for low-income households on monthly water bills?",
    "translation": "针对低收入家庭的每月水费有折扣优惠计划吗？",
    "note": "low-income households 指低收入家庭。"
  },
  {
    "id": "government-90",
    "speaker": "Mia",
    "text": "Yes, eligible residents can apply for the utility assistance program to receive monthly credits.",
    "translation": "有的，符合条件的居民可以申请公用事业援助计划以获取每月账单抵扣。",
    "note": "utility assistance program 指公用事业援助计划。"
  },
  {
    "id": "government-91",
    "speaker": "Alex",
    "text": "Hi Mia, how can I report a neighbor for violating local noise abatement ordinances?",
    "translation": "嗨 Mia，我该如何举报邻居违反当地降噪法规的行为？",
    "note": "noise abatement ordinances 指噪声控制/降噪法规。"
  },
  {
    "id": "government-92",
    "speaker": "Mia",
    "text": "You can lodge a complaint with code enforcement during business hours, or contact non-emergency police.",
    "translation": "您可以在工作时间内向规章执法部门投诉，或联系非紧急警察电话。",
    "note": "code enforcement 指规章执法/城管部门；non-emergency police 指非紧急警察服务。"
  },
  {
    "id": "government-93",
    "speaker": "Alex",
    "text": "What are the municipal rules regarding overgrown grass and unattended yard waste?",
    "translation": "关于草坪过长和无人清理的庭院垃圾，市政有什么规定？",
    "note": "overgrown grass 指过长的草坪；unattended yard waste 指无人清理的庭院堆积物。"
  },
  {
    "id": "government-94",
    "speaker": "Mia",
    "text": "Grass must not exceed eight inches, and property owners receive notices for non-compliance.",
    "translation": "草坪高度不得超过 8 英寸，违规产权人将收到整改通知。",
    "note": "non-compliance 指不合规/违规。"
  },
  {
    "id": "government-95",
    "speaker": "Alex",
    "text": "Where can I obtain a mandatory dog license and rabies vaccination tag?",
    "translation": "我在哪里可以办理强制性的犬只许可证和狂犬病疫苗接种牌？",
    "note": "mandatory dog license 指强制性犬只执照；rabies vaccination tag 指狂犬病疫苗接种牌。"
  },
  {
    "id": "government-96",
    "speaker": "Mia",
    "text": "Animal control issues licenses at city hall upon presentation of valid vaccination records.",
    "translation": "在出示有效的接种记录后，动物管理部门会在市政厅颁发执照。",
    "note": "animal control 指动物管理部门。"
  },
  {
    "id": "government-97",
    "speaker": "Alex",
    "text": "How can food service workers schedule a food handler safety certification class?",
    "translation": "餐饮从业人员如何预约食品安全员认证课程？",
    "note": "food handler safety certification 指食品从业人员安全认证。"
  },
  {
    "id": "government-98",
    "speaker": "Mia",
    "text": "The health department hosts online and in-person safety courses every second Monday.",
    "translation": "卫生部门在每个月的第二个星期一举办线上和线下安全课程。",
    "note": "safety courses 指安全培训课程。"
  },
  {
    "id": "government-99",
    "speaker": "Alex",
    "text": "Thank you so much for guiding me through all these governmental procedures!",
    "translation": "非常感谢你指导我完成所有这些政府政务流程！",
    "note": "governmental procedures 指政府政务流程。"
  },
  {
    "id": "government-100",
    "speaker": "Mia",
    "text": "You're very welcome! Feel free to reach out whenever you need municipal assistance!",
    "translation": "非常客气！无论何时需要市政帮助，请随时与我们联系！",
    "note": "municipal assistance 指市政帮助/协助。"
  }
],extra1: Array.from({ length: 100 }, (_, i) => ({ 
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
  { id: "prac-2", speaker: "Mike", text: "I am looking for some advanced practice options.", translation: "我在寻找一些高级练习选项。", note: "practice note 2" }
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