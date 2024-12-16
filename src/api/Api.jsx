// const url = "http://46.202.164.135:3000/api/v1";
const url = "http://localhost:3000/api/v1";
// const url = "https://server.assignmentnepal.com/api/v1";

export const google_login = `${url}/auth/google-login`;
export const manual_login = `${url}/auth/login`;
export const manual_register = `${url}/auth/register`;
export const upload_file = `${url}/user/createorder`;
export const upload_file_after_order = `${url}/user/uploadfile`;
export const get_orders = `${url}/user/orders`;
export const get_all_orders = `${url}/user/allorders`;
export const send_comment = `${url}/user/order/sendcomment`;
export const get_orderById = `${url}/user/orderbyid`;
export const order_status = `${url}/user/orderstatus`;

export const download_file = `${url}/user/file/download`;
export const user_status = `${url}/user/userstatus`;
export const get_payment = `${url}/user/payments`;
export const get_payment_dashboard = `${url}/user/payments-dashboard`;
export const make_payment = `${url}/user/makepayment`;
export const get_remainder = `${url}/user/remainder`;
export const create_remainder = `${url}/user/createremainder`;
export const cs_dashboard = `${url}/cs/dashboard`;
export const admin_dashboard = `${url}/admin/dashboard`;

export const QR_payment = `${url}/user/uploadpayment`
export const QR_payment_request = `${url}/user/paymentrequests`


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


//file upload
export const file_upload = `${url}/user/uploadfile`;
export const file_requests = `${url}/files/requests`;
export const file_status = `${url}/file/changestatus`;
export const all_file_status = `${url}/file/changeallfilestatus`;



//withdrawal
export const get_withdrawal_request = `${url}/user/getwithdrawlrequest`;
export const get_all_withdrawal_request = `${url}/user/getallwithdrawlrequest`;
export const create_withdrawal = `${url}/user/createwithdrawal`;
export const withdrawal_status = `${url}/user/withdrawalstatus`;
