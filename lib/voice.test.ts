import { describe, expect, it } from "vitest";
import type { Voice } from "expo-speech";

import { selectVoiceForSpeaker } from "./voice";

const voice = (name: string, language = "en-US"): Voice => ({ identifier: name.toLowerCase().replaceAll(" ", "-"), name, quality: "Default" as Voice["quality"], language });

describe("selectVoiceForSpeaker", () => {
  it("prefers a recognizable female voice for Alex", () => {
    const result = selectVoiceForSpeaker([voice("David"), voice("Samantha")], "Alex");
    expect(result.voice?.name).toBe("Samantha");
    expect(result.matchedGender).toBe(true);
    expect(result.fallback).toBe(false);
  });

  it("prefers a recognizable male voice for Mike", () => {
    const result = selectVoiceForSpeaker([voice("Samantha"), voice("David")], "Mike");
    expect(result.voice?.name).toBe("David");
    expect(result.matchedGender).toBe(true);
  });

  it("does not guess gender from an unknown voice name", () => {
    const result = selectVoiceForSpeaker([voice("English System Voice")], "Mike");
    expect(result.voice).toBeUndefined();
    expect(result.matchedGender).toBe(false);
    expect(result.fallback).toBe(true);
  });

  it("prefers English voices when other languages are present", () => {
    const result = selectVoiceForSpeaker([voice("David", "zh-CN"), voice("David", "en-US")], "Mike");
    expect(result.voice?.language).toBe("en-US");
  });

  it("selects the Google offline TTS female voice for Alex", () => {
    const result = selectVoiceForSpeaker(
      [voice("en-us-x-msm00008"), voice("en-us-x-msf00020")],
      "Alex",
    );
    expect(result.voice?.identifier).toBe("en-us-x-msf00020");
    expect(result.matchedGender).toBe(true);
    expect(result.fallback).toBe(false);
  });

  it("selects the Google offline TTS male voice for Mia", () => {
    const result = selectVoiceForSpeaker(
      [voice("en-us-x-msf00020"), voice("en-us-x-msm00008")],
      "Mia",
    );
    expect(result.voice?.identifier).toBe("en-us-x-msm00008");
    expect(result.matchedGender).toBe(true);
  });

  it("selects the Google offline TTS male voice for Mike", () => {
    const result = selectVoiceForSpeaker(
      [voice("en-us-x-msf00020"), voice("en-us-x-msm00008"), voice("en-us-x-usb")],
      "Mike",
    );
    expect(result.voice?.identifier).toBe("en-us-x-msm00008");
  });

  it("falls back to other bundled Google offline TTS voices by gender", () => {
    const female = selectVoiceForSpeaker([voice("en-us-x-gxd")], "Alex");
    expect(female.voice?.identifier).toBe("en-us-x-gxd");

    const male = selectVoiceForSpeaker([voice("en-us-x-gxa")], "Mia");
    expect(male.voice?.identifier).toBe("en-us-x-gxa");
  });

  it("recognizes older Google TTS gender suffixes", () => {
    const result = selectVoiceForSpeaker(
      [voice("en-us-x-sfg#female_2-local"), voice("en-us-x-sfg#male_1-local")],
      "Mike",
    );
    expect(result.voice?.identifier).toBe("en-us-x-sfg#male_1-local");
  });

  it("does not match a Google female voice for male speakers", () => {
    const result = selectVoiceForSpeaker([voice("en-us-x-msf00020")], "Mike");
    expect(result.voice).toBeUndefined();
    expect(result.fallback).toBe(true);
  });
});
