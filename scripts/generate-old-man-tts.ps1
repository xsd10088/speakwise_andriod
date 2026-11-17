# Generate Old Man and the Sea TTS audio files
# Reads chapter-XX.json from data/old-man-and-the-sea/ and uses Windows System.Speech to generate WAV files
param(
    [string]$Start = 1,
    [string]$End = 31,
    [string]$Voice = "Microsoft Zira Desktop"
)

# Check if .NET System.Speech assembly is available
Add-Type -AssemblyName System.Speech -ErrorAction SilentlyContinue

$chapterDir = "E:\speakwise-android-parity\data\old-man-and-the-sea"
if (-not (Test-Path $chapterDir)) {
    Write-Host "Error: Chapter directory not found: $chapterDir" -ForegroundColor Red
    exit 1
}

$audioDir = Join-Path $chapterDir "audio"
if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force | Out-Null
}

function GenerateAudioForChapter($chapterNumber) {
    $inputFile = Join-Path $chapterDir "chapter-$('{0:D2}' -f $chapterNumber).json"
    if (-not (Test-Path $inputFile)) {
        Write-Host "Warning: Input file not found: $inputFile" -ForegroundColor Yellow
        return $false
    }

    $outputFile = Join-Path $audioDir "old-man-and-the-sea-$('{0:D2}' -f $chapterNumber).wav"
    if (Test-Path $outputFile) {
        Write-Host "Skip: Audio already exists: $outputFile" -ForegroundColor Yellow
        return $true
    }

    try {
        $chapterData = Get-Content $inputFile -Raw | ConvertFrom-Json
        $textParts = @()
        $textParts += $chapterData.bookTitleEn
        $textParts += $chapterData.chapterTitle
        foreach ($paragraph in $chapterData.paragraphs) {
            $textParts += $paragraph.en
        }

        $speechSynthesizer = New-Object System.Speech.Synthesis.SpeechSynthesizer
        $speechSynthesizer.SelectVoice($Voice)
        $speechSynthesizer.SetOutputToWaveFile($outputFile)
        $speechSynthesizer.Speak(($textParts -join " ").Trim())
        $speechSynthesizer.Dispose()

        Write-Host "Generated: $outputFile (${chapterNumber})" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Error generating audio for chapter $chapterNumber`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$chapterNumbers = @($Start..$End)
$successCount = 0
$totalCount = $chapterNumbers.Count

Write-Host "Generating Old Man and the Sea TTS audio files ($totalCount chapters)..."
Write-Host "Voice: $Voice"
Write-Host "Range: Chapter $Start - $End"

foreach ($chapterNumber in $chapterNumbers) {
    if (GenerateAudioForChapter $chapterNumber) {
        $successCount++
    }
    Start-Sleep -Milliseconds 500
}

Write-Host "Done: $successCount/$totalCount chapters processed."
