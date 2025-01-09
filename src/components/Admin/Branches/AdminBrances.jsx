import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddBranchSheet } from "./AddBranchSheet";
import { UpdateBranchSheet } from "./UpdateBranchSheet";
import { getBranches, deleteBranch } from "@/services/api/branches";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { usePaginate } from "@/context/PaginateContext";
import Pagination from "@/components/Pagination";
import Loader from "../../Loader";
import BranchDetailsSheet from "./BranchDetailSheet";
import ConfirmDialog from "../../ConfirmDialog";

// Mock function to fetch branches
const fetchBranches = async (page, limit) => {
  let branches = await getBranches(page, limit);
  return branches;
};

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const { page, limit, setTotalPages } = usePaginate();

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        const newBranches = await fetchBranches(page, limit);
        setBranches(newBranches.branches);
        setTotalPages(newBranches.totalPages);
        setLoading(false);
      } catch (error) {
        if (error.message === "Network Error") {
          setLoading(false);
          toast({
            title: "Network Error",
            variant: "destructive",
          });
        }
        setLoading(false);
      }
    };
    loadBranches();
  }, [page, limit]);

  const handleDeleteBranch = async (branchId) => {
    try {
      await deleteBranch(branchId);
      setTimeout(() => {
        // Perform the state update after the delay
        setBranches((prevBranches) =>
          prevBranches.filter((branch) => branch._id !== branchId)
        );
      }, 2000);
      toast.success("Branch Deleted Successfully.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    } catch (error) {
      toast.error("Somethin went wrong.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Change the theme if needed
      });
    }
  };

  const handleUpdateBranch = (updatedBranch) => {
    setBranches((prevBranches) =>
      prevBranches.map((branch) =>
        branch._id === updatedBranch._id ? updatedBranch : branch
      )
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Branches</h1>
        <AddBranchSheet
          onBranchAdd={(values) =>
            setBranches((prevBranches) => [values, ...prevBranches])
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches?.map((branch) => (
          <Card key={branch._id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{branch.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {branch.address}, {branch.city}, {branch.country}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary">
                  {branch.students_limit > 0 ? branch.students_limit : 0}{" "}
                  students
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex space-x-2">
                <BranchDetailsSheet branch={branch} />
                <UpdateBranchSheet
                  branch={branch}
                  onBranchUpdate={handleUpdateBranch}
                />
              </div>
              <ConfirmDialog
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete the branch and remove the data from our servers."
                onConfirm={() => handleDeleteBranch(branch._id)}
                triggerText="Delete"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination />
      {loading && <Loader />}
    </div>
  );
};

export default AdminBranches;
