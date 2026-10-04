import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  getWordDefinition,
  type WordDefinition,
} from "@/lib/word";

const WORDBOOK_STORAGE_KEY = "speakwise-vocab-notebook";

export type SavedWord = WordDefinition & {
  word: string;
  example: string;
  scene: string;
};

type WordbookContextValue = {
  words: SavedWord[];
  toggleWord: (
    word: string,
    example: string,
    scene: string,
  ) => void;
  hasWord: (word: string) => boolean;
};

const WordbookContext =
  createContext<WordbookContextValue | null>(null);

function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z'-]/g, "");
}

function isSavedWord(value: unknown): value is SavedWord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<SavedWord>;

  return (
    typeof item.word === "string" &&
    typeof item.phonetic === "string" &&
    typeof item.meaning === "string" &&
    typeof item.example === "string" &&
    typeof item.scene === "string"
  );
}

function parseStoredWords(value: string | null): SavedWord[] {
  if (!value) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isSavedWord);
  } catch {
    return [];
  }
}

export function WordbookProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [words, setWords] = useState<SavedWord[]>([]);
  const hydratedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const loadWords = async () => {
      try {
        const stored = await AsyncStorage.getItem(
          WORDBOOK_STORAGE_KEY,
        );

        if (mounted) {
          setWords(parseStoredWords(stored));
        }
      } catch {
        if (mounted) {
          setWords([]);
        }
      } finally {
        if (mounted) {
          hydratedRef.current = true;
        }
      }
    };

    void loadWords();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    void AsyncStorage.setItem(
      WORDBOOK_STORAGE_KEY,
      JSON.stringify(words),
    ).catch(() => undefined);
  }, [words]);

  const toggleWord = useCallback(
    (word: string, example: string, scene: string) => {
      const key = normalizeWord(word);

      if (!key) {
        return;
      }

      const savedExample = example.trim();
      const savedScene = scene.trim();

      setWords((current) => {
        const exists = current.some(
          (item) => item.word === key,
        );

        if (exists) {
          return current.filter(
            (item) => item.word !== key,
          );
        }

        return [
          ...current,
          {
            word: key,
            ...getWordDefinition(key),
            example: savedExample,
            scene: savedScene,
          },
        ];
      });
    },
    [],
  );

  const hasWord = useCallback(
    (word: string) => {
      const key = normalizeWord(word);

      if (!key) {
        return false;
      }

      return words.some((item) => item.word === key);
    },
    [words],
  );

  const value = useMemo<WordbookContextValue>(
    () => ({
      words,
      toggleWord,
      hasWord,
    }),
    [words, toggleWord, hasWord],
  );

  return (
    <WordbookContext.Provider value={value}>
      {children}
    </WordbookContext.Provider>
  );
}

const EMPTY_WORDBOOK: WordbookContextValue = {
  words: [],
  toggleWord: () => undefined,
  hasWord: () => false,
};

export function useWordbook(): WordbookContextValue {
  return useContext(WordbookContext) ?? EMPTY_WORDBOOK;
}
