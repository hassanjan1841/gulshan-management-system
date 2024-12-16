import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import DataTable from "../DataTable";
import { useNavigate } from "react-router";

const AssignmentTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "sNo",
      header: "S No",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "submissions",
      header: "Submissions",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Edit", row.original)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Delete", row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                navigate(`/teacher/assignments/${row.original.sNo}`)
              }
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        );
      },
    },
  ];

  const fetchData = async (pagination, sorting) => {
    const { pageIndex, pageSize } = pagination;
    const sortField = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "desc" : "asc";

    console.log(
      `Fetching data: page ${pageIndex}, size ${pageSize}, sort ${sortField} ${sortOrder}`
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalItems = 100;
    const data = Array.from({ length: pageSize }, (_, i) => ({
      sNo: pageIndex * pageSize + i + 1,
      title: `Item ${pageIndex * pageSize + i + 1}`,
      submissions: Math.floor(Math.random() * 100),
    }));

    return {
      data,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  };

  return <DataTable columns={columns} fetchData={fetchData} />;
};

export default AssignmentTable;
