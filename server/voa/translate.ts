const MYMEMORY_URL = "https://api.mymemory.translated.net/get";
const GOOGLE_TRANSLATE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx";

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 800;

const translationCache = new Map<string, string>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { signal: controller.signal });
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

async function translateViaMyMemory(text: string): Promise<string | null> {
  try {
    const response = await fetchWithTimeout(
      `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=en|zh-CN`,
      REQUEST_TIMEOUT_MS,
    );
    if (!response.ok) return null;
    const data = (await response.json()) as {
      responseData?: { translatedText?: string };
      responseStatus?: number;
    };
    const translated = data.responseData?.translatedText?.trim();
    if (!translated || data.responseStatus === 429) return null;
    return translated;
  } catch {
    return null;
  }
}

async function translateViaGoogle(text: string): Promise<string | null> {
  try {
    const response = await fetchWithTimeout(
      `${GOOGLE_TRANSLATE_URL}&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`,
      REQUEST_TIMEOUT_MS,
    );
    if (!response.ok) return null;
    const payload = (await response.json()) as unknown;
    const sentences = (payload as Array<Array<[string, string]>>)[0];
    if (!Array.isArray(sentences)) return null;
    const translated = sentences
      .map((sentence) => (Array.isArray(sentence) ? sentence[0] : ""))
      .join("")
      .trim();
    return translated || null;
  } catch {
    return null;
  }
}

export async function translateToChinese(text: string): Promise<string> {
  const cached = translationCache.get(text);
  if (cached) return cached;

  const translated =
    (await translateViaMyMemory(text)) ?? (await translateViaGoogle(text));

  if (translated) {
    translationCache.set(text, translated);
    return translated;
  }

  return "";
}

export async function translateAll(
  lines: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<string[]> {
  const results: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    results.push(await translateToChinese(lines[index]));
    onProgress?.(index + 1, lines.length);
  }
  return results;
}
