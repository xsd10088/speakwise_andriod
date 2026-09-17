import { describe, expect, it } from "vitest";

import { getPracticeDialogue, LISTENING_LINES, PRACTICE_DIALOGUE, SCENE_CONTENT, SCENES } from "./data";

describe("SpeakWise learning content", () => {
  it("contains exactly 100 listening lines", () => {
    expect(LISTENING_LINES).toHaveLength(100);
    expect(LISTENING_LINES.every((line) => line.text.length > 0 && line.translation.length > 0)).toBe(true);
  });

  it("contains twelve scenes, with ten scenes having one hundred complete lines each", () => {
    expect(SCENES).toHaveLength(12);
    for (const scene of SCENES.slice(0, 10)) {
      const lines = SCENE_CONTENT[scene.key];
      expect(lines).toHaveLength(100);
      expect(lines.every((line) => /[A-Za-z]/.test(line.text) && line.translation.length > 0)).toBe(true);
    }
    for (const scene of SCENES.slice(10)) {
      const lines = SCENE_CONTENT[scene.key];
      expect(lines).toHaveLength(40);
    }
  });

  it("provides rewritten advanced dialogues for the seven requested scenes", () => {
    for (const scene of ["housing", "medical", "banking", "shopping", "transit", "government", "school"] as const) {
      const lines = getPracticeDialogue(scene, "advanced");
      expect(lines).toHaveLength(10);
      expect(lines.every((line) => line.id.startsWith(`${scene}-advanced-`))).toBe(true);
    }
  });

  it("keeps Alex and Mia speaker labels in the practice dialogue", () => {
    expect(PRACTICE_DIALOGUE.some((line) => line.speaker === "Alex")).toBe(true);
    expect(PRACTICE_DIALOGUE.some((line) => line.speaker === "Mia")).toBe(true);
  });
});
