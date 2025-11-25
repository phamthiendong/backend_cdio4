export default function PrescriptionView() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Prescription View</h1>
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-bold">Patient: Nguyen Van B</h2>
        <p>Date: 29/10/2025</p>
        <h3 className="mt-4 font-semibold">Medicines:</h3>
        <ul className="list-disc ml-6">
          <li>Paracetamol 500mg - 3 times/day</li>
          <li>Vitamin C - once daily</li>
        </ul>
      </div>
    </div>
  );
}
