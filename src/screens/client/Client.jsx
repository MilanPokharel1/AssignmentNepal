import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./ClientComponents/SideNavbar";
import TopNavbar from "./ClientComponents/TopNavbar";
const Client = () => {
  return (
    <div className="min-h-screen flex gap-2">
      <div className="w-[19%] h-screen bg-gray-50 fixed">
        <SideNavbar />
      </div>
      <div className="flex flex-1 flex-col ml-[20%]">
        <div className="h-[4rem]">
          <TopNavbar notificationCount={19} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;