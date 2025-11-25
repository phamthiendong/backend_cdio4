// backend/config/db.js
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const {
  DB_HOST = "localhost",
  DB_PORT = 3306,
  DB_USER = "root",
  DB_PASSWORD = "Nguyen@1904",
  DB_NAME = "bookingcare",
} = process.env;

let pool;

/**
 * ✅ Hàm kết nối database — chỉ tạo 1 pool cho toàn app
 */
export async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectionLimit: 10,
    });
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL connected:", DB_HOST, DB_NAME);
  }
  return pool;
}

export { pool };

// ✅ Thêm 2 dòng này để các file import mặc định hoạt động
const db = await getDB();
export default db;
