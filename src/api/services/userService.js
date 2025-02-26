const userRepository = require("@repositories/user/userRepository");
const validator = require("@utils/validatorUser");
const { createValidationError } = require("@utils/erros");
const date = require("@utils/date");

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const validateUserFields = (user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }

  const { addresses, roles, ..._user } = user;

  if (!addresses) throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Addresses" });
  if (!roles) throw createValidationError("FIELD_NOT_SPECIFIED", { field: "Roles" });
  if (!validator.validCPF(_user.cpf)) throw createValidationError("INVALID_FIELD", { field: "CPF" });
  if (!roles.every(role => validator.validRole(role.id))) throw createValidationError("INVALID_FIELD", { field: "Role" });
  if (!validator.validEmail(_user.email)) throw createValidationError("INVALID_FIELD", { field: "Email" });
};

const adjustDate = (user) => {
  const { dataValues } = user;
  dataValues.dateOfBirth = date.formatDate(dataValues.dateOfBirth, "DD/MM/YYYY");
  return user;
};

const create = async (user) => {
  validateUserFields(user);
  return await userRepository.create(user);
};

const remove = async (id) => {
  await userRepository.remove(id);
};

const update = async (id, user) => {
  if (isEmptyObject(user)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  user.dateOfBirth = new Date(date.reverse(user.dateOfBirth));
  await userRepository.update(id, user);
};

const findAll = async () => {
  const users = await userRepository.findAll();
  users.forEach(adjustDate);
  return users.length > 0 ? users : [];
};

const findById = async (id) => {
  const user = await userRepository.findById(id);
  if (user) adjustDate(user);
  return user || null;
};

const findByCPF = async (cpf) => {
  const user = await userRepository.findByCFP(cpf);
  if (user) adjustDate(user);
  return user || null;
};

const findByEmail = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (user) adjustDate(user);
  return user || null;
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
  findByCPF,
  findByEmail,
};
