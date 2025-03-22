import pkg from "jsonwebtoken";
const { sign } = pkg;

import { encrypt as _encrypt } from "../../utils/encrypt.js";
import { findByEmail } from "../services/userService.js";
import {
  createValidationError,
  ValidationError,
} from "../../utils/responses.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const login = async (data) => {
  const { email, password, stayConnected } = data;

  if (!email || !password) {
    throw createValidationError("FIELD_NOT_SPECIFIED", {
      field: "email or password",
    });
  }

  try {
    const user = await findByEmail(email);

    if (!user) {
      throw createValidationError("INVALID_FIELD", { field: "email" });
    }

    const passwordMatch = _encrypt(password) === user.password;
    if (!passwordMatch) {
      throw createValidationError("INVALID_FIELD", { field: "password" });
    }

    const token = sign({ userId: user.id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: stayConnected ? "30d" : "5h",
    });

    return {
      status: 200,
      token,
      user,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { status: error.code, error: error.message };
    }

    return { status: 500, error: "Login failed due to an internal error." };
  }
};
