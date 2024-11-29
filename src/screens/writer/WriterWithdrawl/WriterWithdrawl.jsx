import React, { useState } from "react";
import WithdrawalCard from "./components/WithdrawalCard";
import { FiX } from "react-icons/fi";
import Card from "./components/Card";

import { MdAccountBalance } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdReceipt } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
// Dummy data
const withdrawalData = [
  {
    id: 1,
    date: "20/01/2024",
    time: "04:24PM",
    status: "approved",
    approvedBy: "Customer Service",
    amount: "Rs 8000",
  },
  {
    id: 2,
    date: "19/01/2024",
    time: "02:15PM",
    status: "declined",
    approvedBy: "System",
    amount: "Rs 5000",
  },
  {
    id: 3,
    date: "18/01/2024",
    time: "11:30AM",
    status: "approved",
    approvedBy: "Admin",
    amount: "Rs 12000",
  },
];

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
  // Filter options
  const filters = ["All", "Approved", "Declined"];

  // Filter logic
  const filteredData = withdrawalData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status.toLowerCase() === activeFilter.toLowerCase();
  });
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="flex flex-wrap gap-7 justify-center sm:justify-start mb-14">
        <Card
          Icon={MdAccountBalance}
          heading="Balance"
          number={40}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={MdPendingActions}
          heading="Pending"
          number={40}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={MdReceipt}
          heading="Withdrawaled"
          number={40}
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />

        <Card
          Icon={FaMoneyBillWave}
          heading="Total"
          number={40}
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
        {filteredData.map((item) => (
          <WithdrawalCard key={item.id} item={item} />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[40rem] relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              <FiX size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Type Here"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Type Here"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="Type Here"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Withdrawal Amount
                </label>
                <input
                  type="number"
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
