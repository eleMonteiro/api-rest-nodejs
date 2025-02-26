const validPriceDemand = (demand) => {
  if (!demand || !Array.isArray(demand.itens)) {
    throw new Error("Invalid demand structure");
  }

  const { total, itens } = demand;
  const totalItens = itens.reduce((sum, element) => sum + (element.amount * element.totalPrice), 0);
  return total >= totalItens;
};

module.exports = {
  validPriceDemand,
};
