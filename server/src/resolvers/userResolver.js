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
    user: async (_, { token }) => {
      try {
        const session = await Session.findOne({ session_token: token });
        console.log("" , session);
        if (!session || session.session_expires_at < new Date()) {
          return errorResponse("Session not found or token has expired");
        }

        const user = await User.findById(session.session_user_id);

        if (!user || user.is_deleted) {
          throw new Error("User not found or has been deleted");
        }

        return user;
      } catch (e) {
        console.error("Error fetching user by token:", e);
        throw new Error("Failed to retrieve user by token");
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
