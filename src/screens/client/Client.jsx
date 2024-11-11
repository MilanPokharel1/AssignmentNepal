import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./ClientComponents/SideNavbar";
import TopNavbar from "./ClientComponents/TopNavbar";

const Client = () => {
  return (
    <div className="min-h-screen flex gap-2 bg-white">

      <div className="w-0 SideNavHide:w-[19%] h-screen bg-gray-50 fixed invisible SideNavHide:visible">
        <SideNavbar />
      </div>
      <div className="flex flex-1 flex-col SideNavHide:ml-[20%] ml-[4vw]">
        <div className="h-[4rem]">
          <TopNavbar notificationCount={19} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;