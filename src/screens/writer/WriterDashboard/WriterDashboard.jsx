import React, { useState, useEffect } from "react";
import { RiBookOpenFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import Card from "./components/Card";
import WriterCard from "./components/WriterCard";
import TaskCard from "./components/TaskCard";
import { HiArrowRight } from "react-icons/hi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { writer_dashboard } from "../../../api/Api";
import { useNavigate } from "react-router-dom";



const WriterDashboard = () => {
  const navigate = useNavigate();

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
        console.log(data);
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
            onClick={() => navigate(`/writer/writerorder`)}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-14`}
          >
            View all
            <HiArrowRight className="text-lg" />
          </div>
        </div>
        <div
          className={`flex flex-wrap gap-4 ${
            !writerDashboard.allApprovedAssignments ||
            writerDashboard.allApprovedAssignments.length === 0
              ? "flex items-center justify-center h-64 bg-gray-100 text-gray-500"
              : ""
          }`}
        >
          {writerDashboard.allApprovedAssignments &&
          writerDashboard.allApprovedAssignments.length > 0 ? (
            writerDashboard.allApprovedAssignments.map((assignment) => (
              <WriterCard key={assignment._id} {...assignment} />
            ))
          ) : (
            <div className="text-center">No data to display</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex mb-4 justify-between">
          <h2 className="text-2xl font-semibold">My Tasks</h2>
          <div
            onClick={() => navigate(`/writer/writermytask`)}
            className={`flex items-center gap-1 cursor-pointer hover:text-blue-600 mr-`}
          >
            View all
            <HiArrowRight className="text-lg mr-14" />
          </div>
        </div>
        <div
          className={`flex gap-4 flex-wrap ${
            !writerDashboard.myTask || writerDashboard.myTask.length === 0
              ? "flex items-center justify-center h-64 bg-gray-100 text-gray-500"
              : ""
          }`}
        >
          {writerDashboard.myTask && writerDashboard.myTask.length > 0 ? (
            writerDashboard.myTask.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center">No tasks found for this status</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;
