import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../Utils/api";
const useFetch = (endpoint) => {
  const [data, setData] = useState();

  useEffect(() => {
    makeApiCall();
  }, [endpoint]);

  const makeApiCall = async () => {
    const res = await fetchDataFromApi(endpoint);
    setData(res);
  };

  return { data };
};
export default useFetch;
