import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { motion } from "framer-motion";
import { Home, Info, Phone, UserPlus } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const u = await login(email, password);
      if (u.role === "admin") navigate("/admin");
      else if (u.role === "doctor" && u.is_chief) navigate("/chief-doctor");
      else if (u.role === "doctor") navigate("/doctor");
      else navigate("/patient");
    } catch (error) {
      setErr(error?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500">
      {/* ===== THANH MENU ===== */}
      <header className="w-full bg-blue-900/80 backdrop-blur-lg text-white py-4 px-10 flex justify-between items-center shadow-lg border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-bookingcare.svg"
            alt="BookingCare Logo"
            className="w-9 h-9 drop-shadow-md"
          />
          <span className="text-3xl font-bold tracking-tight">
            Booking<span className="text-cyan-300">Care</span>
          </span>
        </Link>

        <nav className="flex space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-cyan-300 transition-all"
          >
            <Home size={20} /> Trang chủ
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 hover:text-cyan-300 transition-all"
          >
            <Info size={20} /> Giới thiệu
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 hover:text-cyan-300 transition-all"
          >
            <Phone size={20} /> Liên hệ
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 hover:text-cyan-300 transition-all"
          >
            <UserPlus size={20} /> Đăng ký
          </Link>
        </nav>
      </header>

      {/* ===== KHỐI CHÍNH ===== */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center w-full h-full px-10 py-12">
        {/* BÊN TRÁI: ICON BÁC SĨ */}
        <div className="flex-1 flex items-center justify-center relative">
          <motion.div
            className="absolute w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/bacsi.png"
            alt="Doctor Icon"
            className="w-72 h-72 z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* BÊN PHẢI: FORM */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg bg-white/15 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20"
          >
            <h2 className="text-4xl font-extrabold text-white mb-3 text-center drop-shadow-md">
              Đăng nhập
            </h2>
            <p className="text-center text-white/80 mb-8">
              Nhập email và mật khẩu để tiếp tục
            </p>

            {err && (
              <div className="bg-red-500/40 text-white text-sm rounded-lg mb-4 p-2 text-center">
                {err}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label className="block text-sm mb-1 text-white/80">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl px-4 py-3 outline-none bg-white/90 text-gray-800 focus:ring-2 focus:ring-cyan-400"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/80">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full rounded-xl px-4 py-3 outline-none bg-white/90 text-gray-800 focus:ring-2 focus:ring-cyan-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-cyan-200 hover:text-white transition-all"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-300"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/80">
              Chưa có tài khoản?{" "}
              <Link
                className="underline text-cyan-200 hover:text-white transition-all"
                to="/register"
              >
                Đăng ký
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="text-center text-white/70 py-4 text-sm bg-blue-950/60 border-t border-white/10">
        © 2025 BookingCare — Nền tảng y tế thông minh 💙
      </footer>
    </div>
  );
}
