import validator from "validator";
import validarCpf from "validar-cpf";
import { ADMIN, CLIENTE, AUTH } from "../utils/roles.js";
import { validationErrorResponse } from "../helpers/apiResponse.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const validEmail = (email) => {
  return email && validator.isEmail(email);
};

const validCPF = (cpf) => {
  return cpf && validarCpf(cpf);
};

const validRole = (role) => {
  return (
    role &&
    [ADMIN, CLIENTE, AUTH]
      .map((r) => r.toLowerCase())
      .includes(role.toLowerCase())
  );
};

export const validateUser = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const errors = [];
  const { name, email, password, cpf, role, addresses } = req.body;

  if (!name || name.trim().length === 0) {
    errors.push("User name is required");
  } else if (name.length > 100) {
    errors.push("Name must be at most 100 characters long");
  }

  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (email.length > 100) {
    errors.push("Email must be at most 100 characters long");
  } else if (validEmail(email) === false) {
    errors.push("Invalid email format");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (validCPF(cpf) === false) {
    errors.push("Invalid CPF format");
  }

  if (role && validRole(role) === false) {
    const allowedRoles = [ADMIN, CLIENTE, AUTH].map((r) => r.toLowerCase());
    errors.push(`Role must be one of: ${allowedRoles.join(", ")}`);
  }

  if (!addresses || addresses.length === 0) {
    errors.push("Addresses are required");
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

export const validateUserRegister = (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return validationErrorResponse(res, ["Request body is empty"]);
  }

  const errors = [];
  const { name, email, password, role } = req.body;

  if (!name || name.trim().length === 0) {
    errors.push("User name is required");
  } else if (name.length > 100) {
    errors.push("Name must be at most 100 characters long");
  }

  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (email.length > 100) {
    errors.push("Email must be at most 100 characters long");
  } else if (validEmail(email) === false) {
    errors.push("Invalid email format");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (role && validRole(role) === false) {
    const allowedRoles = [ADMIN, CLIENTE, AUTH].map((r) => r.toLowerCase());
    errors.push(`Role must be one of: ${allowedRoles.join(", ")}`);
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};
