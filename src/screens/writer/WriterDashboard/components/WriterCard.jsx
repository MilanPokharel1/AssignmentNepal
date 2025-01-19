import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { writer_accept } from "../../../../api/Api";
import CircularProgress from "@material-ui/core/CircularProgress";

import clientpic from "../../../../assets/user.png";
const WriterCard = ({
  _id,
  assignmentTitle,
  description,
  status,
  totalAmount,
  paidAmount,
  payments,
  deadline,
  firstName,
  lastName,
  price,
  writerName,
  writerPic = "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
  writerId = "",
}) => {
  const navigate = useNavigate();
  const [acceptStatus, setIsAccepted] = useState("approved");
  const [showModal, setShowModal] = useState(false);
  const [showNotice, setShowNotice] = useState(false)
  const [isLoading, setIsLoading] = useState(false);


  paidAmount = payments[0].paidAmount;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
  };

  const handleAccept = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(writer_accept, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: _id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      setIsAccepted("accepted");
      setShowNotice(true)
      setShowModal(false);
      // console.log("Order Accepted successfully:", data);
    } catch (error) {
      console.error("Failed to accept order:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      setTimeout(() => {
        setShowNotice(false)
        setIsLoading(false)
      }, 2000)
    }
  };
  const maskName = (name) => {
    if (!name) return "";
    return name.length <= 2
      ? name
      : `${name.slice(0, 2)}${"*".repeat(name.length - 3)}${name.slice(-1)}`;
  };

  const maskedFirstName = maskName(firstName);
  const maskedLastName = maskName(lastName);

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
      <div className="flex justify-between items-center mt-4 border-b-2 pb-5 mb-2">
        <div className="flex items-center gap-2">
          <img src={clientpic} className="w-8 h-8 rounded-full object-cover" />

          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900">
              {maskedFirstName} {maskedLastName}
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
            <span className="text-gray-900 ml-2 w-96 line-clamp-2 overflow-hidden text-ellipsis">
              {assignmentTitle}
            </span>
          </div>
        </div>

        <span className="text-xs text-red-500">Due {formatDate(deadline)}</span>
        {/* Payment Info */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">
            Amount: <span className="font-medium">{price ? price : "-"}</span>
          </div>
        </div>
      </div>
      {/* Writer Info */}
      <div className="flex justify-between items-center">
        {status === "approved" ? (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm text-emerald-600 bg-emerald-200 
                           hover:bg-emerald-400 hover:text-white rounded-md transition-all duration-200 
                           border-2 border-emerald-400"
              onClick={() => setShowModal(true)}
              disabled={acceptStatus == "accepted"}
            >
              {acceptStatus == "approved" ? "Accept" : "Accepted"}
            </button>
            {/* <button
              className={`px-3 py-1 text-sm text-red-600 bg-red-200 
                           hover:bg-red-400 hover:text-white ${
                             acceptStatus == "accepted" ? "hidden" : ""
                           } rounded-md transition-all duration-200 
                           border-2 border-red-400`}
              onClick={() => // console.log("Declined")}
            >
              Decline
            </button> */}
          </div>
        ) : (
          <span className="text-sm font-light">Already Assigned</span>
        )}
        <div>
          <button
            className={`px-3 py-1 text-sm text-white bg-[#9E9FEE] rounded-md transition-colors ${status === "approved"
              ? "hover:bg-purple-400"
              : "bg-gray-300 cursor-not-allowed"
              }`}
            disabled={status !== "approved"}
            onClick={() => navigate(`/writer/writerorder/writerView/${_id}`)}
          >
            View
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Acceptance
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to accept this assignment?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-[#5d5fef] hover:bg-blue-600 rounded-md"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriterCard;
