const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Device {
    id: ID!
    device_ip: String!
    device_fcm_token: String!
    device_type: String!
  }

  type Query {
    devices(limit: Int): [Device]
  }

  type Mutation {
    createDevice(
      device_ip: String!
      device_fcm_token: String!
      device_type: String!
    ): Device!
  }
`;

module.exports = typeDefs;
