import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchFilter: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="query-filter" className="block mb-2 text-gray-700">Filter Queries:</label>
      <input
        id="query-filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter keywords to filter queries..."
        className="w-full px-3 py-2 border border-gray-300 rounded"
        data-testid="query-filter-input"
      />
    </div>
  );
};

export default SearchFilter;
