import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {BASE_URL} from "@/constant";
import cookie from "js-cookie";

export interface ApiResponse<T> {
    data: T;
    message?: string;
    isSuccessful: boolean;
    statusCode: number;
    status: number; // Add 'status' property
    statusText: string; // Add 'statusText' property
    headers: any; // Add 'headers' property, adjust the type as needed
    config: any; // Add 'headers' property, adjust the type as needed
}
// Factory function to create custom API responses
export const formatResponse = <T>(
    data: T,
    message?: string,
    isSuccessful = true,
    statusCode = 200,
    status = 0, // Add 'status' property
    statusText = 'ok', // Add 'statusText' property
    headers?: any,
    config?: any,
): ApiResponse<T> => {
    return {
        data,
        message,
        status,
        statusText,
        config,
        headers,
        isSuccessful,
        statusCode,
    };
};
const getAuthTokenFromLocalStorage = () => {
    try {
        const token = localStorage.getItem('tokenKey');
        if (token) {
            return token;
        }
    } catch (err) {
        console.error('Error retrieving token from local storage:', err);
    }
    return null;
};


const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Format response using custom format
        return formatResponse(response.data, response.statusText, true, response.status);
    },
    (error: AxiosError) => {
        // Handle errors, potentially creating a custom API response with error details
        if (error.response?.status === 401) {
            // logout(); // Call the logout function on 401 response
        }
        const errorResponse = formatResponse(null, error.message, false, error.response?.status || 500);
        return Promise.reject(errorResponse);
    }
);
api.interceptors.request.use((config: any) => {
    const useToken = config.useToken || true;

    if (useToken) {
        const username = cookie.get("username");
        const token = cookie.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('Token not found in local storage. Request may be unauthorized.');
        }
    }

    return config;
}, (error) => {
    // Handle request errors (optional)
    return Promise.reject(error);
});

export default api;
