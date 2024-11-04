import React from "react";

const PaymentCard = ({ title, date, method, currency, remarks, amount }) => {
  return (
    <div className="bg-white shadow-lg py-7 rounded-lg mb-4 flex justify-between px-7">
      <div className="flex flex-col">
        <div className="flex items-center text-md ">
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
      <div className="flex flex-col">
        <div>
          <span className="font-medium text-gray-500">Currency: </span>
          <span>{currency}</span>
          <div>
            <span className="font-medium text-gray-500">Remarks: </span>
            <span>{remarks}</span>
          </div>
        </div>
      </div>
      <div className="text-right flex justify-center items-center">
        Amount: <span className="text-[#00b087] font-semibold ">{amount}</span>
      </div>
    </div>
  );
};

export default PaymentCard;
