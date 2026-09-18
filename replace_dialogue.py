#!/usr/bin/env python3
"""Replace broken template sentences in data.ts with proper context-relevant dialogue."""

import re

def main():
    with open("lib/data.ts", "r", encoding="utf-8") as f:
        content = f.read()

    dialogues = {
        "greetings": GREETINGS,
        "travel": TRAVEL,
        "business": BUSINESS,
        "housing": HOUSING,
        "medical": MEDICAL,
        "banking": BANKING,
        "shopping": SHOPPING,
        "transit": TRANSIT,
        "government": GOVERNMENT,
        "school": SCHOOL,
    }

    for scene_name, lines in dialogues.items():
        pattern = r'    \{ id: "' + re.escape(scene_name) + r'-41"[^\n]*\n(?:    [^\n]*\n)*?    \{ id: "' + re.escape(scene_name) + r'-100"[^\n]*\n'
        replacement = build_block(scene_name, lines)
        new_content, count = re.subn(pattern, replacement, content, 1, re.DOTALL)
        if count != 1:
            print(f"ERROR: {scene_name} matched {count} times")
            return
        content = new_content

    with open("lib/data.ts", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS: Replaced all {sum(len(v) for v in dialogues.values())} broken sentences!")


def build_block(scene, lines):
    result = []
    for i, (speaker, text, translation, note) in enumerate(lines, 41):
        result.append(f'    {{ id: "{scene}-{i}", speaker: "{speaker}", text: "{escape(text)}", translation: "{escape(translation)}", note: "{escape(note)}" }},\n')
    return "".join(result)


def escape(s):
    return s.replace('\\', r'\\').replace('"', r'\"').replace('\n', ' ')


# Each scene: 60 lines of (speaker, text, translation, note)
# Topics are context-relevant to each scene

GREETINGS = [
    ("Alex","I heard you started that new book club last month.","我听说你上个月开始了一个书� club。","询问兴趣"),
    ("Mia","Yes! We just finished our third meeting. It is wonderful.","是的！我们刚完成第三次会议，非常棒。","描述进度"),
    ("Alex","What genre do you focus on? Contemporary fiction?", "我们 focus 哪种类型？当代小说吗？","询问类型"),
    ("Mia","Mostly contemporary, but we recently did a mystery novel.","大部分是当代，但最近做了一个 mystery 小说。","描述内容"),
    ("Alex","I have never joined a book club. What is the format?", "从没加入过 book club，格式是什么？","表达兴趣"),
    ("Mia","We meet weekly and discuss one chapter each time.","我们每周见面，每次讨论一章。","解释格式"),
    ("Alex","Do you vote on the next book together?", "一起 vote 下一本书吗？","询问过程"),
    ("Mia","Yes, everyone gets two nominations and we vote."," 

# This approach of writing the entire Python script with all 600 lines is 
# too unwieldy. Let me break the dialogue into separate lines in a data file.
]

TRAVEL = BUSINESS = HOUSING = MEDICAL = BANKING = SHOPPING = TRANSIT = GOVERNMENT = SCHOOL = []

if __name__ == "__main__":
    main()
