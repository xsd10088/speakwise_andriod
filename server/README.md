# SpeakWise VOA 镜像服务端原型

"精品听读"模块的服务端原型：镜像 VOA Learning English 课程（音频 + 文稿），
供 App 在国内无需 VPN 可听读。VOA 内容属美国政府作品（公共领域），可合法
镜像分发（个别含第三方图片/音乐的内容需逐条核对）。

## 运行

零外部依赖（仅 Node 内置模块），Node 24 可直接运行 TypeScript：

```bash
node --experimental-strip-types server/index.ts
```

环境变量：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | `3000` | 监听端口 |
| `HOST` | `0.0.0.0` | 监听地址 |
| `VOA_DATA_DIR` | `server/data` | 数据目录（音频 + store.json） |
| `VOA_REFRESH_ON_START` | `true` | 启动时后台刷新 |
| `VOA_REFRESH_INTERVAL_MS` | `6h` | 定时刷新间隔 |

## API

App 的 tRPC 客户端（`lib/api.ts` 的 `callTrpcMutation`）契约：

- `POST /api/trpc/voa.courses?batch=1` — 课程列表
  - 入参 `{ level?: 1|2|3 }`，返回 `{ courses: [{ id, title, level, description, lessonCount, updatedAt }] }`
- `POST /api/trpc/voa.detail?batch=1` — 课程详情
  - 入参 `{ id }`，返回 `{ course, lessons: [{ id, title, audioUrl, durationSec, transcript[], translation[], publishedAt }] }`
- `GET /api/voa/courses`、`GET /api/voa/courses/:id` — 同上的 REST 形式（浏览器调试用）
- `POST /api/voa/refresh` — 手动触发刷新（入参 `{ feedId? , level? }`）
- `GET /audio/:file` — 已下载的 MP3（`Cache-Control: public, max-age=86400`）

## 抓取管线

1. **RSS 抓取**（`server/voa/feeds.ts` 注册表）：VOA Learning English 各栏目
   feed（`/api/{token}`），解析标题、级别、链接、发布时间。
2. **文章页抓取**（`server/voa/article.ts`）：从 `/a/{id}.html` 提取
   `<audio src>`（优先 128kbps HQ）、`div.wsw` 文稿段落、播放器时长。
   纯视频页（无文稿）自动跳过。
3. **音频下载**：MP3 存 `server/data/audio/`，URL 由服务端 `/audio/:file` 提供。
4. **翻译**：mymemory → Google Translate 回退链（与 App 端 `lib/word.ts` 同源），
   结果随文稿缓存。
5. **TTL 缓存**：每 feed 6 小时刷新（`FEED_TTL_MS`），`store.json` 记录
   `lastFetched`；遵守 robots.txt（仅抓取允许的 `/api/` 与 `/a/` 路径）；
   请求间隔 1.5s（文章）/ 0.5s（下载），失败重试 2 次。

## 部署到 manus 服务端

原型为独立零依赖实现。生产部署（speakwise-wsicpu2u.manus.space）可按
`speakwise_web` 服务端的技术栈（Express + tRPC + drizzle + S3）移植：
- `server/voa/*.ts` 的解析/抓取逻辑可直接复用
- 存储层从 JSON 文件换成 drizzle + S3（`store.ts` 是唯一需要替换的边界）
- tRPC procedure 注册到现有 `server/routers.ts`

## 测试

```bash
pnpm test   # vitest，含 server/voa/*.test.ts（RSS/文章/抓取/TTL，fixture 驱动）
```
