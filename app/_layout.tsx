import * as NativeSplash from "expo-splash-screen";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import {
  ensureGoogleTtsDefaultEngine,
  ensureGoogleTtsInstalled,
} from "@/lib/googleTts";
import { WordbookProvider } from "@/lib/wordbook";

export { ErrorBoundary } from "expo-router";

NativeSplash.setOptions({
  duration: 0,
  fade: false,
});

void NativeSplash.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    let mounted = true;

    const hideSplash = async () => {
      // 等根布局完成一次渲染后再隐藏原生 Splash，
      // 避免启动阶段出现空白页或路由跳转闪烁。
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      await NativeSplash.hideAsync().catch(() => undefined);

      if (mounted) {
        setIsSplashDone(true);
      }
    };

    void hideSplash();

    const setupGoogleTts = async () => {
      try {
        // 启动时检查谷歌离线 TTS，未安装则调起系统安装器安装内置 APK；
        // 已安装但非默认引擎时引导用户到系统 TTS 设置切换（24 小时内只引导一次）。
        await ensureGoogleTtsInstalled();
        await ensureGoogleTtsDefaultEngine();
      } catch {
        // 谷歌 TTS 检查/安装失败不阻塞启动，听力训练会回退默认声音
      }
    };

    void setupGoogleTts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <WordbookProvider>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <View style={styles.root}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: "#061B46",
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="+not-found"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>

            <StatusBar style="light" />

            {!isSplashDone && (
              <View
                pointerEvents="none"
                style={styles.splashOverlay}
              >
                <Image
                  source={require("../assets/images/splash-screen-deep-blue.png")}
                  style={styles.splashImage}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </WordbookProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#061B46",
  },

  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#061B46",
  },

  splashImage: {
    width: "100%",
    height: "100%",
  },
});
