import React, { useState, useEffect } from "react";
import { Save, Upload, X } from "lucide-react";

const Settings = () => {
  const [logo, setLogo] = useState(null);
  const [staticQr, setStaticQr] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState({
    staticQr: false,
    dynamicQr: false,
    cardPayment: false,
  });
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [isChanged, setIsChanged] = useState(false);

  // Initial settings state for comparison
  const initialSettings = {
    logo: null,
    staticQr: null,
    paymentMethods: {
      staticQr: false,
      dynamicQr: false,
      cardPayment: false,
    },
    maintenanceMode: false,
  };

  // Function to check if settings have changed
  useEffect(() => {
    const hasChanges =
      logo !== initialSettings.logo ||
      staticQr !== initialSettings.staticQr ||
      JSON.stringify(paymentMethods) !==
        JSON.stringify(initialSettings.paymentMethods) ||
      maintenanceMode !== initialSettings.maintenanceMode;

    setIsChanged(hasChanges);
  }, [logo, staticQr, paymentMethods, maintenanceMode]);

  const handleFileUpload = (e, setFileState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (setFileState) => {
    setFileState(null);
  };

  const handleSave = () => {
    console.log("Saved Settings:", {
      logo,
      staticQr,
      paymentMethods,
      maintenanceMode,
    });

    // Reset to the current state after saving
    initialSettings.logo = logo;
    initialSettings.staticQr = staticQr;
    initialSettings.paymentMethods = { ...paymentMethods };
    initialSettings.maintenanceMode = maintenanceMode;

    setIsChanged(false); // Disable save button
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="p-6 space-y-8">
        {/* Logo Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Logo Upload */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Logo Upload
            </h2>
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setLogo)}
            />
            <label
              htmlFor="logoUpload"
              className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              {logo ? (
                <div className="relative">
                  <img
                    src={logo}
                    alt="Uploaded Logo"
                    className="max-h-40 max-w-full object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFile(setLogo);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="mx-auto mb-2 w-12 h-12" />
                  <p>Click to upload logo</p>
                </div>
              )}
            </label>
          </div>

          {/* Static QR Upload */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Static QR Code
            </h2>
            <input
              type="file"
              id="staticQrUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setStaticQr)}
            />
            <label
              htmlFor="staticQrUpload"
              className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              {staticQr ? (
                <div className="relative">
                  <img
                    src={staticQr}
                    alt="Uploaded Static QR"
                    className="max-h-40 max-w-full object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFile(setStaticQr);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="mx-auto mb-2 w-12 h-12" />
                  <p>Click to upload static QR</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Payment Methods
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.keys(paymentMethods).map((method) => (
              <div
                key={method}
                className="flex items-center border rounded-lg p-3 "
              >
                <input
                  type="checkbox"
                  id={method}
                  checked={paymentMethods[method]}
                  onChange={() => {
                    setPaymentMethods((prev) => ({
                      ...prev,
                      [method]: !prev[method],
                    }));
                  }}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={method} className="text-gray-700 capitalize">
                  {method.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-center gap-2  p-4 rounded-lg">
          <span className="text-gray-700 font-medium">Maintenance Mode</span>
          <label className="flex items-center cursor-pointer">
          <div className="relative">
  {/* Hidden Checkbox */}
  <input
    type="checkbox"
    id="maintenanceModeToggle"
    className="sr-only peer"
    checked={maintenanceMode}
    onChange={(e) => setMaintenanceMode(e.target.checked)}
  />
  
  {/* Background */}
  <div
    className="
      w-10 h-4 rounded-full shadow-inner 
      bg-gray-400 peer-checked:bg-blue-600 transition-colors
    "
  ></div>
  
  {/* Toggle Indicator */}
  <div
    className="
      absolute top-[-2px] left-[-2px] w-6 h-6 bg-white rounded-full shadow 
      transform transition-transform peer-checked:translate-x-6
    "
  ></div>
</div>

          </label>
        </div>

        {/* Save Button */}
        {isChanged && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!isChanged}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition 
             
                 bg-blue-600 text-white hover:bg-blue-700
            
            `}
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
