// const url = "http://46.202.164.135:3000/api/v1";
// const url = "http://localhost:3000/api/v1";
const url = "https://server.assignmentnepal.com/api/v1";

export const google_login = `${url}/auth/google-login`;
export const manual_login = `${url}/auth/login`;
export const upload_file = `${url}/user/createorder`;
export const get_orders = `${url}/user/orders`;
export const get_all_orders = `${url}/user/allorders`;
export const send_comment = `${url}/user/order/sendcomment`;
export const get_orderById = `${url}/user/orderbyid`;
export const order_status = `${url}/user/orderstatus`;

export const download_file = `${url}/user/file/download`;
export const file_status = `${url}/user/file/changestatus`;
export const user_status = `${url}/user/userstatus`;
export const get_payment = `${url}/user/payments`;
export const get_payment_dashboard = `${url}/user/payments-dashboard`;
export const make_payment = `${url}/user/makepayment`;
export const get_remainder = `${url}/user/remainder`;
export const create_remainder = `${url}/user/createremainder`;
export const cs_dashboard = `${url}/cs/dashboard`;
export const admin_dashboard = `${url}/admin/dashboard`;

export const cs_writers = `${url}/cs/getWriters`;
export const pending_users = `${url}/user/pendingusers`;
export const change_pending_user = `${url}/user/changependingstatus`;
export const cs_clients = `${url}/cs/getClients`;



//writer
export const writer_dashboard = `${url}/writer/dashboard`;
export const writer_orders = `${url}/writer/orders`;
export const writer_tasks = `${url}/writer/mytask`;

export const writer_accept = `${url}/writer/acceptorder`;
export const writer_submit = `${url}/writer/submitorder`;
