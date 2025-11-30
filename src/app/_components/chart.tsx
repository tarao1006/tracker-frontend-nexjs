"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type Props = {
  data: { date: string; value: number }[];
};

export const ValuationChart = ({ data }: Props) => {
  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618 }}
      data={data}
      margin={{
        top: 20,
        right: 40,
        bottom: 40,
        left: 40,
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
      <XAxis dataKey="date" label={{ value: "日付", position: "bottom" }} />
      <YAxis
        width="auto"
        label={{ value: "評価額", position: "insideLeft", angle: -90 }}
        tickFormatter={(value) => `${(value / 10000).toLocaleString()}万円`}
      />
    </LineChart>
  );
};
