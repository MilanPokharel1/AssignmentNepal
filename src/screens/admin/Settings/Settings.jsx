import React, { useState, useEffect } from "react";
import { Save, Upload, X } from "lucide-react";
import { get_settings, update_settings } from "../../../api/Api";
import CircularProgress from "@material-ui/core/CircularProgress";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [staticQr, setStaticQr] = useState(null);
  const [staticQrFile, setStaticQrFile] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState({
    staticQr: false,
    dynamicQr: false,
    cardPayment: false,
  });

  const [appPass, setAppPassword] = useState("");
  const [emailuser, setEmailuser] = useState("");
  const [serviceAccountObject, setServiceAccountObject] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const initialSettings = {
    logo: null,
    serviceAccountObject: "",
    appPass: "",
    emailuser: "",
    staticQr: null,
    paymentMethods: {
      staticQr: false,
      dynamicQr: false,
      cardPayment: false,
    },
    maintenanceMode: false,
  };

  const handleObjectInputChange = (e) => {
    try {
      setServiceAccountObject(JSON.parse(e.target.value));
    } catch {
      setServiceAccountObject(e.target.value);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(get_settings);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();

        if (data.success) {
          // Populate state with API data
          setLogo(data.data.logo ? `/uploads/${data.data.logo}` : null);
          setStaticQr(data.data.qrcode ? `/uploads/${data.data.qrcode}` : null);
          setPaymentMethods(
            data.data.paymentMethods || initialSettings.paymentMethods
          );
          setAppPassword(data.data.appPass || "");
          setEmailuser(data.data.emailuser || "");
          setServiceAccountObject(data.data.driveCredentials || "");
          console.log(data.data);
          Object.assign(initialSettings, data.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const hasChanges =
      appPass !== initialSettings.appPass ||
      emailuser !== initialSettings.emailuser ||
      serviceAccountObject !== initialSettings.serviceAccountObject ||
      staticQrFile !== null ||
      JSON.stringify(paymentMethods) !==
      JSON.stringify(initialSettings.paymentMethods) ||
      maintenanceMode !== initialSettings.maintenanceMode;

    setIsChanged(hasChanges);
  }, [paymentMethods, maintenanceMode, appPass,emailuser, serviceAccountObject, initialSettings]);

  const handleFileUpload = (e, setFileState, setFileUpload) => {
    const file = e.target.files[0];
    if (file) {
      setFileUpload(file); // Store the actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileState(reader.result); // Store the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (setFileState, setFileUpload) => {
    setFileState(null);
    setFileUpload(null);
  };

  // const handleSave = async () => {
  //   setIsLoading(true);
  //   try {
  //     const formData = new FormData();

  //     // Add files if they exist
  //     if (logoFile) {
  //       formData.append('logo', logoFile);
  //     }
  //     if (staticQrFile) {
  //       formData.append('qrcode', staticQrFile);
  //     }

  //     // Add other fields
  //     if (appPassword) {
  //       formData.append('apppass', appPassword);
  //     }

  //     if (serviceAccountObject) {
  //       formData.append(
  //         'driveCredentials',
  //         typeof serviceAccountObject === 'string'
  //           ? serviceAccountObject
  //           : JSON.stringify(serviceAccountObject)
  //       );
  //     }

  //     formData.append('paymentMethods', JSON.stringify(paymentMethods));

  //     const response = await fetch(update_settings, {
  //       method: 'PUT',
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       // Update initial settings
  //       Object.assign(initialSettings, data.data);

  //       // Reset file states
  //       setLogoFile(null);
  //       setStaticQrFile(null);

  //       setIsChanged(false);
  //     } else {
  //       throw new Error(data.message || 'Failed to update settings');
  //     }
  //   } catch (error) {
  //     console.error('Error saving settings:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSave = async (e) => {
    console.log("clicked");
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(update_settings, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appPass: appPass,
          emailuser: emailuser,
          driveCredentials: serviceAccountObject,
          paymentMethods: paymentMethods,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      console.log("success:", data);
    } catch (error) {
      console.error("Failed:", error);
    }
  };
  const handleSaveLogo = () => {
    console.log("Logo preview URL:", logo);
    console.log("Logo file object:", logoFile);
  };
  const handleSaveQr = () => {
    console.log("Qr preview URL:", staticQr);
    console.log("Qr file object:", staticQrFile);
  };

  // JSX remains the same, but update the file upload handlers
  return (
    <div className="min-h-screen p-4 sm:p-8">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      <div className="p-6 space-y-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Logo Upload */}
          <div>
            <div className="flex justify-between pr-6 items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 ">
                Logo Upload
              </h2>
              <button
                className="bg-[#5d5fef] text-white place-content-center-5 px-5 py-1 rounded-md"
                onClick={handleSaveLogo}
              >
                Save
              </button>
            </div>
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setLogo, setLogoFile)}
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
                      handleRemoveFile(setLogo, setLogoFile);
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
            <div className="flex justify-between pr-4 items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 ">
                Static Qr Code
              </h2>
              <button
                className="bg-[#5d5fef] text-white place-content-center-5 px-5 py-1 rounded-md"
                onClick={handleSaveQr}
              >
                Save
              </button>
            </div>
            <input
              type="file"
              id="staticQrUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(e, setStaticQr, setStaticQrFile)
              }
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
                      handleRemoveFile(setStaticQr, setStaticQrFile);
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
        {/* Security Keys */}
        <form onSubmit={handleSave}>
          <div>
            {/* App Password Field */}
            <div className="mt-4">
              <label htmlFor="emailuser" className="block text-gray-700">
                Email User
              </label>
              <input
                type="string"
                id="emailuser"
                value={emailuser}
                onChange={(e) => setEmailuser(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="appPass" className="block text-gray-700">
                App Password
              </label>
              <input
                type="string"
                id="appPass"
                value={appPass}
                onChange={(e) => setAppPassword(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Service Account Object Field */}
            <div className="mt-4">
              <label
                htmlFor="serviceAccountObject"
                className="block text-gray-700"
              >
                Service Account Object
              </label>
              <textarea
                id="serviceAccountObject"
                value={
                  typeof serviceAccountObject === "string"
                    ? serviceAccountObject
                    : JSON.stringify(serviceAccountObject, null, 2)
                }
                onChange={handleObjectInputChange}
                rows="10"
                className="w-full mt-2 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
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
                    className="mr-3 h-4 w-4 text-[#5d5fef] focus:ring-[#5d5fef]"
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
      bg-gray-400 peer-checked:bg-[#5d5fef] transition-colors
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
                type="submit"
                disabled={!isChanged}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition 
             
                 bg-[#5d5fef] text-white hover:bg-[#5d5fef]
            
            `}
              >
                <Save className="w-5 h-5" />
                Save Settings
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
