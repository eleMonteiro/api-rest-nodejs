import User from "../models/user.js";
import Address from "../models/address.js";
import { encrypt as _encrypt } from "../../utils/encrypt.js";
import { createOrUpdate, syncAddresses } from "./addressRepository.js";

import { Op } from "sequelize";

export const findByEmailOrCPF = async ({ email, cpf }) => {
  const conditions = [];

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

export const create = async (user) => {
  const { addresses = [], ..._user } = user;
  _user.password = _encrypt(_user.password);
  const _user_ = await User.create({ active: true, ..._user });
  await createOrUpdate(_user_, addresses);
  return _user_;
};

export const findById = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Address,
        as: "addresses",
        where: { active: true },
        required: false,
      },
    ],
  });
  return user;
};

export const findByFilter = async (filter) => {
  const where = {};

  for (const key in filter) {
    if (filter[key] == null) continue;
    where[key] = filter[key];
  }

  const user = await User.findOne({ where });
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

export const update = async (id, userData) => {
  const _user = await findById(id);

  const updatedUser = await _user.update({
    active: true,
    ...userData,
    password: _user.password,
    email: _user.email,
  });

  if (userData.addresses) {
    await syncAddresses(updatedUser, userData.addresses);
  }
};

export const register = async (user) => {
  const { ..._user } = user;
  _user.password = _encrypt(_user.password);
  const _user_ = await User.create(_user);
  return _user_;
};
