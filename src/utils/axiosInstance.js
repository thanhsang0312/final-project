import axios from "axios";
import tokenMethod from "./token";
import { BASE_URL } from "../const/environment";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  }, async (error) => {
    console.log('error', error)
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call new API
        const res = await axiosInstance.put("/customer/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data.data || {};
        
        // Save new token to localStorage or Cookies
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Change token in header of initial request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Call request with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // Handle error
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    // Handling request before send it
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    // Handling error
    return Promise.reject(error);
  }
);

export default axiosInstance;