import React, { useState, useEffect, useRef } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import { download_file, get_orderById, send_comment } from "../../../api/Api";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FiBell } from "react-icons/fi";
const OrdertView = () => {
  const [comments, setComments] = useState("");
  const [assignment, setAssignment] = useState({
    files: [], // Initialize with empty array
    assignmentTitle: "",
    description: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const textareaRef = useRef(null);
  const commenttextareaRef = useRef(null);
  const commentAreaRef = useRef(null);
  const [downloadingFiles, setDownloadingFiles] = useState({});
  const [newComment, setNewComment] = useState("");
  const commentsContainerRef = useRef(null);
  const { orderId } = useParams(); // Get orderId from the URL
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Ongoing");
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    commentsContainerRef.current.scrollTop =
      commentsContainerRef.current.scrollHeight;
  };
  const dummyData = [
    {
      date: "20/01/2024",
      paymentMethod: "Fonepay",
      amount: "Rs 8000",
    },
    {
      date: "20/01/2024",
      paymentMethod: "Fonepay",
      amount: "Rs 8000",
    },
  ];
  useEffect(() => {
    scrollToBottom();
    if (commenttextareaRef.current) {
      commenttextareaRef.current.style.height = "auto"; // Reset the height
      commenttextareaRef.current.style.height = `${commenttextareaRef.current.scrollHeight}px`; // Set height to match content
    }
  }, [comments]);

  useEffect(() => {
    const fetchOrderById = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token
        const response = await fetch(get_orderById, {
          method: "POST",
          body: JSON.stringify({ orderId }), // Convert body to JSON string
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setAssignment(data);
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderById();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      if (!newComment) return;

      const token = localStorage.getItem("token");

      const contactRegex = /\b\d{10}\b/;

      // Mask the phone number if it matches the regex
      let maskedComment = newComment;
      setNewComment("");
      if (commentAreaRef.current) {
        commentAreaRef.current.style.height = "auto"; // Reset height to initial size
      }
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

      const res = await response.json();
      console.log(res);
      setComments([...comments, res.newComment]);
    } catch (error) {
      console.error("Add comment error:", error);
    }
  };

  function formatTimeRemaining(timeRemaining) {
    if (timeRemaining < 60) {
      // If time is below 1 minute, show in seconds
      return `${Math.floor(timeRemaining)} s`;
    } else if (timeRemaining < 3600) {
      // If time is below 1 hour, show in minutes and seconds
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = Math.floor(timeRemaining % 60);
      return `${minutes} min ${seconds}s`;
    } else {
      // If time is 1 hour or more, show in hours, minutes, and seconds
      const hours = Math.floor(timeRemaining / 3600);
      const minutes = Math.floor((timeRemaining % 3600) / 60);
      const seconds = Math.floor(timeRemaining % 60);
      return `${hours} hr ${minutes} min ${seconds}s`;
    }
  }

  const handleDownload = async (fileUrl, fileName) => {
    const fileId = new URL(fileUrl).searchParams.get("id");
    setDownloadingFiles((prev) => ({
      ...prev,
      [fileId]: {
        downloading: true,
        progress: 0,
        total: 0,
        timeRemaining: "Calculating...",
      },
    }));

    try {
      const token = localStorage.getItem("token");

      if (!fileId) {
        throw new Error("Invalid file URL");
      }

      const response = await fetch(`${download_file}/${fileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const totalSize = parseInt(response.headers.get("Content-Length"), 10);
      let loaded = 0;
      const reader = response.body.getReader();
      const chunks = [];

      // Track download start time
      const startTime = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;

        // Update progress and estimate time
        const progress = (loaded / totalSize) * 100;
        const elapsedTime = (Date.now() - startTime) / 1000;
        const estimatedTotalTime = (elapsedTime / loaded) * totalSize;
        const timeRemaining = formatTimeRemaining(
          estimatedTotalTime - elapsedTime
        );

        setDownloadingFiles((prev) => ({
          ...prev,
          [fileId]: {
            downloading: true,
            progress: Math.round(progress),
            total: totalSize,
            timeRemaining: `${timeRemaining} Remaining`,
          },
        }));
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setDownloadingFiles((prev) => ({ ...prev, [fileId]: false }));
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

  const downloadableFiles = [
    { name: "finalaccounting.zip", size: "5.3MB", status: "pending" },
    { name: "completed-analysis.pdf", size: "3.2MB", status: "approved " },
    { name: "final-report.docx", size: "1.5MB", status: "pending" },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
  };

  return (
    <div className="w-full mx-auto p-6 bg-[#fafbfc] rounded-lg pb-10">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">Assignment</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="bg-[#5D5FEF] text-white  px-2 py-1 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg focus:outline-none">
            Change
          </button>
          <button
            className="flex items-center bg-[#5D5FEF] text-white  px-2 py-1 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg"
            onClick={toggleModal}
          >
            <FiBell className="w-5 h-5 mr-2" />
            Send Reminders
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-0 md:gap-6">
        {/* Left section - 2 columns wide */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title:
            </label>
            <input
              type="text"
              value={assignment.assignmentTitle}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none"
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
                className="w-full p-6 space-y-3 bg-white border border-gray-200 rounded-xl resize-none overflow-hidden focus:outline-none"
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
            <div
              ref={commentsContainerRef}
              className="space-y-3 max-h-[35rem] overflow-y-auto mb-2 px-3"
            >
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="flex items-top">
                    <img
                      src={comment.picture}
                      alt={comment.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 bg-white rounded-lg px-3">
                      <div className="flex items-center space-x-auto mb-1">
                        <span className="text-sm font-medium ">
                          {comment.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          {comment.createdAt
                            ? formatDate(comment.createdAt)
                            : "Just Now"}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          {comment.createdTime}
                        </span>
                      </div>
                      <textarea
                        ref={commenttextareaRef}
                        readOnly
                        className="text-sm text-gray-600 w-full focus:outline-none resize-none overflow-hidden"
                        value={comment.text}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm ">No comments yet</p>
              )}
            </div>
            <form
              onSubmit={handleAddComment}
              className="relative flex items-center w-full"
            >
              <textarea
                type="text"
                ref={commentAreaRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Comment as ${localStorage.getItem(
                  "firstName"
                )}...`}
                className="flex-1 p-4 pr-10 border border-gray-200 rounded-[30px] resize-none h-18 max-h-52 overflow-y-auto focus:outline-none"
                rows={1}
                onInput={(e) => {
                  e.target.style.height = "auto"; // Reset height to auto on each input
                  e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on scrollHeight
                }}
              />
              <button
                type="submit"
                className="absolute right-2 bottom-2 flex font-extrabold text-[20px] items-center justify-center w-[2.65rem] h-[2.65rem] bg-[#5d5fef] text-white rounded-full transition-colors hover:bg-blue-700"
              >
                ➢
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6 col-span-2 mr-9">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Client Upload
            </h3>
            <div className="space-y-2">
              {assignment &&
                assignment.files.map((file, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`flex flex-col p-2 rounded border ${
                        file.fileUrl
                          ? "bg-white border-gray-200"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 min-w-0 flex-grow">
                          <FolderIcon className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          <div className="flex flex-col min-w-0 overflow-hidden flex-grow">
                            <p
                              className="text-sm font-medium text-gray-700 truncate"
                              title={file.fileName}
                            >
                              {file.fileName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.fileSize}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <button
                            className="focus:outline-none"
                            onClick={() =>
                              handleDownload(file.fileUrl, file.fileName)
                            }
                            disabled={
                              downloadingFiles[
                                new URL(file.fileUrl).searchParams.get("id")
                              ]
                            }
                          >
                            {downloadingFiles[
                              new URL(file.fileUrl).searchParams.get("id")
                            ] ? (
                              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4 text-gray-500 hover:cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
                      {file.fileUrl &&
                        downloadingFiles[
                          new URL(file.fileUrl).searchParams.get("id")
                        ] && (
                          <div className="mt-2 ml-7">
                            <div className="text-xs text-gray-500 mb-1">
                              {
                                downloadingFiles[
                                  new URL(file.fileUrl).searchParams.get("id")
                                ].progress
                              }
                              % •{" "}
                              {
                                downloadingFiles[
                                  new URL(file.fileUrl).searchParams.get("id")
                                ].timeRemaining
                              }
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{
                                  width: `${
                                    downloadingFiles[
                                      new URL(file.fileUrl).searchParams.get(
                                        "id"
                                      )
                                    ].progress
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Overlay for blur and loader */}
                    {!file.fileUrl && (
                      <div className="absolute inset-0 bg-white/5 opacity-85 backdrop-blur flex items-center justify-center rounded">
                        <Loader className="w-5 h-5 text-gray-500 animate-spin" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Writer Upload
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
                    <button className="focus:outline-none flex gap-2 items-center">
                      <span className="px-2 py-1 rounded-xl  border border-blue-500 bg-blue-50 text-blue-500">
                        Approve
                      </span>
                      <Download className="w-4 h-4 " />
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        setisDownloading(true);
                      }}
                    >
                      {!isDownloading ? (
                        <Download className="w-4 h-4 " />
                      ) : (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h2 className="text-2xl font-bold">Payments</h2>
            {dummyData.map((payment, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 ">
                <div className="flex items-center gap-2 ">
                  <p className="text-gray-600">Payment Date:</p>
                  <p>{payment.date}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <p className="text-gray-600">Payment Method:</p>
                  <p>{payment.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <p className="text-gray-600">Amount:</p>
                  <p className="text-[#00b087] font-semibold">
                    {payment.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-sm mx-auto mt-8 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Pay Writer</h2>
            <input
              type="text"
              placeholder="Enter amount"
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Reminder
            </h2>
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            {/* Description Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>
            {/* Category Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="alert">Alert</option>
                <option value="warning">Warning</option>
                <option value="notice">Notice</option>
              </select>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:opacity-90 focus:outline-none">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdertView;