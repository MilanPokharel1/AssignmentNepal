import AdminDashboard from "./screens/admin/dashboard";
import ClientDashboard from "./screens/client/Dashboard/ClientDashboard";
import Login from "./screens/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Client from "./screens/client/Client";
import ClientOrder from "./screens/client/Order/ClientOrder";
import ClientPayments from "./screens/client/Payments/ClientPayments";
import ClientReminders from "./screens/client/Reminders/ClientReminders";
import Admin from "./screens/admin/admin";
import HelpSupport from "./screens/client/HelpSupport/HelpSupport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client" element={<Client />}>
          <Route index element={<ClientDashboard />} />
          <Route path="orders" element={<ClientOrder />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="reminders" element={<ClientReminders />} />
          <Route path="helpsupport" element={<HelpSupport />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
