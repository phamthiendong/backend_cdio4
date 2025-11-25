import { getDB } from "../config/db.js";

export async function listSpecialties(search = "") {
  const db = await getDB();
  if (search) {
    const like = `%${search}%`;
    const [rows] = await db.execute(
      "SELECT * FROM specialties WHERE name LIKE ? OR description LIKE ?",
      [like, like]
    );
    return rows;
  }
  const [rows] = await db.execute("SELECT * FROM specialties ORDER BY id DESC");
  return rows;
}

export async function getSpecialtyWithDoctors(id) {
  const db = await getDB();
  const [specRows] = await db.execute("SELECT * FROM specialties WHERE id = ?", [id]);
  const specialty = specRows[0];
  const [docRows] = await db.execute(
    "SELECT * FROM doctors WHERE specialty = ?",
    [specialty.name]
  );
  return { specialty, doctors: docRows };
}
