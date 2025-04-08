import {
  create as _create,
  remove as _remove,
  update as _update,
  findById as _findById,
  findByUserId as _findByUserId,
} from "../repositories/addressRepository.js";

export const create = async (address) => {
  const _address = await _create(address);
  return _address;
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, address) => {
  await _update(id, address);
};

export const findById = async (id) => {
  const address = await _findById(id);
  if (!address) {
    return null;
  }
  return address;
};

export const findByUserId = async (id) => {
  const addresses = await _findByUserId(id);
  return addresses;
};
