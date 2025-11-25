import { Outlet, Link } from "react-router-dom";
import Navbar from "@components/Navbar.jsx";
import Footer from "@components/Footer.jsx";

export default function PatientLayout() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <nav className="flex gap-6 mb-6 border-b pb-3 text-blue-700 font-medium">
          <Link to="/patient">Trang cá nhân</Link>
          <Link to="/patient/booking">Đặt lịch khám</Link>
          <Link to="/patient/my-appointments">Lịch hẹn của tôi</Link>
          <Link to="/">Trang chủ</Link>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
