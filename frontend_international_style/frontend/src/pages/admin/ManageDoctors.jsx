export default function ManageDoctors() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Bác sĩ</h1>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Specialty</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Dr. Nguyen Van A</td>
            <td className="p-3">Cardiology</td>
            <td className="p-3 text-green-600">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
