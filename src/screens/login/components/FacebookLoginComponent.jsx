import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FaFacebook } from 'react-icons/fa'; // Facebook icon

const FacebookLoginComponent = () => {
  const appId = '1480573876678632';

  const responseFacebook = (response) => {
    console.log("Facebook Login Success:", response);
    // You can now send response.accessToken to your backend for further processing
  };

  const handleFailure = (response) => {
    console.error("Facebook Login Failed:", response);
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      scope="ads_read,ads_management"
      callback={responseFacebook}
      onFailure={handleFailure}
      cssClass="flex items-center mb-4 p-2 w-full h-14 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
      textButton=""
      icon={
        <div className="flex w-full items-center">
          <FaFacebook className="text-2xl mr-2 ml-3" /> {/* Facebook icon */}
          <span className="flex-grow font-normal text-[13px] text-center">Login with Facebook</span> {/* Centered text */}
        </div>
      }
    />
  );
};

export default FacebookLoginComponent;
