export type RssItem = {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  categories: string[];
  enclosureUrl: string;
};

export type RssChannel = {
  title: string;
  link: string;
  description: string;
  items: RssItem[];
};

const ENTITY_MAP: Record<string, string> = {
  "&quot;": '"',
  "&amp;": "&",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&#x27;": "'",
  "&#39;": "'",
  "&#x2019;": "’",
  "&#x201C;": "“",
  "&#x201D;": "”",
};

export function decodeXmlEntities(input: string): string {
  let text = input;
  for (const [entity, char] of Object.entries(ENTITY_MAP)) {
    text = text.split(entity).join(char);
  }
  text = text.replace(/&#(\d+);/g, (_match, code) =>
    String.fromCharCode(Number(code)),
  );
  text = text.replace(/&#x([0-9a-f]+);/gi, (_match, code) =>
    String.fromCharCode(parseInt(code, 16)),
  );
  return text;
}

function extractTagContent(xml: string, tag: string): string {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)</${escaped}>`));
  return match ? match[1].trim() : "";
}

function extractSelfClosingAttr(
  xml: string,
  tag: string,
  attr: string,
): string {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(`<${escaped}[^>]*\\s${attr}="([^"]*)"[^>]*/?>`),
  );
  return match ? match[1].trim() : "";
}

export function parseRss(xml: string): RssChannel {
  const channelStart = xml.indexOf("<channel>");
  const channelEnd = xml.indexOf("</channel>");
  const channelXml =
    channelStart >= 0 && channelEnd > channelStart
      ? xml.slice(channelStart, channelEnd)
      : xml;

  const channel: RssChannel = {
    title: decodeXmlEntities(extractTagContent(channelXml, "title")),
    link: decodeXmlEntities(extractTagContent(channelXml, "link")),
    description: decodeXmlEntities(extractTagContent(channelXml, "description")),
    items: [],
  };

  const itemPattern = /<item>([\s\S]*?)<\/item>/g;
  let itemMatch: RegExpExecArray | null;
  while ((itemMatch = itemPattern.exec(channelXml)) !== null) {
    const itemXml = itemMatch[1];
    const categories: string[] = [];
    const categoryPattern = /<category>([\s\S]*?)<\/category>/g;
    let categoryMatch: RegExpExecArray | null;
    while ((categoryMatch = categoryPattern.exec(itemXml)) !== null) {
      const value = decodeXmlEntities(categoryMatch[1].trim());
      if (value) categories.push(value);
    }

    const title = decodeXmlEntities(extractTagContent(itemXml, "title"));
    const link = decodeXmlEntities(extractTagContent(itemXml, "link"));
    if (!title && !link) continue;

    channel.items.push({
      title,
      link,
      guid: decodeXmlEntities(extractTagContent(itemXml, "guid")) || link,
      pubDate: decodeXmlEntities(extractTagContent(itemXml, "pubDate")),
      description: decodeXmlEntities(
        extractTagContent(itemXml, "description"),
      ),
      categories,
      enclosureUrl: extractSelfClosingAttr(itemXml, "enclosure", "url"),
    });
  }

  return channel;
}
