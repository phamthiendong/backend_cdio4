import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/manage-doctors" className="hover:bg-gray-700 p-2 rounded">Manage Bác sĩ</Link>
          <Link to="/admin/manage-patients" className="hover:bg-gray-700 p-2 rounded">Manage Patients</Link>
          <Link to="/admin/manage-appointments" className="hover:bg-gray-700 p-2 rounded">Appointments</Link>
          <Link to="/admin/manage-specialties" className="hover:bg-gray-700 p-2 rounded">Chuyên khoa</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
