// DownloadComponent.js
import React, { useEffect, useState } from "react";
import { download_file, get_orders } from "../../../api/Api";

const HelpSupport = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_orders, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

  }, []);

  // Function to handle file download
  const handleDownload = async (fileUrl) => {

    try {
      const token = localStorage.getItem("token");
      const fileId = new URL(fileUrl).searchParams.get("id"); // Get the id from the URL
      console.log(fileId)
      if (!fileId) {
        throw new Error("Invalid file URL");
      }

      const response = await fetch(`${download_file}/${fileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Create a blob from the response
      const contentDisposition = response.headers.get('content-disposition');
      let filename;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : 'downloaded_file';
      }


      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // Use the filename from the header, or fall back to a default
      a.download = filename || 'downloaded_file';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-2">Instagram Title</th>
            <th className="border-b p-2">Assignment Title</th>
            <th className="border-b p-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border-b p-2">{order.instagramTitle}</td>
              <td className="border-b p-2">{order.assignmentTitle}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleDownload(order.files[0].fileUrl)} // Ensure fileId is part of your order data
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HelpSupport;
