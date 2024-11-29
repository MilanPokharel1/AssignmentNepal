import React, { useState } from "react";
import WithdrawalCard from "./components/WithdrawalCard";
// Dummy data
const withdrawalData = [
  {
    id: 1,
    date: "20/01/2024",
    time: "04:24PM",
    status: "pending",
    writerName: "Alice Smith",
    writerEmail: "alice.smith@example.com",
    amount: "Rs 8000",
  },
  {
    id: 2,
    date: "19/01/2024",
    time: "02:15PM",
    status: "pending",
    writerName: "Bob Johnson",
    writerEmail: "bob.johnson@example.com",
    amount: "Rs 5000",
  },
  {
    id: 3,
    date: "18/01/2024",
    time: "11:30AM",
    status: "approved",
    writerName: "Charlie Brown",
    writerEmail: "charlie.brown@example.com",
    amount: "Rs 12000",
  },
  {
    id: 4,
    date: "17/01/2024",
    time: "09:45AM",
    status: "approved",
    writerName: "Diana Prince",
    writerEmail: "diana.prince@example.com",
    amount: "Rs 7000",
  },
  {
    id: 5,
    date: "16/01/2024",
    time: "05:30PM",
    status: "declined",
    writerName: "Ethan Hunt",
    writerEmail: "ethan.hunt@example.com",
    amount: "Rs 3000",
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

const AdminWithdrawlRequest = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter options
  const filters = ["All", "Approved", "Declined"];

  // Filter logic
  const filteredData = withdrawalData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
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

      <div>
        {filteredData.map((item) => (
          <WithdrawalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminWithdrawlRequest;
