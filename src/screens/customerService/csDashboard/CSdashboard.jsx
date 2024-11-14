import React from "react";
import Card from "./components/Card";
const CSdashboard = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items center p-3">
        <div className="bg-red-400 h-[40vh] w-full md:w-[50%] flex flex-wrap gap-2 pt-5 px-5">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default CSdashboard;
