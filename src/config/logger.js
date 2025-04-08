import winston from "winston";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level}]: ${stack || message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

const httpLogger = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export { logger, httpLogger };
