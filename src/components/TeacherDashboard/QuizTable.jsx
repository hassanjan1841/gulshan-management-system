// import React, { useState } from 'react';
// import { Table, Button, Popconfirm, Typography } from 'antd';
// import { DeleteOutlined, EditOutlined, FileExcelOutlined, EyeOutlined } from '@ant-design/icons';

// import * as XLSX from 'xlsx';
// import { Link } from 'react-router';

// const { Title } = Typography;

// const mockData = [
//   {
//     key: '1',
//     quizNo: 1,
//     title: 'Math Quiz 1',
//     date: '2023-07-15',
//     submissionCount: 25,
//     averageScore: 85,
//     duration: 30,
//   },
//   {
//     key: '2',
//     quizNo: 2,
//     title: 'Science Quiz 1',
//     date: '2023-07-20',
//     submissionCount: 22,
//     averageScore: 78,
//     duration: 45,
//   },
//   // Add more mock data here
// ];

// export default function QuizTable() {
//   const [data, setData] = useState(mockData);

//   const columns = [
//     {
//       title: 'Quiz No',
//       dataIndex: 'quizNo',
//       key: 'quizNo',
//     },
//     {
//       title: 'Quiz Title',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     {
//       title: 'Quiz Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Submission Count',
//       dataIndex: 'submissionCount',
//       key: 'submissionCount',
//     },
//     {
//       title: 'Average Score',
//       dataIndex: 'averageScore',
//       key: 'averageScore',
//       render: (score) => `${score}%`,
//     },
//     {
//       title: 'Duration (minutes)',
//       dataIndex: 'duration',
//       key: 'duration',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (record) => (
//         <span>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => handleEdit(record)}
//             style={{ marginRight: 8 }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this quiz?"
//             onConfirm={() => handleDelete(record.key)}
//           >
//             <Button icon={<DeleteOutlined />} style={{ marginRight: 8 }} />
//           </Popconfirm>
//           <Link to={`/teacher/quizzes/${record.key}`}>
//             <Button icon={<EyeOutlined />}>View Submissions</Button>
//           </Link>
//         </span>
//       ),
//     },
//   ];

//   const handleEdit = (record) => {
//     // Implement edit functionality
//     console.log('Edit', record);
//   };

//   const handleDelete = (key) => {
//     setData(data.filter((item) => item.key !== key));
//   };

//   const handleExport = () => {
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Quizzes');
//     XLSX.writeFile(wb, 'quizzes.xlsx');
//   };

//   return (
//     <div>
//       <Title level={2}>Quizzes</Title>
//       <Button
//         icon={<FileExcelOutlined />}
//         onClick={handleExport}
//         style={{ marginBottom: 16 }}
//       >
//         Export to Excel
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{ pageSize: 10 }}
//       />
//     </div>
//   );
// };


// shadcn Table 

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { FileIcon, TrashIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { Link } from "react-router";

const mockData = [
  {
    key: "1",
    quizNo: 1,
    title: "Math Quiz 1",
    date: "2023-07-15",
    submissionCount: 25,
    averageScore: 85,
    duration: 30,
  },
  {
    key: "2",
    quizNo: 2,
    title: "Science Quiz 1",
    date: "2023-07-20",
    submissionCount: 22,
    averageScore: 78,
    duration: 45,
  },
];

export default function QuizTable() {
  const [data, setData] = useState(mockData);
  const [deleteItemKey, setDeleteItemKey] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item.key !== deleteItemKey));
    setDeleteItemKey(null);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quizzes");
    XLSX.writeFile(wb, "quizzes.xlsx");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quizzes</h2>
        <Button onClick={handleExport} variant="outline" className="flex items-center">
          <FileIcon className="mr-2" size={16} />
          Export to Excel
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Average Score</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.quizNo}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.submissionCount}</TableCell>
              <TableCell>{item.averageScore}%</TableCell>
              <TableCell>{item.duration} mins</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" onClick={() => setDeleteItemKey(item.key)}>
                        <TrashIcon size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <p>Are you sure you want to delete this quiz?</p>
                      <AlertDialogFooter>
                        <Button variant="ghost">Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Confirm
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Link to={`/teacher/quizzes/${item.key}`}><Button variant='outline'>See All Sumbissions</Button></Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


