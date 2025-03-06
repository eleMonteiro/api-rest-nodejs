import { create as _create, remove as _remove, update as _update, findAll as _findAll, findById as _findById, findByCFP, findByEmail as _findByEmail } from "@repositories/user/userRepository";
import { validCPF, validRole, validEmail } from "@utils/validatorUser";
import { createValidationError } from "@utils/erros";
import { formatDate, reverse } from "@utils/date";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const validateUserFields = (user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  const { addresses, roles, ..._user } = user;

  if (!addresses) throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Addresses" });
  if (!roles) throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Roles" });
  if (!validCPF(_user.cpf)) throw createValidationError("INVALID_FIELD", { field: "CPF" });
  if (!roles.every(role => validRole(role.id))) throw createValidationError("INVALID_FIELD", { field: "Role" });
  if (!validEmail(_user.email)) throw createValidationError("INVALID_FIELD", { field: "Email" });
};

const adjustDate = (user) => {
  const { dataValues } = user;
  dataValues.dateOfBirth = formatDate(dataValues.dateOfBirth, "DD/MM/YYYY");
  return user;
};

const create = async (user) => {
  validateUserFields(user);
  return await _create(user);
};

const remove = async (id) => {
  await _remove(id);
};

const update = async (id, user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  user.dateOfBirth = new Date(reverse(user.dateOfBirth));
  await _update(id, user);
};

const findAll = async () => {
  const users = await _findAll();
  users.forEach(adjustDate);
  return users.length > 0 ? users : [];
};

const findById = async (id) => {
  const user = await _findById(id);
  if (user) adjustDate(user);
  return user || null;
};

const findByCPF = async (cpf) => {
  const user = await findByCFP(cpf);
  if (user) adjustDate(user);
  return user || null;
};

const findByEmail = async (email) => {
  const user = await _findByEmail(email);
  if (user) adjustDate(user);
  return user || null;
};

export default {
  create,
  remove,
  update,
  findAll,
  findById,
  findByCPF,
  findByEmail,
};
