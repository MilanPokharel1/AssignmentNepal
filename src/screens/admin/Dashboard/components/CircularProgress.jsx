import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const CircularProgress = ({ value, title }) => {
  const data = [
    { name: "completed", value: parseInt(value) },
    { name: "remaining", value: 100.0 - value },
  ];
  console.log(data)

  return (
    <div className="w-full h-full flex items-center bg-white justify-center">
      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <h2 className="items-center text-center text-gray-500 mb-5">{title}</h2>
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
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  fill: "#374151", // Optional: Adjust label color
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CircularProgress;
