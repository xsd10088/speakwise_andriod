#!/usr/bin/env python3
"""Generate beginner level dialogue for greetings scene."""
import re

# 100句日常问候低难度对话数据
GREETINGS_BEGINNER = """const greetingsLinesBeginner: ListeningLine[] = [
  { id: "greetings-b-1", speaker: "Alex", text: "Hello!", translation: "你好！", note: "basic greeting" },
  { id: "greetings-b-2", speaker: "Mia", text: "Hi there!", translation: "嗨！", note: "friendly greeting" },
  { id: "greetings-b-3", speaker: "Alex", text: "Good morning.", translation: "早上好。", note: "morning greeting" },
  { id: "greetings-b-4", speaker: "Mia", text: "Good afternoon.", translation: "下午好。", note: "afternoon greeting" },
  { id: "greetings-b-5", speaker: "Alex", text: "Good evening.", translation: "晚上好。", note: "evening greeting" },
  { id: "greetings-b-6", speaker: "Mia", text: "How are you?", translation: "你好吗？", note: "asking about well-being" },
  { id: "greetings-b-7", speaker: "Alex", text: "I'm fine, thanks.", translation: "我很好，谢谢。", note: "responding positively" },
  { id: "greetings-b-8", speaker: "Mia", text: "Nice to meet you.", translation: "很高兴见到你。", note: "first meeting" },
  { id: "greetings-b-9", speaker: "Alex", text: "Nice to meet you too.", translation: "我也很高兴见到你。", note: "reciprocal greeting" },
  { id: "greetings-b-10", speaker: "Mia", text: "What's your name?", translation: "你叫什么名字？", note: "asking name" },
  { id: "greetings-b-11", speaker: "Alex", text: "My name is Alex.", translation: "我叫Alex。", note: "introducing self" },
  { id: "greetings-b-12", speaker: "Mia", text: "I'm Mia.", translation: "我是Mia。", note: "introducing self" },
  { id: "greetings-b-13", speaker: "Alex", text: "How do you do?", translation: "你好（正式）。", note: "formal greeting" },
  { id: "greetings-b-14", speaker: "Mia", text: "Pleased to meet you.", translation: "很高兴认识你。", note: "polite response" },
  { id: "greetings-b-15", speaker: "Alex", text: "Welcome!", translation: "欢迎！", note: "welcoming" },
  { id: "greetings-b-16", speaker: "Mia", text: "Thank you.", translation: "谢谢。", note: "thanking" },
  { id: "greetings-b-17", speaker: "Alex", text: "You're welcome.", translation: "不客气。", note: "polite reply" },
  { id: "greetings-b-18", speaker: "Mia", text: "See you later.", translation: "回头见。", note: "saying goodbye" },
  { id: "greetings-b-19", speaker: "Alex", text: "Goodbye.", translation: "再见。", note: "farewell" },
  { id: "greetings-b-20", speaker: "Mia", text: "Have a nice day.", translation: "祝你今天愉快。", note: "well wishes" },
  { id: "greetings-b-21", speaker: "Alex", text: "How's it going?", translation: "最近怎么样？", note: "casual inquiry" },
  { id: "greetings-b-22", speaker: "Mia", text: "Pretty good.", translation: "挺好的。", note: "positive response" },
  { id: "greetings-b-23", speaker: "Alex", text: "What's up?", translation: "有什么新鲜事？", note: "casual greeting" },
  { id: "greetings-b-24", speaker: "Mia", text: "Not much.", translation: "没什么特别的。", note: "casual response" },
  { id: "greetings-b-25", speaker: "Alex", text: "Long time no see.", translation: "好久不见。", note: "reconnecting" },
  { id: "greetings-b-26", speaker: "Mia", text: "It's been a while.", translation: "确实有一阵子了。", note: "agreeing" },
  { id: "greetings-b-27", speaker: "Alex", text: "How have you been?", translation: "你最近过得怎么样？", note: "asking about life" },
  { id: "greetings-b-28", speaker: "Mia", text: "I've been busy.", translation: "我最近很忙。", note: "status update" },
  { id: "greetings-b-29", speaker: "Alex", text: "Are you okay?", translation: "你还好吗？", note: "concern" },
  { id: "greetings-b-30", speaker: "Mia", text: "I'm fine.", translation: "我没事。", note: "reassurance" },
  { id: "greetings-b-31", speaker: "Alex", text: "Glad to see you.", translation: "很高兴见到你。", note: "expressing happiness" },
  { id: "greetings-b-32", speaker: "Mia", text: "Me too.", translation: "我也是。", note: "mutual feeling" },
  { id: "greetings-b-33", speaker: "Alex", text: "Take care.", translation: "保重。", note: "well wishes" },
  { id: "greetings-b-34", speaker: "Mia", text: "You too.", translation: "你也是。", note: "reciprocal wish" },
  { id: "greetings-b-35", speaker: "Alex", text: "Cheers!", translation: "干杯！", note: "celebration" },
  { id: "greetings-b-36", speaker: "Mia", text: "Best wishes.", translation: "最美好的祝愿。", note: "well wishes" },
  { id: "greetings-b-37", speaker: "Alex", text: "How's everything?", translation: "一切都好吗？", note: "general inquiry" },
  { id: "greetings-b-38", speaker: "Mia", text: "Everything is good.", translation: "一切都好。", note: "positive status" },
  { id: "greetings-b-39", speaker: "Alex", text: "Good to see you.", translation: "见到你真好。", note: "pleasure" },
  { id: "greetings-b-40", speaker: "Mia", text: "Same here.", translation: "我也这么觉得。", note: "agreement" },
  { id: "greetings-b-41", speaker: "Alex", text: "Hello again.", translation: "又见面了。", note: "re-greeting" },
  { id: "greetings-b-42", speaker: "Mia", text: "Hi again.", translation: "又见面了。", note: "re-greeting" },
  { id: "greetings-b-43", speaker: "Alex", text: "Nice weather today.", translation: "今天天气不错。", note: "small talk" },
  { id: "greetings-b-44", speaker: "Mia", text: "Yes, it is.", translation: "是的，不错。", note: "agreeing" },
  { id: "greetings-b-45", speaker: "Alex", text: "Where are you from?", translation: "你来自哪里？", note: "asking origin" },
  { id: "greetings-b-46", speaker: "Mia", text: "I'm from China.", translation: "我来自中国。", note: "answering origin" },
  { id: "greetings-b-47", speaker: "Alex", text: "I live here.", translation: "我住在这里。", note: "stating location" },
  { id: "greetings-b-48", speaker: "Mia", text: "Me too.", translation: "我也是。", note: "commonality" },
  { id: "greetings-b-49", speaker: "Alex", text: "Who is this?", translation: "这是谁？", note: "identification" },
  { id: "greetings-b-50", speaker: "Mia", text: "It's me, Mia.", translation: "是我，Mia。", note: "self-identification" },
  { id: "greetings-b-51", speaker: "Alex", text: "Is this Alex?", translation: "是Alex吗？", note: "verification" },
  { id: "greetings-b-52", speaker: "Mia", text: "Yes, speaking.", translation: "是的，我是。", note: "confirmation" },
  { id: "greetings-b-53", speaker: "Alex", text: "May I help you?", translation: "我可以帮你吗？", note: "offering help" },
  { id: "greetings-b-54", speaker: "Mia", text: "Yes, please.", translation: "好的，麻烦了。", note: "accepting help" },
  { id: "greetings-b-55", speaker: "Alex", text: "No problem.", translation: "没问题。", note: "reassurance" },
  { id: "greetings-b-56", speaker: "Mia", text: "Thanks a lot.", translation: "非常感谢。", note: "strong thanks" },
  { id: "greetings-b-57", speaker: "Alex", text: "Anytime.", translation: "随时乐意。", note: "willingness" },
  { id: "greetings-b-58", speaker: "Mia", text: "I appreciate it.", translation: "我很感激。", note: "gratitude" },
  { id: "greetings-b-59", speaker: "Alex", text: "Don't mention it.", translation: "别客气。", note: "modesty" },
  { id: "greetings-b-60", speaker: "Mia", text: "You're the best.", translation: "你最好了。", note: "compliment" },
  { id: "greetings-b-61", speaker: "Alex", text: "Happy to help.", translation: "乐意效劳。", note: "willingness" },
  { id: "greetings-b-62", speaker: "Mia", text: "That's kind of you.", translation: "你真好。", note: "appreciation" },
  { id: "greetings-b-63", speaker: "Alex", text: "My pleasure.", translation: "这是我的荣幸。", note: "politeness" },
  { id: "greetings-b-64", speaker: "Mia", text: "Excuse me.", translation: "打扰一下。", note: "polite interruption" },
  { id: "greetings-b-65", speaker: "Alex", text: "Yes?", translation: "有什么事？", note: "response" },
  { id: "greetings-b-66", speaker: "Mia", text: "Sorry to bother.", translation: "抱歉打扰。", note: "apology" },
  { id: "greetings-b-67", speaker: "Alex", text: "It's okay.", translation: "没关系。", note: "forgiveness" },
  { id: "greetings-b-68", speaker: "Mia", text: "No worries.", translation: "别担心。", note: "reassurance" },
  { id: "greetings-b-69", speaker: "Alex", text: "That's fine.", translation: "没关系。", note: "acceptance" },
  { id: "greetings-b-70", speaker: "Mia", text: "All good.", translation: "一切都好。", note: "status confirmation" },
  { id: "greetings-b-71", speaker: "Alex", text: "Thanks anyway.", translation: "还是谢谢你。", note: "polite decline" },
  { id: "greetings-b-72", speaker: "Mia", text: "Sure thing.", translation: "当然可以。", note: "agreement" },
  { id: "greetings-b-73", speaker: "Alex", text: "Absolutely.", translation: "当然。", note: "strong agreement" },
  { id: "greetings-b-74", speaker: "Mia", text: "Definitely.", translation: "肯定的。", note: "confirmation" },
  { id: "greetings-b-75", speaker: "Alex", text: "Of course.", translation: "当然。", note: "agreement" },
  { id: "greetings-b-76", speaker: "Mia", text: "Right away.", translation: "马上。", note: "immediacy" },
  { id: "greetings-b-77", speaker: "Alex", text: "In a moment.", translation: "马上就好。", note: "time frame" },
  { id: "greetings-b-78", speaker: "Mia", text: "Just a second.", translation: "等一下。", note: "short wait" },
  { id: "greetings-b-79", speaker: "Alex", text: "Hang on.", translation: "稍等。", note: "requesting wait" },
  { id: "greetings-b-80", speaker: "Mia", text: "Okay.", translation: "好的。", note: "acknowledgment" },
  { id: "greetings-b-81", speaker: "Alex", text: "Alright.", translation: "好的。", note: "agreement" },
  { id: "greetings-b-82", speaker: "Mia", text: "Got it.", translation: "明白了。", note: "understanding" },
  { id: "greetings-b-83", speaker: "Alex", text: "I see.", translation: "我明白了。", note: "comprehension" },
  { id: "greetings-b-84", speaker: "Mia", text: "Understood.", translation: "明白了。", note: "confirmation" },
  { id: "greetings-b-85", speaker: "Alex", text: "Okay, thanks.", translation: "好的，谢谢。", note: "acknowledgment" },
  { id: "greetings-b-86", speaker: "Mia", text: "You're welcome.", translation: "不客气。", note: "polite reply" },
  { id: "greetings-b-87", speaker: "Alex", text: "See you tomorrow.", translation: "明天见。", note: "future meeting" },
  { id: "greetings-b-88", speaker: "Mia", text: "Until then.", translation: "到时候见。", note: "farewell" },
  { id: "greetings-b-89", speaker: "Alex", text: "Take it easy.", translation: "保重。", note: "casual farewell" },
  { id: "greetings-b-90", speaker: "Mia", text: "Stay safe.", translation: "注意安全。", note: "care concern" },
  { id: "greetings-b-91", speaker: "Alex", text: "Keep in touch.", translation: "保持联系。", note: "staying connected" },
  { id: "greetings-b-92", speaker: "Mia", text: "I will.", translation: "我会的。", note: "promise" },
  { id: "greetings-b-93", speaker: "Alex", text: "Talk soon.", translation: "再聊。", note: "future conversation" },
  { id: "greetings-b-94", speaker: "Mia", text: "Sounds good.", translation: "听起来不错。", note: "agreement" },
  { id: "greetings-b-95", speaker: "Alex", text: "Let's do it.", translation: "那就这么办。", note: "action" },
  { id: "greetings-b-96", speaker: "Mia", text: "Great idea.", translation: "好主意。", note: "approval" },
  { id: "greetings-b-97", speaker: "Alex", text: "Perfect.", translation: "完美。", note: "satisfaction" },
  { id: "greetings-b-98", speaker: "Mia", text: "Excellent.", translation: "太棒了。", note: "praise" },
  { id: "greetings-b-99", speaker: "Alex", text: "Wonderful.", translation: "太好了。", note: "delight" },
  { id: "greetings-b-100", speaker: "Mia", text: "Fantastic.", translation: "太棒了。", note: "enthusiasm" }
];"""

