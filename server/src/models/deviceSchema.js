const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const deviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, default: uuidv4 },
    device_ip: { type: String, required: true },
    device_fcm_token: { type: String, required: false },
    device_type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("device", deviceSchema);

module.exports = Device;
