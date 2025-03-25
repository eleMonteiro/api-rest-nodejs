import jwt from "jsonwebtoken";
import { login as _login } from "../services/loginService.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;

const generateToken = (user, stayConnected) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user?.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: stayConnected ? THIRTY_DAYS_MS : FIVE_HOURS_MS }
  );
};

export const login = async (req, res) => {
  try {
    const { email, password, stayConnected } = req.body;
    const result = await _login({ email, password, stayConnected });
    const { status, error, user } = result;

    if (!user) {
      return res.status(status).json({ message: error });
    }

    const token = generateToken(user, stayConnected);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: stayConnected ? THIRTY_DAYS_MS : FIVE_HOURS_MS,
    });

    return res.status(status).json({ message: "Login successful!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully!" });
};
