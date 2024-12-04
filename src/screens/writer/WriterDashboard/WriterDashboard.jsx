import React, { useState, useEffect } from "react";
import { RiBookOpenFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import WriterCard from "./components/WriterCard";
import TaskCard from "./components/TaskCard";
import { HiArrowRight } from "react-icons/hi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { writer_dashboard } from "../../../api/Api";

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

  const [writerDashboard, setWriterDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchWriterDashboard = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(writer_dashboard, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        setWriterDashboard(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWriterDashboard();
  }, []);



  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap gap-5 mt-3 mx-auto">
        <Card
          Icon={RiBookOpenFill}
          heading="Total Assignment"
          number={writerDashboard.totalAssignments}
          theme={{ bgColor: "bg-orange-100", iconBgColor: "bg-orange-400" }}
        />
        <Card
          Icon={RiBookOpenFill}
          heading="Completed"
          number={writerDashboard.completedAssignment}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={FaMoneyBillWave}
          heading="Ongoing"
          number={writerDashboard.activeAssignment}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
        <Card
          Icon={FaMoneyBillWave}
          heading="Cancelled"
          number={writerDashboard.cancelledAssignment}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
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
          {writerDashboard.allApprovedAssignments && writerDashboard.allApprovedAssignments.map((assignment) => (
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
        <div className="">
          <div className="flex gap-4 flex-wrap">
            {writerDashboard.myTask && writerDashboard.myTask.map((task) => (writerDashboard.myTask.length > 0?(
              <TaskCard key={task.id} task={task} />
              ):(<div className="text-center text-gray-500 py-8">
                No tasks found for this status
              </div>)
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;
