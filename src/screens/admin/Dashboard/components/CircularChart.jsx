import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const CircularChart = ({ value, title }) => {
  const data = [
    { name: "completed", value: parseInt(value) },
    { name: "remaining", value: 100.0 - value },
  ];
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      <h2 className="text-sm text-center text-gray-500">{title}</h2>
      <div className="w-full max-w-[200px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#e5e7eb" />
              <Label
                value={`${value}%`}
                position="center"
                className="text-base font-bold text-gray-700"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CircularChart;
