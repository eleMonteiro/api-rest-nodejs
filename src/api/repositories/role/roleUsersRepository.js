const RoleUsers = require("../../models/roleUsers");

const create = async (roleUsers) => {
  const _roleUsers = await RoleUsers.create(roleUsers);
  return _roleUsers;
};

const findByUser = async (userId) => {
  const roles = await RoleUsers.findOne({
    where: { userId: userId },
  });

  return roles;
};

module.exports = {
  create,
  findByUser,
};
