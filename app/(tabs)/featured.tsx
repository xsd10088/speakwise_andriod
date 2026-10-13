import * as Speech from "expo-speech";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import { SentenceParseModal } from "@/components/SentenceParseModal";
import { Waveform } from "@/components/Waveform";
import { WordSentence } from "@/components/WordSentence";
import { WordLookupModal } from "@/components/WordLookupModal";
import type { ListeningLine } from "@/lib/data";
import { parseSentence, type SentenceParse } from "@/lib/sentence";
import {
  getSpeechRate,
  selectVoiceForSpeaker,
  type Speaker as VoiceSpeaker,
} from "@/lib/voice";
import {
  getWordDefinition,
  lookupWordDefinition,
  type WordDefinition,
} from "@/lib/word";
import { useWordbook } from "@/lib/wordbook";
import {
  fetchVoaCourseDetail,
  fetchVoaCourses,
  getLocalCourses,
  getLocalLessons,
  VOA_LEVEL_TITLES,
  voaLessonToLines,
  type VoaCourse,
  type VoaLesson,
  type VoaLevel,
} from "@/lib/voa";

const C = {
  bg: "#0B0C0F",
  panel: "#111317",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
  blue: "#2F6BEB",
  soft: "#162A57",
};

const SPEEDS = [0.5, 1, 1.25] as const;

const LEVELS: VoaLevel[] = [1, 2, 3];

function voiceSpeaker(speaker: string): VoiceSpeaker {
  if (speaker === "Alex") {
    return "Alex";
  }

  if (speaker === "Mia") {
    return "Mia";
  }

  return "Mike";
}

