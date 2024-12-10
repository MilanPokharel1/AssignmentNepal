import React, { useState, useEffect } from "react";
import { withdrawal_status } from "../../../../api/Api";

const WithdrawalCard = ({ item }) => {
  const { date, time, status, _id, firstName, lastName, email, amount } = item;
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = async (newStatus) => {
    console.log("New: ", newStatus);
    console.log("Current: ", currentStatus);
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      console.log(newStatus);
      const response = await fetch(withdrawal_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: _id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);
      setCurrentStatus(data.assignment.status); // Update the local status state
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };
  // const { date, time, status, _id, firstName, lastName, email, amount } = item; // Destructure from `item`

  return (
    <div className="bg-white rounded-lg py-6 px-6 mb-4 border  border-gray-200 md:w-[82%]">
      <div className=" flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Date:</span>
            <span className="font-medium text-black">{formatDate(date)}</span>
          </div>
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Time:</span>
            <span className="font-medium text-black">{time}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Requested by:</span>
            <span className="font-medium text-black">
              {firstName} {lastName}
            </span>
          </div>
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Email:</span>
            <span className="font-medium text-black">{email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Balance:</span>
            <span className="font-medium text-[#00b087]">Rs{amount}</span>
          </div>
          <div className="text-gray-500 text-base flex gap-2 md:items-center mb-4 md:mb-0">
            <span>Status:</span>
            <span
              className={`font-medium ${
                currentStatus.toLowerCase() === "approved"
                  ? "text-[#7800b0]"
                  : "text-red-500"
              }`}
            >
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}{" "}
              {/* Capitalize */}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="text-gray-500 text-base flex flex-col justify-center items-start md:items-center">
          <div>Amount</div>
          <div className="font-semibold text-[#00b087]">Rs{amount}</div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-7">
        {currentStatus === "pending" && (
          <>
            <button
              onClick={() => handleStatusChange("approved")}
              className="px-3 py-1 text-sm text-emerald-600 bg-emerald-200 
                           hover:bg-emerald-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-emerald-400"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange("declined")}
              className="px-3 py-1 text-sm text-red-600 bg-red-200 
                           hover:bg-red-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-red-400"
            >
              Decline
            </button>
          </>
        )}

        {currentStatus === "approved" && (
          <button
            className="border border-gray-500 bg-blue-500 px-2 py-1 text-white rounded-lg cursor-not-allowed opacity-50"
            disabled
          >
            Approved
          </button>
        )}

        {currentStatus === "declined" && (
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
