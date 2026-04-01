import axios from "axios";

// Production vs Development API URL selection
const isDevelopment = import.meta.env.MODE === "development";

// Development: use proxy (/api -> localhost:5000)
// Production: use full URL with /api prefix from .env.production
const API_BASE_URL = isDevelopment
  ? "/api"
  : `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: false,
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      sessionStorage.removeItem("adminToken");
    }
    return Promise.reject(error);
  }
);

export default api;

