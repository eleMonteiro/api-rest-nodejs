import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(routes);
acl.config(config, responseObject);

export default app;
