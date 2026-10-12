import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  installGoogleTts,
  openTtsSettings,
  isGoogleTtsInstalled,
  getDefaultTtsEngine,
  asyncStorageGetItem,
  asyncStorageSetItem,
} = vi.hoisted(() => ({
  installGoogleTts: vi.fn(() => Promise.resolve(true)),
  openTtsSettings: vi.fn(() => Promise.resolve(true)),
  isGoogleTtsInstalled: vi.fn(() => Promise.resolve(false)),
  getDefaultTtsEngine: vi.fn(() => Promise.resolve("")),
  asyncStorageGetItem: vi.fn(
    (): Promise<string | null> => Promise.resolve(null),
  ),
  asyncStorageSetItem: vi.fn(() => Promise.resolve()),
}));

vi.mock("react-native", () => ({
  NativeModules: {
    GoogleTts: {
      isGoogleTtsInstalled,
      getDefaultTtsEngine,
      installGoogleTts,
      openTtsSettings,
    },
  },
  Platform: { OS: "android", select: (specifics: Record<string, unknown>) => specifics.android },
}));

vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: asyncStorageGetItem,
    setItem: asyncStorageSetItem,
  },
}));

import {
  ensureGoogleTtsDefaultEngine,
  ensureGoogleTtsInstalled,
  getGoogleTtsStatus,
} from "./googleTts";

describe("googleTts", () => {
  beforeEach(() => {
    installGoogleTts.mockClear();
    openTtsSettings.mockClear();
    isGoogleTtsInstalled.mockClear();
    getDefaultTtsEngine.mockClear();
    asyncStorageGetItem.mockClear();
    asyncStorageSetItem.mockClear();
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(false));
    getDefaultTtsEngine.mockReturnValue(Promise.resolve(""));
    asyncStorageGetItem.mockReturnValue(Promise.resolve(null));
  });

  it("reports the Google TTS installation and default engine status", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(
      Promise.resolve("com.google.android.tts"),
    );

    const status = await getGoogleTtsStatus();

    expect(status.installed).toBe(true);
    expect(status.isDefaultEngine).toBe(true);
  });

  it("reports a non-Google default engine as not default", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(Promise.resolve("com.samsung.SMT"));

    const status = await getGoogleTtsStatus();

    expect(status.installed).toBe(true);
    expect(status.isDefaultEngine).toBe(false);
  });

  it("launches the installer when Google TTS is missing", async () => {
    const status = await ensureGoogleTtsInstalled();

    expect(status.installed).toBe(false);
    expect(installGoogleTts).toHaveBeenCalledTimes(1);
  });

  it("does not launch the installer when Google TTS is installed", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));

    const status = await ensureGoogleTtsInstalled();

    expect(status.installed).toBe(true);
    expect(installGoogleTts).not.toHaveBeenCalled();
  });

  it("opens TTS settings when Google TTS is installed but not the default engine", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(Promise.resolve("com.samsung.SMT"));

    const isDefault = await ensureGoogleTtsDefaultEngine();

    expect(isDefault).toBe(false);
    expect(openTtsSettings).toHaveBeenCalledTimes(1);
    expect(asyncStorageSetItem).toHaveBeenCalledWith(
      "googleTtsSettingsPromptedAt",
      expect.any(String),
    );
  });

  it("does not open TTS settings when Google TTS is the default engine", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(
      Promise.resolve("com.google.android.tts"),
    );

    const isDefault = await ensureGoogleTtsDefaultEngine();

    expect(isDefault).toBe(true);
    expect(openTtsSettings).not.toHaveBeenCalled();
  });

  it("does not open TTS settings again within 24 hours", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(Promise.resolve("com.samsung.SMT"));
    asyncStorageGetItem.mockReturnValue(
      Promise.resolve(String(Date.now() - 60 * 60 * 1000)),
    );

    const isDefault = await ensureGoogleTtsDefaultEngine();

    expect(isDefault).toBe(false);
    expect(openTtsSettings).not.toHaveBeenCalled();
  });

  it("opens TTS settings again after 24 hours", async () => {
    isGoogleTtsInstalled.mockReturnValue(Promise.resolve(true));
    getDefaultTtsEngine.mockReturnValue(Promise.resolve("com.samsung.SMT"));
    asyncStorageGetItem.mockReturnValue(
      Promise.resolve(String(Date.now() - 25 * 60 * 60 * 1000)),
    );

    await ensureGoogleTtsDefaultEngine();

    expect(openTtsSettings).toHaveBeenCalledTimes(1);
  });
});
