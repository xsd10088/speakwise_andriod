import * as NativeSplash from "expo-splash-screen";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { WordbookProvider } from "@/lib/wordbook";
export { ErrorBoundary } from "expo-router";

NativeSplash.setOptions({ duration: 0, fade: false });
NativeSplash.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    let active = true;

    const finishSplash = async () => {
      await NativeSplash.hideAsync().catch(() => undefined);

      if (active) setIsSplashDone(true);
    };

    finishSplash();
    return () => {
      active = false;
    };
  }, []);

  return (
    <WordbookProvider>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <View style={styles.root}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="light" />

            {!isSplashDone && (
              <Animated.View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, styles.splashOverlay]}
              >
                <Image
                  source={require("../assets/images/splash-screen-deep-blue.png")}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              </Animated.View>
            )}
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </WordbookProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  splashOverlay: { backgroundColor: "#061B46" },
});
