import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
  findByFilter as _findByFilter,
  findByEmail as _findByEmail,
  register as _register,
  findByEmailOrCPF as _findByEmailOrCPF,
} from "../repositories/userRepository.js";
import { formatDate, reverse } from "../../utils/date.js";

export const adjustDate = (user) => {
  const { dataValues } = user;
  if (!dataValues.dateOfBirth) return user;
  dataValues.dateOfBirth = formatDate(dataValues.dateOfBirth, "DD/MM/YYYY");
  return user;
};

export const create = async (user) => {
  user.dateOfBirth = new Date(reverse(user.dateOfBirth));
  return await _create(user);
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, user) => {
  user.dateOfBirth = new Date(reverse(user.dateOfBirth));
  await _update(id, user);
};

export const findAll = async () => {
  const users = await _findAll();
  users.forEach(adjustDate);
  return users.length > 0 ? users : [];
};

export const findById = async (id) => {
  const user = await _findById(id);
  if (user) adjustDate(user);
  return user || null;
};

export const findByFilter = async (filter) => {
  const user = await _findByFilter(filter);
  if (user) adjustDate(user);
  return user || null;
};

export const findByEmail = async (email) => {
  const user = await _findByEmail(email);
  if (user) adjustDate(user);
  return user || null;
};

export const register = async (user) => {
  return await _register(user);
};

export const findByEmailOrCPF = async (user) => {
  const { email, cpf } = user;
  const userFound = await _findByEmailOrCPF({ email, cpf });
  if (userFound) adjustDate(userFound);
  return userFound || null;
};
