import { Outlet, Link } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-60 bg-blue-800 text-white p-4 flex flex-col space-y-3">
        <h2 className="text-lg font-bold">Doctor Panel</h2>
        <Link to="/doctor/prescriptions" className="hover:bg-blue-700 p-2 rounded">Prescriptions</Link>
        <Link to="/doctor/rate-doctor" className="hover:bg-blue-700 p-2 rounded">Rate Overview</Link>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
