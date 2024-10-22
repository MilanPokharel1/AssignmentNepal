import React from "react";
import {
  FaBell,
  FaSignOutAlt,
  FaShoppingCart,
  FaBook,
  FaDollarSign,
  FaQuestionCircle,
  FaThLarge,
  FaTasks,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

const ClientDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Assignment Nepal</h1>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 bg-blue-100 rounded-lg hover:bg-blue-200">
            <FaThLarge className="mr-2" /> Dashboard
          </h1>
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 hover:bg-blue-100 rounded-lg">
            <FaShoppingCart className="mr-2" /> Order
          </h1>
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 hover:bg-blue-100 rounded-lg">
            <FaDollarSign className="mr-2" /> Payments
          </h1>
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 hover:bg-blue-100 rounded-lg">
            <FaBook className="mr-2" /> Assignments
          </h1>
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 hover:bg-blue-100 rounded-lg">
            <FaQuestionCircle className="mr-2" /> Help Support
          </h1>
          <h1 className="flex items-center text-lg cursor-pointer py-2 px-4 hover:bg-blue-100 rounded-lg">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </h1>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <FaBell className="text-xl" />
            </button>
            <div className="flex items-center space-x-2">
              <img
                src="path_to_avatar"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span>Dhananjaya</span>
            </div>
          </div>
        </header>
        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 my-6">
          <div className="bg-red-100 p-4 rounded-lg shadow-sm flex items-center">
            <FaTasks className="text-2xl text-red-500 mr-2" />
            <h2 className="text-lg">Total Assignment</h2>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm flex items-center">
            <FaClipboardList className="text-2xl text-yellow-500 mr-2" />
            <h2 className="text-lg">Active Assignment</h2>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-sm flex items-center">
            <FaCheckCircle className="text-2xl text-green-500 mr-2" />
            <h2 className="text-lg">Completed Assignment</h2>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow-sm flex items-center">
            <FaShoppingCart className="text-2xl text-purple-500 mr-2" />
            <h2 className="text-lg">Numbers of Orders</h2>
          </div>
        </div>

        {/* On-Going Assignments */}
        <section className="mb-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">On Going</h2>
            <h1 className="text-blue-600 cursor-pointer">View All</h1>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Assignment Cards */}
            {["75%", "10%", "99%"].map((progress, idx) => (
              <div key={idx} className="bg-white p-4 shadow-md rounded-lg">
                <h3>Assignment Name</h3>
                <p className="text-gray-500">Due: Oct 6</p>
                <p className="text-sm text-gray-400">
                  Submission Date: 2024-10-06
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        progress === "99%"
                          ? "bg-red-500"
                          : progress === "75%"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: progress }}
                    ></div>
                  </div>
                  <p className="text-right mt-2 text-gray-600">
                    {progress} to complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Assignments */}
        <section>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Completed Assignments</h2>
            <h1 className="text-blue-600 cursor-pointer">View All</h1>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Completed Assignment Cards */}
            {["100%", "100%", "100%"].map((progress, idx) => (
              <div key={idx} className="bg-white p-4 shadow-md rounded-lg">
                <h3>Assignment Name</h3>
                <p className="text-gray-500">Due: Oct 6</p>
                <p className="text-sm text-gray-400">
                  Submission Date: 2024-10-06
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="h-4 rounded-full bg-green-500"
                      style={{ width: progress }}
                    ></div>
                  </div>
                  <p className="text-right mt-2 text-gray-600">
                    {progress} to complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClientDashboard;
