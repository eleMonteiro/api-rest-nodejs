import Address from "../../models/address.js";

export const create = async (address) => {
  const _address = await Address.create(address);
  return _address;
};
