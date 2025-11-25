// controllers/authController.js
import bcrypt from "bcryptjs"; // ✅ dùng bcryptjs để tránh lỗi native build
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, getUserByEmail, getUserById } from "../models/User.js";
import { getDB } from "../config/db.js";

dotenv.config();

// ✅ Hàm kiểm tra bác sĩ trưởng khoa (an toàn hơn)
async function getDoctorChiefByEmail(email) {
  try {
    const db = await getDB();
    const [rows] = await db.query("SELECT is_chief FROM doctors WHERE email = ?", [email]);
    if (rows.length === 0) return 0;
    return rows[0].is_chief === 1 ? 1 : 0;
  } catch (err) {
    console.error("getDoctorChiefByEmail error:", err);
    return 0;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_please_change";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

// ===============================================
// 🟩 ĐĂNG KÝ NGƯỜI DÙNG
// ===============================================
export async function register(req, res) {
  try {
    const { name, email, password, role = "patient" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu." });
    }

    const exists = await getUserByEmail(email);
    if (exists) {
      return res.status(409).json({ message: "Email đã được đăng ký." });
    }

    const hash = await bcrypt.hash(password, 10);
    const userId = await createUser({ name, email, password: hash, role });

    return res.status(201).json({
      message: "Đăng ký thành công!",
      user: { id: userId, name, email, role },
    });
  } catch (e) {
    console.error("register error:", e);
    return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau." });
  }
}

// ===============================================
// 🟦 ĐĂNG NHẬP NGƯỜI DÙNG
// ===============================================
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu." });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email không tồn tại trong hệ thống." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Sai mật khẩu, vui lòng thử lại." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    const is_chief = await getDoctorChiefByEmail(user.email);

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_chief,
      },
    });
  } catch (e) {
    console.error("login error:", e);
    return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau." });
  }
}

// ===============================================
// 🟨 LẤY THÔNG TIN NGƯỜI DÙNG (TOKEN)
// ===============================================
export async function me(req, res) {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const is_chief = await getDoctorChiefByEmail(user.email);

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_chief,
    });
  } catch (e) {
    console.error("me error:", e);
    return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau." });
  }
}
