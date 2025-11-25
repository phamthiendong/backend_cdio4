import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

/**
 * 🩺 API: Nhận yêu cầu đặt lịch khám (phiên bản tương thích frontend hiện tại)
 */
router.post("/", async (req, res) => {
  try {
    const db = await getDB();
    const data = req.body;

    console.log("📥 Dữ liệu từ frontend:", data);

    // ⚠️ Nếu không có trường bắt buộc thì báo lỗi
    if (!data.date || !data.time || !data.specialty) {
      return res.status(400).json({ message: "Thiếu thông tin đặt lịch" });
    }

    // 🔧 Xử lý dữ liệu
    const visitDate = data.date; // yyyy-MM-dd (đã đúng format)
    const visitSlot = data.time || "09:00";
    const note = data.condition || "";
    const specialty = data.specialty || "";
    const session = data.session || "";
    const patientName = data.fullName || "Chưa rõ";
    const phone = data.phone || null;
    const gender = data.gender || "";
    const dob = data.dob || null;
    const address = data.address || "";
    const job = data.job || "";
    const patientType = data.patientType || "";

    // ✅ Thêm vào bảng appointments (doctor_id tạm null)
    const [result] = await db.query(
      `
      INSERT INTO appointments 
      (user_id, doctor_id, clinic_id, date, slot, note, status, price, paid)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', 0, 0)
      `,
      [null, null, null, visitDate, visitSlot, note]
    );

    // ✅ Ghi log thông tin chi tiết vào console
    console.log(`✅ Đặt lịch thành công (ID: ${result.insertId})`);
    console.table({
      Mã_Lịch: result.insertId,
      Họ_Tên: patientName,
      Ngày_Khám: visitDate,
      Giờ_Khám: visitSlot,
      Chuyên_Khoa: specialty,
      Ghi_Chú: note,
    });

    res.json({
      success: true,
      message: "Đặt lịch thành công!",
      appointmentId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Lỗi khi đặt lịch:", err);
    res.status(500).json({ message: "Lỗi server khi đặt lịch", error: err.message });
  }
});

/**
 * 📋 API: Lấy danh sách lịch hẹn
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(`
      SELECT 
        a.*, 
        d.name AS doctor_name, 
        d.specialty, 
        d.hospital
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách lịch hẹn:", err);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách" });
  }
});

export default router;
