import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');


  if(role === 'Admin'){
    config.headers['Authorization'] = `Admin ${token}`;
  }
  else{
    config.headers['Authorization'] = `Bearer ${token}`;
  }


  return config;
});

export default axiosInstance;
