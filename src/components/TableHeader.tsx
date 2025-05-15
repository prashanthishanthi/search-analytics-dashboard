import React from "react";
import type { SortConfig, SortField } from "../types";

type Props = {
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
};

const TableHeader: React.FC<{
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}> = ({ field, label, sortConfig, onSort }) => {
  const isSorted = sortConfig.field === field;
  const direction = isSorted ? sortConfig.direction : 'asc';
  
  return (
    <th 
      className="py-2 px-4 bg-gray-100 hover:bg-gray-200 cursor-pointer text-left"
      onClick={() => onSort(field)}
      data-testid={`header-${field}`}
    >
      <div className="flex items-center">
        {label}
        {isSorted && (
          <span className="ml-1">
            {direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );
};

export default TableHeader;
