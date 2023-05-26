import { Button } from "../components/button/Button";
import { Title } from "../components/title/Title";
import { HivesList } from "../components/hivesList/HivesList";
import { BeeLineChart } from "../components/beeCharts/BeeLineChart";
import { BeeBarChart } from "../components/beeCharts/BeeBarCharts";
import { Chart } from "../components/beeCharts/PercentCharts";
import { BeeComposedChart } from "../components/beeCharts/ComposedChart";
import { data1 } from "../data";
import { data } from "../data";

import { ButtonContainer } from "./Rent.styled";

const Rent = () => {
  return (
    <>
      <Title text={"rent of beehives"} />
      <ButtonContainer>
        <Button
          children={"All hives"}
          variant="filterBtn"
          onClick={() => console.log("all hives")}
        />
        <Button
          children={"Available for rent"}
          variant="filterBtn"
          onClick={() => console.log("Available for rent")}
        />
        <Button
          children={"In my lease"}
          variant="filterBtn"
          onClick={() => console.log("In my lease")}
        />
        <Button
          children={"Liked"}
          variant="filterBtn"
          onClick={() => console.log("Liked")}
        />
      </ButtonContainer>
      <HivesList />
      <BeeLineChart />
      <BeeBarChart />
      <Chart data={data1} />
      <BeeComposedChart data={data} />
    </>
  );
};

export default Rent;
