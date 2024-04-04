import React, { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (query) => {
    setLoading(true);
    try {
      const res = await promise(query);
      if (res?.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, dependencies);

  return {
    data,
    error,
    loading,
    refetch: fetch,
  };
};

export default useQuery;
