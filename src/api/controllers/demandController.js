const demandService = require("@services/demandService");

const create = async (req, res) => {
  try {
    const demand = await demandService.create(req.body);
    return res.status(201).json(demand); 
  } catch (error) {
    return res.status(500).json({ message: "Error creating demand", error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await demandService.remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error removing demand", error: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const demands = await demandService.findAll();
    return res.status(200).json(demands);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching demands", error: error.message });
  }
};

const findByUser = async (req, res) => {
  try {
    if (!req.query.userId) {
      return res.status(400).json({ message: "'userId' parameter is required" });
    }
    const demands = await demandService.findByUser(req.query.userId);
    return res.status(200).json(demands);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching demands by user", error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const demand = await demandService.findById(req.params.id);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found" });
    }
    return res.status(200).json(demand);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching demand", error: error.message });
  }
};

module.exports = {
  create,
  remove,
  findAll,
  findByUser,
  findById,
};
