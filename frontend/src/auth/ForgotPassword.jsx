import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/for", { email });
      setMsg(res.data.message || "Yêu cầu đã được gửi!");
    } catch (err) {
      setMsg("Không tìm thấy tài khoản!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>

      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-white/80 hover:bg-white text-sky-700 font-semibold px-4 py-1.5 rounded-xl shadow transition"
      >
        ← Quay lại
      </button>

      <div className="relative z-10 bg-white/80 rounded-2xl shadow-lg p-8 w-[360px]">
        <h1 className="text-2xl font-semibold text-center mb-6 text-sky-700">
          Quên mật khẩu
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Nhập email đăng ký"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full px-3 py-2 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          />
          <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl transition">
            Gửi yêu cầu
          </button>
        </form>

        {msg && <p className="text-center text-sm text-green-700 mt-3">{msg}</p>}
      </div>
    </div>
  );
}
