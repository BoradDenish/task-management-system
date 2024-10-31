const { User, Session } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/mailHelper");
const {
  successResponseWithData,
  errorResponse,
  successResponse,
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
        const testHash = await bcrypt.hash(password, 10);
        const isPasswordValid = await bcrypt.compare(password, testHash);
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
          session_is_verified: true,
          user_last_login: new Date(),
        });

        return successResponseWithData("✅ Login successful!", newSession);
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to log in");
      }
    },

    sendOtp: async (_, { payload }) => {
      const { email } = payload;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return errorResponse("User not found");
        } else if (
          user &&
          user.session_otp &&
          user.session_otp_expires_at > new Date()
        ) {
          return errorResponse("OTP already sent successfully");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(new Date().getTime() + 10 * 60000);
        user.session_otp = otp;
        user.session_otp_expires_at = otpExpiry;

        const mailResponse = await sendMail(
          email,
          "Your OTP Code",
          `Your OTP code is ${otp}. It will expire in 10 minutes.`
        );

        if (!mailResponse.success) {
          return errorResponse("Failed to send OTP email");
        }

        await user.save();
        return successResponse("OTP sent successfully");
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to send OTP for password reset");
      }
    },

    verifyOtp: async (_, { payload }) => {
      const { email, otp } = payload;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return errorResponse("User not found");
        }

        if (
          user.session_otp !== otp ||
          user.session_otp_expires_at < new Date()
        ) {
          return errorResponse("Invalid or expired OTP");
        }

        user.session_otp = null;
        user.session_otp_expires_at = null;
        await user.save();

        return successResponse("OTP verified successfully");
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to verify OTP");
      }
    },


    resetPassword: async (_, { payload }) => {
      const { email, otp, newPassword } = payload;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return errorResponse("User not found");
        }


        if (
          user.session_otp !== otp ||
          user.session_otp_expires_at < new Date()
        ) {
          return errorResponse("Invalid or expired OTP");
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.session_otp = null;
        user.session_otp_expires_at = null;

        await user.save();
        return successResponse("Password reset successfully");
      } catch (e) {
        console.log(e);
        return errorResponse("Failed to reset password");
      }
    },
  },
};

module.exports = sessionResolvers;
