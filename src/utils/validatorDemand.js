const validPriceDemand = (demand) => {
  const { total, itens } = demand;
  var totalItens = 0.0;

  itens.forEach((element) => {
    totalItens += element.amount * element.totalPrice;
  });

  if (total < totalItens) return false;
  return true;
};

module.exports = {
  validPriceDemand,
};
