import AdminDashboard from "./screens/admin/dashboard";
import Dashboard from "./screens/client/dashboard";
import Login from "./screens/login/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
