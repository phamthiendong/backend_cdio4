import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import API, { safeGet } from "@api/api";

const formatCurrency = (v) =>
  (Number(v || 0)).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function Payments() {
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  // Thông tin cơ bản
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    serviceName: "Khám tổng quát",
    amount: 250000,
    method: "CARD",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  useEffect(() => {
    (async () => {
      const data = await safeGet("/api/payments", []);
      const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setRecent(arr.slice(0, 5));
    })();
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const canSubmit = useMemo(
    () => info.name && info.phone && info.serviceName && info.amount > 0,
    [info]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return alert("Vui lòng nhập đủ thông tin!");

    setLoading(true);
    try {
      const payload = {
        name: info.name,
        phone: info.phone,
        email: info.email,
        serviceName: info.serviceName,
        amount: Number(info.amount),
        method: info.method,
      };
      const { data } = await API.post("/api/payments", payload);
      const saved = data?.data || data;
      const id = saved?.id || saved?.insertId;
      navigate(`/payment/success${id ? `?id=${id}` : ""}`, { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || "Thanh toán thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { key: "CARD", label: "Thẻ ngân hàng", icon: "💳" },
    { key: "PAYPAL", label: "PayPal", icon: "💰" },
    { key: "MOMO", label: "MoMo", icon: "📱" },
    { key: "GOOGLEPAY", label: "Google Pay", icon: "🅖" },
    { key: "CASH", label: "Tiền mặt", icon: "💵" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Thanh toán dịch vụ y tế</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bên trái: form */}
        <div className="md:col-span-2">
          <form onSubmit={submit} className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
            {/* Thông tin khách hàng */}
            <h2 className="text-lg font-medium mb-2">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={info.name} onChange={handleChange} placeholder="Họ tên" className="border rounded p-2" />
              <input name="phone" value={info.phone} onChange={handleChange} placeholder="Số điện thoại" className="border rounded p-2" />
              <input name="email" value={info.email} onChange={handleChange} placeholder="Email" className="border rounded p-2 md:col-span-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="serviceName" value={info.serviceName} onChange={handleChange} placeholder="Tên dịch vụ" className="border rounded p-2" />
              <input name="amount" type="number" value={info.amount} onChange={handleChange} placeholder="Số tiền (VND)" className="border rounded p-2" />
            </div>

            {/* Chọn phương thức */}
            <h2 className="text-lg font-medium mt-4">Chọn phương thức thanh toán</h2>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((m) => (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => setInfo({ ...info, method: m.key })}
                  className={`flex flex-col items-center border rounded-lg px-4 py-3 w-28 text-center transition ${
                    info.method === m.key
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="text-2xl">{m.icon}</div>
                  <div className="text-sm">{m.label}</div>
                </button>
              ))}
            </div>

            {/* Giao diện từng loại thanh toán */}
            {info.method === "CARD" && (
              <div className="mt-4 space-y-3">
                <h3 className="font-medium">Thanh toán qua thẻ</h3>
                <input name="cardNumber" value={info.cardNumber} onChange={handleChange} placeholder="Số thẻ" className="border rounded p-2 w-full" />
                <div className="grid grid-cols-2 gap-3">
                  <input name="expDate" value={info.expDate} onChange={handleChange} placeholder="MM/YY" className="border rounded p-2" />
                  <input name="cvc" value={info.cvc} onChange={handleChange} placeholder="Mã bảo mật (CVV)" className="border rounded p-2" />
                </div>
              </div>
            )}

            {info.method === "PAYPAL" && (
              <div className="mt-4 p-3 border rounded bg-blue-50">
                <h3 className="font-medium mb-2">Thanh toán qua PayPal</h3>
                <p className="text-sm text-gray-600 mb-3">Bạn sẽ được chuyển hướng đến cổng PayPal để hoàn tất thanh toán.</p>
                <button
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-white font-medium"
                  onClick={() => alert("Tích hợp PayPal sandbox tại đây.")}
                >
                  Mở PayPal
                </button>
              </div>
            )}

            {info.method === "MOMO" && (
              <div className="mt-4 p-3 border rounded bg-pink-50">
                <h3 className="font-medium mb-2 text-pink-600">Thanh toán qua MoMo</h3>
                <p className="text-sm text-gray-600">Quét mã QR bên dưới bằng app MoMo để thanh toán:</p>
                <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo QR" className="w-32 h-32 mx-auto mt-3" />
                <p className="text-xs text-center text-gray-500 mt-2">* Mã QR demo, chưa liên kết thật</p>
              </div>
            )}

            {info.method === "GOOGLEPAY" && (
              <div className="mt-4 p-3 border rounded bg-gray-50">
                <h3 className="font-medium mb-2">Thanh toán qua Google Pay</h3>
                <p className="text-sm text-gray-600">Bấm để xác nhận bằng tài khoản Google Pay.</p>
                <button
                  type="button"
                  onClick={() => alert("Giả lập Google Pay ở đây")}
                  className="bg-black text-white px-4 py-2 rounded mt-2"
                >
                  Xác nhận Google Pay
                </button>
              </div>
            )}

            {info.method === "CASH" && (
              <div className="mt-4 p-3 border rounded bg-green-50">
                <h3 className="font-medium mb-2 text-green-700">Thanh toán tiền mặt</h3>
                <p className="text-sm text-gray-600">
                  Vui lòng thanh toán trực tiếp tại quầy lễ tân sau khi hoàn tất đăng ký.
                </p>
              </div>
            )}

            {/* Tổng tiền + nút */}
            <div className="flex justify-between items-center pt-5">
              <span className="text-gray-600">
                Tổng tiền: <b>{formatCurrency(info.amount)}</b>
              </span>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
              >
                {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
              </button>
            </div>
          </form>
        </div>

        {/* Bên phải: lịch sử */}
        <aside className="bg-white border rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Thanh toán gần đây</h3>
            <Link to="/payment/history" className="text-sm text-blue-600">
              Xem tất cả
            </Link>
          </div>
          {recent.length === 0 && (
            <div className="text-sm text-gray-500">Chưa có giao dịch nào</div>
          )}
          {recent.map((p) => (
            <div key={p.id} className="border rounded p-2 text-sm mt-2">
              <div className="font-medium">{p.service_name || p.serviceName}</div>
              <div className="flex justify-between">
                <span>{formatCurrency(p.amount)}</span>
                <span className="uppercase">{p.method}</span>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
