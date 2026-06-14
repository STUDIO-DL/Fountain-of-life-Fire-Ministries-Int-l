Add-Type -AssemblyName System.Drawing

$path = Join-Path $PSScriptRoot '..\src\images\logo.png'
$img = [System.Drawing.Image]::FromFile($path)
$width = 160
$height = [int][Math]::Round($img.Height * ($width / $img.Width))
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, $width, $height)
$tempPath = "$path.tmp"
$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
$img.Dispose()
Move-Item -Force $tempPath $path
Write-Host "Logo optimized:" ((Get-Item $path).Length / 1KB) "KB"
