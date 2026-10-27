import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { ScreenContainer } from "@/components/ScreenContainer";
import { kekeReadingLessonToLines, getKekeReadingLesson, type KekeReadingLesson } from "@/lib/keke-reading";

const C = {
  bg: "#0B0C0F",
  panel: "#111317",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
  blue: "#2F6BEB",
  green: "#5BA46F",
};

export default function ArticleScreen() {
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [lesson, setLesson] = useState<KekeReadingLesson | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("lessonId");
      console.log("[ArticleScreen] lessonId from URL:", id);
      setLessonId(id);
    }
  }, []);

  useEffect(() => {
    if (!lessonId) {
      setError("未能获取课时ID，请返回重试");
      return;
    }

    const foundLesson = getKekeReadingLesson(lessonId);
    if (!foundLesson) {
      setError("课时数据不存在，请返回重试");
      return;
    }
    setLesson(foundLesson);
    setError(null);
  }, [lessonId]);

  const speakLine = (text: string, index: number) => {
    if (playingIndex === index) {
      Speech.stop();
      setPlayingIndex(null);
      setIsSpeaking(false);
      return;
    }

    Speech.stop();
    setPlayingIndex(index);
    setIsSpeaking(true);
    Speech.speak(text, {
      language: "en-US",
      onDone: () => {
        setPlayingIndex(null);
        setIsSpeaking(false);
      },
      onStopped: () => {
        setPlayingIndex(null);
        setIsSpeaking(false);
      },
      onError: () => {
        setPlayingIndex(null);
        setIsSpeaking(false);
      },
    });
  };

  const stopAllSpeech = () => {
    Speech.stop();
    setPlayingIndex(null);
    setIsSpeaking(false);
  };

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={styles.centeredText}>{error}</Text>
          <Pressable onPress={() => window.history.back()} style={styles.retryButton}>
            <Text style={styles.retryText}>返回首页</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  if (!lesson) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </ScreenContainer>
    );
  }

  const lines = kekeReadingLessonToLines(lesson);

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {lesson.title}
          </Text>
          {lesson.durationSec ? (
            <Text style={styles.duration}>
              {Math.floor(lesson.durationSec / 60)}:
              {String(lesson.durationSec % 60).padStart(2, "0")}
            </Text>
          ) : null}
        </View>

        {lines.map((line, index) => (
          <Pressable
            key={line.id}
            onPress={() => speakLine(line.text, index)}
            style={[
              styles.card,
              playingIndex === index && styles.cardActive,
            ]}
          >
            <View style={styles.speakerBadge}>
              <Text style={styles.speakerText}>{line.speaker}</Text>
            </View>
            <Text style={styles.englishText}>{line.text}</Text>
            <Text style={styles.chineseText}>{line.translation}</Text>
            {playingIndex === index && (
              <View style={styles.playButtonContainer}>
                <TouchableOpacity
                  onPress={() => stopAllSpeech()}
                  style={styles.playButton}
                >
                  <Text style={styles.playButtonText}>■</Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: C.bg,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.bg,
  },
  loadingText: {
    color: C.muted,
    fontSize: 16,
  },
  centeredText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: C.blue,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: C.text,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30,
  },
  duration: {
    color: C.muted,
    fontSize: 12,
    marginTop: 6,
  },
  card: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    position: "relative",
  },
  cardActive: {
    borderColor: C.blue,
    backgroundColor: "#16213D",
  },
  speakerBadge: {
    position: "absolute",
    top: 10,
    right: 12,
    backgroundColor: C.blue,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  speakerText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  englishText: {
    color: C.text,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    marginRight: 36,
  },
  chineseText: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  playButtonContainer: {
    position: "absolute",
    right: 12,
    bottom: 10,
  },
  playButton: {
    backgroundColor: C.blue,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});