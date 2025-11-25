import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Tìm kiếm, Stethoscope, Hospital, Users, BookOpen, Calendar,
  ChevronRight, MapPin, Star, Clock, ShieldCheck, Phone, ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SPECIALTIES = [
  { id: 1, name: "Cơ xương khớp", icon: "🦴" },
  { id: 2, name: "Tiêu hoá", icon: "🫃" },
  { id: 3, name: "Tim mạch", icon: "❤️" },
  { id: 4, name: "Tai Mũi Họng", icon: "👂" },
  { id: 5, name: "Cột sống", icon: "🦴" },
  { id: 6, name: "Sản - Phụ khoa", icon: "👶" },
];

const DOCTORS = [
  { id: 1, name: "BS. Nguyễn Văn A", specialty: "Tim mạch", rating: 4.9, clinic: "Bệnh viện TCI", district: "Ba Đình, Hà Nội", slots: "Hôm nay • 9:00–12:00" },
  { id: 2, name: "BS. Trần Thị B", specialty: "Nhi khoa", rating: 4.8, clinic: "BV Nhi", district: "Q.10, TP.HCM", slots: "Mai • 13:00–16:00" },
];

const CLINICS = [
  { id: 1, name: "Hệ thống Y tế Thu Cúc TCI", address: "Hà Nội", tags: ["Đa khoa"], stars: 4.8 },
  { id: 2, name: "MEDLATEC", address: "Toàn quốc", tags: ["Xét nghiệm"], stars: 4.7 },
];

