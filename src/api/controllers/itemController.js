const itemService = require("../services/itemService");

const create = async (req, res) => {
  try {
    const item = await itemService.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Error creating item", error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await itemService.remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error removing item", error: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const items = await itemService.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

const findByDemand = async (req, res) => {
  try {
    if (!req.query.demandId) {
      return res.status(400).json({ message: "'demandId' parameter is required" });
    }
    const items = await itemService.findByDemand(req.query.demandId);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching items by demand", error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const item = await itemService.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching item", error: error.message });
  }
};

module.exports = {
  create,
  remove,
  findAll,
  findByDemand,
  findById,
};
