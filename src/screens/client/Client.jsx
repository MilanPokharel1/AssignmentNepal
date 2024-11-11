import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./ClientComponents/SideNavbar";
import TopNavbar from "./ClientComponents/TopNavbar";
const Client = () => {
  return (
    <div className="min-h-screen flex gap-2 bg-white">
      <div className="SideNavHide:w-[19%] SideNavHide:h-screen SideNavHide:bg-gray-50 SideNavHide:fixed hidden SideNavHide:block">
        <SideNavbar />
      </div>
      <div className="flex flex-1 flex-col w-full ">
        <div className="h-[4rem]">
          <TopNavbar notificationCount={19} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
