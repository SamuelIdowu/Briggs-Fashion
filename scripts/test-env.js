const { config } = require("dotenv");
const path = require("path");

// Load .env.local file
config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("=== ENVIRONMENT VARIABLES TEST ===");
console.log("");

console.log(
  "MONGODB_URI_PROD:",
  process.env.MONGODB_URI_PROD ? "✅ Set" : "❌ Not set"
);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Not set");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not set");

console.log("");
console.log("Full MONGODB_URI_PROD value:");
console.log(process.env.MONGODB_URI_PROD);
