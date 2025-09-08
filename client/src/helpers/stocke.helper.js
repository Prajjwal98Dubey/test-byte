export const getUpdatedStockValue = (data, symbol) => {
  return data.filter((d) => d.symbol.toLowerCase() == symbol.toLowerCase())[0]
    .cmp;
};
