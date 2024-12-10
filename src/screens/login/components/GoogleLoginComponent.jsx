import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { google_login } from "../../../api/Api";
import { FcGoogle } from "react-icons/fc"; // Google icon

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const clientId =
    "698971141602-9cscdsepkoln8c5gs65c0o26qmgtr9ro.apps.googleusercontent.com";

  const handleLoginSuccess = async (response) => {
    try {
      console.log("Login Success:", response);

      const { credential } = response;

      const res = await fetch(google_login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credential }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("Backend Response:", data);

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
    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        text="continue_with"
        size="large"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="flex items-center justify-center w-[100%] h-15 rounded-md bg-white border border-gray-300 shadow-md font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle className="text-2xl mr-2" /> {/* Google icon */}
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
