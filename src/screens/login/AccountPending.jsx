import React from "react";
import { Phone, Mail, AlertTriangle, ArrowRight } from "lucide-react";

const AccountStatus = ({ status = "pending" }) => {
  const statusConfig = {
    pending: {
      title: "Account Verification Pending",
      description:
        "Your account is currently under comprehensive review. Our team is carefully processing your application to ensure all details meet our standards.",
      color: "amber",
      icon: AlertTriangle,
    },
    disabled: {
      title: "Account Access Restricted",
      description:
        "Your account access has been temporarily suspended. We recommend contacting our support team for detailed information and resolution steps.",
      color: "red",
      icon: AlertTriangle,
    },
  };

  const {
    title,
    description,
    color,
    icon: StatusIcon,
  } = statusConfig[status] || statusConfig.pending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full md:max-w-[50%] max-w-xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform transition-all hover:shadow-3xl">
          <div className="p-6 md:p-10 text-center">
            <div className="flex flex-col items-center mb-6">
              <StatusIcon
                className={`mb-4 text-${color}-500`}
                size={72}
                strokeWidth={1.5}
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                {title}
              </h1>
            </div>

            <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed px-4 md:px-8">
              {description}
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mx-4 md:mx-8 mb-6">
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-1 bg-white rounded-lg border border-blue-100 p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Phone className="mr-3 text-blue-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Direct Support
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      1-800-SUPPORT
                    </span>
                    <ArrowRight className="text-blue-500" size={20} />
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-lg border border-blue-100 p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Mail className="mr-3 text-green-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Email Support
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      support@company.com
                    </span>
                    <ArrowRight className="text-green-500" size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 italic px-4 md:px-8">
              Need immediate assistance? Our support team is standing by to help
              you resolve any outstanding issues.
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Company Name. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
