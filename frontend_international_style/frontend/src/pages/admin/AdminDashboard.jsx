import { useEffect, useState } from "react";
import { API } from "@api/api";
import { useAuth } from "@auth/useAuth";

export default function AdminDashboard(){
  const { user } = useAuth();
  const [apps, setApps] = useState([]);

  const load = ()=> API.get("/search?admin_appointments=1").then(r=> setApps(r.data?.appointments || []));
  // Gợi ý: Nếu bạn có route riêng cho admin lịch hẹn thì thay bằng route đó.

  useEffect(()=>{ load(); },[]);

  const update = async (id, status, paid)=>{
    await API.patch(`/appointments/${id}/status`, { status, paid });
    await load();
  };

  if (user?.role!=="admin") return <div className="p-6">Chỉ dành cho admin</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Quản trị</h1>
      <div className="grid gap-3">
        {apps.map(a=>(
          <div key={a.id} className="p-4 border rounded">
            <div className="font-medium">#{a.id} — {a.date} {a.slot}</div>
            <div className="text-sm">BN: {a.patient_name} • BS: {a.doctor_name}</div>
            <div className="text-sm">Trạng thái: {a.status} • Thanh toán: {a.paid? "✔️":"❌"}</div>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 rounded border" onClick={()=>update(a.id,"confirmed",a.paid)}>Duyệt</button>
              <button className="px-3 py-1 rounded border" onClick={()=>update(a.id,"cancelled",a.paid)}>Hủy</button>
              <button className="px-3 py-1 rounded border" onClick={()=>update(a.id,a.status,!a.paid)}>{a.paid?"Bỏ thanh toán":"Đánh dấu đã trả"}</button>
            </div>
          </div>
        ))}
        {!apps.length && <div className="text-gray-500">Chưa có dữ liệu</div>}
      </div>
    </div>
  )
}
