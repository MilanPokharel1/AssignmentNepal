import React from 'react'

const ClientOrder = () => {
  return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Basic Information Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-6">Basic Information</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">Instagram Title</label>
                <input 
                  type="text" 
                  placeholder="Type Here"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">Assignment Title</label>
                <input 
                  type="text" 
                  placeholder="Type Here"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
            </div>
  
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">Description</label>
                <input 
                  type="text" 
                  placeholder="Type Here"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">Deadline</label>
                <input 
                  type="text" 
                  placeholder="Choose the date"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
            </div>
  
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">File Upload</label>
                <input 
                  type="text" 
                  placeholder="choose the file"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1.5">Order fixed by</label>
                <input 
                  type="text" 
                  placeholder="Type Here"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Payments Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900">Payments</h2>
        </div>
  
        {/* Submit Button */}
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
          Submit
        </button>
      </div>
    );
}

export default ClientOrder;