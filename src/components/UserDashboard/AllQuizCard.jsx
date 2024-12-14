"use client";

import { Eye, Play } from 'lucide-react';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function AllQuizCard({
  title,
  dueDate,
  description,
  status,
  duration,
  totalQuestions,
  score,
}) {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsStarted(true);
    // Add logic to start the quiz
    console.log("Starting quiz:", title);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="bg-green-500">
            Completed
          </Badge>
        );
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md min-w-[100px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View quiz details</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="space-y-4">
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>Due date: {dueDate}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quiz Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Duration: {duration} minutes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Questions: {totalQuestions}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Status</h4>
                  {getStatusBadge(status)}
                </div>
                {score !== undefined && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Score</h4>
                    <p className="text-sm font-medium">
                      {score} / {totalQuestions}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {(status === "pending" || status === "upcoming") && (
              <div className="border-t pt-4 mt-auto">
                <Button
                  className="w-full"
                  onClick={handleStartQuiz}
                  disabled={isStarted || status === "upcoming"}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isStarted ? "Quiz In Progress" : "Start Quiz"}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
          {getStatusBadge(status)}
        </div>
        {score !== undefined && (
          <p className="text-sm font-medium mt-2 border-2 w-fit py-2 px-4 rounded-md">
            Score: {score} / {totalQuestions}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

