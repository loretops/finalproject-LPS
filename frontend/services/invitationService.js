import { apiClient } from './authService'; // Importar la instancia de Axios configurada

/**
 * Calls the backend API to create a new invitation.
 * Requires authentication (handled by apiClient interceptor).
 * @param {string} email - The email of the person to invite.
 * @returns {Promise<object>} The response data from the backend.
 */
export const createInvitation = async (email) => {
  if (!email) {
    throw new Error('Email is required to create an invitation.');
  }
  try {
    const response = await apiClient.post('/invitations', { email });
    return response.data; // Ej: { message: '...', invitationId: '...', token: '...' }
  } catch (error) {
    console.error('Error during create invitation API call:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create invitation');
  }
};

/**
 * Calls the backend API to get all invitations.
 * Requires authentication (handled by apiClient interceptor).
 * @returns {Promise<Array>} The list of invitations.
 */
export const getInvitations = async () => {
  try {
    const response = await apiClient.get('/invitations');
    return response.data;
  } catch (error) {
    console.error('Error fetching invitations:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch invitations');
  }
};

// Add other invitation-related service functions here if needed 