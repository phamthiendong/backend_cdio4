// backend/controllers/prescriptionController.js
import { getDB } from "../config/db.js";

/**
 * Bác sĩ tạo đơn thuốc từ appointment
 * body: { appointment_id, patient_id, items: [{name, dosage, unit, qty, note}], note }
 */
export const createPrescription = async (req, res) => {
  try {
    const db = await getDB();
    const doctor_id = req.user.id; // từ token
    const { appointment_id, patient_id, items, note } = req.body;

    if (!appointment_id || !patient_id || !Array.isArray(items)) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const [result] = await db.query(
      "INSERT INTO prescriptions (appointment_id, doctor_id, patient_id, items, note) VALUES (?,?,?,?,?)",
      [appointment_id, doctor_id, patient_id, JSON.stringify(items), note || null]
    );

    const [rows] = await db.query("SELECT * FROM prescriptions WHERE id=?", [result.insertId]);
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi tạo đơn thuốc" });
  }
};

// Bệnh nhân xem đơn thuốc của mình
export const getMyPrescriptions = async (req, res) => {
  try {
    const db = await getDB();
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT p.*, d.name as doctor_name FROM prescriptions p JOIN users d ON d.id=p.doctor_id WHERE p.patient_id=? ORDER BY p.id DESC",
      [userId]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy đơn thuốc" });
  }
};

// Bác sĩ xem các đơn thuốc đã tạo
export const doctorPrescriptions = async (req, res) => {
  try {
    const db = await getDB();
    const doctorId = req.user.id;
    const [rows] = await db.query(
      "SELECT p.*, u.name as patient_name FROM prescriptions p JOIN users u ON u.id=p.patient_id WHERE p.doctor_id=? ORDER BY p.id DESC",
      [doctorId]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy đơn thuốc bác sĩ" });
  }
};

// Admin xem tất cả
export const adminPrescriptions = async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(
      `SELECT p.*, d.name as doctor_name, u.name as patient_name
       FROM prescriptions p
       LEFT JOIN users d ON d.id=p.doctor_id
       LEFT JOIN users u ON u.id=p.patient_id
       ORDER BY p.id DESC`
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy tất cả đơn thuốc" });
  }
};
