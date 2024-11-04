import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { upload_file } from "../../../../api/Api.jsx";

const ClientOrderPopup = ({ setorderPopup }) => {
  const [formData, setFormData] = useState({
    instagramTitle: "",
    assignmentTitle: "",
    description: "",
    deadline: "",
    orderFixedBy: "",
    files: [], // Updated to hold multiple files
    categories: "",
    amount: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      const selectedFiles = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFiles, // Store all selected files
      }));
      handleFileUpload(e);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    const form = new FormData();
    for (const key in formData) {
      // Append each file to the FormData
      if (key === "files") {
        formData.files.forEach((file) => {
          form.append("files", file);
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(upload_file, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file.");
      }

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        setorderPopup(false);
      }, 3000);

      setFormData({
        instagramTitle: "",
        assignmentTitle: "",
        description: "",
        deadline: "",
        orderFixedBy: "",
        files: [], // Reset files after submission
        categories: "",
        amount: "",
      });
      setUploadProgress(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = (e) => {
    const totalFiles = e.target.files.length;
    let uploadedFiles = 0;

    const interval = setInterval(() => {
      if (uploadedFiles < totalFiles) {
        uploadedFiles += 1; // Increment uploaded files count
        const progress = Math.min((uploadedFiles / totalFiles) * 100, 100);
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval time for smoothness
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg p-8 relative">
        <button
          onClick={() => setorderPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Instagram Title</label>
                <input
                  type="text"
                  name="instagramTitle"
                  placeholder="Type Here"
                  value={formData.instagramTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Assignment Title</label>
                <input
                  type="text"
                  name="assignmentTitle"
                  placeholder="Type Here"
                  value={formData.assignmentTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Type Here"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">File Upload</label>
                <input
                  type="file"
                  name="files"
                  onChange={handleChange}
                  className="hidden" // Hide the default file input
                  id="file-upload"
                  multiple // Allow multiple files
                  required
                />
                <label
                  htmlFor="file-upload" // Use the label to trigger the file input
                  className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span className="mr-2">Choose files</span>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 0a2 2 0 00-2 2v2.585l-1.293-1.293A2 2 0 005 4.586l6 6a2 2 0 002 0l6-6a2 2 0 00-1.414-3.414L12 6.586V2a2 2 0 00-2-2z" />
                    <path d="M2 11a2 2 0 00-2 2v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2H2zm16 7H2v-5h16v5z" />
                  </svg>
                </label>
                {/* Display the selected files */}
                <div className="mt-2 text-sm text-gray-500">
                  {formData.files.length > 0 ? (
                    formData.files.map((file, index) => (
                      <div key={index} className="mt-1">{file.name}</div>
                    ))
                  ) : (
                    <div>No files selected</div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Order fixed by</label>
                <input
                  type="text"
                  name="orderFixedBy"
                  placeholder="Type Here"
                  value={formData.orderFixedBy}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Categories</label>
                <input
                  type="text"
                  name="categories"
                  placeholder="Type Here"
                  value={formData.categories}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-6">Payments</h2>
            <div>
              <label className="block text-sm mb-2">Amount</label>
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && <div className="text-red-500 mt-2">{error}</div>}
          {showSuccessPopup && (
            <div className="mt-2 text-green-500">Order submitted successfully!</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientOrderPopup;
