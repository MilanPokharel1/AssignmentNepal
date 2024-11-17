import React from "react";

const Card = ({ Icon, heading, number, theme }) => {
  return (
    <div
      className={`flex items-center ${theme.bgColor} p-4 rounded-lg shadow-md  h-32 w-[30%] min-w-[220px]`}
    >
      {/* Icon with background */}
      <div className={`${theme.iconBgColor} p-2 rounded-full`}>
        <Icon className="text-white SideNavHide:text-2xl text-xl" />
      </div>
      {/* Text content */}
      <div className="ml-4">
        <p className="SideNavHide:text-lg  text-gray-600 font-medium">
          {heading}
        </p>
        <p className="SideNavHide:text-xl text-lg font-bold">{number}</p>
      </div>
    </div>
  );
};

export default Card;
