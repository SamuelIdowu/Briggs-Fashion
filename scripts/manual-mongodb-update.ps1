# Manual MongoDB URI update script
Write-Host "=== MONGODB URI UPDATE ===" -ForegroundColor Green
Write-Host ""

Write-Host "Current .env.local content:" -ForegroundColor Yellow
Get-Content ".env.local" | Where-Object { $_ -like "*MONGODB*" }

Write-Host ""
Write-Host "To update your MongoDB URI:" -ForegroundColor White
Write-Host "1. Open .env.local in your editor" -ForegroundColor White
Write-Host "2. Replace the MONGODB_URI_PROD line with your deployment URI" -ForegroundColor White
Write-Host "3. Example format: MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/database" -ForegroundColor White
Write-Host ""
Write-Host "Or run: .\scripts\update-mongodb-uri.ps1 -MongoDBUri 'your-mongodb-uri-here'" -ForegroundColor Cyan 