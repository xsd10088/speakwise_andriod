import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import type { WordDefinition } from "@/lib/word";
import type { SentenceParse } from "@/lib/sentence";
import type { VoaCourse, VoaLesson } from "@/lib/voa";

const mockScrollToIndex = jest.fn();
const mockScrollToOffset = jest.fn();

let resolveLookupWord: ((definition: WordDefinition) => void) | undefined;

// babel 把 import 的 require 提升到文件顶部（先于 const 初始化执行），
// 因此 mock 工厂内不能直接引用后声明的变量——在工厂内部创建 jest.fn，
// 再从被 mock 的模块实例上取回引用。
jest.mock("expo-speech", () => {
  const getAvailableVoicesAsync = jest.fn(() => ({
    then: (resolve: (voices: unknown[]) => void) => {
      resolve([]);
      return { catch: () => undefined };
    },
  }));
  const speak = jest.fn();
  const stop = jest.fn(() => Promise.resolve());
  return {
    __esModule: true,
    getAvailableVoicesAsync,
    speak,
    stop,
    default: { getAvailableVoicesAsync, speak, stop },
  };
});

jest.mock("@/components/ScreenContainer", () => {
  const RNReact = require("react");
  return {
    ScreenContainer: ({ children }: { children: React.ReactNode }) => RNReact.createElement(RNReact.Fragment, null, children),
  };
});

jest.mock("react-native", () => {
  const RNReact = require("react");
  const host = (name: string) => {
    const Component = ({ children, ...props }: any) => RNReact.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };
  const Animated = {
    Value: jest.fn(() => ({ setValue: jest.fn() })),
    View: host("Animated.View"),
    timing: jest.fn(() => ({ start: jest.fn() })),
    sequence: jest.fn((animations: unknown[]) => animations),
    loop: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
  };
  const FlatList = RNReact.forwardRef(({ data, renderItem, ListHeaderComponent, ListFooterComponent, ...props }: any, ref: any) => {
    RNReact.useImperativeHandle(ref, () => ({ scrollToIndex: mockScrollToIndex, scrollToOffset: mockScrollToOffset }));
    return RNReact.createElement("FlatList", props,
      ListHeaderComponent,
      ...(data ?? []).map((item: any, index: number) => renderItem({ item, index })),
      ListFooterComponent,
    );
  });
  return {
    ActivityIndicator: host("ActivityIndicator"),
    Animated,
    Image: host("Image"),
    Modal: host("Modal"),
    NativeModules: { ExpoModulesCoreJSLogger: { get: jest.fn(() => undefined) } },
    TurboModuleRegistry: { get: jest.fn(() => null) },
    FlatList,
    Platform: { OS: "android", select: (specifics: any) => specifics.android ?? specifics.native ?? specifics.default },
    Pressable: host("Pressable"),
    ScrollView: host("ScrollView"),
    StyleSheet: { create: (styles: any) => styles, flatten: (style: any) => style },
    Text: host("Text"),
    View: host("View"),
  };
});

jest.mock("@/lib/voa", () => {
  const actual = jest.requireActual("@/lib/voa");
  return {
    ...actual,
    fetchVoaCourses: jest.fn(),
    fetchVoaCourseDetail: jest.fn(),
  };
});

jest.mock("@/lib/word", () => {
  const actual = jest.requireActual("@/lib/word");
  return {
    ...actual,
    lookupWordDefinition: jest.fn(),
  };
});

jest.mock("@/lib/sentence", () => {
  const actual = jest.requireActual("@/lib/sentence");
  return {
    ...actual,
    parseSentence: jest.fn(),
  };
});

import * as Speech from "expo-speech";
import FeaturedScreen from "../app/(tabs)/featured";
import { fetchVoaCourseDetail, fetchVoaCourses } from "@/lib/voa";
import { parseSentence } from "@/lib/sentence";
import { lookupWordDefinition } from "@/lib/word";
import { WordbookProvider } from "@/lib/wordbook";

const mockSpeak = Speech.speak as jest.Mock;
const mockStop = Speech.stop as jest.Mock;

let resolveParse: ((parse: SentenceParse) => void) | undefined;

const serverCourse: VoaCourse = {
  id: "as-it-is-server",
  title: "As It Is (Server)",
  level: 2,
  description: "VOA Learning English 杂志式节目（服务端数据）。",
  lessonCount: 1,
};

const serverLesson: VoaLesson = {
  id: "as-it-is-server-lesson",
  title: "Server Lesson Title",
  audioUrl: "https://speakwise-wsicpu2u.manus.space/audio/server.mp3",
  durationSec: 120,
  transcript: ["First server line.", "Second server line."],
  translation: ["第一句服务端译文。", "第二句服务端译文。"],
};

