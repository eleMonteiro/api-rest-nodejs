import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
  findByCFP,
  findByEmail as _findByEmail,
} from "../repositories/user/userRepository.js";
import { validCPF, validRole, validEmail } from "../../utils/validatorUser.js";
import { createValidationError } from "../../utils/responses.js";
import { formatDate, reverse } from "../../utils/date.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const validateUserFields = (user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  const { addresses, roles, ..._user } = user;

  if (!addresses)
    throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Addresses" });
  if (!roles)
    throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Roles" });
  if (!validCPF(_user.cpf))
    throw createValidationError("INVALID_FIELD", { field: "CPF" });
  if (!roles.every((role) => validRole(role.id)))
    throw createValidationError("INVALID_FIELD", { field: "Role" });
  if (!validEmail(_user.email))
    throw createValidationError("INVALID_FIELD", { field: "Email" });
};

export const adjustDate = (user) => {
  const { dataValues } = user;
  dataValues.dateOfBirth = formatDate(dataValues.dateOfBirth, "DD/MM/YYYY");
  return user;
};

export const create = async (user) => {
  validateUserFields(user);
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
  const user = await findByCFP(cpf);
  if (user) adjustDate(user);
  return user || null;
};

export const findByEmail = async (email) => {
  const user = await _findByEmail(email);
  if (user) adjustDate(user);
  return user || null;
};
