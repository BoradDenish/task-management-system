const { Device } = require("../models/deviceSchema");

const DeviceController = {
  getAllDevices: async (limit) => {
    return await Device.find().limit(limit);
  },

  createDevice: async (device_ip, device_fcm_token, device_type) => {
    const device = new Device({ device_ip, device_fcm_token, device_type });
    return await device.save();
  },
};

module.exports = DeviceController;
