# Generate Alice MP3 using Windows System.Speech
param([string]$Text, [string]$OutputPath)

Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.SelectVoice('Microsoft Zira Desktop')
$speak.SetOutputToWaveFile($OutputPath)
$speak.Speak($Text)
Write-Host "WAV 生成完成: $OutputPath"