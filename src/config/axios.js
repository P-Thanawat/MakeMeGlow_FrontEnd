import axios from 'axios';
import { getToken, removeToken } from '../service/localStorage';
import { API } from './env';

axios.defaults.baseURL = API;

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      removeToken();
      window.location.href = `http://localhost:3000/login`;
    }
    return Promise.reject(err);
  }
);

export default axios;
