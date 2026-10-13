import {
  cleanLookupWord,
  getWordDefinition,
  translateToChinese,
  type WordDefinition,
} from "@/lib/word";

export type ParsedWord = {
  word: string;
  phonetic: string;
  meaning: string;
};

export type SentenceParse = {
  text: string;
  translation: string;
  words: ParsedWord[];
  phrases: string[];
};

export function tokenizeSentence(text: string): string[] {
  return text
    .split(/\s+/)
    .map((token) => cleanLookupWord(token))
    .filter((token) => token.length > 0);
}

const PREPOSITIONS = new Set([
  "about", "above", "across", "after", "against", "along", "among",
  "around", "at", "before", "behind", "below", "beside", "besides",
  "between", "beyond", "by", "despite", "down", "during", "except",
  "for", "from", "in", "inside", "into", "near", "of", "off", "on",
  "onto", "outside", "over", "past", "round", "through", "throughout",
  "till", "to", "toward", "towards", "under", "until", "up", "upon",
  "via", "with", "within", "without",
]);

const CONJUNCTIONS = new Set([
  "and", "but", "or", "so", "yet", "nor",
]);

const SUBORDINATORS = new Set([
  "although", "as", "because", "if", "once", "since", "than",
  "that", "though", "unless", "until", "when", "whenever", "where",
  "whereas", "wherever", "whether", "which", "while", "who",
  "whoever", "whom", "whose", "why",
]);

const COMMON_VERBS = new Set([
  "be", "have", "do", "go", "make", "take", "come", "see", "know",
  "write", "give", "say", "tell", "find", "think", "buy", "bring",
  "catch", "teach", "feel", "leave", "hold", "keep", "lose", "mean",
  "meet", "pay", "sit", "stand", "understand", "grow", "hear",
  "begin", "run", "become", "draw", "fall", "fly", "forget", "get",
  "hide", "lead", "ride", "rise", "shake", "shoot", "sing", "sink",
  "sleep", "spend", "stick", "strike", "sweep", "swing", "throw",
  "wear", "win", "choose", "fight", "feed", "dig", "hang", "lay",
  "lend", "light", "speak", "drive", "eat", "drink", "work", "study",
  "play", "read", "walk", "talk", "listen", "learn", "watch", "call",
  "try", "ask", "need", "want", "like", "love", "help", "start",
  "stop", "open", "close", "turn", "move", "live", "believe", "bring",
  "happen", "include", "continue", "change", "follow", "create", "add",
  "show", "wait", "serve", "send", "expect", "build", "stay", "cut",
  "reach", "remain", "appear", "consider", "remember", "use", "put",
]);

export function chunkPhrases(words: string[]): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];

  const flush = () => {
    if (current.length > 0) {
      chunks.push(current);
      current = [];
    }
  };

  for (const word of words) {
    if (
      CONJUNCTIONS.has(word) ||
      SUBORDINATORS.has(word) ||
      PREPOSITIONS.has(word)
    ) {
      flush();
      current = [word];
    } else if (
      COMMON_VERBS.has(word) ||
      (word.endsWith("ed") && word.length > 4)
    ) {
      flush();
      current = [word];
    } else {
      current.push(word);
    }
  }

  flush();

  return chunks;
}

export function phrasesToText(chunks: string[][]): string[] {
  return chunks.map((chunk) => chunk.join(" "));
}

export function parseWords(words: string[]): ParsedWord[] {
  return words.map((word) => {
    const definition: WordDefinition = getWordDefinition(word);
    return { word, phonetic: definition.phonetic, meaning: definition.meaning };
  });
}

export async function parseSentence(text: string): Promise<SentenceParse> {
  const words = tokenizeSentence(text);
  const phrases = phrasesToText(chunkPhrases(words));

  if (!text.trim()) {
    return { text, translation: "", words: [], phrases: [] };
  }

  let translation = "";
  try {
    translation = (await translateToChinese(text)).trim();
  } catch {
    translation = "";
  }

  return { text, translation, words: parseWords(words), phrases };
}
