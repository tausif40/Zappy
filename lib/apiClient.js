import axios from "axios";
import Cookies from "js-cookie";
import { storeReturnUrl } from "./utils";

let redirectFunction = null;

export const setRedirectHandler = (handler) => {
  redirectFunction = handler;
  // console.log('API redirect handler set successfully');
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => { return response },
  (error) => {
    console.log("apiClient error - ", error);
    if (error?.response?.status === 401) {
      Cookies.remove("token");
      storeReturnUrl();

      if (redirectFunction && typeof redirectFunction === 'function') {
        // console.log('Using custom redirect handler');
        try {
          redirectFunction('/auth/login');
        } catch (redirectError) {
          // console.error('Error in custom redirect handler:', redirectError);

          if (typeof window !== 'undefined') {
            window.location.href = "/auth/login";
          }
        }
      } else if (typeof window !== 'undefined') {
        // console.warn('No redirect handler set, using window.location as fallback');
        window.location.href = "/auth/login";
      }
    }

    if (!error.response) {
      if (!navigator.onLine) {
        console.log("You're offline. Please check your internet connection.");
      } else {
        console.log("Network error. Server may be unreachable.");
      }
    }

    return Promise.reject(error?.response?.data);
  },
);

export default apiClient;
