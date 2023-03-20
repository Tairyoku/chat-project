import axios from "axios";

const axiosInstanseFormData = axios.create({
  baseURL: "http://" + process.env.VUE_APP_BASE_URL + "/api/",
  headers: {
    "Access-Control-Allow-Origin":'*',
    'Accept': 'multipart/form-data',
    // 'Authorization': window.localStorage.getItem('token'),
    'Content-Type': 'multipart/form-data',
  }
});

axiosInstanseFormData.defaults.headers.common.Authorization = window.localStorage.getItem("token")

export default axiosInstanseFormData;
