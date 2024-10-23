import React from "react";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const buttons = ["All", "Ongoing", "Completed", "Pending"];

  return (
    <div className="flex gap-4 mt-4">
      {buttons.map((button) => (
        <button
          key={button}
          className={`px-4 py-2 rounded-lg ${
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
  );
};

export default FilterButtons;
