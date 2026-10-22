import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";

const C = {
  bg: "#0B0C0F",
  blue: "#2F6BEB",
  cardBg: "#1A1D24",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
};

const CATEGORIES = [
  { id: "voa", title: "VOA 精选" },
  { id: "bbc", title: "BBC 精选" },
  { id: "basic", title: "基础英语" },
  { id: "audiobooks", title: "有声名著" },
  { id: "media", title: "影音娱乐" },
  { id: "listening", title: "英语听力" },
  { id: "speaking", title: "英语口语" },
  { id: "exam", title: "英语考试" },
  { id: "knowledge", title: "涨知识" },
  { id: "daily", title: "每日收听" },
  { id: "source", title: "题源外刊" },
  { id: "graded", title: "分级读物" },
];

export default function FeaturedScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    return () => {};
  }, []);

  const handleSelect = (id: string) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>全部分类</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => handleSelect(cat.id)}
            style={[
              styles.card,
              selected === cat.id && styles.cardSelected,
            ]}
          >
            <Text style={styles.cardText}>{cat.title}</Text>
          </Pressable>
        ))}

        <View style={styles.placeholderRow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
            <View key={n} style={styles.emptyCard} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    backgroundColor: C.blue,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  topTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    gap: 8,
  },
  card: {
    width: "31%",
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  cardSelected: {
    backgroundColor: C.blue,
    borderColor: "#78A1FF",
  },
  cardText: {
    color: C.text,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  placeholderRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    gap: 8,
  },
  emptyCard: {
    width: "31%",
    height: 60,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
});