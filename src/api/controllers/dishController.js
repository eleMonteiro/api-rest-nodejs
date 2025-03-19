import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
} from "../services/dishService.js";

export const create = async (req, res) => {
  try {
    const dish = await _create(req.body);
    return res.status(201).json(dish);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating dish", error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await _remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing dish", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    await _update(req.params.id, req.body);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating dish", error: error.message });
  }
};

export const findAll = async (_req, res) => {
  try {
    const dishes = await _findAll();
    return res.status(200).json(dishes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching dishes", error: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const dish = await _findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    return res.status(200).json(dish);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching dish", error: error.message });
  }
};
