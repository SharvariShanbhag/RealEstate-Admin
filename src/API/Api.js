import axios from 'axios';

// Base URL for the API
export const BASE_URL = "http://localhost:8000/api";

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
  localStorage.removeItem("user"); // Corrected from "users" if "user" is the key you use
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
    // Ensure consistent error re-throwing for easier catch blocks
    throw error.response?.data || { message: error.message, status: error.response?.status };
  }
};

// Auth APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/users/login", payload, "post");
  if (data?.token) {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }
  return data;
};

export const registerAPI = async (payload) => {
  return await apiRequest("/users/register", payload, "post");
};

// User Info
export const getUserInfo = async () => {
  try {
    const data = await apiRequest("/users/me", {}, "get"); // Assuming /users/me is correct
    return { success: true, loggedUser: data.user };
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    const errorMessage = error.message || "Failed to fetch user profile.";
    return { success: false, message: errorMessage };
  }
};

// Property APIs (already existing, including the previous corrections)
export const getAllProperties = async () => {
  try {
    const response = await axiosInstance.get('/properties');
    return response.data;
  } catch (error) {
    console.error('Error fetching all properties:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || 'Network error or unhandled error' };
  }
};

export const getPropertyById = async (id) => {
  return await apiRequest(`/properties/${id}`, {}, "get");
};

export const createProperty = async (payload) => {
  return await apiRequest("/properties/createProperty", payload, "post");
};

export const updateProperty = async (id, payload) => {
  return await apiRequest(`/properties/${id}`, payload, "put");
};

export const deleteProperty = async (id) => {
  return await apiRequest(`/properties/${id}`, {}, "delete");
};

export const searchProperties = async (query) => {
  return await apiRequest("/properties/search", { query }, "get");
};

export const AddUpdateIntrestedUser = async (id) => {
  return await apiRequest(`/properties/${id}/interested`, {}, "put");
};

// --- NEW: Inquiry APIs ---
export const getGeneralInquiries = async () => {
  try {
    // Assuming your backend endpoint for general inquiries is /api/inquiries
    // The apiRequest utility already handles adding the Authorization header if a token exists.
    const data = await apiRequest("/inquiries", {}, "get");
    return data.data; // Assuming your backend response is { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching general inquiries:", error);
    throw error; // Re-throw to be caught by the component
  }
};

export const updateGeneralInquiryStatus = async (inquiryId, status) => {
  try {
    // Assuming your backend endpoint for updating an inquiry is /api/inquiries/:id (PUT)
    const data = await apiRequest(`/inquiries/${inquiryId}`, { status }, "put");
    return data.data; // Assuming your backend response is { success: true, data: {updatedInquiry} }
  } catch (error) {
    console.error(`Error updating general inquiry ${inquiryId}:`, error);
    throw error; // Re-throw to be caught by the component
  }
};

export default axiosInstance;