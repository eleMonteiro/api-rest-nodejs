import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || "uploads/";
const __dirname = path.resolve();

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

export const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = req.file.path;
    const resizedFilePath = filePath.replace(
      path.extname(filePath),
      `-resized${path.extname(filePath)}`
    );

    await sharp(filePath)
      .resize({
        height: 150,
        fit: "contain",
      })
      .toFile(resizedFilePath);

    fs.unlinkSync(filePath);
    fs.renameSync(resizedFilePath, filePath);

    req.file.path = filePath;
    next();
  } catch (err) {
    next(err);
  }
};
