// src/pages/PaymentHistory.jsx
import { useEffect, useMemo, useState } from "react";
import { safeGet } from "@api/api";

const fmt = (v) => (Number(v||0)).toLocaleString("vi-VN", { style:"currency", currency:"VND" });

export default function PaymentHistory() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const data = await safeGet("/api/payments", []);
      const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setItems(arr);
    })();
  }, []);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key) return items;
    return items.filter(p => (p.service_name || p.serviceName || "").toLowerCase().includes(key));
  }, [q, items]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Lịch sử thanh toán</h1>
        <input placeholder="Tìm theo dịch vụ..." className="border rounded p-2"
               value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Dịch vụ</th>
              <th className="text-right p-2">Số tiền</th>
              <th className="text-left p-2">Phương thức</th>
              <th className="text-left p-2">Trạng thái</th>
              <th className="text-left p-2">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">Chưa có giao dịch.</td></tr>
            )}
            {filtered.map((p, i) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{p.service_name || p.serviceName}</td>
                <td className="p-2 text-right">{fmt(p.amount)}</td>
                <td className="p-2">{p.method}</td>
                <td className="p-2 uppercase">{p.status || "success"}</td>
                <td className="p-2">{new Date(p.created_at || p.createdAt).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
