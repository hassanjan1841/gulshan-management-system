import React, { useState } from "react";
import { Table, Button, Typography, Tag, Space, Card, ConfigProvider, theme } from "antd";
import { FileExcelOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const { Title, Text } = Typography;

const mockQuizData = {
  id: "1",
  title: "Math Quiz 1",
  date: "2023-07-15",
  duration: 30,
  totalQuestions: 10,
  description: "Quiz covering Chapter 3 concepts",
};

const mockSubmissions = [
  {
    key: "1",
    studentName: "John Doe",
    sNo: 1,
    submitted: true,
    score: 8,
    timeTaken: 25,
  },
  {
    key: "2",
    studentName: "Jane Smith",
    sNo: 2,
    submitted: true,
    score: 9,
    timeTaken: 28,
  },
  {
    key: "3",
    studentName: "Bob Johnson",
    sNo: 3,
    submitted: false,
    score: null,
    timeTaken: null,
  },
  // Add more mock submissions here
];

function QuizDetail() {
  const [quiz] = useState(mockQuizData);
  const [submissions] = useState(mockSubmissions);
  const { defaultAlgorithm, darkAlgorithm } = theme;

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
      render: (submitted) => (
        <Tag color={submitted ? "success" : "error"} icon={submitted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
          {submitted ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score, record) => 
        record.submitted ? `${score}/${quiz.totalQuestions}` : "N/A",
    },
    {
      title: "Time Taken (minutes)",
      dataIndex: "timeTaken",
      key: "timeTaken",
      render: (timeTaken) => timeTaken ?? "N/A",
    },
  ];

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(submissions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quiz Submissions");
    XLSX.writeFile(wb, `quiz_submissions_${quiz.id}.xlsx`);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: [defaultAlgorithm, darkAlgorithm],
      }}
    >
      <Card style={{ width: '100%', marginBottom: 16 }}>
        <Title level={2}>{quiz.title}</Title>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong>Date:</Text>
          <Text>{quiz.date}</Text>
          <Text strong>Duration:</Text>
          <Text>{quiz.duration} minutes</Text>
          <Text strong>Total Questions:</Text>
          <Text>{quiz.totalQuestions}</Text>
          <Text strong>Description:</Text>
          <Text>{quiz.description}</Text>
        </Space>
      </Card>
      <Title level={3}>Submissions</Title>
      <Button
        icon={<FileExcelOutlined />}
        onClick={handleExport}
        style={{ marginBottom: 16 }}
      >
        Export Submissions to Excel
      </Button>
      <Table
        columns={columns}
        dataSource={submissions}
        pagination={{ pageSize: 10 }}
      />
    </ConfigProvider>
  );
}

export default QuizDetail;

