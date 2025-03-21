import RoleUser from "../models/roleUsers.js";

export const create = async (roleUsers) => {
  const _roleUsers = await RoleUser.create(roleUsers);
  return _roleUsers;
};

export const findByUser = async (userId) => {
  const roles = await RoleUser.findAll(
    { order: [["userId", "ASC"]], attributes: ["roleId", "userId"] },
    {
      where: { userId: userId },
    }
  );

  return roles;
};

export const getRoles = async (user) => {
  const roles = await findByUser(user.id);
  for (let i = 0; i < roles.length; i++) {
    const element = roles[i];
    if (element.roleId == "admin") return element.roleId;
    if (element.roleId == "cliente") return element.roleId;
  }
};
