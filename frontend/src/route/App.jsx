import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "@layouts/MainLayout.jsx";
import AuthLayout from "@layouts/AuthLayout.jsx";
import DoctorLayout from "@layouts/DoctorLayout.jsx";
import AdminLayout from "@layouts/AdminLayout.jsx";
import PatientLayout from "@layouts/PatientLayout.jsx";

/* Pages chung */
import Home from "@pages/Home.jsx";
import Doctors from "@pages/Doctors.jsx";
import Specialties from "@pages/Specialties.jsx";
import SpecialtyDetail from "@pages/SpecialtyDetail.jsx";
import Search from "@pages/Search.jsx";
import Knowledge from "@pages/Knowledge.jsx";
import Community from "@pages/Community.jsx";
import NotFound from "@pages/NotFound.jsx";

/* Auth */
import Login from "@auth/Login.jsx";
import Register from "@auth/Register.jsx";
import ForgotPassword from "@auth/ForgotPassword.jsx";

/* Patient */
import Booking from "@pages/patient/Booking.jsx";
import MyAppointments from "@pages/patient/MyAppointments.jsx";
import PaymentSuccess from "@pages/patient/PaymentSuccess.jsx";
import PatientProfile from "@pages/patient/PatientProfile.jsx";

/* Doctor */
import ScheduleManager from "@pages/doctor/ScheduleManager.jsx";
import ChiefDoctorDashboard from "@pages/doctor/ChiefDoctorDashboard.jsx";
import PrescriptionView from "@pages/doctor/PrescriptionView.jsx";
import RateDoctor from "@pages/doctor/RateDoctor.jsx";
import VideoCall from "@pages/doctor/VideoCall.jsx";

/* Admin */
import ManageDoctors from "@pages/admin/ManageDoctors.jsx";
import ManagePatients from "@pages/admin/ManagePatients.jsx";
import ManageAppointments from "@pages/admin/ManageAppointments.jsx";
import ManageSpecialties from "@pages/admin/ManageSpecialties.jsx";

/* Guard */
import ProtectedRoute from "@components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="specialties" element={<Specialties />} />
          <Route path="specialties/:id" element={<SpecialtyDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Patient */}
        <Route path="patient" element={<PatientLayout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["patient", "admin"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking"
            element={
              <ProtectedRoute roles={["patient", "admin"]}>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-appointments"
            element={
              <ProtectedRoute roles={["patient", "admin"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment-success"
            element={
              <ProtectedRoute roles={["patient", "admin"]}>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute roles={["patient", "admin"]}>
                <PatientProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Doctor */}
        <Route path="doctor" element={<DoctorLayout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <ScheduleManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="schedule"
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <ScheduleManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="prescriptions"
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <PrescriptionView />
              </ProtectedRoute>
            }
          />
          <Route
            path="rate-doctor"
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <RateDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="video-call"
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <VideoCall />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Chief Doctor */}
        <Route
          path="chief-doctor"
          element={<DoctorLayout />}
        >
          <Route
            index
            element={
              <ProtectedRoute roles={["doctor", "admin"]}>
                <ChiefDoctorDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route
            path="manage-doctors"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManageDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-patients"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManagePatients />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-appointments"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManageAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-specialties"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManageSpecialties />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
