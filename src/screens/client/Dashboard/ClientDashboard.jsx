import React, { useState } from "react";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import Card from "./components/Card";
import AssignmentCard from "./components/AssignmentCard";
import FilterButtons from "./components/FilterButtons";
import profileIcon from "../ClientComponents/profileIcon.jpg";
const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");

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

    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Submitted",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 4500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },

    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Approved",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 2500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
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
    <div className="flex-1 p-6">
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
      <div className= "flex justify-between w-[81%]">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <button
          className="px-4 py-2 rounded-lg text-sm mt-4 text-white bg-[#5d5fef] hover:bg-purple-600 transition-colors"

        >
          +Create Order
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredAssignments.map((assignment, index) => (
          <AssignmentCard key={index} {...assignment} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
