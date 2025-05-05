import { validationErrorResponse } from "../helpers/apiResponse.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateCard = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const errors = [];
  const { cardNumber, cardHolderName, brand, userId } = req.body;

  if (!cardNumber) {
    errors.push("Card number is required");
  }

  if (!cardHolderName) {
    errors.push("Cardholder name is required");
  }

  if (!brand) {
    errors.push("Brand is required");
  }

  if (!userId) {
    errors.push("User ID is required");
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

export const validateFilter = (req, res, next) => {
  const filter = req.body.filter;

  if (!filter || isEmptyDeep(filter)) {
    return validationErrorResponse(res, ["Filter is required"]);
  }

  next();
};
