const dishService = require("../services/dishService");

const create = async (req, res) => {
  const dish = await dishService.create(req.body);
  return res.status(200).json(dish);
};

const remove = async (req, res) => {
  await dishService.remove(req.params.id);
  return res.status(204).json();
};

const update = async (req, res) => {
  await dishService.update(req.params.id, req.body);
  return res.status(204).json();
};

const findAll = async (_req, res) => {
  const dish = await dishService.findAll();
  res.status(200).json(dish);
};

const findById = async (req, res) => {
  const dish = await dishService.findById(req.params.id);
  res.status(200).json(dish);
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
};
