const { User, Session } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

        const token = jwt.sign(
          { userId: newUser._id, email: newUser.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);

        const newSession = await Session.create({
          session_email: newUser.email,
          session_token: token,
          session_expires_at: expiresAt,
          session_user_id: newUser._id,
          session_user_role: userRole,
          user_last_login: new Date(),
        });
        return successResponseWithData(
          "User created and logged in successfully",
          newSession
        );
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to create user");
      }
    },
  },
};

module.exports = userResolvers;
