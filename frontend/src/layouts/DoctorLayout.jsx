import { Outlet, Link } from "react-router-dom";
import Navbar from "@components/Navbar.jsx";
import Footer from "@components/Footer.jsx";

export default function DoctorLayout() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <nav className="flex gap-6 mb-6 border-b pb-3 text-blue-700 font-medium">
          <Link to="/doctor">Lịch làm việc</Link>
          <Link to="/doctor/prescriptions">Đơn thuốc</Link>
          <Link to="/doctor/rate-doctor">Đánh giá</Link>
          <Link to="/doctor/video-call">Gọi video</Link>
          <Link to="/">Trang chủ</Link>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
