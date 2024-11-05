import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./ClientComponents/SideNavbar";
import TopNavbar from "./ClientComponents/TopNavbar";

const Client = () => {
  return (
    <div className="min-h-screen flex gap-2">
      <div className="hidden SideNavHide:block w-[19%] min-h-screen bg-gray-50 fixed left-0 top-0">
        <SideNavbar />
      </div>

      <div className="flex flex-1 flex-col SideNavHide:ml-[19%]">
        <div className="h-[4rem]">
          <TopNavbar notificationCount={19} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
 