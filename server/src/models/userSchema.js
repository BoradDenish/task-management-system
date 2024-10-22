const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: uuidv4 },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    profile_image: { type: String },
    user_status: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: uuidv4,
    },
    role: { type: String, required: true },
    last_login: { type: Date },
    otp: { type: String },
    is_deleted: { type: Boolean, default: false },
    password: { type: String, required: true },
    deleted_at: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
