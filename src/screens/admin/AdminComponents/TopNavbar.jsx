import React, { useState, useEffect } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { useLocation } from "react-router-dom";


const pathToTitleMap = {
  "/admin": "Admin Dashboard",
  "/admin/orders": "Orders",
  "/admin/payments": "Payments",
  "/admin/reminders": "Reminders",
  "/admin/orderrequests": "Order Requests",
}

const AdminTopNavbar = ({ notificationCount = 0, userName = localStorage.getItem("firstName") }) => {
  const location = useLocation();

  const [headerTitle, setHeaderTitle] = useState("");



  useEffect(() => {
    const title = pathToTitleMap[location.pathname];
    if (title) {
      setHeaderTitle(title);
    }
  }, [location.pathname]);


  return (
    <nav className="w-full bg-white px-5 py-4 flex items-center justify-between ">
      <div className="text-xl font-semibold">{headerTitle}</div>

      <div className="flex items-center space-x-4">
        <div className="relative w-auto h-auto p-1 rounded-2xl bg-yellow-100">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdOutlineNotifications className="h-5 w-5 text-yellow-600" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </div>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 mr-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={`${localStorage.getItem("picture")}`}
              // alt={profileIcon}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-700 mr-5">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopNavbar;