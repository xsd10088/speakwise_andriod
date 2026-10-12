import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";

export function Waveform({ active }: { active: boolean }) {
  const bars = useRef(
    [0, 1, 2, 3, 4, 5, 6].map(() => new Animated.Value(0.35)),
  ).current;

  useEffect(() => {
    if (!active) {
      bars.forEach((bar) => bar.setValue(0.35));
      return;
    }

    const animations = bars.map((bar, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 0.45 + (index % 3) * 0.2,
            duration: 180 + index * 35,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0.25 + ((index + 1) % 3) * 0.18,
            duration: 180 + index * 25,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [active, bars]);

  return (
    <View
      style={styles.waveform}
      accessibilityLabel={active ? "正在播放声波" : "播放声波"}
    >
      {bars.map((bar, index) => (
        <Animated.View
          key={index}
          style={[
            styles.waveBar,
            {
              transform: [{ scaleY: bar }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  waveform: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 12,
  },
  waveBar: {
    width: 5,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#8DB0FF",
  },
});
