const crypto = require("crypto");

// Generate a secure random JWT secret
function generateJWTSecret(length = 64) {
  return crypto.randomBytes(length).toString("hex");
}

// Generate multiple options
console.log("=== JWT SECRET GENERATOR ===");
console.log("");

// Generate a 64-character hex secret (recommended)
const secret64 = generateJWTSecret(64);
console.log("64-character hex secret (recommended):");
console.log(secret64);
console.log("");

// Generate a 128-character hex secret (extra secure)
const secret128 = generateJWTSecret(128);
console.log("128-character hex secret (extra secure):");
console.log(secret128);
console.log("");

// Generate a base64 secret
const base64Secret = crypto.randomBytes(48).toString("base64");
console.log("Base64 secret:");
console.log(base64Secret);
console.log("");

console.log("=== USAGE INSTRUCTIONS ===");
console.log("1. Copy one of the secrets above");
console.log("2. Add it to your .env.local file:");
console.log("   JWT_SECRET=your-secret-here");
console.log("3. Make sure .env.local is in your .gitignore");
console.log("4. Restart your development server");
