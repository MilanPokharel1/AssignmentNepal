import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const clientId = '698971141602-9cscdsepkoln8c5gs65c0o26qmgtr9ro.apps.googleusercontent.com';

  const handleLoginSuccess = async (response) => {
    try {
      // Log the response for debugging
      console.log('Login Success:', response);

      // Get the credential (ID token)
      const { credential } = response;
      const decodedToken = jwtDecode(credential);
      console.log('Decoded Token:', decodedToken);

      // Send the token to your backend for verification and session creation
      const res = await fetch('http://localhost:3000/api/v1/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      // Check if the response is OK (status in the range 200-299)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await res.json();
      console.log('Backend Response:', data);

      // Save the JWT token received from the backend to local storage or state management
      localStorage.setItem('token', data.token);

      navigate(`/${data.user.role}-dashboard`);
      // Redirect user or perform other actions as needed
    } catch (error) {
      console.error('Error during login process:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
