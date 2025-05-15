import type { ApiResponse } from "../types";


export const generateMockData = (startDate: string, endDate: string, queryFilter?: string): ApiResponse => {
  // Generate dates between start and end date
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange: string[] = [];
  const currentDate = new Date(start);
  
  while (currentDate <= end) {
    dateRange.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Generate query data
  const queryTerms = [
    'react tutorial', 'typescript tips', 'javascript vs typescript', 
    'react hooks guide', 'graphql tutorial', 'react state management',
    'css flexbox', 'react router', 'apollo client', 'responsive design',
    'typescript interface', 'react context api', 'css grid layout',
    'react performance', 'typescript generics', 'nextjs tutorial',
    'react testing library', 'react native', 'redux toolkit', 'tailwind css'
  ];
  
  // Filter queries if queryFilter is provided
  const filteredQueries = queryFilter 
    ? queryTerms.filter(q => q.toLowerCase().includes(queryFilter.toLowerCase()))
    : queryTerms;

  const topQueries = filteredQueries.map(query => ({
    query,
    clicks: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 100000),
    ctr: Math.random() * 0.5,
    position: Math.random() * 10
  }));

  // Sort by clicks descending by default
  topQueries.sort((a, b) => b.clicks - a.clicks);

  // Generate time series data
  const timeSeries = dateRange.map(date => ({
    date,
    clicks: Math.floor(Math.random() * 500),
    impressions: Math.floor(Math.random() * 5000)
  }));

  return {
    searchAnalytics: {
      topQueries: topQueries.slice(0, 20),
      timeSeries
    }
  };
};