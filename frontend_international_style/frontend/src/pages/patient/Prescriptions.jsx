import { useEffect, useState } from "react";
import { API } from "@api/api";
import { useAuth } from "@auth/useAuth";

export default function Prescriptions(){
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [mineApps, setMineApps] = useState([]);
  const [form, setForm] = useState({ appointment_id:"", patient_id:"", note:"", items:[] });
  const [item, setItem] = useState({ name:"", dosage:"", unit:"viên", qty:1, note:"" });

  const load = async ()=>{
    if (!user) return;
    if (user.role === "doctor"){
      const [apps, pres] = await Promise.all([
        API.get("/appointments/doctor").then(r=>r.data),
        API.get("/prescriptions/doctor").then(r=>r.data),
      ]);
      setMineApps(apps);
      setList(pres);
    } else if (user.role === "admin"){
      const pres = await API.get("/prescriptions/admin").then(r=>r.data);
      setList(pres);
    } else {
      const pres = await API.get("/prescriptions/me").then(r=>r.data);
      setList(pres);
    }
  };

  useEffect(()=>{ load(); },[user]);

  const addItem = ()=>{
    if(!item.name) return;
    setForm(s=>({...s, items:[...s.items, {...item, qty:Number(item.qty||1)}]}));
    setItem({ name:"", dosage:"", unit:"viên", qty:1, note:"" });
  };

  const create = async ()=>{
    await API.post("/prescriptions", form);
    await load();
    alert("Đã tạo đơn thuốc");
    setForm({ appointment_id:"", patient_id:"", note:"", items:[] });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Đơn thuốc</h1>

      {user?.role==="doctor" && (
        <div className="border rounded p-4 mb-6">
          <h2 className="font-semibold mb-2">Tạo đơn thuốc</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <select className="border rounded p-2"
                    value={form.appointment_id}
                    onChange={e=>{
                      const appId = e.target.value;
                      const a = mineApps.find(x=> String(x.id)===String(appId));
                      setForm(s=>({...s, appointment_id: appId, patient_id: a?.user_id || ""}));
                    }}>
              <option value="">-- Chọn lịch hẹn --</option>
              {mineApps.map(a=>(
                <option key={a.id} value={a.id}>{a.patient_name} • {a.date} {a.slot}</option>
              ))}
            </select>
            <input placeholder="Ghi chú đơn thuốc" className="border rounded p-2 col-span-2"
                   value={form.note} onChange={e=>setForm(s=>({...s, note:e.target.value}))}/>
          </div>

          <div className="mt-3 grid md:grid-cols-5 gap-2">
            <input placeholder="Tên thuốc" className="border rounded p-2" value={item.name} onChange={e=>setItem(s=>({...s, name:e.target.value}))}/>
            <input placeholder="Liều dùng" className="border rounded p-2" value={item.dosage} onChange={e=>setItem(s=>({...s, dosage:e.target.value}))}/>
            <input placeholder="Đơn vị" className="border rounded p-2" value={item.unit} onChange={e=>setItem(s=>({...s, unit:e.target.value}))}/>
            <input type="number" min="1" className="border rounded p-2" value={item.qty} onChange={e=>setItem(s=>({...s, qty:e.target.value}))}/>
            <button onClick={addItem} className="px-3 rounded bg-gray-800 text-white">Thêm thuốc</button>
          </div>

          {!!form.items.length && (
            <ul className="mt-3 list-disc pl-6 text-sm">
              {form.items.map((it,idx)=>(
                <li key={idx}>{it.name} — {it.dosage} — {it.qty} {it.unit}</li>
              ))}
            </ul>
          )}

          <div className="mt-3">
            <button onClick={create} className="px-4 py-2 rounded bg-sky-600 text-white">Lưu đơn</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {list.map(p=>(
          <div key={p.id} className="p-4 border rounded">
            <div className="font-medium">Đơn #{p.id} • {p.created_at}</div>
            <div className="text-sm">BS: {p.doctor_name || p.doctor_id} — BN: {p.patient_name || p.patient_id}</div>
            <ul className="mt-2 list-disc pl-6 text-sm">
              {JSON.parse(p.items||"[]").map((it,idx)=>(
                <li key={idx}>{it.name} — {it.dosage} — {it.qty} {it.unit} {it.note?`• ${it.note}`:""}</li>
              ))}
            </ul>
            {p.note && <div className="text-sm text-gray-600 mt-2">Ghi chú: {p.note}</div>}
          </div>
        ))}
        {!list.length && <div className="text-gray-500">Chưa có đơn thuốc</div>}
      </div>
    </div>
  )
}
