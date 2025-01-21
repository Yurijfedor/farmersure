import { productPrices } from "../constants/prices";

export const calculateMaxPerformance = (power, product) => {
  const performanceMap = {
    honey: 0,
    pollen: 0,
    propolis: 0,
    wax: 0,
    royalJelly: 0,
    droneHomogenate: 0,
    beeVenom: 0,
  };

  if (power >= 9) {
    Object.assign(performanceMap, {
      honey: 15,
      pollen: 1,
      propolis: 0.1,
      wax: 0.35,
      royalJelly: 0.1,
      droneHomogenate: 0.15,
      beeVenom: 0.002,
    });
  } else if (power === 8) {
    Object.assign(performanceMap, {
      honey: 12,
      pollen: 0.9,
      propolis: 0.08,
      wax: 0.25,
      royalJelly: 0.08,
      droneHomogenate: 0.1,
      beeVenom: 0.0015,
    });
  } else if (power === 7) {
    Object.assign(performanceMap, {
      honey: 11,
      pollen: 0.8,
      propolis: 0.07,
      wax: 0.2,
      royalJelly: 0.05,
      droneHomogenate: 0.08,
      beeVenom: 0.001,
    });
  } else if (power === 6) {
    Object.assign(performanceMap, {
      honey: 10,
      pollen: 0.6,
      propolis: 0.06,
      wax: 0.15,
      royalJelly: 0.03,
      droneHomogenate: 0.06,
      beeVenom: 0.0008,
    });
  } else if (power === 5) {
    Object.assign(performanceMap, {
      honey: 9,
      pollen: 0.5,
      propolis: 0.05,
      wax: 0.1,
      royalJelly: 0.02,
      droneHomogenate: 0.05,
      beeVenom: 0.0005,
    });
  }

  if (product !== "") {
    // Якщо переданий конкретний продукт, повертаємо тільки його вартість
    const productAmount = performanceMap[product];
    return productAmount * productPrices[product];
  }

  // Якщо продукт не вказаний, повертаємо загальну вартість
  const maxAmount = Object.entries(performanceMap).reduce(
    (acc, [key, value]) => acc + value * (productPrices[key] || 0),
    0
  );

  return maxAmount.toFixed(2);
};
