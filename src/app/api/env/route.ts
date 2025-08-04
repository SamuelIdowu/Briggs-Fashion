import { NextResponse } from 'next/server';

export async function GET() {
  // Get all environment variables
  const allEnvVars = process.env;
  
  // Get specific variables used in your project
  const projectEnvVars = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URI_PROD: process.env.MONGODB_URI_PROD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  };

  return NextResponse.json({
    allEnvironmentVariables: allEnvVars,
    projectSpecificVariables: projectEnvVars
  });
} 