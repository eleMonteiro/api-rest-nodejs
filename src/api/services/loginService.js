import pkg from "jsonwebtoken";
import { logger } from "../../config/logger.js";
import { encrypt as _encrypt } from "../../utils/encrypt.js";
import { findByEmail } from "./userService.js";

const { sign } = pkg;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const login = async ({ email, password, stayConnected }) => {
  try {
    const user = await findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = _encrypt(password) === user.password;

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = sign({ userId: user.id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: stayConnected ? "30d" : "5h",
    });

    return { token, user };
  } catch (error) {
    logger.error("Login error:", error);
    throw new Error("Login failed");
  }
};
