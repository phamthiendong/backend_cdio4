import { useEffect, useState } from "react";
import API from "@api/api";

export default function MyAppointments(){
  const [rows, setRows] = useState([]);
  useEffect(()=>{ (async()=>{
    const { data } = await API.get("/appointments/my");
    setRows(data);
  })(); },[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Lịch sử đặt lịch</h1>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Bác sĩ</th>
            <th className="p-2 border">Thời gian</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td className="p-2 border">{r.id}</td>
              <td className="p-2 border">{r.doctor_name}</td>
              <td className="p-2 border">{r.date}</td>
              <td className="p-2 border">{r.status}</td>
              <td className="p-2 border">
                <button className="text-green-600 mr-3" onClick={async()=>{
                  await API.post(`/payments/${r.id}/pay`,{ method:"cash" });
                  alert("Thanh toán thành công (demo)");
                }}>Thanh toán</button>
                <a className="text-blue-600" href={`/slip/${r.id}`} target="_blank">Giấy hẹn</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
