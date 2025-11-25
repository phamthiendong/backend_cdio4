import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import specialtyRoutes from "./routes/specialtyRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: false,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/clinics", clinicRoutes);
app.use("/specialties", specialtyRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/search", searchRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
