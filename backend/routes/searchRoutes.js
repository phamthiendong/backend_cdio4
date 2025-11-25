import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const q = (req.query.q || "").trim();
  try {
    const db = await getDB();

    const [doctors] = await db.query(
      "SELECT id, name, specialty, hospital FROM doctors WHERE name LIKE ? OR specialty LIKE ?",
      [`%${q}%`, `%${q}%`]
    );
    const [clinics] = await db.query(
      "SELECT id, name, specialty, address FROM clinics WHERE name LIKE ? OR specialty LIKE ?",
      [`%${q}%`, `%${q}%`]
    );
    const [specialties] = await db.query(
      "SELECT id, name, description FROM specialties WHERE name LIKE ?",
      [`%${q}%`]
    );

    res.json({ doctors, clinics, specialties });
  } catch (err) {
    console.error("❌ Lỗi /search:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
