import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './protected/ProtectedRoute';
import Layout from './protected/Layout';
import dashboardRoutes from './routes/dashboardRoutes'; // This is the array of routes
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={ // This is your base protected route
            <ProtectedRoute>
              <Layout /> {/* Layout contains the Sidebar and the Outlet */}
            </ProtectedRoute>
          }>
            {dashboardRoutes} {/* The dashboardRoutes array is rendered here as nested routes */}
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;