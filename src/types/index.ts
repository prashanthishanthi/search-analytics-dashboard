export type SortDirection = 'asc' | 'desc';
export type SortField = 'query' | 'clicks' | 'impressions' | 'ctr' | 'position';
export type SortConfig = {
  field: SortField;
  direction: SortDirection;
};

export type QueryData = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type TimeSeriesData = {
  date: string;
  clicks: number;
  impressions: number;
};

export type SearchAnalyticsData = {
  topQueries: QueryData[];
  timeSeries: TimeSeriesData[];
};

export type ApiResponse = {
  searchAnalytics: SearchAnalyticsData;
};
