import { validationErrorResponse } from "../helpers/apiResponse.js";

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
