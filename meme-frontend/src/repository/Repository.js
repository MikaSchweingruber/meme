import axios from "axios"
// import configuration from "../plugins/configuration";
const baseURL = `/api/`


axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

export default axios.create({
  baseURL,
  withCredentials: true
});