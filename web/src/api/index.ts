import axios from "axios";

const axiosInstanse = axios.create({
  baseURL: "http://" + process.env.VUE_APP_BASE_URL + "/api/",
  headers: {
    "Access-Control-Allow-Origin":'*',
    'Content-type': 'application/json;charset=UTF-8',
    // 'Authorization': 
  }
});
axiosInstanse.defaults.headers.common.Authorization = window.localStorage.getItem("token")
export default axiosInstanse;
