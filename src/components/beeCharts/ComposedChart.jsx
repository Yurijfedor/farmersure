import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Area,
} from "recharts";

import beePng from "../../images/bee1.png";

const CustomizedDot = ({ cx, cy, payload }) => {
  return (
    <g>
      <image
        xlinkHref={beePng}
        x={cx - 10}
        y={cy - 10}
        width={25}
        height={25}
      />
    </g>
  );
};

export const BeeComposedChart = ({ data }) => {
  const averageValue = data.map((entry) => {
    const values = Object.values(entry).slice(1);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  });
  return (
    <ComposedChart
      width={900}
      height={600}
      data={data}
      margin={{ top: 30, bottom: 20, right: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="honey" fill="#8884d8" />
      <Bar dataKey="pollen" fill="#82ca9d" />
      <Bar dataKey="propolis" fill="#ffc658" />
      <Bar dataKey="wax" fill="#ff7f50" />
      <Bar dataKey="royalJelly" fill="#d8bba2" />
      <Bar dataKey="beeBread" fill="#bada55" />
      <Bar dataKey="venom" fill="#ff0000" />
      <Area dataKey={averageValue} fill="#00BFFF" />
      <Line
        type="monotone"
        dataKey="honey"
        stroke="#FFD700"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="pollen"
        stroke="#FFA07A"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="propolis"
        stroke="#8B4513"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="wax"
        stroke="#FFFFF0"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="royalJelly"
        stroke="#B8860B"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="beeBread"
        stroke="#FFB6C1"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="venom"
        stroke="#7FFF00"
        activeDot={{ r: 8 }}
        dot={<CustomizedDot />}
      />
    </ComposedChart>
  );
};
