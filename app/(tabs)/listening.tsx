import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import {
  getSceneLines,
  SCENES,
  type DifficultyLevel,
  type ListeningLine,
  type SceneKey,
  type Speaker as DataSpeaker,
} from "@/lib/data";
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
import { WordLookupModal } from "@/components/WordLookupModal";
import { useWordbook } from "@/lib/wordbook";

const C = {
  bg: "#0B0C0F",
  panel: "#111317",
  border: "#3A3D45",
  text: "#F2F3F5",
  muted: "#9AA2B4",
  blue: "#2F6BEB",
  soft: "#162A57",
};

const SPEEDS = [0.75, 1, 1.25] as const;

const sceneOptions = SCENES.slice(0, 10) as {
  key: SceneKey;
  title: string;
  subtitle: string;
}[];

function voiceSpeaker(speaker: DataSpeaker): VoiceSpeaker {
  return speaker === "Alex" ? "Alex" : "Mike";
}

function WordSentence({
  text,
  onWord,
}: {
  text: string;
  onWord: (word: string) => void;
}) {
  return (
    <Text style={styles.lineText}>
      {text.split(/(\s+)/).map((part, index) =>
        /\s+/.test(part) ? (
          part
        ) : (
          <Text
            key={`${part}-${index}`}
            onPress={() => onWord(part)}
            style={styles.word}
          >
            {part}
          </Text>
        ),
      )}
    </Text>
  );
}

function Waveform({ active }: { active: boolean }) {
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

export default function ListeningScreen() {
  const listRef = useRef<FlatList<ListeningLine>>(null);

  const { toggleWord, hasWord } = useWordbook();

  const [scene, setScene] = useState<SceneKey>("greetings");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [selectedDefinition, setSelectedDefinition] =
    useState<WordDefinition | null>(null);
  const [selectedExample, setSelectedExample] = useState("");
  const [speed, setSpeed] =
    useState<(typeof SPEEDS)[number]>(1);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translated, setTranslated] = useState<Record<string, boolean>>({});

  const lines = getSceneLines(scene, difficulty);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(setVoices)
      .catch(() => setVoices([]));

    return () => {
      Speech.stop?.();
    };
  }, []);

  useEffect(() => {
    if (!selectedWord) {
      setSelectedDefinition(null);
      setSelectedExample("");
      return;
    }

    setSelectedDefinition(getWordDefinition(selectedWord));

    let active = true;

    lookupWordDefinition(selectedWord).then((definition) => {
      if (active) {
        setSelectedDefinition(definition);
      }
    });

    const timer = setTimeout(() => {
      setSelectedWord(null);
    }, 5000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [selectedWord]);

  const speakLine = (
    line: ListeningLine,
    done?: () => void,
  ) => {
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
                <Text style={styles.kicker}>听力训练</Text>
              </View>

              <View style={styles.difficultySelector}>
                <Pressable
                  onPress={() => setDifficulty("beginner")}
                  style={[
                    styles.difficultyButton,
                    difficulty === "beginner" && styles.difficultyActive,
                  ]}
                  accessibilityLabel="选择低难度"
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      difficulty === "beginner" && styles.difficultyTextActive,
                    ]}
                  >
                    低
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setDifficulty("advanced")}
                  style={[
                    styles.difficultyButton,
                    difficulty === "advanced" && styles.difficultyActive,
                  ]}
                  accessibilityLabel="选择高难度"
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      difficulty === "advanced" && styles.difficultyTextActive,
                    ]}
                  >
                    高
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.hero}>
              <Image
                source={require("../../assets/images/listening-training.jpg")}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

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

            <Text style={styles.title}>
              {SCENES.find((item) => item.key === scene)?.title}
            </Text>

            <Text style={styles.subtitle}>
              {lines.length} 句连续对话，逐句播放并点击单词查看发音和释义。
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sceneRow}
            >
              {sceneOptions.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    setScene(item.key);
                    setPlayingAll(false);
                    setActiveId(null);
                    Speech.stop?.();
                  }}
                  style={[
                    styles.scene,
                    scene === item.key && styles.active,
                  ]}
                >
                  <Text style={styles.sceneTitle}>
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

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
                    <Text style={styles.buttonText}>
                      {value}×
                    </Text>
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
                style={[
                  styles.playAll,
                  playingAll && styles.stop,
                ]}
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
                {activeId
                  ? "正在播放当前对话"
                  : "暂未读取到系统声线，将使用默认英语声音播放"}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.lineCard,
              activeId === item.id && styles.lineActive,
            ]}
          >
            <View style={styles.lineHead}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <Text style={styles.speaker}>{item.speaker}</Text>

              {activeId === item.id && (
                <ActivityIndicator color={C.blue} />
              )}

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
            />

            {translated[item.id] && (
              <Text style={styles.translation}>
                {item.translation}
              </Text>
            )}

            <View style={styles.actions}>
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

              <Text style={styles.note}>
                学习提示：{item.note}
              </Text>
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
        isSaved={Boolean(
          selectedWord && hasWord(selectedWord),
        )}
        onSave={() => {
          if (!selectedWord) {
            return;
          }

          toggleWord(
            selectedWord,
            selectedExample || lines[0]?.text || "",
            SCENES.find((item) => item.key === scene)?.title ??
              "日常问候",
          );
        }}
        onClose={() => setSelectedWord(null)}
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
  hero: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  heroImage: {
    width: "100%",
    maxWidth: 420,
    height: 220,
    borderRadius: 20,
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
  },
  active: {
    backgroundColor: C.blue,
    borderColor: "#78A1FF",
  },
  sceneTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: "800",
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
  sectionTitle: {
    color: C.text,
    fontSize: 19,
    fontWeight: "900",
    marginVertical: 8,
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
  lineText: {
    color: C.text,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  word: {
    color: C.text,
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.75)",
    justifyContent: "flex-end",
  },
  wordCard: {
    backgroundColor: "#151820",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 13,
  },
  phonetic: {
    color: "#8DB0FF",
    fontSize: 17,
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
