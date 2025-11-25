import { Link } from "react-router-dom";
import { useAuth } from "@auth/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">BookCare</Link>
        <div className="flex items-center gap-5">
          <Link to="/" className="hover:opacity-90">Trang chủ</Link>
          <Link to="/doctors" className="hover:opacity-90">Bác sĩ</Link>
          <Link to="/specialties" className="hover:opacity-90">Chuyên khoa</Link>

          {!user && (
            <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Đăng nhập
            </Link>
          )}

          {user && (
            <>
              <Link
                className="underline underline-offset-4"
                to={
                  user.role === "patient"
                    ? "/patient"
                    : user.role === "doctor"
                    ? "/doctor"
                    : "/admin/manage-doctors"
                }
              >
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
