import React from 'react';

const PaymentCard = ({ title, date, method, currency, remarks, amount }) => {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg mb-4">
            <div className="text-gray-600">
                <span className="font-semibold text-blue-600">Assignment Title: </span>
                <span>{title}</span>
            </div>
            <div className="text-gray-500">
                <span className="font-medium">Date: </span>
                <span>{date}</span>
                <span className="mx-4">Payment Method: {method}</span>
            </div>
            <div className="text-gray-500">
                <span className="font-medium">Currency: </span>
                <span>{currency}</span>
            </div>
            <div className="text-gray-500">
                <span className="font-medium">Remarks: </span>
                <span>{remarks}</span>
            </div>
            <div className="text-green-500 font-semibold text-right">
                Amount: {amount}
            </div>
        </div>
    );
};

export default PaymentCard;