# SpeakWise CI 构建错误修复交接文档（谷歌离线 TTS 设置 Intent）

## 1. 任务概述

**任务时间：** 2026年10月12日  
**任务目标：**
1. 检查 GitHub Actions 构建错误原因（运行 #37，提交 6da7071 失败）
2. 继续完成听力训练对话角色指定男女声的修改（该部分已在 6da7071 实现，本次确认不受构建错误影响）

**执行结果：** ✅ 构建错误已修复，提交 `2992133`，已推送至 `feature/android-parity-xsd10088`。  
**待办：** CI 手动构建验证 + 真机验证（见第 6、7 节）。

## 2. 构建错误现象

- **CI 运行：** Android preview APK (GitHub runner) #37（run id `38198372766`，check run `114646032199`）
- **触发提交：** `6da7071`（谷歌离线 TTS 自动安装与角色语音）
- **结果：** `Build release APK without EAS` 失败，耗时 23m 45s
- **对照：** 运行 #36（提交 `e39d3a8`）成功 → 确认是 6da7071 引入的回归

**Gradle 错误（日志 `10_Build release APK with Gradle.txt` 第 1017-1028 行）：**

```
e: .../android/app/src/main/java/com/speakwise/app/GoogleTtsModule.kt:75:36 Unresolved reference 'ACTION_TEXT_TO_SPEECH_SETTINGS'.
e: .../GoogleTtsModule.kt:75:68 Cannot infer type for this parameter. Specify it explicitly.
e: .../GoogleTtsModule.kt:75:68 Unresolved reference. None of the following candidates is applicable because of a receiver type mismatch:
    fun <T> T.apply(block: T.() -> Unit): T
e: .../GoogleTtsModule.kt:75:74 Cannot infer type for this parameter. Specify it explicitly.
e: .../GoogleTtsModule.kt:76:9 Unresolved reference 'addFlags'.
> Task :app:compileReleaseKotlin FAILED
...
BUILD FAILED in 22m 49s
```

第 75 行原代码：`val intent = Intent(Settings.ACTION_TEXT_TO_SPEECH_SETTINGS).apply {`

## 3. 根因分析

**`android.provider.Settings.ACTION_TEXT_TO_SPEECH_SETTINGS` 在 Android SDK 中根本不存在。**

证据链：
1. **AOSP 源码核对**：下载 `platform_frameworks_base` master 分支完整 `Settings.java`（835KB）全文搜索 `TEXT_TO_SPEECH`，无任何匹配。`android.provider.Settings` 中只有 `Settings.Secure.TTS_DEFAULT_SYNTH` / `TTS_DEFAULT_RATE` / `TTS_DEFAULT_PITCH` 等**设置值键**，没有 TTS 设置页的 **intent action 常量**。
2. **API 23 源码核对**（android-sdk-sources-for-api-level-23）：同样无此常量。
3. **CI 编译器是权威**：compileSdk 36 的 android.jar 中无此常量，Kotlin 编译报 `Unresolved reference`。
4. `Settings.Secure.getString(...)`（第 34 行）编译正常 → 说明 `import android.provider.Settings` 本身没问题，仅该常量不存在。

**正确的 TTS 设置页 action 是 `com.android.settings.TTS_SETTINGS`：**
- AOSP Settings 应用 `Settings$TextToSpeechSettingsActivity` 的 intent-filter 声明：
  ```xml
  <action android:name="com.android.settings.TTS_SETTINGS" />
  <category android:name="android.intent.category.DEFAULT" />
  ```
- CTS 验证器 `cts/apps/CtsVerifier/.../TtsTestActivity.java` 使用 `startActivity(Intent("com.android.settings.TTS_SETTINGS"))`
- 自 Eclair（API 7）至今所有 AOSP 版本均有效，是打开系统 TTS 设置页的标准做法

**为什么不需要显式加 `Intent.CATEGORY_DEFAULT`：** 隐式 intent 不带 category 时能匹配带 DEFAULT category 的 filter（与 `new Intent(Settings.ACTION_WIFI_SETTINGS)` 能在无 category 下正常解析是同一机制），CTS 验证器同款用法也未显式加 category。

**顺带排除的疑点：** expo-file-system 也声明了 FileProvider，但 authority 是 `${applicationId}.FileSystemFileProvider`，与本插件的 `${applicationId}.fileprovider` 不冲突；`androidx.core.content.FileProvider` 经 react-android 传递依赖在 classpath 上（ReactAndroid 自身大量使用 androidx.core）。

