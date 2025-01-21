export const calculateTotalValue = (
  prices,
  calculatePerformance,
  product,
  productAmount
) => {
  if (product && productAmount) {
    // Якщо переданий конкретний продукт, повертаємо тільки його вартість
    const value = productAmount * prices[product];
    console.log(value);

    return value;
  }
  const totalValue = Object.entries(calculatePerformance).reduce(
    (acc, [key, value]) => {
      if (value && prices[key]) {
        return acc + value * prices[key];
      }
      return acc;
    },
    0
  );

  return totalValue.toFixed(2); // Округлюємо до двох знаків після коми
};
