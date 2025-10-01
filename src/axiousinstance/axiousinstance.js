import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGNmMzcyOTAxOGY1MGUzZmI2ZDdmNyIsImlzbG9nZ2VkSW4iOnRydWUsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc1OTMyMDYxMywiZXhwIjoxNzU5MzI0MjEzfQ.JBfjo4uVSb6igtZE53SBZh9SPnrvAQaQtGYfWqCPSU0";
  if (token) {
    config.headers.Authorization = `Admin ${token}`;
  }
  return config;
});

export default axiosInstance;
