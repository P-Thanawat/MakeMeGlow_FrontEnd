export const formatePrice = (price) =>
  new Intl.NumberFormat('us-Us', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(price);
