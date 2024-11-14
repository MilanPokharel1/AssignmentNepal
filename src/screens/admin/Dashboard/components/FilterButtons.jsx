// FilterButtons.jsx
import React from "react";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-6 py-2 rounded-full text-base transition-colors
          ${
            activeFilter === "all"
              ? "bg-[#20dcb6]"
              : "bg-white text-gray-700 border border-[#7072f0]"
          }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("active")}
        className={`px-6 py-2 rounded-full text-base transition-colors
          ${
            activeFilter === "active"
              ? "bg-[#20dcb6]"
              : "bg-white text-gray-700 border border-[#7072f0]"
          }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange("inactive")}
        className={`px-6 py-2 rounded-full text-base transition-colors
          ${
            activeFilter === "inactive"
              ? "bg-[#20dcb6]"
              : "bg-white text-gray-700 border border-[#7072f0]"
          }`}
      >
        Inactive
      </button>
    </div>
  );
};

export default FilterButtons;
