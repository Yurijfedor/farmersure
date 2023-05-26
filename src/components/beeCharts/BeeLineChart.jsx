import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Label,
} from "recharts";

import { data } from "../../data";

import beePng from "../../images/bee1.png";
import pollen from "../../images/pollen.png";
import propolis from "../../images/propolis.png";
import royalJelly from "../../images/royalJelly.png";
import beeBread from "../../images/beeBread.png";
import beevenom from "../../images/venom.png";
import beeWax from "../../images/wax.png";

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

export const BeeLineChart = () => {
  return (
    <>
      <LineChart
        width={900}
        height={600}
        data={data}
        margin={{ top: 30, bottom: 20, right: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
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
      </LineChart>
    </>
  );
};
