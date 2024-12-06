import React, { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";

const QRRequest = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [fullScreenPhoto, setFullScreenPhoto] = useState(null);
  const [confirmation, setConfirmation] = useState({
    open: false,
    action: "",
    id: null,
  });

  const data = [
    {
      id: 1,
      clientName: "Milan",
      title: "The Future of Renewable Energy and its Impact on Society",
      date: "2024-12-04",
      method: "Instagram",
      amount: 400,
      currency: "NRs",
      remarks: "First payment from Instagram",
      photo:
        "https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=w64j3fW8C96CfYo3kbi386rs_sHH_6BGe8lAAAFS-y4=",
    },
    {
      id: 2,
      clientName: "Milan",
      title: "Exploring Emerging Technologies in the Modern World",
      date: "2024-11-29",
      method: "Instagram",
      amount: 32000,
      currency: "NRs",
      remarks: "First payment from Instagram",
      photo:
        "https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=w64j3fW8C96CfYo3kbi386rs_sHH_6BGe8lAAAFS-y4=",
    },
    {
      id: 3,
      clientName: "Sachet",
      title: "Machine Learning",
      date: "2024-11-28",
      method: "Instagram",
      amount: 2000,
      currency: "NRs",
      remarks: "First payment from Instagram",
      photo:
        "https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=w64j3fW8C96CfYo3kbi386rs_sHH_6BGe8lAAAFS-y4=",
    },
  ];

  return (
    <div className="p-4 space-y-4 w-full md:w-[81%]">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-lg rounded-lg p-4 space-y-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Client Name:{" "}
                <span className="font-thin text-black">{item.clientName}</span>
              </p>
              <p className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-none">
                Assignment Title:{" "}
                <span className="font-thin text-black" title={item.title}>
                  {item.title.length > 30
                    ? `${item.title.substring(0, 30)}...`
                    : item.title}
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
                  <span className="font-thin text-black">{item.method}</span>
                </div>
              </p>
            </div>
            <p className="text-[#00b087] font-thin  text-sm md:text-lg">
              Amount: {item.currency} {item.amount}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Remarks:{" "}
            <span className="font-thin text-black">{item.remarks}</span>
          </p>
          <div className="flex space-x-2 mt-2 flex-row-reverse gap-3">
            <button
              className="px-3 py-0 text-sm text-emerald-600 bg-emerald-200 hover:bg-emerald-400 hover:text-white rounded-md transition-all duration-200 border-2 border-emerald-400"
              onClick={() =>
                setConfirmation({ open: true, action: "Approve", id: item.id })
              }
            >
              Approve
            </button>
            <button
              className="px-3 py-0 text-sm text-red-600 bg-red-200 hover:bg-red-400 hover:text-white rounded-md transition-all duration-200 border-2 border-red-400"
              onClick={() =>
                setConfirmation({ open: true, action: "Decline", id: item.id })
              }
            >
              Decline
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() =>
                setExpandedCard(expandedCard === item.id ? null : item.id)
              }
            >
              <FiEye className="mr-2" /> View
            </button>
          </div>
          {expandedCard === item.id && (
            <div className="mt-4">
              <img
                src={item.photo}
                alt="Assignment"
                className="w-40 h-40 object-cover rounded cursor-pointer"
                onClick={() => setFullScreenPhoto(item.photo)}
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
