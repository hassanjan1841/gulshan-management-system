import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PaginateContext = createContext();

// Create a provider component
export const PaginateProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);    
  const [currentPageInput, setCurrentPageInput] = useState("1");

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageInputChange = (e) => {
    setCurrentPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const newPage = Number(currentPageInput);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    } else {
      setCurrentPageInput(page.toString());
    }
  };

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1); // Reset to first page when changing limit
  };

  return (
    <PaginateContext.Provider
      value={{
        page,
        totalPages,
        limit,
        currentPageInput,
        setTotalPages,
        handleNextPage,
        handlePreviousPage,
        handlePageInputChange,
        handlePageInputSubmit,
        handleLimitChange,
      }}
    >
      {children}
    </PaginateContext.Provider>
  );
};

// Custom hook to use the PaginateContext
export const usePaginate = () => {
  return useContext(PaginateContext);
};
