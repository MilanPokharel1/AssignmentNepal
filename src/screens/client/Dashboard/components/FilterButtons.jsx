import React, { useState, useEffect } from "react";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const buttons = [
    "all",
    "pending",
    "approved",
    "ongoing",
    "submitted",
    "completed",
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-gray-700">Find by:</span>
          <select
            className="px-4 py-2 outline-none rounded-lg capitalize bg-gray-100 text-gray-700"
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            {buttons.map((button) => (
              <option key={button} value={button}>
                {button}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex gap-4 mt-4">
          {buttons.map((button) => (
            <button
              key={button}
              className={`px-4 py-2 rounded-lg capitalize filterbtn ${
                activeFilter === button
                  ? "bg-[#5d5fef] text-white"
                  : "bg-gray-100 text-gray-700"
              } transition-colors`}
              onClick={() => onFilterChange(button)}
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButtons;
