import Role from "../../models/role.js";

export const find = async (role) => {
  const { id } = role;
  const _role = await Role.findByPk(id);
  return _role;
};
