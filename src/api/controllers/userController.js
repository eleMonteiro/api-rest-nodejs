import {
  create as _create,
  remove as _remove,
  update as _update,
  findAll as _findAll,
  findById as _findById,
  findByCPF as _findByCPF,
  register as _register,
} from "../services/userService.js";

export const create = async (req, res) => {
  try {
    const user = await _create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await _remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing user", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    await _update(req.params.id, req.body);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const findAll = async (_req, res) => {
  try {
    const users = await _findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await _findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const findByCPF = async (req, res) => {
  try {
    const user = await _findByCPF(req.query.cpf);
    if (!user) {
      return res.status(404).json({ message: "User not found by CPF" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user by CPF", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const user = await _register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
