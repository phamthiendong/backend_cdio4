import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [isChief, setIsChief] = useState(false);
  const [err, setErr] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const u = await register({ name, email, password, role, is_chief: role==='doctor' ? isChief : false });
      if (u.role === "admin") navigate("/admin");
      else if (u.role === "doctor" && (u.is_chief || isChief)) navigate("/chief-doctor");
      else if (u.role === "doctor") navigate("/doctor");
      else navigate("/patient");
    } catch (error) {
      setErr(error?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-2">Đăng ký</h2>
        <p className="text-sm text-white/80 mb-6">Tạo tài khoản BookCare</p>

        {err && <div className="bg-red-500/40 text-white text-sm rounded-lg mb-4 p-2">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm mb-1 text-white/80">Họ và tên</label>
            <input className="w-full rounded-xl px-3 py-2 outline-none" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white/80">Email</label>
            <input type="email" className="w-full rounded-xl px-3 py-2 outline-none" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white/80">Mật khẩu</label>
            <input type="password" className="w-full rounded-xl px-3 py-2 outline-none" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/80">Vai trò</label>
            <div className="flex items-center gap-4 text-white">
              <label className="flex items-center gap-2"><input type="radio" name="role" value="patient" checked={role==='patient'} onChange={()=>setRole('patient')} /> Bệnh nhân</label>
              <label className="flex items-center gap-2"><input type="radio" name="role" value="doctor" checked={role==='doctor'} onChange={()=>setRole('doctor')} /> Bác sĩ</label>
              <label className="flex items-center gap-2"><input type="radio" name="role" value="admin" checked={role==='admin'} onChange={()=>setRole('admin')} /> Admin</label>
            </div>
          </div>

          {role === 'doctor' && (
            <div className="pl-1 text-white">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isChief} onChange={e=>setIsChief(e.target.checked)} />
                Tôi là <span className="font-semibold">Bác sĩ trưởng khoa</span>
              </label>
              <p className="text-xs text-white/70 mt-1">Trưởng khoa có thể quản lý lịch của các bác sĩ trong khoa.</p>
            </div>
          )}

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-medium">
            Tạo tài khoản
          </button>
        </form>

        <p className="mt-4 text-white/80 text-sm">
          Đã có tài khoản? <Link className="underline" to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
