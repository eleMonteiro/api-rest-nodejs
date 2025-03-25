import {
  remove as _remove,
  update as _update,
} from "../repositories/addressRepository.js";
import { createValidationError } from "../../utils/responses.js";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, address) => {
  if (isEmptyObject(address)) {
    throw createValidationError("OBJECT_UNDEFINED");
  }
  await _update(id, address);
};
