import express from "express";
import cors from "cors";
import acl from "express-acl";
import routes from "./routes/routes.js";
import { config, responseObject } from "./config/acl.js";

const app = express();

app.use(
  cors({
    origin: process.env.DOMAIN_URL.replace(/\/$/, ""),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(routes);
acl.config(config, responseObject);

export default app;
