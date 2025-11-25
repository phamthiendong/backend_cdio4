export async function askAI(question) {
  // logic AI giả lập
  const lower = question.toLowerCase();
  if (lower.includes("bác sĩ")) return "Bạn có thể tìm bác sĩ theo chuyên khoa tại trang Doctors.";
  if (lower.includes("phòng khám")) return "Danh sách phòng khám được hiển thị tại trang Clinics.";
  return "Xin lỗi, tôi chưa hiểu câu hỏi. Vui lòng thử lại!";
}
