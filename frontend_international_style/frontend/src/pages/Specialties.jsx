import { useEffect, useState } from "react";
import API from '@api/api'; // axios instance cấu hình sẵn (baseURL: backend)

export default function SpecialtyList() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/specialties?search=${search}`);
        setSpecialties(res.data || []);
      } catch (err) {
        console.error("❌ Lỗi tải danh sách chuyên khoa:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-700 py-14 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Khám Chuyên Khoa
        </h1>
        <p className="text-lg opacity-90 mb-5">
          Đặt lịch khám với các chuyên khoa hàng đầu Việt Nam
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Tìm chuyên khoa, bệnh lý hoặc bác sĩ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-5 py-3 rounded-2xl text-gray-800 w-96 max-w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Danh sách chuyên khoa nổi bật
        </h2>

        {loading && (
          <div className="text-center text-gray-500 py-10">Đang tải...</div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && specialties.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              Không tìm thấy chuyên khoa phù hợp.
            </p>
          )}

          {specialties.map((spec) => (
            <div
              key={spec.id}
              onClick={() => (window.location.href = `/specialties/${spec.id}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden border"
            >
              <img
                src={spec.imageUrl || "/specialties/default.jpg"}
                alt={spec.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {spec.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {spec.description ||
                    "Khám và điều trị các bệnh lý liên quan, bởi đội ngũ bác sĩ chuyên môn cao."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
