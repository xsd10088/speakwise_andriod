import fs from "node:fs";
import path from "node:path";
import {
  ConfigPlugin,
  withAndroidManifest,
  withDangerousMod,
  withMainApplication,
} from "expo/config-plugins";

const GOOGLE_TTS_PACKAGE_NAME = "com.google.android.tts";
const BUNDLED_APK_ASSET_NAME = "google-tts.apk";
const BUNDLED_APK_SOURCE = path.resolve(__dirname, "../assets/tts/google-tts.apk");

const GOOGLE_TTS_MODULE_KOTLIN = `package PACKAGE_PATH_PLACEHOLDER

import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.Settings
import androidx.core.content.FileProvider
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileOutputStream

class GoogleTtsModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = MODULE_NAME

  @ReactMethod
  fun isGoogleTtsInstalled(promise: Promise) {
    try {
      reactContext.packageManager.getPackageInfo(GOOGLE_TTS_PACKAGE, 0)
      promise.resolve(true)
    } catch (e: PackageManager.NameNotFoundException) {
      promise.resolve(false)
    }
  }

  @ReactMethod
  fun getDefaultTtsEngine(promise: Promise) {
    try {
      val engine = Settings.Secure.getString(
        reactContext.contentResolver,
        SETTING_TTS_DEFAULT_SYNTH
      )
      promise.resolve(engine ?: "")
    } catch (e: Exception) {
      promise.resolve("")
    }
  }

  @ReactMethod
  fun installGoogleTts(promise: Promise) {
    try {
      val apk = File(reactContext.cacheDir, BUNDLED_APK_NAME)
      if (!apk.exists()) {
        reactContext.assets.open(BUNDLED_APK_NAME).use { input ->
          FileOutputStream(apk).use { output -> input.copyTo(output) }
        }
      }
      val uri: Uri = FileProvider.getUriForFile(
        reactContext,
        "\${reactContext.packageName}.fileprovider",
        apk
      )
      val intent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(uri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      reactContext.startActivity(intent)
      promise.resolve(true)
    } catch (e: ActivityNotFoundException) {
      promise.reject("E_TTS_NO_INSTALLER", "No package installer activity found", e)
    } catch (e: Exception) {
      promise.reject("E_TTS_INSTALL_FAILED", e.localizedMessage, e)
    }
  }

  @ReactMethod
  fun openTtsSettings(promise: Promise) {
    try {
      val intent = Intent(TTS_SETTINGS_ACTION).apply {
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      reactContext.startActivity(intent)
      promise.resolve(true)
    } catch (e: ActivityNotFoundException) {
      promise.reject("E_TTS_NO_SETTINGS", "No TTS settings activity found", e)
    }
  }

  companion object {
    private const val MODULE_NAME = "GoogleTts"
    private const val GOOGLE_TTS_PACKAGE = "com.google.android.tts"
    private const val BUNDLED_APK_NAME = "google-tts.apk"
    private const val SETTING_TTS_DEFAULT_SYNTH = "tts_default_synth"
    private const val TTS_SETTINGS_ACTION = "com.android.settings.TTS_SETTINGS"
  }
}
`;

const GOOGLE_TTS_PACKAGE_KOTLIN = `package PACKAGE_PATH_PLACEHOLDER

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class GoogleTtsPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
    listOf(GoogleTtsModule(reactContext))

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    emptyList()
}
`;

const FILE_PATHS_XML = `<?xml version="1.0" encoding="utf-8"?>
<paths>
  <cache-path name="tts" path="." />
</paths>
`;

export const withGoogleTts: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    manifest["uses-permission"] = manifest["uses-permission"] ?? [];
    manifest["uses-permission"].push({
      $: { "android:name": "android.permission.REQUEST_INSTALL_PACKAGES" },
    });

    const queries = manifest.queries?.[0];
    if (queries) {
      queries.package = queries.package ?? [];
      queries.package.push({ $: { "android:name": GOOGLE_TTS_PACKAGE_NAME } });
    } else {
      manifest.queries = [
        { $: {}, package: [{ $: { "android:name": GOOGLE_TTS_PACKAGE_NAME } }] },
      ];
    }

    const application = manifest.application?.[0];
    if (application) {
      application.provider = application.provider ?? [];
      application.provider.push({
        $: {
          "android:name": "androidx.core.content.FileProvider",
          "android:authorities": "${applicationId}.fileprovider",
          "android:exported": "false",
          "android:grantUriPermissions": "true",
        },
        "meta-data": [
          {
            $: {
              "android:name": "android.support.FILE_PROVIDER_PATHS",
              "android:resource": "@xml/file_paths",
            },
          },
        ],
      });
    }

    return config;
  });

  config = withMainApplication(config, (config) => {
    const contents = config.modResults.contents;

    config.modResults.contents = contents.includes(
      "// add(MyReactNativePackage())",
    )
      ? contents.replace(
          "// add(MyReactNativePackage())",
          "add(GoogleTtsPackage())",
        )
      : contents.replace(
          /(\.packages\.apply\s*\{)/,
          "$1\n        add(GoogleTtsPackage())",
        );

    return config;
  });

  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.platformProjectRoot;
      const androidPackage =
        config.modRequest.projectConfig?.android?.package ?? "com.speakwise.app";
      const javaDir = path.join(
        projectRoot,
        "app",
        "src",
        "main",
        "java",
        ...androidPackage.split("."),
      );
      const resXmlDir = path.join(projectRoot, "app", "src", "main", "res", "xml");
      const assetsDir = path.join(projectRoot, "app", "src", "main", "assets");

      fs.mkdirSync(javaDir, { recursive: true });
      fs.mkdirSync(resXmlDir, { recursive: true });
      fs.mkdirSync(assetsDir, { recursive: true });

      fs.writeFileSync(
        path.join(javaDir, "GoogleTtsModule.kt"),
        GOOGLE_TTS_MODULE_KOTLIN.replaceAll(
          "PACKAGE_PATH_PLACEHOLDER",
          androidPackage,
        ),
      );
      fs.writeFileSync(
        path.join(javaDir, "GoogleTtsPackage.kt"),
        GOOGLE_TTS_PACKAGE_KOTLIN.replaceAll(
          "PACKAGE_PATH_PLACEHOLDER",
          androidPackage,
        ),
      );
      fs.writeFileSync(path.join(resXmlDir, "file_paths.xml"), FILE_PATHS_XML);

      const apkDestination = path.join(assetsDir, BUNDLED_APK_ASSET_NAME);
      if (!fs.existsSync(apkDestination)) {
        if (!fs.existsSync(BUNDLED_APK_SOURCE)) {
          throw new Error(
            `withGoogleTts: bundled Google TTS APK not found at ${BUNDLED_APK_SOURCE}`,
          );
        }
        fs.copyFileSync(BUNDLED_APK_SOURCE, apkDestination);
      }

      return config;
    },
  ]);

  return config;
};

export default withGoogleTts;
