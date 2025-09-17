import { useState } from "react";
import { detailsService } from "../services";
import { DetailsProps } from "../types";

export const useDetails = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<DetailsProps[]>([]);

  const searchDetails = async (code: string) => {
    setIsSearching(true);

    try {
      const data = await detailsService.getDetails(code);
      setResults(data);
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    detailsData: results,
    isSearchingDetails: isSearching,
    searchDetails,
  };
};
