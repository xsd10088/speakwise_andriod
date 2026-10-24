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
  getKekeReadingCourses,
  getKekeReadingLessons,
  getKekeReadingCourse,
  type KekeReadingLesson,
} from "@/lib/keke-reading";

const C = {
  bg: "#0B0C0F",
  blue: "#2F6BEB",
  cardBg: "#1A1D24",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
};

export default function FeaturedScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [courses, setCourses] = useState(getKekeReadingCourses());
  const router = useRouter();

  useEffect(() => {
    setCourses(getKekeReadingCourses());
  }, []);

  const handleSelect = (id: string) => {
    setSelected(selected === id ? null : id);
  };

  const selectedCategory = getKekeReadingCategories().find(
    (cat) => cat.id === selected,
  );

const selectedCourse = selected
      ? getKekeReadingCourse("keke-reading-classics") ?? {}
      : {};
const lessons = ("lessons" in selectedCourse ? selectedCourse.lessons : []) as KekeReadingLesson[];

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>全部分类</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {getKekeReadingCategories().map((cat) => (
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

{selected && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selected === "audiobooks" ? "有声名著" : selected}</Text>
            {lessons.map((lesson) => (
              <Pressable
                key={lesson.id}
                style={styles.bookCard}
                onPress={() =>
  router.push({
    pathname: "/article",
    params: { lessonId: lesson.id },
  } as any)
                }
                  >
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {lesson.title}
                </Text>
                <Text style={styles.bookMeta}>
                  {lesson.durationSec
                    ? `${Math.floor(lesson.durationSec / 60)} 分钟`
                    : "音频"}
                </Text>
                <Text style={styles.bookDifficulty}>{lesson.difficulty}</Text>
              </Pressable>
            ))}
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