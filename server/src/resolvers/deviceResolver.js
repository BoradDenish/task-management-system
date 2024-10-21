const { DeviceController } = require("../controllers");

const deviceResolvers = {
  Query: {
    devices: async (_, { limit }) => {
      return await DeviceController.getAllDevices(limit);
    }
  },
  Mutation: {
    createDevice: async (_, { input }) => {
      const { device_ip, device_fcm_token, device_type } = input;
      return await DeviceController.createDevice(device_ip, device_fcm_token, device_type);
    }
  }
};

module.exports = deviceResolvers;
