import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">BookCare</Link>
        <nav className="space-x-4">
          <Link to="/doctors" className="hover:underline">Bác sĩ</Link>
          <Link to="/specialties" className="hover:underline">Chuyên khoa</Link>
          <Link to="/login" className="hover:underline">Đăng nhập</Link>
        </nav>
      </header>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center py-3 text-sm">© 2025 BookCare</footer>
    </div>
  );
}
