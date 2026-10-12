import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  extractArticleContent,
  extractAudioUrl,
  extractDurationSec,
  extractTranscript,
} from "./article";

const __filename = fileURLToPath(import.meta.url);
const fixture = path.join(
  path.dirname(__filename),
  "__fixtures__",
  "article.html",
);
const html = readFileSync(fixture, "utf8");

describe("extractAudioUrl", () => {
  it("prefers the 128kbps HQ source from data-sources", () => {
    expect(extractAudioUrl(html)).toBe(
      "https://voa-audio.voanews.eu/vle/2025/03/05/e4a0af84-7057-4f35-9015-08dd5b02d8d7_hq.mp3",
    );
  });

  it("falls back to the <audio src> attribute", () => {
    const plain = `<audio src="https://voa-audio.voanews.eu/vle/x.mp3"></audio>`;
    expect(extractAudioUrl(plain)).toBe(
      "https://voa-audio.voanews.eu/vle/x.mp3",
    );
  });

  it("returns null when no audio is present (video-only pages)", () => {
    expect(extractAudioUrl("<html><body>video page</body></html>")).toBeNull();
  });
});

describe("extractTranscript", () => {
  it("extracts paragraphs from the wsw container", () => {
    const transcript = extractTranscript(html);
    expect(transcript).toHaveLength(4);
    expect(transcript[0]).toContain("In 2024, the number of babies");
    expect(transcript[1]).toContain("238,300 babies");
  });

  it("stops at the Words in This Story section", () => {
    const transcript = extractTranscript(html);
    expect(
      transcript.some((line) => line.includes("Words in This Story")),
    ).toBe(false);
    expect(transcript.some((line) => line.includes("very rapid increase"))).toBe(
      false,
    );
  });

  it("skips separator-only paragraphs and decodes entities", () => {
    const transcript = extractTranscript(html);
    expect(transcript.some((line) => /^_+$/.test(line))).toBe(false);
    expect(transcript[2]).toContain("fertility rate — the average");
    expect(transcript[3]).toContain('"There are still people');
  });

  it("returns empty for pages without a wsw container", () => {
    expect(extractTranscript("<html></html>")).toEqual([]);
  });

  it("filters player placeholder paragraphs", () => {
    const html = `<div class="wsw"><p class="ta-c"><span class="ico ico-clock"></span>No media source currently available</p><p>Real transcript line.</p></div>`;
    expect(extractTranscript(html)).toEqual(["Real transcript line."]);
  });
});

describe("extractDurationSec", () => {
  it("parses m:ss duration", () => {
    expect(extractDurationSec(html)).toBe(275);
  });

  it("parses h:mm:ss duration", () => {
    const html =
      '<span class="c-mmp__cpanel-progress-controls-duration js-duration" dir="ltr">1:02:03</span>';
    expect(extractDurationSec(html)).toBe(3723);
  });
});

describe("extractArticleContent", () => {
  it("combines audio, transcript and duration", () => {
    const content = extractArticleContent(html);
    expect(content.audioUrl).toContain("_hq.mp3");
    expect(content.transcript).toHaveLength(4);
    expect(content.durationSec).toBe(275);
  });
});
