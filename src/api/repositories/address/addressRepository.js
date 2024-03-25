const Address = require("../../models/address");

const create = async (address) => {
  const _address = await Address.create(address);
  return _address;
};

module.exports = {
  create,
};
