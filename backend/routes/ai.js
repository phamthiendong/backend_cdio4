import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  const answer = await askAI(question);
  res.json({ question, answer });
});

export default router;
