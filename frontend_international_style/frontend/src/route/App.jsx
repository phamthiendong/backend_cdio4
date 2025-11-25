import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@layouts/MainLayout.jsx";
import AuthLayout from "@layouts/AuthLayout.jsx";
import DoctorLayout from "@layouts/DoctorLayout.jsx";
import AdminLayout from "@layouts/AdminLayout.jsx";
import PatientLayout from "@layouts/PatientLayout.jsx";

// Trang chính
import Home from "@pages/Home.jsx";
import Bác sĩ from "@pages/Bác sĩ.jsx";
import Chuyên khoa from "@pages/Chuyên khoa.jsx";
import SpecialtyDetail from "@pages/SpecialtyDetail.jsx";
import Tìm kiếm from "@pages/Tìm kiếm.jsx";
import Kiến thức from "@pages/Kiến thức.jsx";
import RateDoctor from "@pages/doctor/RateDoctor.jsx";
import Appointments from "@pages/Appointments.jsx";
import Cộng đồng from "@pages/Cộng đồng.jsx";
import NotFound from "@pages/NotFound.jsx";

// Auth
import Đăng nhập from "@auth/Đăng nhập.jsx";
import Đăng ký from "@auth/Đăng ký.jsx";
import ForgotPassword from "@auth/ForgotPassword.jsx";

// Admin
import ManageDoctors from "@pages/admin/ManageDoctors.jsx";
import ManagePatients from "@pages/admin/ManagePatients.jsx";
import ManageAppointments from "@pages/admin/ManageAppointments.jsx";
import ManageSpecialties from "@pages/admin/ManageSpecialties.jsx";

// Doctor
import PrescriptionView from "@pages/doctor/PrescriptionView.jsx";
import VideoCall from "@pages/doctor/VideoCall.jsx";

// Patient
import Booking from "@pages/patient/Booking.jsx";
import MyAppointments from "@pages/patient/MyAppointments.jsx";
import PaymentSuccess from "@pages/patient/PaymentSuccess.jsx";

import ProtectedRoute from "@components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout chính */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Bác sĩ />} />
          <Route path="specialties" element={<Chuyên khoa />} />
          <Route path="specialties/:id" element={<SpecialtyDetail />} />
          <Route path="search" element={<Tìm kiếm />} />
          <Route path="knowledge" element={<Kiến thức />} />
          <Route path="community" element={<Cộng đồng />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Đăng nhập />} />
          <Route path="register" element={<Đăng ký />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Patient */}
        <Route element={<PatientLayout />}>
          <Route path="appointments" element={<Appointments />} />
          <Route path="booking" element={<Booking />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* Doctor */}
        <Route element={<DoctorLayout />}>
          <Route path="doctor/prescriptions" element={<PrescriptionView />} />
          <Route path="doctor/video-call" element={<VideoCall />} />
          <Route path="doctor/rate-doctor" element={<RateDoctor />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="admin/manage-doctors" element={<ManageDoctors />} />
          <Route path="admin/manage-patients" element={<ManagePatients />} />
          <Route path="admin/manage-appointments" element={<ManageAppointments />} />
          <Route path="admin/manage-specialties" element={<ManageSpecialties />} />
        </Route>
      </Routes>
    </Router>
  );
}
