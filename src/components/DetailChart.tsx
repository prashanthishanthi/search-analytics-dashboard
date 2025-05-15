import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import type { TimeSeriesData } from "../types";

type Props = {
  data: TimeSeriesData[];
  query: string;
};

const DetailChart: React.FC<{
  data: TimeSeriesData[];
  query: string;
}> = ({ data, query }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data available for the selected query.</div>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-4 font-semibold text-gray-800">
        Trends for "{query}"
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="clicks"
              stroke="#8884d8"
              name="Clicks"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="impressions"
              stroke="#82ca9d"
              name="Impressions"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailChart;
