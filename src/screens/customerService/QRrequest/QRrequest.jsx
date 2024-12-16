import React, { useState, useEffect } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { QR_payment_request } from "../../../api/Api";
import CircularProgress from "@material-ui/core/CircularProgress";


const QRRequest = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [fullScreenPhoto, setFullScreenPhoto] = useState(null);
  const [payments, setPayments] = useState([]);
  const [confirmation, setConfirmation] = useState({
    open: false,
    action: "",
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(QR_payment_request, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setPayments(data.payments);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);


  const getValidImageUrl = (filePath) => {
    console.log(filePath)
    const serverBaseUrl = "https://server.assignmentnepal.com"; // Replace with your server's base URL

    // Replace the local path prefix with the public URL prefix
    return filePath.replace(
      "/root/assignmentNepal/assignmentNepalBackend/public/uploads/",
      `${serverBaseUrl}/uploads/`
    );
  };



  return (
    <div className="p-4 space-y-4 w-full md:w-[81%]">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      {payments.length > 0 && payments.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-lg rounded-lg p-4 space-y-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Client Name:{" "}
                <span className="font-thin text-black">{item.instagramTitle}</span>
              </p>
              <p className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-none">
                Assignment Title:{" "}
                <span className="font-thin text-black" title={item.assignmentTitle}>
                  {item.assignmentTitle.length > 30
                    ? `${item.assignmentTitle.substring(0, 30)}...`
                    : item.assignmentTitle}
                </span>
              </p>
              <p className="text-sm text-gray-400 flex gap-3">
                <div>
                  Date:{" "}
                  <span className="font-thin text-black">{item.date}</span>
                </div>
                <div>
                  {" "}
                  Payment Method:{" "}
                  <span className="font-thin text-black">{item.paymentMethod}</span>
                </div>
              </p>
            </div>
            <p className="text-[#00b087] font-thin  text-sm md:text-lg">
              Amount: {item.paymentCurrency} {item.paidAmount}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Remarks:{" "}
            <span className="font-thin text-black">{item.remark}</span>
          </p>
          <div className="flex space-x-2 mt-2 flex-row-reverse gap-3">

            <button
              className="px-3 py-0 text-sm h-8 text-red-600 bg-red-200 hover:bg-red-400 hover:text-white rounded-md transition-all duration-200 border-2 border-red-400"
              onClick={() =>
                setConfirmation({ open: true, action: "Decline", id: item._id })
              }
            >
              Decline
            </button>
            <button
              className="px-3 py-0 text-sm text-emerald-600 bg-emerald-200 hover:bg-emerald-400 hover:text-white rounded-md transition-all duration-200 border-2 border-emerald-400"
              onClick={() =>
                setConfirmation({ open: true, action: "Approve", id: item._id })
              }
            >
              Approve
            </button>
            <button
              className="bg-blue-500 text-white h-8 px-4 py-2 rounded flex items-center"
              onClick={() =>
                setExpandedCard(expandedCard === item._id ? null : item._id)
              }
            >
              <FiEye className="mr-2" /> View
            </button>
          </div>
          {expandedCard === item._id && (
            <div className="mt-4">
              <img
                src={getValidImageUrl(item.images)}
                alt="Assignment"
                className="w-40 h-40 object-cover rounded cursor-pointer"
                onClick={() => setFullScreenPhoto(getValidImageUrl(item.images))}
              />
            </div>
          )}
        </div>
      ))}

      {fullScreenPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setFullScreenPhoto(null)}
        >
          <img
            src={fullScreenPhoto}
            alt="Full Screen"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
          />
        </div>
      )}

      {confirmation.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl space-y-6 w-[90%] max-w-sm shadow-lg">
            {/* Title */}
            <p className="text-lg font-medium text-gray-800 text-center">
              Are you sure you want to{" "}
              <span className="font-bold text-blue-600">
                {confirmation.action}
              </span>{" "}
              this request?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm 
                     hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 
                     transition duration-300"
                onClick={() =>
                  setConfirmation({ open: false, action: "", id: null })
                }
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-sm 
                     hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 
                     transition duration-300"
                onClick={() =>
                  setConfirmation({ open: false, action: "", id: null })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRRequest;
