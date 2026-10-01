export type WordDefinition = { phonetic: string; meaning: string };

const WORDS: Record<string, WordDefinition> = {
  a: { phonetic: "/ə/", meaning: "一个；一" },
  an: { phonetic: "/ən/", meaning: "一个；一" },
  the: { phonetic: "/ðə/", meaning: "这；那；这些；那些" },
  i: { phonetic: "/aɪ/", meaning: "我" },
  "i've": { phonetic: "/aɪv/", meaning: "我已经；我一直" },
  "i'm": { phonetic: "/aɪm/", meaning: "我是" },
  "it's": { phonetic: "/ɪts/", meaning: "它是；这是" },
  you: { phonetic: "/juː/", meaning: "你；你们" },
  your: { phonetic: "/jʊr/", meaning: "你的；你们的" },
  we: { phonetic: "/wiː/", meaning: "我们" },
  they: { phonetic: "/ðeɪ/", meaning: "他们" },
  have: { phonetic: "/hæv/", meaning: "有；已经" },
  been: { phonetic: "/bɪn/", meaning: "是；一直处于" },
  what: { phonetic: "/wʌt/", meaning: "什么" },
  how: { phonetic: "/haʊ/", meaning: "怎样；如何" },
  are: { phonetic: "/ɑːr/", meaning: "是" },
  hi: { phonetic: "/haɪ/", meaning: "嗨；你好" },
  hello: { phonetic: "/həˈloʊ/", meaning: "你好" },
  nice: { phonetic: "/naɪs/", meaning: "友好的；不错的" },
  meet: { phonetic: "/miːt/", meaning: "遇见；见面" },
  today: { phonetic: "/təˈdeɪ/", meaning: "今天" },
  while: { phonetic: "/waɪl/", meaning: "一段时间；当……时" },
  well: { phonetic: "/wel/", meaning: "好；顺利地" },
  busy: { phonetic: "/ˈbɪzi/", meaning: "忙碌的" },
  work: { phonetic: "/wɜːrk/", meaning: "工作" },
  feeling: { phonetic: "/ˈfiːlɪŋ/", meaning: "感觉" },
  catch: { phonetic: "/kætʃ/", meaning: "赶上；叙旧" },
  soon: { phonetic: "/suːn/", meaning: "很快" },
  definitely: { phonetic: "/ˈdefɪnətli/", meaning: "当然；肯定地" },
  free: { phonetic: "/friː/", meaning: "空闲的；免费的" },
  weekend: { phonetic: "/ˌwiːkˈend/", meaning: "周末" },
  saturday: { phonetic: "/ˈsætərdeɪ/", meaning: "星期六" },
  afternoon: { phonetic: "/ˌæftərˈnuːn/", meaning: "下午" },
  works: { phonetic: "/wɜːrks/", meaning: "奏效；合适" },
  perfectly: { phonetic: "/ˈpɜːrfɪktli/", meaning: "完美地；完全地" },
  great: { phonetic: "/ɡreɪt/", meaning: "好的；伟大的" },
  "let's": { phonetic: "/lets/", meaning: "让我们" },
  cafe: { phonetic: "/kæˈfeɪ/", meaning: "咖啡馆" },
  downtown: { phonetic: "/ˈdaʊnˈtaʊn/", meaning: "市中心" },
  heard: { phonetic: "/hɜːrd/", meaning: "听说；听到" },
  things: { phonetic: "/θɪŋz/", meaning: "事情；事物" },
  coffee: { phonetic: "/ˈkɔːfi/", meaning: "咖啡" },
  disappointed: { phonetic: "/ˌdɪsəˈpɔɪntɪd/", meaning: "失望的" },
  shall: { phonetic: "/ʃæl/", meaning: "将；好吗" },
  say: { phonetic: "/seɪ/", meaning: "说；表示" },
  around: { phonetic: "/əˈraʊnd/", meaning: "大约；在周围" },
  looking: { phonetic: "/ˈlʊkɪŋ/", meaning: "期待；看" },
  forward: { phonetic: "/ˈfɔːrwərd/", meaning: "向前；期待" },
  productive: { phonetic: "/prəˈdʌktɪv/", meaning: "高效的" },
  enjoying: { phonetic: "/ɪnˈdʒɔɪɪŋ/", meaning: "享受" },
  lately: { phonetic: "/ˈleɪtli/", meaning: "最近" },
  taking: { phonetic: "/ˈteɪkɪŋ/", meaning: "参加；拿取" },
  photography: { phonetic: "/fəˈtɑːɡrəfi/", meaning: "摄影" },
  class: { phonetic: "/klæs/", meaning: "课程；班级" },
  fascinating: { phonetic: "/ˈfæsɪneɪtɪŋ/", meaning: "迷人的；很有趣的" },
  subjects: { phonetic: "/ˈsʌbdʒɪkts/", meaning: "主题；科目" },
  focus: { phonetic: "/ˈfoʊkəs/", meaning: "专注；焦点" },
  mostly: { phonetic: "/ˈmoʊstli/", meaning: "主要地" },
  street: { phonetic: "/striːt/", meaning: "街道" },
  architecture: { phonetic: "/ˈɑːrkɪtektʃər/", meaning: "建筑；建筑学" },
  city: { phonetic: "/ˈsɪti/", meaning: "城市" },
  urban: { phonetic: "/ˈɜːrbən/", meaning: "城市的" },
  life: { phonetic: "/laɪf/", meaning: "生活；生命" },
  requires: { phonetic: "/rɪˈkwaɪərz/", meaning: "需要" },
  timing: { phonetic: "/ˈtaɪmɪŋ/", meaning: "时机" },
  patience: { phonetic: "/ˈpeɪʃəns/", meaning: "耐心" },
  details: { phonetic: "/ˈdiːteɪlz/", meaning: "细节" },
  considered: { phonetic: "/kənˈsɪdərd/", meaning: "考虑过" },
  exhibiting: { phonetic: "/ɪɡˈzɪbɪtɪŋ/", meaning: "展出" },
  gallery: { phonetic: "/ˈɡæləri/", meaning: "画廊" },
  portfolio: { phonetic: "/pɔːrtˈfoʊlioʊ/", meaning: "作品集" },
  perspective: { phonetic: "/pərˈspektɪv/", meaning: "视角；观点" },
  encouragement: { phonetic: "/ɪnˈkɜːrɪdʒmənt/", meaning: "鼓励" },
  appreciate: { phonetic: "/əˈpriːʃieɪt/", meaning: "感激；欣赏" },
  travel: { phonetic: "/ˈtrævəl/", meaning: "旅行" },
  account: { phonetic: "/əˈkaʊnt/", meaning: "账户" },
  doctor: { phonetic: "/ˈdɑːktər/", meaning: "医生" },
  school: { phonetic: "/skuːl/", meaning: "学校" },
  welcome: { phonetic: "/ˈwelkəm/", meaning: "欢迎" },
  good: { phonetic: "/ɡʊd/", meaning: "好的" },
  morning: { phonetic: "/ˈmɔːrnɪŋ/", meaning: "早上" },
  please: { phonetic: "/pliːz/", meaning: "请" },
  thank: { phonetic: "/θæŋk/", meaning: "感谢" },
  water: { phonetic: "/ˈwɔːtər/", meaning: "水" },
  meeting: { phonetic: "/ˈmiːtɪŋ/", meaning: "会议" },
  payment: { phonetic: "/ˈpeɪmənt/", meaning: "支付" },
  appointment: { phonetic: "/əˈpɔɪntmənt/", meaning: "预约" },
  package: { phonetic: "/ˈpækɪdʒ/", meaning: "包裹" },
  teacher: { phonetic: "/ˈtiːtʃər/", meaning: "老师" },
  excuse: { phonetic: "/ɪkˈskjuːz/", meaning: "原谅；借口" },
  could: { phonetic: "/kʊd/", meaning: "能够（过去式）" },
  tell: { phonetic: "/tel/", meaning: "告诉" },
  central: { phonetic: "/ˈsentrəl/", meaning: "中心的" },
  station: { phonetic: "/ˈsteɪʃən/", meaning: "车站" },
  sure: { phonetic: "/ʃʊr/", meaning: "当然；确信" },
  take: { phonetic: "/teɪk/", meaning: "拿；花费" },
  subway: { phonetic: "/ˈsʌbweɪ/", meaning: "地铁" },
  line: { phonetic: "/laɪn/", meaning: "线；线路" },
  get: { phonetic: "/ɡet/", meaning: "得到" },
  off: { phonetic: "/ɔːf/", meaning: "离开；关闭" },
  third: { phonetic: "/θɜːrd/", meaning: "第三" },
  stop: { phonetic: "/stɑːp/", meaning: "停止" },
  really: { phonetic: "/ˈriːəli/", meaning: "真正地" },
  about: { phonetic: "/əˈbaʊt/", meaning: "关于；大约" },
  ten: { phonetic: "/ten/", meaning: "十" },
  minutes: { phonetic: "/ˈmɪnɪts/", meaning: "分钟" },
  walk: { phonetic: "/wɔːk/", meaning: "走" },
  fast: { phonetic: "/fæst/", meaning: "快的" },
  thanks: { phonetic: "/θæŋks/", meaning: "谢谢" },
  help: { phonetic: "/help/", meaning: "帮助" },
  safe: { phonetic: "/seɪf/", meaning: "安全的" },
  trip: { phonetic: "/trɪp/", meaning: "旅行" },
  check: { phonetic: "/tʃek/", meaning: "检查" },
  flight: { phonetic: "/flaɪt/", meaning: "航班" },
  tokyo: { phonetic: "/ˈtoʊkioʊ/", meaning: "东京" },
  passport: { phonetic: "/ˈpæspɔːrt/", meaning: "护照" },
  ticket: { phonetic: "/ˈtɪkɪt/", meaning: "票" },
  here: { phonetic: "/hɪr/", meaning: "这里" },
  need: { phonetic: "/niːd/", meaning: "需要" },
  backpack: { phonetic: "/ˈbækpæk/", meaning: "背包" },
  small: { phonetic: "/smɔːl/", meaning: "小的" },
  enough: { phonetic: "/ɪˈnʌf/", meaning: "足够的" },
  carry: { phonetic: "/ˈkæri/", meaning: "携带" },
  on: { phonetic: "/ɑːn/", meaning: "在……上" },
  window: { phonetic: "/ˈwɪndoʊ/", meaning: "窗户" },
  aisle: { phonetic: "/aɪl/", meaning: "过道" },
  seat: { phonetic: "/siːt/", meaning: "座位" },
  available: { phonetic: "/əˈveɪləbl/", meaning: "可用的" },
  certainly: { phonetic: "/ˈsɜːrtənli/", meaning: "当然" },
  boarding: { phonetic: "/ˈbɔːrdɪŋ/", meaning: "登机" },
  pass: { phonetic: "/pæs/", meaning: "通过；通行证" },
  starts: { phonetic: "/stɑːrts/", meaning: "开始" },
  gate: { phonetic: "/ɡeɪt/", meaning: "大门；登机口" },
  close: { phonetic: "/kloʊz/", meaning: "关闭" },
  departure: { phonetic: "/dɪˈpɑːrtʃər/", meaning: "出发" },
  got: { phonetic: "/ɡɑːt/", meaning: "得到（过去式）" },
  lounge: { phonetic: "/laʊndʒ/", meaning: "休息室" },
  use: { phonetic: "/juːz/", meaning: "使用" },
  access: { phonetic: "/ˈækses/", meaning: "进入；使用权" },
  star: { phonetic: "/stɑːr/", meaning: "星星" },
  alliance: { phonetic: "/əˈlaɪəns/", meaning: "联盟" },
  near: { phonetic: "/nɪr/", meaning: "靠近" },
  baggage: { phonetic: "/ˈbæɡɪdʒ/", meaning: "行李" },
  claim: { phonetic: "/kleɪm/", meaning: "认领；声称" },
  area: { phonetic: "/ˈeriə/", meaning: "区域" },
  follow: { phonetic: "/ˈfɑːloʊ/", meaning: "跟随" },
  signs: { phonetic: "/saɪnz/", meaning: "标志" },
  level: { phonetic: "/ˈlevəl/", meaning: "水平；楼层" },
  carousel: { phonetic: "/ˌkærəˈsel/", meaning: "旋转传送带" },
  number: { phonetic: "/ˈnʌmbər/", meaning: "数字" },
  currency: { phonetic: "/ˈkɜːrənsi/", meaning: "货币" },
  exchange: { phonetic: "/ɪksˈtʃeɪndʒ/", meaning: "交换；兑换" },
  desk: { phonetic: "/desk/", meaning: "桌子" },
  nearby: { phonetic: "/ˌnɪrˈbaɪ/", meaning: "附近" },
  yes: { phonetic: "/jes/", meaning: "是" },
  right: { phonetic: "/raɪt/", meaning: "右边；正确的" },
  next: { phonetic: "/nekst/", meaning: "下一个" },
  exit: { phonetic: "/ˈeɡzɪt/", meaning: "出口" },
  gates: { phonetic: "/ɡeɪts/", meaning: "大门（复数）" },
  left: { phonetic: "/left/", meaning: "左边" },
  reservation: { phonetic: "/ˌrezərˈveɪʃən/", meaning: "预订" },
  under: { phonetic: "/ˈʌndər/", meaning: "在……下面" },
  name: { phonetic: "/neɪm/", meaning: "名字" },
  smith: { phonetic: "/smɪθ/", meaning: "史密斯" },
  grand: { phonetic: "/ɡrænd/", meaning: "宏大的；豪华的" },
  hotel: { phonetic: "/hoʊˈtel/", meaning: "酒店" },
  pull: { phonetic: "/pʊl/", meaning: "拉" },
  file: { phonetic: "/faɪl/", meaning: "文件" },
  breakfast: { phonetic: "/ˈbrekfəst/", meaning: "早餐" },
  included: { phonetic: "/ɪnˈkluːdɪd/", meaning: "包括的" },
  room: { phonetic: "/ruːm/", meaning: "房间" },
  rate: { phonetic: "/reɪt/", meaning: "费率；速度" },
  complimentary: { phonetic: "/ˌkɑːmplɪˈmentəri/", meaning: "免费的；赠送的" },
  buffet: { phonetic: "/bəˈfeɪ/", meaning: "自助餐" },
  served: { phonetic: "/sɜːrvd/", meaning: "服务；上菜" },
  wonderful: { phonetic: "/ˈwʌndərfəl/", meaning: "精彩的" },
  wake: { phonetic: "/weɪk/", meaning: "醒来" },
  call: { phonetic: "/kɔːl/", meaning: "打电话；呼叫" },
  tomorrow: { phonetic: "/təˈmɑːroʊ/", meaning: "明天" },
  consider: { phonetic: "/kənˈsɪdər/", meaning: "考虑" },
  done: { phonetic: "/dʌn/", meaning: "完成" },
  key: { phonetic: "/kiː/", meaning: "钥匙；关键" },
  card: { phonetic: "/kɑːrd/", meaning: "卡片" },
  connect: { phonetic: "/kəˈnekt/", meaning: "连接" },
  network: { phonetic: "/ˈnetwɜːrk/", meaning: "网络" },
  password: { phonetic: "/ˈpæswɜːrd/", meaning: "密码" },
  back: { phonetic: "/bæk/", meaning: "后面；背部" },
};

