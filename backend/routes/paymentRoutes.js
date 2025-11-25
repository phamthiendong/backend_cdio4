// backend/routes/paymentRoutes.js
import express from "express";
import { createPayment, getAllPayments, getPaymentById, deletePayment } from "../controllers/paymentController.js";

const router = express.Router();

// ✅ Đúng route RESTful
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.post("/", createPayment);
router.delete("/:id", deletePayment);

export default router;
