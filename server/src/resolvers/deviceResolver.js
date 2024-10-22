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
      console.log(input);
      const { device_ip, device_fcm_token, device_type } = input;

      const newDevice = await Device.create({
        device_ip,
        device_fcm_token,
        device_type,
      });

      return successResponseWithData(
        res,
        "Device created successfully",
        newDevice.id
      );
    },
  },
};

module.exports = deviceResolvers;
