const itemService = require("../services/itemService");

const create = async (req, res) => {
  const item = await itemService.create(req.body);
  return res.status(200).json(item);
};

const remove = async (req, res) => {
  await itemService.remove(req.params.id);
  return res.status(204).json();
};

const findAll = async (_req, res) => {
  const itens = await itemService.findAll();
  return res.status(200).json(itens);
};

const findByDemand = async (req, res) => {
  const itens = itemService.findByDemand(req.query.demandId);
  return res.status(200).json(itens);
};

const findById = async (req, res) => {
  const item = await itemService.findById(req.params.id);
  return res.status(200).json(item);
};

module.exports = {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
