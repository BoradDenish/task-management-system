const { Device } = require("../models");
const { successResponseWithData } = require("../utils/responseHandlers");

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
      } catch (error) {
        console.error("Error creating device:", error);
        return errorResponse("Error creating device", 0);
      }
    },
  },
};

module.exports = deviceResolvers;
