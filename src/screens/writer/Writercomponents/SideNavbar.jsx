import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaBell, FaSignOutAlt, FaTimes } from "react-icons/fa";
import logo from "../../../assets/random-logo.png";
import { RiPieChart2Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { get_logoqr, imagePath } from "../../../api/Api";

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

      <div className="w-[98%]  gap-7 flex-col flex h-[50%] justify-between navbarClass2">
        <div>
          <NavLink
            to="/writer"
            end
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""} mb-3`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <RiPieChart2Fill className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
        </div>


        <div>
          <NavLink
            to="/writer/writerorder"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <MdShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/writer/writermytask"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaPenAlt className="w-5 h-5" />
            <span>My Task</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/writer/writerwithdrawl"
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
            to="/writer/writerRemainder"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaBell className="w-5 h-5" />
            <span>Remainder</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/writer/writerPayments"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? activeLinkStyles : ""}`
            }
            onClick={() => isMobile && onClose?.()}
          >
            <FaWallet className="w-5 h-5" />
            <span>Payments</span>
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
