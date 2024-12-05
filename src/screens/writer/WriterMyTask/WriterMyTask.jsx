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
