import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules, Platform } from "react-native";

export type GoogleTtsStatus = {
  installed: boolean;
  isDefaultEngine: boolean;
};

type GoogleTtsNativeModule = {
  isGoogleTtsInstalled: () => Promise<boolean>;
  getDefaultTtsEngine: () => Promise<string>;
  installGoogleTts: () => Promise<boolean>;
  openTtsSettings: () => Promise<boolean>;
};

const GOOGLE_TTS_PACKAGE = "com.google.android.tts";
const SETTINGS_PROMPT_KEY = "googleTtsSettingsPromptedAt";
const SETTINGS_PROMPT_INTERVAL_MS = 24 * 60 * 60 * 1000;

const nativeModule: GoogleTtsNativeModule | undefined =
  Platform.OS === "android"
    ? (NativeModules.GoogleTts as GoogleTtsNativeModule | undefined)
    : undefined;

export async function getGoogleTtsStatus(): Promise<GoogleTtsStatus> {
  if (!nativeModule) {
    return { installed: false, isDefaultEngine: false };
  }

  const [installed, engine] = await Promise.all([
    nativeModule.isGoogleTtsInstalled(),
    nativeModule.getDefaultTtsEngine(),
  ]);

  return {
    installed,
    isDefaultEngine: engine === GOOGLE_TTS_PACKAGE,
  };
}

export async function ensureGoogleTtsInstalled(): Promise<GoogleTtsStatus> {
  const status = await getGoogleTtsStatus();

  if (!status.installed) {
    await nativeModule?.installGoogleTts();
  }

  return status;
}

export async function ensureGoogleTtsDefaultEngine(): Promise<boolean> {
  const status = await getGoogleTtsStatus();

  if (!status.installed || status.isDefaultEngine) {
    return status.isDefaultEngine;
  }

  const lastPrompt = Number(
    (await AsyncStorage.getItem(SETTINGS_PROMPT_KEY)) || 0,
  );

  if (
    Number.isFinite(lastPrompt) &&
    Date.now() - lastPrompt < SETTINGS_PROMPT_INTERVAL_MS
  ) {
    return false;
  }

  await AsyncStorage.setItem(SETTINGS_PROMPT_KEY, String(Date.now()));
  await nativeModule?.openTtsSettings();

  return false;
}
