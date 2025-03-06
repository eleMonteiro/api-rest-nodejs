import { create as _create, findAll } from "@models/roleUsers";

const create = async (roleUsers) => {
  const _roleUsers = await _create(roleUsers);
  return _roleUsers;
};

const findByUser = async (userId) => {
  const roles = await findAll(
    { order: [["userId", "ASC"]], attributes: ["roleId", "userId"] },
    {
      where: { userId: userId },
    }
  );

  return roles;
};

const getRoles = async (user) => {
  const roles = await findByUser(user.id);
  for (let i = 0; i < roles.length; i++) {
    const element = roles[i];
    if (element.roleId == "admin") return element.roleId;
    if (element.roleId == "cliente") return element.roleId;
  }
};

export default {
  create,
  findByUser,
  getRoles,
};
