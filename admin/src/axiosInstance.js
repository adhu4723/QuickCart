// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUyNTY4MjYzLCJleHAiOjE3NTI2NTQ2NjN9.YuyvasmQcgGtYlNkjtBxVuE784en4BeZPJKJT9BwSks"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
