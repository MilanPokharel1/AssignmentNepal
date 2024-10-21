import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



const GoogleLoginComponent = () => {
  const clientId = '698971141602-9cscdsepkoln8c5gs65c0o26qmgtr9ro.apps.googleusercontent.com';

  const handleLoginSuccess = (response) => {
    // console.log('Login Success:', response);
    const decodedToken = jwtDecode(response.credential);
    console.log('Decoded Token:', decodedToken);

  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
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
