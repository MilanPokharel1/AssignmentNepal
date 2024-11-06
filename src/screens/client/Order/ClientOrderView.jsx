import React, { useState, useEffect, useRef } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import profileIcon from "../ClientComponents/profileIcon.jpg";
import profilePictureClient from "../ClientComponents/profile-picture.jpeg";
import { download_file, get_orderById, send_comment } from "../../../api/Api";
import { useParams } from "react-router-dom";


const AssignmentView = () => {
  const [comment, setComment] = useState("");
  const [assignment, setAssignment] = useState({
    files: [], // Initialize with empty array
    assignmentTitle: "",
    description: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const textareaRef = useRef(null);
  const [downloadingFiles, setDownloadingFiles] = useState({});
  const [newComment, setNewComment] = useState("");

  const { orderId } = useParams(); // Get orderId from the URL


  useEffect(() => {

    fetchOrderById();

  }, []);

  const fetchOrderById = async () => {

    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(get_orderById, {
        method: "POST",
        body: JSON.stringify({ orderId }), // Convert body to JSON string
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setAssignment(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };



  const handleAddComment = async () => {
    try {
      if (!newComment) return;
      const token = localStorage.getItem("token");

      const contactRegex = /\b\d{10}\b/;

      // Mask the phone number if it matches the regex
      let maskedComment = newComment;

      if (contactRegex.test(maskedComment)) {
        maskedComment = maskedComment.replace(contactRegex, (match) => {
          // Mask the middle digits, keeping the first 2 and last 2 digits
          return match.slice(0, 2) + "******" + match.slice(-2);
        });
      }

      const response = await fetch(send_comment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, text: maskedComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      setNewComment("");
      fetchOrderById(); // Refresh order page to show new comment
    } catch (error) {
      console.error("Add comment error:", error);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    const fileId = new URL(fileUrl).searchParams.get("id"); // Get the id from the URL
    setDownloadingFiles(prev => ({ ...prev, [fileId]: true }));
    try {
      const token = localStorage.getItem("token");

      console.log(fileId)
      if (!fileId) {
        throw new Error("Invalid file URL");
      }

      const response = await fetch(`${download_file}/${fileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // Use the filename from the header, or fall back to a default
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloadingFiles(prev => ({ ...prev, [fileId]: false }));
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [assignment, isExpanded]);




  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const getDisplayText = (description) => {
    if (!description) return;
    const maxLength = 700;
    if (isExpanded || description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  // const files = [
  //   { name: "theprojekts-design-tokens.zip", size: "5.3MB", url: "exampleURL" },
  //   { name: "project-requirements.pdf", size: "2.1MB", url: "exampleURL" },
  //   { name: "research-data.xlsx", size: "1.8MB", url: "" },
  // ];

  // Sample data for downloadable files
  const downloadableFiles = [
    { name: "finalaccounting.zip", size: "5.3MB", status: "pending" },
    { name: "completed-analysis.pdf", size: "3.2MB", status: "approved " },
    { name: "final-report.docx", size: "1.5MB", status: "pending" },
  ];

  // Sample comment history with role-based pictures
  // const comments = [
  //   {
  //     id: 1,
  //     name: "Milan",
  //     role: "writer",
  //     date: "6 Jan 2012",
  //     message: "Hello cute dhanan.I am your writer",
  //     picture: profileIcon, // profileIcon for writer
  //   },
  //   {
  //     id: 2,
  //     name: "Dhanan",
  //     role: "client",
  //     date: "6 Jan 2012",
  //     message: "Hello milan bhaiya.how are you?",
  //     picture: profilePictureClient, // profilePictureClient for client
  //   },
  // ];

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const contactRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/;

    if (contactRegex.test(input)) {
      alert("Entering contact numbers is against the rules.");
    } else {
      setComment(input);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
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
              value={assignment.assignmentTitle}
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
                ref={textareaRef}
                value={getDisplayText(assignment.description)}
                className="w-full p-3 bg-white border border-gray-200 rounded resize-none overflow-hidden"
                readOnly
              />
            </div>
            <button
              onClick={toggleExpand}
              className="text-blue-500 mt-2 text-sm focus:outline-none"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </div>
          <div className=" border-[0.2px] border-gray-200 p-8 rounded-xl bg-white">
            <h3 className="text-md font-semibold tracking-wider mb-1">
              Comments:
            </h3>
            <div className="space-y-3 max-h-[80vh] overflow-y-auto mb-2 p-3">
              {assignment.comments && assignment.comments.length > 0 ? (
                assignment.comments.map((comment) => (
                  <div key={comment._id} className="flex items-center">
                    <img
                      src={comment.picture}
                      alt={comment.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 bg-white rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium ">
                          {comment.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.createdTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm ">No comments yet</p>
              )}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Comment as Dhananjaya Raut..."
                className="flex-1 p-2 border border-gray-200 rounded"
              />
              <button
                onClick={() => handleAddComment()}
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
              {assignment && assignment.files.map((file, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center justify-between p-2 rounded border ${file.fileUrl
                      ? "bg-white border-gray-200"
                      : "bg-gray-100 border-gray-300 "
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FolderIcon className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-gray-500">{file.fileSize}</p>
                      </div>
                    </div>
                    {file.fileUrl && (
                      <button
                        className="focus:outline-none"
                        onClick={() => handleDownload(file.fileUrl, file.fileName)}
                        disabled={downloadingFiles[new URL(file.fileUrl).searchParams.get("id")]}
                      >
                        {downloadingFiles[new URL(file.fileUrl).searchParams.get("id")] ? (
                          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 text-gray-500 hover:cursor-pointer" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Overlay for blur and loader */}
                  {!file.fileUrl && (
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
                  {file.status === "pending" ? (
                    <button className="focus:outline-none">
                      <Download className="w-4 h-4 text-gray-300" />
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        setisDownloading(true);
                      }}
                    >
                      {!isDownloading ? (
                        <Download className="w-4 h-4 text-gray-300" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      )}
                    </button>
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
