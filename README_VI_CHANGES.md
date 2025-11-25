# BookCare - Bản Việt hóa & phân quyền

Các thay đổi chính (không đổi cấu trúc thư mục):
- Giao diện **Đăng nhập/Đăng ký** bằng tiếng Việt, có chọn vai trò (Bệnh nhân, Bác sĩ, Admin). Khi chọn **Bác sĩ** có tùy chọn **Bác sĩ trưởng khoa**.
- Điều hướng sau đăng nhập theo vai trò:
  - `/patient` cho Bệnh nhân
  - `/doctor` cho Bác sĩ thường (quản lý lịch riêng)
  - `/chief-doctor` cho Bác sĩ trưởng khoa (quản lý lịch cả khoa)
  - `/admin` cho Admin
- Thêm trang **ScheduleManager** cho bác sĩ CRUD lịch; **ChiefDoctorDashboard** cho trưởng khoa.
- Cập nhật `useAuth.jsx` để lưu token và lấy thông tin người dùng từ `/auth/me`.

## Backend (gợi ý cập nhật DB)
Để hỗ trợ "bác sĩ trưởng khoa", thêm cột `is_chief` (0/1) vào bảng `doctors`:
```sql
ALTER TABLE doctors ADD COLUMN is_chief TINYINT(1) DEFAULT 0;
```
Sau đó đảm bảo bản ghi của bác sĩ trưởng khoa có `is_chief=1` (mapping qua email).

Có thể cập nhật middleware và endpoints:
- `middleware/roleMiddleware.js`: thêm `isChiefDoctor` và `isDoctorOrChief`.
- `appointments` routes: cho phép trưởng khoa CRUD lịch cho mọi `doctor_id`.
