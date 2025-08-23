import axios from "axios";

/**
 * Constants for authentication token storage
 */
const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
};

/**
 * Creates and configures the Axios instance
 * Uses IIFE pattern to ensure single instance
 */
export const axiosClient = (() => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds
    });
})();

/**
 * Request interceptor
 * - Adds authentication token
 * - Handles request configuration
 */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * - Handles response data transformation
 * - Manages authentication errors
 * - Standardizes error handling
 */
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
                    {
                        refreshToken,
                    }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return axiosClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        const apiError = {
            message: error.response?.data?.message || "An unexpected error occurred",
            code: error.response?.data?.code || "UNKNOWN_ERROR",
            status: error.response?.status || 500,
        };

        return Promise.reject(apiError);
    }
);

export default axiosClient;
