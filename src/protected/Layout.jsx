import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import logo from '../assets/logo.png'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header style={{ height: "120px", backgroundColor: "#640D5F", display: "flex", alignItems: "center", padding: "0 40px" }}>
        <img src={logo} height={120} width={330} alt="Company Logo" />
        <span style={{ color: "#FFB200", fontSize: "24px", fontWeight: "bold", marginLeft: "20px" }}>Real Estate Admin</span>
      </header>
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 120px)',
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
      }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: '#2A2A2A',
            borderLeft: '2px solid #EB5B00',
            boxShadow: 'inset 0 0 10px rgba(235, 91, 0, 0.2)',
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;