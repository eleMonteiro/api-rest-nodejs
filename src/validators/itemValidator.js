import { validationErrorResponse } from "../helpers/apiResponse.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validate = (item, index) => {
  const errors = [];

  const amount = parseInt(item.amount);
  const totalPrice = parseFloat(item.totalPrice);

  if (!item.amount) {
    errors.push(`Item ${index}: Amount is required`);
  } else if (isNaN(amount) || amount <= 0) {
    errors.push(`Item ${index}: Amount must be a number greater than 0`);
  }

  if (!item.totalPrice) {
    errors.push(`Item ${index}: Total price is required`);
  } else if (isNaN(totalPrice) || totalPrice <= 0) {
    errors.push(`Item ${index}: Total price must be a number greater than 0`);
  }

  return {
    errors,
    itemTotal: isNaN(amount) || isNaN(totalPrice) ? 0 : amount * totalPrice,
  };
};

export const validateItem = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const { errors } = validateItem(req.body, 0);

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
