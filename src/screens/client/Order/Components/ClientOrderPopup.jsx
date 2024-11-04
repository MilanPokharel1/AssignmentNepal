import React, { useState } from 'react';
import { upload_file } from '../../../api/Api';

const ClientOrderPopup = () => {
  const [formData, setFormData] = useState({
    instagramTitle: '',
    assignmentTitle: '',
    description: '',
    deadline: '',
    orderFixedBy: '',
    file: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (name === 'file') {
      handleFileUpload(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(''); // Reset any previous error

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch(upload_file, {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error('Failed to upload the file.');
      }

      // Handle successful response
      alert('Order submitted successfully!');
      setFormData({
        instagramTitle: '',
        assignmentTitle: '',
        description: '',
        deadline: '',
        orderFixedBy: '',
        file: null,
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
      let uploadedSize = 0; // Start from 0

      const interval = setInterval(() => {
        if (uploadedSize < totalSize) {
          // Simulate upload progress
          uploadedSize += totalSize * 0.1; // Simulating upload of 10% every interval
          const progress = Math.min((uploadedSize / totalSize) * 100, 100);
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Update progress every second
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-6">Basic Information</h2>
          <div className="space-y-4">
            {/* Form fields */}
            <input
              type="text"
              name="instagramTitle"
              value={formData.instagramTitle}
              onChange={handleChange}
              placeholder="Instagram Title"
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
            <input
              type="text"
              name="assignmentTitle"
              value={formData.assignmentTitle}
              onChange={handleChange}
              placeholder="Assignment Title"
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
            <input
              type="file"
              name="file"
              onChange={handleChange} // Changed to handleChange for file input
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
            <input
              type="text"
              name="orderFixedBy"
              value={formData.orderFixedBy}
              onChange={handleChange}
              placeholder="Order Fixed By"
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          {uploading && (
            <div>
              <progress value={uploadProgress} max="100" className="w-full" />
              <div>{uploadProgress.toFixed(0)}% - Estimated time: {((1 - uploadProgress / 100) * 10).toFixed(1)}s</div>
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientOrderPopup;
