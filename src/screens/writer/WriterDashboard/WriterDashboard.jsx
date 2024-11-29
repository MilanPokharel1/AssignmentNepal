import React, { useState } from "react";
import { RiBookOpenFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import WriterCard from "./components/WriterCard";
import TaskCard from "./components/TaskCard";
import { HiArrowRight } from "react-icons/hi";
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
  {
    _id: "2",
    assignmentTitle: "Another assignment with similar details.",
    status: "Assigned",
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
    title: "Design homepage UI",
    status: "ongoing", // Can also be called "ongoing"
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
    title: "Complete API integration",
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
    title: "Fix UI bugs in login page",
    status: "completed",
    dueDate: "Oct 8",
    amount: "Rs 6000",
    assignee: {
      name: "Sachet Khatiwdha",
      avatar:
        "https://unsplash.com/photos/a-close-up-of-a-motherboard-and-a-pen-on-a-table-boMKfQkphro",
    },
    writer: "Millu bhaiya",
  },
  {
    id: 4,
    title: "Submit project documentation",
    status: "submitted",
    dueDate: "Oct 10",
    amount: "Rs 4500",
    assignee: {
      name: "Emily Brown",
      avatar: "/api/placeholder/32/32",
    },
    writer: "Shreya Singh",
  },
  {
    id: 5,
    title: "Prepare project presentation",
    status: "ongoing",
    dueDate: "Oct 12",
    amount: "Rs 4000",
    assignee: {
      name: "Rahul Verma",
      avatar: "/api/placeholder/32/32",
    },
    writer: "Millu bhaiya",
  },
  {
    id: 6,
    title: "Review test cases",
    status: "cancelled",
    dueDate: "Oct 15",
    amount: "Rs 3000",
    assignee: {
      name: "Aisha Khan",
      avatar: "/api/placeholder/32/32",
    },
    writer: "Shreya Singh",
  },
];
const WriterDashboard = () => {
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
        <div className="flex mb-4 justify-between">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <div
            onClick={() => console.log("view all clicked")}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-14`}
          >
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {assignments.map((assignment) => (
            <WriterCard key={assignment._id} {...assignment} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex mb-4 justify-between">
          <h2 className="text-2xl font-semibold">My Tasks</h2>
          <div
            onClick={() => console.log("view all clicked")}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-`}
          >
            View all
            <HiArrowRight className="text-lg mr-14" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-4 flex-wrap">
            {taskData.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {taskData.length === 0 && (
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
