const { gql } = require("graphql-tag");

const sessionTypeDefs = gql`
  input loginPayLoad {
    email: String!
    password: String!
  }

  input sendOtpPayLoad {
    email: String!
  }

  input verifyOtpPayLoad {
    email: String!
    otp: String!
  }

  input resetPasswordPayLoad {
    email: String!
    otp: String!
    newPassword: String!
  }

  type Session {
    session_email: String!
    session_token: String!
    session_expires_at: String!
    session_user_id: String!
    session_user_role: String!
    user_last_login: String!
    session_otp: String!
    session_otp_expires_at: String!
    session_is_verified: String!
    session_deleted_at: String!
  }

  type loginResponse {
    success: Int!
    message: String!
    data: Session
  }

  type otpResponse {
    success: Int!
    message: String!
  }

  type Mutation {
    loginUser(payload: loginPayLoad!): loginResponse!
    sendOtp(payload: sendOtpPayLoad!): otpResponse!
    verifyOtp(payload: verifyOtpPayLoad!): otpResponse!
    resetPassword(payload: resetPasswordPayLoad!): otpResponse!
  }
`;

module.exports = sessionTypeDefs;
