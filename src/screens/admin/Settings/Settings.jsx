import React, { useState, useEffect } from "react";
import { Save, Upload, X } from "lucide-react";
import { get_settings, update_settings } from "../../../api/Api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Categories from "./components/Categories";

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
  const [paymentMethodsOld, setPaymentMethodsOld] = useState({
    staticQr: false,
    dynamicQr: false,
    cardPayment: false,
  });

  const [appPass, setAppPassword] = useState("");
  const [appPassOld, setAppPasswordOld] = useState("");
  const [emailuser, setEmailuser] = useState("");
  const [emailuserOld, setEmailuserOld] = useState("");
  const [folderId, setFolderId] = useState("");
  const [folderIdOld, setFolderIdOld] = useState("");
  const [serviceAccountObject, setServiceAccountObject] = useState("");
  const [serviceAccountObjectOld, setServiceAccountObjectOld] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceModeOld, setMaintenanceModeOld] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isEmailPassChanged, setIsEmailPasschanged] = useState(false);
  const [isDriveFileChanged, setIsDriveFileChanged] = useState(false);
  const [showNotice, setShowNotice] = useState(false)


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
        const token = localStorage.getItem("token");
        const response = await fetch(get_settings, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        const responseData = data.data
        if (data.success) {
          // Populate state with API data
          setLogo(responseData.logo ? `/uploads/${responseData.logo}` : null);
          setStaticQr(responseData.qrcode ? `/uploads/${responseData.qrcode}` : null);
          setPaymentMethods(
            responseData.paymentMethods
          );

          console.log("fromserver: ", responseData.paymentMethods)
          setPaymentMethodsOld(
            responseData.paymentMethods
          );
          setAppPassword(responseData.appPass || "");
          setAppPasswordOld(responseData.appPass || "");
          setEmailuser(responseData.emailuser || "");
          setEmailuserOld(responseData.emailuser || "");
          setFolderId(responseData.folderId || "");
          setFolderIdOld(responseData.folderId || "");
          setServiceAccountObject(responseData.driveCredentials || "");
          setServiceAccountObjectOld(responseData.driveCredentials || "");
          setMaintenanceMode(responseData.maintenanceMode || "");
          setMaintenanceModeOld(responseData.maintenanceMode || "");
        }

        console.log(Object.keys(paymentMethods));
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
      JSON.stringify(paymentMethods) !==
      JSON.stringify(paymentMethodsOld) ||
      maintenanceMode !== maintenanceModeOld;

    setIsChanged(hasChanges);
  }, [paymentMethods, maintenanceMode, appPass, folderId, emailuser, serviceAccountObject]);


  useEffect(() => {
    const hasChanges =
      appPass !== appPassOld ||
      emailuser !== emailuserOld
    setIsEmailPasschanged(hasChanges);
  }, [paymentMethods, maintenanceMode, appPass, folderId, emailuser, serviceAccountObject]);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(serviceAccountObject) !==
      JSON.stringify(serviceAccountObjectOld) ||
      folderId !== folderIdOld
    setIsDriveFileChanged(hasChanges);
  }, [paymentMethods, maintenanceMode, appPass, folderId, emailuser, serviceAccountObject]);





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
          folderId: folderId,
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

  const updateDriveSecrets = async () => {
    setIsLoading(true)
    try {

      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(update_settings, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          folderId: folderId,
          driveCredentials: serviceAccountObject,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      setShowNotice(true)
      setIsDriveFileChanged(false)

      console.log("success:", data);
    } catch (error) {
      console.error("Failed:", error);
    } finally {


      setIsLoading(false)

      setTimeout(() => {
        setShowNotice(false)
      }, 7000)
    }
  };


  const updateOther = async () => {
    console.log("Update other");
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token"); // Replace with the actual token
      const response = await fetch(update_settings, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentMethods: paymentMethods,
          maintenanceMode: maintenanceMode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      console.log("success:", data);
      setShowNotice(true)
      setIsChanged(false)
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setShowNotice(false)
      }, 7000)
    }
  };

  const updateEmailPassword = async () => {
    setIsLoading(true)
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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Creating User:", errorData);
        return;
      }

      const data = await response.json();
      console.log("success:", data);
      setShowNotice(true)
      setIsEmailPasschanged(false)

    } catch (error) {
      console.error("Failed:", error);
    }
    finally {
      setIsLoading(false)
      setTimeout(() => {
        setShowNotice(false)
      }, 7000)
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
      {showNotice && (
        <div
          className="z-50 fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded transform transition-all duration-500 ease-in-out"
        >
          ✔ Setting Update Successfully!
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
        <div>
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
            {isEmailPassChanged && (
              <div className="flex justify-end mt-7">
                <button
                  onClick={() => updateEmailPassword()}
                  disabled={!isEmailPassChanged}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition 
             
                 bg-[#5d5fef] text-white hover:bg-[#5d5fef]
            
            `}
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            )}
            <div className="mt-4">
              <label htmlFor="folderId" className="block text-gray-700">
                Folder Id
              </label>
              <input
                type="string"
                id="folderId"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
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
            {isDriveFileChanged && (
              <div className="flex justify-end mt-7">
                <button
                  onClick={() => updateDriveSecrets()}
                  disabled={!isDriveFileChanged}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition 
             
                 bg-[#5d5fef] text-white hover:bg-[#5d5fef]
            
            `}
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            )}
          </div>

          <Categories />

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
                onClick={() => updateOther()}
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
