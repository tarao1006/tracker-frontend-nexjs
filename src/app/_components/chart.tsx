"use client";

import { CartesianGrid, Line, LineChart, YAxis } from "recharts";

type Props = {
  data: { date: string; value: number }[];
};

export const ValuationChart = ({ data }: Props) => {
  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618 }}
      data={data}
      margin={{
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="value"
        stroke="black"
        strokeWidth={3}
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
      <YAxis domain={[(min) => min * 0.98, (max) => max * 1.02]} hide />
    </LineChart>
  );
};
