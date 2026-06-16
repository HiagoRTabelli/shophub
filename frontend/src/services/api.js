import axios from "axios";

const api = axios.create({
  baseURL: "https://shophub-backend-3cgm.onrender.com/api",
});

export default api;