import React, { createContext, useContext, useState, useEffect } from 'react';
// REMOVE THIS LINE: import { jwtDecode } from 'jwt-decode'; // No longer needed

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Will store the user object (e.g., { id, email, isAdmin })

  useEffect(() => {
    // On component mount (page load/refresh), try to restore user and token from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // We'll store the user object here now

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Basic check: if token and parsed user exist, assume valid for UI purposes.
        // For stricter validation on refresh, you'd make an API call to a protected endpoint
        // (e.g., /api/users/me) using the storedToken to verify and get fresh user data.
        // For this scenario (no jwt-decode), we rely on the stored 'user' object.
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null); // No token or user data found
    }
  }, []);

  // Function to handle login: takes token and user data directly from API response
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store the user object from backend
    setUser(userData); // Update state
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data from localStorage too
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};