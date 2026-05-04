import axios from "axios";

const API = axios.create({
  baseURL: "https://heartfelt-nourishment-production-1ad0.up.railway.app/api"
});

export default API;