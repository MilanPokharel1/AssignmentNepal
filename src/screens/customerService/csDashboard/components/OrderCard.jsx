import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { order_status } from "../../../../api/Api";
import { UseTheme } from "../../../../contexts/ThemeContext/useTheme";
import CircularProgress from "@material-ui/core/CircularProgress";

const OrderCard = ({
  _id,
  assignmentTitle,
  description,
  instagramTitle,
  status,
  totalAmount,
  payments,
  deadline,
  writerName = "Not Assigned",
  writerPic = "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
  writerId = "",
}) => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showNotice, setShowNotice] = useState(false)
  const [showNotice2, setShowNotice2] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const { currentTheme, themes } = UseTheme();
  const handleView = () => {
    navigate(`/cs/OrderManagement/OrderView/${_id}`);
  };
  const paidAmount = payments.reduce((total, payment) => {
    return total + (payment.paidAmount || 0); // Add paidAmount, default to 0 if undefined
  }, 0);
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

  const handleStatusChange = async (newStatus) => {
    // console.log("New: ", newStatus);
    // console.log("Current: ", currentStatus);
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token"); // Replace with the actual token
      // console.log(newStatus);
      const response = await fetch(order_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: _id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      // console.log("Status updated successfully:", data);
      if (newStatus === "cancelled" || newStatus === "ongoing") {
        setShowNotice2(true)
      } else {
        setShowNotice(true)
      }
      setCurrentStatus(data.assignment.status); // Update the local status state
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      setTimeout(() => {
        setShowNotice2(false)
        setShowNotice(false)
        setIsLoading(false)
      }, 2000)
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

  const progressClasses = getProgressClasses();

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full lg:w-[40%] sm:max-lg:w-full drop-shadow-2x2">
      {/* assignmentTitle and Status */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      {showNotice && (
        <div
          className="z-50 fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded transform transition-all duration-500 ease-in-out"
        >
          ✔ Order Accepted Successfully!
        </div>
      )}
      {showNotice2 && (
        <div
          className="z-50 fixed top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded transform transition-all duration-500 ease-in-out"
        >
          ✔ Order Request Declined!
        </div>
      )}
      <div className="flex justify-between items-center mt-4 border-b-2 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            alt={writerPic}
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900">
              {instagramTitle}
            </span>
            <span className="text-sm text-gray-500">writer: {writerName}</span>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm capitalize ${statusColors[currentStatus.toLowerCase()]
            }`}
        >
          {currentStatus}
        </div>
      </div>
      <div className="border-b-2 mb-2">
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <div className="text-sm font-medium text-gray-700 flex-shrink-0">
              Assignment title:
            </div>
            <span className="text-gray-900 ml-2 w-96  line-clamp-2 overflow-hidden text-ellipsis">
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
          {/* Conditional Rendering for Buttons */}
          {currentStatus === "pending" || currentStatus === "submitted" ? (
            <>
              <button
                className={`px-3 py-1 text-sm ${themes[currentTheme].btnStatusText} ${themes[currentTheme].btnStatus}
                           hover:${themes[currentTheme].btnStatusHover} hover:text-white rounded-md transition-all duration-200 
                           border-2 ${themes[currentTheme].btnStatusborder}`}
                onClick={() =>
                  handleStatusChange(
                    currentStatus === "pending" ? "approved" : "completed"
                  )
                }
              >
                {currentStatus === "pending" ? "Approve" : "Complete"}
              </button>
              <button
                className="px-3 py-1 text-sm text-red-600 bg-red-200 
                           hover:bg-red-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-red-400"
                onClick={() =>
                  handleStatusChange(
                    currentStatus === "submitted" ? "ongoing" : "cancelled"
                  )
                }
              >
                Decline
              </button>
            </>
          ) : currentStatus === "approved" || currentStatus === "completed" ? (
            <button
              className="px-3 py-1 text-sm text-gray-400 bg-gray-200 
                         rounded-md border-2 border-gray-300 cursor-not-allowed"
              disabled
            >
              Approved
            </button>
          ) : currentStatus === "cancelled" ? (
            <span
              className="px-3 py-1 text-sm text-white bg-red-500 
                         rounded-md border-2 border-red-400 cursor-not-allowed"
            >
              Cancelled
            </span>
          ) : null}
        </div>
        <div>
          <button
            onClick={handleView}
            className={`px-3 py-1 text-sm text-white bg-[${themes[currentTheme].view}] hover:${themes[currentTheme].viewHover} rounded-md transition-colors`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
