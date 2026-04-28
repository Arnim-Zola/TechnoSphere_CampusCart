const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },

  // ✅ ADD THIS FIELD
  profilePhoto: {
    type: String,
    default: ""
  }, 
  phone: String,
collegeEmail: String,
department: String,
year: String,
section: String,
bio: String,

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);