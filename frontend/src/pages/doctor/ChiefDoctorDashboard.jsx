import ScheduleManager from "./ScheduleManager";
export default function ChiefDoctorDashboard(){ 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bác sĩ Trưởng khoa</h1>
      <p className="mb-4 text-slate-600">Bạn có thể quản lý lịch của cả khoa.</p>
      <ScheduleManager />
    </div>
  );
}
