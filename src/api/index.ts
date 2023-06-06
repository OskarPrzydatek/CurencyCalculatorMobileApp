/**
 * 
 * API connection phasade which exports all fetchers
 * needed to work with NBP API.
 * 
 * @author Oskar Przydatek
 * 
 */
const BASE_URL = 'http://api.nbp.pl/api';

/**
 * 
 * Async fetcher function to fetch data using GET http method
 * 
 * @param {string} endpoint - endpoint to make a request
 * @returns response data in json format
 * 
 */
export const getDataFetcher = async (endpoint: string) => {
  // Create URL based on base API URL and endpoint from param
  const URL = `${BASE_URL}${endpoint}`;

  // Make fetch request
  const response = await fetch(URL);

  // Return json response
  return await response.json();
};
