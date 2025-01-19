import React, { useState, useEffect } from "react";
import WithdrawalCard from "./components/WithdrawalCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { get_all_withdrawal_request } from "../../../api/Api";

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-base transition-colors ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-white text-gray-700 border border-indigo-600 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

const CsWithdrawlRequest = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState([]);

  // Fetch withdrawal requests
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(get_all_withdrawal_request, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setWithdrawalData(data.withdrawalRequests || []);
        // console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filters = ["All", "Pending", "Approved", "Declined"];

  // Filter logic
  const filteredData =
    withdrawalData.length > 0
      ? withdrawalData.filter((item) => {
          if (activeFilter === "All") return true;
          return item.status?.toLowerCase() === activeFilter.toLowerCase();
        })
      : [];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Filtered Data Display */}
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <WithdrawalCard key={item._id} item={item} />
          ))
        ) : (
          <div className="text-gray-600 text-center py-4">
            No withdrawal requests found for "{activeFilter}".
          </div>
        )}
      </div>
    </div>
  );
};

export default CsWithdrawlRequest;
