import { hiveComponentPrices, frameWithBeesPrices } from "../constants/prices";

export const calculateHiveRent = (hiveComponents) => {
  const totalComponentCost = Object.entries(hiveComponents).reduce(
    (total, [component, quantity]) => {
      const componentPrice = hiveComponentPrices[component] || 0; // Use price from prices.js
      return total + componentPrice * quantity;
    },
    0
  );
  const yearlyCost = totalComponentCost / 7;
  const monthlyCost = yearlyCost / 12;

  return monthlyCost * 1.3;
};

export const calculateBeeColonyRent = (hivePower) => {
  const totalFrameCost = hivePower * frameWithBeesPrices;

  const yearlyCost = totalFrameCost;
  const monthlyCost = yearlyCost / 12;

  return monthlyCost * 1.3;
};

export const calculateTotalRent = (hiveConfig, hivePower) => {
  const hiveRent = calculateHiveRent(hiveConfig);
  const beeColonyRent = calculateBeeColonyRent(hivePower);

  return hiveRent + beeColonyRent;
};
