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

import { getBranches } from "@/services/api/branches";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePaginate } from "@/context/PaginateContext";

import Pagination from "@/components/Pagination";
import Loader from "../../Loader";
import BranchDetailsSheet from "./BranchDetailSheet";

// Mock function to fetch branches
const fetchBranches = async (page, limit) => {
  let branches = await getBranches(page, limit);
  return branches;
};

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
                <Badge variant="secondary">{branch.students_limit} students</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-end text-sm text-muted-foreground">
              <div className="mt-4">
                <BranchDetailsSheet branch={branch} />
              </div>
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

