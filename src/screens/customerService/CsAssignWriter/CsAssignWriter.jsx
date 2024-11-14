import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const data = [
  {
    name: "Jane Cooper",
    subject: "Microsoft",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: "Active",
  },
  {
    name: "Floyd Miles",
    subject: "Yahoo",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: "Inactive",
  },
  {
    name: "Ronald Richards",
    subject: "Adobe",
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: "Inactive",
  },
  {
    name: "Marvin McKinney",
    subject: "Tesla",
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    country: "Iran",
    status: "Active",
  },
  {
    name: "Jerome Bell",
    subject: "Google",
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    country: "Reunion",
    status: "Active",
  },
  {
    name: "Kathryn Murphy",
    subject: "Microsoft",
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    country: "Curacao",
    status: "Active",
  },
  {
    name: "Jacob Jones",
    subject: "Yahoo",
    phone: "(208) 555-0112",
    email: "jacob@yahoo.com",
    country: "Brazil",
    status: "Active",
  },
  {
    name: "Kristin Watson",
    subject: "Facebook",
    phone: "(704) 555-0127",
    email: "kristin@facebook.com",
    country: "Aland Islands",
    status: "Inactive",
  },
];

const CsAssignWriter = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Writers</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded ${
            filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          className={`px-4 py-2 rounded ${
            filter === "Active" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("Inactive")}
          className={`px-4 py-2 rounded ${
            filter === "Inactive" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Inactive
        </button>
      </div>
      <div className="flex items-center mb-4">
        <FaSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-32">
            <th className="border-b-2 px-4 py-4 text-left pl-4">Name</th>
            <th className="border-b-2 px-4 py-4">Subject</th>
            <th className="border-b-2 px-4 py-4">Phone Number</th>
            <th className="border-b-2 px-4 py-4">Email</th>
            <th className="border-b-2 px-4 py-4">Country</th>
            <th className="border-b-2 px-4 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index} className="w-52">
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  <div className="flex justify-start items-center gap-3 ">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  {item.subject}
                </td>
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  {item.phone}
                </td>
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  {item.email}
                </td>
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  {item.country}
                </td>
                <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                  <span className="border-2 border-emerald-700 px-2 py-1 rounded-lg">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border px-4 py-2 text-center">
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="p-2 rounded bg-gray-200 disabled:opacity-50"
        >
          <MdFirstPage />
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 rounded bg-gray-200 disabled:opacity-50"
        >
          <MdChevronLeft />
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-gray-200 disabled:opacity-50"
        >
          <MdChevronRight />
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-gray-200 disabled:opacity-50"
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  );
};

export default CsAssignWriter;
