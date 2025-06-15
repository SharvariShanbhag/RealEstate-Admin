import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {location.pathname !== "/login" && (
          <Link to="/login" className="nav-link">Login</Link>
        )}
        {location.pathname !== "/register" && (
          <Link to="/register" className="nav-link">Register</Link>
        )}
      </div>
      <div className="nav-right">
        <h1 className="logo" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Real Estate
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;