import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5296/api", // change to your API URL
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
