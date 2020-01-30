require("dotenv").config();
const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NextApp } = require("@keystonejs/app-next");
const initialiseData = require("./initial-data");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "shopwheydanang";
const keystone = new Keystone({
  secureCookies: false,
  name: PROJECT_NAME,
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://localhost:27017/shopwheydanang?retryWrites=true"
  }),
  onConnect: initialiseData
});

keystone.createList("User", require("./lists/users"));
keystone.createList("Hashtag", require("./lists/hashtags"));
keystone.createList("Category", require("./lists/categories"));
keystone.createList("Branch", require("./lists/branchs"));
keystone.createList("Post", require("./lists/posts"));
keystone.createList("Product", require("./lists/products"));
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});
module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy
    }),
    new NextApp({ dir: "app" })
  ]
};
