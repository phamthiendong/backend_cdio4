import { useState } from "react";
import API from '@api/api';
import { useNavigate } from "react-router-dom";

export default function Tìm kiếm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    specialties: [],
    clinics: [],
    doctors: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/search?q=${encodeURIComponent(query)}`);
      setResults(data);
    } catch (err) {
      console.error("❌ Lỗi tìm kiếm:", err);
    }
    setLoading(false);
  };

  // 🩶 Skeleton loading effect
  const SkeletonItem = ({ height = "h-6", width = "w-3/4" }) => (
    <div
      className={`bg-gray-200 rounded-md ${height} ${width} animate-pulse`}
    ></div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 transition-all">
      {/* Thanh tìm kiếm */}
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto flex items-center gap-3 mb-10"
      >
        <input
          type="text"
          placeholder="Bác sĩ, Chuyên khoa, Phòng khám..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-sky-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-transform transform hover:scale-105"
        >
          Tìm
        </button>
      </form>

      {/* Loading shimmer */}
      {loading && (
        <div className="max-w-5xl mx-auto space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 p-4 bg-white rounded-2xl shadow-sm">
              <SkeletonItem width="w-1/4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <SkeletonItem key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị kết quả */}
      {!loading && (
        <div className="max-w-5xl mx-auto space-y-10">
          {/* === CHUYÊN KHOA === */}
          <section>
            <h2 className="font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded">
              Chuyên khoa
            </h2>
            {results.specialties.length === 0 ? (
              <p className="px-4 py-3 text-gray-500">
                Không có chuyên khoa nào.
              </p>
            ) : (
              <ul>
                {results.specialties.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => navigate(`/specialties/${s.id}`)}
                    className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition-transform hover:translate-x-1"
                  >
                    <img
                      src={
                        s.imageUrl ||
                        "https://cdn.bookingcare.vn/fo/w600/2024/08/30/145338-co-xuong-khop.jpg"
                      }
                      alt={s.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">{s.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* === CƠ SỞ Y TẾ === */}
          <section>
            <h2 className="font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded">
              Cơ sở y tế
            </h2>
            {results.clinics.length === 0 ? (
              <p className="px-4 py-3 text-gray-500">
                Không có phòng khám nào.
              </p>
            ) : (
              <ul>
                {results.clinics.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-4 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition-all hover:translate-x-1"
                  >
                    <img
                      src={
                        c.imageUrl ||
                        "https://cdn.bookingcare.vn/fo/w600/2024/08/30/145545-benh-vien.jpg"
                      }
                      alt={c.name}
                      className="w-16 h-16 rounded-lg object-cover border shadow-sm"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{c.name}</div>
                      <div className="text-sm text-gray-600">{c.address}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* === BÁC SĨ === */}
          <section>
            <h2 className="font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded">
              Bác sĩ
            </h2>
            {results.doctors.length === 0 ? (
              <p className="px-4 py-3 text-gray-500">Không có bác sĩ nào.</p>
            ) : (
              <ul>
                {results.doctors.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center gap-4 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition-transform hover:translate-x-1"
                    onClick={() => navigate(`/booking/${d.id}`)}
                  >
                    <img
                      src={
                        d.imageUrl ||
                        "https://cdn.bookingcare.vn/fo/w600/2024/08/30/145556-bs-default.jpg"
                      }
                      alt={d.name}
                      className="w-16 h-16 rounded-full object-cover border shadow-sm"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{d.name}</div>
                      <div className="text-sm text-gray-600">
                        {d.specialty} • {d.hospital}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
