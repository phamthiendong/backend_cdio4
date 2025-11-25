import { useEffect, useState } from "react";
import API from "@api/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await API.get("/appointments");  // <-- gọi API trực tiếp
        console.log("📥 Dữ liệu nhận từ backend:", data);
        setAppointments(data);
      } catch (err) {
        console.error("❌ Lỗi khi tải lịch hẹn:", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-sky-600 mb-6">Lịch sử đặt lịch</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">Chưa có lịch hẹn nào</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-sky-100 text-blue-700">
            <tr>
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Bác sĩ</th>
              <th className="py-3 px-4 border">Thời gian</th>
              <th className="py-3 px-4 border">Trạng thái</th>
              <th className="py-3 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a.id} className="text-center border">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">
                  {a.doctor_name}
                </td>
                <td className="py-2 px-4">
                  {a.date} — {a.slot?.slice(0, 5)}
                </td>
                <td className="py-2 px-4">
                  {a.status === "pending" ? (
                    <span className="text-yellow-600 font-medium">
                      Chờ xác nhận
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Đã xác nhận
                    </span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {a.paid ? (
                    <span className="text-green-500">Đã thanh toán</span>
                  ) : (
                    <button className="bg-sky-500 text-white px-3 py-1 rounded-md">
                      Thanh toán
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
