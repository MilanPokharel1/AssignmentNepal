// const url = "https://assignment-nepal-backend-production.up.railway.app/api/v1";
const url = "http://localhost:3000/api/v1";
export const google_login = `${url}/auth/google-login`;
export const manual_login = `${url}/auth/login`;
export const upload_file = `${url}/file/upload`;
export const get_orders = `${url}/file/orders`;
export const download_file = `${url}/file/download`;




//router.route("/user/getnotices").get(verifyJWT, getNotices) //get notices between the dates
//router.route("/user/getmynotices").get(verifyJWT, getmyNotices) // get notices posted by user
//router.route("/user/getuppernotices").get(verifyJWT, getUpperNotices) //get all notices posted by upper user

