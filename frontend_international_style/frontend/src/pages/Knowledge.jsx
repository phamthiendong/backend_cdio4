import { useEffect, useState } from "react";
import { safeGet } from '@api/api';

export default function Kiến thức(){
  const [posts, setPosts] = useState([]);

  useEffect(()=>{ (async()=>{
    const data = await safeGet("/posts", []);
    setPosts(data);
  })(); },[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Cẩm nang sức khoẻ</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map(p=>(
          <div key={p.id} className="rounded-2xl p-4 bg-white shadow-sm border">
            <div className="text-xs text-emerald-700 font-medium">{p.tag}</div>
            <div className="mt-1 font-semibold text-lg leading-snug">{p.title}</div>
            <p className="text-sm text-gray-600 mt-1">{p.excerpt}</p>
            <div className="mt-3 text-xs text-gray-500">{p.reading} đọc</div>
          </div>
        ))}
      </div>
    </div>
  );
}
