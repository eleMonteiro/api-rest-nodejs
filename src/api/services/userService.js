const userRepository = require("../repositories/user/userRepository");
const validator = require("../../utils/validatorUser");
const {
  FIELD_NOT_SPECIFIED,
  INVALID_FIELD,
  OBJECT_UNDEFINED,
} = require("../../utils/messagesErro");
const date = require("../../utils/date");

const create = async (user) => {
  if (Object.values(user).length == 0) return { message: OBJECT_UNDEFINED };

  const { addresses, roles, ..._user } = user;

  if (addresses == undefined)
    return { message: "Addresses: " + FIELD_NOT_SPECIFIED };
  if (roles == undefined) return { message: "Roles: " + FIELD_NOT_SPECIFIED };
  if (!validator.validCPF(_user.cpf))
    return { message: "CPF: " + INVALID_FIELD };
  if (!roles.forEach((role) => validator.validRole(role.id)))
    return { message: "Role: " + INVALID_FIELD };
  if (!validator.validEmail(_user.email))
    return { message: "Email: " + INVALID_FIELD };

  return await userRepository.create(user);
};

const remove = async (id) => {
  await userRepository.remove(id);
};

const update = async (id, user) => {
  if (Object.values(user).length == 0) return { message: OBJECT_UNDEFINED };
  user.dateOfBirth = new Date(date.reverse(user.dateOfBirth));
  await userRepository.update(id, user);
};

const findAll = async () => {
  const users = await userRepository.findAll();
  users.forEach((user) => {
    adjustDate(user);
  });
  return users ? users : [];
};

const findById = async (id) => {
  const user = await userRepository.findById(id);
  adjustDate(user);
  return user ? user : [];
};

const findByCPF = async (cpf) => {
  const user = await userRepository.findByCFP(cpf);
  adjustDate(user);
  return user ? user : [];
};

const findByEmail = async (email) => {
  const user = await userRepository.findByEmail(email);
  adjustDate(user);
  return user ? user : [];
};

const adjustDate = (user) => {
  const { dataValues } = user;
  dataValues.dateOfBirth = date.formatDate(
    dataValues.dateOfBirth,
    "DD/MM/YYYY"
  );
  return user;
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
