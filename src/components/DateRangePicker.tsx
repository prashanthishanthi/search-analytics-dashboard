import React from "react";

type Props = {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
};

const DateRangePicker: React.FC<{
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}> = ({ startDate, endDate, onDateChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
      <div className="flex items-center">
        <label htmlFor="start-date" className="mr-2 text-gray-700">Start Date:</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => onDateChange(e.target.value, endDate)}
          className="px-2 py-1 border border-gray-300 rounded"
          data-testid="start-date-input"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="end-date" className="mr-2 text-gray-700">End Date:</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => onDateChange(startDate, e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
          data-testid="end-date-input"
        />
      </div>
    </div>
  );
};
export default DateRangePicker;
