import dotenv from "dotenv";
import { logger } from "./logger.js";

dotenv.config();

const normalizeDomain = (url) => {
  if (!url) return undefined;

  let cleaned = url.replace(/\/+$/, "").trim();

  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }

  try {
    const domain = new URL(cleaned);
    return domain.origin;
  } catch (e) {
    logger.warn(`Invalid CORS domain: ${url}`);
    return undefined;
  }
};

const allowedOrigins = [
  normalizeDomain(process.env.DOMAIN_URL),
  "http://localhost:3000",
  "http://localhost:5173",
  "https://localhost:3000",
  "https://localhost:5173",
  process.env.NODE_ENV === "development" && "http://127.0.0.1:3000",
  process.env.NODE_ENV === "development" && "http://127.0.0.1:5173",
].filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      logger.debug("Allowing request without origin");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      logger.debug(`Allowed CORS for origin: ${origin}`);
      return callback(null, true);
    }

    logger.warn(`CORS blocked for origin: ${origin}`);
    callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400,
  preflightContinue: false,
};

export { allowedOrigins };
