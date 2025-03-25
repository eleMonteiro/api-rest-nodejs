import {
  remove as _remove,
  update as _update,
} from "../services/addressService.js";

export const remove = async (req, res) => {
  try {
    await _remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing address", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    await _update(req.params.id, req.body);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating address", error: error.message });
  }
};
