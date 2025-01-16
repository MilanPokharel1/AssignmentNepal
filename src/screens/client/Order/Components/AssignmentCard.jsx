import React, { useState } from "react";
import PaymentPopup from "./ClientPaymentPopup";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../../../assets/writer.png";
import { UseTheme } from "../../../../contexts/ThemeContext/useTheme";
const AssignmentCard = ({
  _id,
  assignmentTitle,
  instagramTitle,
  description,
  status,
  totalAmount,
  paidAmount = 400,
  payments,
  deadline,
  writerName = "Not Assigned",
  writerPic = profileIcon,
  writerId = "",
}) => {
  const navigate = useNavigate();
  paidAmount = payments[0].paidAmount;
  const { currentTheme, themes } = UseTheme();
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
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
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
    ongoing: `${themes[currentTheme].ongoingStatus}`,
    submitted: `${themes[currentTheme].submittedStatus}`,
    completed: `${themes[currentTheme].completedStatus}`,
    pending: `${themes[currentTheme].pendingStatus}`,
    approved: `${themes[currentTheme].approvedStatus}`,
    cancelled: `${themes[currentTheme].cancelledStatus}`,
  };

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handlePay = () => {
    setShowPaymentPopup(true);
  };

  const progressClasses = getProgressClasses();
  const maskWriterName = (name) => {
    if (name === "Not Assigned") {
      return name;
    }
    if (!name || name.length <= 4) {
      return "*".repeat(name.length);
    }
    const start = name.slice(0, 2); // First two letters
    const end = name.slice(-2); // Last two letters
    const maskedPart = "*".repeat(name.length - 4); // Mask all other characters
    return `${start}${maskedPart}${end}`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full lg:w-[40%] sm:max-lg:w-full drop-shadow-2x2">
      {/* assignmentTitle and Status */}
      <div className="mb-4 flex justify-between items-start">
        <div className="flex items-start">
          <div className="text-sm font-medium text-gray-700 flex-shrink-0">
            Assignment title:
          </div>
          <span className="text-gray-900 ml-2 w-72 line-clamp-2 overflow-hidden text-ellipsis">
            {assignmentTitle}
          </span>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm capitalize ${
            statusColors[status.toLowerCase()]
          }`}
        >
          {status}
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

      {/* Writer Info */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <img
            src={writerPic}
            alt={writerPic}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-900">
              {maskWriterName(writerName)}
            </span>
            <span className="text-xs text-gray-500">writer</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-sm text-white bg-[${themes[currentTheme].view}] hover:${themes[currentTheme].viewHover} rounded-md transition-colors`}
            onClick={handleView}
          >
            View
          </button>
          <button
            className={`px-3 py-1 text-sm text-white bg-[${themes[currentTheme].pay}] hover:bg-[${themes[currentTheme].payHover}] rounded-md transition-colors`}
            onClick={handlePay}
          >
            Pay
          </button>
        </div>
      </div>
      {showPaymentPopup && (
        <PaymentPopup
          onClose={() => setShowPaymentPopup(false)}
          assignment={{
            _id,
            instagramTitle,
            assignmentTitle,
            description,
            status,
            totalAmount,
            paidAmount,
            deadline,
          }}
        />
      )}
    </div>
  );
};

// instagramTitle,
//     assignmentTitle,
//     paidAmount,
//     paymentCurrency,
//     remark,
//     orderId,
//     imagePath

export default AssignmentCard;
