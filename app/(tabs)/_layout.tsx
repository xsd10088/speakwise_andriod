import { Tabs } from "expo-router";

const COLORS = {
  background: "#061B46",
  panel: "#0B2858",
  border: "#1E477C",
  active: "#7DD3FC",
  inactive: "#9AA2B4",
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },

        sceneStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "口语练习",
          tabBarLabel: "口语练习",
        }}
      />

      <Tabs.Screen
        name="listening"
        options={{
          title: "听力训练",
          tabBarLabel: "听力训练",
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "我的",
          tabBarLabel: "我的",
        }}
      />
    </Tabs>
  );
}
