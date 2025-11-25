// backend/routes/clinicRoutes.js
import { Router } from "express";
import { listClinics } from "../models/Clinic.js";

const router = Router();

router.get("/", async (req, res) => {
  const q = (req.query.q || "").trim();
  const rows = await listClinics(q);
  res.json(rows);
});

export default router;
