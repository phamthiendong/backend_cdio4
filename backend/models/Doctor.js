import { getDB } from "../config/db.js";

/**
 * 🩺 Lấy danh sách bác sĩ (Không JOIN, không gender)
 */
export async function getDoctors(filters = {}) {
  const db = await getDB();

  let sql = `
    SELECT 
      id,
      name,
      specialty,
      hospital,
      rating,
      description,
      imageUrl
    FROM doctors
    WHERE 1=1
  `;
  const params = [];

  if (filters.search && filters.search.trim() !== "") {
    sql += " AND (name LIKE ? OR specialty LIKE ? OR hospital LIKE ?)";
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
  }

  if (filters.specialty && filters.specialty.trim() !== "") {
    sql += " AND specialty LIKE ?";
    params.push(`%${filters.specialty}%`);
  }

  if (filters.clinic && filters.clinic.trim() !== "") {
    sql += " AND hospital LIKE ?";
    params.push(`%${filters.clinic}%`);
  }

  sql += " ORDER BY rating DESC";

  const [rows] = await db.query(sql, params);
  return rows;
}

/**
 * 📋 Lấy chi tiết 1 bác sĩ
 */
export async function getDoctorById(id) {
  const db = await getDB();
  const [rows] = await db.query(`SELECT * FROM doctors WHERE id = ?`, [id]);
  return rows[0];
}
