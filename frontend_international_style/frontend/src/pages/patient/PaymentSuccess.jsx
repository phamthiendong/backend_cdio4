// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { safeGet } from "@api/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const fmt = (v) => (Number(v || 0)).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await safeGet(`/api/payments/${id}`, null);
      setPayment(data?.data || data);
    })();
  }, [id]);

  // 🧾 Hàm tạo và tải PDF hóa đơn
  const handleExportPDF = () => {
    if (!payment) return;
    const doc = new jsPDF();

    // Tiêu đề
    doc.setFontSize(18);
    doc.text("HÓA ĐƠN THANH TOÁN", 70, 20);

    // Thông tin chung
    doc.setFontSize(12);
    doc.text(`Mã giao dịch: ${payment.id}`, 20, 35);
    doc.text(`Tên khách hàng: ${payment.name || "Không rõ"}`, 20, 43);
    doc.text(`Email: ${payment.email || "Không rõ"}`, 20, 51);
    doc.text(`Ngày thanh toán: ${new Date(payment.created_at).toLocaleString("vi-VN")}`, 20, 59);

    // Bảng chi tiết
    doc.autoTable({
      startY: 70,
      head: [["Thông tin", "Chi tiết"]],
      body: [
        ["Dịch vụ", payment.service_name || "Không có"],
        ["Số tiền", fmt(payment.amount)],
        ["Phương thức", payment.method],
        ["Trạng thái", payment.status.toUpperCase()],
      ],
      theme: "striped",
      headStyles: { fillColor: [0, 102, 204] },
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.text("Cảm ơn quý khách đã sử dụng dịch vụ BookingCare.", 20, pageHeight - 20);

    // Xuất file PDF
    doc.save(`HoaDon_${payment.id}.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <div className="text-3xl font-semibold text-green-600 mb-2">
        Thanh toán thành công
      </div>
      <div className="text-gray-600 mb-6">
        Cảm ơn bạn đã sử dụng dịch vụ.
      </div>

      {payment && (
        <div className="bg-white border rounded-xl p-4 text-left mx-auto max-w-xl shadow-sm">
          <div className="flex justify-between"><span>Dịch vụ</span><b>{payment.service_name || "Không có"}</b></div>
          <div className="flex justify-between"><span>Số tiền</span><b>{fmt(payment.amount)}</b></div>
          <div className="flex justify-between"><span>Phương thức</span><b>{payment.method}</b></div>
          <div className="flex justify-between"><span>Trạng thái</span><b className="uppercase">{payment.status}</b></div>
          <div className="flex justify-between"><span>Thời gian</span><b>{new Date(payment.created_at).toLocaleString("vi-VN")}</b></div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Xuất hóa đơn điện tử
        </button>
        <Link to="/payment/history" className="px-4 py-2 rounded bg-gray-100">
          Xem lịch sử
        </Link>
        <Link to="/payment" className="px-4 py-2 rounded bg-sky-600 text-white">
          Thanh toán khác
        </Link>
      </div>
    </div>
  );
}
