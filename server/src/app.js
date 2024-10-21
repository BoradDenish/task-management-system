require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");

const { typeDefs, resolvers } = require("./graphql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

connectDB();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));

  app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, (e) => {
    console.log(e ? e : `Server is running on http://localhost:${PORT}`);
  });
}

startServer();

module.exports = app;
