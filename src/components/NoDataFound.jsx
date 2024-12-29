import React from "react";

const NoDataFound = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold mb-4">No Data Found</h2>
      <p className="text-gray-600">
        Try adjusting your filters or check back later.
      </p>
    </div>
  );
};

export default NoDataFound;
