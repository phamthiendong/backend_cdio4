import { useState } from "react";
import { safeGet } from "@api/api.js";


export default function ChatAI(){
  const [enabled, setEnabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);

  const ask = async ()=>{
    if (!enabled) return;
    const { data } = await API.post("/ai/suggest", { symptoms: prompt });
    setResult(data.suggestions || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={enabled} onChange={()=>setEnabled(!enabled)} />
        <div className="font-semibold">Trợ lý AI: gợi ý chuyên khoa</div>
      </div>
      <textarea rows={4} className="w-full border rounded-lg p-2"
        placeholder="Mô tả triệu chứng (ví dụ: đau ngực, khó thở, ho khan...)"
        value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
      <div className="mt-2">
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white" onClick={ask} disabled={!enabled}>Gợi ý</button>
      </div>
      {!!result.length && (
        <div className="mt-3 text-sm">
          Chuyên khoa phù hợp: <b>{result.join(", ")}</b>
        </div>
      )}
    </div>
  );
}
