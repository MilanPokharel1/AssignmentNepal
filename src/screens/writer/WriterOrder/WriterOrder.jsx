import React, { useState, useEffect } from "react";
import WriterCard from "../WriterDashboard/components/WriterCard";
import CircularProgress from "@material-ui/core/CircularProgress";

import { writer_orders } from "../../../api/Api";


const WriterOrder = () => {

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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
        console.log(data);
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
      {" "}
      <div className="flex flex-wrap gap-4">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
            <CircularProgress />
          </div>
        )}
        {assignments && assignments.map((assignment) => (
          <WriterCard key={assignment._id} {...assignment} />
        ))}
      </div>
      {assignments.length < 1 && <p className="text-gray-500 h-[5rem] py-[10rem] text-center mr-[16%] items-center">
        No order found
      </p>}
    </div>
  );
};

export default WriterOrder;
