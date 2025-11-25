import { useEffect, useState } from "react";
import { API } from "@api/api";
import { useAuth } from "@auth/useAuth";

export default function DoctorDashboard(){
  const { user } = useAuth();
  const [apps, setApps] = useState([]);

  useEffect(()=>{
    if (user?.role==="doctor"){
      API.get("/appointments/doctor").then(r=> setApps(r.data));
    }
  },[user]);

  if (user?.role!=="doctor") return <div className="p-6">Chỉ dành cho bác sĩ</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Bảng điều khiển Bác sĩ</h1>
      <div className="grid gap-3">
        {apps.map(a=>(
          <div key={a.id} className="p-4 border rounded">
            <div className="font-medium">BN: {a.patient_name} • {a.date} {a.slot}</div>
            <div className="text-sm">Trạng thái: {a.status} • Thanh toán: {a.paid? "Đã":"Chưa"}</div>
          </div>
        ))}
        {!apps.length && <div className="text-gray-500">Chưa có lịch</div>}
      </div>
    </div>
  )
}
