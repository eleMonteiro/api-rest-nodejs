import { validationErrorResponse } from "../helpers/apiResponse.js";
import { validate } from "./itemValidator.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateDemand = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, "Request body is empty");
  }

  const { total, address, dateOfDemand, itens } = req.body;
  const errors = [];

  if (
    total === undefined ||
    total === null ||
    isNaN(Number(total)) ||
    total <= 0
  ) {
    errors.push("Total must be a valid number greater than 0");
  }

  if (!address) {
    errors.push("Address is required");
  }

  if (!dateOfDemand) {
    errors.push("Date of demand is required");
  }

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    errors.push("Items are required");
  } else {
    let totalItens = 0;

    itens.forEach((item, index) => {
      const { errors: itemErrors, itemTotal } = validate(item, index);
      errors.push(...itemErrors);
      totalItens += itemTotal;
    });

    if (totalItens > total) {
      errors.push("Total price of items exceeds total");
    }

    if (totalItens < total) {
      errors.push("Total price of items is less than total");
    }

    if (totalItens === 0) {
      errors.push("Total price of items is zero");
    }
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
