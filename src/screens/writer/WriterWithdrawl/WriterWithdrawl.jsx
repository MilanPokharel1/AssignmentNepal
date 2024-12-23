import React, { useState, useEffect } from "react";
import WithdrawalCard from "./components/WithdrawalCard";
import { FiX } from "react-icons/fi";
import Card from "./components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MdAccountBalance } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdReceipt } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
import { create_withdrawal, get_withdrawal_request } from "../../../api/Api";
// Dummy data

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-base transition-colors ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-white text-gray-700 border border-indigo-600 hover:bg-gray-50 "
    }`}
  >
    {label}
  </button>
);

const WriterWithdrawal = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState();
  const [remark, setRemark] = useState("");
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
  };
  // Filter options
  const filters = ["All", "Approved", "Declined"];

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_withdrawal_request, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setWithdrawalData(data.withdrawalRequests);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(create_withdrawal, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
          remark: remark,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      console.log("success:", data);
      setWithdrawalData([...withdrawalData, data.newWithdrawal]);
      toggleModal();
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  // Filter logic
  const filteredData =
    withdrawalData.length > 0
      ? withdrawalData.filter((item) => {
          if (activeFilter === "All") return true;
          return item.status.toLowerCase() === activeFilter.toLowerCase();
        })
      : [];
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap gap-7 justify-center sm:justify-start mb-14">
        <Card
          Icon={MdAccountBalance}
          heading="Balance"
          number={0}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={MdPendingActions}
          heading="Pending"
          number={0}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={MdReceipt}
          heading="Withdrawaled"
          number={5500}
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />

        <Card
          Icon={FaMoneyBillWave}
          heading="Total"
          number={5500}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
      </div>
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
        <button
          className="px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center gap-2 text-sm mr-9"
          onClick={toggleModal}
        >
          <span>+ Withdrawal</span>
        </button>
      </div>

      <div>
        {withdrawalData.length > 0 &&
          filteredData.map((item) => (
            <WithdrawalCard key={item.id} item={item} />
          ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[30rem] relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              <FiX size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Enter the amount"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Remark</label>
                <input
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  placeholder="Type Here"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-32 bg-indigo-600 text-white py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriterWithdrawal;
