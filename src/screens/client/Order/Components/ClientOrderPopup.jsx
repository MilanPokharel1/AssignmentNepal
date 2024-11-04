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
    file: null,
    categories: "",
    amount: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (name === "file") {
      handleFileUpload(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
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
      }, 2000);

      setFormData({
        instagramTitle: "",
        assignmentTitle: "",
        description: "",
        deadline: "",
        orderFixedBy: "",
        file: null,
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
    const file = e.target.files[0];
    if (file) {
      const totalSize = file.size;
      let uploadedSize = 0;

      const interval = setInterval(() => {
        if (uploadedSize < totalSize) {
          uploadedSize += totalSize * 0.1;
          const progress = Math.min((uploadedSize / totalSize) * 100, 100);
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
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
              <div>
                <label className="block text-sm mb-2">File Upload</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                  required
                />
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

          {uploading && (
            <div>
              <progress value={uploadProgress} max="100" className="w-full" />
              <div>
                {uploadProgress.toFixed(0)}% - Estimated time:{" "}
                {((1 - uploadProgress / 100) * 10).toFixed(1)}s
              </div>
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full bg-[#6466F1] text-white py-3 rounded hover:bg-[#5355ED] transition-colors text-sm font-medium"
          >
            Submit
          </button>
        </form>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center max-w-sm mx-4">
            <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center text-lg">
              Thank you for Submitting you Assignment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOrderPopup;
