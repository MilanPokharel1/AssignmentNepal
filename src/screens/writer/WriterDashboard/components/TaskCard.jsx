import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    status,
    amount,
    dueDate,
    assignee,
    payments = [{ paidAmount: 400 }],
    totalAmount = amount ? parseInt(amount.replace("Rs ", "")) : 5000,
    writer
  } = task;

  const paidAmount = payments[0].paidAmount;

  const statusColors = {
    "in-process": "bg-yellow-200 text-yellow-700",
    done: "bg-purple-100 text-purple-600",
    completed: "bg-green-100 text-green-600",
    pending: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full drop-shadow-2xl">
      <div className="flex justify-between items-center mt-4 border-b-2 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900">
              {assignee.name}
            </span>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm capitalize ${
            statusColors[status.toLowerCase()]
          }`}
        >
          {status}
        </div>
      </div>

      <div className="border-b-2 mb-2">
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-start">
            <div className="text-sm font-medium text-gray-700 flex-shrink-0">
              Assignment title:
            </div>
            <span className="text-gray-900 ml-2 truncate w-72 inline-block overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </span>
          </div>
        </div>

        <span className="text-xs text-red-500">Due {dueDate}</span>

        <div className="mb-2">
          <div className="text-sm text-gray-600">
            Total Amount: <span className="font-medium">{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900">
              {writer}
            </span>
            <span className="text-sm text-gray-600">Writer</span>
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate(`/client/orders/view/${_id}`)}
            className="px-3 py-1 text-sm text-white bg-[#9E9FEE] hover:bg-purple-400 rounded-md transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;