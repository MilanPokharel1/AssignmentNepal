import React from 'react';
import { Phone, Mail } from 'lucide-react';

const AccountPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-20 h-20 text-yellow-500 mx-auto mb-4"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Not Approved</h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Your account is currently pending approval. Please contact our customer service team for assistance.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <Phone className="mr-2 text-blue-600" size={20} />
            <span className="font-semibold text-gray-700">Customer Service</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-bold text-gray-800">1-800-SUPPORT</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-bold text-gray-800">support@company.com</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          We apologize for any inconvenience. Our team will review your account shortly.
        </div>
      </div>
    </div>
  );
}

export default AccountPending
