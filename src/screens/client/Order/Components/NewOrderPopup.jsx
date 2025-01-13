import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { create_order, cs_names, get_categories } from "../../../../api/Api";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

// import FileUploader from "./FileUploader.jsx";
const NewOrderPopup = ({ setorderPopup }) => {
  const navigate = useNavigate();

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
  });

  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);

  const [csNames, setCsNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const categories = ["finance", "management", "civil", "electronic", "iot"];
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(get_categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET'
      });
      const data = await response.json();
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setIsLoading(false);
    }
  };

  // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.paidAmount) > Number(formData.totalAmount)) {
      setError("Paid Amount cannot be greater than Total Amount");
      return;
    }
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      console.log(formData)
      const response = await fetch(create_order, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      console.log("success:", data.newOrder._id);
      setorderPopup(false)
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      navigate(`/client/orders/view/${data.newOrder._id}`, {
        state: {
          activate: true,
        },
      });
      // setId(data.newOrder._id)
      // // setFileUploadPopup(true)
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.error("Failed:", error);
    }
  };


  useEffect(() => {
    const fetchcs = async () => {
      // setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(cs_names, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cs");
        }

        const data = await response.json();
        setCsNames(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchcs();
    fetchCategories()
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (Number(formData.paidAmount) > Number(formData.totalAmount)) {
  //     setError("Paid Amount cannot be greater than Total Amount");
  //     return;
  //   }

  //   setError("");

  //   const form = new FormData();
  //   for (const key in formData) {
  //     form.append(key, formData[key]);
  //   }

  //   try {

  //     setFormData({
  //       instagramTitle: "",
  //       assignmentTitle: "",
  //       description: "",
  //       deadline: "",
  //       orderFixedBy: "",
  //       file: null,
  //       categories: "",
  //       amount: "",
  //     });
  //   } catch (err) {
  //     setError(err.message || "An error occurred during upload");
  //   } finally {

  //   }
  // };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            <CircularProgress />
            <p className="mt-2 text-lg font-medium">Uploading</p>
          </div>
        </div>
      )}
      <div className="max-w-full  mx-4 bg-white rounded-lg p-8 relative h-[95vh] overflow-y-auto">
        <button
          onClick={() => setorderPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={29} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <div className="flex">
              <div className=" w-[47rem]">
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
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">
                        Order fixed by
                      </label>
                      <select
                        name="orderFixedBy"
                        value={formData.orderFixedBy}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                        required
                      >
                        <option value="" disabled>
                          Select a CS Name
                        </option>
                        {csNames.map((cs) => (
                          <option key={cs._id} value={`${cs.firstName} ${cs.lastName}`}>
                            {cs.firstName} {cs.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Category</label>
                      <select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                        required
                      >
                        <option value="" disabled>
                          Select a Category
                        </option>
                        {/* {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))} */}
                        {categories.map((category) => (
                          <option key={category._id} value={`${category.name}`}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-7">
                  <h2 className="text-lg font-semibold mb-3">Payments</h2>
                  <div>
                    <label className="block text-sm mb-2">Total Amount</label>
                    <input
                      type="number"
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
                      type="number"
                      name="paidAmount"
                      placeholder="Paid Amount"
                      value={formData.paidAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                {error && <div className="text-red-500 mt-5">{error}</div>}
              </div>
              {/* <div className="flex-1 pl-6">
                <label className="block text-sm mb-2">File Upload</label>
                // {/* <FileUploaderWithPopup /> */}
              {/* </div> */}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6466F1] text-white py-3 rounded hover:bg-[#5355ED] transition-colors text-sm font-medium "
          >
            Next
          </button>
          {/* <FileUploader /> */}
        </form>
      </div>

      {/* {showSuccessPopup && (
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
      )} */}
    </div>
  );
};

export default NewOrderPopup;
