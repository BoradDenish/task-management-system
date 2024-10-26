const { User } = require("../models");
const bcrypt = require("bcrypt");
const {
  successResponseWithData,
  errorResponse,
} = require("../utils/responseHandlers");

const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find({ is_deleted: false });
      } catch (e) {
        return errorResponse("Failed to fetch users");
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password, phone } = input;

      const userCount = await User.countDocuments();
      const userRole = userCount === 0 ? 1 : 2;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
          phone,
          role: userRole,
        });

        return successResponseWithData("User created successfully", newUser);
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to create user");
      }
    }
  },
};

module.exports = userResolvers;
