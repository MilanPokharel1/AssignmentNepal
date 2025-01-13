import React, { useState, useEffect } from 'react';
import { add_categories, delete_categories, get_categories } from '../../../../api/Api';
import CircularProgress from "@material-ui/core/CircularProgress";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [showDeleteNotice, setShowDeleteNotice] = useState(false);


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

  const addCategory = async (e) => {
    setIsLoading(true);
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const response = await fetch(add_categories, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName('');
        setShowNotice(true)
        await fetchCategories();
        setTimeout(() => {
          setShowNotice(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${delete_categories}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });

      if (response.ok) {
        setShowDeleteNotice(true)
        await fetchCategories();
        setTimeout(() => {
          setShowDeleteNotice(false);
        }, 3000);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    deleteCategory(id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="" onClick={e => e.stopPropagation()}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      {showNotice && (
        <div
          className="z-50 fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded transform transition-all duration-500 ease-in-out"
        >
          ✔ Category Added Successfully!
        </div>
      )}
      {showDeleteNotice && (
        <div
          className="z-50 fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded transform transition-all duration-500 ease-in-out"
        >
          ✔ Category Deleted Successfully!
        </div>
      )}
      <div className="max-w-2xl bg-white mt-14">
        <h1 className="text-lg font-semibold text-gray-700 mb-4">Category Management</h1>

        {/* Add Category Form */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col gap-4 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={e => e.stopPropagation()}
              placeholder="Enter category name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <button
            onClick={addCategory}
            type="button"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
        </div>

        {/* Category List */}
        <div className='mb-16'>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Existing Categories</h2>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center p-3 bg-white border rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="text-gray-800 font-bold">{category.name}</h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteClick(e, category._id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                    type="button"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No categories found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;