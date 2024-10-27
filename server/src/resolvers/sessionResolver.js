const { User, Session } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  successResponseWithData,
  errorResponse,
} = require("../utils/responseHandlers");

const sessionResolvers = {
  Mutation: {
    loginUser: async (_, { payload }) => {
      const { email, password } = payload;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return errorResponse("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return errorResponse("Invalid Password");
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);

        const newSession = await Session.create({
          session_email: user.email,
          session_token: token,
          session_expires_at: expiresAt,
          session_user_id: user._id,
          session_user_role: user.role,
          user_last_login: new Date(),
        });

        return successResponseWithData("✅ Login successful!", newSession);
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to log in");
      }
    },
  },
};

module.exports = sessionResolvers;
