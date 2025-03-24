import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";
import cors from "cors";
import acl from "express-acl";
import routes from "./routes/index.js";
import { options } from "./docs/docs.js";
import { config, responseObject } from "./config/acl.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use(morgan("dev"));

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

const __dirname = path.resolve();
const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || "uploads";
const uploadsPath = path.join(__dirname, UPLOADS_FOLDER);

app.use("/uploads", express.static(uploadsPath));

app.use(express.json());
app.use(routes);
acl.config(config, responseObject);

export default app;
