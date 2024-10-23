import React from "react";

const AssignmentCard = ({ status, title, payment, dueDate, writer }) => {
  const statusColors = {
    Ongoing: "bg-yellow-100 text-yellow-600",
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-orange-100 text-orange-600",
  };

  const paymentColors = {
    Initial: "bg-red-100 text-red-600",
    "Mid pay": "bg-yellow-100 text-yellow-600",
    "Final pay": "bg-green-100 text-green-600",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-[300px]">
      {/* Status Tag */}
      <div className={`w-min px-2 py-1 rounded-full ${statusColors[status]}`}>
        {status}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>

      {/* Payment Badge */}
      <div
        className={`w-fit  px-3 py-1 mt-2 text-sm font-medium rounded-lg ${paymentColors[payment]}`}
      >
        Payment: {payment}
      </div>

      {/* Writer and Due Date Section */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={writer.avatar}
            alt="Writer"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{writer.name}</span>
        </div>
        <span className="text-xs text-gray-500">Due: {dueDate}</span>
      </div>
    </div>
  );
};

export default AssignmentCard;
