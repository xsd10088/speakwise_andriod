#!/usr/bin/env python3
"""Analyze broken template patterns in data.ts."""
import re

with open("lib/data.ts", "r", encoding="utf-8") as f:
    c = f.read()

# Get all template sentence texts
matches = re.findall(r'text: "([^"]+)".*?note: "扩展句 \d+，主题：(.+?)。"', c)

print(f"Total template sentences: {len(matches)}")
print("\nUnique English text patterns:")
seen = set()
for text, topic in matches:
    if text not in seen:
        seen.add(text)
        print(f"  Text: {text[:80]}...")
        print(f"  Topic: {topic}")
        print()

print("\nTopics and counts:")
from collections import Counter
topics = Counter(t for _, t in matches)
for t, count in topics.most_common(20):
    print(f"  {t}: {count}")
