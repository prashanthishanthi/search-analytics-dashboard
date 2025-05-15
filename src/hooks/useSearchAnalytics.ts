import { useEffect, useState } from "react";
import { generateMockData } from "../utils/generateMockData";
import type { SearchAnalyticsData } from "../types";

export const useSearchAnalytics = (startDate: string, endDate: string, queryFilter: string) => {
  const [data, setData] = useState<SearchAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = generateMockData(startDate, endDate, queryFilter);
        setData(result.searchAnalytics);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, queryFilter]);

  return { data, loading, error, selectedQuery, setSelectedQuery };
};
