# PowerShell script to create .env.local file
$envContent = @"
# Public variables (available on client-side)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Private variables (server-side only)
MONGODB_URI=mongodb://localhost:27017/briggs-fashion
MONGODB_URI_PROD=mongodb://your-production-uri
JWT_SECRET=655b67721b98a871b0a0dc02bae3f7ef509d05dae783b3d18323a098521c15cd0b12d49716237873150eebc9426868333a55dea5c8e12364413317ae6af8824d
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@briggsfashion.com
ADMIN_PASSWORD=admin123
"@

# Create the .env.local file
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ .env.local file created successfully!" -ForegroundColor Green
Write-Host "📁 File location: $(Get-Location)\.env.local" -ForegroundColor Yellow
Write-Host "🔒 This file is automatically ignored by git" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Start your development server: npm run dev" -ForegroundColor White
Write-Host "2. Test the JWT functionality in your app" -ForegroundColor White 