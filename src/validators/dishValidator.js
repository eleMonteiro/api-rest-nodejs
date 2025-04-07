import { validationErrorResponse } from "../helpers/apiResponse.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateDish = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const errors = [];
  const { name, price, description, category } = req.body;

  if (!name || name.trim().length === 0) {
    errors.push("Dish name is required");
  } else if (name.length > 100) {
    errors.push("Name must be at most 100 characters long");
  }

  if (!description || description.trim().length === 0) {
    errors.push("Dish description is required");
  } else if (description.length > 100) {
    errors.push("Description must be at most 100 characters long");
  }

  if (!category || category.trim().length === 0) {
    errors.push("Dish category is required");
  }

  if (!price) {
    errors.push("Price is required");
  } else if (isNaN(price)) {
    errors.push("Price must be a number");
  } else if (Number(price) <= 0) {
    errors.push("Price must be greater than zero");
  }

  if (req.file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      errors.push("Image must be in JPEG, PNG, GIF, or WEBP format");
    }
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
