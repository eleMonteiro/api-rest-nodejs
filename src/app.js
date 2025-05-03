import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import acl from "express-acl";
import routes from "./routes/index.js";
import { options } from "./docs/docs.js";
import { config, responseObject } from "./config/acl.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { corsOptions } from "./config/cors.js";
import { logger, httpLogger } from "./config/logger.js";

dotenv.config();

const app = express();

app.use(httpLogger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const __dirname = path.resolve();
const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || "uploads";
const uploadsPath = path.join(__dirname, UPLOADS_FOLDER);

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use("/uploads", express.static(uploadsPath));
app.use(routes);

app.use((req, res, _next) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, _next) => {
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

acl.config(config, responseObject);

export default app;
