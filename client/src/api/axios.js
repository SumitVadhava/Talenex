import axios from "axios";
import { navigateTo } from "../utils/navigationHelper";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://talenex-server.onrender.com/api",
});

// REQUEST INTERCEPTOR — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR — redirect to error pages on API failures
api.interceptors.response.use(
  (response) => response, // pass-through on success
  (error) => {
    const status = error?.response?.status;

    // Map status codes → error routes
    const STATUS_ROUTES = {
      400: "/bad-request",
      // 401: "/unauthorized",
      403: "/access-denied",
      404: "/404",
      500: "/server-error",
    };

    if (status && STATUS_ROUTES[status]) {
      // If the request specifically asks to skip redirect (e.g. background syncs), don't navigate
      if (status === 404 && error.config?.skipRedirect) {
        return Promise.reject(error);
      }
      navigateTo(STATUS_ROUTES[status]);
    }
    // 5xx other than 500 also go to /server-error
    if (status && status >= 500 && status !== 500) {
      navigateTo("/server-error");
    }

    return Promise.reject(error);
  }
);

export default api;

