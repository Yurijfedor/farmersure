import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Chart = ({ data }) => {
  const chartData = data.map((obj, index) => {
    const property = Object.keys(obj)[0];
    const nestedObj = obj[property];
    const percentageDifference = {};

    for (const key in nestedObj) {
      if (nestedObj.hasOwnProperty(key)) {
        const currentValue = nestedObj[key];
        const previousValue =
          index > 0 ? Object.values(data[index - 1])[0]?.[key] || 0 : 0;

        const percentDifference =
          previousValue !== 0 && currentValue !== 0
            ? ((currentValue - previousValue) / previousValue) * 100
            : 0;

        percentageDifference[key] = percentDifference.toFixed(2);
      }
    }

    return {
      name: property,
      ...percentageDifference,
    };
  });
  const propertyKeys = Object.keys(chartData[0]).filter(
    (key) => key !== "name"
  );

  return (
    <LineChart width={900} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      {propertyKeys.map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        />
      ))}
    </LineChart>
  );
};
