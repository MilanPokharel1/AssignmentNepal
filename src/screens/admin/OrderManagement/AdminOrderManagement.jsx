import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "../../client/Dashboard/components/Card";
import FilterButtons from "./components/FilterButtons"; // Ensure this component is implemented
import OrderCard from "../Dashboard/components/OrderCard";
import { get_all_orders } from "../../../api/Api";

import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";

const AdminOrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_all_orders, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setAssignments(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
        We couldn't find any orders.
      </p>
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
        normalizeText(assignment.assignmentTitle).includes(search) ||
        normalizeText(assignment.instagramTitle).includes(search) ||
        normalizeText(assignment.deadline).includes(search) ||
        (assignment.writerName &&
          normalizeText(assignment.writerName).includes(search))
      );
    });

  // Sort by deadline instead of createdAt
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

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
    <div className="flex-1 p-6">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        <Card
          Icon={IoBookSharp}
          heading="Total Assignment"
          number={`${assignments.length}`}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={MdShoppingCart}
          heading="Pending Orders"
          number={`${
            assignments.filter((assignment) => assignment.status === "pending")
              .length
          }`}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={IoBookSharp}
          heading="Active Assignment"
          number={`${
            assignments.filter(
              (assignment) =>
                assignment.status === "ongoing" ||
                assignment.status === "approved" ||
                assignment.status === "submitted"
            ).length
          }`}
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />

        <Card
          Icon={IoCheckmarkSharp}
          heading="Completed"
          number={`${
            assignments.filter(
              (assignment) => assignment.status === "completed"
            ).length
          }`}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
      </div>
      <div className="flex flex-row-reverse px-4 mt-5 w-full md:w-[85%]">
        <div className="flex justify-between items-center mr-5 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="p-2 px-4 pl-10 border-none rounded-2xl bg-[#dbedff] w-56 md:w-64 focus:border-none outline-none focus:ring-2 focus:ring-blue-300 focus:bg-[#dbedff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
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
      </div>

      <div className="mt-5">
        <div className="flex justify-between w-full md:w-[81%]">
          {typeof FilterButtons !== "undefined" && (
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-5">
          {sortedAssignments.length > 0 ? (
            sortedAssignments.map((assignment) => (
              <OrderCard
                key={assignment._id}
                {...assignment}
                assignmentTitle={highlightText(
                  assignment.assignmentTitle,
                  searchTerm
                )}
                instagramTitle={highlightText(
                  assignment.instagramTitle,
                  searchTerm
                )}
                writerName={
                  assignment.writerName
                    ? highlightText(assignment.writerName, searchTerm)
                    : "Not Assigned"
                }
                deadline={highlightText(assignment.deadline, searchTerm)}
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

export default AdminOrderManagement;
