import Address from "../models/address.js";

export const create = async (address) => {
  const _address = await Address.create({ ...address, active: true });
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
