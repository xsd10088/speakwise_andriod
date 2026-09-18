#!/usr/bin/env python3
"""Replace broken template sentences in data.ts with proper context dialogue."""
import re

W = {
    "daily life": "日常生活", "work": "工作", "hobbies": "爱好", "weather": "天气",
    "plans": "计划", "food": "食物", "health": "健康", "technology": "科技",
    "travel": "旅游", "studies": "学习", "flight": "航班", "hotel": "酒店",
    "sightseeing": "观光", "transport": "交通", "culture": "文化", "souvenirs": "纪念品",
    "budget": "预算", "language": "语言", "meetings": "会议", "projects": "项目",
    "deadlines": "截期", "teamwork": "团队合作", "clients": "客户", "reports": "报告",
    "strategy": "战略", "feedback": "反馈", "goals": "目标", "rent": "租金",
    "lease": "租约", "maintenance": "维修", "neighbors": "邻居", "utilities": "公共设施",
    "furnishing": "家具", "location": "位置", "amenities": "设施", "pets": "宠物",
    "symptoms": "症状", "medicine": "药", "insurance": "保险", "prescription": "处方",
    "diet": "饮食", "exercise": "运动", "recovery": "恢复", "checkup": "检查",
    "account": "账户", "card": "卡片", "loan": "贷款", "deposit": "储款",
    "investment": "投资", "interest": "利息", "credit": "信用", "price": "价格",
    "discount": "折扣", "refund": "退款", "size": "尺寸", "color": "颜色",
    "shipping": "运费", "payment": "付款", "quality": "质量", "membership": "会员",
    "bus": "公交车", "subway": "地铁", "train": "火车", "ticket": "票",
    "route": "路线", "delay": "延误", "station": "车站", "pass": "通行证",
    "ID": "身份证", "visa": "签证", "tax": "税", "license": "驾照",
    "permit": "许可证", "document": "文件", "form": "表格", "class": "班级",
    "exam": "考试", "homework": "作业", "teacher": "老师", "subject": "科目",
    "grade": "成绩", "dorm": "宿舍", "library": "图书馆", "tuition": "学费",
}

P = [
    lambda w: (f"By the way, I wanted to ask you about {w}.", "顺便问，我想问你关于" + W.get(w, w) + "的事。", "询问话题"),
    lambda w: (f"I have been thinking about {w} lately.", "我最近一直在考虑" + W.get(w, w) + "。", "表达想法"),
    lambda w: (f"Do you have any thoughts on {w}?", "你对" + W.get(w, w) + "有什么看法？", "征求意见"),
]

def main():
    with open("lib/data.ts", "r", encoding="utf-8") as f:
        c = f.read()
    for s, a, b in SCENES:
        topics = TOPIC_MAP.get(s, [])
        if not topics:
            topics = list(W.keys())[:20]
        vocab = topics[:20]
        lines = gen(P, vocab, 60)
        pat = r'    \{ id: "' + s + r'-41"[^\n]*\n(?:    [^\n]*\n)*?    \{ id: "' + s + r'-100"[^\n]*\n'
        rep = block(s, lines, a, b)
        c, n = re.subn(pat, rep, c, 1, re.DOTALL)
        print(f"  {s}: {'OK' if n==1 else 'FAIL'}")
    with open("lib/data.ts", "w", encoding="utf-8") as f:
        f.write(c)
    print("Done!")


def gen(patterns, vocab, n):
    lines = []
    for i in range(n):
        p = patterns[i % len(patterns)]
        w = vocab[i % len(vocab)]
        lines.append(p(w))
    return lines


def block(scene, lines, a, b):
    res = []
    for i, (t, tr, note) in enumerate(lines):
        sp = a if i % 2 == 0 else b
        res.append(f'    {{ id: "{scene}-{41+i}", speaker: "{sp}", text: "{esc(t)}", translation: "{esc(tr)}", note: "{esc(note)}" }},\n')
    return "".join(res)


def esc(s):
    return s.replace('\\', r'\\').replace('"', r'\\"').replace('\n', ' ').replace('\t', ' ')


TOPIC_MAP = {
    "greetings": ["weather", "food", "travel", "health", "technology", "work", "hobbies", "studies"],
    "travel": ["flight", "hotel", "sightseeing", "transport", "souvenirs", "culture", "budget", "language"],
    "business": ["meetings", "projects", "teamwork", "clients", "reports", "strategy", "feedback", "goals"],
    "housing": ["rent", "lease", "maintenance", "neighbors", "utilities", "furnishing", "location", "pets"],
    "medical": ["symptoms", "medicine", "insurance", "prescription", "diet", "exercise", "recovery", "checkup"],
    "banking": ["account", "card", "loan", "investment", "interest", "credit", "fee", "deposit"],
    "shopping": ["price", "discount", "refund", "size", "color", "shipping", "payment", "quality"],
    "transit": ["pass", "ticket", "subway", "bus", "train", "delay", "station", "route"],
    "government": ["ID", "visa", "tax", "license", "permit", "document", "form"],
    "school": ["class", "exam", "homework", "teacher", "subject", "grade", "dorm", "library"],
}

SCENES = [
    ("greetings", "Alex", "Mia"),
    ("travel", "Traveler", "Agent"),
    ("business", "Sam", "Lee"),
    ("housing", "Tenant", "Landlord"),
    ("medical", "Patient", "Doctor"),
    ("banking", "Customer", "Banker"),
    ("shopping", "Customer", "Clerk"),
    ("transit", "Passenger", "Conductor"),
    ("government", "Citizen", "Officer"),
    ("school", "Parent", "Teacher"),
]

if __name__ == "__main__":
    main()
