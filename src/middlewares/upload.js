import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || "uploads/";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.join(__dirname, UPLOADS_FOLDER);

    try {
      if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
      }
    } catch (err) {
      cb(err);
      return;
    }

    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    if (file) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  },
});

export const upload = multer({ storage });
