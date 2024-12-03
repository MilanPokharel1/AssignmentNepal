import React from "react";

const WithdrawalCard = ({ item }) => {
  const { date, time, status, writerName, writerEmail, amount } = item; // Destructure from `item`

  return (
    <div className="bg-white rounded-lg py-6 px-6 mb-4 border  border-gray-200 md:w-[82%]">
      <div className=" flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        {/* Date */}
        <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
          <div>Date</div>
          <div className="font-medium text-black">{date}</div>
        </div>
        <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
          <div>Requested by:</div>
          <div className="font-medium text-black">{writerName}</div>
        </div>
        <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
          <div>Email:</div>
          <div className="font-medium text-black">{writerEmail}</div>
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
            {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
            {/* Capitalize */}
          </div>
        </div>

        {/* Amount */}
        <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center">
          <div>Amount</div>
          <div className="font-semibold text-[#00b087]">{amount}</div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-7">
        {status === "pending" && (
          <>
            <button className="px-3 py-1 text-sm text-emerald-600 bg-emerald-200 
                           hover:bg-emerald-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-emerald-400">
              Approve
            </button>
            <button className="px-3 py-1 text-sm text-red-600 bg-red-200 
                           hover:bg-red-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-red-400">
              Decline
            </button>
          </>
        )}

        {status === "approved" && (
          <button
            className="border border-gray-500 bg-blue-500 px-2 py-1 text-white rounded-lg cursor-not-allowed opacity-50"
            disabled
          >
            Approved
          </button>
        )}

        {status === "declined" && (
          <button
            className="border border-gray-500 bg-blue-500 px-2 py-1 text-white rounded-lg cursor-not-allowed opacity-50"
            disabled
          >
            Declined
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawalCard;
