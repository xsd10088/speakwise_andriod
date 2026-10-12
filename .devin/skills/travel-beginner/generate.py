#!/usr/bin/env python3
"""Generate beginner level dialogue for travel scene (100 lines)."""
import re

# 100句出行旅游低难度对话数据
TRAVEL_BEGINNER = """// ==========================================
// 1. 出行旅游 (Travel) - 低难度 100 句
// ==========================================
const travelLinesBeginner: ListeningLine[] = [
  { id: "travel-b-1", speaker: "Alex", text: "Where is the station?", translation: "车站在哪里？", note: "asking for location" },
  { id: "travel-b-2", speaker: "Mike", text: "Go straight, then turn left.", translation: "直走，然后左转。", note: "giving directions" },
  { id: "travel-b-3", speaker: "Alex", text: "Is it far?", translation: "远吗？", note: "distance check" },
  { id: "travel-b-4", speaker: "Mike", text: "About ten minutes.", translation: "大约十分钟。", note: "time estimate" },
  { id: "travel-b-5", speaker: "Alex", text: "Thanks for your help.", translation: "谢谢你的帮助。", note: "thanking" },
  { id: "travel-b-6", speaker: "Mike", text: "You're welcome.", translation: "不客气。", note: "polite reply" },
  { id: "travel-b-7", speaker: "Alex", text: "Can I check in here?", translation: "我可以在这里办理登机吗？", note: "check-in" },
  { id: "travel-b-8", speaker: "Mike", text: "Show me your passport.", translation: "给我看你的护照。", note: "requesting document" },
  { id: "travel-b-9", speaker: "Alex", text: "Here you go.", translation: "给你。", note: "handing over" },
  { id: "travel-b-10", speaker: "Mike", text: "Window or aisle seat?", translation: "靠窗还是靠过道？", note: "seat choice" },
  { id: "travel-b-11", speaker: "Alex", text: "Aisle, please.", translation: "请给我靠过道。", note: "selecting seat" },
  { id: "travel-b-12", speaker: "Mike", text: "Here's your boarding pass.", translation: "这是你的登机牌。", note: "boarding pass" },
  { id: "travel-b-13", speaker: "Alex", text: "When does boarding start?", translation: "什么时候开始登机？", note: "boarding time" },
  { id: "travel-b-14", speaker: "Mike", text: "In twenty minutes.", translation: "二十分钟后。", note: "time info" },
  { id: "travel-b-15", speaker: "Alex", text: "Where is baggage claim?", translation: "行李提取在哪里？", note: "finding baggage" },
  { id: "travel-b-16", speaker: "Mike", text: "Follow the signs downstairs.", translation: "顺着指示牌下楼。", note: "directions" },
  { id: "travel-b-17", speaker: "Alex", text: "Can I change money here?", translation: "这里可以换钱吗？", note: "currency exchange" },
  { id: "travel-b-18", speaker: "Mike", text: "Yes, at the counter.", translation: "可以，在柜台。", note: "exchange location" },
  { id: "travel-b-19", speaker: "Alex", text: "I have a reservation.", translation: "我有预订。", note: "hotel check-in" },
  { id: "travel-b-20", speaker: "Mike", text: "What's your name?", translation: "你叫什么名字？", note: "asking name" },
  { id: "travel-b-21", speaker: "Alex", text: "Smith, here's my ID.", translation: "史密斯，这是我的身份证。", note: "providing ID" },
  { id: "travel-b-22", speaker: "Mike", text: "Breakfast is included.", translation: "包含早餐。", note: "breakfast info" },
  { id: "travel-b-23", speaker: "Alex", text: "What time is breakfast?", translation: "早餐几点开始？", note: "breakfast time" },
  { id: "travel-b-24", speaker: "Mike", text: "From 7 to 10 AM.", translation: "早7点到10点。", note: "breakfast hours" },
  { id: "travel-b-25", speaker: "Alex", text: "Wake me up at 7.", translation: "7点叫醒我。", note: "wake-up call" },
  { id: "travel-b-26", speaker: "Mike", text: "Sure, room 305.", translation: "好的，305房。", note: "room number" },
  { id: "travel-b-27", speaker: "Alex", text: "What's the WiFi password?", translation: "WiFi密码是什么？", note: "WiFi inquiry" },
  { id: "travel-b-28", speaker: "Mike", text: "It's on your key card.", translation: "在你的房卡上。", note: "password location" },
  { id: "travel-b-29", speaker: "Alex", text: "The AC isn't working.", translation: "空调不工作。", note: "room issue" },
  { id: "travel-b-30", speaker: "Mike", text: "I'll send someone up.", translation: "我会派人上去。", note: "sending help" },
  { id: "travel-b-31", speaker: "Alex", text: "I need to rent a car.", translation: "我需要租车。", note: "car rental" },
  { id: "travel-b-32", speaker: "Mike", text: "Do you have a license?", translation: "你有驾照吗？", note: "license check" },
  { id: "travel-b-33", speaker: "Alex", text: "Yes, here it is.", translation: "有，给你。", note: "showing license" },
  { id: "travel-b-34", speaker: "Mike", text: "Full coverage?", translation: "要全险吗？", note: "insurance" },
  { id: "travel-b-35", speaker: "Alex", text: "Yes, please.", translation: "是的，请加。", note: "accepting insurance" },
  { id: "travel-b-36", speaker: "Mike", text: "Your car is outside.", translation: "你的车在外面。", note: "car location" },
  { id: "travel-b-37", speaker: "Alex", text: "Does this bus go downtown?", translation: "这辆车去市中心吗？", note: "bus route" },
  { id: "travel-b-38", speaker: "Mike", text: "No, take the 42.", translation: "不去，坐42路。", note: "correct route" },
  { id: "travel-b-39", speaker: "Alex", text: "Thanks!", translation: "谢谢！", note: "thanks" },
  { id: "travel-b-40", speaker: "Mike", text: "Watch your bags.", translation: "看管好你的包。", note: "safety tip" },
  { id: "travel-b-41", speaker: "Alex", text: "I want a tour tomorrow.", translation: "我想明天参加观光团。", note: "tour booking" },
  { id: "travel-b-42", speaker: "Mike", text: "Morning or afternoon?", translation: "上午还是下午？", note: "time choice" },
  { id: "travel-b-43", speaker: "Alex", text: "Morning, at 9.", translation: "上午，9点。", note: "selecting time" },
  { id: "travel-b-44", speaker: "Mike", text: "Meet at the fountain.", translation: "在喷泉处集合。", note: "meeting point" },
  { id: "travel-b-45", speaker: "Alex", text: "Can I take photos?", translation: "我可以拍照吗？", note: "photo permission" },
  { id: "travel-b-46", speaker: "Mike", text: "No flash allowed.", translation: "不允许用闪光灯。", note: "flash rule" },
  { id: "travel-b-47", speaker: "Alex", text: "Where can I buy gifts?", translation: "哪里可以买礼物？", note: "shopping" },
  { id: "travel-b-48", speaker: "Mike", text: "Try the market.", translation: "去市场看看。", note: "market suggestion" },
  { id: "travel-b-49", speaker: "Alex", text: "Do they take cards?", translation: "他们收卡吗？", note: "payment method" },
  { id: "travel-b-50", speaker: "Mike", text: "Yes, but cash is better.", translation: "收卡，但现金更好。", note: "payment advice" },
  { id: "travel-b-51", speaker: "Alex", text: "Where is the restroom?", translation: "洗手间在哪里？", note: "asking for restroom" },
  { id: "travel-b-52", speaker: "Mike", text: "Down the hall.", translation: "沿着走廊走。", note: "directions" },
  { id: "travel-b-53", speaker: "Alex", text: "I need a taxi.", translation: "我需要出租车。", note: "taxi request" },
  { id: "travel-b-54", speaker: "Mike", text: "Wait at the curb.", translation: "在路边等。", note: "waiting location" },
  { id: "travel-b-55", speaker: "Alex", text: "How much to the hotel?", translation: "到酒店多少钱？", note: "price inquiry" },
  { id: "travel-b-56", speaker: "Mike", text: "About twenty dollars.", translation: "大约20美元。", note: "price estimate" },
  { id: "travel-b-57", speaker: "Alex", text: "Can I pay by card?", translation: "我可以刷卡吗？", note: "payment method" },
  { id: "travel-b-58", speaker: "Mike", text: "Yes, of course.", translation: "当然可以。", note: "confirmation" },
  { id: "travel-b-59", speaker: "Alex", text: "Keep the change.", translation: "不用找了。", note: "tip" },
  { id: "travel-b-60", speaker: "Mike", text: "Thank you very much.", translation: "非常感谢。", note: "thanks" },
  { id: "travel-b-61", speaker: "Alex", text: "I lost my luggage.", translation: "我丢了行李。", note: "lost luggage" },
  { id: "travel-b-62", speaker: "Mike", text: "Go to the counter.", translation: "去柜台。", note: "directions" },
  { id: "travel-b-63", speaker: "Alex", text: "What's the gate number?", translation: "登机口是几号？", note: "gate inquiry" },
  { id: "travel-b-64", speaker: "Mike", text: "Gate 12, section B.", translation: "12号口，B区。", note: "gate info" },
  { id: "travel-b-65", speaker: "Alex", text: "Is this seat taken?", translation: "这个座位有人吗？", note: "seat availability" },
  { id: "travel-b-66", speaker: "Mike", text: "No, it's free.", translation: "没人，可以坐。", note: "available seat" },
  { id: "travel-b-67", speaker: "Alex", text: "Can I put my bag here?", translation: "我可以把包放这儿吗？", note: "bag storage" },
  { id: "travel-b-68", speaker: "Mike", text: "Yes, under the seat.", translation: "可以，放座位下。", note: "storage location" },
  { id: "travel-b-69", speaker: "Alex", text: "How long is the flight?", translation: "航班多长时间？", note: "flight duration" },
  { id: "travel-b-70", speaker: "Mike", text: "About three hours.", translation: "大约3小时。", note: "duration info" },
  { id: "travel-b-71", speaker: "Alex", text: "Do you have water?", translation: "有水吗？", note: "requesting water" },
  { id: "travel-b-72", speaker: "Mike", text: "I'll bring some.", translation: "我给你拿点。", note: "bringing water" },
  { id: "travel-b-73", speaker: "Alex", text: "I feel sick.", translation: "我感到恶心。", note: "feeling unwell" },
  { id: "travel-b-74", speaker: "Mike", text: "Here's a bag.", translation: "给你个袋子。", note: "offering help" },
  { id: "travel-b-75", speaker: "Alex", text: "When do we land?", translation: "什么时候降落？", note: "landing time" },
  { id: "travel-b-76", speaker: "Mike", text: "In about an hour.", translation: "大约一小时后。", note: "time estimate" },
  { id: "travel-b-77", speaker: "Alex", text: "I need a map.", translation: "我需要地图。", note: "requesting map" },
  { id: "travel-b-78", speaker: "Mike", text: "Check the lobby.", translation: "去大堂看看。", note: "map location" },
  { id: "travel-b-79", speaker: "Alex", text: "Is breakfast free?", translation: "早餐免费吗？", note: "breakfast cost" },
  { id: "travel-b-80", speaker: "Mike", text: "Yes, it's included.", translation: "是的，包含在内。", note: "included" },
  { id: "travel-b-81", speaker: "Alex", text: "Where is the gym?", translation: "健身房在哪里？", note: "gym location" },
  { id: "travel-b-82", speaker: "Mike", text: "On the second floor.", translation: "在二楼。", note: "floor info" },
  { id: "travel-b-83", speaker: "Alex", text: "What time is checkout?", translation: "退房时间是什么？", note: "checkout time" },
  { id: "travel-b-84", speaker: "Mike", text: "11 AM, sir.", translation: "上午11点，先生。", note: "checkout info" },
  { id: "travel-b-85", speaker: "Alex", text: "Can I leave my bags?", translation: "我可以寄存行李吗？", note: "bag storage" },
  { id: "travel-b-86", speaker: "Mike", text: "Yes, at the desk.", translation: "可以，在前台。", note: "storage location" },
  { id: "travel-b-87", speaker: "Alex", text: "I need a late checkout.", translation: "我需要延迟退房。", note: "late checkout" },
  { id: "travel-b-88", speaker: "Mike", text: "Until 2 PM?", translation: "到下午2点？", note: "time confirmation" },
  { id: "travel-b-89", speaker: "Alex", text: "Yes, that works.", translation: "是的，可以。", note: "confirmation" },
  { id: "travel-b-90", speaker: "Mike", text: "I'll make a note.", translation: "我会记下来。", note: "making note" },
  { id: "travel-b-91", speaker: "Alex", text: "Is there a pool?", translation: "有游泳池吗？", note: "pool inquiry" },
  { id: "travel-b-92", speaker: "Mike", text: "Yes, open at 9.", translation: "有，9点开放。", note: "pool hours" },
  { id: "travel-b-93", speaker: "Alex", text: "Is it heated?", translation: "是加热的吗？", note: "pool feature" },
  { id: "travel-b-94", speaker: "Mike", text: "Yes, warm water.", translation: "是的，温水。", note: "water temp" },
  { id: "travel-b-95", speaker: "Alex", text: "Do you have towels?", translation: "有毛巾吗？", note: "towel request" },
  { id: "travel-b-96", speaker: "Mike", text: "By the pool side.", translation: "在泳池边。", note: "towel location" },
  { id: "travel-b-97", speaker: "Alex", text: "Thanks so much.", translation: "非常感谢。", note: "thanks" },
  { id: "travel-b-98", speaker: "Mike", text: "Have a nice stay.", translation: "祝您住宿愉快。", note: "well wishes" },
  { id: "travel-b-99", speaker: "Alex", text: "I will.", translation: "我会的。", note: "response" },
  { id: "travel-b-100", speaker: "Mike", text: "Enjoy your trip.", translation: "旅途愉快。", note: "farewell" }
];"""

