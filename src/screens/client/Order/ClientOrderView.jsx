import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/solid"; // Import the folder icon

const ClientOrderView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      user: "Client Name",
      date: "6 Jan 2012",
      text: "Completing assignments on time requires proper planning, time management, and dedication",
    },
  ]);

  useEffect(() => {
    console.log(`Fetching order details for order ID: ${id}`);
    // Placeholder for fetching order data based on `id`
  }, [id]);

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const contactRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/;

    if (contactRegex.test(input)) {
      alert("Entering contact numbers is against the rules.");
    } else {
      setComment(input);
    }
  };

  const handleCommentSubmit = () => {
    if (comment) {
      setComments([
        ...comments,
        {
          user: "Dhananjaya Raut",
          date: new Date().toLocaleDateString(),
          text: comment,
        },
      ]);
      setComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Assignment</h2>

      {/* Assignment Info Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Assignment Title:</label>
        <input
          type="text"
          placeholder="This is my second assignment i su..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block font-semibold mb-1">Descriptions:</label>
        <textarea
          placeholder="Completing assignments on time requires proper planning, time management, and dedication. ..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          readOnly
        />
      </div>

      {/* Files Section */}
      <div className="flex justify-between mb-6">
        <div>
          <h4 className="font-semibold mb-2">Uploaded Files</h4>
          <div className="flex items-center space-x-2">
            <FolderIcon className="h-5 w-5 text-yellow-500" />
            <a href="/path/to/download" download>
              theprojekts-design-tokens.zip
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Downloads Available</h4>
          <div className="flex items-center space-x-2">
            <FolderIcon className="h-5 w-5 text-yellow-500" />
            <a href="/path/to/download" download>
              finalaccounting.zip
            </a>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-4">Comments:</h4>
        <div className="space-y-4">
          {comments.map((c, idx) => (
            <div key={idx} className="p-2 bg-gray-100 rounded-lg">
              <strong className="text-sm font-medium">{c.user}</strong>{" "}
              <span className="text-xs text-gray-500">{c.date}</span>
              <p className="mt-1 text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Comment as Dhananjaya Raut..."
          value={comment}
          onChange={handleCommentChange}
          className="w-full mt-4 p-2 border border-gray-300 rounded resize-none"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ClientOrderView;
