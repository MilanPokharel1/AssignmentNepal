import React, { useState } from "react";
import { FileIcon, AlertCircle, CreditCard, QrCode, Upload, X } from "lucide-react";

const PaymentPopup = ({ onClose, assignment }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showScreenshotPopup, setShowScreenshotPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState("");

  const paymentMethods = [
    {
      id: "nic-asia",
      name: "NIC Asia Cybersource",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "fonepay-dynamic",
      name: "Fonepay Dynamic QR",
      icon: <QrCode className="w-6 h-6" />,
    },
    {
      id: "fonepay-static",
      name: "Fonepay Static QR",
      icon: <QrCode className="w-6 h-6" />,
    },
  ];

  const statusColors = {
    ongoing: "bg-yellow-200 text-yellow-600",
    submitted: "bg-purple-200 text-purple-600",
    completed: "bg-green-100 text-green-600",
    pending: "bg-orange-100 text-orange-600",
    approved: "bg-gray-300 text-gray-600",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleProceedToPay = () => {
    if (amount <= 0) {
      alert("Please enter an amount greater than 0.");
      return;
    }
    setShowScreenshotPopup(true);
  };

  const handleFinish = () => {
    console.log("Uploaded file:", selectedFile);
    setShowScreenshotPopup(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-full max-w-5xl mx-auto bg-white p-6 rounded-md shadow-lg flex">
          {/* Payment Details */}
          <div className="w-2/3 pr-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute text-[20px] top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="pt-6">
              <div className="space-y-4">
                {/* Assignment Title */}
                <div>
                  <label className="text-sm text-gray-500">Assignment Title:</label>
                  <div className="mt-1 px-2 bg-gray-50 rounded-md text-sm line-clamp-2 overflow-hidden">
                    {assignment.assignmentTitle}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-500">Description:</label>
                  <div className="mt-1 px-2 bg-gray-50 rounded-md text-sm line-clamp-4 overflow-hidden">
                    {assignment.description}
                  </div>
                </div>

                {/* File */}
                <div>
                  <label className="text-sm text-gray-500">File:</label>
                  <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <FileIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">theprojetks-design-tokens.zip</span>
                    <span className="text-xs text-gray-500">5.3MB</span>
                  </div>
                </div>

                {/* Status Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Deadline:</label>
                    <div className="text-sm text-red-500">{assignment.deadline}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Assignment Status:</label>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[assignment.status.toLowerCase()]}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Payment Status:</label>
                    <div className="text-sm text-red-500">Unpaid</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Remaining:</label>
                    <div className="text-sm text-red-500">{assignment.totalAmount}</div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="text-sm text-gray-500">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter the amount you want to pay"
                    className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleProceedToPay}
                  className={`
                    w-full py-2 rounded-md text-white mt-4
                    ${selectedPaymentMethod 
                      ? 'bg-[#5d5fef] hover:bg-opacity-90' 
                      : 'bg-gray-400 cursor-not-allowed'}
                  `}
                  disabled={!selectedPaymentMethod}
                >
                  Proceed To Pay
                </button>

                {/* Warning Alert */}
                <div className="bg-red-50 border-red-200 p-2 rounded-md flex mt-4">
                  <AlertCircle className="h-auto mr-2 w-9 text-red-600" />
                  <div className="text-xs text-red-600">
                    Warning: You cannot download this file until your due payment is cleared. Please
                    settle the outstanding balance to proceed.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods Sidebar */}
          <div className="w-1/3 pl-6 border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`
                    flex items-center p-4 rounded-md cursor-pointer transition-all border
                    ${selectedPaymentMethod === method.id 
                      ? 'bg-[#5d5fef] text-white border-[#5d5fef]' 
                      : 'hover:bg-gray-100 text-gray-700 border-gray-200'}
                  `}
                >
                  <div className="mr-4">{method.icon}</div>
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
              ))}
            </div>

            {/* Static QR Code Display */}
            {selectedPaymentMethod === "fonepay-static" && (
              <div className="mt-6 text-center">
                <h3 className="text-md font-semibold mb-4">Fonepay Static QR</h3>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  alt="Static QR Code"
                  className="mx-auto border-2 border-gray-200 rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600">Scan to complete payment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screenshot Upload Popup */}
      {showScreenshotPopup && (
        <div className="fixed inset-0 flex z-50  items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white p-8 rounded-lg max-w-md w-full">
            {/* Close Button */}
            <button
              onClick={() => setShowScreenshotPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Upload Payment Screenshot</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded Screenshot"
                    className="w-full max-h-[60vh] object-contain rounded-lg mb-4"
                  />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400" />
                )}
                <span className="text-sm text-gray-500 mt-2">
                  {selectedFile ? selectedFile.name : "Upload screenshot"}
                </span>
              </label>
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              disabled={!selectedFile}
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPopup;
