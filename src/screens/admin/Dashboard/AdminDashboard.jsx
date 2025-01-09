import React, { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import { FaUsers, FaPenFancy, FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import Chart from "./components/Chart";
import { useNavigate } from "react-router-dom";

import OrderCard from "./components/OrderCard";
import MainPieChart from "./components/MainPieChart";
import CircularChart from "./components/CircularChart";
import CircularProgress from "@material-ui/core/CircularProgress";

import { admin_dashboard } from "../../../api/Api";



const Dashboard = () => {
  const [writers, setWriters] = useState([]);
  const [cs, setCs] = useState([]);
  const [adminDashboard, setAdminDashboard] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const[chartData , setChartData] = useState([
    { month: "Jan", thisMonth: 0, lastMonth: 0 },
    { month: "Fev", thisMonth: 0, lastMonth: 0 },
    { month: "Mar", thisMonth: 0, lastMonth: 0 },
    { month: "Apr", thisMonth: 0, lastMonth: 0 },
    { month: "May", thisMonth: 0, lastMonth: 0 },
    { month: "Jun", thisMonth: 0, lastMonth: 0 },
    { month: "Jul", thisMonth: 0, lastMonth: 0 },
    { month: "Aug", thisMonth: 0, lastMonth: 0 },
    { month: "Sep", thisMonth: 0, lastMonth: 0 },
    { month: "Oct", thisMonth: 0, lastMonth: 0 },
    { month: "Nov", thisMonth: 0, lastMonth: 0 },
    { month: "Dec", thisMonth: 3, lastMonth: 0 },
  ])




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
        setAssignments(data.recentAssignments);
        setCs(data.newCs);
        setAdminDashboard(data);

        setChartData((prevChartData) =>
          prevChartData.map((entry) =>
            entry.month === "Dec"
              ? { ...entry, thisMonth: data.totalOrders }
              : entry
          )
        );


        console.log("total amount:", data.totalPayment);
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
            Icon={FaUsers}
            heading="Total Users"
            number={adminDashboard.totalUser}
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
          />
          <Card
            Icon={FaPenFancy}
            heading="Total Orders"
            number={adminDashboard.totalOrders}
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />

          <Card
            Icon={MdShoppingCart}
            heading="Active Orders"
            number={adminDashboard.activeOrders}
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
          <Card
            Icon={FaMoneyBillWave}
            heading="Total Income"
            number={`Rs ${adminDashboard.totalPayment}`}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center">
        <MainPieChart
          orderCancelData={[
            { name: "Orders", value: adminDashboard.totalOrders },
            { name: "Cancelled", value: adminDashboard.cancelledOrders },
          ]}
        />
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CircularChart
          value={((adminDashboard.assignedWriters / adminDashboard.totalWriters) * 100).toFixed(2)}
          title="Assigned Writers"
        />
        <CircularChart
          value={((adminDashboard.completedOrders / adminDashboard.totalOrders) * 100).toFixed(2)}
          title="Orders Completed"
        />
        <CircularChart
          value={((adminDashboard.totalPayment / adminDashboard.totalAmount) * 100).toFixed(0)}
          title="Payment Received"
        />
      </div>
    </div>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <div
            onClick={() => navigate("/admin/adminordermanagement")}
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
          onClick={() => navigate("/admin/adminwritermanagement")}
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 mt-10">
            Customer Service
          </h2>
          <div
            onClick={() => navigate("/admin/adminCS")}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-11`}
          >
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cs.length > 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3  p-4 rounded-lg ">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-gray-500 ">
                      <th className="border-b-2 pl-10 py-4 text-left">Name</th>
                      <th className="border-b-2 px-4 py-4 text-left">
                        Subject
                      </th>
                      <th className="border-b-2 px-4 py-4 text-left">
                        Phone Number
                      </th>
                      <th className="border-b-2 px-4 py-4 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
