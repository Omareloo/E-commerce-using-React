import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
 
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
   if (token) {
    const prefix = role === 'Admin' ? 'Admin' : 'Bearer';
    config.headers.Authorization = `${prefix} ${token}`;
  }
  return config;
});

export default axiosInstance;
