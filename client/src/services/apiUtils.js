/**
 * API Utility Functions for FitMutant
 * 
 * Usage:
 * import { fetchAPI } from '@/services/apiUtils'
 * 
 * // Automatically handles dev/prod URLs
 * const data = await fetchAPI('/packages')
 * const createResult = await fetchAPI('/packages', { method: 'POST', data })
 */

import api from './api';

/**
 * Fetch data from API with automatic URL handling
 * @param {string} endpoint - API endpoint (e.g., '/packages', '/auth/login')
 * @param {object} options - Request options (method, data, params, headers)
 * @returns {Promise} API response data
 */
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const { method = 'GET', data, params, headers } = options;
    
    const config = {
      method,
      url: endpoint,
      ...(params && { params }),
      ...(headers && { headers }),
      ...(data && { data }),
    };

    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
};

/**
 * Fetch with automatic error handling and loading state
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {object} { data, loading, error }
 */
export const useFetchAPI = async (endpoint, options = {}) => {
  try {
    const data = await fetchAPI(endpoint, options);
    return { data, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

export default fetchAPI;
