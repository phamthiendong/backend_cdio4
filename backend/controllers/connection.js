import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const id = await createUser({ name, email, password, role });
    res.json({ message: "User created", id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
