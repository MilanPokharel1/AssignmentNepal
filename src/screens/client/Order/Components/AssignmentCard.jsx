import React, { useState } from "react";
import PaymentPopup from "./ClientPaymentPopup";

const AssignmentCard = ({
  id,
  title,
  description,
  status = "Pending",
  totalAmount,
  paidAmount,
  dueDate,
  writer,
}) => {
  const calculatePercentage = (totalAmount, paidAmount) => {
    const total = parseFloat(totalAmount.replace(/[^0-9.-]+/g, ""));
    const paid = parseFloat(paidAmount.replace(/[^0-9.-]+/g, ""));

    if (isNaN(total) || isNaN(paid) || total === 0) {
      return 0;
    }

    const percentage = (paid / total) * 100;
    return percentage.toFixed(0);
  };

  const percentage = calculatePercentage(totalAmount, paidAmount);

  // Function to determine progress bar and text classes based on percentage
  const getProgressClasses = () => {
    if (parseInt(percentage) < 50) {
      return {
        bar: "bg-red-500",
        text: "text-red-500"
      };
    } else if (parseInt(percentage) < 80) {
      return {
        bar: "bg-orange-500",
        text: "text-orange-500"
      };
    } else {
      return {
        bar: "bg-green-500",
        text: "text-green-500"
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


  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handlePay = () => {
    setShowPaymentPopup(true);
  };


  const handleView = () => {
    console.log("view", id);
  };

  const progressClasses = getProgressClasses();

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-[40%] drop-shadow-2x2">
      {/* Title and Status */}
      <div className="mb-4 flex justify-between items-start">
        <div className="flex items-start">
          <div className="text-sm font-medium text-gray-700 flex-shrink-0">
            Assignment Title:
          </div>
          <span
            className="text-gray-900 ml-2 line-clamp-2 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </span>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm capitalize ${statusColors[status.toLowerCase()]
            }`}
        >
          {status}
        </div>
      </div>

      <span className="text-xs text-red-500">Due {dueDate}</span>
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
        <span className={`absolute right-0 -top-4 text-sm ${progressClasses.text}`}>
          {percentage}%
        </span>
      </div>

      {/* Writer Info */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <img
            src={writer.avatar}
            alt={writer.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-900">
              {writer.name}
            </span>
            <span className="text-xs text-gray-500">writer</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm text-white bg-[#9E9FEE] hover:bg-purple-400 rounded-md transition-colors"
            onClick={handleView}
          >
            View
          </button>
          <button
            className="px-3 py-1 text-sm text-white bg-[#5d5fef] hover:bg-[#4a4cef] rounded-md transition-colors"
            onClick={handlePay}
          >
            Pay
          </button>
        </div>
      </div>
      {showPaymentPopup && (
        <PaymentPopup
          onClose={() => setShowPaymentPopup(false)}
          assignment={{ id, title, description, status, totalAmount,paidAmount, dueDate }}
        />
      )}
    </div>
  );
};

export default AssignmentCard;