import React, { useState, useEffect } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CircularProgress from "@material-ui/core/CircularProgress";
import { change_pending_user, pending_users } from "../../../api/Api";



const data = [
  {
    id: 1,
    name: "Jane Cooper",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: "approved",
  },
  {
    id: 2,
    name: "Floyd Miles",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: "pending",
  },
  {
    id: 3,
    name: "Ronald Richards",
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: "pending",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    country: "Iran",
    status: "approved",
  },
  {
    id: 5,
    name: "Jerome Bell",
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    country: "Reunion",
    status: "approved",
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    country: "Curacao",
    status: "pending",
  },
  {
    id: 7,
    name: "Jacob Jones",
    phone: "(208) 555-0112",
    email: "jacob@yahoo.com",
    country: "Brazil",
    status: "approved",
  },
  {
    id: 8,
    name: "Kristin Watson",
    phone: "(704) 555-0127",
    email: "kristin@facebook.com",
    country: "Aland Islands",
    status: "pending",
  },
  {
    id: 9,
    name: "Jane Cooper", // Duplicate entry
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: "approved",
  },
  {
    id: 10,
    name: "Floyd Miles", // Duplicate entry
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: "pending",
  },
  {
    id: 11,
    name: "Ronald Richards", // Duplicate entry
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: "pending",
  },
  {
    id: 12,
    name: "Marvin McKinney", // Duplicate entry
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    country: "Iran",
    status: "approved",
  },
  {
    id: 13,
    name: "Jerome Bell", // Duplicate entry
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    country: "Reunion",
    status: "approved",
  },
  {
    id: 14,
    name: "Kathryn Murphy", // Duplicate entry
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    country: "Curacao",
    status: "pending",
  },
  {
    id: 15,
    name: "Jacob Jones", // Duplicate entry
    phone: "(208) 555-0112",
    email: "jacob@yahoo.com",
    country: "Brazil",
    status: "approved",
  },
  {
    id: 16,
    name: "sachet Khatiwada",
    phone: "(704) 555-0127",
    email: "kristin@facebook.com",
    country: "Aland Islands",
    status: "pending",
  },
];

const CsClientRequest = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchclients = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(pending_users, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();
        console.log(data)
        setClients(data.pendingUsers);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchclients();
  }, []);



  const changeUserStatus = async (item, status) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token

      const response = await fetch(change_pending_user, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: item._id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to change status");
      }

      setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === item._id
            ? { ...client, status }
            : client
        )
      );
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {

      setIsLoading(false);
    }
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
  const filteredData = clients.filter((item) => {
    if (
      search &&
      !Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

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
          className={`px-3 py-1 mx-0.5 rounded ${currentPage === i
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
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <div className="flex justify-between items-center mb-4">
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
        <div className="flex gap-11 items-center mr-14">
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
      </div>
      <div className="flex justify-end mb-6"></div>
      <div className="min-h-96 bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="w-32 text-gray-400">
              <th className="border-b-2 pl-10 py-4 text-left">Name</th>

              <th className="border-b-2 px-4 py-4">Phone Number</th>
              <th className="border-b-2 px-4 py-4">Email</th>
              <th className="border-b-2 px-4 py-4">Locations</th>
              <th className="border-b-2 px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    <div className="flex justify-start items-center gap-3">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                        className="w-8 h-8 rounded-full object-cover"
                        alt={item.name}
                      />
                      <span>{highlightText(item.firstName, search)}{" "}{highlightText(item.lastName, search)}</span>
                    </div>
                  </td>

                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.phone, search)}
                  </td>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.email, search)}
                  </td>
                  <td className="border-b-2 px-4 py-3 text-center border-gray-200">
                    {highlightText(item.address, search)}
                  </td>
                  <td className="border-b-2 px-0 py-3 text-center border-gray-200 flex items-center">
                    {item.status === "pending" ? (
                      <>
                        <button
                          onClick={() => {
                            changeUserStatus(item, "approved")
                          }}
                          className="rounded-lg m-1 flex items-center border text-sm border-green-700 text-green-700 bg-green-50 hover:bg-green-200 hover:cursor-pointer px-3 py-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            changeUserStatus(item, "declined")
                          }}
                          className="px-3 py-1 rounded-lg m-1 flex items-center border text-sm border-red-500 text-red-700 bg-red-100 hover:bg-gray-200 hover:cursor-pointer">
                          Decline
                        </button>
                      </>
                    ) : (
                      <button
                        disabled
                        className={`px-3 py-1 rounded-lg m-1 flex${item.status == "approved" ? "border-green-700 text-green-700" : "border-red-700 text-red-700"} items-center border text-sm  bg-green-50 opacity-50 cursor-not-allowed`}
                      >
                        {item.status}
                      </button>
                    )}
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
    </div>
  );
};

export default CsClientRequest;
