// Dashboard API Service for Hostel Management Mobile App
import { API_CONFIG } from '../../config/api.config';
import { authenticatedRequest } from '../auth/authService';

/**
 * Get dashboard data for the logged-in user
 * @returns {Promise<object>} Dashboard data including booking, activities, and roommates
 */
export const getDashboardData = async () => {
  try {
    const response = await authenticatedRequest(
      API_CONFIG.ENDPOINTS.DASHBOARD.GET_DATA,
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch dashboard data');
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Get detailed room information
 * @returns {Promise<object>} Room information including roommates
 */
export const getRoomInfo = async () => {
  try {
    const response = await authenticatedRequest(
      API_CONFIG.ENDPOINTS.DASHBOARD.GET_ROOM_INFO,
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch room information');
    }
  } catch (error) {
    console.error('Error fetching room info:', error);
    throw error;
  }
};

/**
 * Get recent activities for the logged-in user
 * @param {number} limit - Maximum number of activities to fetch (default: 10)
 * @returns {Promise<Array>} Array of recent activities
 */
export const getRecentActivities = async (limit = 10) => {
  try {
    const response = await authenticatedRequest(
      `${API_CONFIG.ENDPOINTS.DASHBOARD.GET_ACTIVITIES}?limit=${limit}`,
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch recent activities');
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

/**
 * Create a new complaint
 * @param {object} complaintData - Complaint details
 * @returns {Promise<object>} Created complaint
 */
export const createComplaint = async (complaintData) => {
  try {
    const response = await authenticatedRequest(
      API_CONFIG.ENDPOINTS.DASHBOARD.CREATE_COMPLAINT,
      {
        method: 'POST',
        body: JSON.stringify(complaintData),
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to create complaint');
    }
  } catch (error) {
    console.error('Error creating complaint:', error);
    throw error;
  }
};

/**
 * Get user's complaints
 * @returns {Promise<Array>} Array of user's complaints
 */
export const getUserComplaints = async () => {
  try {
    const response = await authenticatedRequest(
      API_CONFIG.ENDPOINTS.DASHBOARD.GET_COMPLAINTS,
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch complaints');
    }
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

/**
 * Delete a user's complaint when allowed by backend rules
 * @param {string} complaintId - Complaint identifier
 * @returns {Promise<void>}
 */
export const deleteComplaint = async (complaintId) => {
  try {
    const dashboardDeleteEndpoint = `${API_CONFIG.ENDPOINTS.DASHBOARD.GET_COMPLAINTS}/${complaintId}`;

    try {
      const response = await authenticatedRequest(
        dashboardDeleteEndpoint,
        {
          method: 'DELETE',
        }
      );

      if (response.success === false) {
        throw new Error(response.message || 'Failed to delete complaint');
      }

      return;
    } catch (primaryError) {
      const fallbackResponse = await authenticatedRequest(
        `${API_CONFIG.ENDPOINTS.COMPLAINTS.GET_ALL}/${complaintId}`,
        {
          method: 'DELETE',
        }
      );

      if (fallbackResponse.success === false) {
        throw new Error(fallbackResponse.message || primaryError.message || 'Failed to delete complaint');
      }
    }
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
};

/**
 * Send student reply to an existing complaint
 * @param {string} complaintId - Complaint identifier
 * @param {string} message - Reply text
 * @returns {Promise<object>} Updated complaint
 */
export const replyToComplaint = async (complaintId, message) => {
  try {
    if (!complaintId) {
      throw new Error('Invalid complaint reference.');
    }

    try {
      const dashboardResponse = await authenticatedRequest(
        `${API_CONFIG.ENDPOINTS.DASHBOARD.GET_COMPLAINTS}/${complaintId}/reply`,
        {
          method: 'PATCH',
          body: JSON.stringify({ message }),
        }
      );

      if (dashboardResponse.success === false) {
        throw new Error(dashboardResponse.message || 'Failed to send reply');
      }

      return dashboardResponse.data;
    } catch (primaryError) {
      const fallbackResponse = await authenticatedRequest(
        `${API_CONFIG.ENDPOINTS.COMPLAINTS.GET_ALL}/${complaintId}/status`,
        {
          method: 'PUT',
          body: JSON.stringify({
            status: 'in_progress',
            adminResponse: `[Student Reply] ${message}`,
          }),
        }
      );

      if (fallbackResponse.success === false) {
        throw new Error(fallbackResponse.message || primaryError.message || 'Failed to send reply');
      }

      return fallbackResponse.data;
    }
  } catch (error) {
    console.error('Error sending complaint reply:', error);
    throw error;
  }
};
