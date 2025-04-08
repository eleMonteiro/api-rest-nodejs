import { login as loginService } from "../services/loginService.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { successResponse } from "../../helpers/apiResponse.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;

export const login = asyncHandler(async (req, res) => {
  const { email, password, stayConnected } = req.body;

  const { token, user } = await loginService({
    email,
    password,
    stayConnected,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: stayConnected ? THIRTY_DAYS_MS : FIVE_HOURS_MS,
  });


  if (process.env.NODE_ENV === "production") {
    return successResponse(res, user, 200, "Login successful!");
  }

  return successResponse(res, { token, user }, 200, "Login successful!");
});


export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return successResponse(res, null, 200, "Logged out successfully!");
});
