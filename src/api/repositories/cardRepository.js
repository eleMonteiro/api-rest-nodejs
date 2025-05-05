import { Card } from "../models/associations.js";

export const create = async (card) => {
    const _card= await Card.create({ active: true, ...card });
    return _card;
};

export const remove = async (id) => {
    const card = await findById(id);
    await card.update({ active: false });
}

export const update = async (id, card) => {
    const _card = await findById(id);
    await _card.update({ active: true, ...card });
};

export const findById = async (id) => {
    const card = await Card.findByPk(id);
    return card;
};

export const findByFilter = async (filter) => {
    const where = {};

    for (const key in filter) {
        if (filter[key] == null) continue;
        where[key] = filter[key];
    }

    where.active = true;

    const cards = await Card.findAll({ where });
    return cards;
}
