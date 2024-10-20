const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    device_ip: { type: String, required: true },
    device_fcm_token: { type: String, required: true },
    device_type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("device", deviceSchema);

module.exports = Device;
