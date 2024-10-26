const { gql } = require("graphql-tag");

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
    phone: String!
    address: String!
    profile_image: String
    role: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    phone: String!
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

  type CreateUserResponse {
    success: Int!
    message: String!
    data: Session
  }

  type Query {
     user(token: String!): User
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
  }
`;

module.exports = userTypeDefs;
