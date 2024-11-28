import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const data = [
  {
    name: "Jane Cooper",
    subject: "Microsoft",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    status: "Active",
    accountStatus: "enabled",
  },
  {
    name: "Floyd Miles",
    subject: "Yahoo",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    status: "Inactive",
    accountStatus: "disabled",
  },
  {
    name: "Ronald Richards",
    subject: "Adobe",
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    status: "Inactive",
    accountStatus: "disabled",
  },
  {
    name: "Marvin McKinney",
    subject: "Tesla",
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    status: "Active",
    accountStatus: "enabled",
  },
  {
    name: "Jerome Bell",
    subject: "Google",
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    status: "Active",
    accountStatus: "enabled",
  },
  {
    name: "Kathryn Murphy",
    subject: "Microsoft",
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    status: "Active",
    accountStatus: "enabled",
  },
  {
    name: "Jacob Jones",
    subject: "Yahoo",
    phone: "(208) 555-0112",
    email: "jacob@yahoo.com",
    status: "Active",
    accountStatus: "disabled",
  },
  {
    name: "Kristin Watson",
    subject: "Facebook",
    phone: "(704) 555-0127",
    email: "kristin@facebook.com",
    status: "Inactive",
    accountStatus: "disabled",
  },
  {
    name: "Jane Cooper", // Duplicate entry
    subject: "Microsoft",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    status: "Active",
    accountStatus: "enabled",
  },
  {
    name: "Floyd Miles", // Duplicate entry
    subject: "Yahoo",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    status: "Inactive",
    accountStatus: "disabled",
  },
  // ... (Other entries follow the same pattern)
];

const CsAssignWriter = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  const filteredData = data.filter((item) => {
    if (filter !== "All" && item.status !== filter) return false;
    if (
      search &&
      !Object.values(item).some((val) =>
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
      <h1 className="text-2xl font-bold mb-4 text-center">Writers</h1>
      <div className="flex justify-between items-center mb-4">
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
            onClick={() => setFilter("Active")}
            className={`px-4 py-2 rounded-md ${
              filter === "Active" ? "bg-[#20dcb6]" : "border border-[#7072f0]"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Inactive")}
            className={`px-4 py-2 rounded-md ${
              filter === "Inactive" ? "bg-[#20dcb6]" : "border border-[#7072f0]"
            }`}
          >
            Inactive
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-[#7072f0] rounded p-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mb-6">
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
      </div>
      <div className="min-h-96 bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="w-32 text-gray-500">
              <th className="border-b-2 pl-10 py-4 text-left">Name</th>
              <th className="border-b-2 px-4 py-4">Subject</th>
              <th className="border-b-2 px-4 py-4">Phone Number</th>
              <th className="border-b-2 px-4 py-4">Email</th>

              <th className="border-b-2 pl-20 py-4 flex justify-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="w-52">
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    <div className="flex justify-start items-center gap-3">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                        className="w-8 h-8 rounded-full object-cover"
                        alt={item.name}
                      />
                      <span>{highlightText(item.name, search)}</span>
                    </div>
                  </td>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.subject, search)}
                  </td>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.phone, search)}
                  </td>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.email, search)}
                  </td>

                  <td className="border-b-2 border-gray-200 py-3 text-center flex gap-4 justify-center">
                    <span
                      className={`
      inline-block
      min-w-20
      px-3 
      py-1 
      text-sm
      font-medium
      rounded-lg
      border-2
      hover:cursor-pointer
      ${
        item.accountStatus === "enabled"
          ? item.status === "Active"
            ? "border-emerald-700 text-emerald-700 bg-emerald-50 hover:bg-emerald-200"
            : "border-red-700 text-red-700 bg-red-50 hover:bg-red-200"
          : "border-red-400 text-red-400 bg-gray-100 opacity-50 cursor-not-allowed"
      }
    `}
                      onClick={
                        item.accountStatus === "enabled" ? () => {} : null
                      }
                    >
                      {highlightText(item.status, search)}
                    </span>
                    <span
                      className={`
      inline-block
      min-w-20
      px-3 
      py-1 
      text-sm
      font-medium
      rounded-lg
      border-2
      ${
        item.accountStatus === "enabled"
          ? "border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-200 hover:cursor-pointer"
          : "border-blue-300 text-blue-400 bg-gray-100 opacity-50 cursor-not-allowed"
      }
    `}
                      onClick={
                        item.accountStatus === "enabled" ? () => {} : null
                      }
                    >
                      LogIn
                    </span>
                    <span
                      onClick={() => handleTogglePopup(item, index)}
                      className={`
      inline-block
      min-w-20
      px-3 
      py-1 
      text-sm
      font-medium
      rounded-lg
      border-2
      transition-colors
      duration-200
      ${
        item.accountStatus === "enabled"
          ? "border-gray-500 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
          : "border-blue-500 text-white bg-blue-500 hover:bg-blue-400 hover:cursor-pointer"
      }
    `}
                    >
                      {item.accountStatus === "enabled" ? "Disable" : "Enable"}
                    </span>
                  </td>
                </tr>
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
                ? `Are you sure you want to disable this account? `
                : `Are you sure you want to enable this account?`}
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
                  handleAccountStatusChange(selectedItem, selectedIndex);
                  handleTogglePopup();
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
    </div>
  );
};

export default CsAssignWriter;
