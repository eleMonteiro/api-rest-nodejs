require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  try {
    const decoded = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET_KEY || "your-secret-key"
    );

    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
