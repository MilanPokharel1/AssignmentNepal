import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./Cscomponents/SideNavbar";
import TopNavbar from "./Cscomponents/TopNavbar";

const Client = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkSideNavVisibility = () => {
      const mediaQuery = window.matchMedia("(min-width: 1159px)");
      setIsSideNavVisible(mediaQuery.matches);
    };

    checkSideNavVisibility();
    const mediaQuery = window.matchMedia("(min-width: 100px)");
    mediaQuery.addEventListener("change", checkSideNavVisibility);

    return () => {
      mediaQuery.removeEventListener("change", checkSideNavVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen flex gap-2 bg-white">

      <div className="w-0 SideNavHide2:w-[19%] h-screen bg-gray-50 fixed invisible SideNavHide2:visible">
        <SideNavbar />
      </div>

      
      {!isSideNavVisible && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[80%] max-w-[300px] h-full bg-white z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <SideNavbar
              onClose={() => setIsMobileMenuOpen(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col SideNavHide2:ml-[20%] ">
        <div className="h-[6rem] md:h-[4rem]">
          <TopNavbar
            notificationCount={19}
            isSideNavVisible={isSideNavVisible}
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
