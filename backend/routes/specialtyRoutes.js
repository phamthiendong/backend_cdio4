import express from "express";
import {
  listSpecialties,
  getSpecialtyWithDoctors,
} from "../models/Specialty.js";

const router = express.Router();

// Danh sách chuyên khoa
router.get("/", async (req, res) => {
  const search = req.query.search || "";
  try {
    const specs = await listSpecialties(search);
    res.json(specs);
  } catch (err) {
    console.error("❌ Lỗi specialtyRoutes:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Chi tiết chuyên khoa + danh sách bác sĩ
router.get("/:id", async (req, res) => {
  try {
    const data = await getSpecialtyWithDoctors(req.params.id);
    res.json(data);
  } catch (err) {
    console.error("❌ Lỗi specialty detail:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
