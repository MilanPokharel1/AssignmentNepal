import React, { useState } from "react";
import { FiUpload, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { upload_file_after_order } from "../../../../api/Api";

const FileUploaderWithPopup = ({ orderId }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[index];
      return updatedProgress;
    });
    setStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      delete updatedStatus[index];
      return updatedStatus;
    });
  };

  const uploadFile = (file, index) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress((prevProgress) => ({
            ...prevProgress,
            [index]: percentComplete,
          }));
        }
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setStatus((prevStatus) => ({
            ...prevStatus,
            [index]: "success",
          }));
          resolve(xhr.response);
        } else {
          setStatus((prevStatus) => ({
            ...prevStatus,
            [index]: "failure",
          }));
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [index]: "failure",
        }));
        reject("Network error occurred during upload");
      };

      const token = localStorage.getItem("token");
      xhr.open("POST", upload_file_after_order);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsUploading(true);
    const newProgress = {};
    const newStatus = {};
    files.forEach((_, index) => {
      newProgress[index] = 0;
      newStatus[index] = "pending";
    });
    setProgress(newProgress);
    setStatus(newStatus);

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (status[index] !== "failure") {
          await uploadFile(file, index).catch(() => {
            // Continue even if a file fails
          });
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setIsAllComplete(true);
    }
  };

  const retryFailedUploads = async () => {
    setIsUploading(true);
    try {
      for (let index = 0; index < files.length; index++) {
        if (status[index] === "failure") {
          await uploadFile(files[index], index).catch(() => {
            // Continue even if a file fails
          });
        }
      }
    } catch (error) {
      console.error("Retry error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* Upload Button */}
      <button
        className=" text-[#5d5fef] text-sm mb-3 rounded-lg"
        onClick={() => setIsPopupOpen(true)}
      >
        <FiUpload className="inline-block mr-2" />
        Upload Files
      </button>

      {/* File Upload Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsPopupOpen(false)}
            >
              <ImCross className="text-xl text-red-500 font-bold" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Upload Files
            </h2>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer mb-4"
            >
              <FiUpload className="text-3xl text-[#5d5fef] mb-2" />
              <p className="text-gray-600">Drag and drop your files here</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="bg-[#5d5fef] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#4b4ded] mt-2"
              >
                Browse Files
              </label>
            </div>

            <ul className="h-auto overflow-y-auto">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
                >
                  <div className="w-[90%]">
                    <p className="text-sm w-[80%] font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    {isUploading && (
                      <div className="relative w-full bg-gray-200 h-2 rounded mt-1">
                        <div
                          className={`bg-[#5d5fef] h-2 rounded`}
                          style={{
                            width: `${progress[index] || 0}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  {status[index] === "success" && (
                    <FiCheckCircle className="text-green-500 ml-3 text-lg" />
                  )}
                  {status[index] === "failure" && (
                    <ImCross className="text-red-500 ml-3 min-w-4 text-lg" />
                  )}
                  {!isUploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  )}
                </li>
              ))}
            </ul>

<<<<<<< HEAD
            <button
              className="bg-[#5d5fef] text-white px-4 py-2 mt-4 rounded-lg hover-bg-[#5d5fef] w-full"
              onClick={handleSubmit}
              disabled={files.length === 0 || isUploading}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Submission Confirmation Popup */}
      {isSubmittedPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[70%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsSubmittedPopupOpen(false)}
            >
              <ImCross className="text-lg  " />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center ">
              Files Submitted Successfully!
            </h2>
            <p className="text-center text-gray-600">
              Thank you for uploading your files.
            </p>
=======
            <div className="flex justify-end gap-4 mt-4">
              {!isAllComplete && (
                <button
                  className="bg-[#5d5fef] text-white px-4 py-2 rounded-lg hover:bg-[#4b4ded]"
                  onClick={handleSubmit}
                  disabled={isUploading}
                >
                  Submit
                </button>
              )}
              {isAllComplete && (
                <>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Close
                  </button>
                  {Object.values(status).includes("failure") && (
                    <button
                      className="bg-[#5d5fef] text-white px-4 py-2 rounded-lg hover:bg-[#4b4ded]"
                      onClick={retryFailedUploads}
                      disabled={isUploading}
                    >
                      Retry
                    </button>
                  )}
                </>
              )}
            </div>
>>>>>>> b3b4ca90b4e36a51fdfc41ad062dad101ca1b3b3
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderWithPopup;
