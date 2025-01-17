import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import PaymentCard from "./components/PaymentCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { get_payment } from "../../../api/Api";
import Card from "../../writer/WriterWithdrawl/components/Card";
import { UseTheme } from "../../../contexts/ThemeContext/useTheme";
import { MdAccountBalance } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdReceipt } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
const CsPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentTheme, themes } = UseTheme();
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_payment, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await response.json();
        setPaymentData(data.payments);
        console.log("this is data: ", data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const parts = text.toString().split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredPayments = paymentData.filter((payment) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      payment.assignmentTitle.toLowerCase().includes(searchStr) ||
      payment.paymentMethod.toLowerCase().includes(searchStr) ||
      payment.remark.toLowerCase().includes(searchStr) ||
      payment.paidAmount.toString().includes(searchStr) ||
      payment.createdAt.toLowerCase().includes(searchStr)
    );
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.createdAt.split("-").reverse().join("-"));
    const dateB = new Date(b.createdAt.split("-").reverse().join("-"));

    switch (sortOrder) {
      case "Newest":
        return dateB - dateA;
      case "Oldest":
        return dateA - dateB;
      case "Amount (High to Low)":
        return b.amount - a.amount;
      case "Amount (Low to High)":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const sortOptions = [
    "Newest",
    "Oldest",
    "Amount (High to Low)",
    "Amount (Low to High)",
  ];

  const NoDataFound = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <ImSearch className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any payments.
      </p>
    </div>
  );

  return (
    <div className="p-6 flex-1 bg-[#fafbfc] w-full ">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
      {/* <div className="flex flex-wrap gap-7 justify-center sm:justify-start mb-14">
        <Card
          Icon={MdAccountBalance}
          heading="Balance"
          number={40}
          theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
        />
        <Card
          Icon={MdPendingActions}
          heading="Pending"
          number={40}
          theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
        />
        <Card
          Icon={MdReceipt}
          heading="Withdrawaled"
          number={40}
          theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
        />

        <Card
          Icon={FaMoneyBillWave}
          heading="Total"
          number={40}
          theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
        />
      </div> */}
      <div className="flex justify-between items-center flex-row-reverse max-w-[85%]">
        <div className="flex justify-between items-center mb-4 mr-9 gap-3 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="p-2 px-4 pl-10 border-none rounded-2xl bg-[#dbedff] md:w-64  w-44 focus:border-none  outline-none focus:ring-2 focus:ring-blue-300 focus:bg-[#dbedff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
          </div>
          <div className="relative text-sm">
            <button
              className="p-2 border border-gray-300 rounded-lg bg-[#dbedff] flex items-center gap-2  w-56 md:w-64"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="flex-1 font-medium">
                <span className="text-sm text-gray-600">Sort by:&ensp;</span>
                {sortOrder}
              </div>
              <FaChevronDown className="h-4 w-4" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-base">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortOrder(option);
                      setShowOptions(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {sortedPayments.length > 0 ? (
          sortedPayments.map((payment, index) => (
            <PaymentCard
              key={index}
              title={highlightText(payment.assignmentTitle, searchTerm)}
              createdAt={highlightText(payment.createdAt, searchTerm)}
              name={highlightText(payment.firstName, searchTerm)}
              cast={highlightText(payment.lastName, searchTerm)}
              method={highlightText(payment.paymentMethod, searchTerm)}
              currency={payment.paymentCurrency}
              remarks={highlightText(payment.remark, searchTerm)}
              amount={highlightText(`Rs ${payment.paidAmount}`, searchTerm)}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default CsPayments;
