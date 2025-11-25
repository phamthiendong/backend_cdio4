import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from '@api/api';

export default function Booking() {
  const { doctorId } = useParams(); // lấy id bác sĩ từ URL (/booking/:doctorId)
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    job: "",
    patientType: "",
    specialty: "",
    condition: "",
    date: "",
    session: "",
    time: "",
  });

  // 🩺 Tải thông tin bác sĩ
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const { data } = await API.get(`/doctors/${doctorId}`);
        setDoctor(data);
        setForm((prev) => ({ ...prev, specialty: data.specialty || "" }));
      } catch (err) {
        console.error("❌ Lỗi khi tải thông tin bác sĩ:", err);
      }
    };
    loadDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 📨 Gửi form đặt lịch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, doctor_id: doctorId };
      await API.post("/appointments", payload);
      alert("✅ Đặt lịch thành công!");
      navigate("/appointments"); // 👉 chuyển qua trang Lịch hẹn
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi gửi yêu cầu!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Đăng ký khám bệnh
        </h2>

        {/* 🔹 Thông tin bác sĩ */}
        {doctor ? (
          <div className="flex items-center gap-4 p-4 bg-teal-50 border rounded-md mb-6">
            <img
              src={
                doctor.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              }
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold text-teal-700">
                {doctor.name}
              </h3>
              <p className="text-gray-700">
                {doctor.specialty} — {doctor.hospital}
              </p>
              <p className="text-sm text-gray-500">{doctor.description}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-4">
            ⏳ Đang tải thông tin bác sĩ...
          </p>
        )}

        {/* 🔹 Form chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Nhập họ tên người khám"
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Giới tính
            </label>
            <div className="flex gap-5 items-center mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={form.gender === "Nam"}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={form.gender === "Nữ"}
                  onChange={handleChange}
                />
                Nữ
              </label>
            </div>
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Ngày sinh *
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Địa chỉ *
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Vui lòng nhập địa chỉ nơi ở"
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Nhập số điện thoại liên hệ"
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Nghề nghiệp
            </label>
            <select
              name="job"
              value={form.job}
              onChange={handleChange}
              className="border border-teal-400 w-full rounded-md p-2"
            >
              <option value="">Chọn nghề nghiệp</option>
              <option value="Sinh viên">Sinh viên</option>
              <option value="Nhân viên văn phòng">Nhân viên văn phòng</option>
              <option value="Giáo viên">Giáo viên</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-teal-700 font-semibold mb-1">
              Đối tượng *
            </label>
            <div className="flex gap-5 items-center mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="patientType"
                  value="Khám yêu cầu"
                  checked={form.patientType === "Khám yêu cầu"}
                  onChange={handleChange}
                />
                Khám yêu cầu
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="patientType"
                  value="Khám BHYT"
                  checked={form.patientType === "Khám BHYT"}
                  onChange={handleChange}
                />
                Khám BHYT
              </label>
            </div>
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Chuyên khoa
            </label>
            <input
              type="text"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              disabled
              className="border border-teal-400 w-full rounded-md p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Tình trạng bệnh
            </label>
            <input
              type="text"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              placeholder="Mô tả ngắn tình trạng bệnh"
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Ngày khám *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-teal-400 w-full rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-teal-700 font-semibold mb-1">
              Buổi khám *
            </label>
            <div className="flex gap-5 items-center mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="session"
                  value="Sáng"
                  checked={form.session === "Sáng"}
                  onChange={handleChange}
                />
                Sáng
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="session"
                  value="Chiều"
                  checked={form.session === "Chiều"}
                  onChange={handleChange}
                />
                Chiều
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-teal-700 font-semibold mb-1">
              Giờ khám *
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="border border-teal-400 w-full rounded-md p-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              (Không sớm hơn 24 giờ kể từ thời điểm đăng ký)
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md"
          >
            Gửi Yêu Cầu
          </button>
        </div>
      </form>
    </div>
  );
}
