import { calculateTotalValue } from "../../helpers/calculateTotalValue";
import { calculateMaxPerformance } from "../../helpers/calculateMaxPerformance";
import { calculatePerformance } from "../../helpers/calculatePerformance";
import { productPrices } from "../../constants/prices";

export const PerformanceScale = ({ hive, product = "" }) => {
  const performance = calculatePerformance(hive);
  const productExists =
    product && productPrices[product] && hive.productivity?.[product];
  console.log(productExists);

  const totalValue = calculateTotalValue(
    productPrices,
    performance,
    product,
    hive.productivity[product]
  ); // Отримуємо загальну вартість продукції

  const maxPerformance = calculateMaxPerformance(hive.power, product);

  // Визначаємо ширину шкали залежно від нормалізованого значення
  const scaleWidth = Math.min(100, (totalValue / maxPerformance) * 100) + "%"; // Ділимо на менший коефіцієнт

  return (
    <div>
      {/* Шкала продуктивності */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          {product !== ""
            ? `${product}: $${
                hive.productivity[product] * productPrices[product]
              } (${hive.productivity[product]} kg)`
            : `Вартість продукції: $${totalValue}`}
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            height: "20px",
            position: "relative",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: scaleWidth,
              backgroundColor: "green",
              height: "100%",
              borderRadius: "5px",
              transition: "width 0.5s ease", // Анімація зміни ширини
            }}
          ></div>

          {/* Проміжні поділки */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "20%",
              borderLeft: "1px solid black",
              height: "100%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "40%",
              borderLeft: "1px solid black",
              height: "100%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "60%",
              borderLeft: "1px solid black",
              height: "100%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "80%",
              borderLeft: "1px solid black",
              height: "100%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
