import React from "react";
import WriterCard from "../WriterDashboard/components/WriterCard";

const assignments = [
  {
    _id: "1",
    assignmentTitle:
      "It should be relatively short, but still management, and dedication.dcscdscfdcvfdvfdvfdvfdvfdvfdvfdvdfvdfvcdssssssssssssssssssssssssssssss",
    status: "Pending",
    totalAmount: 15000,
    payments: [{ paidAmount: 7000 }],
    deadline: "2023-10-06",
    writerName: "Sachet Khatiwada",
    writerPic: "path_to_image.jpg",
  },
  {
    _id: "2",
    assignmentTitle: "Another assignment with similar details.",
    status: "Pending",
    totalAmount: 15000,
    payments: [{ paidAmount: 7000 }],
    deadline: "2023-10-06",
    writerName: "Sachet Khatiwada",
    writerPic: "path_to_image.jpg",
  },
  {
    _id: "2",
    assignmentTitle: "Another assignment with similar details.",
    status: "Assigned",
    totalAmount: 15000,
    payments: [{ paidAmount: 7000 }],
    deadline: "2023-10-06",
    writerName: "Sachet Khatiwada",
    writerPic: "path_to_image.jpg",
  },
];
const WriterOrder = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-wrap gap-4">
        {assignments.map((assignment) => (
          <WriterCard key={assignment._id} {...assignment} />
        ))}
      </div>
    </div>
  );
};

export default WriterOrder;
