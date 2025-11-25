import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";


export default function Layout({ children }) {
  const location = useLocation();

  // Ẩn Navbar & Footer ở login/register/forgot-password
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  if (hideLayout) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {children}
      </main>
      <footer className="mt-12 md:mt-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
                BC
              </div>
              <div>BookingCare Demo — UI demo</div>
            </div>
            <div className="flex items-center gap-4">
              <a className="hover:text-sky-600" href="#">Điều khoản</a>
              <a className="hover:text-sky-600" href="#">Bảo mật</a>
              <a className="hover:text-sky-600" href="#">Liên hệ</a>
            </div>
          </div>
          <div className="mt-4 text-xs">
            © {new Date().getFullYear()} Demo UI.
          </div>
        </div>
      </footer>
    </div>
  );
}
