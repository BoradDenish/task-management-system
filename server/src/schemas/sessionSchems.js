const { gql } = require("graphql-tag");

const sessionTypeDefs = gql`
  input loginPayLoad {
    email: String!
    password: String!
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

  type Mutation {
    loginUser(payload: loginPayLoad!): loginResponse!
  }
`;

module.exports = sessionTypeDefs;
