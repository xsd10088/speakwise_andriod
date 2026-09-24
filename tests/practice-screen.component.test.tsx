import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

// 使用 default import 匹配 export default IndexScreen
import IndexScreen from "../app/(tabs)/index";

// 场景配置数据
import { SCENES } from "../lib/data";

// Mock Expo 语音模块
jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  stop: jest.fn(),
}));

// Mock Expo 文件系统
jest.mock("expo-file-system/legacy", () => ({
  readAsStringAsync: jest.fn().mockResolvedValue("bW9jay1yZWNvcmRpbmctYmFzZTY0"),
  EncodingType: { Base64: "base64" },
}));

// Mock Expo 音频录制模块（含 useAudioRecorderState）
jest.mock("expo-audio", () => ({
  useAudioRecorder: jest.fn(),
  useAudioRecorderState: jest.fn(),
  RecordingPresets: { HIGH_QUALITY: {} },
  requestRecordingPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock API 请求
jest.mock("../lib/api", () => ({
  replyToDialogue: jest.fn().mockResolvedValue({ reply: "Hello back!" }),
  fetchDialogueSuggestions: jest.fn().mockResolvedValue(["Suggestion 1", "Suggestion 2"]),
  translateText: jest.fn().mockImplementation(({ text }: { text: string }) =>
    Promise.resolve({ text: `中文${text}` }),
  ),
  transcribeRecording: jest.fn().mockResolvedValue({ text: "Sample transcribed text" }),
  evaluateRecording: jest.fn().mockResolvedValue({
    score: 90,
    feedback: "Good job!",
    pronunciation: [],
    grammar: [],
  }),
}));

describe("PracticeScreen", () => {
  let audioRecorder: {
    prepareToRecordAsync: jest.Mock;
    record: jest.Mock;
    stop: jest.Mock;
    uri: string | null;
    isRecording: boolean;
    getStatus: jest.Mock;
  };
  let statusListener: ((status: { isFinished: boolean; url: string | null }) => void) | undefined;

  beforeEach(() => {
    statusListener = undefined;
    jest.clearAllMocks();
    audioRecorder = {
      prepareToRecordAsync: jest.fn().mockResolvedValue(undefined),
      record: jest.fn(),
      stop: jest.fn().mockImplementation(async () => {
        audioRecorder.uri = "mock-recording-uri";
        statusListener?.({ isFinished: true, url: "mock-recording-uri" });
      }),
      uri: null,
      isRecording: false,
      getStatus: jest.fn().mockReturnValue({
        canRecord: true,
        isRecording: false,
        durationMillis: 0,
        mediaServicesDidReset: false,
        url: null,
      }),
    };
    jest.mocked(require("expo-audio").useAudioRecorder).mockReturnValue(audioRecorder);
    jest.mocked(require("expo-audio").useAudioRecorderState).mockReturnValue({
      canRecord: true,
      isRecording: false,
      durationMillis: 0,
      mediaServicesDidReset: false,
      url: null,
    });
  });

  it("renders every configured practice scene", async () => {
    const { getByText } = render(<IndexScreen />);

    expect(getByText("AI 助手")).toBeTruthy();
    SCENES.forEach((scene) => {
      expect(getByText(scene.title)).toBeTruthy();
    });
  });

  it("generates reply suggestions from the latest AI message", async () => {
    const { getByLabelText, getByText } = render(<IndexScreen />);

    fireEvent.press(getByLabelText("显示回复提示"));

    await waitFor(() => {
      expect(require("../lib/api").fetchDialogueSuggestions).toHaveBeenCalledWith(
        expect.objectContaining({
          aiMessage: expect.stringContaining("How can I help you today?"),
          history: expect.arrayContaining([
            expect.objectContaining({ text: expect.stringContaining("How can I help you today?") }),
          ]),
        }),
      );
      expect(getByText("Suggestion 1")).toBeTruthy();
      expect(getByText("中文Suggestion 1")).toBeTruthy();
    });
  });

  it("automatically reads a successful AI reply aloud", async () => {
    const { getByPlaceholderText, getByText } = render(<IndexScreen />);

    const input = getByPlaceholderText("输入英文或点击麦克风录音...");
    fireEvent.changeText(input, "Hello");
    fireEvent.press(getByText("Send"));

    await waitFor(() => {
      expect(getByText("Hello back!")).toBeTruthy();
      expect(require("expo-speech").speak).toHaveBeenCalledWith(
        "Hello back!",
        expect.objectContaining({ language: "en-US" }),
      );
    });
  });

  it("stops recording and places transcription in the reply input without sending", async () => {
    const { getByPlaceholderText, getByText } = render(<IndexScreen />);
    const startButton = getByText("🎤");
    const input = getByPlaceholderText("输入英文或点击麦克风录音...");

    fireEvent.press(startButton);
    await waitFor(() => {
      expect(getByText("⏹️")).toBeTruthy();
    });
    fireEvent.press(getByText("⏹️"));

    await waitFor(() => {
      expect(require("expo-file-system/legacy").readAsStringAsync).toHaveBeenCalledWith(
        "mock-recording-uri",
        expect.objectContaining({ encoding: "base64" }),
      );
      expect(input.props.value).toBe("Sample transcribed text");
    });

    expect(require("../lib/api").replyToDialogue).not.toHaveBeenCalled();
  });
});