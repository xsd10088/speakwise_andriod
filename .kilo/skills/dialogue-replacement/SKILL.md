---
name: dialogue-replacement
description: Replace low-quality repetitive dialogue scenes in data.ts with 100 high-quality dialogues per scene, handling \r\n line endings and verification workflow
---

# Dialogue Replacement Skill

## Purpose
Replace low-quality/mechanical repetitive dialogue scenes in `lib/data.ts` with 100 high-quality English dialogues + Chinese translations per scene.

## Important Technical Notes

### \r\n Line Endings
- `data.ts` uses `\r\n` line endings
- The Edit tool reads files and strips `\r`, causing `oldString` matching failures
- **Always use Python scripts** for replacements, not the Edit tool directly

### Replacement Workflow
1. Write new scene content to a temp file (e.g., `{scene}_new.txt`)
2. Run the corresponding replacement script: `python replace_{scene}.py`
3. The script uses regex to find and replace the scene block in `data.ts`

### Verification Flow
After each scene replacement, run all 3 checks in sequence:
```
pnpm typecheck
pnpm test
pnpm test:components
```
Only proceed to the next scene after all 3 pass.

### Scene Structure
- Each scene has 100 dialogues with format: `{ id: "{scene}-{n}", speaker: "...", text: "...", translation: "...", note: "..." }`
- Role rotation: 2-3 speakers per scene (e.g., Customer/Banker, Caller/Operator)
- `note` field explains the language point or topic

### Existing Replacement Scripts
- `replace_banking.py`, `replace_shopping.py`, `replace_transit.py`
- `replace_government.py`, `replace_school.py`, `replace_restaurant.py`, `replace_emergency.py`
- `replace_scene.py` — generic scene replacement script

### Common Patterns to Avoid
- "By the way... I have been thinking about... Do you have any thoughts on..."循环
- Mechanical repetition of the same question/answer pattern
- Short generic closings like "Take care", "Cheers", "Goodbye" repeated 50+ times

## Quick Start
1. Identify the scene to replace (check for repetitive patterns in data.ts)
2. Write 100 dialogues to `{scene}_new.txt`
3. Run `python replace_{scene}.py`
4. Verify: `pnpm typecheck && pnpm test && pnpm test:components`