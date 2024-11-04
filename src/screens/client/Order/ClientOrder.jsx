import React, { useState } from "react";
import AssignmentCard from "./components/AssignmentCard";
import FilterButtons from "./components/FilterButtons";
import profileIcon from "../ClientComponents/profileIcon.jpg";
const ClientOrder = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);

  const assignments = [
    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Pending",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 1000",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 1,
      title: "Regarding project management of my homework",
      status: "Ongoing",
      totalAmount: "NRs 5000",
      paidAmount: "NRs 3000",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },

    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Submitted",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 4500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },

    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Approved",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 2500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },

    {
      id: 3,
      title: "Regarding project management of my homework",
      status: "Completed",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 5000",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredAssignments =
    activeFilter === "All"
      ? assignments
      : assignments.filter((a) => a.status === activeFilter);
  const NoDataFound = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <ImSearch className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any payments matching "{searchTerm}". Try adjusting
        your search terms or filters.
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Clear Search
      </button>
    </div>
  );

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const parts = text.toString().split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredPayments = assignments.filter((assignments) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      assignments.title.toLowerCase().includes(searchStr) ||
      assignments.method.toLowerCase().includes(searchStr) ||
      assignments.remarks.toLowerCase().includes(searchStr) ||
      assignments.amount.toString().includes(searchStr) ||
      assignments.date.toLowerCase().includes(searchStr)
    );
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));

    switch (sortOrder) {
      case "Newest":
        return dateB - dateA;
      case "Oldest":
        return dateA - dateB;
      case "Amount (High to Low)":
        return b.amount - a.amount;
      case "Amount (Low to High)":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });
  return (
    <div>
      <div className="flex flex-row">
        <h1>Assignment</h1>
        <div className="flex justify-between items-center mb-4 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="p-2 px-4 pl-10 border-none rounded-2xl bg-[#dbedff] w-64 focus:border-none  outline-none focus:ring-2 focus:ring-blue-300 focus:bg-[#dbedff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
          </div>
          <div className="relative text-sm">
            <button
              className="p-2 border border-gray-300 rounded-lg bg-[#dbedff] flex items-center gap-2 w-64"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="flex-1 font-medium">
                <span className="text-sm text-gray-600">Sort by:&ensp;</span>
                {sortOrder}
              </div>
              <FaChevronDown className="h-4 w-4" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-base">
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
      </div>
    </div>
  );
};

export default ClientOrder;