## 4. 修复内容

**`plugins/withGoogleTts.ts`**（唯一改动文件，+2/-1）：

```diff
-      val intent = Intent(Settings.ACTION_TEXT_TO_SPEECH_SETTINGS).apply {
+      val intent = Intent(TTS_SETTINGS_ACTION).apply {
         addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
       }
...
   companion object {
     private const val MODULE_NAME = "GoogleTts"
     private const val GOOGLE_TTS_PACKAGE = "com.google.android.tts"
     private const val BUNDLED_APK_NAME = "google-tts.apk"
     private const val SETTING_TTS_DEFAULT_SYNTH = "tts_default_synth"
+    private const val TTS_SETTINGS_ACTION = "com.android.settings.TTS_SETTINGS"
   }
```

JS 层（`lib/googleTts.ts`）只调用原生方法 `openTtsSettings()`，不涉及 action 字符串，无需改动。听力训练角色男女声逻辑（`lib/voice.ts` 的 `GOOGLE_TTS_VOICE_IDS` 表、`app/(tabs)/index.tsx` 的 `voiceSpeaker()`）在 JS 层编译正常，不受本次构建错误影响，功能保持完整。

## 5. 验证结果

| 检查 | 命令 | 结果 |
|------|------|------|
| prebuild 注入 | `pnpm exec expo prebuild --platform android --no-install` | ✅ 生成的 `GoogleTtsModule.kt` 第 75 行为 `Intent(TTS_SETTINGS_ACTION)`，companion 含 `TTS_SETTINGS_ACTION = "com.android.settings.TTS_SETTINGS"`；`Settings` import 保留（`getDefaultTtsEngine` 仍用 `Settings.Secure`）；`MainApplication.kt` 含 `add(GoogleTtsPackage())`；`assets/google-tts.apk`、`res/xml/file_paths.xml` 均在位 |
| 类型检查 | `pnpm typecheck` | ✅ 通过 |
| 单元测试 | `pnpm test` | ✅ 32/32（4 个文件） |
| 组件测试 | `pnpm test:components` | ✅ 8/8（2 个套件） |

⚠️ **未验证项：** 本机沙箱无 Android SDK，**Gradle 编译未在本地验证**，须由 CI 确认。

## 6. Git 与构建信息

- **仓库：** https://github.com/xsd10088/speakwise_andriod
- **分支：** `feature/android-parity-xsd10088`（已推送，与 origin 同步）
- **提交：** `2992133` — "fix: use com.android.settings.TTS_SETTINGS action for TTS settings intent"（plugins/withGoogleTts.ts，+2/-1）
- **前序提交：** `6da7071` — 谷歌离线 TTS 自动安装与角色语音（CI 编译失败，已由 2992133 修复）
- **手动构建：** android-preview.yml 为 `workflow_dispatch` 触发
  - 地址：https://github.com/xsd10088/speakwise_andriod/actions/workflows/android-preview.yml
  - 必填参数 `api_base_url`：`https://speakwise-wsicpu2u.manus.space`（见 `app.config.ts` 的 `extra.apiBaseUrl`）
  - 构建流程：`pnpm typecheck && pnpm test && pnpm test:components` → Gradle assembleRelease → artifact `speakwise-android-release-apk`（保留 14 天）

**排查备注：** GitHub API 的日志下载端点（`/actions/runs/{id}/logs`、`/actions/jobs/{id}/logs`）对公共仓库也要求管理员权限（403 "Must have admin rights to Repository"），完整日志需登录网页手动下载（本次由用户提供 `logs_103489013292.zip`）。check-run 注解（annotations）端点无需管理员，但只给出 "Process completed with exit code 1" 和出错行号。

## 7. 真机验证要点

1. **未装谷歌 TTS 的设备**：启动 App → 弹出系统安装器 → 确认安装 → 再次启动 → 弹出 TTS 设置页（本次修复后能正常打开）→ 选择谷歌 TTS 并设为默认
2. **已装谷歌 TTS 且为默认引擎的设备**：启动无弹窗，听力训练播放时 Alex 为女声、Mia/Mike 为男声
3. 验证方法：`adb shell dumpsys package com.google.android.tts` 确认安装；听力训练页逐句播放对比音色
4. 无 GMS 设备：安装后需在系统设置手动把默认 TTS 切为谷歌 TTS（App 会自动引导一次，24 小时内只引导一次）
5. 若 TTS 设置页打不开：确认设备 Settings 应用响应 `com.android.settings.TTS_SETTINGS`（AOSP 及主流 ROM 均支持；原生模块已对 `ActivityNotFoundException` 做捕获并 reject `E_TTS_NO_SETTINGS`，不会崩溃）

