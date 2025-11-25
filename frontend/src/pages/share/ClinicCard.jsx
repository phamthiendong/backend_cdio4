// src/pages/ClinicCard.jsx
export default function ClinicCard({ c }) {
  return (
    <div className="flex flex-col justify-between p-4 border rounded-xl bg-white hover:shadow-md transition cursor-pointer">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 text-lg">{c.name}</h3>
        <p className="text-sm text-gray-600">{c.specialty}</p>
        <p className="text-sm text-gray-600">{c.address}</p>
        <p className="text-xs text-gray-500">{c.hours}</p>
      </div>

      <div className="mt-2 flex items-center gap-1 text-yellow-500 text-sm">
        {"⭐".repeat(Math.round(c.rating))}{" "}
        <span className="text-gray-500 ml-1">({c.rating})</span>
      </div>
    </div>
  );
}
