function NoQuizzesMessage({ selectedCourse, selectedBatch }) {
  return (
    <div className="text-center py-8 w-full">
      {selectedCourse === "all" || selectedBatch === "all" ? (
        <div className="max-w-full mx-auto p-6 rounded-lg shadow-lg">
          <div className="text-white mb-3">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            No Quizzes Selected
          </h3>
          <p className="text-white text-base md:text-lg">
            Please select both a{" "}
            <span className="font-bold text-yellow-200 text-xl">
              Course
            </span>{" "}
            and{" "}
            <span className="font-bold text-yellow-200 text-xl">Batch</span>{" "}
            from the filters above to view available quizzes.
          </p>
        </div>
      ) : (
        <p className="text-center text-lg">No quizzes found.</p>
      )}
    </div>
  );
}

export default NoQuizzesMessage; 