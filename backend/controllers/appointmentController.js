// backend/controllers/appointmentController.js
import { getDB } from "../config/db.js";

export const createAppointment = async (req, res) => {
  try {
    const db = await getDB();
    const user_id = req.user.id;
    const { doctor_id, clinic_id, date, slot, price } = req.body;

    if (!doctor_id || !date || !slot) {
      return res.status(400).json({ message: "Thiếu thông tin lịch hẹn" });
    }

    const [result] = await db.query(
      `INSERT INTO appointments (user_id, doctor_id, clinic_id, date, slot, price, status, paid)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', 0)`,
      [user_id, doctor_id, clinic_id || null, date, slot, price || 200000]
    );

    const [rows] = await db.query("SELECT * FROM appointments WHERE id=?", [result.insertId]);
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi tạo lịch hẹn" });
  }
};

export const myAppointments = async (req, res) => {
  try {
    const db = await getDB();
    const user_id = req.user.id;
    const [rows] = await db.query(
      `SELECT a.*, d.name as doctor_name, c.name as clinic_name
       FROM appointments a
       LEFT JOIN doctors d ON d.id = a.doctor_id
       LEFT JOIN clinics c ON c.id = a.clinic_id
       WHERE a.user_id=? ORDER BY a.id DESC`,
      [user_id]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy lịch hẹn" });
  }
};

export const doctorAppointments = async (req, res) => {
  try {
    const db = await getDB();
    const doctor_id = req.user.id;
    const [rows] = await db.query(
      `SELECT a.*, u.name as patient_name 
       FROM appointments a
       JOIN users u ON u.id=a.user_id
       WHERE a.doctor_id=? ORDER BY a.date DESC, a.slot ASC`,
      [doctor_id]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy lịch hẹn bác sĩ" });
  }
};

// Admin đổi trạng thái/duyệt
export const updateStatus = async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;
    const { status, paid } = req.body; // 'pending'|'confirmed'|'cancelled', paid: 0/1
    await db.query("UPDATE appointments SET status=?, paid=? WHERE id=?", [
      status || "pending",
      paid ? 1 : 0,
      id,
    ]);
    const [rows] = await db.query(
      `SELECT a.*, u.name patient_name, d.name doctor_name
       FROM appointments a 
       LEFT JOIN users u ON u.id=a.user_id
       LEFT JOIN doctors d ON d.id=a.doctor_id
       WHERE a.id=?`,
      [id]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi cập nhật lịch hẹn" });
  }
};
