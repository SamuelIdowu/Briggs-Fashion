# PowerShell script to update MongoDB URI for deployment
param(
    [Parameter(Mandatory=$true)]
    [string]$MongoDBUri
)

# Read current .env.local content
$envContent = Get-Content ".env.local" -Raw

# Update the MONGODB_URI_PROD line
$newEnvContent = $envContent -replace "MONGODB_URI_PROD=mongodb://your-production-uri", "MONGODB_URI_PROD=$MongoDBUri"

# Write back to .env.local
$newEnvContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ MongoDB URI updated successfully!" -ForegroundColor Green
Write-Host "🔗 New URI: $MongoDBUri" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Restart your development server: npm run dev" -ForegroundColor White
Write-Host "2. Test the database connection" -ForegroundColor White
Write-Host "3. Check if data is loading from your deployment database" -ForegroundColor White 