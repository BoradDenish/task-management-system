const { gql } = require("graphql-tag");

const deviceTypeDefs = gql`
  type Device {
    id: ID!
    device_ip: String!
    device_fcm_token: String
    device_type: String!
  }


  input CreateDeviceInput {
    device_ip: String!
    device_fcm_token: String
    device_type: String!
  }


  type CreateDeviceResponse {
    message: String!
    deviceId: ID!
  }

  type Query {
    devices(limit: Int): [Device]
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): CreateDeviceResponse!
  }
`;

module.exports = deviceTypeDefs;