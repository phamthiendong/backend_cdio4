// models/ClinicModel.js
import { getDB } from "../config/db.js";

export async function listClinics(q) {
  const db = await getDB();
  if (q) {
    const like = `%${q}%`;
    const [rows] = await db.execute(
      "SELECT * FROM clinics WHERE name LIKE ? OR specialty LIKE ? OR address LIKE ?",
      [like, like, like]
    );
    return rows;
  }
  const [rows] = await db.execute("SELECT * FROM clinics ORDER BY id DESC");
  return rows;
}
