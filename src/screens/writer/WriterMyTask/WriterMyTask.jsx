import React, { useState, useEffect } from "react";
import TaskCard from "../WriterDashboard/components/TaskCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { writer_tasks } from "../../../api/Api";


const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-lg ${active
      ? "text-white font-light bg-indigo-500"
      : "border font-thin border-indigo-500"
      }`}
  >
    {label}
  </button>
);
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

const WriterMyTask = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(writer_tasks, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setTaskData(data?.myTask);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filters = [
    { id: "all", label: "All" },
    { id: "ongoing", label: "Ongoing" },
    { id: "submitted", label: "Submitted" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  // Modified filter logic to handle "all" case
  const filteredTasks =
    activeFilter === "all"
      ? taskData
      : taskData.filter((task) => task.status === activeFilter);
  return (
    <div>
      <div className="mt-6">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
            <CircularProgress />
          </div>
        )}

        <div className="p-6">
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

          <div className="flex gap-4 flex-wrap">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
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

export default WriterMyTask;
