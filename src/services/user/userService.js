import { authenticatedRequest } from '../auth/authService';

export const updateUserProfile = async (userId, profileData) => {
  if (!userId) {
    throw new Error('Invalid user id');
  }

  const response = await authenticatedRequest(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });

  if (response?.data) {
    return response.data;
  }

  throw new Error(response?.message || 'Failed to update profile');
};
