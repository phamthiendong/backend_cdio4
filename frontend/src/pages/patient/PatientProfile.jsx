import React from "react";

export default function PatientProfile() {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Hồ sơ cá nhân bệnh nhân
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ tên..."
            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại..."
            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Địa chỉ</label>
          <input
            type="text"
            placeholder="Nhập địa chỉ..."
            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Bệnh nền / Ghi chú sức khỏe</label>
          <textarea
            placeholder="Nhập thông tin bệnh nền..."
            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Cập nhật thông tin
        </button>
      </form>
    </div>
  );
}
