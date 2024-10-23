import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import { FaHome, FaClipboardList, FaWallet, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";

const SideNavbar = () => {
  const linkStyles = "flex items-center space-x-4 p-2 text-gray-700 hover:text-blue-600 transition";
  const activeLinkStyles = "bg-blue-600 font-medium text-white rounded-md";

  return (
    <div className="h-full w-full bg-white border-red-50 flex flex-col p-6">
      {/* Logo Section */}
      <div className="mb-10">
        <div className="h-12 bg-gray-300 rounded-md mb-2"></div> {/* Placeholder for Logo */}
        <span className="text-lg font-semibold">Random Technology Inc.</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/client-dashboard"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
            >
              <FaHome className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Order</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/payments"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
            >
              <FaWallet className="w-5 h-5" />
              <span>Payments</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reminders"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
            >
              <FaBell className="w-5 h-5" />
              <span>Reminders</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : ""}`
              }
            >
              <FaCog className="w-5 h-5" />
              <span>Help Support</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Sign Out Section */}
      <div className="mt-10">
        <button className="flex items-center space-x-4 text-gray-700 hover:text-red-600 transition">
          <FaSignOutAlt className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
