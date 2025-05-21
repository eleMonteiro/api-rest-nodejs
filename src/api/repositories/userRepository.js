import { User, Address } from "../models/associations.js";
import { encrypt as _encrypt } from "../../utils/encrypt.js";
import { createOrUpdate, syncAddresses } from "./addressRepository.js";

import { Op } from "sequelize";
import { fiqlToSequelize } from "../../utils/fiql.js";

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

export const findAll = async ({
  page = 1,
  pageSize = 10,
  sort = { field: "id", order: "asc" },
  filter = null,
} = {}) => {
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  const { field, order } = sort;

  const where = {
    ...fiqlToSequelize(filter),
    active: true,
  };

  const { rows, count } = await User.findAndCountAll({
    where,
    order: [[field, order]],
    limit,
    offset,
  });

  return {
    users: rows,
    pagination: {
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
  };
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

  where.active = true;

  const users = await User.findAll({ where });
  return users;
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
