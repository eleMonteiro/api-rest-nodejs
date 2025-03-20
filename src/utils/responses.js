import { messages } from "./notifications.js";

export class ValidationError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}

export const createValidationError = (messageKey, params = {}) => {
  let message = messages.validation[messageKey] || "Unknown error";

  Object.keys(params).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    message = message.replace(regex, params[key]);
  });

  return new ValidationError(message, 400);
};