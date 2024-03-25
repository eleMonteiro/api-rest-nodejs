const userRepository = require("../repositories/user/userRepository");
const validator = require("../../utils/validators");
const {
  CAMPO_INVALIDO,
  CAMPO_NAO_INFORMADO,
  OBJETO_UNDEFINED,
} = require("../../utils/messagesErro");

const create = async (user) => {
  if (Object.values(user).length == 0) return { message: OBJETO_UNDEFINED };

  const { addresses, roles, ..._user } = user;

  if (addresses == undefined)
    return { message: "Addresses: " + CAMPO_NAO_INFORMADO };
  if (roles == undefined) return { message: "Roles: " + CAMPO_NAO_INFORMADO };
  if (!validator.validCPF(_user.cpf))
    return { message: "CPF: " + CAMPO_INVALIDO };
  if (!roles.forEach((role) => validator.validRole(role.id)))
    return { message: "Role: " + CAMPO_INVALIDO };
  if (!validator.validEmail(_user.email))
    return { message: "Email: " + CAMPO_INVALIDO };

  return await userRepository.create(user);
};

const remove = async (id) => {
  await userRepository.remove(id);
};

const update = async (id, user) => {
  if (Object.values(user).length == 0) return { message: OBJETO_UNDEFINED };
  await userRepository.update(id, user);
};

const findAll = async () => {
  const users = await userRepository.findAll();
  return users ? users : [];
};

const findById = async (id) => {
  const user = await userRepository.findById(id);
  return user ? user : [];
};

const findByCPF = async (cpf) => {
  const user = await userRepository.findByCFP(cpf);
  return user ? user : [];
};

const findByEmail = async (email) => {
  const user = await userRepository.findByEmail(email);
  return user ? user : [];
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
