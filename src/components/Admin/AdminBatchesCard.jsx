import React, { useEffect, useState } from "react";
import { deleteBatch, getBatches } from "../../services/api/batches";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BatchDetailSheet from "./BatchDetailSheet";
import Loader from "../Loader";
import ConfirmDialog from "../ConfirmDialog";
import UpdateBatchSheet from "./UpdateBatchSheet";
import { useBatchContext } from "../../context/batchContext";
import { toast } from "react-toastify";

const fetchBatches = async (course) => {
  let courses = await getBatches(course);

  return courses;
};

const AdminBatchesCard = ({ course }) => {
  const [batches, setBatches] = useState([]);
  // const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  // const { page, limit, setTotalPages } = usePaginate();
  // const limit = 9;
  const { changingInBatch, SetChangingInBatch } = useBatchContext();

  useEffect(() => {
    const loadBatches = async () => {
      try {
        setLoading(true);
        const newBatches = await fetchBatches(course._id);
        setBatches(newBatches.batches);
        // setTotalPages(newBatches.totalPages);
        setLoading(false);
      } catch (error) {
        if (error.response.data.error) {
          setBatches({
            error: error.response.data.error,
            message: error.response.data.message,
          });
          setLoading(false);
        } else {
          console.log("error in system>", error);
        }
      }
    };
    loadBatches();
  }, [course]);

  const handleDeleteBatch = async (batchId) => {
    try {
      const batchDelete = await deleteBatch(batchId);
      SetChangingInBatch(() => changingInBatch + 1);
      toast.success("Batch Deleted.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
      toast.error(error.message, {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

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
                  <div className=" py-1 ">
                    <Badge variant="outline" className="flex justify-between">
                      <span>Start Date</span>
                      {new Date(batch.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </div>
                  <div className=" py-1">
                    <Badge variant="outline" className="flex justify-between">
                      <span>End Date</span>
                      {new Date(batch.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex space-x-2">
                  <BatchDetailSheet batchData={batch} />
                  <UpdateBatchSheet batch={batch} />
                </div>

                <ConfirmDialog
                  title="Are you sure?"
                  description="This action cannot be undone. This will permanently delete the branch and remove the data from our servers."
                  onConfirm={() => handleDeleteBatch(batch._id)}
                  triggerText="Delete"
                />
              </CardFooter>
            </Card>
          ))}
          {loading && <Loader />}
        </div>
      )}
    </div>
  );
};

export default AdminBatchesCard;
