const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    session_email: { type: String, required: true },
    session_token: { type: String, required: true },
    session_expires_at: { type: Date, required: true },
    session_user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    session_user_role: { type: String, required: true },
    user_last_login: { type: Date },
    session_otp: { type: String },
    session_otp_expires_at: { type: Date },
    session_is_verified: { type: Boolean, default: false },
    password: { type: String, required: true },
    session_deleted_at: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