## 8. 后续建议

1. **CI 构建后真机验证**安装流程、TTS 设置页跳转与音色（重点：无 GMS 设备）
2. 若谷歌 TTS 升级导致语音 identifier 变化，更新 `lib/voice.ts` 顶部的 `GOOGLE_TTS_VOICE_IDS` 表
3. 考虑在听力训练页加"当前引擎/语音"状态提示，方便排查音色问题
4. 27MB 内置 APK 使产物变大，若后续支持按架构分包可减小体积

## 9. 新会话提示语

```
项目：SpeakWise Android（c:\speakwise-android-parity，仓库 xsd10088/speakwise_andriod，
分支 feature/android-parity-xsd10088）。

背景：
- 2026-10-11 修复在线查词不稳定（提交 e39d3a8），核心在 lib/word.ts lookupWordDefinition
- 2026-10-12 实现谷歌离线 TTS 自动安装与角色男女声（提交 6da7071）：
  - plugins/withGoogleTts.ts 是 config plugin，prebuild 时注入原生模块/权限/
    FileProvider/APK（android/ 目录由 prebuild 生成，不入 git）
  - lib/googleTts.ts 封装检查/安装/默认引擎引导，app/_layout.tsx 启动时调用
  - 原生模块 GoogleTtsModule（ReactContextBaseJavaModule）暴露：
    isGoogleTtsInstalled / getDefaultTtsEngine / installGoogleTts / openTtsSettings
  - lib/voice.ts 的 selectVoiceForSpeaker 按角色选声：
    Alex=女声(en-us-x-msf00020 等)，Mia/Mike=男声(en-us-x-msm00008 等)，
    谷歌 TTS 语音性别表在文件顶部 GOOGLE_TTS_VOICE_IDS 注释
  - app/(tabs)/index.tsx 的 voiceSpeaker() 映射 Alex→Alex、Mia→Mia、其余→Mike
  - assets/tts/google-tts.apk（27MB）已纳入 git 跟踪
- 2026-10-12 修复 CI 构建错误（提交 2992133）：
  - 根因：plugins/withGoogleTts.ts 生成的 GoogleTtsModule.kt 使用了
    Settings.ACTION_TEXT_TO_SPEECH_SETTINGS，但该常量在 Android SDK 中不存在
    （android.provider.Settings 只有 Settings.Secure.TTS_DEFAULT_SYNTH 等设置值键，
    没有 TTS 设置页 intent action 常量），导致 :app:compileReleaseKotlin 报
    Unresolved reference 'ACTION_TEXT_TO_SPEECH_SETTINGS'
  - 修复：改用字符串常量 TTS_SETTINGS_ACTION = "com.android.settings.TTS_SETTINGS"
    （AOSP Settings 应用的 TextToSpeechSettingsActivity 声明的 action，
    CTS 验证器同款用法，自 Eclair 至今有效）
  - 隐式 intent 不带 category 可匹配带 DEFAULT category 的 filter，
    无需显式 addCategory(Intent.CATEGORY_DEFAULT)

验证命令：pnpm typecheck && pnpm test && pnpm test:components
prebuild：pnpm exec expo prebuild --platform android --no-install
构建：GitHub Actions 工作流 android-preview.yml 为手动触发（workflow_dispatch），
参数 api_base_url=https://speakwise-wsicpu2u.manus.space

注意：
- 本机沙箱无 Android SDK 且网络出口不稳定，Gradle 编译和真机 TTS 效果
  需在 CI/真机验证。Android 不允许静默安装，安装需用户在系统安装器确认。
- GitHub API 的 Actions 日志下载端点需要仓库管理员权限（公共仓库也 403），
  完整日志需登录网页手动下载；check-run annotations 端点可读但只给行号。
- 交接文档（10-12项目交接文档-*.md）按惯例不纳入 git 跟踪。
```

---

**文档版本：** v1.0  
**创建时间：** 2026-10-12  
**关联文档：** `10-12项目交接文档-谷歌离线TTS自动安装与角色语音.md`（任务总文档，已同步更新提交信息）
