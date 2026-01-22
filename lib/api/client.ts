/**
 * Axios Client Configuration
 * Central HTTP client with interceptors
 */

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';
import { setupInterceptors } from './interceptors';

/**
 * Create axios instance
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: `${API_CONFIG.BASE_URL}/${API_CONFIG.API_VERSION}`,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    withCredentials: false,
  });
  
  // Setup interceptors
  setupInterceptors(instance);
  
  return instance;
}

/**
 * Main API client instance
 */
export const apiClient = createAxiosInstance();

/**
 * Create a new axios instance without interceptors (for public endpoints)
 */
export function createPublicClient(): AxiosInstance {
  return axios.create({
    baseURL: `${API_CONFIG.BASE_URL}/${API_CONFIG.API_VERSION}`,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    withCredentials: false,
  });
}
