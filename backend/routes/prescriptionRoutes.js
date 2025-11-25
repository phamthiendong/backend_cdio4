// backend/routes/prescriptionRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin, isDoctor } from "../middleware/roleMiddleware.js";
import {
  createPrescription,
  getMyPrescriptions,
  doctorPrescriptions,
  adminPrescriptions,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", authMiddleware, isDoctor, createPrescription);
router.get("/me", authMiddleware, getMyPrescriptions);
router.get("/doctor", authMiddleware, isDoctor, doctorPrescriptions);
router.get("/admin", authMiddleware, isAdmin, adminPrescriptions);

export default router;
