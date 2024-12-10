import React from "react";
import { PiSirenFill } from "react-icons/pi";
import { GrAnnounce } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";
import { UseTheme } from "../../../../contexts/ThemeContext/useTheme";
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
};
export const ReminderCard = ({ title, date, type, description }) => {
  const { currentTheme, themes } = UseTheme();
  const getIconContent = () => {
    switch (type) {
      case "alert":
        return {
          icon: <PiSirenFill className="text-xl" />,
          bgColor: `${themes[currentTheme].alertbgcolor}`,
          iconColor: `${themes[currentTheme].alerticonColor}`,
        };
      case "warning":
        return {
          icon: <GrAnnounce className="text-xl" />,
          bgColor: `${themes[currentTheme].warningbgcolor}`,
          iconColor: `${themes[currentTheme].warningiconColor}`,
        };
      case "update":
        return {
          icon: <LuRefreshCcw className="text-xl" />,
          bgColor: `${themes[currentTheme].updateColor}`,
          iconColor: `${themes[currentTheme].updateiconColor}`,
        };
      default:
        return {
          icon: <IoMdAlert className="text-xl" />,
          bgColor: `${themes[currentTheme].alertbgcolor}`,
          iconColor:`${themes[currentTheme].alerticonColor}`,
        };
    }
  };

  const iconContent = getIconContent();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
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
