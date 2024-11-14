import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import Card from "./components/Card";
import AssignmentCard from "../Order/Components/AssignmentCard.jsx";
import FilterButtons from "./components/FilterButtons";

import { HiArrowRight } from "react-icons/hi";
import PaymentCard from "../Payments/Components/PaymentCard";
import ClientOrderPopup from "../Order/Components/ClientOrderPopup.jsx";
import { UseTheme } from "../../../contexts/ThemeContext/UseTheme.js";
import { get_orders } from "../../../api/Api.jsx";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [orderPopup, setorderPopup] = useState(false);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  const { currentTheme, themes } = UseTheme();
  const [isLoading, setIsLoading] = useState(false);

  const theme = themes[currentTheme];

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_orders, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setAssignments(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const paymentData = [
    {
      assignmentTitle:
        "This is my second assignment submission eqwnjkdewnudnqewdnoiqenoandlaskndkaslndkasndklasndlkkasdasnlxnasxlasxnsa",
      date: "20/02/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 8000,
    },
    {
      assignmentTitle:
        "This is my second assignment submission sndiasncas nclkasncois dacwslkdcnois dancosdancosc",
      date: "20/01/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 7000,
    },
    {
      assignmentTitle:
        "It should be relatively short, but still anxcoilasncxoilasndcxoliasnxnlzkm",
      date: "20/01/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "Mid payment",
      amount: 8000,
    },
  ];
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredAssignments =
    activeFilter === "all"
      ? assignments
      : assignments.filter((a) => a.status === activeFilter);

  return (
    <div className="flex-1 p-6 bg-[#fafbfc]">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Card
          Icon={IoBookSharp}
          heading="Total Assignment"
          number={`${assignments.length}`}
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
      <div className="flex justify-between w-full md:w-[81%] my-5">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <button
          className="px-4 py-2 rounded-lg text-sm mt-4 text-white bg-[#5d5fef] hover:bg-purple-600 transition-colors"
          onClick={() => setorderPopup(true)}
        >
          +Create Order
        </button>
        {orderPopup && <ClientOrderPopup setorderPopup={setorderPopup} />}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.slice(0, 2).map((assignment, index) => (
            <AssignmentCard key={index} {...assignment} />
          ))
        ) : (
          <p className="text-gray-500 h-[5rem] py-[5rem] text-center ml-[35%] items-center">No data to show</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center w-full md:w-[81%] mt-12 px-4 mb-3">
          <h1 className="font-semibold">Transactions</h1>
          <div
            onClick={() => navigate("/client/payments")}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 `}
          >
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>
        <div className="w-full md:w-[81%]">
          {paymentData.length > 0 &&
            paymentData.map((payment, index) => (
              <PaymentCard
                key={index}
                title={payment.title}
                date={payment.date}
                method={payment.method}
                currency={payment.currency}
                remarks={payment.remarks}
                amount={payment.amount}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
