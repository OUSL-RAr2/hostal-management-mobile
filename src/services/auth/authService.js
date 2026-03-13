// Authentication Service for Hostel Management Mobile App
import * as SecureStore from 'expo-secure-store';
import { buildUrl } from '../../config/api.config';

/**
 * Get the stored authentication token
 * @returns {Promise<string|null>} The token or null if not found
 */
export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove the stored authentication token
 */
export const removeAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

/**
 * Get stored authenticated user details
 * @returns {Promise<object|null>} User object or null if not found
 */
export const getStoredUser = async () => {
  try {
    const raw = await SecureStore.getItemAsync('user');
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

/**
 * Save authenticated user details in secure storage
 * @param {object} userData
 */
export const setStoredUser = async (userData) => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(userData || {}));
  } catch (error) {
    console.error('Error setting stored user:', error);
  }
};

/**
 * Make an authenticated API request
 * @param {string} endpoint - The API endpoint
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<object>} The response data
 */
export const authenticatedRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    const response = await fetch(buildUrl(endpoint), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      credentials: 'include', // Include cookies in the request
    });

    const rawResponse = await response.text();
    let data = {};

    if (rawResponse) {
      try {
        data = JSON.parse(rawResponse);
      } catch (parseError) {
        const isHtmlResponse = rawResponse.trim().startsWith('<');

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Requested API route was not found on the server.');
          }

          throw new Error(
            isHtmlResponse
              ? `Server returned an unexpected HTML response (${response.status}).`
              : rawResponse
          );
        }

        throw new Error('Server returned an invalid JSON response.');
      }
    }

    if (!response.ok) {
      // If unauthorized, the token might have expired
      if (response.status === 401 || response.status === 403) {
        await removeAuthToken();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('Authenticated request error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} True if user has a valid token
 */
export const isAuthenticated = async () => {
  const token = await getAuthToken();
  return token !== null;
};
