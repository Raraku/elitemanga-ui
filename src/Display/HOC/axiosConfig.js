import axios from "axios";

const axiosConfig = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "https://elitemanga-test.herokuapp.com/",
  // baseURL: "http://192.168.43.127:8000/",
});
if (localStorage.getItem("token") !== null) {
  axiosConfig.defaults.headers.common["Authorization"] =
    "Token " + localStorage.getItem("token");
}

export default axiosConfig;
