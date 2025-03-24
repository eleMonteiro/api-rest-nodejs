import RoleUser from "../models/roleUsers.js";
import { ADMIN, CLIENTE } from "../../utils/roles.js";

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
  const role = roles.find(
    (element) => element.roleId === ADMIN || element.roleId === CLIENTE
  );
  return role?.roleId;
};
