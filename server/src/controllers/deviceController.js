// src/controllers/DeviceController.js
const { Device } = require("../models");

const dummyData = [
  { id: "123", device_ip: "192.168.1.2", device_fcm_token: "dummyToken1", device_type: "Android" },
  { id: "124", device_ip: "192.168.1.3", device_fcm_token: "dummyToken2", device_type: "iOS" },
];

const DeviceController = {
  getAllDevices: async (limit) => {
    return dummyData.slice(0, limit || dummyData.length);
  },

  createDevice: async (device_ip, device_fcm_token, device_type) => {
    const device = new Device({ device_ip, device_fcm_token, device_type });
    await device.save();
    return device;
  },
};


module.exports = DeviceController;