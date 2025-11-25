import { Outlet, Link } from "react-router-dom";
import Navbar from "@components/Navbar.jsx";
import Footer from "@components/Footer.jsx";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <nav className="flex gap-6 mb-6 border-b pb-3 text-blue-700 font-medium">
          <Link to="/admin/manage-doctors">QL Bác sĩ</Link>
          <Link to="/admin/manage-patients">QL Bệnh nhân</Link>
          <Link to="/admin/manage-appointments">QL Lịch hẹn</Link>
          <Link to="/admin/manage-specialties">QL Chuyên khoa</Link>
          <Link to="/">Trang chủ</Link>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
