import React, { useState } from "react";
import { ReminderCard } from "./Components/RemianderCard";
import { FaSearch } from "react-icons/fa";
const ClientReminders = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const reminderData = [
    {
      id: 1,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "20/01/2024",
      type: "alert",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
      clientName: "Millu bhiaya",
    },
    {
      id: 2,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "19/01/2025",
      type: "warning",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
      clientName: "Dhanan bhiaya",
    },
    {
      id: 3,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "20/01/2013",
      type: "update",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
      clientName: "ramesh bhiaya",
    },
  ];

  const sortedReminders = [...reminderData]
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("/"));
      const dateB = new Date(b.date.split("/").reverse().join("/"));
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    })
    .filter((reminder) => {
      const searchString = searchTerm.toLowerCase();
      return (
        reminder.title.toLowerCase().includes(searchString) ||
        reminder.description.toLowerCase().includes(searchString) ||
        reminder.clientName.toLowerCase().includes(searchString) ||
        reminder.date.toLowerCase().includes(searchString)
      );
    });

  const HighlightedText = ({ text }) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const ModifiedReminderCard = (props) => {
    return (
      <ReminderCard
        {...props}
        title={<HighlightedText text={props.title} />}
        description={<HighlightedText text={props.description} />}
        clientName={<HighlightedText text={props.clientName} />}
        date={<HighlightedText text={props.date} />}
      />
    );
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen p-6">
      <div className="w-full md:w-[81%] mx-auto">
        <div className="flex justify-between items-center mb-6 flex-row-reverse">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-blue-50 text-sm text-blue-900 py-2 pl-8 pr-4 rounded-md w-60 outline-none focus:border focus:border-blue-700 border border-transparent transition-colors"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2">
                <FaSearch className="text-blue-900"/>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="bg-blue-50 text-sm text-blue-900 py-2 px-4 rounded-md cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {sortedReminders.map((reminder) => (
            <ModifiedReminderCard
              key={reminder.id}
              title={reminder.title}
              date={reminder.date}
              type={reminder.type}
              description={reminder.description}
              clientName={reminder.clientName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReminders;
