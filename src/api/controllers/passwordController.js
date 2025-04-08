import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { encrypt } from "../../utils/encrypt.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../../helpers/apiResponse.js";

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const erros = [];

  if (!token) {
    erros.push("Token is required.");
  }

  if (!newPassword) {
    erros.push("New password is required.");
  }

  if (erros.length > 0) {
    return validationErrorResponse(res, erros);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const hashedPassword = encrypt(newPassword);

  const [updatedRows] = await User.update(
    { password: hashedPassword },
    { where: { email: decoded.email } }
  );

  if (updatedRows === 0) {
    return errorResponse(res, "Password reset failed.", null, 500);
  }

  return successResponse(res, null, 200, "Password reset successfully.");
});
