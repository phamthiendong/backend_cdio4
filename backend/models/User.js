// backend/models/UserModel.js
import { getDB } from "../config/db.js";

/**
 * Tạo người dùng mới
 */
export async function createUser({ name, email, password, role }) {
  const db = await getDB();
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return result.insertId;
}

/**
 * Lấy người dùng theo email
 */
export async function getUserByEmail(email) {
  const db = await getDB();
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

/**
 * Lấy người dùng theo ID
 */
export async function getUserById(id) {
  const db = await getDB();
  const [rows] = await db.execute("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
  return rows[0] || null;
}
