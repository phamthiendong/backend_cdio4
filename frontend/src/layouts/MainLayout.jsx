import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-blue-700 text-white shadow-lg px-14 py-5 flex justify-between items-center fixed w-full top-0 left-0 z-50">
        
        {/* LOGO BÁC SĨ + BOOKINGCARE */}
        <Link to="/" className="flex items-center space-x-4 select-none">
          
          {/* ICON BÁC SĨ CHUYỂN ĐỘNG */}
          <motion.img
            src="/bacsi.png"
            alt="Bác sĩ BookingCare"
            className="w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />

          {/* CHỮ BOOKINGCARE CÁCH ĐIỆU */}
          <motion.h1
            className="text-4xl font-extrabold tracking-tight flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-white"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.4)",
                  "0 0 20px rgba(0,255,255,0.7)",
                  "0 0 10px rgba(255,255,255,0.4)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Booking
            </motion.span>
            <motion.span
              className="ml-1 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 5px rgba(0,255,255,0.4))",
                  "drop-shadow(0 0 10px rgba(0,255,255,0.6))",
                  "drop-shadow(0 0 5px rgba(0,255,255,0.4))",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              Care
            </motion.span>
          </motion.h1>
        </Link>

        {/* NAVIGATION */}
        <nav className="space-x-10 font-semibold text-xl tracking-wide">
          <Link to="/" className="hover:text-yellow-300 transition-all">Trang chủ</Link>
          <Link to="/doctors" className="hover:text-yellow-300 transition-all">Bác sĩ</Link>
          <Link to="/specialties" className="hover:text-yellow-300 transition-all">Chuyên khoa</Link>
          <Link to="/login" className="hover:text-yellow-300 transition-all">Đăng nhập</Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-40 p-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-700 shadow-inner">
        © 2025 BookingCare — Nền tảng y tế tích hợp AI 💉🩺
      </footer>
    </div>
  );
}
