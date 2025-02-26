const Role = require("@models/role");

const find = async (role) => {
  const { id } = role;
  const _role = await Role.findByPk(id);
  return _role;
};

module.exports = {
  find,
};
