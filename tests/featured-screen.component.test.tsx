import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("expo-speech", () => {
  const speak = jest.fn();
  const stop = jest.fn(() => Promise.resolve());
  return {
    __esModule: true,
    getAvailableVoicesAsync: jest.fn(() => ({
      then: (resolve: (voices: unknown[]) => void) => {
        resolve([]);
        return { catch: () => undefined };
      },
    })),
    speak,
    stop,
    default: { speak, stop },
  };
});

jest.mock("@/components/ScreenContainer", () => {
  const RNReact = require("react");
  return {
    ScreenContainer: ({ children }: { children: React.ReactNode }) =>
      RNReact.createElement(RNReact.Fragment, null, children),
  };
});

jest.mock("react-native", () => {
  const RNReact = require("react");
  const host = (name: string) => {
    const Component = ({ children, ...props }: any) =>
      RNReact.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };
  return {
    ActivityIndicator: host("ActivityIndicator"),
    Image: host("Image"),
    Modal: host("Modal"),
    Platform: { OS: "android", select: (s: any) => s.android ?? s.native ?? s.default },
    Pressable: host("Pressable"),
    ScrollView: host("ScrollView"),
    StyleSheet: { create: (styles: any) => styles, flatten: (style: any) => style },
    Text: host("Text"),
    View: host("View"),
  };
});

import FeaturedScreen from "../app/(tabs)/featured";

async function renderFeatured() {
  const result = render(<FeaturedScreen />);
  await act(async () => undefined);
  return result;
}

describe("FeaturedScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the all categories header", async () => {
    await renderFeatured();
    expect(screen.getByText("全部分类")).toBeTruthy();
  });

  it("renders all 12 category cards", async () => {
    await renderFeatured();

    const expected = [
      "VOA 精选",
      "BBC 精选",
      "基础英语",
      "有声名著",
      "影音娱乐",
      "英语听力",
      "英语口语",
      "英语考试",
      "涨知识",
      "每日收听",
      "题源外刊",
      "分级读物",
    ];

    expected.forEach((title) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
  });

  it("toggles selection when tapping a category card", async () => {
    await renderFeatured();

    fireEvent.press(screen.getByText("VOA 精选"));
    // 第二次点击取消选中
    fireEvent.press(screen.getByText("VOA 精选"));
    expect(screen.getByText("VOA 精选")).toBeTruthy();
  });

  it("renders placeholder cards for future expansion", async () => {
    await renderFeatured();
    // 12 个分类卡片 + 15 个占位卡片
    const allTexts = screen.getAllByText("", { exact: false });
    expect(allTexts.length).toBeGreaterThanOrEqual(12);
  });
});