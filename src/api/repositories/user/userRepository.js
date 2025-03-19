import User from "../../models/user.js";
import { encrypt as _encrypt } from "../../../utils/encrypt.js";

import { find } from "../../repositories/role/roleRepository.js";
import { create as __create } from "../../repositories/address/addressRepository.js";
import {
  create as ___create,
  getRoles,
} from "../../repositories/role/roleUsersRepository.js";

export const findAll = async () => {
  const users = await User.findAll();
  return users;
};

export const addAddress = async (user, addresses) => {
  addresses.forEach(async (element) => {
    const address = await __create(element);
    await user.addAddresses(address);
  });
};

export const addRoles = async (user, roles) => {
  roles.forEach(async (element) => {
    const role = await find(element);
    await ___create({ userId: user.id, roleId: role.id });
  });
};

export const create = async (user) => {
  const { roles, addresses, ..._user } = user;
  _user.password = _encrypt(_user.password);

  const _user_ = await User.create(_user);
  await addRoles(_user_, roles);
  await addAddress(_user_, addresses);

  return _user_;
};

export const findById = async (id) => {
  const user = await user.findByPk(id);
  return user;
};

export const findByCFP = async (cpf) => {
  const user = await User.findOne({ where: { cpf: cpf } });
  return user;
};

export const findByEmail = async (email) => {
  const user = await User.findOne({
    includeIgnoreAttributes: false,
    where: { email: email },
  });
  const role = await getRoles(user);
  user.role = role;
  return user;
};

export const remove = async (id) => {
  const user = await findById(id);
  await user.destroy();
};

export const update = async (id, user) => {
  const _user = await findById(id);
  user.password = _user.password;
  user.email = _user.email;
  await _user.update({ ...user });
};
