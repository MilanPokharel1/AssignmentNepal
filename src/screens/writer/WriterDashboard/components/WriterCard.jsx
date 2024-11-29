import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const WriterCard = ({
  _id,
  assignmentTitle,
  description,
  status,
  totalAmount,
  paidAmount = 400,
  payments,
  deadline,
  writerName = "Not Assigned",
  writerPic = "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
  writerId = "",
}) => {
  const navigate = useNavigate();
  paidAmount = payments[0].paidAmount;

  const handleView = () => {
    navigate(`/client/orders/view/${_id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full lg:w-[40%] sm:max-lg:w-full drop-shadow-2x2">
      {/* assignmentTitle and Status */}
      <div className="flex justify-between items-center mt-4 border-b-2 pb-5 mb-2">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            alt={writerPic}
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900">
              {writerName}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b-2 mb-2">
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <div className="text-sm font-medium text-gray-700 flex-shrink-0">
              Assignment title:
            </div>
            <span className="text-gray-900 ml-2 truncate w-72 inline-block overflow-hidden whitespace-nowrap text-ellipsis">
              {assignmentTitle}
            </span>
          </div>
        </div>

        <span className="text-xs text-red-500">Due {formatDate(deadline)}</span>
        {/* Payment Info */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">
            Amount: <span className="font-medium">{totalAmount}</span>
          </div>
        </div>
      </div>
      {/* Writer Info */}
      <div className="flex justify-between items-center">
        {status === "Pending" ? (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-200 
                   hover:bg-emerald-700 hover:text-white rounded-md transition-all duration-200 
                   border-2 border-emerald-700"
              onClick={() => console.log("Approved")}
            >
              Accept
            </button>
            <button
              className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-200
                   hover:bg-red-700 hover:text-white rounded-md transition-all duration-200
                   border-2 border-red-700"
              onClick={() => console.log("Declined")}
            >
              Decline
            </button>
          </div>
        ) : (
          <span className="text-sm font-light">
            Already Assigned
          </span>
        )}
        <div>
          <button
            className={`px-3 py-1 text-sm text-white bg-[#9E9FEE] rounded-md transition-colors ${
              status === "Pending"
                ? "hover:bg-purple-400"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={status !== "Pending"}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriterCard;
