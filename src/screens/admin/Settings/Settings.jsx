import React, { useState } from "react";

const Settings = () => {
  const predefinedThemes = [
    {
      name: "Theme 1",
      colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        background: "#F8F9FA",
      },
    },
    {
      name: "Theme 2",
      colors: {
        primary: "#28A745",
        secondary: "#17A2B8",
        background: "#E9ECEF",
      },
    },
    {
      name: "Theme 3",
      colors: {
        primary: "#DC3545",
        secondary: "#FFC107",
        background: "#FFFFFF",
      },
    },
    {
      name: "Theme 4",
      colors: {
        primary: "#6F42C1",
        secondary: "#343A40",
        background: "#F1F1F1",
      },
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState(predefinedThemes[0]);
  const [customTheme, setCustomTheme] = useState({
    primary: "#000000",
    secondary: "#555555",
    background: "#FFFFFF",
  });

  const [logo, setLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState({
    paypal: true,
    stripe: true,
    bankTransfer: true,
  });

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCustomThemeChange = (key, value) => {
    setCustomTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSelectedTheme(null); // Deselect predefined themes
  };

  return (
    <div className="p-6 min-w-[60hw] max-w-[60vw]">

      {/* Theme Options */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Theme Options</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {predefinedThemes.map((theme, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 cursor-pointer ${selectedTheme?.name === theme.name ? "border-black" : "border-transparent"
                }`}
              onClick={() => setSelectedTheme(theme)}
            >
              <div
                className="w-full h-8 rounded mb-2"
                style={{ backgroundColor: theme.colors.primary }}
              ></div>
              <div
                className="w-full h-8 rounded mb-2"
                style={{ backgroundColor: theme.colors.secondary }}
              ></div>
              <div
                className="w-full h-8 rounded"
                style={{ backgroundColor: theme.colors.background }}
              ></div>
              <p className="text-center text-sm mt-2">{theme.name}</p>
            </div>
          ))}
        </div>

        {/* Custom Theme Selector */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Custom Theme</h3>
          <div className="flex items-center gap-4 mb-2">
            <label htmlFor="customPrimary" className="text-sm font-medium">
              Primary:
            </label>
            <input
              type="color"
              id="customPrimary"
              value={customTheme.primary}
              onChange={(e) => handleCustomThemeChange("primary", e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label htmlFor="customSecondary" className="text-sm font-medium">
              Secondary:
            </label>
            <input
              type="color"
              id="customSecondary"
              value={customTheme.secondary}
              onChange={(e) => handleCustomThemeChange("secondary", e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="customBackground" className="text-sm font-medium">
              Background:
            </label>
            <input
              type="color"
              id="customBackground"
              value={customTheme.background}
              onChange={(e) => handleCustomThemeChange("background", e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Logo Update */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Logo Update</h2>
        {logo && <img src={logo} alt="Previous Logo" className="h-24 mb-4" />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setLogo)}
          className="block"
        />
      </div>

      {/* QR Code Update */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment QR Code Update</h2>
        {qrCode && <img src={qrCode} alt="Previous QR Code" className="h-24 mb-4" />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setQrCode)}
          className="block"
        />
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Disable Payment Methods</h2>
        {Object.keys(paymentMethods).map((method) => (
          <div key={method} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={!paymentMethods[method]}
              onChange={() =>
                setPaymentMethods((prev) => ({
                  ...prev,
                  [method]: !prev[method],
                }))
              }
              id={method}
            />
            <label htmlFor={method} className="text-sm font-medium capitalize">
              Disable {method}
            </label>
          </div>
        ))}
      </div>

      {/* Maintenance Mode */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Maintenance Mode</h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            id="maintenanceMode"
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium">
            Enable Maintenance Mode
          </label>
        </div>
      </div>

      {/* Preview Section */}
      <div
        className="p-6 rounded-md"
        style={{
          backgroundColor: selectedTheme?.colors.background || customTheme.background,
          color: selectedTheme?.colors.primary || customTheme.primary,
          border: `1px solid ${selectedTheme?.colors.secondary || customTheme.secondary
            }`,
          transition: "background-color 0.3s ease",
        }}
      >
        <h3 className="text-lg font-semibold mb-2">Theme Preview</h3>
        <p>This is how your theme looks with the current settings!</p>
      </div>
    </div>
  );
};

export default Settings;
