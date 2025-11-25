// backend/controllers/paymentController.js
import { getDB } from "../config/db.js";

// ✅ Lấy tất cả thanh toán
export const getAllPayments = async (req, res) => {
  try {
    const db = await getDB(); // ✅ Lấy pool
    const [rows] = await db.query("SELECT * FROM payments ORDER BY created_at DESC");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách thanh toán:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// ✅ Lấy 1 thanh toán theo id
export const getPaymentById = async (req, res) => {
  try {
    const db = await getDB(); // ✅
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM payments WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Không tìm thấy giao dịch" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("❌ Lỗi khi lấy thanh toán:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// ✅ Tạo mới thanh toán
export const createPayment = async (req, res) => {
  try {
    const db = await getDB(); // ✅ Dòng này là chìa khóa
    const { name, phone, email, amount, method } = req.body;

    if (!name || !phone || !amount || !method)
      return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });

    const [result] = await db.query(
      "INSERT INTO payments (name, phone, email, amount, method, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [name, phone, email || "", amount, method, "success"]
    );

    res.status(201).json({
      success: true,
      message: "Tạo thanh toán thành công",
      data: { id: result.insertId, name, amount, method },
    });
  } catch (err) {
    console.error("❌ Lỗi khi tạo thanh toán:", err);
    res.status(500).json({ success: false, message: "Không thể tạo thanh toán" });
  }
};

// ✅ Xóa thanh toán
export const deletePayment = async (req, res) => {
  try {
    const db = await getDB(); // ✅
    const { id } = req.params;
    await db.query("DELETE FROM payments WHERE id = ?", [id]);
    res.json({ success: true, message: "Đã xóa giao dịch" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa thanh toán:", err);
    res.status(500).json({ success: false, message: "Lỗi khi xóa" });
  }
};
