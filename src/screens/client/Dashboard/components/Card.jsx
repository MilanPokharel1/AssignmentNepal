import React from "react";

const Card = ({ Icon, heading, number, theme }) => {
  return (
    <div
      className={`flex items-center ${theme.bgColor} p-4 rounded-lg w-[24%] shadow-md h-36`}
    >
      {/* Icon with background */}
      <div className={`${theme.iconBgColor} p-2 rounded-full`}>
        <Icon className="text-white text-4xl" />
      </div>
      {/* Text content */}
      <div className="ml-4">
        <p className="text-xl text-gray-600 font-medium">{heading}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default Card;
