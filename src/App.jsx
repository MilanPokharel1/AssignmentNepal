import AdminDashboard from "./screens/admin/dashboard";
import ClientDashboard from "./screens/client/Dashboard/ClientDashboard";
import Login from "./screens/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Client from "./screens/client/Client";
import ClientOrder from "./screens/client/Order/ClientOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client" element={<Client />}>
          <Route index element={<ClientDashboard />} />
          <Route path="orders" element={<ClientOrder />} /> 
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
