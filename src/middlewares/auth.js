import dotenv from "dotenv";
import pkg from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    pkg.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token!" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const verifyResetToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  pkg.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }

    req.userEmail = decoded.email;
    next();
  });
};
