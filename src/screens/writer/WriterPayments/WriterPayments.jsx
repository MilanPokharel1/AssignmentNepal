import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { FaChevronDown, FaHourglassEnd } from "react-icons/fa";
import PaymentCard from "./Components/PaymentCard";
import { get_payment, get_withdrawal_request } from "../../../api/Api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IoBookSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import Card from "../WriterMyTask/components/Card";

const WriterPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [completed, setCompleted] = useState(0);
  const [ongoing, setOngoing] = useState(0);
  const [submitted, setSubmitted] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


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
        // console.log("this is data: ", data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with the actual token

        const response = await fetch(get_withdrawal_request, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setCompleted(data.totals.totalEarned)
        setOngoing(data.totals.totalOngoing)
        setSubmitted(data.totals.totalSubmitted)
        // console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  //   {
  //     title:
  //       "This is my second assignment submission eqwnjkdewnudnqewdnoiqenoandlaskndkaslndkasndklasndlkkasdasnlxnasxlasxnsa",
  //     createdAt: "20/02/2024",
  //     method: "Fonepay",
  //     currency: "NPR",
  //     remarks: "First Payment",
  //     amount: 8000,
  //   },
  //   {
  //     title:
  //       "This is my second assignment submission sndiasncasnclkasncoisdacwslkdcnoisdancosdancosc",
  //     createdAt: "20/01/2024",
  //     method: "Fonepay",
  //     currency: "NPR",
  //     remarks: "First Payment",
  //     amount: 7000,
  //   },
  //   {
  //     title:
  //       "It should be relatively short, but still anxcoilasncxoilasndcxoliasnxnlzkm",
  //     createdAt: "20/01/2024",
  //     method: "Fonepay",
  //     currency: "NPR",
  //     remarks: "Mid payment",
  //     amount: 8000,
  //   },
  //   {
  //     title:
  //       "It should be relatively short, but still nsnjakdcnjskdncksdncksdncsdncsd",
  //     createdAt: "20/01/2024",
  //     method: "Cash",
  //     currency: "NPR",
  //     remarks: "Last Payment",
  //     amount: 7000,
  //   },
  // ];

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
      payment.price.toString().includes(searchStr) ||
      payment.createdAt.toLowerCase().includes(searchStr)
    );
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    switch (sortOrder) {
      case "Newest":
        return dateB - dateA;
      case "Oldest":
        return dateA - dateB;
      case "Amount (High to Low)":
        return b.price - a.price;
      case "Amount (Low to High)":
        return a.price - b.price;
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
    <div className="bg-[#fafbfc] p-6 flex-1">
      <div className="  w-full md:w-[95%]">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
            <CircularProgress />
          </div>
        )}
        <div className="flex flex-wrap gap-7 justify-center sm:justify-start mb-5">
          <Card
            Icon={IoBookSharp}
            heading="Total"
            number={submitted + completed + ongoing}
            theme={{ bgColor: "bg-red-100", iconBgColor: "bg-red-400" }}
          />
          <Card
            Icon={MdOutlinePendingActions}
            heading="Ongoing"
            number={ongoing}
            theme={{ bgColor: "bg-purple-100", iconBgColor: "bg-purple-400" }}
          />
          <Card
            Icon={FaHourglassEnd}
            heading="Submitted"
            number={submitted}
            theme={{ bgColor: "bg-yellow-100", iconBgColor: "bg-orange-400" }}
          />

          <Card
            Icon={IoCheckmarkSharp}
            heading="Completed"
            number={completed}
            theme={{ bgColor: "bg-green-100", iconBgColor: "bg-green-400" }}
          />
        </div>
        <div className="flex justify-between items-center md:w-[90%] flex-row-reverse">
          <div className="flex justify-between items-center mb-4 gap-3">
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
        <div className="space-y-4 md:w-[90%]">
          {sortedPayments.length > 0 ? (
            sortedPayments.map((payment, index) => (
              <PaymentCard
                key={index}
                title={highlightText(payment.assignmentTitle, searchTerm)}
                createdAt={highlightText(payment.createdAt, searchTerm)}
                amount={highlightText(`Rs ${payment.price}`, searchTerm)}
                status={payment.status}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default WriterPayments;
