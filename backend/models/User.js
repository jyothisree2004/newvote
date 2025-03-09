import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  collegeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "SubAdmin", "Student"], required: true }, // Fixed enum
  department: { type: String, required: function() { return this.role !== "Admin"; } }, // Required for SubAdmin & Student
  classYear: { type: String, required: function() { return this.role === "Student"; } }, // Changed from className
  isApproved: { type: Boolean, default: false },
  rejectionReason: { type: String, default: null },
});

// Password Hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
