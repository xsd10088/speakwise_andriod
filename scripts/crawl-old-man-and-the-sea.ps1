# Crawl Old Man and the Sea chapters
# Downloads "《老人与海》（The Old Man and the Sea）" from yingyuxiaoshuo.com with anti-crawling countermeasures
# Outputs data/old-man-and-the-sea/chapter-XX.json (XX=01-31) and data/old-man-and-the-sea/index.json (support resume/single chapter re-crawl)
param(
    [string]$Start = 0,
    [string]$End = 30,
    [int]$DelayMs = 2500
)

# Validate parameters
if ($Start -lt 0 -or $End -lt $Start) {
    Write-Host "Error: Invalid -Start/$End parameters. Use -Start >= 0 and -End >= -Start." -ForegroundColor Red
    exit 1
}

# Project directories
$ProjectRoot = "E:\speakwise-android-parity"
$DataDir = Join-Path $ProjectRoot "data\old-man-and-the-sea"
$ScriptsDir = Join-Path $ProjectRoot "scripts"

# Ensure data directory exists
if (-not (Test-Path $DataDir)) {
    New-Item -ItemType Directory -Path $DataDir -Force | Out-Null
}

# Book metadata (hardcoded from handover doc)
$BookId = "9a533e06faa41b4c"
$BookTitle = "老人与海"
$BookTitleEn = "The Old Man and the Sea"
$BookSourceUrl = "https://www.yingyuxiaoshuo.com/book/$BookId"

# Headers mimicking Chrome browser to reduce interception
$Headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    "Accept-Language" = "zh-CN,zh;q=0.9,en;q=0.8"
 integração
    "Accept-Encoding" = "gzip, deflate"
    "Cache-Control" = "no-cache"
    "Referer" = $BookSourceUrl
    "Connection" = "keep-alive"
}

function Invoke-Request($Url) {
    try {
        $Response = Invoke-WebRequest -Uri $Url -Headers $Headers -UseBasicParsing -TimeoutSec 30
        return $Response.Content
    }
    catch {
        Write-Host "Error: Failed to fetch $Url"
        return $null
    }
}

function DecodeBase64FromHtml($HtmlContent) {
    # Extract the Base64 data inside script tag: window._yf_state=JSON.parse(decodeURIComponent(escape(window.atob('...'))))
    $Pattern = 'window\._yf_state=JSON\.parse\(decodeURIComponent\(escape\(window\.atob\(\'([^\']+)\'\)\)\)'
    if ($HtmlContent -match $Pattern) {
        $Base64 = $Matches[1]
        try {
            $Decoded = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String $Base64)
            return $Decoded
        }
        catch {
            Write-Host "Error: Base64 decoding failed"
            return $null
        }
    }
    return $null
}

function ParseContentFromState($StateJson) {
    # $StateJson is JSON string; convert to PSObject for parsing
    $Json = $StateJson | ConvertFrom-Json
    if (-not $Json.d -or -not $Json.d.data) {
        Write-Host "Error: Missing 'd.data' field"
        return $null
    }

    $Data = $Json.d.data
    $ChapterId = $Data.c
    if (-not $ChapterId) {
        Write-Host "Error: Missing 'c' field"
        return $null
    }

    $Title = $Data.title
    $ContentHtml = $Data.c

    return @{ Title = $Title; ContentHtml = $ContentHtml }
}

function ExtractParagraphs($Html) {
    $Paragraphs = @()

    # Extract English paragraphs: <div class="c-en">...</div>
    $EnMatches = [regex]::Matches($Html, '<div class="c-en">(.*?)</div>', 'IgnoreCase')
    $CnMatches = [regex]::Matches($Html, '<div class="c-cn"[^>]*data-c="([^"]*)">(.*?)</div>', 'IgnoreCase')

    if ($EnMatches.Count -eq 0 -or $CnMatches.Count -eq 0) {
        Write-Host "Error: Failed to extract paragraphs (c-en or c-cn not found)"
        return $null
    }

    # Decode HTML entities in English text
    $EnTexts = @()
    foreach ($Match in $EnMatches) {
        $EnText = $Match.Groups[1].Value
        $EnText = [System.Web.HttpUtility]::HtmlDecode($EnText)
        $EnText = $EnText -replace "<[^>]*>", ""
        $EnTexts += $EnText.Trim()
    }

    # Use data-c attribute for Chinese (already decoded per spec)
    $CnTexts = @()
    foreach ($Match in $CnMatches) {
        $CnText = $Match.Groups[2].Value
        $CnText = [System.Web.HttpUtility]::HtmlDecode($CnText)
        $CnText = $CnText -replace "<[^>]*>", ""
        $CnTexts += $CnText.Trim()
    }

    if ($EnTexts.Count -ne $CnTexts.Count) {
        Write-Host "Error: English and Chinese paragraph count mismatch ($($EnTexts.Count) vs $($CnTexts.Count))"
        return $null
    }

    for ($i = 0; $i -lt $EnTexts.Count; $i++) {
        $Paragraphs += @{ en = $EnTexts[$i]; cn = $CnTexts[$i] }
    }

    return $Paragraphs
}

