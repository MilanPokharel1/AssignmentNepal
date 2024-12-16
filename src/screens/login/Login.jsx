import React, { useState, useEffect } from "react";
import { SlLogin } from "react-icons/sl";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";

import GoogleLoginComponent from "./components/GoogleLoginComponent";
import FacebookLoginComponent from "./components/FacebookLoginComponent";
import AppleLoginComponent from "./components/AppleLoginComponent";
import { manual_login } from "../../api/Api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Prevent back navigation
  useEffect(() => {
    localStorage.clear(); // Clear all local storage items

    // Prevent back navigation
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate("/"); // Redirect to home or any other route
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("*Email and password required.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(manual_login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("firstName", data.user.firstName);
        localStorage.setItem("lastName", data.user.lastName);
        localStorage.setItem("picture", data.user.picture);
        localStorage.setItem("status", data.user.status);
        if (data.user.status === "pending") {
          navigate("/pending");
        } else {
          navigate(`/${data.user.role}`);
        }
      } else {
        setIsLoading(false);
        setError(`*${data.error}` || "Login failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="h-[70vh] w-[60%] bg-white rounded-lg shadow-lg flex p-5 loginStyle">
        {/* Social Login Section */}
        <div className="w-1/2 loginStyleDiv flex flex-col items-center justify-center space-y-4 border-r border-gray-200 px-6">
          <div className="w-[74%]">
            <FacebookLoginComponent />
            <GoogleLoginComponent />
          </div>
          {/* <AppleLoginComponent /> */}
        </div>

        {/* Email Login Section */}
        <div className="w-1/2 loginStyleDiv flex flex-col justify-center items-center space-y-4 px-10">
          <div className="flex justify-center items-center w-full">
            <SlLogin className="text-4xl text-gray-600" />
          </div>
          <h1 className="text-2xl font-semibold text-center">
            Sign in with the email
          </h1>
          {error && <div className="w-full text-red-400 text-sm">{error}</div>}

          <input
            type="text"
            placeholder="E-mail or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 cursor-pointer text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <div className="w-full text-right">
            <a href="#" className="text-sm text-[#5D5FEF] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#5D5FEF] text-white py-3 rounded-md text-lg font-semibold shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
