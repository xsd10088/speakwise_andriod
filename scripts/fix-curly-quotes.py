#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

with open('E:/speakwise-android-parity/lib/voa.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace curly quotes - show what we find
print("Finding curly quote patterns...")

# Pattern 1: "gamification" with curly quotes
content = content.replace('"gamification"', '"gamification"')  # U+201C and U+201D
content = content.replace('"' + chr(8220) + 'gamification' + chr(8221), '"gamification"')  # U+201C and U+201D as Unicode escapes

# Pattern 2: "l" with curly quotes  
content = content.replace('"l"', '"l"')
content = content.replace('"' + chr(8220) + 'l' + chr(8221), '"l"')

# Pattern 3: "gamify" with curly quotes
content = content.replace('"gamify"', '"gamify"')
content = content.replace('"' + chr(8220) + 'gamify' + chr(8221), '"gamify"')

# General cleanup: any remaining curly quotes in English strings
# Replace all instances of curly double quotes with straight quotes
content = content.replace(chr(8220), '"').replace(chr(8221), '"')

# Also fix potential "l" without quotes
content = content.replace('字母"l"。', '字母\\"l\\"。')

with open('E:/speakwise-android-parity/lib/voa.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed curly quotes in voa.ts')