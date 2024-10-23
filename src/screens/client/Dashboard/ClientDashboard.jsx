import React, { useState } from "react";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import Card from "./components/Card";
import TopNavbar from "./components/TopNavbar";
import SideNavbar from "./components/SideNavbar";
import AssignmentCard from "./components/AssignmentCard";
import FilterButtons from "./components/FilterButtons";
import profileIcon from "./components/profileIcon.jpg";
const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const assignments = [
    {
      status: "Ongoing",
      title: "Final Accounting",
      payment: "Initial",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Completed",
      title: "Marketing Report",
      payment: "Mid pay",
      dueDate: "Oct 6",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Pending",
      title: "Taxation Law",
      payment: "Initial",
      dueDate: "Oct 10",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Ongoing",
      title: "Final Accounting",
      payment: "Initial",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Completed",
      title: "Marketing Report",
      payment: "Mid pay",
      dueDate: "Oct 6",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Pending",
      title: "Taxation Law",
      payment: "Initial",
      dueDate: "Oct 10",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Ongoing",
      title: "Final Accounting",
      payment: "Initial",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Completed",
      title: "Marketing Report",
      payment: "Mid pay",
      dueDate: "Oct 6",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Pending",
      title: "Taxation Law",
      payment: "Initial",
      dueDate: "Oct 10",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Ongoing",
      title: "Final Accounting",
      payment: "Initial",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Completed",
      title: "Marketing Report",
      payment: "Mid pay",
      dueDate: "Oct 6",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      status: "Pending",
      title: "Taxation Law",
      payment: "Initial",
      dueDate: "Oct 10",
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
    <div className="min-h-screen flex flex-col">
      <div className="h-[4rem]">
        <TopNavbar notificationCount={99} userName="Dhananjaya" />
      </div>

      <div className="flex flex-1">
        <div className="w-[15%] h-[calc(100vh-4rem)] bg-gray-50">
          <SideNavbar />
        </div>

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

          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <div className="flex flex-wrap gap-4 mt-4">
            {filteredAssignments.map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
