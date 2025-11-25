import { Router } from "express";
import { getDB } from "../config/db.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

// helper: find doctor by user email
async function doctorByUserEmail(email){
  const db = await getDB();
  const [rows] = await db.query("SELECT * FROM doctors WHERE email = ?", [email]);
  return rows[0] || null;
}

// GET /schedules/doctor - lịch của bác sĩ (trưởng khoa xem tất cả)
router.get("/doctor", authRequired, async (req, res) => {
  try {
    const db = await getDB();
    // nếu là admin => xem tất cả
    if (req.user.role === "admin") {
      const [rows] = await db.query("SELECT * FROM appointments ORDER BY date DESC, slot ASC");
      return res.json(rows);
    }
    const me = await doctorByUserEmail(req.user.email);
    if (!me) return res.status(400).json({ message: "Tài khoản không phải bác sĩ" });

    // trưởng khoa xem tất cả
    if (me.is_chief) {
      const [rows] = await db.query("SELECT * FROM appointments ORDER BY date DESC, slot ASC");
      return res.json(rows);
    }

    const [rows] = await db.query("SELECT * FROM appointments WHERE doctor_id=? ORDER BY date DESC, slot ASC", [me.id]);
    return res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi lấy lịch" });
  }
});

// POST /schedules - tạo một lịch (bác sĩ tự tạo, trưởng khoa có thể chỉ định doctor_id)
router.post("/", authRequired, async (req, res) => {
  try {
    const db = await getDB();
    const me = await doctorByUserEmail(req.user.email);
    if (!me && req.user.role !== "admin") return res.status(400).json({ message: "Chỉ bác sĩ" });

    const { doctor_id, date, slot, price = 0 } = req.body;
    let targetDoctorId = doctor_id || (me?.id);
    if (!targetDoctorId) return res.status(400).json({ message: "Thiếu doctor_id" });

    // insert
    const [ret] = await db.query(
      "INSERT INTO appointments (doctor_id, date, slot, price, status, paid) VALUES (?,?,?,?, 'pending', 0)",
      [targetDoctorId, date, slot, price]
    );
    const [rows] = await db.query("SELECT * FROM appointments WHERE id=?", [ret.insertId]);
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi tạo lịch" });
  }
});

// DELETE /schedules/:id - xóa lịch (bác sĩ chỉ xóa lịch của mình, trưởng khoa/admin xóa mọi lịch)
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const id = req.params.id;
    const db = await getDB();
    if (req.user.role === "admin") {
      await db.query("DELETE FROM appointments WHERE id=?", [id]);
      return res.json({ ok: true });
    }
    const me = await doctorByUserEmail(req.user.email);
    if (!me) return res.status(400).json({ message: "Chỉ bác sĩ" });

    if (me.is_chief) {
      await db.query("DELETE FROM appointments WHERE id=?", [id]);
      return res.json({ ok: true });
    }

    await db.query("DELETE FROM appointments WHERE id=? AND doctor_id=?", [id, me.id]);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi xóa lịch" });
  }
});

export default router;
