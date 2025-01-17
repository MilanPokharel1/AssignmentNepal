import React from "react";
import { UseTheme } from "../../../../contexts/ThemeContext/useTheme";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-GB",
    options
  ); // en-GB gives day-month-year order
  return formattedDate.replace(",", ""); // Remove any commas if present
};

const PaymentCard = ({
  title,
  createdAt,
  method,
  currency,
  remarks,
  paymentStatus,
  amount,
}) => {
  const { currentTheme, themes } = UseTheme();
  const amountTextColor =
    paymentStatus === "pending"
      ? "text-orange-400"
      : paymentStatus === "declined"
      ? "text-red-400"
      : "text-green-500";

  return (
    <div className="bg-white shadow-lg py-4 md:py-6 rounded-lg mb-4 w-full px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,0.75fr,0.75fr] gap-4 w-full items-start md:items-center">
        {/* First Column */}
        <div className="flex flex-col">
          <div className="flex items-center text-md">
            <span className="text-gray-400">Assignment Title: </span>
            <span className="w-48 inline-block overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-500">Date: </span>
            <span>{formatDate(createdAt)}</span>
            <span className="mx-4 text-gray-500">
              Payment Method: <span className="text-black">{method}</span>
            </span>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col">
          <div>
            <span className="font-medium text-gray-500">Currency: </span>
            <span>{currency}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-500">Remarks: </span>
            <span>{remarks}</span>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col">
          <div>
            <span className="font-medium text-gray-500">Status: </span>
            <span className={ `${amountTextColor} font-semibold`}>{paymentStatus}</span>
          </div>
        </div>

        {/* Fourth Column */}
        <div className="flex items-center justify-end md:text-right">
          <span className="font-medium text-gray-500">Amount: </span>&nbsp;
          <span
            className={`text-[${themes[currentTheme].amountTextColor}] font-semibold`}
          >
            {amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
