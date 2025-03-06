import { create as _create } from "@models/address";

const create = async (address) => {
  const _address = await _create(address);
  return _address;
};

export default {
  create,
};
