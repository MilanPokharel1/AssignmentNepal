import React, { useState, useEffect, useRef } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import { download_file, get_orderById, send_comment } from "../../../api/Api";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileUploaderWithPopup from "../Order/Components/FileUploaderWithPopup";
import adminIcon from "../../../assets/admin.png";
import csIcon from "../../../assets/customer-service.png";
import clientIcon from "../../../assets/user.png";
import writerIcon from "../../../assets/writer.png";
import FileIconRenderer from "./Components/FileIconRenderer";
const AssignmentView = () => {
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
  const [icon, seticon] = useState("client");

  const scrollToBottom = () => {
    commentsContainerRef.current.scrollTop =
      commentsContainerRef.current.scrollHeight;
  };

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
        setComments(data.comments);
        console.log(data);
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

  const roleIcons = {
    admin: adminIcon,
    cs: csIcon,
    client: clientIcon,
    writer: writerIcon,
  };
  const getDisplayText = (description) => {
    if (!description) return;
    const maxLength = 700;
    if (isExpanded || description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };
  const readData = (data) => {
    setAssignment(data);
  };
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
      <h2 className="text-2xl font-bold mb-6">Assignment</h2>

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
            <h3 className="text-md font-semibold tracking-wider mb-4">
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
                      src={roleIcons[comment.role] || clientIcon}
                      alt={comment.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {console.log("This is role", comment.role)}
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
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Uploaded Files
              </h3>
              <FileUploaderWithPopup orderId={orderId} readData={readData} />
            </div>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 min-w-0 flex-grow">
                            <FileIconRenderer
                              fileName={file.fileName}
                              className="h-5 min-w-5 text-gray-500"
                            />
                            <div className="flex flex-col min-w-0 overflow-hidden flex-grow">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {file.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.fileSize}
                              </p>
                            </div>
                          </div>
                          <button
                            className="focus:outline-none"
                            onClick={() =>
                              handleDownload(file.fileUrl, file.fileName)
                            }
                            title={
                              file.fileStatus == "approved" && file.fileUrl
                                ? ""
                                : "Download not approved"
                            }
                            disabled={
                              file.fileStatus == "approved" && file.fileUrl
                                ? downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]
                                : true
                            }
                          >
                            {file?.fileUrl &&
                            downloadingFiles[
                              new URL(file.fileUrl).searchParams.get("id")
                            ] ? (
                              <div className="flex flex-col items-end">
                                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                              </div>
                            ) : (
                              <Download
                                className={`w-4 h-4  ${
                                  file.fileStatus === "approved"
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                } hover:cursor-pointer`}
                                disabled={
                                  file.fileStatus == "approved" && file.fileUrl
                                    ? downloadingFiles[
                                        new URL(file.fileUrl).searchParams.get(
                                          "id"
                                        )
                                      ]
                                    : true
                                }
                              />
                            )}
                          </button>
                        </div>
                        {file.fileUrl &&
                          downloadingFiles?.[
                            new URL(file.fileUrl).searchParams.get("id")
                          ] && (
                            <div className="mt-2 ml-7">
                              <div className="text-xs text-gray-500 mb-1">
                                {
                                  downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]?.progress
                                }
                                % •{" "}
                                {
                                  downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]?.timeRemaining
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
                                      ]?.progress
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
              Downloads Available
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 min-w-0 flex-grow">
                            <FolderIcon className="h-5 min-w-5 text-yellow-500" />
                            <div className="flex flex-col min-w-0 overflow-hidden flex-grow">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {file.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.fileSize}
                              </p>
                            </div>
                          </div>
                          <button
                            className="focus:outline-none"
                            onClick={() =>
                              handleDownload(file.fileUrl, file.fileName)
                            }
                            title={
                              file.fileStatus == "approved" && file.fileUrl
                                ? ""
                                : "Download not approved"
                            }
                            disabled={
                              file.fileStatus == "approved" && file.fileUrl
                                ? downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]
                                : true
                            }
                          >
                            {file?.fileUrl &&
                            downloadingFiles[
                              new URL(file.fileUrl).searchParams.get("id")
                            ] ? (
                              <div className="flex flex-col items-end">
                                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                              </div>
                            ) : (
                              <Download
                                className={`w-4 h-4  ${
                                  file.fileStatus === "approved"
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                } hover:cursor-pointer`}
                                disabled={
                                  file.fileStatus == "approved" && file.fileUrl
                                    ? downloadingFiles[
                                        new URL(file.fileUrl).searchParams.get(
                                          "id"
                                        )
                                      ]
                                    : true
                                }
                              />
                            )}
                          </button>
                        </div>
                        {file.fileUrl &&
                          downloadingFiles?.[
                            new URL(file.fileUrl).searchParams.get("id")
                          ] && (
                            <div className="mt-2 ml-7">
                              <div className="text-xs text-gray-500 mb-1">
                                {
                                  downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]?.progress
                                }
                                % •{" "}
                                {
                                  downloadingFiles[
                                    new URL(file.fileUrl).searchParams.get("id")
                                  ]?.timeRemaining
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
                                      ]?.progress
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
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
