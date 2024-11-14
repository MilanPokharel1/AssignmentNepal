import React from "react";

import { FaSearch } from "react-icons/fa";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import Card from "./components/Card";
import Chart from "./components/Chart";

import OrderCard from "./components/OrderCard";
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
const assignments = [
  {
    _id: "1",
    assignmentTitle:
      "It should be relatively short, but still management, and dedication.dcscdscfdcvfdvfdvfdvfdvfdvfdvfdvdfvdfvcdssssssssssssssssssssssssssssss",
    status: "Pending",
    totalAmount: 15000,
    payments: [{ paidAmount: 7000 }],
    deadline: "2023-10-06",
    writerName: "Sachet Khatiwada",
    writerPic: "path_to_image.jpg",
  },
  {
    _id: "2",
    assignmentTitle: "Another assignment with similar details.",
    status: "Pending",
    totalAmount: 15000,
    payments: [{ paidAmount: 7000 }],
    deadline: "2023-10-06",
    writerName: "Sachet Khatiwada",
    writerPic: "path_to_image.jpg",
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
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>

        <div>
          {assignments.map((assignment) => (
            <OrderCard key={assignment._id} {...assignment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
