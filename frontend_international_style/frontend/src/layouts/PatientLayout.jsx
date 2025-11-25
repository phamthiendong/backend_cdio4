import { Outlet, Link } from "react-router-dom";

export default function PatientLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-sky-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">Patient Portal</h1>
        <nav className="space-x-4">
          <Link to="/appointments" className="hover:underline">Appointments</Link>
          <Link to="/profile" className="hover:underline">Cá nhân</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
