import api from './api';

export const getPackages = async (category) => {
  const params = category ? { category } : {};
  const response = await api.get('/packages', { params });
  return response.data;
};

export const createPackage = async (packageData) => {
  const response = await api.post('/packages', packageData);
  return response.data;
};

export const updatePackage = async (id, packageData) => {
  const response = await api.put(`/packages/${id}`, packageData);
  return response.data;
};

export const deletePackage = async (id) => {
  const response = await api.delete(`/packages/${id}`);
  return response.data;
};

// Upload image to Cloudinary via backend
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  const response = await api.delete(`/upload/${publicId}`);
  return response.data;
};
