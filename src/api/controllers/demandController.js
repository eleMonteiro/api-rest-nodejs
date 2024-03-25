const demandService = require("../services/demandService");

const create = async (req, res) => {
  const demand = await demandService.create(req.body);
  return res.status(200).json(demand);
};

const remove = async (req, res) => {
  await demandService.remove(req.params.id);
  return res.status(204).json();
};

const findAll = async (_req, res) => {
  const demands = await demandService.findAll();
  return res.status(200).json(demands);
};

const findByUser = async (req, res) => {
  const demands = await demandService.findByUser(req.query.userId);
  return res.status(200).json(demands);
};

const findById = async (req, res) => {
  const demand = await demandService.findById(req.params.id);
  return res.status(200).json(demand);
};

module.exports = {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
