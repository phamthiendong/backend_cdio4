import { useState } from "react";
import { safeGet } from "@api/api.js";


export default function BookingModal({ open, doctor, onClose }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!doctor) return;
    setLoading(true);
    try {
      await API.post("/appointments", {
        doctor_id: doctor.id,
        note,
      });
      alert("Đặt lịch thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đặt lịch!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Đặt lịch với {doctor?.name}</h2>
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          rows="3"
          placeholder="Ghi chú cho bác sĩ..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
