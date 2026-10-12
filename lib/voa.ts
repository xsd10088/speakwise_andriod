import { callTrpcMutation, getApiBaseUrl } from "@/lib/api";
import type { DifficultyLevel, ListeningLine } from "@/lib/data";

export type VoaLevel = 1 | 2 | 3;

export const VOA_LEVEL_DIFFICULTY: Record<VoaLevel, DifficultyLevel> = {
  1: "beginner",
  2: "medium",
  3: "advanced",
};

export const VOA_LEVEL_TITLES: Record<VoaLevel, string> = {
  1: "Level 1 入门",
  2: "Level 2 进阶",
  3: "Level 3 高级",
};

export type VoaLesson = {
  id: string;
  title: string;
  audioUrl: string;
  durationSec?: number | null;
  transcript: string[];
  translation: string[];
};

export type VoaCourse = {
  id: string;
  title: string;
  level: VoaLevel;
  description: string;
  lessonCount: number;
  lessons?: VoaLesson[];
};

type VoaCoursesResponse = { courses?: VoaCourse[] };
type VoaDetailResponse = { course?: VoaCourse; lessons?: VoaLesson[] };

// 本地内置占位数据：VOA Learning English 公共领域内容（美国政府作品）。
// 服务端 voa.courses / voa.detail 端点上线前用于联调。
const LOCAL_COURSES: VoaCourse[] = [
  {
    id: "lets-learn-english-basics",
    title: "每日英语入门",
    level: 1,
    description:
      "Let's Learn English 风格的入门课程：简单现在时、基础词汇与日常表达。",
    lessonCount: 1,
    lessons: [
      {
        id: "lets-learn-english-basics-jobs",
        title: "What Job Do You Want in the Future?",
        audioUrl: "",
        durationSec: null,
        transcript: [
          "Hello, I'm Anna. Today we learn about jobs.",
          "What job do you want in the future?",
          "I want to be a teacher. I like children.",
          "She wants to be a doctor. She helps people.",
          "He wants to be a cook. He makes delicious food.",
          "What do you want to be?",
          "I want to be a singer. I love music.",
          "We want to be good students.",
          "Study English every day.",
          "Practice makes perfect.",
        ],
        translation: [
          "你好，我是安娜。今天我们学习关于工作。",
          "你将来想要什么工作？",
          "我想成为一名老师。我喜欢孩子。",
          "她想成为一名医生。她帮助别人。",
          "他想成为一名厨师。他做美味的食物。",
          "你想成为什么？",
          "我想成为一名歌手。我热爱音乐。",
          "我们想成为好学生。",
          "每天学习英语。",
          "熟能生巧。",
        ],
      },
    ],
  },
  {
    id: "as-it-is",
    title: "As It Is",
    level: 2,
    description:
      "VOA Learning English 杂志式节目：中级水平，语速放慢三分之一。",
    lessonCount: 1,
    lessons: [
      {
        id: "as-it-is-south-korea-birth-rate",
        title: "Researchers: South Korea's Birth Rate Increase Last Year Unclear",
        audioUrl: "",
        durationSec: 275,
        transcript: [
          "In 2024, the number of babies born in South Korea increased for the first time in nine years. The change is welcome news for a country that is dealing with serious population problems.",
          "South Korea's statistics agency said recently that 238,300 babies were born last year, an increase of 8,300 from a year earlier.",
          "The agency said the country's fertility rate — the average number of babies born to each woman in her reproductive years — was 0.75 in 2024, up from 0.72 in 2023.",
          "The data represents the first time that the yearly number of births has increased since 2015.",
          "Choi Yoon Kyung is an expert with the Korea Institute of Child Care and Education. Choi told the Associated Press that researchers must wait for more data over the next few years to see if increased births were driven by “structural changes.”",
          "Park Hyun Jung is with the government agency Statistics Korea. Park said the agency believes the rise is partly due to an increase in marriages following postponements of such plans during the COVID-19 pandemic.",
          "Park said another reason for the increase is that a growing number of people entered their early 30s. She also noted a government study that shows a small increase in the number of young people hoping to have children after marriage.",
          "Official data show South Korea's fertility rate has been the lowest in the developed world in recent years. In 2022, South Korea was the only country with a fertility rate below one, among members of the Paris-based Organization for Economic Cooperation and Development.",
          "The low fertility rate could threaten South Korea's economic health. The country, Asia's fourth largest economy, could face labor shortages and greater spending on public assistance programs. South Korea's central and local governments have been increasingly offering several support programs to those who give birth to children.",
          "But experts say that it will be difficult to solve the country's population problems. Many young people say they do not want to have babies. Their reasons include costly housing, low levels of upward social movement, the high costs of raising and educating children, and a culture that requires women to do more of the childcare.",
          "Park said that the fertility rate will likely stay on an upward movement at least for another year. But observers say it remains to be seen whether the rate will go back down as post-pandemic marriages even out. The country's population structure will also change, with a drop in the number of people in their early 30s.",
          "Some experts argue that the government should pay more attention to supporting young couples who want to have babies.",
          "“There are still people with solid wills to have a family and babies. When we help them realize their hopes, our fertility rate won't suffer a steep, 45-degree drop,” Choi said.",
          "I'm John Russell.",
          "Hyung-Jin Kim reported on this story for the Associated Press. John Russell adapted it for VOA Learning English.",
        ],
        translation: [
          "2024年，韩国新生儿数量九年来首次增长。这一变化对于一个正面临严重人口问题的国家来说是个好消息。",
          "韩国统计机构最近表示，去年出生了23.83万名婴儿，比前一年增加了8300名。",
          "该机构表示，韩国的总和生育率——即每位育龄妇女平均生育的婴儿数量——在2024年为0.75，高于2023年的0.72。",
          "这是自2015年以来年度出生数量首次增加。",
          "崔允京（音译）是韩国儿童保育与教育研究院的专家。她告诉美联社，研究人员必须等待未来几年的更多数据，才能判断出生率上升是否由“结构性变化”推动。",
          "朴贤贞（音译）任职于政府机构韩国统计厅。朴表示，该机构认为出生率上升部分原因是新冠疫情期间推迟的结婚计划如今增加。",
          "朴表示，另一个原因是越来越多的人进入30岁出头。她还提到一项政府研究显示，希望婚后生育的年轻人数量略有增加。",
          "官方数据显示，韩国近年来的生育率是发达国家中最低的。2022年，在总部位于巴黎的经济合作与发展组织成员国中，韩国是唯一一个生育率低于1的国家。",
          "低生育率可能威胁韩国的经济健康。这个亚洲第四大经济体可能面临劳动力短缺和公共援助支出增加。韩国中央和地方政府一直在为生育者提供多项支持计划。",
          "但专家表示，解决韩国的人口问题将很困难。许多年轻人表示他们不想生孩子。原因包括高昂的房价、向上的社会流动水平低、养育和教育孩子的高成本，以及要求女性承担更多育儿责任的文化。",
          "朴表示，生育率至少在未来一年可能继续保持上升。但观察人士表示，随着疫情后的结婚潮趋于平稳，生育率是否会回落还有待观察。该国的人口结构也将发生变化，30岁出头的人数将减少。",
          "一些专家认为，政府应该更加关注支持想要孩子的年轻夫妇。",
          "崔说：“仍然有人坚定地想要组建家庭和生孩子。当我们帮助他们实现愿望时，我们的生育率就不会出现45度的陡峭下降。”",
          "我是约翰·拉塞尔。",
          "金亨镇（音译）为美联社报道了这篇新闻。约翰·拉塞尔为美国之音慢速英语改编。",
        ],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    level: 3,
    description:
      "VOA Learning English 教育栏目：高级水平，涵盖校园、科技与学习方法。",
    lessonCount: 1,
    lessons: [
      {
        id: "education-gamifying-classroom",
        title: "Teachers Use Games for More Enjoyable Learning",
        audioUrl: "",
        durationSec: null,
        transcript: [
          "Wordle has become one of the most popular online games in the United States since it came out last October.",
          "Players get six chances to guess and learn a five-letter word for the day. Many are sharing their game results on social media, adding more interest in the game.",
          "Creative teachers have long found games could make their classes more enjoyable for students. During the pandemic, many have looked for new ways or games to help their students learn. It is part of a learning theory called “gamification” to keep students' interest.",
          "Beyond Wordle, here are other games that help learners with different subjects.",
          "British data scientist Richard Mann of London was talking with his daughter about the popularity of Wordle. He thought there should be a game for people who like mathematics and developed Nerdle. It is a daily game in which a player has six tries to guess a math solution.",
          "Does it sound familiar? Math teachers note that a Nerdle player uses logic, a careful way of thinking about something, to solve a math problem. It is similar to how a Wordle player applies logic to guess a word.",
          "Do not confuse Wordle with Worldle. There is an extra letter “l” in Worldle. French video game developer Antoine Teuf said he invented Worldle in honor of that word game, Wordle.",
          "Players guess a country based on its shape. They get six tries to guess a country based on information about the country. Teuf first shared the game on January 22. He said there are two million visits a day to the game's page a month later.",
          "Teachers of English see word games as a way for students to learn new words. Other word games include Blooket and Flippity.",
          "Teachers create quizzes in Blooket similar to the kinds of games students play on mobile devices. They can look at results and see areas that students can improve.",
          "In Flippity, teachers can create flash cards, rewards, spelling quizzes, memory games and word searches from a simple Google spreadsheet. It is also a good tool for students to create their own projects.",
          "There are several online services that teachers could use to “gamify” learning. They include Kahoot!, Quizlet, Quizziz and Nearpod. All of them “gamify” learning by creating competition among learners while reviewing the content presented by teachers.",
          "In many places, teachers and students do not have a computer. So, English language teacher Larry Ferlazzo asked them to share their language-learning games.",
          "I'm Jill Robbins. Jill Robbins wrote this lesson for Learning English.",
        ],
        translation: [
          "自去年十月推出以来，Wordle 已成为美国最受欢迎的在线游戏之一。",
          "玩家有六次机会猜测并学习当天的五个字母单词。许多人在社交媒体上分享游戏结果，为游戏增添了更多趣味。",
          "有创意的老师长期以来发现游戏可以让学生更喜欢上课。在疫情期间，许多人寻找新的方式或游戏来帮助学生学习。这是被称为“游戏化”的学习理论的一部分，旨在保持学生的兴趣。",
          "除了 Wordle，这里还有其他帮助不同学科学习者的游戏。",
          "英国数据科学家、伦敦人理查德·曼在和女儿谈论 Wordle 的流行。他认为应该有一款适合喜欢数学的人的游戏，于是开发了 Nerdle。这是一款每日游戏，玩家有六次机会猜测数学答案。",
          "听起来熟悉吗？数学老师指出，Nerdle 玩家使用逻辑——一种仔细思考问题的方式——来解决数学问题。这与 Wordle 玩家运用逻辑猜单词类似。",
          "不要把 Wordle 和 Worldle 混淆。Worldle 里多了一个字母“l”。法国电子游戏开发者安托万·托夫表示，他发明 Worldle 是为了向这款文字游戏 Wordle 致敬。",
          "玩家根据形状猜测国家。他们有六次机会根据关于国家的信息猜测国家。托夫在1月22日首次分享了这款游戏。一个月后他说，游戏页面每天有两百万次访问。",
          "英语老师认为文字游戏是学生学习新单词的一种方式。其他文字游戏包括 Blooket 和 Flippity。",
          "老师在 Blooket 中创建的测验类似于学生在移动设备上玩的游戏。他们可以查看结果，了解学生可以进步的领域。",
          "在 Flippity 中，老师可以用一个简单的谷歌电子表格创建抽认卡、奖励、拼写测验、记忆游戏和字谜。它也是学生创建自己项目的好工具。",
          "有几个在线服务可以帮助老师将学习“游戏化”。它们包括 Kahoot!、Quizlet、Quizziz 和 Nearpod。它们通过在复习老师呈现的内容时在学习者之间制造竞争，将学习“游戏化”。",
          "在许多地方，老师和学生没有电脑。因此，英语老师拉里·费尔拉佐让他们分享自己的语言学习游戏。",
          "我是吉尔·罗宾斯。吉尔·罗宾斯为慢速英语编写了这节课。",
        ],
      },
    ],
  },
];

export function getLocalCourses(): VoaCourse[] {
  return LOCAL_COURSES.map((course) => ({
    ...course,
    lessonCount: course.lessons?.length ?? course.lessonCount,
  }));
}

export function getLocalCourse(id: string): VoaCourse | undefined {
  return LOCAL_COURSES.find((course) => course.id === id);
}

export function getLocalLessons(courseId: string): VoaLesson[] {
  return getLocalCourse(courseId)?.lessons ?? [];
}

export async function fetchVoaCourses(
  level?: VoaLevel,
): Promise<VoaCourse[]> {
  try {
    const response = await callTrpcMutation<VoaCoursesResponse>(
      "voa.courses",
      level ? { level } : {},
      { timeoutMs: 10_000, retries: 1 },
    );
    const courses = response?.courses;
    if (Array.isArray(courses) && courses.length > 0) {
      return level ? courses.filter((course) => course.level === level) : courses;
    }
  } catch {
    // 服务端端点未部署时回退本地占位数据
  }

  const local = getLocalCourses();
  return level ? local.filter((course) => course.level === level) : local;
}

export async function fetchVoaCourseDetail(
  id: string,
): Promise<{ course: VoaCourse | null; lessons: VoaLesson[] }> {
  try {
    const response = await callTrpcMutation<VoaDetailResponse>(
      "voa.detail",
      { id },
      { timeoutMs: 10_000, retries: 1 },
    );
    if (response?.course) {
      return {
        course: response.course,
        lessons: response.lessons ?? [],
      };
    }
  } catch {
    // 服务端端点未部署时回退本地占位数据
  }

  const course = getLocalCourse(id);
  return {
    course: course ?? null,
    lessons: course?.lessons ?? [],
  };
}

export function voaLessonToLines(lesson: VoaLesson): ListeningLine[] {
  return lesson.transcript.map((text, index) => ({
    id: `${lesson.id}-${index + 1}`,
    speaker: index % 2 === 0 ? "Alex" : "Mia",
    text,
    translation: lesson.translation[index] ?? "",
    note: "VOA Learning English",
  }));
}

export function voaAudioBaseUrl(): string {
  return getApiBaseUrl().replace(/\/$/, "");
}
