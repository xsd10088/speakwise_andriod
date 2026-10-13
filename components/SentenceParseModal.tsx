import * as Speech from "expo-speech";
import { useEffect, useRef } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { SentenceParse } from "@/lib/sentence";

type SentenceParseModalProps = {
  visible: boolean;
  parse: SentenceParse | null;
  parsing?: boolean;
  onWordLookup: (word: string) => void;
  onClose: () => void;
};

export function SentenceParseModal({
  visible,
  parse,
  parsing = false,
  onWordLookup,
  onClose,
}: SentenceParseModalProps) {
  const speechRequestRef = useRef(0);

  const stopSpeech = () => {
    speechRequestRef.current += 1;
    void Speech.stop().catch(() => {
      // Speech.stop can reject when no utterance is active; this is safe to ignore.
    });
  };

  const speakSentence = async () => {
    const text = parse?.text.trim();

    if (!text) return;

    const requestId = ++speechRequestRef.current;

    try {
      // Speech.stop is asynchronous on Android. Waiting for it prevents the
      // stop operation from cancelling the new utterance below.
      await Speech.stop();
    } catch {
      // Continue and try to speak even when there was no active utterance.
    }

    if (requestId !== speechRequestRef.current) return;

    Speech.speak(text, {
      language: "en-US",
      rate: 0.85,
      pitch: 1.0,
    });
  };

  useEffect(() => {
    if (!visible) return;

    return () => {
      stopSpeech();
    };
  }, [visible, parse?.text]);

  const handleClose = () => {
    stopSpeech();
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>语句解析</Text>
            <Pressable
              style={styles.close}
              onPress={handleClose}
              accessibilityRole="button"
              accessibilityLabel="关闭语句解析"
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {!parse ? (
            <Text style={styles.hint}>{parsing ? "正在解析…" : "暂未解析到内容"}</Text>
          ) : (
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
              <View style={styles.sentenceRow}>
                <Text style={styles.sentence}>{parse.text}</Text>
                <Pressable
                  style={styles.speak}
                  onPress={speakSentence}
                  accessibilityRole="button"
                  accessibilityLabel="朗读整句"
                >
                  <Text style={styles.speakText}>🔊</Text>
                </Pressable>
              </View>

              <Text style={styles.label}>中文翻译</Text>
              <Text style={styles.translation}>
                {parse.translation || "暂未找到译文"}
              </Text>

              <Text style={styles.label}>短语拆分</Text>
              <View style={styles.phraseWrap}>
                {parse.phrases.map((phrase) => (
                  <View key={phrase} style={styles.phraseChip}>
                    <Text style={styles.phraseText}>{phrase}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.label}>逐词解析</Text>
              {parse.words.map((item) => (
                <Pressable
                  key={item.word}
                  style={styles.wordRow}
                  onPress={() => onWordLookup(item.word)}
                  accessibilityRole="button"
                  accessibilityLabel={`查看单词${item.word}的完整释义`}
                >
                  <View style={styles.wordHead}>
                    <Text style={styles.wordText}>{item.word}</Text>
                    <Text style={styles.wordPhonetic}>{item.phonetic}</Text>
                  </View>
                  <Text style={styles.wordMeaning}>{item.meaning}</Text>
                </Pressable>
              ))}

              <Text style={styles.tip}>点击单词查看完整释义、例句并加入生词本</Text>
            </ScrollView>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,.78)", justifyContent: "flex-end" },
  card: {
    backgroundColor: "#151820",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 8,
    maxHeight: "88%",
  },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#F2F3F5", fontSize: 22, fontWeight: "900" },
  close: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#252A34",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { color: "#9AA2B4", fontSize: 15, fontWeight: "800" },
  hint: { color: "#9AA2B4", fontSize: 15, paddingVertical: 18 },
  body: { flexGrow: 0 },
  sentenceRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  sentence: { color: "#F2F3F5", fontSize: 18, fontWeight: "800", lineHeight: 26, flex: 1 },
  speak: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#162A57",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  speakText: { fontSize: 17 },
  label: { color: "#9DB9FF", fontSize: 12, fontWeight: "800", marginTop: 12 },
  translation: { color: "#8DB0FF", fontSize: 15, lineHeight: 23 },
  phraseWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  phraseChip: {
    backgroundColor: "#1B2334",
    borderWidth: 1,
    borderColor: "#2E3A55",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  phraseText: { color: "#C7D6FF", fontSize: 13, fontWeight: "700" },
  wordRow: {
    borderWidth: 1,
    borderColor: "#2A2F3A",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    gap: 3,
  },
  wordHead: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  wordText: { color: "#F2F3F5", fontSize: 16, fontWeight: "900" },
  wordPhonetic: { color: "#8DB0FF", fontSize: 13 },
  wordMeaning: { color: "#D5D9E2", fontSize: 14, lineHeight: 20 },
  tip: { color: "#6E7686", fontSize: 11, marginTop: 14, marginBottom: 4, textAlign: "center" },
});
