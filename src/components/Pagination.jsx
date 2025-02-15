import React, { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePaginate } from "@/context/PaginateContext";

const Pagination = () => {
  const {
    page,
    totalPages,
    limit,
    currentPageInput,
    handleNextPage,
    handlePreviousPage,
    handlePageInputChange,
    handlePageInputSubmit,
    handleLimitChange,
    setPage,
    setCurrentPageInput,
  } = usePaginate();
  console.log("totalpages=>", totalPages);
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
      setCurrentPageInput(totalPages.toString());
    }
  }, [totalPages, page, limit]);
  return (
    <div className="grid grid-cols-3 items-center mt-6">
      <div>
        <Button
          onClick={handlePreviousPage}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <form onSubmit={handlePageInputSubmit} className="flex items-center">
          <Input
            type="number"
            value={page}
            onChange={handlePageInputChange}
            className="w-16 text-center"
            min={1}
            max={totalPages}
          />
          <span className="mx-2">/</span>
          <span>{totalPages}</span>
        </form>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 5, 10, 50, 100].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleNextPage}
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
