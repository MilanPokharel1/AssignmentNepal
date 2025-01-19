import React, { useState, useRef } from "react";
import { IoClose, IoDocumentText, IoTrash } from "react-icons/io5";

const MultiFileUpload = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fileToRemove, setFileToRemove] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    // console.log("test",updatedFiles);

    // Callback to parent component
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const initiateFileRemoval = (file) => {

    setFileToRemove(file);
    setShowConfirmation(true);
  };

  const confirmRemoveFile = () => {
    const updatedFiles = files.filter((f) => f !== fileToRemove);
    setFiles(updatedFiles);

    // Callback to parent component
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }

    setShowConfirmation(false);
    setFileToRemove(null);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const iconClasses = "w-10 h-10 text-gray-500";

    switch (ext) {
      case "pdf":
        return <IoDocumentText className={`${iconClasses} text-red-500`} />;
      case "doc":
      case "docx":
        return <IoDocumentText className={`${iconClasses} text-blue-500`} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <IoDocumentText className={`${iconClasses} text-green-500`} />;
      default:
        return <IoDocumentText className={iconClasses} />;
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors group">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">Multiple files supported</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Uploaded Files ({files.length})
          </h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {getFileIcon(file.name)}
                <div>
                  <p className="text-sm font-medium truncate max-w-[20rem]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => initiateFileRemoval(file)}
                className="text-red-500 hover:text-red-700"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <IoTrash className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">
              Remove File?
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to remove {fileToRemove?.name}?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveFile}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiFileUpload;