const FIRST_LINE_TEXT =
  "In 2024, the number of babies born in South Korea increased for the first time in nine years. The change is welcome news for a country that is dealing with serious population problems.";

const FIRST_LINE_TRANSLATION =
  "2024年，韩国新生儿数量九年来首次增长。这一变化对于一个正面临严重人口问题的国家来说是个好消息。";

async function renderFeatured() {
  const result = render(
    <WordbookProvider>
      <FeaturedScreen />
    </WordbookProvider>,
  );
  // 等待微任务队列清空：AsyncStorage 水合与 tRPC 回退 promise
  // 在 act 内 settle，避免 act 警告并让初始状态稳定。
  await act(async () => undefined);
  return result;
}

describe("FeaturedScreen", () => {
  beforeEach(() => {
    resolveLookupWord = undefined;
    resolveParse = undefined;
    mockScrollToIndex.mockClear();
    mockScrollToOffset.mockClear();
    mockSpeak.mockClear();
    mockStop.mockClear();
    jest
      .mocked(fetchVoaCourses)
      .mockReset()
      .mockRejectedValue(new Error("offline"));
    jest
      .mocked(fetchVoaCourseDetail)
      .mockReset()
      .mockRejectedValue(new Error("offline"));
    jest
      .mocked(lookupWordDefinition)
      .mockReset()
      .mockImplementation(
        () =>
          new Promise<WordDefinition>((resolve) => {
            resolveLookupWord = resolve;
          }),
      );
    jest
      .mocked(parseSentence)
      .mockReset()
      .mockImplementation(
        () =>
          new Promise<SentenceParse>((resolve) => {
            resolveParse = resolve;
          }),
      );
  });

  it("renders the level selector and the local fallback course for the default level", async () => {
    await renderFeatured();

    expect(screen.getByLabelText("选择Level 1 入门")).toBeTruthy();
    expect(screen.getByLabelText("选择Level 2 进阶")).toBeTruthy();
    expect(screen.getByLabelText("选择Level 3 高级")).toBeTruthy();
    expect(screen.getByText("Level 2 进阶")).toBeTruthy();
    expect(screen.getByText("As It Is")).toBeTruthy();
    expect(screen.getByText("1 课")).toBeTruthy();
    expect(
      screen.getByText(
        "Researchers: South Korea's Birth Rate Increase Last Year Unclear",
      ),
    ).toBeTruthy();
    expect(screen.getByText("4:35")).toBeTruthy();
    expect(screen.getByText("本地占位数据：逐句朗读使用本地声线")).toBeTruthy();
    expect(screen.getByLabelText("播放全部15句")).toBeTruthy();
    expect(screen.getAllByText("语音")).toHaveLength(15);
  });

  it("switches levels and renders each local course", async () => {
    await renderFeatured();

    fireEvent.press(screen.getByLabelText("选择Level 1 入门"));
    expect(screen.getByText("Level 1 入门")).toBeTruthy();
    expect(screen.getByText("每日英语入门")).toBeTruthy();
    expect(screen.getByText("What Job Do You Want in the Future?")).toBeTruthy();
    expect(screen.getByLabelText("播放全部10句")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("选择Level 3 高级"));
    expect(screen.getByText("Level 3 高级")).toBeTruthy();
    expect(screen.getByText("Education")).toBeTruthy();
    expect(
      screen.getByText("Teachers Use Games for More Enjoyable Learning"),
    ).toBeTruthy();
    expect(screen.getByLabelText("播放全部14句")).toBeTruthy();
  });

  it("plays a single line with the selected voice and rate", async () => {
    await renderFeatured();

    fireEvent.press(screen.getAllByText("语音")[0]);
    expect(mockSpeak).toHaveBeenCalledWith(
      expect.stringContaining("In 2024"),
      expect.objectContaining({ language: "en-US", rate: 1 }),
    );

    fireEvent.press(screen.getByLabelText("选择0.5倍速"));
    expect(screen.getAllByText("0.5×").length).toBeGreaterThanOrEqual(1);
    fireEvent.press(screen.getAllByText("语音")[0]);
    expect(mockSpeak).toHaveBeenLastCalledWith(
      expect.stringContaining("In 2024"),
      expect.objectContaining({ language: "en-US", rate: 0.5 }),
    );
  });

  it("plays all lines and switches the control to a stop action", async () => {
    await renderFeatured();

    fireEvent.press(screen.getByLabelText("播放全部15句"));
    expect(screen.getByLabelText("停止播放全部")).toBeTruthy();
    // 整句文本同时出现在播放面板与单词拆分父级 Text 中，故用 getAllByText
    expect(screen.getAllByText(FIRST_LINE_TEXT).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(FIRST_LINE_TRANSLATION).length).toBeGreaterThanOrEqual(1);
    expect(mockSpeak).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByLabelText("停止播放全部"));
    expect(screen.getByLabelText("播放全部15句")).toBeTruthy();
  });

  it("expands and collapses the line translation", async () => {
    await renderFeatured();

    fireEvent.press(screen.getAllByText("翻译")[0]);
    expect(screen.getByText(FIRST_LINE_TRANSLATION)).toBeTruthy();

    fireEvent.press(screen.getAllByText("收起翻译")[0]);
    expect(screen.queryByText(FIRST_LINE_TRANSLATION)).toBeNull();
  });

  it("renders server courses and lessons when the voa endpoints respond", async () => {
    jest
      .mocked(fetchVoaCourses)
      .mockResolvedValue([serverCourse]);
    jest.mocked(fetchVoaCourseDetail).mockResolvedValue({
      course: serverCourse,
      lessons: [serverLesson],
    });

    await renderFeatured();

    await waitFor(() => {
      expect(screen.getByText("Server Lesson Title")).toBeTruthy();
    });
    expect(screen.getByText("As It Is (Server)")).toBeTruthy();
    expect(screen.getByText("2:00")).toBeTruthy();
    expect(screen.getByText("服务端音频就绪，逐句朗读使用本地声线")).toBeTruthy();
    expect(screen.getByLabelText("播放全部2句")).toBeTruthy();
    expect(screen.getByText("First server line.")).toBeTruthy();
    expect(screen.getByText("Second server line.")).toBeTruthy();
  });

  it("opens the word lookup modal when tapping a word and closes it", async () => {
    await renderFeatured();

    fireEvent.press(screen.getAllByText("In")[0]);
    expect(mockSpeak).toHaveBeenCalledWith("In", { language: "en-US" });

    expect(screen.getByText("正在补充音标…")).toBeTruthy();
    expect(screen.getByText("暂未找到释义")).toBeTruthy();

    await act(async () => {
      resolveLookupWord?.({ phonetic: "/wɜːrk/", meaning: "工作" });
    });

    expect(screen.getByText("/wɜːrk/")).toBeTruthy();
    expect(screen.getByText("工作")).toBeTruthy();
    // 例句同时出现在查词弹窗与单词拆分父级 Text 中，故用 getAllByText
    expect(screen.getAllByText(FIRST_LINE_TEXT).length).toBeGreaterThanOrEqual(1);

    fireEvent.press(screen.getByText("关闭"));
    expect(screen.queryByText("/wɜːrk/")).toBeNull();
  });

  it("saves a looked-up word to the wordbook", async () => {
    await renderFeatured();

    fireEvent.press(screen.getAllByText("In")[0]);
    expect(screen.getByText("加入生词本")).toBeTruthy();

    fireEvent.press(screen.getByText("加入生词本"));
    await waitFor(() => {
      expect(screen.getByText("已收藏")).toBeTruthy();
    });
  });

  it("opens the sentence parse modal and drills into a word", async () => {
    await renderFeatured();

    fireEvent.press(screen.getAllByText("解析")[0]);
    expect(screen.getByText("正在解析…")).toBeTruthy();

    await act(async () => {
      resolveParse?.({
        text: FIRST_LINE_TEXT,
        translation: FIRST_LINE_TRANSLATION,
        words: [
          { word: "korea", phonetic: "/kəˈriːə/", meaning: "韩国" },
          { word: "south", phonetic: "", meaning: "暂未找到释义" },
        ],
        phrases: ["the number", "of babies born", "in south korea"],
      });
    });

    expect(screen.getByText(FIRST_LINE_TRANSLATION)).toBeTruthy();
    expect(screen.getByText("in south korea")).toBeTruthy();
    expect(screen.getByText("/kəˈriːə/")).toBeTruthy();

    fireEvent.press(screen.getByText("korea"));
    // 查词弹窗接管，语句解析弹窗关闭
    expect(screen.getByText("正在补充音标…")).toBeTruthy();
    expect(screen.queryByText("正在解析…")).toBeNull();
  });

  it("returns to the top of the lesson list", async () => {
    await renderFeatured();

    fireEvent.press(screen.getByLabelText("返回页面顶部"));
    expect(mockScrollToOffset).toHaveBeenCalledWith({
      offset: 0,
      animated: true,
    });
  });
});
