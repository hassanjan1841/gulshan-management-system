import { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import * as XLSX from "xlsx";

const mockData = [
  {
    key: "1",
    title: "Math Assignment 1",
    sNo: 1,
    dueDate: "2023-07-15",
    submissionCount: 25,
  },
  // Add more mock data here
];

function AssignmentTable() {
  const [data, setData] = useState(mockData);

  const columns = [
    {
      title: "S No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Assignment Title",
      dataIndex: "title",
      key: "title",
      // render: (text, record) => (
      //   <Link to={`/teacher/assignments/${record.key}`}>{text}</Link>
      // ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Submission Count",
      dataIndex: "submissionCount",
      key: "submissionCount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
    {
      dataIndex: "title",
      key: "title",
        render: (text, record) => (
          <Link to={`/teacher/assignments/${record.key}`}><Button>See All Sumbissions</Button></Link>
        ),
    },
  ];

  const handleEdit = (record) => {
    // Implement edit functionality
    console.log("Edit", record);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Assignments");
    XLSX.writeFile(wb, "assignments.xlsx");
  };

  return (
    <div>
      <Button
        icon={<FileExcelOutlined />}
        onClick={handleExport}
        className="mb-4"
      >
        Export to Excel
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default AssignmentTable;