# 读取 lib/data.ts 文件
with open("lib/data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 步骤1：添加 greetingsLinesBeginner 常量定义（在 LISTENING_LINES 之后）
if "const greetingsLinesBeginner" not in content:
    insert_pattern = r'(export const LISTENING_LINES: ListeningLine\[\] = .*?\];)'
    content = re.sub(insert_pattern, r'\1\n\n' + GREETINGS_BEGINNER, content, 1, re.DOTALL)
    print("[OK] Added greetingsLinesBeginner constant")
else:
    print("[OK] greetingsLinesBeginner constant already exists")

# 步骤2：修改 SCENE_CONTENT.greetings.beginner 为 greetingsLinesBeginner
pattern = r'  greetings: \{\s*beginner: Array\.from\(\{ length: 50 \},.*?\n\s*\}\),'
replacement = '''  greetings: {
    beginner: greetingsLinesBeginner,'''

if re.search(pattern, content, re.DOTALL):
    content = re.sub(pattern, replacement, content, 1, re.DOTALL)
    print("[OK] Updated SCENE_CONTENT.greetings.beginner to use greetingsLinesBeginner")
else:
    print("[OK] SCENE_CONTENT.greetings.beginner already updated")

# 写回文件
with open("lib/data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("\n[SUCCESS] Greetings beginner dialogue generated successfully!")
print("[INFO] File updated: lib/data.ts")
print("[INFO] Total lines: 100")
print("[INFO] Max words per line: 10")
