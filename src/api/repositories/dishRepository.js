import { Dish } from "../models/associations.js";
import { fiqlToSequelize } from "../../utils/fiql.js";

export const create = async (dish) => {
  const _dish = await Dish.create({ active: true, ...dish });
  return _dish;
};

export const remove = async (id) => {
  const dish = await findById(id);
  await dish.update({ active: false });
};

export const update = async (id, dish) => {
  const _dish = await findById(id);
  await _dish.update({ active: true, ...dish });
};

export const findAll = async ({
  page = 1,
  pageSize = 10,
  sort = { field: "id", order: "asc" },
  filter = null,
} = {}) => {
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  const { field, order } = sort;

  const where = {
    ...fiqlToSequelize(filter),
    active: true,
  };

  const { rows, count } = await Dish.findAndCountAll({
    where,
    order: [[field, order]],
    limit,
    offset,
  });

  return {
    dishes: rows,
    pagination: {
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
  };
};

export const findById = async (id) => {
  const user = await Dish.findByPk(id);
  return user;
};
