import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import { FaUsers, FaPenFancy, FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import Chart from "./components/Chart";
import WriterCard from "./components/WriterCard";
import FilterButtons from "./components/FilterButtons";
import CsCard from "./components/CsCard";
import OrderCard from "./components/OrderCard";
import MainPieChart from "./components/MainPieChart";
import CircularProgress from "./components/CircularProgress";
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
const sampleCS = [
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

const orderCancelData = [
  { name: "Order", value: 75 },
  { name: "Cancel", value: 25 },
];

const metricsData = [
  { name: "Amount Comparison", completed: 77 },
  { name: "Active Writers", completed: 54 },
  { name: "Orders/Completed", completed: 39 },
];

const Dashboard = () => {
  const [writers, setWriters] = useState([]);
  useEffect(() => {
    const fetchCsDashboard = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(admin_dashboard, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        console.log(data.newWriters);

        setWriters(data.newWriters);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsDashboard();
  }, []);
  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mb-3">
        <div className="cols-span-12 md:col-span-7 flex flex-wrap gap-3 mb-5">
          <Card
            Icon={FaUsers}
            heading="Total Users"
            number="45"
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
          />
          <Card
            Icon={FaPenFancy}
            heading="No of writers"
            number="0"
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />

          <Card
            Icon={MdShoppingCart}
            heading="Numbers of Orders"
            number="0"
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
          <Card
            Icon={FaMoneyBillWave}
            heading="Total Amount"
            number="200k"
            theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
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
      <div className="flex flex-col lg:flex-row h-auto lg:h-[45vh] w-full gap-4 rounded-lg mb-5">
        <div className="h-full w-full lg:w-1/2 bg-white">
          <MainPieChart orderCancelData={orderCancelData} />
        </div>
        <div className="w-full lg:w-[60%] h-full flex  gap-4">
          {metricsData.map((metric) => (
            <CircularProgress
              key={metric.name}
              value={metric.completed}
              title={metric.name}
            />
          ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {writers.length > 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3  p-4 rounded-lg ">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-500 ">
                    <th className="border-b-2 pl-10 py-4 text-left">Name</th>
                    <th className="border-b-2 px-4 py-4 text-left">Subject</th>
                    <th className="border-b-2 px-4 py-4 text-left">
                      Phone Number
                    </th>
                    <th className="border-b-2 px-4 py-4 text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {writers.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border-b px-4 py-3 text-left">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                            className="w-10 h-10 rounded-full object-cover"
                            alt={`${item.firstName} ${item.lastName}`}
                          />
                          <span>{`${item.firstName} ${item.lastName}`}</span>
                        </div>
                      </td>
                      <td className="border-b px-4 py-3">
                        {item.catagory || "N/A"}
                      </td>
                      <td className="border-b px-4 py-3">
                        {item.phone || "N/A"}
                      </td>
                      <td className="border-b px-4 py-3">{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-4">
            <p className="text-gray-800">No data to show</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between w-[60%] gap-10 mt-4">
          <h2 className="text-2xl font-semibold">Customer Service</h2>
        </div>

        <div className="min-h-96 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="w-32 text-gray-400">
                <th className="border-b-2 pl-10 py-4 text-left">Name</th>

                <th className="border-b-2 px-4 py-4">Phone Number</th>
                <th className="border-b-2 px-4 py-4">Email</th>
                <th className="border-b-2 px-4 py-4">Locations</th>
                <th className="border-b-2 px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {writers.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      <div className="flex justify-start items-center gap-3">
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                          className="w-8 h-8 rounded-full object-cover"
                          alt={item.name}
                        />
                        <span>{highlightText(item.name, search)}</span>
                      </div>
                    </td>

                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      {highlightText(item.phone, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      {highlightText(item.email, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      {highlightText(item.country, search)}
                    </td>
                    <td className="border-b-2 px-0 py-3 text-center border-gray-200 flex items-center">
                      <button className="rounded-lg m-1 flex items-center  border text-sm border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-200 hover:cursor-pointer px-3 py-1">
                        Login
                      </button>
                      <button className="px-3 py-1 rounded-lg m-1  flex items-center border  text-sm border-gray-500 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                        Disable
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="h-64 border px-4 py-2">
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No data to display
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
