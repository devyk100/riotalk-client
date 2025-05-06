import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RefreshToken } from "./refresh-token";

export const BACKEND_URL = 'http://localhost:8080'

export const api = axios.create({
    baseURL: BACKEND_URL, // Backend URL
    withCredentials: true, // This allows sending cookies with the request
  });


api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token"); // Get token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

api.interceptors.response.use(
    (response: AxiosResponse) => response, // If response is OK, return it
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // If unauthorized (403 or 401)
      if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            });
          });
        }
  
        originalRequest._retry = true;
        isRefreshing = true;
  
        try {
          const newAccessToken = await RefreshToken();
  
          isRefreshing = false;
          refreshSubscribers.forEach((callback) => callback(newAccessToken!));
          refreshSubscribers = [];
  
          // Retry the original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  