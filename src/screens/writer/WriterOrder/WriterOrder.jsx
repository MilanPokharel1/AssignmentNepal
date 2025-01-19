import React, { useState, useEffect } from "react";
import WriterCard from "../WriterDashboard/components/WriterCard";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Card from "../WriterMyTask/components/Card";
import { writer_dashboard, writer_orders } from "../../../api/Api";
import { RiBookOpenFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import Card from "../WriterDashboard/components/Card";

const WriterOrder = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [writerDashboard, setWriterDashboard] = useState([]);


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
          // console.log(data);
        } catch (error) {
          console.error("Error fetching reminders:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchWriterDashboard();
    }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(writer_orders, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setAssignments(data?.allApprovedAssignments);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>

      <div className="flex flex-wrap gap-4">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
            <CircularProgress />
          </div>
        )}
        <div className="flex flex-wrap gap-5 mt-4 mb-6">
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
        {assignments &&
          assignments.map((assignment) => (
            <WriterCard key={assignment._id} {...assignment} />
          ))}
      </div>
      {assignments.length < 1 && (
        <p className="text-gray-500 h-[5rem] py-[10rem] text-center mr-[16%] items-center">
          No order found
        </p>
      )}
    </div>
  );
};

export default WriterOrder;
