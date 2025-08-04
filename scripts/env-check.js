// Script to display all environment variables
console.log("=== ALL ENVIRONMENT VARIABLES ===");
console.log(process.env);

console.log("\n=== SPECIFIC ENV VARS USED IN PROJECT ===");
console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("MONGODB_URI_PROD:", process.env.MONGODB_URI_PROD);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
