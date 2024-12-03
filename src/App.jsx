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
import { ThemeProvider } from "../src/contexts/ThemeContext/ThemeProvider";
import CustomerService from "./screens/customerService/CustomerService";
import CSdashboard from "./screens/customerService/csDashboard/CSdashboard";
import OrderManagement from "./screens/customerService/OrderManagement/OrderManagement";
import CsAssignWriter from "./screens/customerService/CsAssignWriter/CsAssignWriter";
import CSUserManagement from "./screens/customerService/CsUserManagement/CSUserManagement";

import CsWithdrawlRequest from "./screens/customerService/CsWithdrawlRequest/CsWithdrawlRequest";
import CsRemainders from "./screens/customerService/CsRemainders/CsRemainders";
import CsPayments from "./screens/customerService/CsPayments/CsPayments";
import AdminDashboard from "./screens/admin/Dashboard/AdminDashboard";
import AdminOrderManagement from "./screens/admin/OrderManagement/AdminOrderManagement";
import AdminUserManagement from "./screens/admin/UserManagement/AdminUserManagement";
import AdminWritersManagement from "./screens/admin/writers/AdminWritersManagement";
import Writer from "./screens/writer/Writer";
import WriterDashboard from "./screens/writer/WriterDashboard/WriterDashboard";
import WriterWithdrawl from "./screens/writer/WriterWithdrawl/WriterWithdrawl";
import CsFileTransfer from "./screens/customerService/CSFileTransfer/CsFileTransfer";
import AdminReminders from "./screens/admin/AdminRemainders/AdminRemainders";
import AdminPayments from "./screens/admin/AdminPayments/AdminPayments";
import CsClientRequest from "./screens/customerService/CsClientRequest/CsClientRequest";
import OrdertView from "./screens/customerService/OrderManagement/OrderView";
import WriterOrder from "./screens/writer/WriterOrder/WriterOrder";
import WriterMyTask from "./screens/writer/WriterMyTask/WriterMyTask";
import WriterRemainder from "./screens/writer/WriterRemainder/WriterRemainder";
import WriterPayments from "./screens/writer/WriterPayments/WriterPayments";
import WriterView from "./screens/writer/WriterView/WriterView";
import AdminCS from "./screens/admin/AdminCS/AdminCS";
import AdminWithdrawal from "./screens/admin/AdminWithdrawal/AdminWithdrawal";
import AdminOrderView from "./screens/admin/AdminOrderView/AdminOrderView";
import Settings from "./screens/admin/Settings/Settings";
import WriterOrderView from "./screens/writer/WriterOrderView/WriterOrderView";
import AccountPending from "./screens/login/AccountPending";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
              path="/pending"
              element={<AccountPending />}
            />
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
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route
              path="adminordermanagement"
              element={<AdminOrderManagement />}
            />
            <Route path="assignwriter" element={<CsAssignWriter />} />
            <Route
              path="adminusermanagement"
              element={<AdminUserManagement />}
            />
            <Route
              path="adminwritermanagement"
              element={<AdminWritersManagement />}
            />
            <Route path="adminCS" element={<AdminCS />} />
            <Route path="adminWithdrawal" element={<AdminWithdrawal />} />
            <Route path="adminreminders" element={<AdminReminders />} />
            <Route path="adminpayments" element={<AdminPayments />} />
            <Route
              path="adminordermanagement/adminorderview/:orderId"
              element={<AdminOrderView />}
            />
            <Route path="clientrequest" element={<CsClientRequest />} />
            <Route path="adminsettings" element={<Settings />} />
          </Route>
          <Route path="/cs" element={<CustomerService />}>
            <Route index element={<CSdashboard />} />
            <Route path="ordermanagement" element={<OrderManagement />} />
            <Route path="assignwriter" element={<CsAssignWriter />} />
            <Route path="usermanagement" element={<CSUserManagement />} />
            <Route
              path="OrderManagement/OrderView/:orderId"
              element={<OrdertView />}
            />
            <Route path="withdrawlrequest" element={<CsWithdrawlRequest />} />
            <Route path="reminders" element={<CsRemainders />} />
            <Route path="payments" element={<CsPayments />} />
            <Route path="filetransfer" element={<CsFileTransfer />} />
            <Route path="clientrequest" element={<CsClientRequest />} />
          </Route>
          <Route path="/writer" element={<Writer />}>
            <Route index element={<WriterDashboard />} />
            <Route path="writerwithdrawl" element={<WriterWithdrawl />} />
            <Route path="writerorder" element={<WriterOrder />} />
            <Route path="writermytask" element={<WriterMyTask />} />
            <Route path="writerRemainder" element={<WriterRemainder />} />
            <Route path="writerPayments" element={<WriterPayments />} />
            <Route
              path="writerorder/writerView/:orderId"
              element={<WriterView />}
            />
            <Route
              path="writermytask/writerView/:orderId"
              element={<WriterOrderView />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
