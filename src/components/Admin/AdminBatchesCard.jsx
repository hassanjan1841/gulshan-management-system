import React, { useEffect, useState } from "react";
import { getBatches } from "../../services/api/batches";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const fetchBatches = async (course, page, limit) => {
  let courses = await getBatches(course, page, limit);
  return courses;
};

const AdminBatchesCard = ({ course }) => {
  const [batches, setBatches] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 9;

  useEffect(() => {
    const loadBatches = async () => {
      try {
        setLoading(true);
        const newBatches = await fetchBatches(course._id, page, limit);
        console.log("newBatches", newBatches);
        
        setBatches(newBatches.batches);
        setLoading(false);
      } catch (error) {
        if (error.response.data.error) {
          setBatches({
            error: error.response.data.error,
            message: error.response.data.message,
          });
          setLoading(false);
        }else{
          console.log("error in system>", error);
        }
      }
    };
    loadBatches();
  }, [page]);
  return (
    <div className="">
      {batches?.error ? (
        <Card className="border bg-muted/50 w-[320px]">
          <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-center p-6">
            <CardDescription className="text-lg mb-4">
              No batches created for this course yet
            </CardDescription>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Batch
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches?.map((batch) => (
            <Card
              key={batch._id}
              className="border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {batch.title}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {batch.description}
                    </CardDescription>
                  </div>
                  <div className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                    Active
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-1 border-t">
                    <span className="text-muted-foreground font-medium">
                      Start Date
                    </span>
                    <span className="tabular-nums">
                      {new Date(batch.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t">
                    <span className="text-muted-foreground font-medium">
                      End Date
                    </span>
                    <span className="tabular-nums">
                      {new Date(batch.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Link to={`/admin/dashboard/batches/${batch._id}`}>
                    <Button variant='outline'>View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBatchesCard;
