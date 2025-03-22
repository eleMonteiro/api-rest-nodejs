import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import acl from "express-acl";
import routes from "./routes/index.js";
import { options } from "./docs/docs.js";
import { config, responseObject } from "./config/acl.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.DOMAIN_URL.replace(/\/$/, ""),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(routes);
acl.config(config, responseObject);

export default app;
