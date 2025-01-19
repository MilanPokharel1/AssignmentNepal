import React, { useState, useEffect } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import {
  MdApproval,
  MdChevronLeft,
  MdChevronRight,
  MdDisabledByDefault,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import CircularProgress from "@material-ui/core/CircularProgress";
import { cs_clients, manual_register, user_status } from "../../../api/Api";

import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import Card from "../../client/Dashboard/components/Card";
import { User2Icon, UserCircle } from "lucide-react";
import { RiExchangeBoxLine, RiPassPendingFill } from "react-icons/ri";
import { FcApprove } from "react-icons/fc";

import { BiExpandVertical } from "react-icons/bi";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";

const CsUserManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [showPopup, setShowPopup] = useState(false);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [down, setdown] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const handleRowClick = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((rowIndex) => rowIndex !== index)
        : [...prev, index]
    );
    setdown((prev) => !prev);
  };


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");


  const createUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(manual_register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          address: address,
          role: "client",
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      // console.log("success:", data);
      setShowPopup(false)
    } catch (error) {
      console.error("Failed:", error);
    }
  }




  useEffect(() => {
    const fetchclients = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(cs_clients, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        // console.log(data);
        setClients(data.clients); // Assuming the key is 'remainder', set it properly
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchclients();
  }, []);

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

      setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === item._id
            ? {
                ...client,
                accountStatus:
                  item.accountStatus === "enabled" ? "disabled" : "enabled",
              }
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

    const terms = searchTerm.toLowerCase().split(" ").filter(Boolean);
    const regex = new RegExp(`(${terms.join("|")})`, "gi");

    const parts = text.toString().split(regex);

    return parts.map((part, index) =>
      terms.includes(part.toLowerCase()) ? (
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
      !search
        .toLowerCase()
        .split(" ")
        .every((term) =>
          Object.values(item).some(
            (val) => typeof val === "string" && val.toLowerCase().includes(term)
          )
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

  const handleTogglePopup = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(!isPopupOpen);
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
          Icon={User2Icon}
          heading="Total Clients"
          number={`${clients.length}`}
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-yellow-400" }}
        />
        <Card
          Icon={RiPassPendingFill}
          heading="Pending Clients"
          number={`${
            clients.filter((client) => client.status === "pending").length
          }`}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={RiExchangeBoxLine}
          heading="Approved Clients"
          number={`${
            clients.filter((client) => client.status === "approved").length
          }`}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />

        <Card
          Icon={MdDisabledByDefault}
          heading="Declined Clients"
          number={`${
            clients.filter((client) => client.status === "declined").length
          }`}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="relative w-[95%] md:w-3/5 max-w-lg">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full flex flex-row-reverse md:flex-row justify-between items-center gap-4 md:w-auto">
          <button
            className="bg-[#5d5fef] text-white py-2 px-4 rounded-lg inline-flex gap-2 items-center"
            onClick={() => setShowPopup(true)}
          >
            <FaUsers />
            <span>Create Client+</span>
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm">Items per page:</label>
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
              <th className="border-b-2 px-4 py-4 md:hidden">
                <BiExpandVertical className="w-6 h-6" />
              </th>
              <th className="border-b-2 pl-10 py-4 text-left">Name</th>

              <th className="border-b-2 px-4 py-4">Phone Number</th>
              <th className="border-b-2 px-4 py-4 max-md:hidden">Email</th>
              <th className="border-b-2 px-4 py-4 max-md:hidden">Locations</th>
              <th className="border-b-2 px-4 py-4 text-left max-md:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <React.Fragment key={index}>
                  <tr w-52>
                    {" "}
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
                      {highlightText(item.phone, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200 max-md:hidden">
                      {highlightText(item.email, search)}
                    </td>
                    <td className="border-b-2 px-4 py-3 text-center border-gray-200 max-md:hidden">
                      {highlightText(item.address, search)}
                    </td>
                    <td className="border-b-2 px-0 py-3 text-center border-gray-200 flex items-center max-md:hidden">
                      <button className="rounded-lg m-1 flex items-center  border text-sm border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-200 hover:cursor-pointer px-3 py-1">
                        Login
                      </button>
                      <button
                        onClick={() => handleTogglePopup(item, index)}
                        className={`px-3 py-1 rounded-lg m-1  flex items-center border  text-sm border-gray-500 ${
                          item.accountStatus === "enabled"
                            ? "text-red-700"
                            : "text-green-700"
                        } bg-gray-100 hover:bg-gray-200 hover:cursor-pointer`}
                      >
                        {item.accountStatus === "enabled"
                          ? "Disable"
                          : "Enable"}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr>
                      <td
                        colSpan="6"
                        className="border-b-2 px-4 py-3 bg-gray-100"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-4">
                            <p className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow-sm">
                              <div className="flex flex-col space-y-2 w-full">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-gray-600 min-w-[60px]">
                                    Email-
                                  </span>{" "}
                                  <span className="text-gray-800">
                                    {highlightText(item.email, search)}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-600">
                                    <span className="font-bold text-gray-600 min-w-[60px]">
                                      Loaction-
                                    </span>{" "}
                                    {highlightText(item.address, search)}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <button className="rounded-lg px-3 py-1 text-sm border border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors">
                                    Login
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleTogglePopup(item, index)
                                    }
                                    className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                                      item.accountStatus === "enabled"
                                        ? "border-red-500 text-red-700 bg-red-50 hover:bg-red-100"
                                        : "border-green-500 text-green-700 bg-green-50 hover:bg-green-100"
                                    }`}
                                  >
                                    {item.accountStatus === "enabled"
                                      ? "Disable"
                                      : "Enable"}
                                  </button>
                                </div>
                              </div>
                            </p>
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
          <form
            onSubmit={createUser}

            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl sm:max-w-2xl relative">
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200 text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="lastName"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Enter your Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200"
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-[#5d5fef] outline-none transition duration-200 text-lg"
              />
            </div>

            
            {/* Submit Button */}
            <button
              // onClick={() => setShowPopup(false)}
              type="submit"
              className="bg-[#5d5fef] text-white w-40 py-3 mt-6 rounded-lg hover:bg-[#4b4dcc] transition duration-300 mx-auto block"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CsUserManagement;
