import React, { useState, useEffect, useRef } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import {
  create_remainder,
  download_file,
  file_status,
  get_orderById,
  order_status,
  send_comment,
} from "../../../api/Api";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FiBell } from "react-icons/fi";
import adminIcon from "../../../assets/admin.png";
import csIcon from "../../../assets/customer-service.png";
import clientIcon from "../../../assets/user.png";
import writerIcon from "../../../assets/writer.png";
const OrdertView = () => {
  const [comments, setComments] = useState("");
  const [assignment, setAssignment] = useState({
    files: [],
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
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showApprove, setshowApprove] = useState(true);
  const [remainderTitle, setRemainderTitle] = useState("");
  const [remainderDescription, setRemainderDescription] = useState("");
  const [remainderType, setRemainderType] = useState("warning");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    commentsContainerRef.current.scrollTop =
      commentsContainerRef.current.scrollHeight;
  };
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
    scrollToBottom();
    if (commenttextareaRef.current) {
      commenttextareaRef.current.style.height = "auto";
      commenttextareaRef.current.style.height = `${commenttextareaRef.current.scrollHeight}px`;
    }
  }, [comments]);

  const roleIcons = {
    admin: adminIcon,
    cs: csIcon,
    client: clientIcon,
    writer: writerIcon,
  };
  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(order_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: assignment._id,
          status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);
      setStatus(data.assignment.status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSendRemainder = async (e) => {
    e.preventDefault();
    try {
      if (
        !assignment.assignmentTitle ||
        !assignment.instagramTitle ||
        !assignment.userId ||
        !remainderTitle ||
        !remainderDescription ||
        !remainderType
      )
        return;
      const token = localStorage.getItem("token");
      const response = await fetch(create_remainder, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assignmentTitle: assignment.assignmentTitle,
          instagramTitle: assignment.instagramTitle,
          userId: assignment.userId,
          title: remainderTitle,
          description: remainderDescription,
          type: remainderType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    const fetchOrderById = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(get_orderById, {
          method: "POST",
          body: JSON.stringify({ orderId }),
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
        console.log(data);
        setStatus(data.status);
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

      let maskedComment = newComment;
      setNewComment("");
      if (commentAreaRef.current) {
        commentAreaRef.current.style.height = "auto";
      }
      if (contactRegex.test(maskedComment)) {
        maskedComment = maskedComment.replace(contactRegex, (match) => {
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

  const changeFileStatus = async (fileId, status) => {
    setshowApprove(false);
    try {
      if (!fileId || !status) {
        console.error("File ID or status missing");
        return;
      }

      const token = localStorage.getItem("token");
      console.log("Hit the API");

      const response = await fetch(file_status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileId, status }),
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error("Failed to update file status");
      }

      // Process the response data
      const res = await response.json();
      console.log(res);

      // Optionally, handle any UI updates based on response here
    } catch (error) {
      console.error("Failed to update file status:", error);
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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    ); // en-GB gives day-month-year order
    return formattedDate.replace(",", ""); // Remove any commas if present
  };
  const handleConfirm = () => {
    handleStatusChange();

    setIsModalOpen(false);
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
              <option value="approved">Approved</option>

              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            // onClick={handleStatusChange}
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-[#5D5FEF] text-white  px-2 py-1 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg focus:outline-none"
          >
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
                  <div key={comment._id} className="flex items-top mt-3">
                    <img
                      src={roleIcons[comment.role] || clientIcon}
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
                onChange={(e) =>
                  setNewComment(e.target.value.replace(/\n/g, ""))
                }
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
                assignment.files
                  .filter((file) => file.uploadedBy === "client")
                  .map((file, index) => (
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
                          {file.fileStatus === "pending" && (
                            <button className="focus:outline-none flex gap-2 items-center">
                              {showApprove && (
                                <span
                                  onClick={() =>
                                    changeFileStatus(file.fileId, "approved")
                                  }
                                  className="px-1 py-0 rounded-xl text-sm  border border-white bg-white text-blue-500"
                                >
                                  Approve
                                </span>
                              )}
                            </button>
                          )}
                          <div className="ml-2 flex-shrink-0">
                            <button
                              className="focus:outline-none"
                              onClick={() =>
                                handleDownload(file.fileUrl, file.fileName)
                              }
                              disabled={
                                file.fileUrl
                                  ? downloadingFiles[
                                      new URL(file.fileUrl).searchParams.get(
                                        "id"
                                      )
                                    ]
                                  : false
                              }
                            >
                              {file?.fileUrl &&
                              downloadingFiles[
                                new URL(file.fileUrl).searchParams.get("id")
                              ] ? (
                                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4 text-gray-700 hover:cursor-pointer" />
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
              {assignment &&
                assignment.files
                  .filter((file) => file.uploadedBy === "writer")
                  .map((file, index) => (
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
                          {file.fileStatus === "pending" && (
                            <button className="focus:outline-none flex gap-2 items-center">
                              <span
                                onClick={() =>
                                  changeFileStatus(file.fileId, "approved")
                                }
                                className="px-1 py-0 rounded-xl text-sm  border border-white bg-white text-blue-500"
                              >
                                Approve
                              </span>
                            </button>
                          )}
                          <div className="ml-2 flex-shrink-0">
                            <button
                              className="focus:outline-none"
                              onClick={() =>
                                handleDownload(file.fileUrl, file.fileName)
                              }
                              disabled={
                                file.fileUrl
                                  ? downloadingFiles[
                                      new URL(file.fileUrl).searchParams.get(
                                        "id"
                                      )
                                    ]
                                  : false
                              }
                            >
                              {file?.fileUrl &&
                              downloadingFiles[
                                new URL(file.fileUrl).searchParams.get("id")
                              ] ? (
                                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4 text-gray-700 hover:cursor-pointer" />
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
          <div className="space-y-4 text-sm">
            <h2 className="text-2xl font-bold">Payments</h2>
            {assignment.payments &&
              assignment.payments.map((payment, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 ">
                  <div className="flex items-center gap-2 ">
                    <p className="text-gray-600">Payment Date:</p>
                    <p>{formatDate(payment.date)}</p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <p className="text-gray-600">Payment Method:</p>
                    <p>{payment.method}</p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <p className="text-gray-600">Amount:</p>
                    <p className="text-[#00b087] font-semibold">
                      {payment.paidAmount}
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
          <form
            onSubmit={handleSendRemainder}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Reminder
            </h2>
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                value={remainderTitle}
                onChange={(e) => setRemainderTitle(e.target.value)}
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
                value={remainderDescription}
                onChange={(e) => setRemainderDescription(e.target.value)}
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>
            {/* Category Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={remainderType}
                onChange={(e) => setRemainderType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
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
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:opacity-90 focus:outline-none"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure you want to change the status?
            </h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#5d5fef] text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdertView;
