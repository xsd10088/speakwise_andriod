import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import {
  getKekeReadingCategories,
  getKekeReadingLesson,
} from "@/lib/keke-reading";

const C = {
  bg: "#0B0C0F",
  blue: "#2F6BEB",
  cardBg: "#1A1D24",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
};

// 固定的 10 篇“有声名著”课时 ID
const FIXED_AUDIOBOOK_LESSON_IDS = [
  "siddhartha-brahmin-son-1",
  "alice-adventures-wonderland-1",
  "alice-adventures-wonderland-2",
  "jane-eyre-1",
  "pride-prejudice-1",
  "little-prince-1",
  "grimm-fairy-tales-1",
  "grimm-fairy-tales-2",
  "odyssey-1",
  "romeo-juliet-1",
];

export default function FeaturedScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 获取课程列表
  }, []);

  const handleCategorySelect = (id: string) => {
    setSelected(selected === id ? null : id);
  };

  // 获取选中类别
  const categories = getKekeReadingCategories();
  const selectedCategory = categories.find((cat) => cat.id === selected);

  // 有声名著课程数据 - 从 store.json 获取固定课时
  const audiobookLessons = FIXED_AUDIOBOOK_LESSON_IDS.map((lessonId) => {
    const lesson = getKekeReadingLesson(lessonId);
    return lesson ? { id: lesson.id, title: lesson.title, durationSec: lesson.durationSec, difficulty: lesson.difficulty } : null;
  }).filter(Boolean) as Array<{ id: string; title: string; durationSec?: number; difficulty: string }>;

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>全部分类</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => handleCategorySelect(cat.id)}
            style={[
              styles.card,
              selected === cat.id && styles.cardSelected,
            ]}
          >
            <Text style={styles.cardText}>{cat.title}</Text>
          </Pressable>
        ))}

        {selected && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {selected === "audiobooks" ? "有声名著" : selected}
            </Text>
            {selected === "audiobooks" ? (
              // 固定 10 篇文章卡片
              audiobookLessons.map((lesson) => {
                if (!lesson) return null;
                return (
                  <Pressable
                    key={lesson.id}
                    style={styles.bookCard}
                    onPress={() => {
                      // 安全导航：确保 lessonId 不为空
                      router.push({
                        pathname: "/article",
                        params: { lessonId: lesson.id },
                      } as any);
                    }}
                  >
                    <View style={styles.bookCard}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {lesson.title}
                      </Text>
                      <Text style={styles.bookMeta}>
                        {lesson.durationSec
                          ? `${Math.floor(lesson.durationSec / 60)} 分钟`
                          : "音频"}
                      </Text>
                      <Text style={styles.bookDifficulty}>{lesson.difficulty}</Text>
                    </View>
                  </Pressable>
                );
              })
            ) : (
              // 其他分类显示占位卡片
              <View style={styles.placeholderRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
                  <View key={n} style={styles.emptyCard} />
                ))}
              </View>
            )}
          </View>
        )}

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
  section: {
    width: "100%",
    marginTop: 16,
    gap: 12,
  },
  sectionTitle: {
    color: C.text,
    fontSize: 18,
    fontWeight: "900",
  },
  bookCard: {
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
  },
  bookTitle: {
    color: C.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  bookMeta: {
    color: C.muted,
    fontSize: 11,
    marginTop: 4,
  },
  bookDifficulty: {
    color: "#8DB0FF",
    fontSize: 10,
    marginTop: 2,
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