import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true 
});

API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { accessToken } = JSON.parse(user);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const user = JSON.parse(localStorage.getItem('user'));
        user.accessToken = data.accessToken;
        localStorage.setItem('user', JSON.stringify(user));

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
