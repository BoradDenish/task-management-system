const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { deviceTypeDefs, userTypeDefs } = require("../schemas");
const { deviceResolvers, userResolvers } = require("../resolvers");

const typeDefs = mergeTypeDefs([deviceTypeDefs, userTypeDefs]);
const resolvers = mergeResolvers([deviceResolvers, userResolvers]);

module.exports = { typeDefs, resolvers };
