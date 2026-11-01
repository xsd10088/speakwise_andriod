# Download Alice's Adventures in Wonderland audio from LibriVox
# Save to both data/audio and server/data/audio directories

$sourceUrl = "https://archive.org/download/alices_adventures_in_wonderland_1_by_lewis_carroll_1910/alices_adventures_in_wonderland_1_by_lewis_carroll_1910.mp3"
$targetDir1 = "E:\speakwise-android-parity\data\audio"
$targetDir2 = "E:\speakwise-android-parity\server\data\audio"
$targetFile = "alice-adventures-wonderland-1.mp3"

if (!(Test-Path $targetDir1)) { New-Item -ItemType Directory -Path $targetDir1 -Force }
if (!(Test-Path $targetDir2)) { New-Item -ItemType Directory -Path $targetDir2 -Force }

Write-Host "Downloading Alice audio from LibriVox..."
Invoke-WebRequest -Uri $sourceUrl -OutFile "$targetDir1\$targetFile"

Write-Host "Copying to server directory..."
Copy-Item "$targetDir1\$targetFile" "$targetDir2\$targetFile" -Force

Write-Host "Download complete!"