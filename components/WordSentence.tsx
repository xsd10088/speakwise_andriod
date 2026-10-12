import { StyleSheet, Text } from "react-native";

const C = {
  text: "#F2F3F5",
};

export function WordSentence({
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

const styles = StyleSheet.create({
  lineText: {
    color: C.text,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  word: {
    color: C.text,
  },
});
