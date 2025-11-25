import { useState } from "react";

export default function RateDoctor() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-semibold mb-4">Đánh giá bác sĩ</h1>
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="4"
        placeholder="Nhập nhận xét..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Gửi
      </button>
    </div>
  );
}
