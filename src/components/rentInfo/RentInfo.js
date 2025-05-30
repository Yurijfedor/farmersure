import {
  calculateHiveRent,
  calculateBeeColonyRent,
} from "../../helpers/calculateRent";

export const RentInfo = ({ hiveComponents, power, totalRent }) => {
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
          )}$\n- Оренда бджолосімї: ${calculateBeeColonyRent(power)}$`}
        >
          {totalRent} $/міс
        </span>
      </h4>
    </div>
  );
};
