import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@auth/useAuth";

export default function ScheduleManager() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ doctor_id: null, date: "", slot: "", price: 0 });

  const token = localStorage.getItem("token");
  const api = axios.create({ baseURL: "http://localhost:5000", headers: { Authorization: `Bearer ${token}` } });

  const load = async () => {
    const res = await api.get("/appointments/doctor");
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    const payload = { ...form, doctor_id: form.doctor_id || undefined };
    await api.post("/appointments", payload);
    setForm({ doctor_id: null, date: "", slot: "", price: 0 });
    await load();
  };

  const remove = async (id) => {
    await api.delete(`/appointments/${id}`);
    await load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý lịch khám</h2>

      <form onSubmit={create} className="flex flex-wrap gap-3 items-end mb-6">
        {user?.is_chief && (
          <input className="border rounded px-2 py-1" placeholder="Doctor ID (cho trưởng khoa)"
            value={form.doctor_id || ""} onChange={e=>setForm({...form, doctor_id: e.target.value})} />
        )}
        <input className="border rounded px-2 py-1" type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Khung giờ (ví dụ 08:00-08:30)" value={form.slot} onChange={e=>setForm({...form, slot: e.target.value})} required />
        <input className="border rounded px-2 py-1" type="number" placeholder="Giá" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} />
        <button className="bg-emerald-600 text-white px-4 py-2 rounded">Thêm lịch</button>
      </form>

      <table className="w-full border border-slate-200 rounded-xl overflow-hidden">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Ngày</th>
            <th className="p-2 text-left">Khung giờ</th>
            <th className="p-2 text-left">Tình trạng</th>
            <th className="p-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map(x => (
            <tr key={x.id} className="border-t">
              <td className="p-2">{x.id}</td>
              <td className="p-2">{x.date?.slice(0,10)}</td>
              <td className="p-2">{x.slot}</td>
              <td className="p-2">{x.status}</td>
              <td className="p-2">
                <button onClick={()=>remove(x.id)} className="text-red-600">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
