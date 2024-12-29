import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const duesData = [
  {
    name: "John Doe",
    role: "Student",
    amount: 500,
    status: "Unpaid",
    profilePic: "path/to/john.jpg",
  },
  {
    name: "Jane Smith",
    role: "Teacher",
    amount: 1500,
    status: "Unpaid",
    profilePic: "path/to/jane.jpg",
  },
  {
    name: "Alice Johnson",
    role: "Student",
    amount: 300,
    status: "Paid",
    profilePic: "path/to/alice.jpg",
  },
];

const Dues = () => {
  const [filter, setFilter] = useState("Student");

  const filteredData = duesData.filter((due) => due.role === filter);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dues</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-scroll ">
        <div className="flex justify-between mb-4 items-center min-w-[350px]">
          <div className="flex justify-start items-center gap-5 ">
            <button
              className={`px-4 py-2 rounded ${
                filter === "Student"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
              onClick={() => setFilter("Student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Teacher"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
              onClick={() => setFilter("Teacher")}
            >
              Teacher
            </button>
          </div>

          <div className=" flex justify-end items-center">
            <Button asChild>
              <Link to={`/admin/dashboard/${filter.toLowerCase()}s`}>
                View All
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-4 min-w-[350px]">
          {filteredData.map((due, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <div className="flex items-center">
                <img
                  src={due.profilePic}
                  alt={due.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{due.name}</div>
                  <div className="text-sm text-gray-500">{due.role}</div>
                </div>
              </div>
              <div>
                <div className="font-semibold">${due.amount}</div>
                <div
                  className={`text-sm ${
                    due.status === "Unpaid" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {due.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dues;
