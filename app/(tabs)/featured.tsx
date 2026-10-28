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
  getKekeReadingStories,
  getKekeReadingStory,
  type KekeReadingStory,
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

const FIXED_AUDIOBOOK_STORY_IDS = [
  "siddhartha-brahmin-son",
  "alice-adventures-wonderland",
  "little-prince",
  "grimm-fairy-tales",
  "jane-eyre",
  "pride-prejudice",
  "odyssey",
  "romeo-juliet",
];

export default function FeaturedScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
  }, []);

  const handleCategorySelect = (id: string) => {
    setSelected(selected === id ? null : id);
    setExpandedStory(null);
  };

  const categories = getKekeReadingCategories();

  const audiobookStories: KekeReadingStory[] = FIXED_AUDIOBOOK_STORY_IDS
    .map(id => getKekeReadingStory(id))
    .filter((s): s is KekeReadingStory => s != null && s.lessons && s.lessons.length > 0);

  const totalLessons = audiobookStories.reduce((sum, s) => sum + s.lessons.length, 0);

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
              {selected === "audiobooks" ? `有声名著 (${totalLessons} 本)` : selected}
            </Text>
            {selected === "audiobooks" ? (
              audiobookStories.map((story) => {
                const isExpanded = expandedStory === story.id;
                return (
                  <View key={story.id}>
                    <Pressable
                      onPress={() => setExpandedStory(isExpanded ? null : story.id)}
                      style={styles.storyHeader}
                    >
                      <Text style={styles.storyTitle}>{story.title}</Text>
                      <Text style={styles.storyLessonCount}>
                        {story.lessons.length} 章节
                      </Text>
                    </Pressable>
                    {isExpanded && (
                      <View style={styles.chapterList}>
                        {story.lessons.map((lesson) => (
                          <Pressable
                            key={lesson.id}
                            style={styles.chapterCard}
                            onPress={() => {
                              router.push(`/article/${lesson.id}` as any);
                            }}
                          >
                            <Text style={styles.chapterTitle}>{lesson.title}</Text>
                            <Text style={styles.chapterMeta}>
                              {lesson.durationSec 
                                ? `${Math.floor(lesson.durationSec / 60)} 分钟` 
                                : "语音"}
                            </Text>
                            <Text style={styles.chapterDifficulty}>{lesson.difficulty}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
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
  storyHeader: {
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storyTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: "700",
  },
  storyLessonCount: {
    color: C.muted,
    fontSize: 12,
  },
  chapterList: {
    gap: 8,
    marginTop: 8,
    paddingLeft: 8,
  },
  chapterCard: {
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 12,
  },
  chapterTitle: {
    color: C.text,
    fontSize: 14,
    fontWeight: "600",
  },
  chapterMeta: {
    color: C.muted,
    fontSize: 11,
    marginTop: 4,
  },
  chapterDifficulty: {
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