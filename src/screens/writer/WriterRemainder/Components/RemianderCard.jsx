import React from "react";
import { PiSirenFill } from "react-icons/pi";
import { GrAnnounce } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";

export const ReminderCard = ({
  title,
  date,
  type,
  description,
  clientName,
}) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
  };
  const getIconContent = () => {
    switch (type) {
      case "alert":
        return {
          icon: <PiSirenFill className="text-xl" />,
          bgColor: "bg-red-100",
          iconColor: "text-red-500 font-bold",
        };
      case "warning":
        return {
          icon: <GrAnnounce className="text-xl" />,
          bgColor: "bg-yellow-100",
          iconColor: "text-black",
        };
      case "update":
        return {
          icon: <LuRefreshCcw className="text-xl" />,
          bgColor: "bg-green-100",
          iconColor: "text-green-500",
        };
      default:
        return {
          icon: <IoMdAlert className="text-xl" />,
          bgColor: "bg-red-100",
          iconColor: "text-red-500",
        };
    }
  };

  const iconContent = getIconContent();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <p className="text-base mt-2 mb-2 mx-4 flex gap-1 items-center">
        <span className="text-gray-600 text-sm">To Writer:</span>
        {clientName}
      </p>
      <div className="flex items-start gap-4">
        <div
          className={`${iconContent.bgColor} ${iconContent.iconColor} p-3 rounded-full text-3xl flex items-center justify-center flex-shrink-0`}
        >
          {iconContent.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
            <span className="text-sm text-gray-500">
              Date: {formatDate(date)}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
