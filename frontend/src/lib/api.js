import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "https://jay-yogeshwar-solar.onrender.com/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

export default api;
