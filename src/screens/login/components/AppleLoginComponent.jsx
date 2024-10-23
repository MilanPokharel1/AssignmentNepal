import React from 'react';
import AppleLogin from 'react-apple-login';

const AppleLoginComponent = () => {
  const clientId = 'YOUR_APPLE_CLIENT_ID';
  const redirectURI = 'YOUR_REDIRECT_URI';  // The URL where Apple will send the user after login

  const onSuccess = (response) => {
    console.log("Apple Login Success:", response);
    // You can send response.authorization.code to your backend for further verification
  };

  const onFailure = (response) => {
    console.log("Apple Login Failed:", response);
  };

  return (
    <AppleLogin
      clientId={clientId}
      redirectURI={redirectURI}
      responseType={"code"} // You can also request for 'id_token'
      responseMode={"query"}
      usePopup={true}  // Opens login in a popup instead of a redirect
      onSuccess={onSuccess}
      onFailure={onFailure}
      className="w-10 h-10 p-2 bg-gray-100 rounded-full shadow-lg cursor-pointer"
    />
  );
};

export default AppleLoginComponent;
