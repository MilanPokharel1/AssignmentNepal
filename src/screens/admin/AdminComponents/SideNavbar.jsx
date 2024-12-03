import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaBell, FaCog, FaSignOutAlt, FaTimes, FaUserPlus } from "react-icons/fa";
import logo from "../../../assets/random-logo.png";
import { RiPieChart2Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { Settings } from "lucide-react";
const SideNavbar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();

  const linkStyles =
    "flex items-center space-x-4 pl-6 text-gray-600 transition-all duration-300 ease-in-out py-2";
  const activeLinkStyles = "bg-[#5d5fef] text-white rounded-md py-2";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("picture");
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
        <img src={logo} className="w-full object-cover" alt="logo" />
      </div>

      <div className="w-[98%]  gap-4 flex-col flex h-[50%] justify-between navbarClass2">
        <div>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""} mb-8`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <RiPieChart2Fill className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/admin/adminordermanagement"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <MdShoppingCart className="w-5 h-5" />
            <span>Order Management</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/adminwritermanagement"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaUser className="w-5 h-5" />
            <span>Writers</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/adminusermanagement"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaUsers className="w-5 h-5" />
            <span>Clients</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/clientrequest"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaUserPlus className="w-5 h-5" />
            <span>Client Request</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/adminCS"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <RiShieldUserFill className="w-5 h-5" />
            <span>Customer Service</span>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/admin/adminWithdrawal"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaMoneyBillWave className="w-5 h-5" />
            <span>Withdrawl Requests</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/adminreminders"
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
            to="/admin/adminpayments"
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
            to="/admin/adminsettings"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </div>
        <div className="mt-9 pl-7">
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
