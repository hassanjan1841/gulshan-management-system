import React from "react";

import { Button } from "@/components/ui/button";
import { FileText, Link } from "lucide-react";
import DataTable from "../DataTable";

const columns = [
  {
    accessorKey: "sNo",
    header: "S No",
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    id: "submissionType",
    header: "Submission",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <div className="flex space-x-2">
          {submission.fileUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={submission.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="h-4 w-4 mr-2" />
                File
              </a>
            </Button>
          )}
          {submission.linkUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={submission.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link className="h-4 w-4 mr-2" />
                Link
              </a>
            </Button>
          )}
        </div>
      );
    },
  },
];

const SubmissionsTable = ({ assignmentId }) => {
  const fetchData = async (pagination, sorting) => {
    // This is where you would normally fetch data from your API
    // For this example, we'll just return some mock data
    const { pageIndex, pageSize } = pagination;
    const sortField = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "desc" : "asc";

    console.log(
      `Fetching submissions for assignment ${assignmentId}: page ${pageIndex}, size ${pageSize}, sort ${sortField} ${sortOrder}`
    );

    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    const totalItems = 50;
    const data = Array.from({ length: pageSize }, (_, i) => ({
      sNo: pageIndex * pageSize + i + 1,
      studentName: `Student ${pageIndex * pageSize + i + 1}`,
      section: ["A", "B", "C"][Math.floor(Math.random() * 3)],
      score: Math.floor(Math.random() * 101),
      fileUrl:
        Math.random() > 0.5 ? `https://example.com/file${i + 1}.pdf` : null,
      linkUrl:
        Math.random() > 0.5 ? `https://example.com/submission${i + 1}` : null,
    }));

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  };

  return <DataTable columns={columns} fetchData={fetchData} />;
};

export default SubmissionsTable;
