import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaWallet,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
// import logo from "../../../assets/random-logo.png";
import { RiPieChart2Fill } from "react-icons/ri";
import { UseTheme } from "../../../contexts/ThemeContext/useTheme.js";
import { get_logoqr, imagePath } from "../../../api/Api.jsx";
const SideNavbar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();


const [logo, setLogo] = useState({});


  const getValidImageUrl = (filePath) => {
    // console.log(filePath)
    const serverBaseUrl = imagePath; // Replace with your server's base URL
    try {
      return filePath?.replace(
        "/root/assignmentNepal/assignmentNepalBackend/public/uploads/",
        `${serverBaseUrl}/uploads/`
      );
    } catch (error) {
      return filePath
    }

  };


  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_logoqr, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch logo");
        }

        const data = await response.json();
        setLogo(data.logoqrcode.logo);
        // console.log("image: ", data.logoqrcode);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);




  const { currentTheme, themes } = UseTheme();
  const linkStyles =
    "flex items-center space-x-4 pl-6 text-gray-600 transition-all duration-300 ease-in-out py-2";
  const activeLinkStyles = `bg-[${themes[currentTheme].navActive}] text-white rounded-md py-2`;
  const dashboardActiveStyles = `bg-[${themes[currentTheme].navActive}] text-white font-medium rounded-md py-2  dashboardActiveheight:text-xl transform scale-105`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("picture");
    localStorage.removeItem("role");
    if (isMobile && onClose) {
      onClose();
    }
    navigate("/");
  };

  return (
    <div className="h-full w-full bg-white flex flex-col p-6 shadow-xl drop-shadow-lg relative">
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaTimes className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div className="w-44 h-22 overflow-hidden mx-auto mb-10">
        <img src={getValidImageUrl(logo)} className="w-full object-cover" alt="logo" />
      </div>

      <div className="w-[74%] mx-auto space-y-4 flex-col flex h-[50%] justify-between navbarClass">
        <div>
          <NavLink
            to="/client"
            end
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? dashboardActiveStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <RiPieChart2Fill className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <NavLink
              to="/client/orders"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
              onClick={() => isMobile && onClose?.()}
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Order</span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/client/payments"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
              onClick={() => isMobile && onClose?.()}
            >
              <FaWallet className="w-5 h-5" />
              <span>Payments</span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/client/reminders"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
              onClick={() => isMobile && onClose?.()}
            >
              <FaBell className="w-5 h-5" />
              <span>Reminders</span>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/client/helpsupport"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
              onClick={() => isMobile && onClose?.()}
            >
              <FaCog className="w-5 h-5" />
              <span>Help Support</span>
            </NavLink>
          </div>
        </div>
        <div className="mt-5 pl-7">
          <button className="flex items-center space-x-4 text-gray-700 hover:text-red-600 transition">
            <FaSignOutAlt className="w-5 h-5" />
            <span onClick={handleLogout}>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
