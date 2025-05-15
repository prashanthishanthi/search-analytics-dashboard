import React, { useState } from "react";
import TableHeader from "./TableHeader";
import type { QueryData, SortConfig, SortField } from "../types";

type Props = {
  data: QueryData[];
  selectedQuery: string | null;
  onQuerySelect: (query: string) => void;
};

const MetricsTable: React.FC<{
  data: QueryData[];
  selectedQuery: string | null;
  onQuerySelect: (query: string) => void;
}> = ({ data, selectedQuery, onQuerySelect }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'clicks', direction: 'desc' });

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.field === 'query') {
      return sortConfig.direction === 'asc' 
        ? a.query.localeCompare(b.query)
        : b.query.localeCompare(a.query);
    } else {
      const valueA = a[sortConfig.field];
      const valueB = b[sortConfig.field];
      return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mb-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <TableHeader field="query" label="Query" sortConfig={sortConfig} onSort={handleSort} />
            <TableHeader field="clicks" label="Clicks" sortConfig={sortConfig} onSort={handleSort} />
            <TableHeader field="impressions" label="Impressions" sortConfig={sortConfig} onSort={handleSort} />
            <TableHeader field="ctr" label="CTR" sortConfig={sortConfig} onSort={handleSort} />
            <TableHeader field="position" label="Position" sortConfig={sortConfig} onSort={handleSort} />
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr 
              key={index} 
              className={`
                ${selectedQuery === row.query ? 'bg-blue-100' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                hover:bg-gray-100 cursor-pointer
              `}
              onClick={() => onQuerySelect(row.query)}
              data-testid={`row-${index}`}
            >
              <td className="py-2 px-4 border-b">{row.query}</td>
              <td className="py-2 px-4 border-b">{row.clicks.toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{row.impressions.toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{(row.ctr * 100).toFixed(2)}%</td>
              <td className="py-2 px-4 border-b">{row.position.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricsTable;
