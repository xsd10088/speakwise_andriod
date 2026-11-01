# 爬虫依赖项

本目录包含从可可英语官网爬取名著精读课文的脚本。

## 依赖

- Node.js 18+
- 内置 https/http 模块（无需额外安装）

## 使用方法

```bash
# 运行爬虫
node scripts/crawl-keke-reading.js

# 输出文件位于:
# - data/keke-reading/siddhartha-lesson.json
# - data/keke-reading/store.json
```

## 输出格式

每个课文包含：
- `id` - 唯一标识
- `title` - 课题标题
- `audioUrl` - 音频文件URL
- `transcript[]` - 英文句子数组
- `translation[]` - 中文翻译数组
- `source` - 数据来源