function SectionHeader({ icon, title, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="text-sm md:text-base inline-flex items-center gap-1 text-sky-600 hover:underline">
          {action}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function SpecialtyCard({ s, onClick }) {
  return (
    <div onClick={onClick} className="group rounded-2xl p-4 bg-white shadow-sm hover:shadow-md border border-gray-100 cursor-pointer transition">
      <div className="text-3xl mb-3">{s.icon}</div>
      <div className="font-medium">{s.name}</div>
      <div className="text-xs text-gray-500 mt-1 hidden md:block">Khám đúng chuyên khoa phù hợp triệu chứng</div>
    </div>
  );
}

function DoctorCard({ d, onBook }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm hover:shadow-md border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">{d.name}</div>
          <div className="text-sm text-gray-600">{d.specialty} • {d.clinic}</div>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <MapPin className="w-4 h-4" /> {d.district}
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{d.rating}</span>
            <Clock className="w-4 h-4 ml-3" /> {d.slots}
          </div>
          <button onClick={()=>navigate(`/booking/${d.id}`)} className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-sky-500 text-white text-sm hover:bg-blue-700">
            Đặt lịch <Calendar className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ClinicCard({ c }) {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm hover:shadow-md border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
          <Hospital className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">{c.name}</div>
          <div className="text-sm text-gray-600 flex items-center gap-2"><MapPin className="w-4 h-4" />{c.address}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {c.tags.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-sky-50 text-blue-700 rounded-full text-xs">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <Star className="w-4 h-4 text-yellow-500" /> {c.stars}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSearch({ onSearch }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-500 text-white">
      <div className="px-5 md:px-10 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-2xl md:text-4xl font-bold leading-tight">
            Nền tảng Y tế – Đặt lịch khám nhanh với bác sĩ, phòng khám uy tín
          </motion.h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Tìm đúng chuyên khoa, bác sĩ phù hợp và đặt lịch khám dễ dàng chỉ trong vài thao tác.
          </p>

          <div className="mt-6 bg-white rounded-2xl p-2 flex items-center gap-2 w-full max-w-xl">
            <Tìm kiếm className="w-5 h-5 text-gray-500 ml-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm bác sĩ, chuyên khoa, cơ sở y tế..."
              className="flex-1 outline-none px-2 py-2 text-gray-800"
            />
            <button onClick={() => navigate(`/search?q=${encodeURIComponent(q)}`)} className="px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-blue-700">
              Tìm kiếm
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
            <ShieldCheck className="w-4 h-4" /> Thông tin đã kiểm chứng
            <Users className="w-4 h-4 ml-3" /> 6.000–8.000 lượt đặt mỗi tháng
            <Phone className="w-4 h-4 ml-3" /> Hỗ trợ 024-7301-2468
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex-1 hidden md:block">
          <div className="rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/20">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button onClick={()=>navigate("/specialties")} className="p-3 rounded-xl bg-white/90 text-gray-800 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Khám chuyên khoa</button>
              <button onClick={()=>navigate("/clinics")} className="p-3 rounded-xl bg-white/90 text-gray-800 flex items-center gap-2"><Hospital className="w-4 h-4" /> Bệnh viện - Phòng khám</button>
              <button onClick={()=>navigate("/doctors")} className="p-3 rounded-xl bg-white/90 text-gray-800 flex items-center gap-2"><Users className="w-4 h-4" /> Bác sĩ giỏi</button>
              <button onClick={()=>navigate("/knowledge")} className="p-3 rounded-xl bg-white/90 text-gray-800 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Cẩm nang sức khoẻ</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home(){
  const [search, setSearch] = useState("");
  const filteredDoctors = useMemo(() => {
    if (!search) return DOCTORS;
    return DOCTORS.filter((d) =>
      [d.name, d.specialty, d.clinic, d.district].join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const navigate = useNavigate();

  return (
    <>
      <HeroSearch onSearch={setSearch} />

      {/* Chuyên khoa */}
      <section id="specialties" className="mt-10 md:mt-14">
        <SectionHeader icon={<Stethoscope className="w-6 h-6 text-sky-600" />} title="Khám Chuyên khoa" action="Xem tất cả" onAction={()=>navigate("/specialties")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {SPECIALTIES.map(s => (
            <SpecialtyCard key={s.id} s={s} onClick={()=>navigate(`/specialties/${s.id}`)} />
          ))}
        </div>
      </section>

      {/* Bác sĩ */}
      <section id="doctors" className="mt-12 md:mt-16">
        <SectionHeader icon={<Users className="w-6 h-6 text-sky-600" />} title="Bác sĩ nổi bật" action="Xem tất cả" onAction={()=>navigate("/doctors")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredDoctors.map(d => <DoctorCard key={d.id} d={d} />)}
        </div>
      </section>

      {/* Phòng khám */}
      <section id="clinics" className="mt-12 md:mt-16">
        <SectionHeader icon={<Hospital className="w-6 h-6 text-sky-600" />} title="Cơ sở y tế uy tín" action="Xem tất cả" onAction={()=>navigate("/clinics")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {CLINICS.map(c => <ClinicCard key={c.id} c={c} />)}
        </div>
      </section>

      {/* Handbooks */}
      <section id="handbooks" className="mt-12 md:mt-16">
        <SectionHeader icon={<BookOpen className="w-6 h-6 text-sky-600" />} title="Cẩm nang sức khoẻ" action="Xem thêm" onAction={()=>navigate("/knowledge")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{id:1,title:"Khám tim mạch: Quy trình & chi phí",excerpt:"Hướng dẫn chọn bác sĩ tim mạch...",tag:"Cẩm nang",reading:"6 phút"}].map(p=>(
            <div key={p.id} className="rounded-2xl p-4 bg-white shadow-sm hover:shadow-md border border-gray-100">
              <div className="text-xs text-emerald-700 font-medium">{p.tag}</div>
              <div className="mt-1 font-semibold text-lg leading-snug">{p.title}</div>
              <p className="text-sm text-gray-600 mt-1">{p.excerpt}</p>
              <div className="mt-3 text-xs text-gray-500">{p.reading} đọc</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 md:mt-16">
        <div className="rounded-3xl p-6 md:p-10 bg-sky-500 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-2xl md:text-3xl font-semibold">Sẵn sàng đặt lịch?</div>
            <p className="text-white/90 mt-1">Chọn bác sĩ, cơ sở y tế và thời gian phù hợp chỉ trong vài phút.</p>
          </div>
          <button onClick={()=>navigate("/search")} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-700 font-medium hover:bg-sky-50">
            Bắt đầu ngay <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </section>
    </>
  );
}
