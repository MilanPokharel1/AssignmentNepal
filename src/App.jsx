import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "./screens/client/Client";
import ClientDashboard from "./screens/client/Dashboard/ClientDashboard";
import ClientOrder from "./screens/client/Order/ClientOrder";
import AllClientOrder from "./screens/client/Order/AllClientOrder";
import ClientOrderView from "./screens/client/Order/ClientOrderView";
import Login from "./screens/login/Login";
import ClientPayments from "./screens/client/Payments/ClientPayments";
import ClientReminders from "./screens/client/Reminders/ClientReminders";
import HelpSupport from "./screens/client/HelpSupport/HelpSupport";
import Admin from "./screens/admin/admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client" element={<Client />}>
          <Route index element={<ClientDashboard />} />
          <Route path="orders" element={<ClientOrder />}>
            <Route index element={<AllClientOrder />} />
            <Route path="view/:orderId" element={<ClientOrderView />} />
          </Route>
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
