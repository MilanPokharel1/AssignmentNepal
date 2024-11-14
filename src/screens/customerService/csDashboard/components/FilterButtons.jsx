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
              ? "bg-emerald-400 text-black"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("active")}
        className={`px-6 py-2 rounded-full text-base transition-colors
          ${
            activeFilter === "active"
              ? "bg-emerald-400 text-black"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange("inactive")}
        className={`px-6 py-2 rounded-full text-base transition-colors
          ${
            activeFilter === "inactive"
              ? "bg-emerald-400 text-black"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
      >
        Inactive
      </button>
    </div>
  );
};

export default FilterButtons;
