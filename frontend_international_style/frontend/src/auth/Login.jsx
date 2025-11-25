import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Đăng nhập() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      const r = res?.data || {};
      const role = r.user?.role || r.role;
      if(role === "doctor") navigate("/doctor");
      else if(role === "admin") navigate("/admin");
      else navigate("/patient");
    } catch (ex) {
      setErr("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/image.png')", // ảnh trong public/
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lớp phủ tím mờ */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/60 to-purple-600/60 backdrop-blur-[2px]" />

      <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8 w-[360px] text-center text-white">
        <h2 className="text-2xl font-semibold mb-2">CHÀO BẠN! MỜI BẠN ĐĂNG NHẬP</h2>
        <p className="text-sm text-white/80 mb-6">Mời bạn nhập email và mật khẩu</p>

        {err && (
          <div className="bg-red-500/40 text-white text-sm rounded-lg mb-4 p-2">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm mb-1 text-white/80">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/40 rounded-lg placeholder-white/60 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/80">Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/40 rounded-lg placeholder-white/60 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-white/80">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-sky-400" />
              Remember me
            </label>
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-6">
          <hr className="w-1/3 border-white/30" />
          <span className="text-white/70 text-sm">hoặc tiếp tục với</span>
          <hr className="w-1/3 border-white/30" />
        </div>

        <div className="flex justify-center gap-4 mt-5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/40 rounded-xl text-sm transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4"
            />
            Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/40 rounded-xl text-sm transition">
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-4 h-4"
            />
            GitHub
          </button>
        </div>

        <p className="text-sm text-white/80 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
