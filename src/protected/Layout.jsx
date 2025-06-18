import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import logo from '../assets/logo.png'; // Make sure this path is correct
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import the new CSS file

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="main-header">
        <img src={logo} className="header-logo" alt="Company Logo" />
        <span className="header-title">Real Estate Admin</span>
      </header>
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;