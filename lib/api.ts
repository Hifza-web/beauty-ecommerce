import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://beauty-ecommerce-mh7p.vercel.app/api",
});

// Add a request interceptor to attach the JWT token to every request if it exists
api.interceptors.request.use(
  (config) => {
    // We only access localStorage on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
