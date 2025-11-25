import { useState } from "react";

export default function HeroSearch({ onSearch }) {
  const [term, setTerm] = useState("");

  return (
    <div className="bg-gradient-to-r from-sky-300 to-sky-500 text-white rounded-3xl p-8 text-center mt-6">
      <h1 className="text-3xl font-semibold mb-3">Tìm bác sĩ & Đặt lịch khám</h1>
      <p className="text-white/80 mb-6">
        Tra cứu chuyên khoa, cơ sở y tế, bác sĩ và đặt lịch nhanh chóng
      </p>
      <input
        type="text"
        placeholder="Tìm bác sĩ, chuyên khoa..."
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="px-4 py-3 rounded-xl w-full max-w-md text-gray-800"
      />
    </div>
  );
}
