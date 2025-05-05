import {
  create as _create,
  remove as _remove,
  update as _update,
  findById as _findById,
  findByFilter as _findByFilter,
} from "../repositories/cardRepository.js";

export const create = async (card) => {
  const _card = await _create(card);
  return _card;
};

export const remove = async (id) => {
  await _remove(id);
};

export const update = async (id, card) => {
  await _update(id, card);
};

export const findById = async (id) => {
  const card = await _findById(id);
  return card || null;
};

export const findByFilter = async (filter) => {
  const cards = await _findByFilter(filter);
  return cards || [];
};
