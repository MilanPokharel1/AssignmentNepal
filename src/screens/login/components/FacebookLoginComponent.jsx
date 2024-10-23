import React from 'react';
import FacebookLogin from 'react-facebook-login';

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
      appId={appId} // Replace with your Facebook App ID
      autoLoad={false}
      fields="name,email,picture"
      scope="ads_read,ads_management"
      callback={responseFacebook}
      onFailure={handleFailure}
      icon="fa-facebook"
      cssClass="w-100 h-10 p-2 text-white bg-blue-700 shadow-lg cursor-pointer"
    />
  );
};

export default FacebookLoginComponent;
