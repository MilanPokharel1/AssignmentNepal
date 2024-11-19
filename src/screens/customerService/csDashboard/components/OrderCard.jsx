import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const OrderCard = ({
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
  const calculatePercentage = (totalAmount, paidAmount) => {
    const total = parseFloat(totalAmount);
    const paid = parseFloat(paidAmount);

    if (isNaN(total) || isNaN(paid) || total === 0) {
      return 0;
    }

    const percentage = (paid / total) * 100;
    return percentage.toFixed(0);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };
  const percentage = calculatePercentage(totalAmount, paidAmount);

  // Function to determine progress bar and text classes based on percentage
  const getProgressClasses = () => {
    if (parseInt(percentage) < 50) {
      return {
        bar: "bg-red-500",
        text: "text-red-500",
      };
    } else if (parseInt(percentage) < 80) {
      return {
        bar: "bg-orange-500",
        text: "text-orange-500",
      };
    } else {
      return {
        bar: "bg-green-500",
        text: "text-green-500",
      };
    }
  };

  // Status styling
  const statusColors = {
    ongoing: "bg-yellow-200 text-yellow-600",
    submitted: "bg-purple-200 text-purple-600",
    completed: "bg-green-100 text-green-600",
    pending: "bg-orange-100 text-orange-600",
    approved: "bg-gray-300 text-gray-600",
  };

  const progressClasses = getProgressClasses();

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full lg:w-[40%] sm:max-lg:w-full drop-shadow-2x2">
      {/* assignmentTitle and Status */}
      <div className="flex justify-between items-center mt-4 border-b-2 pb-3 mb-2">
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
            <span className="text-sm text-gray-500">writer</span>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm capitalize ${
            statusColors[status.toLowerCase()]
          }`}
        >
          {status}
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
            Total Amount: <span className="font-medium">{totalAmount}</span>
          </div>
          <div className="text-sm text-gray-600">
            Paid Amount: <span className="font-medium">{paidAmount}</span>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="relative flex items-center pt-2 mb-4">
          <div className="text-sm block text-gray-600 mr-2">Payment(%):</div>
          <div className="w-full bg-gray-200 rounded-full h-2 align-middle items-center">
            <div
              className={`${progressClasses.bar} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span
            className={`absolute right-0 -top-4 text-sm ${progressClasses.text}`}
          >
            {percentage}%
          </span>
        </div>
      </div>
      {/* Writer Info */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-200 
                   hover:bg-emerald-700 hover:text-white rounded-md transition-all duration-200 
                   border-2 border-emerald-700"
            onClick={() => console.log("Approved")}
          >
            Approve
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
        <div>
          <button className="px-3 py-1 text-sm text-white bg-[#9E9FEE] hover:bg-purple-400 rounded-md transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
