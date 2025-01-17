import React, { useState, useEffect } from "react";
import { ReminderCard } from "./Components/RemianderCard";
import { FaSearch } from "react-icons/fa";
import CircularProgress from "@material-ui/core/CircularProgress";
import { get_remainder } from "../../../api/Api";

const AdminReminders = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [reminderData, setReminderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRemainders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_remainder, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }

        const data = await response.json();
        console.log(data)
        setReminderData(data.remainders); // Assuming the key is 'remainder', set it properly
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemainders();
  }, []);

  // Sorting reminders based on the selected order
  const sortedReminders = Array.isArray(reminderData)
    ? [...reminderData].sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      })
    : [];

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
    };

  return (
    <div className="bg-[#fafbfc] min-h-screen p-6">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}

      {reminderData.length > 0 ? (
        <div className="w-full md:w-[81%]">
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
              clientName={reminder.instagramTitle}
              title={reminder.title}
              date={reminder.date}
              type={reminder.type}
              description={reminder.description}
            />
          ))}
        </div>
      </div>
      ) : (
        <p className="text-gray-500 h-[5rem] py-[5rem] text-center mr-[16%] items-center">No data to show</p>
      )}
    </div>
  );
};

export default AdminReminders;
