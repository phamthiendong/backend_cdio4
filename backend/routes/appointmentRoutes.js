import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

/**
 * 📌 Tạo lịch hẹn (POST /appointments)
 */
router.post("/", async (req, res) => {
  try {
    const db = await getDB();
    const {
      doctor_id,
      fullName,
      gender,
      dob,
      address,
      phone,
      job,
      patientType,
      specialty,
      condition, // từ frontend
      date,
      session,
      time
    } = req.body;

    console.log("📥 Dữ liệu từ frontend:", req.body);

    // Chèn bản ghi mới vào bảng appointments
    const [result] = await db.query(
      `
      INSERT INTO appointments
      (doctor_id, fullName, gender, dob, address, phone, job, patientType, specialty, healthCondition, date, session, time, status, paid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0)
      `,
      [
        doctor_id,
        fullName,
        gender,
        dob,
        address,
        phone,
        job,
        patientType,
        specialty,
        condition,
        date,
        session,
        time,
      ]
    );

    console.log("✅ Đặt lịch thành công, ID:", result.insertId);
    res.status(201).json({
      success: true,
      message: "Đặt lịch thành công!",
      appointmentId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Lỗi khi đặt lịch:", err);
    res
      .status(500)
      .json({ message: "Lỗi server khi đặt lịch", error: err.message });
  }
});

/**
 * 📌 Lấy danh sách lịch hẹn (GET /appointments)
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDB();

    // Truy vấn kết hợp với bảng doctors để lấy tên bác sĩ
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.fullName,
        a.date,
        a.time AS slot,
        a.status,
        a.paid,
        a.session,
        d.name AS doctor_name,
        d.specialty,
        d.hospital
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.date DESC, a.time ASC
    `);

    console.log("📤 Dữ liệu lịch hẹn gửi frontend:", rows);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách lịch hẹn:", err);
    res.status(500).json({ message: "Lỗi server khi lấy lịch hẹn" });
  }
});

export default router;
