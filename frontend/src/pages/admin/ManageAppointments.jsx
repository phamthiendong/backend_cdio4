export default function ManageAppointments() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Appointments</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Patient</th>
            <th className="p-3">Doctor</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Nguyen Thi B</td>
            <td className="p-3">Dr. A</td>
            <td className="p-3">29/10/2025</td>
            <td className="p-3 text-yellow-500">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
