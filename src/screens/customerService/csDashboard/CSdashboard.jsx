import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";

import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";

import Card from "./components/Card";
import Chart from "./components/Chart";
import WriterCard from "./components/WriterCard";
import FilterButtons from "./components/FilterButtons";

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

const sampleWriters = [
  {
    id: 1,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "active",
    pic: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "active",
    pic: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "active",
    pic: "/api/placeholder/40/40",
  },
  {
    id: 4,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "inactive",
    pic: "/api/placeholder/40/40",
  },
  {
    id: 5,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "active",
    pic: "/api/placeholder/40/40",
  },
  {
    id: 6,
    name: "Sachet Khatiwdha",
    phoneNumber: "(225) 555-0118",
    status: "inactive",
    pic: "/api/placeholder/40/40",
  },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("active");

  const filteredWriters = sampleWriters.filter((writer) => {
    if (filter === "all") return true;
    return writer.status === filter;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
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
          <h2 className="text-xl font-semibold mb-4 text-center">
            Orders Activity
          </h2>
          <div className="h-64">
            <Chart chartData={chartData} />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <div
            onClick={() => console.log("view all clicked")}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-11`}
          >
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {assignments.map((assignment) => (
            <OrderCard key={assignment._id} {...assignment} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">writers</h2>
        <div
          onClick={() => console.log("view all clicked")}
          className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-11`}
        >
          View all
          <HiArrowRight className="text-lg" />
        </div>
      </div>
      <div className="mb-8">
        <FilterButtons
          activeFilter={filter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWriters.length > 0 ? (
          filteredWriters.map((writer) => (
            <WriterCard
              key={writer.id}
              name={writer.name}
              phoneNumber={writer.phoneNumber}
              status={writer.status}
              pic={writer.pic}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-4 ">
            <p className="text-gray-800">No data to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