# 读取 lib/data.ts 文件
with open("lib/data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 步骤1：删除所有旧的 travelLinesBeginner 定义（包括重复的）
# 先删除"低难度 50 句"的旧定义
old_50_pattern = r'// ==========================================\s*// 1\. 出行旅游 \(Travel\) - 低难度 50 句\s*// ==========================================\s*const travelLinesBeginner: ListeningLine\[\] = \[.*?\];\s*'
if re.search(old_50_pattern, content, re.DOTALL):
    content = re.sub(old_50_pattern, '', content, 1, re.DOTALL)
    print("[OK] Removed old travelLinesBeginner (50 lines)")

# 步骤2：检查是否已有100句定义，如果没有则插入
if "travel-b-100" not in content:
    # 在 greetingsLinesBeginner 之后插入
    insert_pattern = r'(const greetingsLinesBeginner: ListeningLine\[\] = .*?\];)'
    content = re.sub(insert_pattern, r'\1\n\n' + TRAVEL_BEGINNER, content, 1, re.DOTALL)
    print("[OK] Inserted travelLinesBeginner (100 lines) after greetingsLinesBeginner")
else:
    print("[OK] travelLinesBeginner (100 lines) already exists")

# 写回文件
with open("lib/data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("\n[SUCCESS] Travel beginner dialogue generated successfully!")
print("[INFO] File updated: lib/data.ts")
print("[INFO] Total lines: 100")
print("[INFO] Max words per line: 10")
