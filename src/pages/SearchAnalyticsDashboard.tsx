import React, { useState } from "react";
import { useSearchAnalytics } from "../hooks/useSearchAnalytics";
import DateRangePicker from "../components/DateRangePicker";
import SearchFilter from "../components/SearchFilter";
import MetricsTable from "../components/MetricsTable";
import DetailChart from "../components/DetailChart";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const SearchAnalyticsDashboard: React.FC = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState<string>(formatDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState<string>(formatDate(today));
  const [queryFilter, setQueryFilter] = useState<string>('');
  
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  const { 
    data, 
    loading, 
    error, 
    selectedQuery, 
    setSelectedQuery 
  } = useSearchAnalytics(startDate, endDate, queryFilter);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Analytics Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl mb-4 font-semibold text-gray-800">Filter Settings</h2>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
        <SearchFilter
          value={queryFilter}
          onChange={setQueryFilter}
        />
      </div>
      
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : data ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl mb-4 font-semibold text-gray-800">Top Queries</h2>
            <MetricsTable
              data={data.topQueries}
              selectedQuery={selectedQuery}
              onQuerySelect={setSelectedQuery}
            />
          </div>
          
          {selectedQuery && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DetailChart 
                data={data.timeSeries} 
                query={selectedQuery} 
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-4">No data available. Please adjust your filters.</div>
      )}
    </div>
  );
};

export default SearchAnalyticsDashboard;
