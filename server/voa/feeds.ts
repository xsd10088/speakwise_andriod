export type VoaLevel = 1 | 2 | 3;

export type VoaFeed = {
  id: string;
  title: string;
  level: VoaLevel;
  feedUrl: string;
  note?: string;
};

const FEED_BASE = "https://learningenglish.voanews.com";

export const VOA_FEEDS: VoaFeed[] = [
  {
    id: "lets-learn-english-level-1",
    title: "Let's Learn English - Level 1",
    level: 1,
    feedUrl: `${FEED_BASE}/api/ziqiqil-vomx-tpemumqm`,
    note: "beginner multimedia course",
  },
  {
    id: "news-words",
    title: "News Words",
    level: 1,
    feedUrl: `${FEED_BASE}/api/z-k-ql-vomx-tpermqqi`,
    note: "short vocabulary video items; audio-less items are skipped",
  },
  {
    id: "english-in-a-minute",
    title: "English in a Minute",
    level: 1,
    feedUrl: `${FEED_BASE}/api/zjk-rl-vomx-tpebpqqo`,
    note: "video items; audio-less items are skipped",
  },
  {
    id: "as-it-is",
    title: "As It Is",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zkm-ql-vomx-tpej-rqi`,
  },
  {
    id: "american-stories",
    title: "American Stories",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zyg__l-vomx-tpetmty`,
  },
  {
    id: "arts-and-culture",
    title: "Arts & Culture",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zpyp_l-vomx-tpe_rym`,
  },
  {
    id: "ask-a-teacher",
    title: "Ask a Teacher",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zti_qvl-vomx-tpekgvqr`,
  },
  {
    id: "everyday-grammar",
    title: "Everyday Grammar",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zoroqql-vomx-tpeptpqq`,
  },
  {
    id: "words-and-their-stories",
    title: "Words and Their Stories",
    level: 2,
    feedUrl: `${FEED_BASE}/api/zmypyl-vomx-tpeyry_`,
  },
  {
    id: "education",
    title: "Education",
    level: 3,
    feedUrl: `${FEED_BASE}/api/ztmp_l-vomx-tpek-__`,
  },
  {
    id: "science-and-technology",
    title: "Science & Technology",
    level: 3,
    feedUrl: `${FEED_BASE}/api/zmg_pl-vomx-tpeymtm`,
  },
  {
    id: "health-and-lifestyle",
    title: "Health & Lifestyle",
    level: 3,
    feedUrl: `${FEED_BASE}/api/zmmpql-vomx-tpey-_q`,
  },
  {
    id: "whats-trending-today",
    title: "What's Trending Today?",
    level: 3,
    feedUrl: `${FEED_BASE}/api/z_goqvl-vomx-tpevmmqt`,
  },
  {
    id: "peoples-in-america",
    title: "People In America",
    level: 3,
    feedUrl: `${FEED_BASE}/api/z-viqql-vomx-tpero_qq`,
  },
];

export function getFeedsByLevel(level: VoaLevel): VoaFeed[] {
  return VOA_FEEDS.filter((feed) => feed.level === level);
}

export function getFeedById(id: string): VoaFeed | undefined {
  return VOA_FEEDS.find((feed) => feed.id === id);
}
