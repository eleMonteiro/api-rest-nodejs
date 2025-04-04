import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
  findByCPF as _findByCPF,
  findByEmail as _findByEmail,
  register as _register,
  findByNameOrEmailOrCPF,
} from "../repositories/userRepository.js";
import { validCPF, validRole, validEmail } from "../../utils/validatorUser.js";
import { createValidationError } from "../../utils/responses.js";
import { formatDate, reverse } from "../../utils/date.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const validateUserFields = async (user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  const { addresses, ..._user } = user;

  if (!addresses || addresses.length === 0)
    throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Addresses" });
  if (!validCPF(_user?.cpf))
    throw createValidationError("INVALID_FIELD", { field: "CPF" });
  if (!validRole(_user?.role))
    throw createValidationError("INVALID_FIELD", { field: "Role" });
  if (!validEmail(_user?.email))
    throw createValidationError("INVALID_FIELD", { field: "Email" });
};

export const adjustDate = (user) => {
  const { dataValues } = user;
  if (!dataValues.dateOfBirth) return user;
  dataValues.dateOfBirth = formatDate(dataValues.dateOfBirth, "DD/MM/YYYY");
  return user;
};

export const create = async (user) => {
  validateUserFields(user);

  const exist = await findByNameOrEmailOrCPF({
    email: user?.email,
    name: user?.name,
    cpf: user?.cpf,
  });

  if (exist) {
    throw createValidationError("OBJECT_ALREADY_EXISTS");
  }

  user.dateOfBirth = new Date(reverse(user.dateOfBirth));
  return await _create(user);
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  user.dateOfBirth = new Date(reverse(user.dateOfBirth));
  await _update(id, user);
};

export const findAll = async () => {
  const users = await _findAll();
  users.forEach(adjustDate);
  return users.length > 0 ? users : [];
};

export const findById = async (id) => {
  const user = await _findById(id);
  if (user) adjustDate(user);
  return user || null;
};

export const findByCPF = async (cpf) => {
  const user = await _findByCPF(cpf);
  if (user) adjustDate(user);
  return user || null;
};

export const findByEmail = async (email) => {
  const user = await _findByEmail(email);
  if (user) adjustDate(user);
  return user || null;
};

export const register = async (user) => {
  const existUser = await findByNameOrEmailOrCPF({
    email: user?.email,
    name: user?.name,
    cpf: user?.cpf,
  });

  if (existUser) {
    throw createValidationError("OBJECT_ALREADY_EXISTS");
  }

  return await _register(user);
};
