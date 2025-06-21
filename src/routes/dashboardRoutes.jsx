import { Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Property from '../components/Property/Property';
import InquiryList from '../components/Inquiries/InquiryList'; // Import the new component

const dashboardRoutes = [
  // This makes the 'properties' component the default/index route
  <Route index element={<Property />} key="properties-default" />,
  <Route path="profile" element={<Profile />} key="profile" />,
  // You might still want a specific path for 'properties' even if it's the default,
  // in case you link to it explicitly elsewhere.
  <Route path="properties" element={<Property />} key="properties" />,

  // NEW: Inquiry Route
  <Route path="inquiries" element={<InquiryList />} key="inquiries" />, // Add this line
];

export default dashboardRoutes;