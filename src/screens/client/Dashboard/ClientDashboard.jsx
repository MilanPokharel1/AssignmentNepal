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
// import ClientOrderPopup from "../Order/Components/ClientOrderPopup.jsx";
import { UseTheme } from "../../../contexts/ThemeContext/useTheme.js";
import { get_orders, get_payment_dashboard } from "../../../api/Api.jsx";

import NewOrderPopup from "../Order/Components/NewOrderPopup.jsx";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [orderPopup, setorderPopup] = useState(false);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const { currentTheme, themes } = UseTheme();
  const [isLoading, setIsLoading] = useState(true);

  const countAssignments = () => {
    const totalAssignments = assignments.length;

    const pendingAssignments = assignments.filter(
      (assignment) => assignment.status === "pending"
    ).length;

    const activeAssignments = assignments.filter((assignment) =>
      ["approved", "ongoing", "submitted"].includes(assignment.status)
    ).length;

    const completedAssignments = assignments.filter(
      (assignment) => assignment.status === "completed"
    ).length;

    return {
      totalAssignments,
      pendingAssignments,
      activeAssignments,
      completedAssignments,
    };
  };

  const {
    totalAssignments,
    pendingAssignments,
    activeAssignments,
    completedAssignments,
  } = countAssignments();

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

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_payment_dashboard, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await response.json();
        setPaymentData(data.payments);
        console.log("this is data: ", data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const countAssignments = () => {
      const totalAssignments = assignments.length;

      const pendingAssignments = assignments.filter(
        (assignment) => assignment.status === "pending"
      ).length;

      const activeAssignments = assignments.filter((assignment) =>
        ["approved", "ongoing", "submitted"].includes(assignment.status)
      ).length;

      const completedAssignments = assignments.filter(
        (assignment) => assignment.status === "completed"
      ).length;

      return {
        totalAssignments,
        pendingAssignments,
        activeAssignments,
        completedAssignments,
      };
    };

    const {
      totalAssignments,
      pendingAssignments,
      activeAssignments,
      completedAssignments,
    } = countAssignments();
  }, [assignments]);

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
          number={`${totalAssignments}`}
          theme={{
            bgColor: `${themes[currentTheme].card1bg}`,
            iconBgColor: `${themes[currentTheme].card1iconbg}`,
          }}
        />
        <Card
          Icon={MdShoppingCart}
          heading="Pending Orders"
          number={`${pendingAssignments}`}
          theme={{
            bgColor: `${themes[currentTheme].card2bg}`,
            iconBgColor: `${themes[currentTheme].card2iconbg}`,
          }}
        />
        <Card
          Icon={IoBookSharp}
          heading="Active Assignment"
          number={`${activeAssignments}`}
          theme={{
            bgColor: `${themes[currentTheme].card3bg}`,
            iconBgColor: `${themes[currentTheme].card3iconbg}`,
          }}
        />

        <Card
          Icon={IoCheckmarkSharp}
          heading="Completed"
          number={`${completedAssignments}`}
          theme={{
            bgColor: `${themes[currentTheme].card4bg}`,
            iconBgColor: `${themes[currentTheme].card4iconbg}`,
          }}
        />
      </div>
      <div className="flex justify-between w-full md:w-[81%] my-5">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <button
          className={`px-4 py-2 rounded-lg text-sm mt-4 text-white bg-[${themes[currentTheme].btnbg}] hover:${themes[currentTheme].btnhover} transition-colors`}
          onClick={() => setorderPopup(true)}
        >
          +Create Order
        </button>
        {orderPopup && <NewOrderPopup setorderPopup={setorderPopup} />}

      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments
            .slice(0, 2)
            .map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))
        ) : (
          <p className="text-gray-500 h-[5rem] py-[5rem] text-center ml-[35%] items-center">
            No data to show
          </p>
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
          {paymentData.length > 0 ? (
            paymentData.map((payment, index) => (
              <PaymentCard
                key={index}
                title={payment.assignmentTitle}
                date={payment.createdAt}
                method={payment.paymentMethod}
                currency={payment.paymentCurrency}
                remarks={payment.remark}
                amount={`Rs ${payment.paidAmount}`}
              />
            ))
          ) : (
            <p className="text-gray-500 h-[5rem] py-[5rem] text-center  items-center">
              No data to show
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
