import { SymbolView } from "expo-symbols";
import { Tabs, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useEffect } from "react";

const icons = {
  practice: { ios: "mic.fill", android: "mic", web: "mic" },
  listening: { ios: "headphones", android: "headphones", web: "headphones" },
  progress: { ios: "chart.bar.fill", android: "bar_chart", web: "bar_chart" },
} as const;

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(tabs)/listening");
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8DB0FF",
        tabBarInactiveTintColor: "#8793A8",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="listening"
        options={{
          title: "听力训练",
          tabBarIcon: ({ color }) => (
            <SymbolView name={icons.listening} tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "AI口语练习",
          tabBarIcon: ({ color }) => (
            <SymbolView name={icons.practice} tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "我的进度",
          tabBarIcon: ({ color }) => (
            <SymbolView name={icons.progress} tintColor={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 76,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#111317",
    borderTopColor: "#292C33",
  },
  tabLabel: { fontSize: 11, fontWeight: "600" },
});
