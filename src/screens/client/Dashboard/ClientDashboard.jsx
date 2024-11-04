import React, { useState } from "react";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import Card from "./components/Card";
import AssignmentCard from "./components/AssignmentCard";
import FilterButtons from "./components/FilterButtons";
import profileIcon from "../ClientComponents/profileIcon.jpg";
import { HiArrowRight } from "react-icons/hi";
import PaymentCard from "../Payments/Components/PaymentCard";
import ClientOrderPopup from "../Order/Components/ClientOrderPopup.jsx";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [orderPopup, setorderPopup] = useState(false);

  const assignments = [
    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Pending",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 1000",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 1,
      title: "Regarding project management of my homework",
      status: "Ongoing",
      totalAmount: "NRs 5000",
      paidAmount: "NRs 3000",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
  ];

  const paymentData = [
    {
      title:
        "This is my second assignment submission eqwnjkdewnudnqewdnoiqenoandlaskndkaslndkasndklasndlkkasdasnlxnasxlasxnsa",
      date: "20/02/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 8000,
    },
    {
      title:
        "This is my second assignment submission sndiasncasnclkasncoisdacwslkdcnoisdancosdancosc",
      date: "20/01/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 7000,
    },
    {
      title:
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
    activeFilter === "All"
      ? assignments
      : assignments.filter((a) => a.status === activeFilter);

  return (
    <div className="flex-1 p-6 bg-[#fafbfc]">
      <div className="flex gap-4">
        <Card
          Icon={IoBookSharp}
          heading="Total Assignment"
          number="40"
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={IoBookSharp}
          heading="Active Assignment"
          number="8"
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />
        <Card
          Icon={IoCheckmarkSharp}
          heading="Completed Assignment"
          number="8"
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
        <Card
          Icon={MdShoppingCart}
          heading="Numbers of Orders"
          number="18"
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
      </div>
      <div className="flex justify-between w-[81%]">
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
        {orderPopup && <ClientOrderPopup />}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredAssignments.map((assignment, index) => (
          <AssignmentCard key={index} {...assignment} />
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center w-[81%] mt-12 px-4">
          <h1 className="font-semibold">Transactions</h1>
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>
        <div className="w-[81%]">
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
