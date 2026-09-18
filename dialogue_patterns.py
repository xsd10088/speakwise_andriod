"""Dialogue patterns and vocabulary for all 10 scenes.
Each scene defines 3 sentence patterns + 20 vocabulary words = 60 dialogue lines.
Patterns use {0} as placeholder for the vocabulary word."""

# Common patterns that work across all scene types
# Format: (english_template, chinese_template, note)

P = [
    ("By the way, I wanted to ask you about {}.", "顺便问，我想问你关于{0}的事。", "询问"),
    ("Have you been to {} recently?", "你最近去过{0}吗？", "询问体验"),
    ("I think {} is really interesting. What do you think?", "我觉得{0} 真的很有趣，你觉得呢？", "分享感想"),
    ("Excuse me, I need help with {}.", "打扰，我需要帮助解决{0}的问题。", "请求帮助"),
    ("Is {} available for booking today?", "{0} 今天有票吗？", "询问预订"),
    ("How do I get to {} from here?", "从这里怎么去{0}？", "询问路线"),
    ("Could you review the {} for me?", "能帮我 review {0} 吗？", "请求审查"),
    ("I will send the {} by noon today.", "我今天中午前会发送{0}。", "承诺发送"),
    ("When should I submit the {}?", "我应该什么时候提交{0}？", "询问截期"),
    ("I need to report an issue with the {}.", "我需要报告{0}的问题。", "报告问题"),
    ("Is the {} covered under the lease?", "{0}在租约中有覆盖吗？", "询问保障"),
    ("Can I schedule a time to inspect the {}?", "能安排检查{0}的时间吗？", "请求预约"),
    ("I have been experiencing symptoms with {}.", "最近有{0}的症状。", "描述症状"),
    ("Is the {} normally available?", "{0}一般有吗？", "询问可用性"),
    ("How long should I wait for {}?", "等待{0}需要多久？", "询问时间"),
    ("I would like to inquire about {}.", "我想咨询{0}。", "询问业务"),
    ("Is the {} included in the package?", "{0}包含在套餐中吗？", "询问包含"),
    ("Can I set up {} online?", "我可以在线设置{0}吗？", "询问服务"),
    ("I need to return this item because of {}.", "我需要退货，因为{0}。", "描述退货"),
    ("Is the {} covered under warranty?", "{0}在保修期内吗？", "询问保障"),
    ("Can I exchange this for a different {}?", "能换成不同{0}吗？", "请求换货"),
    ("I lost my item near the {}.", "我在{0}附近丢失了物品。", "报告失物"),
    ("Is the {} still valid for today?", "{0}今天还有效吗？", "询问有效性"),
    ("How do I get a refund for {}?", "怎么退{0}的钱？", "询问退款"),
    ("I need to apply for a new {}.", "我需要申请新{0}。", "请求服务"),
    ("Is the {} available for online processing?", "{0}可以在线处理吗？", "询问便利"),
    ("Can I renew my {} via mobile app?", "我可以通过手机app续期{0}吗？", "询问服务"),
    ("I want to discuss my child's {}.", "想讨论孩子的{0}。", "请求会谈"),
    ("Is the {} scheduled for next week?", "{0}下周安排了吗？", "询问日程"),
    ("Can I schedule a meeting about {}?", "能安排关于{0}的会面吗？", "请求会面"),
]
