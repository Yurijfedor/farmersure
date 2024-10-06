export const calculateTotalValue = (prices, calculatePerformance) => {
  const {
    honey,
    pollenAmount,
    propolisAmount,
    waxAmount,
    royalJellyAmount,
    droneHomogenateAmount,
    beeVenomAmount,
  } = calculatePerformance;

  // Розрахунок загальної вартості продукції
  const totalValue =
    honey * prices.honey +
    pollenAmount * prices.pollen +
    propolisAmount * prices.propolis +
    waxAmount * prices.wax +
    royalJellyAmount * prices.royalJelly +
    droneHomogenateAmount * prices.droneHomogenate +
    beeVenomAmount * prices.beeVenom;

  return totalValue.toFixed(2); // Округлюємо до двох знаків після коми
};
