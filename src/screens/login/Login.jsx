import React, { useState } from "react";
import { SlLogin } from "react-icons/sl";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from 'react-router-dom';




// Importing social login components
import GoogleLoginComponent from "./components/GoogleLoginComponent";
import FacebookLoginComponent from "./components/FacebookLoginComponent";
import AppleLoginComponent from "./components/AppleLoginComponent";
import { manual_login } from "../../api/Api";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLogin = async () => {
    if (!email || !password) {
      setError("*Email and password required.");
      return;
    }
    setError(""); // Clear previous errors
    setIsLoading(true)
    try {
      const response = await fetch(
        manual_login, // replace with your login API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false)
        console.log(data)
        localStorage.setItem('token', data.token);
        navigate(`/${data.user.role}`);
      } else {
        setIsLoading(false)
        console.error("Login failed:", data.error);
        setError(`*${data.error}` || "Login failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
    setIsLoading(false)
  };

  return (

    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="h-[70vh] w-[30%] bg-white rounded-lg shadow-[10px_4px_100px_rgba(0,0,0,0.18)] flex flex-col justify-between items-center p-2">
        {/* Icon Section */}
        <div className="rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.40)] h-auto w-[12%] p-5 mt-5 flex justify-center items-center">
          <SlLogin className="text-4xl" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-8">Sign in with the email</h1>
        {/* Display error message */}
        {error && (
          <div className="w-[80%] text-red-400 text-sm">{error}</div>
        )}
        {/* Form Section */}
        <div className="w-full flex flex-col items-center space-y-4">

          <div className="w-[80%]">
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
            />
          </div>

          {/* Password Input */}
          <div className="w-[80%] relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <a href="#" className="text-sm text-[#5D5FEF] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleLogin}
            className="w-[80%] bg-[#5D5FEF] text-white py-3 rounded-md text-lg font-semibold shadow-lg">
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
          {/* <AppleLoginComponent /> */
            //https://assignment-nepal-backend-production.up.railway.app/api/v1/
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
