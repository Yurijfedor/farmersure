import { calculateTotalValue } from "../../helpers/calculateTotalValue";
import { calculateMaxPerformance } from "../../helpers/calculateMaxPerformance";

export const PerformanceScale = ({ prices, performance, power }) => {
  const totalValue = calculateTotalValue(prices, performance); // Отримуємо загальну вартість продукції
  const maxPerformance = calculateMaxPerformance(power);

  // Визначаємо ширину шкали залежно від нормалізованого значення
  const scaleWidth = Math.min(100, (totalValue / maxPerformance) * 100) + "%"; // Ділимо на менший коефіцієнт

  return (
    <div>
      {/* Шкала продуктивності */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Вартість продукції: ${totalValue}
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
