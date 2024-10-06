export const calculatePerformance = (
  hive,
  additionalServices,
  agreeWithBasicTech
) => {
  const { power } = hive; // Сила сім'ї
  const { pollen, propolis, wax, royalJelly, droneHomogenate, beeVenom } =
    additionalServices; // Додаткові послуги

  // Мед
  let honey = 0;
  if (agreeWithBasicTech) {
    if (power >= 9) honey = 15;
    else if (power === 8) honey = 12;
    else if (power === 7) honey = 11;
    else if (power === 6) honey = 10;
    else if (power === 5) honey = 9;
  }

  // Пилок
  let pollenAmount = 0;
  if (pollen) {
    if (power >= 9) pollenAmount = 1;
    else if (power === 8) pollenAmount = 0.9;
    else if (power === 7) pollenAmount = 0.8;
    else if (power === 6) pollenAmount = 0.6;
    else if (power === 5) pollenAmount = 0.5;
  }

  // Прополіс
  let propolisAmount = 0;
  if (propolis) {
    if (power >= 9) propolisAmount = 0.1;
    else if (power === 8) propolisAmount = 0.08;
    else if (power === 7) propolisAmount = 0.07;
    else if (power === 6) propolisAmount = 0.06;
    else if (power === 5) propolisAmount = 0.05;
  }

  // Віск
  let waxAmount = 0;
  if (wax) {
    if (power >= 9) waxAmount = 0.35;
    else if (power === 8) waxAmount = 0.25;
    else if (power === 7) waxAmount = 0.2;
    else if (power === 6) waxAmount = 0.15;
    else if (power === 5) waxAmount = 0.1;
  }

  // Маточне молочко
  let royalJellyAmount = 0;
  if (royalJelly) {
    if (power >= 9) royalJellyAmount = 0.1;
    else if (power === 8) royalJellyAmount = 0.08;
    else if (power === 7) royalJellyAmount = 0.05;
    else if (power === 6) royalJellyAmount = 0.03;
    else if (power === 5) royalJellyAmount = 0.02;
  }

  // Трутневий гомогенат
  let droneHomogenateAmount = 0;
  if (droneHomogenate) {
    if (power >= 9) droneHomogenateAmount = 0.15;
    else if (power === 8) droneHomogenateAmount = 0.1;
    else if (power === 7) droneHomogenateAmount = 0.08;
    else if (power === 6) droneHomogenateAmount = 0.06;
    else if (power === 5) droneHomogenateAmount = 0.05;
  }

  // Бджолина отрута
  let beeVenomAmount = 0;
  if (beeVenom) {
    if (power >= 9) beeVenomAmount = 0.002;
    else if (power === 8) beeVenomAmount = 0.0015;
    else if (power === 7) beeVenomAmount = 0.001;
    else if (power === 6) beeVenomAmount = 0.0008;
    else if (power === 5) beeVenomAmount = 0.0005;
  }

  return {
    honey,
    pollenAmount,
    propolisAmount,
    waxAmount,
    royalJellyAmount,
    droneHomogenateAmount,
    beeVenomAmount,
  };
};
