const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    name: {
      type: String,
      default: "",
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    phone: String,
    collegeEmail: String,
    department: String,
    year: String,
    section: String,
    bio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);