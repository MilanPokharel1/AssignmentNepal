import React from "react";
import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <Wrench className="mx-auto mb-6 h-24 w-24 text-blue-500" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Site Under Maintenance
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We're currently working to improve your experience. Please check back
          soon!
        </p>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Our team is performing scheduled updates to enhance site performance
            and functionality. We apologize for any inconvenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
