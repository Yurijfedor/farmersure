import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { data } from "../../data";

export const BeeBarChart = () => {
  return (
    <BarChart width={900} height={400} data={data} margin={{ bottom: 40 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="honey" fill="#8884d8" name="Мед" />
      <Bar dataKey="pollen" fill="#82ca9d" name="Пилок" />
      <Bar dataKey="propolis" fill="#ffc658" name="Прополіс" />
      <Bar dataKey="wax" fill="#ff7f50" name="Віск" />
      <Bar dataKey="royalJelly" fill="#d8bba2" name="Маточне молочко" />
      <Bar dataKey="beeBread" fill="#bada55" name="Бджолиний хліб" />
      <Bar dataKey="venom" fill="#ff0000" name="Бджолина отрута" />
    </BarChart>
  );
};
