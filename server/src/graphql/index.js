const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const {  userTypeDefs } = require("../schemas");
const {  userResolvers } = require("../resolvers");

const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolvers]);

module.exports = { typeDefs, resolvers };
