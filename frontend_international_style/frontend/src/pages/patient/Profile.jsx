import { useAuth } from "@auth/useAuth";

export default function Cá nhân(){
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h1>
      <div className="rounded-2xl p-4 bg-white shadow-sm border">
        <div><b>Họ tên:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Vai trò:</b> {user.role}</div>
      </div>
    </div>
  );
}
