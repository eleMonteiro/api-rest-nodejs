import User from "../models/user.js";
import { encrypt as _encrypt } from "../../utils/encrypt.js";

import { create as __create } from "./addressRepository.js";

import { Op } from "sequelize";

export const findByNameOrEmailOrCPF = async ({ name, email, cpf }) => {
  const conditions = [];

  if (typeof name === "string" && name.trim() !== "") {
    conditions.push({ name: { [Op.like]: `%${name}%` } });
  }

  if (typeof email === "string" && email.trim() !== "") {
    conditions.push({ email: { [Op.like]: `%${email}%` } });
  }

  if (typeof cpf === "string" && cpf.trim() !== "") {
    conditions.push({ cpf: { [Op.like]: `%${cpf}%` } });
  }

  if (conditions.length === 0) {
    return null;
  }

  const user = await User.findOne({
    where: {
      [Op.or]: conditions,
    },
  });

  return user;
};

export const findAll = async () => {
  const users = await User.findAll({ where: { active: true } });
  return users;
};

export const addAddress = async (user, addresses) => {
  addresses.forEach(async (element) => {
    const address = await __create(element);
    await user.addAddresses(address);
  });
};

export const create = async (user) => {
  const { addresses, ..._user } = user;
  _user.password = _encrypt(_user.password);

  const _user_ = await User.create({ ..._user, active: true });
  await addAddress(_user_, addresses);

  return _user_;
};

export const findById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

export const findByCPF = async (cpf) => {
  const user = await User.findOne({ where: { cpf: cpf, active: true } });
  return user;
};

export const findByEmail = async (email) => {
  const user = await User.findOne({
    includeIgnoreAttributes: false,
    where: { email: email },
  });
  return user;
};

export const remove = async (id) => {
  const user = await findById(id);
  await user.update({ active: false });
};

export const update = async (id, user) => {
  const _user = await findById(id);
  user.password = _user.password;
  user.email = _user.email;
  await _user.update({ ...user, active: true });
};

export const register = async (user) => {
  const { ..._user } = user;
  _user.password = _encrypt(_user.password);
  const _user_ = await User.create(_user);
  return _user_;
};
