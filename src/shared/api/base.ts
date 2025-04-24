/**
 * Base API configuration
 */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Base API client with common request handling
 */
export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
};