class ValidationError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = "ValidationError";
    this.code = code; 
  }
}

const createValidationError = (messageKey, params = {}) => {
  const errorMessages = require("@utils/errorMessages");
  let message = errorMessages.validation[messageKey] || "Unknown error";

  Object.keys(params).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    message = message.replace(regex, params[key]);
  });

  return new ValidationError(message, 400);
};

module.exports = {
  createValidationError,
  ValidationError
};
