import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
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

type ArticleScreenProps = {
  route: {
    params: {
      lessonId?: string;
    };
  };
};

export default function ArticleScreen({ route }: ArticleScreenProps) {
  // 调试日志：查看实际接收到的 route 参数
  console.log("[ArticleScreen] route:", JSON.stringify(route?.params, null, 2));
  // 健壮获取 lessonId：分步验证，提供备用ID
  const routeParams = route?.params ?? {};
  const lessonId = routeParams.lessonId || "siddhartha-brahmin-son-1";
  console.log("[ArticleScreen] lessonId:", lessonId);

  const [lesson, setLesson] = useState<KekeReadingLesson | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 开始加载课程数据
    const lesson = getKekeReadingLesson(lessonId);
    if (!lesson) {
      setError("课时数据不存在，请返回重试");
      setLesson(null);
      return;
    }
    setLesson(lesson);
  }, [lessonId]);

  const speakLine = (text: string, index: number) => {
    if (playingIndex === index) {
      Speech.stop();
      setPlayingIndex(null);
      return;
    }

    Speech.stop();
    setPlayingIndex(index);
    Speech.speak(text, {
      language: "en-US",
      onDone: () => setPlayingIndex(null),
      onStopped: () => setPlayingIndex(null),
      onError: () => setPlayingIndex(null),
    });
  };

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={styles.centeredText}>
            {error}
          </Text>
          <Pressable onPress={() => window.history.back()} style={{marginTop: 20}}>
            <Text>返回首页</Text>
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
});