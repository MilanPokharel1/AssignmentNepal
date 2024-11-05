import React, { useState } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import profileIcon from "../ClientComponents/profileIcon.jpg";
import profilePictureClient from "../ClientComponents/profile-picture.jpeg";
import { useParams } from "react-router-dom";

const AssignmentView = () => {
  const [comment, setComment] = useState("");

  const description =
    "Completing assignments on time requires proper planning, time management, and dedication. To ensure timely submission, it's important to set clear goals, break down the tasks into manageable chunks, and prioritize the most critical aspects. Allocating specific time slots for each part of the assignment and avoiding procrastination is key. Additionally, staying organized, keeping track of progress, and addressing challenges promptly can help in meeting deadlines. By maintaining focus and adhering to the schedule, completing the assignment on time becomes achievable.";

  // Sample data for uploaded files
  const uploadedFiles = [
    { name: "theprojekts-design-tokens.zip", size: "5.3MB", url: "exampleURL" },
    { name: "project-requirements.pdf", size: "2.1MB", url: "exampleURL" },
    { name: "research-data.xlsx", size: "1.8MB", url: "" },
  ];

  // Sample data for downloadable files
  const downloadableFiles = [
    { name: "finalaccounting.zip", size: "5.3MB", status: "showing" },
    { name: "completed-analysis.pdf", size: "3.2MB", status: "showing" },
    { name: "final-report.docx", size: "1.5MB", status: "downloading" },
  ];

  // Sample comment history with role-based images
  const comments = [
    {
      id: 1,
      name: "Milan",
      role: "writer",
      date: "6 Jan 2012",
      message: "Hello cute dhanan.I am your writer",
      image: profileIcon, // profileIcon for writer
    },
    {
      id: 2,
      name: "Dhanan",
      role: "client",
      date: "6 Jan 2012",
      message: "Hello milan bhaiya.how are you?",
      image: profilePictureClient, // profilePictureClient for client
    },
  ];

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const contactRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/;

    if (contactRegex.test(input)) {
      alert("Entering contact numbers is against the rules.");
    } else {
      setComment(input);
    }
  };

  const handleSend = () => {
    if (comment.trim()) {
      // Handle sending comment
      setComment("");
    }
  };

  const truncateText = (text, length = 150) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };

  return (
    <div className="w-full mx-auto p-6 bg-[#fafbfc] rounded-lg ">
      <h2 className="text-2xl font-bold mb-6">Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {/* Left section - 2 columns wide */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title:
            </label>
            <input
              type="text"
              value="This the my second assignment i su..."
              className="w-full p-2 bg-white border border-gray-200 rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descriptions:
            </label>
            <div className="relative">
              <textarea
                value={description}
                className="w-full h-32 p-2 bg-white border border-gray-200 rounded resize-none"
                readOnly
              />
            </div>
          </div>
          <div className=" border-[0.2px] border-gray-200 p-8 rounded-xl bg-white">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Comments:
            </h3>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto mb-4 p-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-center">
                  <img
                    src={comment.image}
                    alt={comment.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Comment as Dhananjaya Raut..."
                className="flex-1 p-2 border border-gray-200 rounded"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-[#5d5fef] text-white  hover:bg-blue-700 transition-colors rounded-2xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 col-span-2 mr-9">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Uploaded Files
            </h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center justify-between p-2 rounded border ${
                      file.url
                        ? "bg-white border-gray-200"
                        : "bg-gray-100 border-gray-300 "
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FolderIcon className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    {file.url ? (
                      <Download className="w-4 h-4 text-gray-500" />
                    ) : null}
                  </div>

                  {/* Overlay for blur and loader */}
                  {!file.url && (
                    <div className="absolute inset-0 bg-white/5 opacity-85 backdrop-blur flex items-center justify-center rounded">
                      <Loader className="w-5 h-5 text-gray-500  animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Downloads Available
            </h3>
            <div className="space-y-2">
              {downloadableFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    <FolderIcon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  {file.status === "showing" ? (
                    <Download className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
