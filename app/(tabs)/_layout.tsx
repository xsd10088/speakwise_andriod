import { Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

const COLORS = {
  background: "#061B46",
  panel: "#0B2858",
  border: "#1E477C",
  active: "#FFFFFF",
  activeBg: "#2F6BEB",
  inactive: "#9AA2B4",
};

const chipStyles = StyleSheet.create({
  chip: {
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  chipActive: {
    backgroundColor: COLORS.activeBg,
    borderColor: COLORS.activeBg,
  },
  chipIdle: {
    backgroundColor: "transparent",
    borderColor: COLORS.border,
  },
});

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

        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "800",
        },

        tabBarIcon: () => null,
        tabBarIconStyle: { width: 0, height: 0 },

        tabBarButton: ({
          children,
          style,
          hoverEffect,
          pressColor,
          ref,
          ...rest
        }) => (
          <Pressable
            {...rest}
            accessible
            style={({ pressed }) => [
              chipStyles.chip,
              rest["aria-selected"]
                ? chipStyles.chipActive
                : chipStyles.chipIdle,
              pressed ? { opacity: 0.75 } : null,
            ]}
          >
            {children}
          </Pressable>
        ),

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
