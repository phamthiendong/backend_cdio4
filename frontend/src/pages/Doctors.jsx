import { useEffect, useState } from "react";
import API from '@api/api';
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    specialty: "",
    clinic: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load danh sách chuyên khoa + bác sĩ
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [specRes, clinicRes, doctorRes] = await Promise.all([
          API.get("/specialties"),
          API.get("/clinics"),
          API.get(`/doctors?search=${filters.keyword}&specialty=${filters.specialty}&clinic=${filters.clinic}&gender=${filters.gender}`),
        ]);
        setSpecialties(specRes.data);
        setClinics(clinicRes.data);
        setDoctors(doctorRes.data);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu bác sĩ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-700 py-14 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Đặt khám với bác sĩ
        </h1>
        <p className="text-lg opacity-90 mb-5">
          Tìm và đặt lịch khám với các bác sĩ hàng đầu Việt Nam
        </p>
      </section>

      {/* Bộ lọc */}
      <section className="max-w-7xl mx-auto px-4 py-6 bg-white rounded-xl -mt-10 shadow-md relative z-10">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
          {/* Từ khóa */}
          <input
            type="text"
            placeholder="Tìm bác sĩ, bệnh lý..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters((f) => ({ ...f, keyword: e.target.value }))
            }
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Chuyên khoa */}
          <select
            value={filters.specialty}
            onChange={(e) =>
              setFilters((f) => ({ ...f, specialty: e.target.value }))
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Tất cả chuyên khoa</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Cơ sở y tế */}
          <select
            value={filters.clinic}
            onChange={(e) =>
              setFilters((f) => ({ ...f, clinic: e.target.value }))
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Tất cả cơ sở</option>
            {clinics.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Giới tính */}
          <select
            value={filters.gender}
            onChange={(e) =>
              setFilters((f) => ({ ...f, gender: e.target.value }))
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Tất cả giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
      </section>

      {/* Danh sách bác sĩ */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-gray-500">Đang tải danh sách...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center text-gray-500">
            Không tìm thấy bác sĩ phù hợp.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                <img
                  src={doc.imageUrl || "/doctors/default.jpg"}
                  alt={doc.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {doc.specialty_name || "Chuyên khoa chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {doc.hospital || "Phòng khám tư nhân"}
                  </p>
                  <button
                    onClick={() => navigate(`/booking/${doc.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-xl"
                  >
                    Đặt lịch khám
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
