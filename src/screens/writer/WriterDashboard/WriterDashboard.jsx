import React, { useState } from "react";
import { RiBookOpenFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import WriterCard from "./components/writerCard";
import TaskCard from "./components/TaskCard";

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

const taskData = [
  {
    id: 1,
    title: "It should be relatively short, but still...",
    status: "in-process",
    dueDate: "Oct 6",
    amount: "Rs 5000",
    assignee: {
      name: "Sachet Khatiwdha",
      avatar: "/api/placeholder/32/32",
    },
    writer: "Millu bhaiya",
  },
  {
    id: 2,
    title: "It should be relatively short, but still...",
    status: "completed",
    dueDate: "Oct 6",
    amount: "Rs 5000",
    assignee: {
      name: "Jane Cooper",
      avatar: "/api/placeholder/32/32",
    },
    writer: "Millu bhaiya",
  },
  {
    id: 3,
    title: "Another task that is done",
    status: "done",
    dueDate: "Oct 8",
    amount: "Rs 6000",
    assignee: {
      name: "Sachet Khatiwdha",
      avatar:
        "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
    },
    writer: "Millu bhaiya",
  },
];

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-lg ${
      active
        ? "text-white font-light bg-indigo-500"
        : "border font-semibold border-indigo-500"
    }`}
  >
    {label}
  </button>
);

const WriterDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("in-process");
  const filters = [
    { id: "in-process", label: "In process" },
    { id: "done", label: "Done" },
    { id: "completed", label: "Completed" },
  ];

  // Filter tasks based on active filter
  const filteredTasks = taskData.filter((task) => task.status === activeFilter);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="flex flex-wrap gap-5 mt-3 mx-auto">
        <Card
          Icon={RiBookOpenFill}
          heading="Total Assignment"
          number="45"
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={RiBookOpenFill}
          heading="Ongoing Assignment"
          number="0"
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />
        <Card
          Icon={FaMoneyBillWave}
          heading="Total Amount"
          number="200k"
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <div className="flex flex-wrap gap-4">
          {assignments.map((assignment) => (
            <WriterCard key={assignment._id} {...assignment} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mt-3">Current Tasks</h2>
        <div className="max-w-2xl p-6">
          <div className="mb-6 space-x-2">
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                label={filter.label}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            ))}
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No tasks found for this status
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;
