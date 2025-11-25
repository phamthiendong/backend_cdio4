// src/pages/DoctorCard.jsx
import { Stethoscope, MapPin, Star, Clock, Calendar } from "lucide-react";

export default function DoctorCard({ d }) {
  if (!d) return null;
  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm hover:shadow-md border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-blue-600" />
        </div>

        <div className="flex-1">
          <div className="font-semibold text-gray-900">{d.name}</div>
          <div className="text-sm text-gray-600">{d.specialty} • {d.clinic}</div>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <MapPin className="w-4 h-4" /> {d.district}
          </div>

          <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{d.rating}</span>
            <Clock className="w-4 h-4 ml-3" /> {d.slots}
          </div>

          <button className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700">
            Đặt lịch <Calendar className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