export function getWordDefinition(word: string): WordDefinition {
  const clean = cleanLookupWord(word);
  return WORDS[clean] ?? { phonetic: "", meaning: "暂未找到释义" };
}

export function cleanLookupWord(word: string) {
  return word.toLowerCase().replace(/[^a-z'-]/g, "");
}

const remoteCache = new Map<string, WordDefinition>();

export async function lookupWordDefinition(word: string): Promise<WordDefinition> {
  const clean = cleanLookupWord(word);
  const local = getWordDefinition(clean);
  if (!clean) return local;
  const cached = remoteCache.get(clean);
  if (cached) return cached;
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`);
    if (!response.ok) return local;
    const payload = await response.json() as Array<{
      phonetic?: string;
      phonetics?: Array<{ text?: string; audio?: string }>;
      meanings?: Array<{ definitions?: Array<{ definition?: string }> }>;
    }>;
    const entry = payload[0];
    
    // 优先获取音标：先尝试 phonetic 字段，再从 phonetics 数组中查找有 text 的项
    const phonetic = entry?.phonetic ?? entry?.phonetics?.find((item) => item.text)?.text ?? local.phonetic;
    
    // 获取英文释义
    const englishMeaning = entry?.meanings?.flatMap((meaning) => meaning.definitions ?? []).map((item) => item.definition).find(Boolean);
    
    if (!englishMeaning) return { phonetic, meaning: local.meaning };
    
    try {
      // 翻译英文释义为中文
      const translationResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishMeaning)}&langpair=en|zh-CN`);
      const translationPayload = await translationResponse.json() as { responseData?: { translatedText?: string } };
      const result = { phonetic, meaning: translationPayload.responseData?.translatedText?.trim() || local.meaning };
      remoteCache.set(clean, result);
      return result;
    } catch {
      return { phonetic, meaning: local.meaning };
    }
  } catch {
    return local;
  }
}
