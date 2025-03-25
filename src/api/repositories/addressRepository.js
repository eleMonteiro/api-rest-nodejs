import Address from "../models/address.js";

export const create = async (address) => {
  const _address = await Address.create(address);
  return _address;
};

export const remove = async (id) => {
  await Address.deleteOne({ _id: id });
};

export const update = async (id, address) => {
  await Address.updateOne({ _id: id }, address);
};
