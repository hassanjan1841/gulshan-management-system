import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data with the ability to pass custom functions for fetching or transforming the data.
 *
 * @param {Function} fetchFunction - A custom function for fetching data. Must return a promise.
 * @param {Array} dependencies - Dependencies to re-trigger the fetchFunction.
 *
 * @returns {Object} - { data, loading, error, refetch }
 */
const useFetchData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
