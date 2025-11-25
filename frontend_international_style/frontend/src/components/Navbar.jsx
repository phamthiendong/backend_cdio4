import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@auth/useAuth";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar(){
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const Item = ({to, children}) => (
    <NavLink to={to} className={({isActive}) =>
      "px-3 py-2 rounded-lg hover:bg-sky-100 " + (isActive ? "text-sky-600" : "text-gray-700")
    } onClick={() => setOpen(false)}>{children}</NavLink>
  );

  return (
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-bookingcare.svg" alt="BookingCare" className="h-9 w-auto" />
          <span className="text-xl font-semibold text-sky-600">BookingCare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Item to="/">Trang chủ</Item>
          <Item to="/doctors">Bác sĩ</Item>
          <Item to="/specialties">Chuyên khoa</Item>
          <Item to="/knowledge">Cẩm nang</Item>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50">Đăng nhập</Link>
              <Link to="/register" className="px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600">Đăng ký</Link>
            </>
          ) : (
            <>
              <span className="mr-2 text-gray-600">Xin chào, <b>{user?.name || "Người dùng"}</b></span>
              <button onClick={logout} className="px-3 py-2 rounded-xl border hover:bg-gray-50">Đăng xuất</button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(v=>!v)} aria-label="menu">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            <Item to="/">Trang chủ</Item>
            <Item to="/doctors">Bác sĩ</Item>
            <Item to="/specialties">Chuyên khoa</Item>
            <Item to="/knowledge">Cẩm nang</Item>
            {!user ? (
              <div className="flex gap-2 pt-2">
                <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-xl border border-sky-200 text-sky-600 hover:bg-sky-50">Đăng nhập</Link>
                <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600">Đăng ký</Link>
              </div>
            ) : (
              <button onClick={logout} className="mt-2 px-4 py-2 rounded-xl border hover:bg-gray-50">Đăng xuất</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