export default function FeaturedScreen() {
  const listRef = useRef<FlatList<ListeningLine>>(null);

  const { toggleWord, hasWord } = useWordbook();

  const [level, setLevel] = useState<VoaLevel>(2);
  const [courses, setCourses] = useState<VoaCourse[]>(getLocalCourses);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<VoaLesson[]>([]);
  const [lessonId, setLessonId] = useState<string | null>(null);

  const [selectedDefinition, setSelectedDefinition] =
    useState<WordDefinition | null>(null);
  const [selectedExample, setSelectedExample] = useState("");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translated, setTranslated] = useState<Record<string, boolean>>({});
  const [parseSource, setParseSource] = useState<string | null>(null);
  const [parsedSentence, setParsedSentence] = useState<SentenceParse | null>(null);
  const [parsingSentence, setParsingSentence] = useState(false);
  const parseRequestRef = useRef(0);

  const visibleCourses = useMemo(
    () => courses.filter((course) => course.level === level),
    [courses, level],
  );

  const activeCourse =
    visibleCourses.find((course) => course.id === courseId) ??
    visibleCourses[0] ??
    null;

  const activeLesson =
    lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0] ?? null;

  const lines = useMemo(
    () => (activeLesson ? voaLessonToLines(activeLesson) : []),
    [activeLesson],
  );

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(setVoices)
      .catch(() => setVoices([]));

    return () => {
      Speech.stop?.();
    };
  }, []);

  useEffect(() => {
    setCourseId(null);
    setLessons([]);
    setLessonId(null);

    let active = true;
    fetchVoaCourses(level)
      .then((fetched) => {
        if (!active || fetched.length === 0) return;
        setCourses((current) => {
          const merged = current.filter(
            (course) => course.level !== level,
          );
          return [...merged, ...fetched];
        });
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [level]);

  useEffect(() => {
    if (!activeCourse) {
      setLessons([]);
      setLessonId(null);
      return;
    }

    setLessonId(null);
    setLessons(getLocalLessons(activeCourse.id));

    let active = true;
    fetchVoaCourseDetail(activeCourse.id)
      .then(({ lessons: fetched }) => {
        if (!active || fetched.length === 0) return;
        setLessons(fetched);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [activeCourse?.id]);

  useEffect(() => {
    if (!selectedWord) {
      setSelectedDefinition(null);
      setSelectedExample("");
      return;
    }

    setSelectedDefinition(getWordDefinition(selectedWord));

    let active = true;
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;

    lookupWordDefinition(selectedWord).then((definition) => {
      if (!active) return;
      setSelectedDefinition(definition);
      dismissTimer = setTimeout(() => {
        if (active) {
          setSelectedWord(null);
        }
      }, 5000);
    });

    return () => {
      active = false;
      if (dismissTimer) {
        clearTimeout(dismissTimer);
      }
    };
  }, [selectedWord]);

  const parseLine = (line: ListeningLine) => {
    const requestId = ++parseRequestRef.current;
    setParseSource(line.text);
    setParsedSentence(null);
    setParsingSentence(true);
    Speech.stop?.();

    void parseSentence(line.text, line.translation).then((result) => {
      if (requestId !== parseRequestRef.current) return;
      setParsedSentence(result);
      setParsingSentence(false);
    });
  };

  const closeParse = () => {
    parseRequestRef.current += 1;
    setParseSource(null);
    setParsedSentence(null);
    setParsingSentence(false);
  };

  const openWordFromParse = (word: string) => {
    const example = parseSource ?? "";
    closeParse();
    setSelectedWord(word);
    setSelectedExample(example);
    Speech.stop?.();
    Speech.speak?.(word, {
      language: "en-US",
    });
  };

  const speakLine = (line: ListeningLine, done?: () => void) => {
    Speech.stop?.();
    setActiveId(line.id);

    const selectedVoice = selectVoiceForSpeaker(
      voices,
      voiceSpeaker(line.speaker),
    );

    const options: Speech.SpeechOptions = {
      language: "en-US",
      rate: getSpeechRate(speed),
      onDone: () => {
        setActiveId(null);
        done?.();
      },
      onStopped: () => setActiveId(null),
      onError: () => setActiveId(null),
    };

    if (selectedVoice.voice?.identifier) {
      options.voice = selectedVoice.voice.identifier;
    }

    Speech.speak?.(line.text, options);
  };

  const playAll = (index = 0) => {
    if (index >= lines.length) {
      setPlayingAll(false);
      setActiveId(null);
      return;
    }

    setPlayingAll(true);
    speakLine(lines[index], () => playAll(index + 1));
  };

  return (
    <ScreenContainer>
      <FlatList
        ref={listRef}
        data={lines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => undefined}
        ListHeaderComponent={
          <View>
            <View style={styles.nav}>
              <View>
                <Text style={styles.brand}>S　英语口语</Text>
                <Text style={styles.kicker}>精品听读 · VOA Learning English</Text>
              </View>

              <View style={styles.difficultySelector}>
                {LEVELS.map((value) => (
                  <Pressable
                    key={value}
                    onPress={() => setLevel(value)}
                    style={[
                      styles.difficultyButton,
                      level === value && styles.difficultyActive,
                    ]}
                    accessibilityLabel={`选择${VOA_LEVEL_TITLES[value]}`}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        level === value && styles.difficultyTextActive,
                      ]}
                    >
                      {value === 1 ? "低" : value === 2 ? "中" : "高"}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text style={styles.title}>{VOA_LEVEL_TITLES[level]}</Text>

            <Text style={styles.subtitle}>
              镜像 VOA Learning English 课程（美国政府作品，公共领域），国内无需 VPN 听读。
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sceneRow}
            >
              {visibleCourses.map((course) => (
                <Pressable
                  key={course.id}
                  onPress={() => {
                    setCourseId(course.id);
                    setPlayingAll(false);
                    setActiveId(null);
                    Speech.stop?.();
                  }}
                  style={[
                    styles.scene,
                    activeCourse?.id === course.id && styles.active,
                  ]}
                >
                  <Text style={styles.sceneTitle}>{course.title}</Text>
                  <Text style={styles.sceneCount}>
                    {course.lessonCount} 课
                  </Text>
                </Pressable>
              ))}
              {visibleCourses.length === 0 && (
                <Text style={styles.emptyHint}>该级别暂无课程</Text>
              )}
            </ScrollView>

            {activeCourse && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sceneRow}
              >
                {lessons.map((lesson) => (
                  <Pressable
                    key={lesson.id}
                    onPress={() => {
                      setLessonId(lesson.id);
                      setPlayingAll(false);
                      setActiveId(null);
                      Speech.stop?.();
                    }}
                    style={[
                      styles.lesson,
                      activeLesson?.id === lesson.id && styles.active,
                    ]}
                  >
                    <Text style={styles.lessonTitle} numberOfLines={2}>
                      {lesson.title}
                    </Text>
                    {lesson.durationSec ? (
                      <Text style={styles.lessonDuration}>
                        {Math.floor(lesson.durationSec / 60)}:
                        {String(lesson.durationSec % 60).padStart(2, "0")}
                      </Text>
                    ) : null}
                  </Pressable>
                ))}
              </ScrollView>
            )}

            <View style={styles.playingSentence}>
              {playingAll &&
                activeId &&
                (() => {
                  const currentLine = lines.find(
                    (line) => line.id === activeId,
                  );

                  return currentLine ? (
                    <View>
                      <Text style={styles.playingSentenceEn}>
                        {currentLine.text}
                      </Text>
                      <Text style={styles.playingSentenceCn}>
                        {currentLine.translation}
                      </Text>
                    </View>
                  ) : null;
                })()}
            </View>

            <View style={styles.control}>
              <View style={styles.controlHead}>
                <Text style={styles.controlTitle}>播放控制</Text>
                <Text style={styles.speed}>{speed}×</Text>
              </View>

              <View style={styles.speedRow}>
                {SPEEDS.map((value) => (
                  <Pressable
                    key={value}
                    onPress={() => setSpeed(value)}
                    style={[
                      styles.speedButton,
                      speed === value && styles.active,
                    ]}
                    accessibilityLabel={`选择${value}倍速`}
                  >
                    <Text style={styles.buttonText}>{value}×</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  if (playingAll) {
                    Speech.stop?.();
                    setPlayingAll(false);
                    setActiveId(null);
                  } else {
                    playAll();
                  }
                }}
                style={[styles.playAll, playingAll && styles.stop]}
                accessibilityLabel={
                  playingAll ? "停止播放全部" : `播放全部${lines.length}句`
                }
              >
                <Text style={styles.buttonText}>
                  {playingAll ? "■ 停止播放" : `▶ 一键播放 ${lines.length} 句`}
                </Text>
              </Pressable>

              <Waveform active={Boolean(activeId)} />

              <Text style={styles.notice}>
                {activeLesson?.audioUrl
                  ? "服务端音频就绪，逐句朗读使用本地声线"
                  : "本地占位数据：逐句朗读使用本地声线"}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <View
            style={[styles.lineCard, activeId === item.id && styles.lineActive]}
          >
            <View style={styles.lineHead}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <Text style={styles.speaker}>{item.speaker}</Text>

              {activeId === item.id && <ActivityIndicator color={C.blue} />}

              <Pressable
                onPress={() => speakLine(item)}
                style={styles.play}
              >
                <Text style={styles.buttonText}>语音</Text>
              </Pressable>
            </View>

            <WordSentence
              text={item.text}
              onWord={(word) => {
                setSelectedWord(word);
                setSelectedExample(item.text);
                Speech.stop?.();
                Speech.speak?.(word, {
                  language: "en-US",
                });
              }}
              onSentence={() => parseLine(item)}
            />

            {translated[item.id] && (
              <Text style={styles.translation}>{item.translation}</Text>
            )}

            <View style={styles.actions}>
              <Pressable
                onPress={() => parseLine(item)}
                accessibilityLabel={`解析第${index + 1}句`}
              >
                <Text style={styles.actionText}>解析</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  setTranslated((current) => ({
                    ...current,
                    [item.id]: !current[item.id],
                  }))
                }
              >
                <Text style={styles.actionText}>
                  {translated[item.id] ? "收起翻译" : "翻译"}
                </Text>
              </Pressable>

              <Text style={styles.note}>学习提示：{item.note}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <Pressable
            onPress={() =>
              listRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              })
            }
            style={styles.backTop}
            accessibilityLabel="返回页面顶部"
          >
            <Text style={styles.buttonText}>↑ 返回顶部</Text>
          </Pressable>
        }
      />

      <WordLookupModal
        visible={Boolean(selectedWord)}
        word={selectedWord}
        definition={selectedDefinition}
        example={selectedExample}
        isSaved={Boolean(selectedWord && hasWord(selectedWord))}
        onSave={() => {
          if (!selectedWord) {
            return;
          }

          toggleWord(
            selectedWord,
            selectedExample || lines[0]?.text || "",
            activeCourse?.title ?? "精品听读",
          );
        }}
        onClose={() => setSelectedWord(null)}
      />

      <SentenceParseModal
        visible={Boolean(parseSource)}
        parse={parsedSentence}
        parsing={parsingSentence}
        onWordLookup={openWordFromParse}
        onClose={closeParse}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 40,
    gap: 12,
    backgroundColor: C.bg,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: C.text,
    fontSize: 23,
    fontWeight: "900",
  },
  kicker: {
    color: C.muted,
    fontSize: 11,
    marginTop: 3,
  },
  difficultySelector: {
    flexDirection: "row",
    gap: 8,
  },
  difficultyButton: {
    backgroundColor: C.soft,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  difficultyActive: {
    backgroundColor: C.blue,
    borderColor: "#78A1FF",
  },
  difficultyText: {
    color: C.text,
    fontSize: 12,
    fontWeight: "700",
  },
  difficultyTextActive: {
    color: "#F2F3F5",
  },
  title: {
    color: C.text,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 20,
  },
  subtitle: {
    color: C.muted,
    lineHeight: 21,
  },
  sceneRow: {
    gap: 8,
    paddingVertical: 12,
  },
  scene: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 10,
    minWidth: 110,
  },
  sceneTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: "800",
  },
  sceneCount: {
    color: C.muted,
    fontSize: 10,
    marginTop: 4,
  },
  lesson: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 10,
    maxWidth: 220,
  },
  lessonTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17,
  },
  lessonDuration: {
    color: C.muted,
    fontSize: 10,
    marginTop: 4,
  },
  active: {
    backgroundColor: C.blue,
    borderColor: "#78A1FF",
  },
  emptyHint: {
    color: C.muted,
    fontSize: 12,
  },
  control: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 18,
    padding: 15,
  },
  controlHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlTitle: {
    color: C.text,
    fontWeight: "900",
  },
  speed: {
    color: "#8DB0FF",
    fontWeight: "900",
  },
  speedRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 12,
  },
  speedButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 9,
    padding: 10,
    alignItems: "center",
  },
  playAll: {
    backgroundColor: C.blue,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  stop: {
    backgroundColor: "#8B3D4A",
  },
  buttonText: {
    color: C.text,
    fontWeight: "800",
    fontSize: 12,
  },
  notice: {
    color: C.muted,
    fontSize: 10,
    marginTop: 10,
  },
  lineCard: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 14,
  },
  lineActive: {
    backgroundColor: "#16213D",
    borderColor: "#6A95FF",
  },
  lineHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#252A34",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: C.muted,
    fontWeight: "900",
  },
  speaker: {
    color: "#8DB0FF",
    fontWeight: "900",
    flex: 1,
  },
  play: {
    backgroundColor: C.soft,
    borderRadius: 8,
    padding: 8,
  },
  translation: {
    color: C.muted,
    lineHeight: 19,
    marginTop: 7,
  },
  actions: {
    marginTop: 10,
    gap: 7,
  },
  actionText: {
    color: "#9DB9FF",
    fontWeight: "800",
    fontSize: 12,
  },
  note: {
    color: "#C2A56D",
    fontSize: 10,
    lineHeight: 16,
  },
  backTop: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 10,
  },
  playingSentence: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
    gap: 6,
    minHeight: 80,
  },
  playingSentenceEn: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 28,
  },
  playingSentenceCn: {
    color: "#8DB0FF",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
  },
});
