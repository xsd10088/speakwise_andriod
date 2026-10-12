import { decodeXmlEntities } from "./rss.ts";

export type ArticleContent = {
  audioUrl: string | null;
  transcript: string[];
  durationSec: number | null;
};

function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]+>/g, "");
}

function normalizeParagraph(raw: string): string {
  return decodeXmlEntities(stripHtmlTags(raw))
    .replace(/\s+/g, " ")
    .trim();
}

export function extractAudioUrl(html: string): string | null {
  const sourcesMatch = html.match(/data-sources="([^"]*)"/);
  if (sourcesMatch) {
    try {
      const sources = JSON.parse(decodeXmlEntities(sourcesMatch[1])) as Array<{
        Src?: string;
        Type?: string;
        DataInfo?: string;
      }>;
      const mp3Sources = sources.filter(
        (source) =>
          source.Type === "audio/mp3" && typeof source.Src === "string",
      );
      const hq = mp3Sources.find((source) => /_hq\.mp3/i.test(source.Src!));
      const best =
        hq ??
        mp3Sources.sort((a, b) => {
          const kbps = (info: string | undefined) =>
            Number((info || "").replace(/[^0-9]/g, "")) || 0;
          return kbps(b.DataInfo) - kbps(a.DataInfo);
        })[0];
      if (best?.Src) return best.Src;
    } catch {
      // fall through to the <audio src> attribute below
    }
  }

  const audioMatch = html.match(/<audio[^>]+src="([^"]+\.mp3)"/);
  return audioMatch ? decodeXmlEntities(audioMatch[1]) : null;
}

const PLAYER_PLACEHOLDER_TEXTS = [
  "no media source currently available",
];

function isPlayerPlaceholder(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  return PLAYER_PLACEHOLDER_TEXTS.some((placeholder) =>
    normalized.includes(placeholder),
  );
}

export function extractTranscript(html: string): string[] {
  const wswStart = html.indexOf('<div class="wsw">');
  if (wswStart < 0) return [];

  const wordsInStory = html.indexOf("Words in This Story", wswStart);
  const wswEnd = wordsInStory > wswStart ? wordsInStory : html.length;
  const wsw = html.slice(wswStart, wswEnd);

  const paragraphs: string[] = [];
  const paragraphPattern = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let match: RegExpExecArray | null;
  while ((match = paragraphPattern.exec(wsw)) !== null) {
    const text = normalizeParagraph(match[1]);
    if (!text) continue;
    if (/^_{5,}$/.test(text)) continue;
    if (isPlayerPlaceholder(text)) continue;
    paragraphs.push(text);
  }

  return paragraphs;
}

export function extractDurationSec(html: string): number | null {
  const durationMatch = html.match(
    /js-duration[^>]*>\s*(\d+):(\d+)(?::(\d+))?\s*</,
  );
  if (!durationMatch) return null;
  const hours = durationMatch[3] ? Number(durationMatch[1]) : 0;
  const minutes = durationMatch[3] ? Number(durationMatch[2]) : Number(durationMatch[1]);
  const seconds = durationMatch[3] ? Number(durationMatch[3]) : Number(durationMatch[2]);
  return hours * 3600 + minutes * 60 + seconds;
}

export function extractArticleContent(html: string): ArticleContent {
  return {
    audioUrl: extractAudioUrl(html),
    transcript: extractTranscript(html),
    durationSec: extractDurationSec(html),
  };
}
