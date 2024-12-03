import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const COLORS = ["#3b82f6", "#5CC8BE"];
const MainPieChart = ({ orderCancelData }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={orderCancelData}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelPosition="outside"
          >
            {orderCancelData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainPieChart;
