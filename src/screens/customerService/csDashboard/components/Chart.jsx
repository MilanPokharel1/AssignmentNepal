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
import { UseTheme } from "../../../../contexts/ThemeContext/useTheme";
const Chart = ({ chartData }) => {
  const { currentTheme, themes } = UseTheme();
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
          name="This Year" // Custom label for the legend
          stroke={`${themes[currentTheme].graph1}`}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="lastMonth"
          name="Last Year" // Custom label for the legend
          stroke={`${themes[currentTheme].graph2}`}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
