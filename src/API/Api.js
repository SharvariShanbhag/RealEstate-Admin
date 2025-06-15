import axios from 'axios';

// Base URL for the API
export const BASE_URL = "http://localhost:7000/api";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Utility: Get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Utility: Get user object from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Utility: Logout function
export const logoutAPI = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Generalized API request handler
export const apiRequest = async (endpoint, data = {}, method = "get") => {
  const token = getToken();
  const isFormData = data instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  try {
    const config = {
      url: endpoint,
      method,
      headers,
      ...(method === "get" ? { params: data } : { data }),
    };

    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

// Auth APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/user/login", payload, "post");
  if (data?.token) {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }
  return data;
};

export const registerAPI = async (payload) => {
  return await apiRequest("/user/register", payload, "post");
};

// User Info
export const getUserInfo = async () => {
  return await apiRequest("/user/getUserInfo", {}, "get");
};

// Property APIs
export const getAllProperties = async () => {
  return await apiRequest("/properties/getAllProperties", {}, "get");
};

export const getPropertyById = async (id) => {
  return await apiRequest(`/properties/getPropertyById/${id}`, {}, "get");
};

export const createProperty = async (payload) => {
  return await apiRequest("/properties/createProperty", payload, "post");
};

export const updateProperty = async (id, payload) => {
  return await apiRequest(`/properties/updateProperty/${id}`, payload, "put");
};

export const deleteProperty = async (id) => {
  return await apiRequest(`/properties/deleteProperty/${id}`, {}, "delete");
};

export const searchProperties = async (query) => {
  return await apiRequest("/properties/search", { query }, "get");
};

export const AddUpdateIntrestedUser = async (id) => {
  return await apiRequest(`/properties/AddUpdateIntrestedUser/${id}`, {}, "put");
};

export default axiosInstance;