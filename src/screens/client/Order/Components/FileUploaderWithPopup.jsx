import React, { useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { ImCross } from "react-icons/im";
const FileUploaderWithPopup = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmittedPopupOpen, setIsSubmittedPopupOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
  };

  const handleSubmit = () => {
    setIsUploading(true);

    const newProgress = {};
    files.forEach((_, index) => {
      newProgress[index] = 0;
    });
    setProgress(newProgress);

    files.forEach((file, index) => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newValue = Math.min((prevProgress[index] || 0) + 10, 100);
          return { ...prevProgress, [index]: newValue };
        });

        if (progress[index] === 100) clearInterval(interval);
      }, 100);
    });

    setTimeout(() => {
      setIsUploading(false);
      setIsPopupOpen(false);
      setIsSubmittedPopupOpen(true);
    }, files.length * 1000); // Adjust timeout based on file count
  };

  return (
    <div>
      {/* Upload Button */}
      <button
        className="bg-[#5d5fef] text-white p-3 rounded-lg"
        onClick={() => setIsPopupOpen(true)}
      >
        <FiUpload className="inline-block mr-2" />
        Upload Files
      </button>

      {/* File Upload Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
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
                  <div className="w-full">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    {isUploading && (
                      <div className="relative w-full bg-gray-200 h-2 rounded mt-1">
                        <div
                          className={`bg-[#5d5fef] h-2 rounded`}
                          style={{
                            width: isUploading
                              ? `${progress[index] || 0}%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 ml-3"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </li>
              ))}
            </ul>

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
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsSubmittedPopupOpen(false)}
            >
              <ImCross className="text-xl text-red-500 font-bold" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
              Files Submitted Successfully!
            </h2>
            <p className="text-center text-gray-600">
              Thank you for uploading your files.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderWithPopup;
