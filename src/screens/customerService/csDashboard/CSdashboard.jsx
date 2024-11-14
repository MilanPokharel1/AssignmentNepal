import React from "react";

import { FaSearch } from "react-icons/fa";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import Card from "./components/Card";
import Chart from "./components/Chart";
// Dummy chart data
const chartData = [
  { month: "J", thisMonth: 20, lastMonth: 30 },
  { month: "F", thisMonth: 22, lastMonth: 35 },
  { month: "M", thisMonth: 25, lastMonth: 32 },
  { month: "A", thisMonth: 28, lastMonth: 30 },
  { month: "M", thisMonth: 26, lastMonth: 33 },
  { month: "J", thisMonth: 29, lastMonth: 98 },
  { month: "J", thisMonth: 31, lastMonth: 28 },
  { month: "A", thisMonth: 30, lastMonth: 25 },
  { month: "S", thisMonth: 27, lastMonth: 23 },
];

// Dummy orders data
const ordersData = [
  {
    id: 1,
    name: "Sachet Khatiwdha",
    assignmentTitle:
      "It should be relatively short, but still management, and dedication.",
    dueDate: "Oct 6",
    totalAmount: 15000,
    paidAmount: 7000,
    paymentPercentage: 46,
  },
  {
    id: 2,
    name: "Sachet Khatiwdha",
    assignmentTitle:
      "It should be relatively short, but still management, and dedication.",
    dueDate: "Oct 6",
    totalAmount: 15000,
    paidAmount: 7000,
    paymentPercentage: 46,
  },
];

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mb-3">
        <div className="cols-span-12 md:col-span-7 flex flex-wrap gap-3 mb-5">
          <Card
            Icon={IoBookSharp}
            heading="Total Assignment"
            number="45"
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
          />
          <Card
            Icon={IoBookSharp}
            heading="Active Assignment"
            number="0"
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />
          <Card
            Icon={IoCheckmarkSharp}
            heading="Completed"
            number="0"
            theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
          />
          <Card
            Icon={MdShoppingCart}
            heading="Numbers of Orders"
            number="0"
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow mb-6 cols-span-12 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4">Writers Activity</h2>
          <div className="h-64">
            <Chart chartData={chartData} />
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 bg-blue-50 rounded-lg text-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <FaSearch />
            </div>
          </div>
          <div className="relative w-full sm:w-auto">
            <select className="appearance-none bg-white px-4 py-2 pr-8 rounded-lg text-sm border w-full sm:w-auto">
              <option>Sort By: Newest</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-400">
              <MdArrowDropDown />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ordersData.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">{order.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded">
                      PENDING
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm mb-1">Assignment Title:</p>
                <p className="text-sm text-gray-600">{order.assignmentTitle}</p>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span className="text-red-500">Due {order.dueDate}</span>
                <div>
                  <p>Total Amount: {order.totalAmount}</p>
                  <p>Paid Amount: {order.paidAmount}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Payment:</span>
                  <span>{order.paymentPercentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{ width: `${order.paymentPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm">
                  Approve
                </button>
                <button className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm">
                  Decline
                </button>
                <button className="px-4 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-sm ml-auto">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Writers Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Writer</h2>
          <button className="text-sm text-gray-500">View All →</button>
        </div>

        <div className="flex gap-2 mb-6">
          <button className="px-6 py-2 rounded-full bg-white text-sm">
            All
          </button>
          <button className="px-6 py-2 rounded-full bg-green-400 text-white text-sm">
            Active
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-sm">
            Inactive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Sachet Khatiwdha</p>
                  <p className="text-sm text-gray-500">(295) 555-0118</p>
                </div>
                <button className="px-6 py-1 bg-green-50 text-green-500 rounded-lg text-sm ml-auto">
                  Active
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
