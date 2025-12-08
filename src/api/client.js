import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://back-end-x2.onrender.com';


// Primary axios instance used for normal requests
const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper axios instance without interceptors for refresh requests
const refreshClient = axios.create({ baseURL: API_BASE });

// Request interceptor to add Authorization header
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to try token refresh on 401
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // No refresh token -> logout handled by caller
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await refreshClient.post('/auth/refresh', { token: refreshToken });
        const newAccessToken = res.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        client.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // failed refresh -> remove tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
