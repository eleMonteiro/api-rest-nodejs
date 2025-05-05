import { Address } from "../models/associations.js";

export const create = async (address) => {
  const _address = await Address.create({ active: true, ...address });
  return _address;
};

export const remove = async (id) => {
  await Address.update(
    {
      active: false,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

export const update = async (id, address) => {
  await Address.update(
    {
      ...address,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

export const findByUserId = async (id) => {
  const addresses = await Address.findAll({
    where: {
      userId: id,
      active: true,
    },
  });
  return addresses;
};

export const createOrUpdate = async (user, addresses) => {
  for (const address of addresses) {
    if (address.id) {
      await update(address.id, {
        ...address,
        userId: user?.id,
      });
    } else {
      await create({
        ...address,
        userId: user?.id,
      });
    }
  }
};

export const removeByUser = async (user, addresses) => {
  const addressesUser = await findByUserId(user.id);
  const ids = addresses.filter((addr) => addr.id).map((addr) => addr.id);
  const toRemove = addressesUser.filter((addr) => !ids.includes(addr.id));

  for (const address of toRemove) {
    await remove(address.id);
  }
};

export const syncAddresses = async (user, addresses) => {
  const current = await findByUserId(user.id);
  const incomingIds = addresses.filter((a) => a.id).map((a) => a.id);

  const toRemove = current.filter((a) => !incomingIds.includes(a.id));
  for (const address of toRemove) {
    await remove(address.id);
  }

  for (const address of addresses) {
    if (address.id) {
      await update(address.id, {
        ...address,
        userId: user.id,
      });
    } else {
      await create({
        ...address,
        userId: user.id,
      });
    }
  }
};

export const findById = async (id) => {
  const address = await Address.findOne({
    where: {
      id: id,
      active: true,
    },
  });
  return address;
};

export const findByFilter = async (filter) => {
  const where = {};

  for (const key in filter) {
    if (filter[key] == null) continue;
    where[key] = filter[key];
  }

  where.active = true;

  const addresses = await Address.findAll({ where });
  return addresses;
};
