import api from './api';

export const getActiveAnnouncements = async () => {
  try {
    const response = await api.get('/announcements/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

export const getAnnouncements = async () => {
  try {
    const response = await api.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export const createAnnouncement = async (data) => {
  try {
    const response = await api.post('/announcements', data);
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const updateAnnouncement = async (id, data) => {
  try {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};
