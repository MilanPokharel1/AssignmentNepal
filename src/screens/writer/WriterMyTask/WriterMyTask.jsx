import React, { useState, useEffect } from "react";
import TaskCard from "../WriterDashboard/components/TaskCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { writer_dashboard, writer_tasks } from "../../../api/Api";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import Card from "./components/Card";
import { FaChevronDown, FaHourglassEnd } from "react-icons/fa";
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
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);

  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [writerDashboard, setWriterDashboard] = useState([]);


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
    fetchWriterDashboard();
  }, []);

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setIsLoading(false);
    }
  };




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


  const sortedAssignments = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    switch (sortOrder) {
      case "Newest":
        return dateB - dateA;
      case "Oldest":
        return dateA - dateB;
      default:
        return 0;
    }
  });

  const sortOptions = ["Newest", "Oldest"];

  return (
    <div>
      <div className="mt-4">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
            <CircularProgress />
          </div>
        )}
        <div className="flex flex-wrap gap-7 justify-center sm:justify-start mb-5">
          <Card
            Icon={IoBookSharp}
            heading="Total"
            number={writerDashboard.totalAssignments}
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
          />
          <Card
            Icon={MdOutlinePendingActions}
            heading="Ongoing"
            number={writerDashboard.activeAssignment}
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
          <Card
            Icon={FaHourglassEnd}
            heading="Submitted"
            number={writerDashboard.submittedAssignment}
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />

          <Card
            Icon={IoCheckmarkSharp}
            heading="Completed"
            number={writerDashboard.completedAssignment}
            theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
          />
        </div>
        <div className="py-6">
          <div className="mb-6 space-x-2 flex max-w-[81%] justify-between">
            <div className="space-x-2">

              {filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  label={filter.label}
                  active={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                />
              ))}
            </div>
            <div className="relative text-sm">
              <button
                className="p-2 border border-gray-300 rounded-lg bg-[#dbedff] flex items-center gap-2 w-56 md:w-64"
                onClick={() => setShowOptions(!showOptions)}
              >
                <div className="flex-1 font-medium">
                  <span className="text-sm text-gray-600">Sort by:&ensp;</span>
                  {sortOrder}
                </div>
                <FaChevronDown className="h-4 w-4" />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-base px-4">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortOrder(option);
                        setShowOptions(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            {sortedAssignments.map((task) => (
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
