import express from "express";
import { getDoctors, getDoctorById } from "../models/Doctor.js";

const router = express.Router();

/**
 * 📋 API: Lấy danh sách bác sĩ
 */
router.get("/", async (req, res) => {
  try {
    const doctors = await getDoctors(req.query);
    res.json(doctors);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách bác sĩ:", err);
    res.status(500).json({
      message: "Lỗi server khi lấy danh sách bác sĩ",
      error: err.message,
    });
  }
});

/**
 * 📋 API: Lấy chi tiết 1 bác sĩ
 */
router.get("/:id", async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("❌ Lỗi khi lấy chi tiết bác sĩ:", err);
    res.status(500).json({
      message: "Lỗi server khi lấy chi tiết bác sĩ",
      error: err.message,
    });
  }
});

export default router;
