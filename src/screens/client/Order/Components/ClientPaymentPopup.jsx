import React from 'react';
import { FileIcon, AlertCircle } from "lucide-react";

const PaymentPopup = ({ onClose, assignment }) => {
  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close" // For accessibility
        >
          &times; {/* Close icon or text */}
        </button>

        <div className="pt-6">
          <div className="space-y-4">
            {/* Assignment Title */}
            <div>
              <label className="text-sm text-gray-500">Assignment Title:</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm">
                {assignment.title} {/* Display assignment title */}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-500">Description:</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm">
                {assignment.description} {/* Display assignment description */}
              </div>
            </div>

            {/* File */}
            <div>
              <label className="text-sm text-gray-500">File:</label>
              <div className="mt-1 flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <FileIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm">theprojetks-design-tokens.zip</span> {/* Replace with actual file name if needed */}
                <span className="text-xs text-gray-500">5.3MB</span> {/* Replace with actual file size if needed */}
              </div>
            </div>

            {/* Status Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Deadline:</label>
                <div className="text-sm text-red-500">{assignment.dueDate}</div> {/* Display due date */}
              </div>
              <div>
                <label className="text-sm text-gray-500">Assignment Status:</label>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${assignment.status === 'Submitted' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {assignment.status} {/* Display assignment status */}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Payment Status:</label>
                <div className="text-sm text-red-500">Unpaid</div> {/* You can also pass this in props if needed */}
              </div>
              <div>
                <label className="text-sm text-gray-500">Remaining:</label>
                <div className="text-sm text-red-500">{assignment.totalAmount} {/* Display total amount */}</div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm text-gray-500">Amount</label>
              <input
                type="number"
                placeholder="Enter the amount you want to pay"
                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            {/* Payment Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Proceed To Pay
            </button>

            {/* Warning Alert */}
            <div className="bg-red-50 border-red-200 p-2 rounded-md flex">
              <AlertCircle className="h-auto mr-2 w-9 text-red-600" />
              <div className="text-xs text-red-600">
                Warning: You cannot download this file until your due payment is cleared. Please
                settle the outstanding balance to proceed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
