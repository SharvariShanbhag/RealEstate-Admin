import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Property from '../components/Property/Property';

const dashboardRoutes = [
  <Route index element={<Dashboard />} key="dashboard" />,
  <Route path="profile" element={<Profile />} key="profile" />,
  <Route path="properties" element={<Property />} key="properties" />,
];

export default dashboardRoutes;