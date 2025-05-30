import { validationErrorResponse } from "../helpers/apiResponse.js";
import { validate } from "./itemValidator.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateDemand = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, "Request body is empty");
  }

  const { total, address, dateOfDemand, items, deliveryMethod } = req.body;
  const errors = [];

  if (
    total === undefined ||
    total === null ||
    isNaN(Number(total)) ||
    total <= 0
  ) {
    errors.push("Total must be a valid number greater than 0");
  }

  if (!deliveryMethod || !["RETIRADA", "ENTREGA"].includes(deliveryMethod)) {
    errors.push("Delivery method must be either 'RETIRADA' or 'ENTREGA'");
  }

  if (deliveryMethod === "ENTREGA" && !address) {
    errors.push("Address is required");
  }

  if (!dateOfDemand) {
    errors.push("Date of demand is required");
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push("Items are required");
  } else {
    let totalItens = 0;

    items.forEach((item, index) => {
      const { errors: itemErrors, totalPrice } = validate(item, index);
      errors.push(...itemErrors);
      totalItens += totalPrice;
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

export const validateDemandEdition = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, "Request body is empty");
  }

  const { total, address, dateOfDemand, deliveryMethod } = req.body;
  const errors = [];

  if (
    total === undefined ||
    total === null ||
    isNaN(Number(total)) ||
    total <= 0
  ) {
    errors.push("Total must be a valid number greater than 0");
  }

  if (!deliveryMethod || !["RETIRADA", "ENTREGA"].includes(deliveryMethod)) {
    errors.push("Delivery method must be either 'RETIRADA' or 'ENTREGA'");
  }

  if (deliveryMethod === "ENTREGA" && !address) {
    errors.push("Address is required");
  }

  if (!dateOfDemand) {
    errors.push("Date of demand is required");
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
