import React, { useState, useEffect } from "react";
import { FaPenFancy, FaSearch } from "react-icons/fa";
import {
  MdAssignmentTurnedIn,
  MdChevronLeft,
  MdChevronRight,
  MdDisabledByDefault,
} from "react-icons/md";
import CircularProgress from "@material-ui/core/CircularProgress";
import { cs_writers, user_status } from "../../../api/Api";
import { FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Card from "../../client/Dashboard/components/Card";

import { RiExchangeBoxLine } from "react-icons/ri";
import { BiExpandVertical } from "react-icons/bi";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
const AdminWritersManagement = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [down, setdown] = useState(false);

  const handleRowClick = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((rowIndex) => rowIndex !== index)
        : [...prev, index]
    );
    setdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchwriters = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(cs_writers, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        console.log(data);
        setWriters(data.writers); // Assuming the key is 'remainder', set it properly
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchwriters();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsPopupOpen(!isPopupOpen);
  };
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

  const changeUserStatus = async (item) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token

      const response = await fetch(user_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: item._id, status: item.accountStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to change status");
      }

      setWriters((prevWriters) =>
        prevWriters.map((writer) =>
          writer._id === item._id
            ? {
                ...writer,
                accountStatus:
                  item.accountStatus === "enabled" ? "disabled" : "enabled",
              }
            : writer
        )
      );
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = writers.filter((item) => {
    if (filter !== "All" && item.writerStatus !== filter) return false;

    if (
      search &&
      !Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;

    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesShown = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + totalPagesShown - 1);

    if (totalPages - startPage < totalPagesShown) {
      startPage = Math.max(1, totalPages - totalPagesShown + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 mx-0.5 rounded bg-gray-100 hover:bg-gray-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-0.5 rounded ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 mx-0.5 rounded bg-gray-100 hover:bg-gray-200"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen p-4">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-5">
        <Card
          Icon={FaPenFancy}
          heading="Total Writers"
          number={`${writers.length}`}
          theme={{ bgColor: "bg-orange-100", iconBgColor: "bg-orange-400" }}
        />
        <Card
          Icon={MdAssignmentTurnedIn}
          heading="Assigned Writers"
          number={`${
            writers.filter((writer) => writer.status === "assigned").length
          }`}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={RiExchangeBoxLine}
          heading="Enabled Writers"
          number={`${
            writers.filter((writer) => writer.accountStatus === "enabled")
              .length
          }`}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />

        <Card
          Icon={MdDisabledByDefault}
          heading="Disabled Writers"
          number={`${
            writers.filter((writer) => writer.accountStatus === "disabled")
              .length
          }`}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Writers</h1>

      <div className="flex justify-between items-center mb-6 ">
        <div className="relative w-[60%] max-w-lg">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-11 items-start sm:items-center sm:justify-between mr-0 sm:mr-14">
          {/* Create Writer Button */}
          <button
            className="bg-[#5d5fef] text-white py-2 px-4 rounded-lg flex gap-2 items-center justify-center whitespace-nowrap w-full sm:w-auto"
            onClick={() => setShowPopup(true)}
          >
            <FaUsers />
            <span>Create writer +</span>
          </button>

          {/* Items per page section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center w-full sm:w-auto gap-2">
            <label className="text-sm sm:text-base w-full sm:w-auto text-left">
              Items per page:
            </label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-[#7072f0] rounded p-2 w-full sm:w-auto"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 rounded-md ${
              filter === "All" ? "bg-[#20dcb6]" : "border border-[#7072f0]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("assigned")}
            className={`px-4 py-2 rounded-md ${
              filter === "assigned" ? "bg-[#20dcb6]" : "border border-[#7072f0]"
            }`}
          >
            Assigned
          </button>
          <button
            onClick={() => setFilter("unassigned")}
            className={`px-4 py-2 rounded-md ${
              filter === "unassigned"
                ? "bg-[#20dcb6]"
                : "border border-[#7072f0]"
            }`}
          >
            Unassigned
          </button>
        </div>
      </div>
      <div className="min-h-96 bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="w-32 text-gray-500">
              <th className="border-b-2 px-4 py-4 md:hidden">
                <BiExpandVertical className="w-6 h-6" />
              </th>
              <th className="border-b-2 pl-10 py-4 text-left">Name</th>
              <th className="border-b-2 px-4 py-4">Subject</th>
              <th className="border-b-2 px-4 py-4">Phone Number</th>
              <th className="border-b-2 px-4 py-4 max-md:hidden">Email</th>
              <th className="border-b-2 pl-20 py-4 max-md:hidden">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="w-52">
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200 md:hidden">
                      {down ? (
                        <MdOutlineExpandLess
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleRowClick(index)}
                        />
                      ) : (
                        <MdOutlineExpandMore
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleRowClick(index)}
                        />
                      )}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      <div className="flex justify-start items-center gap-3">
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                          className="w-8 h-8 rounded-full object-cover"
                          alt={item.name}
                        />
                        <span>
                          {highlightText(item.firstName, search)}{" "}
                          {highlightText(item.lastName, search)}
                        </span>
                      </div>
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      {highlightText(item.catagory, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                      {highlightText(item.phone, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200 max-md:hidden">
                      {highlightText(item.email, search)}
                    </td>
                    <td className="border-b-2 border-gray-200 py-3 text-center max-md:hidden">
                      <div className="flex gap-4 justify-center">
                        <span
                          className={`inline-block min-w-20 px-3 py-1 text-sm font-medium rounded-lg border-2 hover:cursor-pointer ${
                            item.accountStatus === "enabled"
                              ? item.status === "Assigned"
                                ? "border-emerald-700 text-emerald-700 bg-emerald-50 hover:bg-emerald-200"
                                : "border-red-700 text-red-700 bg-red-50 hover:bg-red-200"
                              : "border-red-400 text-red-400 bg-gray-100 opacity-50 cursor-not-allowed"
                          }`}
                          onClick={
                            item.accountStatus === "enabled" ? () => {} : null
                          }
                        >
                          {highlightText(item.writerStatus, search)}
                        </span>
                        <span
                          className={`inline-block min-w-20 px-3 py-1 text-sm font-medium rounded-lg border-2 ${
                            item.accountStatus === "enabled"
                              ? "border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-200 hover:cursor-pointer"
                              : "border-blue-300 text-blue-400 bg-gray-100 opacity-50 cursor-not-allowed"
                          }`}
                          onClick={
                            item.accountStatus === "enabled" ? () => {} : null
                          }
                        >
                          LogIn
                        </span>
                        <span
                          onClick={() => handleTogglePopup(item, index)}
                          className={`inline-block min-w-20 px-3 py-1 text-sm font-medium rounded-lg border-2 transition-colors duration-200 ${
                            item.accountStatus === "enabled"
                              ? "border-gray-500 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
                              : "border-blue-500 text-white bg-blue-500 hover:bg-blue-400 hover:cursor-pointer"
                          }`}
                        >
                          {item.accountStatus === "enabled"
                            ? "Disable"
                            : "Enable"}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {/* Conditionally render the expandable row */}
                  {expandedRows.includes(index) && (
                    <tr>
                      <td
                        colSpan="6"
                        className="border-b-2 px-4 py-3 bg-gray-100"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-4">
                            <p className=" flex items-center space-x-2 gap-2">
                              <span className="font-bold text-gray-500">
                                Email-
                              </span>
                              {highlightText(item.email, search)}
                            </p>
                          </div>

                          <div className="flex gap-3 flex-wrap justify-center items-center">
                            <span
                              className={`inline-block min-w-[5rem] px-3 py-1 text-sm font-medium rounded-lg border-2 text-center transition-all duration-200 ${
                                item.accountStatus === "enabled"
                                  ? item.status === "Assigned"
                                    ? "border-emerald-700 text-emerald-700 bg-emerald-50 hover:bg-emerald-200"
                                    : "border-red-700 text-red-700 bg-red-50 hover:bg-red-200"
                                  : "border-red-400 text-red-400 bg-gray-100 opacity-50 cursor-not-allowed"
                              }`}
                              onClick={
                                item.accountStatus === "enabled"
                                  ? () => {}
                                  : null
                              }
                            >
                              {highlightText(item.writerStatus, search)}
                            </span>

                            <span
                              className={`inline-block min-w-[5rem] px-3 py-1 text-sm font-medium rounded-lg border-2 text-center transition-all duration-200 ${
                                item.accountStatus === "enabled"
                                  ? "border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-200 hover:cursor-pointer"
                                  : "border-blue-300 text-blue-400 bg-gray-100 opacity-50 cursor-not-allowed"
                              }`}
                              onClick={
                                item.accountStatus === "enabled"
                                  ? () => {}
                                  : null
                              }
                            >
                              LogIn
                            </span>

                            <span
                              onClick={() => handleTogglePopup(item, index)}
                              className={`inline-block min-w-[5rem] px-3 py-1 text-sm font-medium rounded-lg border-2 text-center transition-all duration-200 ${
                                item.accountStatus === "enabled"
                                  ? "border-gray-500 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
                                  : "border-blue-500 text-white bg-blue-500 hover:bg-blue-400 hover:cursor-pointer"
                              }`}
                            >
                              {item.accountStatus === "enabled"
                                ? "Disable"
                                : "Enable"}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="h-64 border px-4 py-2">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No data to display
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-1 mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100"
        >
          <MdChevronLeft className="w-5 h-5" />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100"
        >
          <MdChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Action
            </h2>
            <p className="text-gray-600 mb-6">
              {selectedItem.accountStatus === "enabled"
                ? `Are you sure you want to disable ${
                    selectedItem.firstName
                  }${" "}${selectedItem.lastName}? `
                : `Are you sure you want to enable ${
                    selectedItem.firstName
                  }${" "}${selectedItem.lastName}?`}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleTogglePopup}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement the actual enable/disable logic here

                  changeUserStatus(selectedItem);
                  handleTogglePopup(selectedItem);
                }}
                className={`
            px-4 
            py-2 
            rounded-lg 
            transition-colors
            ${
              selectedItem.accountStatus === "enabled"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
          `}
              >
                {selectedItem.accountStatus === "enabled"
                  ? "Disable"
                  : "Enable"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl sm:max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300"
              aria-label="Close popup"
            >
              <IoMdClose size={24} />
            </button>

            {/* Form Header */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Create Writer
            </h2>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Phone Number, Email, and Address Fields */}
            <div className="mt-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200 text-lg"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200 text-lg"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200 text-lg"
              />
            </div>

            {/* Categories Input */}
            <div className="mt-6">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <input
                id="categories"
                type="text"
                placeholder="Enter categories"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#5d5fef] text-white w-40 py-3 mt-6 rounded-lg hover:bg-[#4b4dcc] transition duration-300 mx-auto block"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWritersManagement;
