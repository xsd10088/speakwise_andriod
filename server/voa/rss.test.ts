import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { parseRss, decodeXmlEntities } from "./rss";

const __filename = fileURLToPath(import.meta.url);
const fixture = path.join(
  path.dirname(__filename),
  "__fixtures__",
  "as-it-is-feed.xml",
);

describe("parseRss", () => {
  const channel = parseRss(readFileSync(fixture, "utf8"));

  it("parses channel metadata", () => {
    expect(channel.title).toBe("As It Is - Voice of America");
    expect(channel.link).toBe("https://learningenglish.voanews.com/z/3521");
    expect(channel.description).toContain("magazine format");
  });

  it("parses items with titles, links and dates", () => {
    expect(channel.items).toHaveLength(2);
    expect(channel.items[0].title).toBe(
      "Researchers: South Korea’s Birth Rate Increase Last Year Unclear",
    );
    expect(channel.items[0].link).toBe(
      "https://learningenglish.voanews.com/a/researchers-south-korea-s-birth-rate-increase-last-year-unclear-/7997203.html",
    );
    expect(channel.items[0].pubDate).toBe(
      "Wed, 12 Mar 2025 22:00:00 +0000",
    );
  });

  it("parses multiple categories per item", () => {
    expect(channel.items[0].categories).toEqual([
      "As It Is",
      "Lessons of the Day",
    ]);
  });

  it("keeps the enclosure url (image, not audio)", () => {
    expect(channel.items[0].enclosureUrl).toContain("gdb.voanews.com");
    expect(channel.items[0].enclosureUrl).toContain(".jpg");
  });

  it("falls back to link when guid is missing", () => {
    const xml = `<rss><channel><item><title>T</title><link>https://example.com/a</link></item></channel></rss>`;
    const parsed = parseRss(xml);
    expect(parsed.items[0].guid).toBe("https://example.com/a");
  });

  it("skips items without title and link", () => {
    const xml = `<rss><channel><item><description>only description</description></item></channel></rss>`;
    expect(parseRss(xml).items).toHaveLength(0);
  });
});

describe("decodeXmlEntities", () => {
  it("decodes named and numeric entities", () => {
    expect(decodeXmlEntities("a &amp; b &lt; c &quot;d&quot;")).toBe(
      'a & b < c "d"',
    );
    expect(decodeXmlEntities("it&#x27;s &#39;fine&#39;")).toBe(
      "it's 'fine'",
    );
  });
});
