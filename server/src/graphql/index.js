const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { userTypeDefs, sessionTypeDefs } = require("../schemas");
const { userResolvers, sessionResolvers } = require("../resolvers");

const typeDefs = mergeTypeDefs([userTypeDefs, sessionTypeDefs]);
const resolvers = mergeResolvers([userResolvers, sessionResolvers]);

module.exports = { typeDefs, resolvers };
