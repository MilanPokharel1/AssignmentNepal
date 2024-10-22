import React, { useState } from "react";
import { SlLogin } from "react-icons/sl";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons

// Importing social login components
import GoogleLoginComponent from "./components/GoogleLoginComponent";
import FacebookLoginComponent from "./components/FacebookLoginComponent";
import AppleLoginComponent from "./components/AppleLoginComponent";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="h-[70vh] w-[35%] bg-white rounded-lg shadow-[0px_4px_100px_rgba(0,0,0,0.18)] flex flex-col justify-between items-center p-8">
        {/* Icon Section */}
        <div className="rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.40)] h-auto w-[12%] p-5 flex justify-center items-center">
          <SlLogin className="text-4xl" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-8">Sign in with the email</h1>

        {/* Form Section */}
        <div className="w-full flex flex-col items-center space-y-4">
          {/* Email Input */}
          <div className="w-[80%]">
            <input
              type="text"
              placeholder="E-mail"
              className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
            />
          </div>

          {/* Password Input */}
          <div className="w-[80%] relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3 cursor-pointer text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
              {/* Eye icon */}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="w-[80%] text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Get Started Button */}
          <button className="w-[80%] bg-blue-600 text-white py-3 rounded-md text-lg font-semibold shadow-lg">
            Get Started
          </button>
        </div>

        {/* OR Divider */}
        <div className="w-full flex justify-center items-center mt-6">
          <div className="w-[40%] h-[1px] bg-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <div className="w-[40%] h-[1px] bg-gray-300"></div>
        </div>

        {/* Social Login Components */}
        <div className="flex space-x-4 my-6">
          {/* Google Login */}
          <GoogleLoginComponent />
          {/* Facebook Login */}
          <FacebookLoginComponent />
          {/* Apple Login */}
          {/* <AppleLoginComponent /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
