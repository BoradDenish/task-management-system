const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: uuidv4 },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    profile_image: { type: String },
    user_status: { type: String, required: true, default: 1 },
    email: { type: String, required: true },
    token: { type: String, required: false },
    role: { type: String, required: true, default: 2 },
    last_login: { type: Date },
    is_deleted: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
