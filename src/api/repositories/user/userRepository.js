const User = require("../../models/user");
const encrypt = require("../../../utils/encrypt");

const roleRepository = require("../role/roleRepository");
const addressRepository = require("../address/addressRepository");
const roleUsersRepository = require("../role/roleUsersRepository");

const findAll = async () => {
  const users = await User.findAll({ include: ["addresses", "roles"] });
  return users;
};

const addAddress = async (user, addresses) => {
  addresses.forEach(async (element) => {
    const address = await addressRepository.create(element);
    await user.addAddresses(address);
  });
};

const addRoles = async (user, roles) => {
  roles.forEach(async (element) => {
    const role = await roleRepository.find(element);
    await roleUsersRepository.create({ userId: user.id, roleId: role.id });
  });
};

const create = async (user) => {
  const { roles, addresses, ..._user } = user;
  _user.password = encrypt.encrypt(_user.password);

  const _user_ = await User.create(_user);
  await addRoles(_user_, roles);
  await addAddress(_user_, addresses);

  return _user_;
};

const findById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const findByCFP = async (cpf) => {
  const user = await User.findOne({ where: { cpf: cpf } });
  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({
    includeIgnoreAttributes: false,
    where: { email: email },
  });
  const roles = await user.getRoles({ joinTableAttributes: ["userId"] });

  const roleAdmin = roles.filter((role) => role.id == "admin");
  const roleClient = roles.filter((role) => role.id == "cliente");

  if (roleAdmin.length > 0) user.role = roleAdmin.pop();
  else user.role = roleClient.pop();

  return user;
};

const remove = async (id) => {
  const user = await findById(id);
  await user.destroy();
};

const update = async (id, user) => {
  const _user = await findById(id);
  user.password = _user.password;
  user.email = _user.email;
  await _user.update({ ...user });
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
  findByCFP,
  findByEmail,
};
