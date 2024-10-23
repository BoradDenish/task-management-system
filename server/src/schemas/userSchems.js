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
    profile_image: String!
    role: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  type CreateUserResponse {
    success: Int!
    message: String!
    data: User
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
  }
`;

module.exports = userTypeDefs;
