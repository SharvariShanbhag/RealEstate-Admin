import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
// Removed FaHome as Dashboard is removed. Added FaCrown for a new header icon.
import { FaUser, FaBuilding, FaSignOutAlt, FaCrown } from "react-icons/fa";
import { logoutAPI } from '../../API/Api.js'; // Ensure this path is correct

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // logoutAPI should handle clearing local storage (e.g., localStorage.removeItem('token'))
    await logoutAPI();
    navigate("/login");
  };

  // Base styles for navigation links to ensure consistency
  const linkBaseStyle = {
    textDecoration: "none",
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transitions for hover/active states
    fontWeight: "500", // Default font weight
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.25rem", // Slightly more padding for a better click area
    borderRadius: "0.5rem", // Rounded corners for links
  };

  // Styles specifically for active navigation links
  const activeLinkStyle = {
    color: "#2495FD", // Primary blue text when active
    backgroundColor: "#F3F3F3", // Light grey background when active
    fontWeight: "600", // Bolder when active
  };

  // Styles for inactive navigation links
  const inactiveLinkStyle = {
    color: "#FFFFFF", // White text when inactive
    backgroundColor: "transparent",
  };

  return (
    <div
      className="d-flex flex-column" // Use flex-column for vertical alignment of content
      style={{
        width: "250px", // Fixed width for a consistent sidebar
        backgroundColor: "#2495FD", // Primary blue background
        color: "#FFFFFF", // Default text color
        padding: "2rem 1.5rem", // Padding inside the sidebar
        boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
        fontFamily: "'Open Sans', sans-serif", // Consistent font
        // Removed vh-100: The sidebar's height will now adjust based on its content
        // and its parent container's layout. If you want it to stretch vertically
        // with the main content area, ensure its parent uses flexbox/grid and allows stretching.
      }}
    >
      {/* Admin Panel Header/Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center logo and text horizontally
          marginBottom: "2.5rem", // Space below the header
          paddingBottom: "1rem", // Padding below for visual separation
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Subtle divider below header
        }}
      >
        {/* Added a crown icon for a more 'Admin Panel' feel */}
        <FaCrown className="me-3 fs-3" style={{ color: "#FFD700" }} /> {/* Gold crown icon, larger font size */}
        <h4
          style={{
            color: "#FFFFFF",
            fontWeight: "700",
            fontSize: "1.7rem", // Adjusted title font size
            margin: 0, // Remove default margin from h4
          }}
        >
          Admin Portal
        </h4>
      </div>

      <ul className="list-unstyled"> {/* Removed flex-grow-1 as logout position is changed */}
        {/* Dashboard link removed as per request */}

        <li className="mb-2"> {/* mb-2 for consistent vertical spacing between links */}
          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? "active-sidebar-link" : ""}`}
            style={({ isActive }) => ({
              ...linkBaseStyle, // Apply base styles
              ...(isActive ? activeLinkStyle : inactiveLinkStyle), // Apply active/inactive styles
            })}
            // Hover effect for non-active links
            onMouseEnter={(e) => { !e.currentTarget.classList.contains('active-sidebar-link') && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'); }}
            onMouseLeave={(e) => { !e.currentTarget.classList.contains('active-sidebar-link') && (e.currentTarget.style.backgroundColor = 'transparent'); }}
          >
            <FaUser className="me-3 fs-5" /> {/* Icon with margin and size */}
            Profile
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/properties"
            className={({ isActive }) => `nav-link ${isActive ? "active-sidebar-link" : ""}`}
            style={({ isActive }) => ({
              ...linkBaseStyle,
              ...(isActive ? activeLinkStyle : inactiveLinkStyle),
            })}
            onMouseEnter={(e) => { !e.currentTarget.classList.contains('active-sidebar-link') && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'); }}
            onMouseLeave={(e) => { !e.currentTarget.classList.contains('active-sidebar-link') && (e.currentTarget.style.backgroundColor = 'transparent'); }}
          >
            <FaBuilding className="me-3 fs-5" />
            Properties
          </NavLink>
        </li>

        {/* Logout button moved directly below properties, within the ul */}
        <li className="mt-4"> {/* Added top margin to separate it from the previous links */}
            <button
                onClick={handleLogout}
                className="nav-link" // Keep Bootstrap's nav-link class for basic alignment
                style={{
                    ...linkBaseStyle, // Apply base link styles for consistency
                    background: "none", // Remove default button background
                    border: "none", // Remove default button border
                    color: "#FFFFFF",
                    textAlign: "left", // Align text to the left
                    cursor: "pointer",
                    width: "100%", // Make button take full width of its container
                }}
                // Specific hover effects for the logout button
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
            >
                <FaSignOutAlt className="me-3 fs-5" />
                Logout
            </button>
        </li>
      </ul>
      {/* The div with mt-auto is removed as logout is now within the ul */}
    </div>
  );
};

export default Sidebar;