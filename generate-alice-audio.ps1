# Generate Alice audio from transcript using Python gTTS
# Requires: pip install gtts playsound

param(
    [string]$LessonFile = "E:/speakwise-android-parity/data/keke-reading/alice-adventures-wonderland-1.json",
    [string]$OutputDir = "E:/speakwise-android-parity\data/audio"
)

$ErrorActionPreference = "Stop"

function Test-Python {
    try {
        python --version | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Test-gTTS {
    try {
        python -c "import gtts" 2>$null
        return $true
    } catch {
        return $false
    }
}

function Install-gTTS {
    Write-Host "安装 gTTS 和 gmpy2..." -ForegroundColor Yellow
    pip install gtts gmpy2 --quiet
}

Write-Host "=== Alice 音频生成器 ===" -ForegroundColor Cyan
Write-Host "检查依赖..." -ForegroundColor Gray

if (-not (Test-Python)) {
    Write-Host "错误: 请安装 Python 3" -ForegroundColor Red
    Write-Host "下载地址: https://www.python.org/downloads/" -ForegroundColor Gray
    exit 1
}

if (-not (Test-gTTS)) {
    Write-Host "gTTS 未安装，正在安装..." -ForegroundColor Yellow
    Install-gTTS
}

if (-not (Test-gTTS)) {
    Write-Host "安装失败，请手动运行: pip install gtts gmpy2" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $LessonFile)) {
    Write-Host "错误: 找不到课文文件 $LessonFile" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$json = Get-Content $LessonFile -Raw | ConvertFrom-Json
$transcript = $json.transcript -join " "

Write-Host "课文: $($json.title)" -ForegroundColor Green
Write-Host "文本字符数: $($transcript.Length)" -ForegroundColor Gray

$pythonScript = @"
import json
from gtts import gTTS
import sys

text = """$transcript"""
output_path = r"$OutputDir\alice-adventures-wonderland-1.mp3"

tts = gTTS(text=text, lang='en', slow=False)
tts.save(output_path)
print(f"已保存: {output_path}")
"@

Write-Host "`n正在生成语音..." -ForegroundColor Cyan
python -c $pythonScript

if (Test-Path "$OutputDir\alice-adventures-wonderland-1.mp3") {
    $file = Get-Item "$OutputDir\alice-adventures-wonderland-1.mp3"
    Write-Host "`n=== 完成 ===" -ForegroundColor Green
    Write-Host "文件: alice-adventures-wonderland-1.mp3" -ForegroundColor Gray
    Write-Host "大小: $([math]::Round($file.Length/1024/1024, 2)) MB" -ForegroundColor Gray
    
    # 复制到服务端
    $serverDir = "E:/speakwise-android-parity/server/data/audio"
    if (-not (Test-Path $serverDir)) {
        New-Item -ItemType Directory -Path $serverDir -Force | Out-Null
    }
    Copy-Item "$OutputDir\alice-adventures-wonderland-1.mp3" "$serverDir/" -Force
    Write-Host "已复制到: $serverDir" -ForegroundColor Gray
} else {
    Write-Host "生成失败" -ForegroundColor Red
    exit 1
}