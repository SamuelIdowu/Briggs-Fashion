# PowerShell script to show all environment variables
Write-Host "=== ALL ENVIRONMENT VARIABLES ===" -ForegroundColor Green
Get-ChildItem Env: | Format-Table -AutoSize

Write-Host "`n=== SPECIFIC PROJECT VARIABLES ===" -ForegroundColor Yellow
Write-Host "NEXT_PUBLIC_API_URL: $env:NEXT_PUBLIC_API_URL"
Write-Host "NEXT_PUBLIC_SITE_URL: $env:NEXT_PUBLIC_SITE_URL"
Write-Host "MONGODB_URI: $env:MONGODB_URI"
Write-Host "MONGODB_URI_PROD: $env:MONGODB_URI_PROD"
Write-Host "JWT_SECRET: $env:JWT_SECRET"
Write-Host "JWT_EXPIRES_IN: $env:JWT_EXPIRES_IN"
Write-Host "ADMIN_EMAIL: $env:ADMIN_EMAIL"
Write-Host "ADMIN_PASSWORD: $env:ADMIN_PASSWORD" 