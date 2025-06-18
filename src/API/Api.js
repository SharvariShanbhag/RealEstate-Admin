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
  localStorage.removeItem("users"); // Note: You might want to remove "user" here too if it's stored.
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
    throw error.response?.data || { message: error.message }; // Re-throwing ensures consistency for catch blocks
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
  return await apiRequest("/users/register", payload, "post"); // Corrected path to /users/register
};

// User Info
// src/API/Api.js

// ... (other imports and functions) ...

export const getUserInfo = async () => {
    try {
        // Ensure this endpoint matches your backend route for fetching user info
        const data = await apiRequest("/users/me", {}, "get");
        return { success: true, loggedUser: data.user };
    } catch (error) {
        console.error('Error in getUserInfo:', error);
        const errorMessage = error.message || "Failed to fetch user profile.";
        return { success: false, message: errorMessage };
    }
};

// ... (rest of your Api.js) ...

// Property APIs
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
  // Assuming your backend route is `/properties/:id` for getting by ID
  // If your backend route is exactly `/properties/getPropertyById/:id`, keep it as is.
  // Based on standard RESTful practices, it's usually `/properties/:id`
  return await apiRequest(`/properties/${id}`, {}, "get");
};

export const createProperty = async (payload) => {
  return await apiRequest("/properties/createProperty", payload, "post");
};

export const updateProperty = async (id, payload) => {
  // Assuming your backend route is `/properties/:id` for updating
  // If your backend route is exactly `/properties/updateProperty/:id`, keep it as is.
  return await apiRequest(`/properties/${id}`, payload, "put");
};

export const deleteProperty = async (id) => {
  // *** THIS WAS THE TYPO: CHANGED `propertyid` TO `id` ***
  return await apiRequest(`/properties/${id}`, {}, "delete");
};

export const searchProperties = async (query) => {
  return await apiRequest("/properties/search", { query }, "get");
};

export const AddUpdateIntrestedUser = async (id) => {
  // Assuming your backend route is `/properties/:id/interested`
  return await apiRequest(`/properties/${id}/interested`, {}, "put");
};

export default axiosInstance;

// import axios from 'axios';

// // Base URL for the API
// export const BASE_URL = "http://localhost:8000/api" ;

// // Axios instance
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// // Utility: Get token from localStorage
// export const getToken = () => localStorage.getItem("token");

// // Utility: Get user object from localStorage
// export const getUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

// // Utility: Logout function
// export const logoutAPI = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("users");
//   window.location.href = "/login";
// };

// // Generalized API request handler
// export const apiRequest = async (endpoint, data = {}, method = "get") => {
//   const token = getToken();
//   const isFormData = data instanceof FormData;

//   const headers = {
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
//   };

//   try {
//     const config = {
//       url: endpoint,
//       method,
//       headers,
//       ...(method === "get" ? { params: data } : { data }),
//     };

//     const response = await axiosInstance.request(config);
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     throw error.response?.data || { message: error.message };
//   }
// };

// // Auth APIs
// export const loginAPI = async (payload) => {
//   const data = await apiRequest("/users/login", payload, "post");
//   if (data?.token) {
//     localStorage.setItem("token", data.token);
//     if (data.user) {
//       localStorage.setItem("user", JSON.stringify(data.user));
//     }
//   }
//   return data;
// };

// export const registerAPI = async (payload) => {
//   return await apiRequest("/user/register", payload, "post");
// };

// // User Info
// export const getUserInfo = async () => {
//   return await apiRequest("/user/getUserInfo", {}, "get");
// };

// // Property APIs
// export const getAllProperties = async () => {
//     try {
//         // It should be just '/properties' as per your backend route definition
//         const response = await axiosInstance.get('/properties');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching all properties:', error.response?.data || error.message);
//         // Ensure you return a consistent error structure
//         return { success: false, message: error.response?.data?.message || 'Network error or unhandled error' };
//     }
// };

// export const getPropertyById = async (id) => {
//   return await apiRequest(`/properties/getPropertyById/${id}`, {}, "get");
// };

// export const createProperty = async (payload) => {
//   return await apiRequest("/properties/createProperty", payload, "post");
// };

// export const updateProperty = async (id, payload) => {
//   return await apiRequest(`/properties/updateProperty/${id}`, payload, "put");
// };

// export const deleteProperty = async (id) => {
//   return await apiRequest(`/properties/${propertyid}`, {}, "delete");
// };

// export const searchProperties = async (query) => {
//   return await apiRequest("/properties/search", { query }, "get");
// };

// export const AddUpdateIntrestedUser = async (id) => {
//   return await apiRequest(`/properties/AddUpdateIntrestedUser/${id}`, {}, "put");
// };

// export default axiosInstance;