import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">403 - Unauthorized</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go Back to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
