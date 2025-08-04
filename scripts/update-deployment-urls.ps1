# PowerShell script to update URLs for deployment
param(
    [Parameter(Mandatory=$true)]
    [string]$DeploymentUrl
)

# Remove trailing slash if present
$DeploymentUrl = $DeploymentUrl.TrimEnd('/')

Write-Host "=== UPDATING DEPLOYMENT URLS ===" -ForegroundColor Green
Write-Host ""

Write-Host "Current URLs:" -ForegroundColor Yellow
Get-Content ".env.local" | Where-Object { $_ -like "*NEXT_PUBLIC*" }

Write-Host ""
Write-Host "New deployment URL: $DeploymentUrl" -ForegroundColor Cyan
Write-Host ""

# Read current .env.local content
$envContent = Get-Content ".env.local" -Raw

# Update the URLs
$newEnvContent = $envContent -replace "NEXT_PUBLIC_API_URL=http://localhost:3000/api", "NEXT_PUBLIC_API_URL=$DeploymentUrl/api"
$newEnvContent = $newEnvContent -replace "NEXT_PUBLIC_SITE_URL=http://localhost:3000", "NEXT_PUBLIC_SITE_URL=$DeploymentUrl"

# Write back to .env.local
$newEnvContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ URLs updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Updated URLs:" -ForegroundColor Yellow
Get-Content ".env.local" | Where-Object { $_ -like "*NEXT_PUBLIC*" }
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Deploy your application" -ForegroundColor White
Write-Host "2. Set the same environment variables in your deployment platform" -ForegroundColor White
Write-Host "3. Test the application on the deployment URL" -ForegroundColor White 