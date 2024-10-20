const { DeviceController } = require("../controllers");

const resolvers = {
  Query: {
    devices: async (_, { limit = 1 }) => {
      return await DeviceController.getAllDevices(limit);
    },
  },
  Mutation: {
    createDevice: async (_, { device_ip, device_fcm_token, device_type }) => {
      return await DeviceController.createDevice(device_ip, device_fcm_token, device_type);
    },
  },
};

module.exports = resolvers;
