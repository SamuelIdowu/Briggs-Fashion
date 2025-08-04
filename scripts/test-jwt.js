const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });

console.log("=== JWT TEST ===");
console.log("");

// Check if JWT_SECRET is loaded
const jwtSecret = process.env.JWT_SECRET;
console.log("JWT_SECRET loaded:", jwtSecret ? "✅ Yes" : "❌ No");
console.log("JWT_SECRET length:", jwtSecret ? jwtSecret.length : 0);
console.log("");

if (jwtSecret) {
  // Test JWT creation
  const payload = {
    userId: "test-user-123",
    email: "test@example.com",
    role: "admin",
  };

  try {
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    console.log("✅ JWT Token created successfully:");
    console.log("Token:", token.substring(0, 50) + "...");
    console.log("");

    // Test JWT verification
    const decoded = jwt.verify(token, jwtSecret);
    console.log("✅ JWT Token verified successfully:");
    console.log("Decoded payload:", decoded);
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
  }
} else {
  console.log("❌ JWT_SECRET not found in environment variables");
  console.log("Make sure .env.local file exists and contains JWT_SECRET");
}
