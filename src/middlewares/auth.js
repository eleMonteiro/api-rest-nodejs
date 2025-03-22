import dotenv from "dotenv";
import pkg from "jsonwebtoken";

const { verify } = pkg;

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = verify(token, process.env.JWT_SECRET_KEY);

    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
