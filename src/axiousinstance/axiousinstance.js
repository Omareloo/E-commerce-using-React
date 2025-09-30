import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDk2MmU5ZWY5ZjNlNTMzNTg4MmMwYiIsImlzbG9nZ2VkSW4iOnRydWUsImlhdCI6MTc1OTA4MzU2OCwiZXhwIjoxNzU5MDg3MTY4fQ.Bze6Yfn9KDv5KC0-6dZnRhh-PFhqEVQujAgdgwDVAr4";
  if (token) {
    config.headers.Authorization = `Admin ${token}`;
  }
  return config;
});

export default axiosInstance;
