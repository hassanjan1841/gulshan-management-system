import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";





export default function BranchDetailsSheet({ branch }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Details</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{branch.title}</SheetTitle>
          <SheetDescription>Branch Details</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium">Country</h3>
            <p className="text-sm text-muted-foreground">{branch.country}</p>
            <h3 className="text-sm font-medium">City</h3>
            <p className="text-sm text-muted-foreground">{branch.city}</p>
            <h3 className="text-sm font-medium">Address</h3>
            <p className="text-sm text-muted-foreground">{branch.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Student Limit</h3>
            <Badge variant="secondary">{branch.students_limit} students</Badge>
          </div>
          
        </div>
      </SheetContent>
    </Sheet>
  );
}

