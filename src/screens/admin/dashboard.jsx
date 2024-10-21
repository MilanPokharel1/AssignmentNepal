import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Navigate back to the login page
    navigate('/');
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-5">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="hover:bg-gray-200">
              <a href="#" className="block px-4 py-2">Home</a>
            </li>
            <li className="hover:bg-gray-200">
              <a href="#" className="block px-4 py-2">Profile</a>
            </li>
            <li className="hover:bg-gray-200">
              <a href="#" className="block px-4 py-2">Settings</a>
            </li>
            <li className="hover:bg-gray-200">
            <a onClick={handleLogout} className="block px-4 py-2">Logout</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-5">Welcome to the Admin Dashboard!</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Card 1</h3>
            <p className="mt-2">Some information about card 1.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Card 2</h3>
            <p className="mt-2">Some information about card 2.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Card 3</h3>
            <p className="mt-2">Some information about card 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
