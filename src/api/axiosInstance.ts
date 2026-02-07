import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedAuth = sessionStorage.getItem('auth-storage');

    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        const accessToken = parsed?.state?.accessToken;

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (e) {
        console.error('Failed to parse auth-storage', e);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
