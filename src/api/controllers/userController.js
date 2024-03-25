const userService = require("../services/userService");

const create = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(200).json(user);
};

const remove = async (req, res) => {
  await userService.remove(req.params.id);
  res.status(204).json();
};

const update = async (req, res) => {
  await userService.update(req.params.id, req.body);
  res.status(204).json();
};

const findAll = async (_req, res) => {
  const users = await userService.findAll();
  res.status(200).json(users);
};

const findById = async (req, res) => {
  const user = await userService.findById(req.params.id);
  res.status(200).json(user);
};

const findByCPF = async (req, res) => {
  const user = await userService.findById(req.query.cpf);
  res.status(200).json(user);
};

module.exports = {
  create,
  remove,
  update,
  findAll,
  findById,
  findByCPF,
};
