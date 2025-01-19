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
    totalAmount: "",
    paidAmount: "",
    paymentMethod: "Cash",
    paymentCurrency: "Rs",
  });

  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);

  // const [csNames, setCsNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const categories = ["finance", "management", "civil", "electronic", "iot"];
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(get_categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const data = await response.json();
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      // console.log(formData);
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
      // console.log("success:", data.newOrder._id);
      setorderPopup(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      navigate(`/client/orders/view/${data.newOrder._id}`, {
        state: {
          activate: true,
        },
      });
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.error("Failed:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

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
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">
                        Instagram Name
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
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">
                        Assignment Title
                      </label>
                      <textarea
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
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm min-h-24"
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
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
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
                    <label className="block text-sm mt-5 mb-2">
                      Paid Amount
                    </label>
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
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6466F1] text-white py-3 rounded hover:bg-[#5355ED] transition-colors text-sm font-medium "
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOrderPopup;
