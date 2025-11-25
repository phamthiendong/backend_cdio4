import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from '@api/api';

export default function SpecialtyDetail() {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/specialties/${id}`);
        setSpecialty(res.data.specialty);
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết chuyên khoa:", err);
      }
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  if (loading || !specialty)
    return (
      <div className="text-center py-16 text-gray-500">Đang tải...</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
          <Link to="/" className="hover:text-sky-600">BookingCare</Link> /{" "}
          <Link to="/specialties" className="hover:text-sky-600">
            Khám chuyên khoa
          </Link>{" "}
          / <span className="text-gray-800">{specialty.name}</span>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-white border-b py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6">
          <img
            src={specialty.imageUrl || "/specialties/default.jpg"}
            alt={specialty.name}
            className="w-28 h-28 rounded-xl border object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {specialty.name}
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              {specialty.description}
            </p>
          </div>
        </div>
      </header>

      {/* Bác sĩ */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Bác sĩ thuộc chuyên khoa này
        </h2>

        {doctors.length === 0 ? (
          <div className="text-gray-500">Chưa có bác sĩ nào trong chuyên khoa này.</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={doc.imageUrl || "/doctors/default.jpg"}
                  alt={doc.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{doc.hospital}</p>
                  <button
                    onClick={() =>
                      (window.location.href = `/doctor/${doc.id}`)
                    }
                    className="w-full bg-sky-600 hover:bg-blue-700 text-white py-2 rounded-xl"
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
