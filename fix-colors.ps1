# 색상 변경 스크립트
$files = Get-ChildItem -Path "app" -Include *.tsx,*.jsx,*.ts,*.js -Recurse

$replacements = @{
    'text-gray-400' = 'text-gray-600'
    'text-gray-500' = 'text-gray-700'
    'text-slate-300' = 'text-slate-500'
    'text-slate-400' = 'text-slate-600'
}

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    foreach ($old in $replacements.Keys) {
        if ($content -match $old) {
            $content = $content -replace $old, $replacements[$old]
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✓ Updated: $($file.FullName)"
        $count++
    }
}

Write-Host "`n✅ Complete! Updated $count files."
