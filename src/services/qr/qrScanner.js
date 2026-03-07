// QR Scanner Service for Hostel Management Mobile App
import { API_CONFIG } from '../../config/api.config';
import { authenticatedRequest } from '../auth/authService';

/**
 * Process QR code scan - sends the scanned QR code to backend for check-in/check-out
 * @param {string} qrCode - The scanned QR code data (UUID from QR code)
 * @returns {Promise<object>} Response with action (check_in/check_out), location, timestamp
 */
export const processQRScan = async (qrCode) => {
  try {
    const response = await authenticatedRequest(
      API_CONFIG.ENDPOINTS.QR.SCAN,
      {
        method: 'POST',
        body: JSON.stringify({ code: qrCode }),
      }
    );

    if (response.success) {
      return {
        success: true,
        action: response.data.action,
        location: response.data.location,
        timestamp: response.data.timestamp,
        message: response.message,
        user: response.data.user,
      };
    } else {
      throw new Error(response.message || 'Failed to process QR scan');
    }
  } catch (error) {
    console.error('Error processing QR scan:', error);
    throw error;
  }
};

/**
 * Get user's check-in/check-out logs
 * @param {number} limit - Maximum number of logs to fetch (default: 50)
 * @returns {Promise<Array>} Array of check-in/check-out logs
 */
export const getMyLogs = async (limit = 50) => {
  try {
    const response = await authenticatedRequest(
      `${API_CONFIG.ENDPOINTS.QR.MY_LOGS}?limit=${limit}`,
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch logs');
    }
  } catch (error) {
    console.error('Error fetching QR logs:', error);
    throw error;
  }
};