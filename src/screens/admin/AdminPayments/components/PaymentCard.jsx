import React from "react";

const PaymentCard = ({
  title,
  date,
  method,
  currency,
  remarks,
  amount,
  name,
  cast
}) => {
  return (
    <div className="bg-white shadow-lg py-4 md:py-7 rounded-lg mb-4 w-full px-4 md:px-7">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
        {/* First Column */}
        <div className="flex flex-col mb-3 md:mb-0">
          <div className="flex items-center md:text-right text-gray-400">
            Client Name:&nbsp;
            <span className="font-thin text-black">{name}{" "}{cast}</span>
          </div>
          <div className="flex items-center text-md">
            <span className="text-gray-400">Assignment Title: </span>
            <span className="w-48 inline-block overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Date: </span>
            <span>{date}</span>
            <span className="mx-6 text-gray-500">
              Payment Method:<span className="text-black">{method}</span>{" "}
            </span>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col mb-3 md:mb-0">
          <div>
            <span className="font-medium text-gray-500">Currency: </span>
            <span>{currency}</span>
            <div>
              <span className="font-medium text-gray-500">Remarks: </span>
              <span>{remarks}</span>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex items-center md:text-right">
          Amount:&nbsp;
          <span className="text-[#00b087] font-semibold">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
