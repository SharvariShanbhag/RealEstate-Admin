import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaHome, FaUser, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { logoutAPI } from '../../API/Api.js';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    navigate("/login");
  };

  return (
    <div
      className="vh-100"
      style={{
        width: "20%",
        backgroundColor: "#640D5F",
        color: "#FFFFFF",
        padding: "1.5rem",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h4 style={{ color: "#FFB200", marginBottom: "2rem", fontWeight: "bold" }}>
        Admin Panel
      </h4>
      <ul className="list-unstyled">
        <li className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#FFB200" : "#FFFFFF",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            })}
          >
            <FaHome className="me-2" />
            Dashboard
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#FFB200" : "#FFFFFF",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            })}
          >
            <FaUser className="me-2" />
            Profile
          </NavLink>
        </li>
        <hr style={{ borderColor: "#FFFFFF" }} />
        <li className="mt-4">
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "#FFB200" : "#FFFFFF",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            })}
          >
            <FaBuilding className="me-2" />
            Properties
          </NavLink>
        </li>
        <li className="mt-4">
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              textAlign: "left",
              padding: "0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;