import { findAll as _findAll, create as _create, findByPk, findOne } from "@models/user";
import { encrypt as _encrypt } from "@utils/encrypt";

import { find } from "@repositories/role/roleRepository";
import { create as __create } from "@repositories/address/addressRepository";
import { create as ___create, getRoles } from "@repositories/role/roleUsersRepository";

const findAll = async () => {
  const users = await _findAll();
  return users;
};

const addAddress = async (user, addresses) => {
  addresses.forEach(async (element) => {
    const address = await __create(element);
    await user.addAddresses(address);
  });
};

const addRoles = async (user, roles) => {
  roles.forEach(async (element) => {
    const role = await find(element);
    await ___create({ userId: user.id, roleId: role.id });
  });
};

const create = async (user) => {
  const { roles, addresses, ..._user } = user;
  _user.password = _encrypt(_user.password);

  const _user_ = await _create(_user);
  await addRoles(_user_, roles);
  await addAddress(_user_, addresses);

  return _user_;
};

const findById = async (id) => {
  const user = await findByPk(id);
  return user;
};

const findByCFP = async (cpf) => {
  const user = await findOne({ where: { cpf: cpf } });
  return user;
};

const findByEmail = async (email) => {
  const user = await findOne({
    includeIgnoreAttributes: false,
    where: { email: email },
  });
  const role = await getRoles(user);
  user.role = role;
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

export default {
  create,
  remove,
  update,
  findAll,
  findById,
  findByCFP,
  findByEmail,
};
