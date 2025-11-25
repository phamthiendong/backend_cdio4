// src/pages/SpecialtyCard.jsx
export default function SpecialtyCard({ s }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow hover:shadow-md transition">
      <h3 className="font-semibold text-gray-900">{s.name}</h3>
      {s.icon && <div className="text-3xl mt-2">{s.icon}</div>}
    </div>
  );
}
