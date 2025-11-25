import { useState } from "react";
import { safeGet } from ".api.js";

export default function RateDoctor({ appointment, onDone }){
  const [stars,setStars]=useState(5);
  const [comment,setComment]=useState("");
  const submit = async ()=>{
    await API.post("/ratings",{ appointment_id:appointment.id, doctor_id:appointment.doctor_id, stars, comment });
    alert("Cảm ơn đánh giá!");
    onDone?.();
  };
  return (
    <div className="border rounded-2xl p-4">
      <div className="font-semibold mb-2">Đánh giá {appointment.doctor_name}</div>
      <input type="range" min={1} max={5} value={stars} onChange={e=>setStars(e.target.value)} />
      <div className="text-sm mb-2">Điểm: {stars}/5</div>
      <textarea className="w-full border rounded-lg p-2" rows={3} placeholder="Nhận xét..." value={comment} onChange={e=>setComment(e.target.value)} />
      <div className="mt-2"><button className="px-4 py-2 rounded-lg bg-sky-600 text-white" onClick={submit}>Gửi</button></div>
    </div>
  );
}
