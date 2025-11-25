import { useEffect, useMemo, useState } from "react";
import { safeGet } from "@api/api";

export default function Phòng khám(){
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(()=>{ (async()=>{
    const data = await safeGet("/clinics", []);
    setRows(data);
  })(); },[]);

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(c => [c.name,c.specialty,c.address].join(" ").toLowerCase().includes(s));
  },[q,rows]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Phòng khám</h1>
        <input className="border rounded-xl px-3 py-2 w-64" placeholder="Tìm phòng khám..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c=>(
          <div key={c.id} className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md">
            <div className="font-semibold text-gray-800">{c.name}</div>
            <div className="text-sm text-gray-600">{c.address}</div>
            <div className="text-yellow-500 mt-1">⭐ {c.stars ?? c.rating ?? 4.5}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
