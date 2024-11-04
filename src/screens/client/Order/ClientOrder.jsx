import React, { useState } from "react";
import AssignmentCard from "./components/AssignmentCard";
import FilterButtons from "./components/FilterButtons";
import profileIcon from "../ClientComponents/profileIcon.jpg";
import { ImSearch } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";

const ClientOrder = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);

  const assignments = [
    {
      id: 2,
      title: "Regarding project management of my homework",
      status: "Pending",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 1000",
      dueDate: "Oct 9",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 1,
      title: "Regarding project management of my homework",
      status: "Ongoing",
      totalAmount: "NRs 5000",
      paidAmount: "NRs 3000",
      dueDate: "Oct 5",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 4,
      title: "Regarding project management of my homework",
      status: "Submitted",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 4500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 6,
      title: "Regarding project management of my homework",
      status: "Approved",
      totalAmount: "Rs 5000",
      paidAmount: "Rs 2500",
      dueDate: "Oct 8",
      writer: { name: "Jane Cooper", avatar: profileIcon },
    },
    {
      id: 9,
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

  const normalizeText = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, "");
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm.replace(/\s+/g, "[\\s]*")})`, "gi");
    const parts = text.toString().split(regex);
    return parts.map((part, index) =>
      normalizeText(part) === normalizeText(searchTerm) ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const NoDataFound = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <ImSearch className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any assignments matching "{searchTerm}". Try adjusting
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

  const filteredAssignments = assignments
    .filter((assignment) => {
      if (activeFilter === "All") return true;
      return assignment.status === activeFilter;
    })
    .filter((assignment) => {
      const search = normalizeText(searchTerm);
      return (
        normalizeText(assignment.title).includes(search) ||
        normalizeText(assignment.dueDate).includes(search) ||
        normalizeText(assignment.writer.name).includes(search)
      );
    });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    switch (sortOrder) {
      case "Newest":
        return b.id - a.id;
      case "Oldest":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const sortOptions = ["Newest", "Oldest"];

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-row px-4 mt-5 max-w-[85%]">
        <h1 className="flex-1">Assignment</h1>
        <div className="flex justify-between items-center mr-5 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="p-2 px-4 pl-10 border-none rounded-2xl bg-[#dbedff] w-64 focus:border-none outline-none focus:ring-2 focus:ring-blue-300 focus:bg-[#dbedff]"
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
      </div>
      <div className="mt-5">
        <div className="flex justify-between w-[81%]">
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <button className="px-4 py-2 rounded-lg text-sm mt-4 text-white bg-[#5d5fef] hover:bg-purple-600 transition-colors">
            +Create Order
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {sortedAssignments.length > 0 ? (
            sortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                {...assignment}
                title={highlightText(assignment.title, searchTerm)}
                writer={{
                  ...assignment.writer,
                  name: highlightText(assignment.writer.name, searchTerm),
                }}
                dueDate={highlightText(assignment.dueDate, searchTerm)}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientOrder;
