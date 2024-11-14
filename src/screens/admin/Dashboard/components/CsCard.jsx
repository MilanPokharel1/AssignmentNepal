
import React from "react";

const CsCard = ({ name, phoneNumber, status, pic = "" }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-gray-400 font-light">Customer Service</h2>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-gray-500">{phoneNumber}</p>
        </div>
      </div>
      <div
        className={`w-9 h-9 rounded-full ${
          status === "active" ? "bg-emerald-400" : "bg-red-300"
        } shadow-xl`}
      />
    </div>
  );
};

export default CsCard;
