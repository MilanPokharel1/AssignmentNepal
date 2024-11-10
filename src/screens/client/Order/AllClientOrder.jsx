import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import AssignmentCard from "./Components/AssignmentCard";
import FilterButtons from "./Components/FilterButtons";
import { ImSearch } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import ClientOrderPopup from "./Components/ClientOrderPopup";
import { get_orders } from "../../../api/Api";

const AllClientOrder = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);
  const [orderPopup, setorderPopup] = useState(false);
  const [assignments, setAssignments] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_orders, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
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
      }
      finally {
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

  const filteredAssignments = assignments
    .filter((assignment) => {
      if (activeFilter === "all") return true;
      return assignment.status === activeFilter;
    })
    .filter((assignment) => {
      const search = normalizeText(searchTerm);
      return (
        normalizeText(assignment.assignmentTitle).includes(search) ||
        normalizeText(assignment.deadline).includes(search) ||
        (assignment.writerName && normalizeText(assignment.writerName).includes(search))
      );
    });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

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
      <div className="flex flex-row-reverse px-4 mt-5 max-w-[85%]">
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
          <button
            onClick={() => setorderPopup(true)}
            className="px-4 py-2 rounded-lg text-sm mt-4 text-white bg-[#5d5fef] hover:bg-purple-600 transition-colors">
            +Create Order
          </button>
          {orderPopup && <ClientOrderPopup setorderPopup={setorderPopup} />}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          {isLoading == true || sortedAssignments.length > 0 ? (
            sortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                {...assignment}
                assignmentTitle={highlightText(assignment.assignmentTitle, searchTerm)}
                writerName={assignment.writerName ? highlightText(assignment.writerName, searchTerm) : "Not Assigned"}

                deadline={highlightText(assignment.deadline, searchTerm)}
              />
            ))
          ) : (
            <div className="flex mx-auto w-[50%] items-center">
            <NoDataFound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClientOrder;
