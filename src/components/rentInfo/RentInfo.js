import {
  calculateHiveRent,
  calculateBeeColonyRent,
  calculateTotalRent,
} from "../../helpers/calculateRent";

export const RentInfo = ({ hiveComponents, power }) => {
  const totalRent = calculateTotalRent(hiveComponents, power);

  return (
    <div>
      <h4>
        Вартість оренди вулика з бджолосім'єю на{" "}
        <span>{new Date().toLocaleString("uk-UA", { month: "long" })}</span>{" "}
        місяць:{" "}
        <span
          style={{ position: "relative", cursor: "pointer" }}
          title={`Деталі розрахунку:\n- Оренда вулика: ${calculateHiveRent(
            hiveComponents
          ).toFixed(2)}$\n- Оренда бджолосімї: ${calculateBeeColonyRent(
            power
          ).toFixed(2)}$`}
        >
          {totalRent.toFixed(2)} $/міс
        </span>
      </h4>
    </div>
  );
};
