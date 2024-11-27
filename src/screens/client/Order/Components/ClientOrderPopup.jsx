import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { upload_file } from "../../../../api/Api.jsx";
import MultiFileUpload from "./MultipleFileUpload.jsx";
const ClientOrderPopup = ({ setorderPopup }) => {
  const [formData, setFormData] = useState({
    instagramTitle: "",
    assignmentTitle: "",
    description: "",
    categorie: "",
    deadline: "",
    orderFixedBy: "",
    totalAmount: "",
    paidAmount: "",
    paymentMethod: "Cash",
    paymentCurrency: "Rs",
    file: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [files, setFiles] = useState([]);

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
    // If you need to update formData
    setFormData((prevData) => ({
      ...prevData,
      file: newFiles[0], // or handle as needed
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setError("Please select a file to upload");
      return;
    }

    setUploading(true);
    setError("");
    setUploadProgress(0);
    setEstimatedTime(0);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const xhr = new XMLHttpRequest();
      const startTime = Date.now();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);

          // Calculate estimated time remaining
          const uploadSpeed = event.loaded / (Date.now() - startTime); // bytes per millisecond
          const remainingBytes = event.total - event.loaded;
          const estimatedTimeRemaining = remainingBytes / uploadSpeed / 1000; // convert to seconds

          setEstimatedTime(Math.max(0, estimatedTimeRemaining));
          // if (percentComplete >= 100) {
          //   setShowSuccessPopup(true);
          //   setTimeout(() => {
          //     setShowSuccessPopup(false);
          //     // setorderPopup(false);
          //   }, 3000);
          // }
        }
      });
      const token = localStorage.getItem("token");
      xhr.open("POST", upload_file);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      // Create a promise to handle the XHR
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error("Upload failed 2"));
          }
        };

        xhr.onerror = () =>
          reject(new Error("Network error occurred during upload"));
        xhr.onabort = () => reject(new Error("Upload was cancelled"));
      });

      xhr.send(form);

      // Wait for upload to complete
      await uploadPromise;

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        setorderPopup(false);
      }, 3000);

      // Reset form
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
    } catch (err) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setEstimatedTime(0);
    }
  };

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    }
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-7xl mx-4 bg-white rounded-lg p-8 relative h-[95vh] overflow-y-auto">
        <button
          onClick={() => setorderPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={29} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <div className="flex">
              <div className=" w-[47rem] border-r-[1px] border-r-gray-200 pr-7">
                <div>
                  <h2 className="text-lg font-semibold mb-6">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2">
                        Instagram Title
                      </label>
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
                      <label className="block text-sm mb-2">
                        Assignment Title
                      </label>
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
                      <label className="block text-sm mb-2">
                        Order fixed by
                      </label>
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
                      <label className="block text-sm mb-2">Category</label>
                      <input
                        type="text"
                        name="categorie"
                        placeholder="Type Here"
                        value={formData.categorie}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-7">
                  <h2 className="text-lg font-semibold mb-3">Payments</h2>
                  <div>
                    <label className="block text-sm mb-2">Total Amount</label>
                    <input
                      type="text"
                      name="totalAmount"
                      placeholder="Total Amount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Paid Amount</label>
                    <input
                      type="text"
                      name="paidAmount"
                      placeholder="Paid Amount"
                      value={formData.paidAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                {uploading && (
                  <div className="flex flex-col items-center w-full mt-7">
                    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between w-full text-sm">
                      <span>{uploadProgress.toFixed(0)}%</span>
                      <span>
                        Estimated time:{" "}
                        {((1 - uploadProgress / 100) * 10).toFixed(1)}s
                      </span>
                    </div>
                  </div>
                )}

                {error && <div className="text-red-500 mt-5">{error}</div>}
              </div>
              <div className="flex-1 pl-6">
                <label className="block text-sm mb-2">File Upload</label>
                <MultiFileUpload onFilesChange={handleFilesChange} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[42rem] bg-[#6466F1] text-white py-3 rounded hover:bg-[#5355ED] transition-colors text-sm font-medium mx-auto"
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
            <p className="text-center text-lg font-medium text-gray-900">
              Thank you for Submitting your Assignment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOrderPopup;
