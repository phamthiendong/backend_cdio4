// src/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

// Đính kèm JWT nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// helper an toàn (optional)
export async function safeGet(url, fallback = []) {
  try {
    const { data } = await API.get(url);
    return data?.data ?? data ?? fallback;
  } catch (e) {
    console.warn("safeGet fallback:", url, e?.response?.data || e.message);
    return fallback;
  }
}

export { API };
export default API;
