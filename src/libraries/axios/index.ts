import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_APP_BASE_URL,
};

const axiosInstance = axios.create(defaultOptions);

export default axiosInstance;
