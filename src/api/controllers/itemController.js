import {
  create as _create,
  remove as _remove,
  findAll as _findAll,
  findByDemand as _findByDemand,
  findById as _findById,
} from "../services/itemService.js";

export const create = async (req, res) => {
  try {
    const item = await _create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await _remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing item", error: error.message });
  }
};

export const findAll = async (_req, res) => {
  try {
    const items = await _findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
};

export const findByDemand = async (req, res) => {
  try {
    if (!req.query.demandId) {
      return res
        .status(400)
        .json({ message: "'demandId' parameter is required" });
    }
    const items = await _findByDemand(req.query.demandId);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching items by demand",
      error: error.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const item = await _findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
};
