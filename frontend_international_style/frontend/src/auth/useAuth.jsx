// src/auth/useAuth.jsx
import { useState, useEffect, createContext, useContext } from "react";
import API from "@api/api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Khôi phục user từ token khi mở lại app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  // ✅ Đăng ký tài khoản
  const register = async ({ name, email, password, role }) => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });
      alert("Đăng ký thành công!");
      return res.data;
    } catch (err) {
      console.error("Lỗi đăng ký:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Lỗi đăng ký!");
    }
  };

  // ✅ Đăng nhập
  const login = async ({ email, password }) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Đăng nhập thành công!");
      return res.data.user;
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  // ✅ Đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Đã đăng xuất!");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
