import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import PaymentCard from "./Components/PaymentCard";

const ClientPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);

  const paymentData = [
    {
      title:
        "This is my second assignment submission eqwnjkdewnudnqewdnoiqenoandlaskndkaslndkasndklasndlkkasdasnlxnasxlasxnsa",
      date: "20/02/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 8000,
    },
    {
      title:
        "This is my second assignment submission sndiasncasnclkasncoisdacwslkdcnoisdancosdancosc",
      date: "20/01/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "First Payment",
      amount: 7000,
    },
    {
      title:
        "It should be relatively short, but still anxcoilasncxoilasndcxoliasnxnlzkm",
      date: "20/01/2024",
      method: "Fonepay",
      currency: "NPR",
      remarks: "Mid payment",
      amount: 8000,
    },
    {
      title:
        "It should be relatively short, but still nsnjakdcnjskdncksdncksdncsdncsd",
      date: "20/01/2024",
      method: "Cash",
      currency: "NPR",
      remarks: "Last Payment",
      amount: 7000,
    },
  ];

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
      payment.title.toLowerCase().includes(searchStr) ||
      payment.method.toLowerCase().includes(searchStr) ||
      payment.remarks.toLowerCase().includes(searchStr) ||
      payment.amount.toString().includes(searchStr) ||
      payment.date.toLowerCase().includes(searchStr)
    );
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));

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
        We couldn't find any payments matching "{searchTerm}". Try adjusting
        your search terms or filters.
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Clear Search
      </button>
    </div>
  );

  return (
    <div className="p-6 flex-1 bg-[#fafbfc] max-w-[85%]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Payments</h1>
        <div className="flex justify-between items-center mb-4 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="p-2 px-4 pl-10 border-none rounded-2xl bg-[#dbedff] w-64 focus:border-none  outline-none focus:ring-2 focus:ring-blue-300 focus:bg-[#dbedff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
          </div>
          <div className="relative text-sm">
            <button
              className="p-2 border border-gray-300 rounded-lg bg-[#dbedff] flex items-center gap-2 w-64"
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
              title={highlightText(payment.title, searchTerm)}
              date={highlightText(payment.date, searchTerm)}
              method={highlightText(payment.method, searchTerm)}
              currency={payment.currency}
              remarks={highlightText(payment.remarks, searchTerm)}
              amount={highlightText(`Rs ${payment.amount}`, searchTerm)}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default ClientPayments;
