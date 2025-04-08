import { validationErrorResponse } from "../helpers/apiResponse.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validate = (data, isAddressValidate = false) => {
  const { road, cep, neighborhood, city, uf, userId } = data;
  const errors = [];

  if (!road) {
    errors.push("Road is required");
  }

  if (!cep) {
    errors.push("CEP is required");
  }

  if (!neighborhood) {
    errors.push("Neighborhood is required");
  }

  if (!city) {
    errors.push("City is required");
  }

  if (!uf) {
    errors.push("UF is required");
  }

  if (uf.length !== 2) {
    errors.push("UF must be 2 characters");
  }

  if (cep.length !== 8) {
    errors.push("CEP must be 8 characters");
  }

  if(isAddressValidate && !userId) {
    errors.push("User ID is required");
  }

  return errors;
};

export const validateAddress = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const errors = validate(req.body, true);

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
