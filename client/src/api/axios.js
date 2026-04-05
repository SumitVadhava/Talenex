import axios from "axios";
import { navigateTo } from "../utils/navigationHelper";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 800;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:5000/api",
});

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

// RESPONSE INTERCEPTOR — retry 5xx errors, then redirect to error pages
api.interceptors.response.use(
  (response) => response, // pass-through on success
  async (error) => {
    const status = error?.response?.status;
    const config = error.config;

    // ── Retry Logic (5xx only) ────────────────────────────────────────────────
    // Retries up to MAX_RETRIES times with exponential back-off before giving up.
    // Each retry re-reads the token from localStorage so a mid-flight token
    // refresh is automatically picked up (fixes the race condition).
    // Set `skipRetry: true` on a request config to opt out.
    if (status >= 500 && !config?.skipRetry) {
      config._retryCount = (config._retryCount || 0) + 1;

      if (config._retryCount <= MAX_RETRIES) {
        const delay = BASE_DELAY_MS * 2 ** (config._retryCount - 1); // 800, 1600, 3200
        console.warn(
          `[API] ${status} on "${config.url}" — retry ${config._retryCount}/${MAX_RETRIES} in ${delay}ms`
        );
        await sleep(delay);

        // Attach the freshest token available (handles post-login race)
        const freshToken = localStorage.getItem("token");
        if (freshToken) {
          config.headers.Authorization = `Bearer ${freshToken}`;
        }

        return api(config); // re-issue the exact same request
      }
    }

    // ── Error Page Routing (after all retries exhausted or non-5xx) ───────────
    const STATUS_ROUTES = {
      400: "/bad-request",
      // 401: "/unauthorized",
      403: "/access-denied",
      404: "/404",
      500: "/server-error",
    };

    if (status && STATUS_ROUTES[status]) {
      // If the request specifically asks to skip redirect (e.g. background syncs), don't navigate
      if (status === 404 && config?.skipRedirect) {
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
