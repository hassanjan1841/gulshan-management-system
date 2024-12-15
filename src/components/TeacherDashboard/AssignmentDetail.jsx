import React, { useState } from "react";
import { Table, Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const mockAssignmentData = {
  id: "1",
  title: "Math Assignment 1",
  dueDate: "2023-07-15",
  description: "Complete problems 1-10 in Chapter 3",
};

const mockSubmissions = [
  {
    key: "1",
    studentName: "John Doe",
    sNo: 1,
    submitted: true,
    fileUrl: "https://example.com/submission1.pdf",
  },
  // Add more mock submissions here
];

function AssignmentDetail() {
  const [assignment] = useState(mockAssignmentData);
  const [submissions] = useState(mockSubmissions);

  const columns = [
    {
      title: "S No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Submitted",
      dataIndex: "submitted",
      key: "submitted",
      render: (submitted) => (submitted ? "Yes" : "No"),
    },
    {
      title: "Submission",
      key: "submission",
      render: (_, record) =>
        record.submitted ? (
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            View Submission
          </a>
        ) : (
          "Not submitted"
        ),
    },
  ];

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(submissions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");
    XLSX.writeFile(wb, `submissions_${id}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
      <p>
        <strong>Due Date:</strong> {assignment.dueDate}
      </p>
      <p>
        <strong>Description:</strong> {assignment.description}
      </p>
      <h2 className="text-xl font-bold mt-8 mb-4">Submissions</h2>
      <Button
        icon={<FileExcelOutlined />}
        onClick={handleExport}
        className="mb-4"
      >
        Export Submissions to Excel
      </Button>
      <Table
        columns={columns}
        dataSource={submissions}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default AssignmentDetail;
