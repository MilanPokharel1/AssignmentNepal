import React, { useState, useEffect } from "react";
import { MdOutlineNotifications, MdMenu } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import writerIcon from "../../../assets/writer.png";
const pathToTitleMap = {
  "/writer": "Dashboard",
  "/writer/writerorder": "Order",
  "/writer/writermytask": "My Task",

  "/writer/writerwithdrawl": "Withdrawl",
  "/writer/writerRemainder": "Reminders",
  "/writer/writerPayments": "Payments",
};

const TopNavbar = ({
  notificationCount = 0,
  userName = localStorage.getItem("firstName") +
    " " +
    localStorage.getItem("lastName"),
  isSideNavVisible = true,
  onMenuClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    const title = pathToTitleMap[location.pathname];
    if (title) {
      setHeaderTitle(title);
    }
  }, [location.pathname]);

  useEffect(() => {
    const pictureUrl =
      "https://icons-for-free.com/iff/png/512/man+person+profile+user+icon-1320073176482503236.png";
    setProfilePicture(pictureUrl);
  }, []);

  return (
    <nav className="w-full bg-white px-4 py-4 flex items-center justify-between shadow-sm pl-1">
      <div className="flex items-center gap-4">
        {!isSideNavVisible && (
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onMenuClick}
          >
            <MdMenu className="h-11 w-11 text-gray-600" />
          </button>
        )}
        <div className="text-xl font-semibold">{headerTitle}</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-auto h-auto p-1 rounded-2xl bg-yellow-100">
          <button
            onClick={() => navigate("/writer/writerRemainder")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdOutlineNotifications className="h-5 w-5 text-yellow-600" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2 mr-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={writerIcon || ""}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-700 mr-5">
            {userName}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
