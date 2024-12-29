import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction, args = [], dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const result = await fetchFunction(...args);
      setData(result);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, ...args]);

  useEffect(() => {
    fetchData();
  }, dependencies); // Run on dependency change

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
