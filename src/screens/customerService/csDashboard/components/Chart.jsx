import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />

        <Tooltip />

        <Legend verticalAlign="top" height={36} />

        <Line
          type="monotone"
          dataKey="thisMonth"
          name="This Month" // Custom label for the legend
          stroke="#10B981"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="lastMonth"
          name="Last Month" // Custom label for the legend
          stroke="#EF4444"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
