const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { deviceTypeDefs } = require("../schemas");
const { deviceResolvers } = require("../resolvers");

const typeDefs = mergeTypeDefs([deviceTypeDefs]);
const resolvers = mergeResolvers([deviceResolvers]);

module.exports = { typeDefs, resolvers };
