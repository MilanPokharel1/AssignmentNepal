import AdminDashboard from "./screens/admin/dashboard";
import ClientDashboard from "./screens/client/Dashboard/ClientDashboard";
import Login from "./screens/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
