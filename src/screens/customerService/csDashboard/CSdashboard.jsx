import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";

import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdCancel, MdShoppingCart } from "react-icons/md";
import CircularProgress from "@material-ui/core/CircularProgress";


import Card from "./components/Card";
import Chart from "./components/Chart";
import WriterCard from "./components/WriterCard";
import FilterButtons from "./components/FilterButtons";

import OrderCard from "./components/OrderCard";
import { cs_dashboard } from "../../../api/Api";

// Dummy chart data
const chartData = [
  { month: "Jan", thisMonth: 20, lastMonth: 30 },
  { month: "Feb", thisMonth: 22, lastMonth: 35 },
  { month: "Mar", thisMonth: 25, lastMonth: 32 },
  { month: "Apr", thisMonth: 28, lastMonth: 30 },
  { month: "May", thisMonth: 26, lastMonth: 33 },
  { month: "Jun", thisMonth: 29, lastMonth: 45 },
  { month: "Jul", thisMonth: 31, lastMonth: 28 },
  { month: "Aug", thisMonth: 30, lastMonth: 25 },
  { month: "Sep", thisMonth: 27, lastMonth: 23 },
  { month: "Oct", thisMonth: 29, lastMonth: 27 },
  { month: "Nov", thisMonth: 30, lastMonth: 23 },
  { month: "Dec", lastMonth: 30 },
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
  const [csDashboard, setCsDashboard] = useState([])
  const [assignments, setAssignments] = useState([])
  const [writers, setWriters] = useState([])
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchCsDashboard = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(cs_dashboard, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        console.log(data)
        setCsDashboard(data);
        setAssignments(data.recentAssignments)
        setWriters(data.newWriters)
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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mb-3">
        <div className="cols-span-12 md:col-span-7 flex flex-wrap gap-3 mb-5">
          <Card
            Icon={IoBookSharp}
            heading="Total Assignment"
            number={csDashboard.totalAssignments}
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
          <Card
            Icon={IoBookSharp}
            heading="Active Assignment"
            number={csDashboard.activeAssignment}
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />
          <Card
            Icon={IoCheckmarkSharp}
            heading="Completed"
            number={csDashboard.completedAssignment}
            theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
          />
          <Card
            Icon={MdCancel}
            heading="Cancelled"
            number={csDashboard.cancelledAssignment}
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
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
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {writers.length > 0 ? (
          writers.map((writer) => (
            <WriterCard
              key={writer._id}
              name={writer.firstName}
              phoneNumber={writer.phone}
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
