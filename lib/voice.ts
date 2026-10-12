import type { Voice } from "expo-speech";

export type Speaker = "Alex" | "Mia" | "Mike";

export type VoiceSelection = {
  voice?: Voice;
  matchedGender: boolean;
  fallback: boolean;
};

type Gender = "female" | "male";

const SPEAKER_GENDER: Record<Speaker, Gender> = {
  Alex: "female",
  Mia: "male",
  Mike: "male",
};

// 谷歌离线 TTS（com.google.android.tts）en-US 语音标识符，按性别分组。
// 标识符取自引擎内置 voices-list（字段值 1=女声，2=男声），
// 安装内置的 google-tts.apk 后这些语音离线可用。
const GOOGLE_TTS_VOICE_IDS: Record<Gender, string[]> = {
  female: [
    "en-us-x-msf00020",
    "en-us-x-mib",
    "en-us-x-usa",
    "en-us-x-gxd",
    "en-us-x-gxe",
  ],
  male: [
    "en-us-x-msm00008",
    "en-us-x-usb",
    "en-us-x-gxa",
    "en-us-x-gxb",
    "en-us-x-gxc",
  ],
};

const PREFERRED_NAMES: Record<Speaker, RegExp[]> = {
  Alex: [
    /\balex\b/i,
    /samantha|karen|susan|victoria|jenny|aria|hazel|libby|fiona|allison|ava|emma|joanna|kendra|kimberly|salli|ivy|moira|zira/i,
    /\bfemale\b/i,
  ],
  Mia: [
    /\bmia\b/i,
    /david|daniel|andrew|brian|guy|mark|ryan|tom|fred|ralph|oliver|arthur/i,
    /\bmale\b/i,
  ],
  Mike: [
    /\bmike\b/i,
    /david|daniel|andrew|brian|guy|mark|ryan|tom|fred|ralph|oliver|arthur/i,
    /\bmale\b/i,
  ],
};

const GENDER_NAMES: Record<Gender, RegExp> = {
  female:
    /samantha|karen|susan|victoria|jenny|aria|hazel|libby|fiona|allison|ava|emma|joanna|kendra|kimberly|salli|ivy|moira|zira|\bfemale\b|#female|x-msf/i,
  male:
    /david|daniel|andrew|brian|guy|mark|ryan|tom|fred|ralph|oliver|arthur|\bmale\b|#male|x-msm/i,
};

export function selectVoiceForSpeaker(
  voices: Voice[],
  speaker: Speaker,
): VoiceSelection {
  const gender = SPEAKER_GENDER[speaker];

  const english = voices.filter((voice) =>
    /^en([_-]|$)/i.test(voice.language),
  );

  const candidates = english.length > 0 ? english : voices;

  // 优先匹配谷歌离线 TTS 的指定性别语音
  const googleVoice = candidates.find((voice) =>
    GOOGLE_TTS_VOICE_IDS[gender].includes(voice.identifier),
  );

  const preferred = candidates.find((voice) =>
    PREFERRED_NAMES[speaker].some((pattern) =>
      pattern.test(`${voice.name} ${voice.identifier}`),
    ),
  );

  const genderMatch = candidates.find((voice) =>
    GENDER_NAMES[gender].test(`${voice.name} ${voice.identifier}`),
  );

  const voice = googleVoice ?? preferred ?? genderMatch;

  return {
    voice,
    matchedGender: Boolean(voice),
    fallback: !voice,
  };
}

export function getSpeechRate(rate: number): number {
  return Math.max(0.5, Math.min(2, rate));
}
