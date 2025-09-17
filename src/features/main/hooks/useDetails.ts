import $api from "@/shared/api";
import { useEffect, useState } from "react";

export const useDetails = (code: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const url = code ? `/search/${code}` : "/search/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get(url);
        const data = response.data;
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [code]);

  return { detailsData: data, isLoading: loading };
};
