import axios from "axios";

// Create Axios instance
export const api = axios.create({
    
//   baseURL: "http://localhost:8080/api",
baseURL:"https://gndproductbackend-1.onrender.com/api/"
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming you saved token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);
