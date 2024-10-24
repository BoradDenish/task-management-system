const { Device } = require("../models");
const {
  successResponseWithData,
  errorResponse,
} = require("../utils/responseHandlers");

const deviceResolvers = {
  Query: {
    devices: async (_, { limit }) => {
      return await Device.find().limit(limit);
    },
  },
  Mutation: {
    createDevice: async (_, { input }) => {
      const { device_ip, device_fcm_token, device_type } = input;

      try {
        const newDevice = await Device.create({
          device_ip,
          device_fcm_token,
          device_type,
        });

        return successResponseWithData(
          "Device created successfully",
          newDevice
        );
      } catch (e) {
        return errorResponse("Error creating device");
      }
    },
  },
};

module.exports = deviceResolvers;
