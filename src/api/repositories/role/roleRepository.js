import { findByPk } from "@models/role";

const find = async (role) => {
  const { id } = role;
  const _role = await findByPk(id);
  return _role;
};

export default {
  find,
};
