const express = require("express");
const acl = require("express-acl");

const routes = require("./routes/routes");
const { config, responseObject } = require("./config/acl");

const app = express();

app.use(express.json());
app.use(routes);
acl.config(config, responseObject);

module.exports = app;
