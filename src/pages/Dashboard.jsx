const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#2A2A2A",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(255, 178, 0, 0.2)",
        color: "#FFFFFF",
      }}
    >
      <h2 style={{ color: "#FFB200", fontWeight: "bold", marginBottom: "1rem" }}>
        Dashboard
      </h2>
      <p style={{ fontSize: "1.1rem" }}>
        Welcome to your real estate dashboard! Here you can manage properties, view interested users, 
        and handle all administrative tasks for your real estate platform.
      </p>
      <div className="mt-4" style={{ display: 'flex', gap: '20px' }}>
        <div style={{
          backgroundColor: '#640D5F',
          padding: '20px',
          borderRadius: '8px',
          flex: 1,
          boxShadow: '0 0 8px rgba(255, 178, 0, 0.3)'
        }}>
          <h4 style={{ color: '#FFB200' }}>Total Properties</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{
          backgroundColor: '#640D5F',
          padding: '20px',
          borderRadius: '8px',
          flex: 1,
          boxShadow: '0 0 8px rgba(255, 178, 0, 0.3)'
        }}>
          <h4 style={{ color: '#FFB200' }}>Interested Users</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;