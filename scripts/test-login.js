const { config } = require("dotenv");
const path = require("path");

// Load .env.local file
config({ path: path.resolve(process.cwd(), ".env.local") });

async function testLogin() {
  try {
    console.log("=== TESTING LOGIN API ===");
    console.log("");

    const loginData = {
      email: process.env.ADMIN_EMAIL || "admin@briggsfashion.com",
      password: process.env.ADMIN_PASSWORD || "admin123",
    };

    console.log("Testing with credentials:");
    console.log("Email:", loginData.email);
    console.log("Password:", loginData.password);
    console.log("");

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Login successful!");
      console.log("Token received:", data.token ? "Yes" : "No");
      console.log("User data:", {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        isActive: data.user.isActive,
      });
    } else {
      const error = await response.json();
      console.log("❌ Login failed:");
      console.log("Error:", error.error);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testLogin();
