import React, { useState } from "react";
import { FolderIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { all_file_status } from "../../../../api/Api";
const OrderCard = ({
  _id,
  assignmentTitle,
  status,
  files,
  totalAmount,
  paidAmount = 400,
  payments,
  deadline,
  writerName = "Not Assigned",
  writerPic = "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
  writerId = "",
}) => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("pending");
  paidAmount = payments[0].paidAmount;



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };
  const handleView = () => {
    navigate(`/cs/OrderManagement/OrderView/${_id}`);
  };

  const handleStatusChange = async (newStatus) => {
    console.log("New: ", newStatus)
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      console.log(newStatus);
      const response = await fetch(all_file_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: _id,
          fileStatus: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);
      setCurrentStatus(newStatus);

    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

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
        <div className="mb-2 flex gap-8">
          <div className="text-sm text-gray-600">
            Total Amount: <span className="font-medium">{totalAmount}</span>
          </div>
          <div className="text-sm text-gray-600">
            Paid Amount: <span className="font-medium">{paidAmount}</span>
          </div>
        </div>
      </div>
      <div className="w-[98%] h-14 rounded-lg mb-5 border p-3 border-gray-40000 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span>
            {" "}
            <FolderIcon className="h-8 w-8 text-yellow-500" />
          </span>
          <span> {files[0].fileName}</span>
        </div>
        <div>
          {/* <Download className="w-5 h-5  hover:cursor-pointer" /> */}
        </div>
      </div>
      <div className="flex justify-between items-center">
        {currentStatus === "pending" ? (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-200 
                   hover:bg-emerald-700 hover:text-white rounded-md transition-all duration-200 
                   border-2 border-emerald-700"
              onClick={() => handleStatusChange("approved")}
            >
              Approve
            </button>
            <button
              className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-200
                   hover:bg-red-700 hover:text-white rounded-md transition-all duration-200
                   border-2 border-red-700"
              onClick={() => handleStatusChange("declined")}
            >
              Decline
            </button>
          </div>
        ) : currentStatus === "approved" ? (
          <div>
            <button
              className="px-3 py-1 text-sm  text-white bg-[#333333]
                    rounded-md cursor-not-allowed opacity-50"
              disabled
            >
              Approved
            </button>
          </div>
        ) : currentStatus === "declined" ? (
          <div>
            <button
              className="px-3 py-1 text-sm  text-white bg-[#333333]
                    rounded-md cursor-not-allowed opacity-50"
              disabled
            >
              Declined
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={handleView}
            className="px-3 py-1 text-sm text-white bg-[#9E9FEE] hover:bg-purple-400 rounded-md transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
