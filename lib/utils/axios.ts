/**
 * Axios wrapper including custom configs.
 */

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
