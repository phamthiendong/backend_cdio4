import { Navigate } from "react-router-dom";
import { useAuth } from "@auth/useAuth";

export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    // Không đủ quyền → về trang chủ
    return <Navigate to="/" replace />;
  }
  return children;
}
