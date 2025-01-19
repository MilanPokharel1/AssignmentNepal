import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
// import logo from "../../../assets/random-logo.png";
import { RiPieChart2Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { Settings } from "lucide-react";
import { FaFolder } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { get_logoqr, get_new_orders_count, imagePath, reset_count } from "../../../api/Api";
const SideNavbar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();
  const [newOrders, setNewOrders] = useState(0);
  // const [data, setData] = useState({});
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
    const fetchOrdersCount = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_new_orders_count, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        // setData(data);
        console.log("ordercount: ", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrdersCount();
  }, []);


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
        console.log("image: ", data.logoqrcode);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);



  const handleSeenReset = async (countof) => {
    // console.log("clicked: ");
    if (newOrders == 0) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await fetch(reset_count, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ countof }),
      });
    } catch (error) {
      console.error("error:", error);
    } finally {
      setNewOrders(0);
    }
  };

  const linkStyles =
    "flex items-center space-x-4 pl-6 text-gray-600 transition-all duration-300 ease-in-out py-2";
  const activeLinkStyles = "bg-[#5d5fef] text-white rounded-md py-2";

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
    <div className="h-full w-full bg-white flex flex-col p-6 shadow-xl drop-shadow-lg relative overflow-y-auto">
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
            // onClick={() => isMobile && onClose?.(handleSeenReset())}
            onClick={() => {
              handleSeenReset("order");
              if (isMobile && onClose) {
                onClose();
              }
            }}
          >
            <MdShoppingCart className="w-5 h-5" />
            <span>Order Management</span>
            {newOrders > 0 && (
              <span className="bg-red-600 text-white font-semibold text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {newOrders}
              </span>
            )}

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
            to="/admin/adminfile"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaFolder className="w-5 h-5" />
            <span>File Transfer</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/admin/adminqrrequest"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <BsQrCode className="w-5 h-5" />
            <span>QR request</span>
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
