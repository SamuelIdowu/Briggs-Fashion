const { config } = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load .env.local file
config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;

console.log(
  "MONGODB_URI_PROD:",
  process.env.MONGODB_URI_PROD ? "✅ Set" : "❌ Not set"
);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

if (!MONGODB_URI) {
  console.error("❌ No MongoDB URI found in environment variables");
  process.exit(1);
}

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@briggsfashion.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      console.log("Email:", existingAdmin.email);
      console.log("Role:", existingAdmin.role);
      console.log("Is Active:", existingAdmin.isActive);
    } else {
      // Create admin user
      const adminUser = new User({
        name: "Admin User",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isActive: true,
      });

      await adminUser.save();
      console.log("✅ Admin user created successfully");
      console.log("Email:", adminUser.email);
      console.log("Role:", adminUser.role);
    }

    console.log("🎉 Admin setup completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();
