import React from "react";

const WithdrawalCard = ({ item }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };
  const { date, time, status, remark, amount } = item; // Destructure from `item`

  return (
    <div className="bg-white rounded-lg py-6 px-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border border-gray-200 w-full md:w-[82%]">
      {/* Date */}
      <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
        <div>Date</div>
        <div className="font-medium text-black">{formatDate(date)}</div>
      </div>

      {/* Time */}
      <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
        <div>Time</div>
        <div className="font-medium text-black">{time}</div>
      </div>

      {/* Status */}
      <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
        <div>Status</div>
        <div
          className={`font-medium ${
            status.toLowerCase() === "approved"
              ? "text-[#00b087]"
              : "text-red-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize */}
        </div>
      </div>

      {/* Approved By */}
      <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
        <div>Remark</div>
        <div className="font-medium text-black">{remark}</div>
      </div>

      {/* Amount */}
      <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center">
        <div>Amount</div>
        <div className="font-semibold text-[#00b087]">{amount}</div>
      </div>
    </div>
  );
};

export default WithdrawalCard;
