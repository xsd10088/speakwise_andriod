import { Tabs } from "expo-router";

const COLORS = {
  background: "#061B46",
  panel: "#0B2858",
  border: "#1E477C",
  active: "#FFFFFF",
  activeBg: "#2F6BEB",
  inactive: "#9AA2B4",
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="listening"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarItemStyle: {
          marginHorizontal: 3,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: COLORS.border,
          borderRadius: 14,
          paddingVertical: 8,
        },

        tabBarActiveBackgroundColor: COLORS.activeBg,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "800",
        },

        tabBarIcon: () => null,

        sceneStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Tabs.Screen
        name="listening"
        options={{
          title: "听力训练",
          tabBarLabel: "听力训练",
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "口语练习",
          tabBarLabel: "口语练习",
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "我的进度",
          tabBarLabel: "我的进度",
        }}
      />
    </Tabs>
  );
}
