import React, { useState } from "react";
import { ReminderCard } from "./Components/RemianderCard";

const ClientReminders = () => {
  const [sortOrder, setSortOrder] = useState("newest");

  const reminderData = [
    {
      id: 1,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "20/01/2024",
      type: "alert",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
    },
    {
      id: 2,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "19/01/2025",
      type: "warning",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
    },
    {
      id: 3,
      title:
        "Your assignment is completed, Please pay the remaining amount to be able to download the file!",
      date: "20/01/2013",
      type: "update",
      description:
        "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key.",
    },
  ];

  const sortedReminders = [...reminderData].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="bg-[#fafbfc] min-h-screen p-6">
      <div className="w-[81%] mx-auto">
        <div className="flex justify-between items-center mb-6 flex-row-reverse">
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

        <div className="space-y-4">
          {sortedReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              title={reminder.title}
              date={reminder.date}
              type={reminder.type}
              description={reminder.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReminders;
