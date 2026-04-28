import axios from "axios";

function getApiBaseUrl() {
  const configuredBaseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:5000" : "https://jay-yogeshwar-solar.onrender.com");
  const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

  return normalizedBaseUrl.endsWith("/api") ? normalizedBaseUrl : `${normalizedBaseUrl}/api`;
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
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
