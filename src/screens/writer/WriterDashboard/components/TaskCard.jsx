import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const {
    _id,
    assignmentTitle,
    status,
    deadline,
    firstName,
    lastName,
    payments = [{ paidAmount: 400 }],
    totalAmount = amount ? parseInt(amount.replace("Rs ", "")) : 5000,
    writerName,
    writerId,
    price,
  } = task;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
  };
  const statusColors = {
    ongoing: "bg-blue-100 text-blue-600", // Blue for tasks in progress
    submitted: "bg-yellow-100 text-yellow-600", // Yellow for tasks submitted but not finalized
    completed: "bg-green-100 text-green-600", // Green for completed tasks
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl w-full lg:w-[40%] sm:max-lg:w-full drop-shadow-2x2">
      <div className="flex justify-between items-center mt-4 border-b-2 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            className="w-8 h-8 rounded-full object-cover"
            alt="Profile"
          />
          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
              {firstName} {lastName}
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
          <div className="flex items-start flex-col sm:flex-row">
            <div className="text-sm font-medium text-gray-700 flex-shrink-0">
              Assignment title:
            </div>
            <span className="text-gray-900 ml-2 w-96 line-clamp-2 overflow-hidden text-ellipsis">
              {assignmentTitle}
            </span>
          </div>
        </div>

        <span className="text-xs text-red-500">Due {formatDate(deadline)}</span>

        <div className="mb-2">
          <div className="text-sm text-gray-600">
            Total Amount:{" "}
            <span className="font-medium">{price ? price : "-"}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
            className="w-8 h-8 rounded-full object-cover"
            alt="Writer"
          />
          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
              {writerName}
            </span>
            <span className="text-sm text-gray-600">Writer</span>
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate(`/writer/writermytask/writerView/${_id}`)}
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
