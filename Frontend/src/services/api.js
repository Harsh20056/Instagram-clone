import axios from "axios";

// Create Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000", // Dynamically read from env with fallback
  timeout: 15000,
  withCredentials: true, // Crucial for sending and receiving HTTP-Only cookies (token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to globally handle auth failures
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    if (error.response) {
      const { status } = error.response;
      
      // If 401 (Unauthorized):
      if (status === 401) {
        // Don't redirect if it's the initial profile fetch (session restoration attempt)
        // or if it's a login/register attempt
        if (
          originalRequest.url.includes("/api/users/profile") ||
          originalRequest.url.includes("/api/auth/login") ||
          originalRequest.url.includes("/api/auth/register")
        ) {
          // Just reject the promise, don't redirect
          return Promise.reject(error);
        }
        
        // For other 401 errors, redirect to login
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