function Save-ChapterData($ChapterIndex, $ChapterData) {
    $ChapterNumber = $ChapterIndex + 1
    $FileName = "chapter-$('{0:D2}' -f $ChapterNumber).json"
    $FilePath = Join-Path $DataDir $FileName

    if (Test-Path $FilePath) {
        Write-Host "Overwrite: $FileName"
    }

    $JsonString = $ChapterData | ConvertTo-Json -Depth 10 -EscapeHandling EscapeHtml
    $Utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($FilePath, $Utf8NoBom.GetBytes($JsonString))

    Write-Host "Saved: $FileName"
    return $FilePath
}

function Update-Index($ChapterData) {
    $IndexPath = Join-Path $DataDir "index.json"
    $IndexData = @{ bookId = $BookId; bookTitle = $BookTitle; bookTitleEn = $BookTitleEn; sourceUrl = $BookSourceUrl; chapters = @(); updatedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ" }

    if (Test-Path $IndexPath) {
        $Existing = Get-Content $IndexPath -Raw | ConvertFrom-Json
        $IndexData = $Existing
    }

    $NewChapterEntry = @{ chapterIndex = $ChapterData.chapterIndex; chapterNumber = $ChapterData.chapterNumber; title = $ChapterData.chapterTitle; file = $ChapterData.file; paragraphs = $ChapterData.paragraphCount }

    $ExistingChapter = $IndexData.chapters | Where-Object { $_.chapterIndex -eq $ChapterData.chapterIndex }
    if ($ExistingChapter) {
        $IndexData.chapters[$IndexData.chapters.IndexOf($ExistingChapter)] = $NewChapterEntry
    } else {
        $IndexData.chapters += $NewChapterEntry
    }

    $IndexData.updatedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    $IndexJson = $IndexData | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($IndexPath, $IndexJson)
    Write-Host "Updated index.json"
}

# Main processing loop
Write-Host "Starting Old Man and the Sea crawl (chapters $Start - $End)..."
Write-Host "Base URL: $BookSourceUrl"

for ($ChapterIndex = $Start; $ChapterIndex -le $End; $ChapterIndex++) {
    $ChapterNumber = $ChapterIndex + 1
    Write-Host "Processing chapter $ChapterNumber (index $ChapterIndex)..."

    $ChapterUrl = "$BookSourceUrl/chapter/$ChapterIndex"
    $Html = Invoke-Request $ChapterUrl
    if (-not $Html) {
        Write-Host "Error: Failed to fetch chapter $ChapterNumber, skipping." -ForegroundColor Red
        continue
    }

    $StateJson = DecodeBase64FromHtml $Html
    if (-not $StateJson) {
        Write-Host "Error: Failed to decode state JSON for chapter $ChapterNumber, skipping." -ForegroundColor Red
        continue
    }

    $Content = ParseContentFromState $StateJson
    if (-not $Content) {
        Write-Host "Error: Failed to parse content for chapter $ChapterNumber, skipping." -ForegroundColor Red
        continue
    }

    $Paragraphs = ExtractParagraphs $Content.ContentHtml
    if (-not $Paragraphs) {
        Write-Host "Error: Failed to extract paragraphs for chapter $ChapterNumber, skipping." -ForegroundColor Red
        continue
    }

    $ChapterData = @{
        bookId = $BookId
        bookTitle = $BookTitle
        bookTitleEn = $BookTitleEn
        chapterIndex = $ChapterIndex
        chapterNumber = $ChapterNumber
        chapterTitle = $Content.Title
        url = $ChapterUrl
        paragraphs = $Paragraphs
        paragraphCount = $Paragraphs.Count
        fetchedAt = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    }

    Save-ChapterData $ChapterIndex $ChapterData
    Update-Index $ChapterData

    if ($ChapterIndex -lt $End) {
        Write-Host "Waiting $((([int]$DelayMs)/1000).ToString('0.0')) seconds before next chapter..."
        Start-Sleep -Milliseconds $DelayMs
    }
}

Write-Host "Crawl completed. Processed chapters $Start - $End."
