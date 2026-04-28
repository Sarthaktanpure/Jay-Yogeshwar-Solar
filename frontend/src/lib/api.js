import axios from "axios";

const api = axios.create({
  baseURL:"https://jay-yogeshwar-solar.onrender.com/",
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
